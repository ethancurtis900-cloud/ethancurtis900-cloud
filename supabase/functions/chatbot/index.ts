import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT = `You are an expert AI assistant for MetroNexa, a premium web development and digital services agency. Your role is to help potential customers understand our services and answer their questions.

ABOUT METRONEXA:
- We specialize in building high-performance, conversion-focused websites and web applications
- Our core services include: Custom Website Development, E-Commerce Solutions, Web Application Development, SEO Optimization, Website Maintenance, and Branding & Design
- We offer three main packages: Starter ($2,999 - perfect for small businesses), Professional ($5,999 - for growing companies), and Enterprise ($9,999+ - for large-scale projects)
- Our guiding principles: Innovation First, Goal-Driven, Launch & Scale, and Speed Matters
- We focus on delivering fast, responsive experiences that convert visitors into customers
- Average project delivery: 2-4 weeks for standard websites, longer for complex applications
- We provide ongoing support and maintenance options
- We work with modern technologies and follow industry best practices
- Our approach is client-focused: we start with your vision and business goals

KEY BENEFITS:
- Proven track record with 500+ successful projects
- 98% client satisfaction rate
- Average 150% increase in client conversions
- Fast turnaround times
- Mobile-first, responsive designs
- SEO-optimized from the ground up
- Security and performance focused

TONE & STYLE:
- Be professional, friendly, and helpful
- Keep responses concise but informative (2-4 sentences for simple questions)
- Be enthusiastic about how we can help their business grow
- If asked about pricing, mention our packages but encourage them to contact us for a custom quote
- If you don't know something specific, be honest and encourage them to use the contact form
- Never make up information or promises
- Focus on value and results, not just features

COMMON QUESTIONS TO HANDLE:
- What services do you offer?
- How much does a website cost?
- How long does it take to build a website?
- Do you offer maintenance/support?
- Can you help with SEO?
- Do you build e-commerce sites?
- What technologies do you use?
- Can you redesign my existing website?

Remember: Your goal is to be helpful, build trust, and guide potential customers toward reaching out through the contact form for detailed discussions.`;

interface Message {
  role: string;
  content: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");

    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({
          message: "Thank you for your interest! Our AI assistant is currently being configured. In the meantime, please use our contact form below to get in touch with our team directly, and we'll respond within 24 hours."
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const openaiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-10).map((msg: Message) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: openaiMessages,
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI API error:", error);
      throw new Error("Failed to get response from AI");
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || "I apologize, but I'm having trouble responding right now. Please try again or use our contact form.";

    return new Response(
      JSON.stringify({ message: aiMessage }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Chatbot error:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred processing your request",
        message: "I apologize, but I'm having trouble right now. Please use our contact form below to reach our team directly."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
