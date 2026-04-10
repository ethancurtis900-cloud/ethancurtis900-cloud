import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { name, email, phone, message }: ContactFormData = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const firstName = name.split(" ")[0];

    const internalEmail = {
      from: "MetroNexa Contact <sales@metronexa.com>",
      to: ["contact@metronexa.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Reply to: ${email}</small></p>
      `,
      reply_to: email,
    };

    const confirmationEmail = {
      from: "MetroNexa <sales@metronexa.com>",
      to: [email],
      subject: "We received your submission — MetroNexa",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="margin:0;padding:0;background-color:#0f172a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;padding:40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color:#1e293b;border-radius:16px;overflow:hidden;border:1px solid #334155;max-width:600px;width:100%;">

                    <!-- Header -->
                    <tr>
                      <td style="background:linear-gradient(135deg,#10b981,#06b6d4);padding:40px 40px 32px;text-align:center;">
                        <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">MetroNexa</h1>
                        <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;letter-spacing:1px;text-transform:uppercase;">Business Growth Solutions</p>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding:40px;">
                        <h2 style="margin:0 0 16px;color:#f1f5f9;font-size:22px;font-weight:600;">Hi ${firstName},</h2>
                        <p style="margin:0 0 20px;color:#94a3b8;font-size:16px;line-height:1.7;">
                          We received your submission! Thank you for trusting MetroNexa with reaching your business goals and its potential. A member of our team will reach out to you shortly.
                        </p>
                        <p style="margin:0 0 32px;color:#94a3b8;font-size:16px;line-height:1.7;">
                          In the meantime, feel free to explore our services or reach out to us directly if you have any urgent questions.
                        </p>

                        <!-- Divider -->
                        <div style="border-top:1px solid #334155;margin-bottom:32px;"></div>

                        <!-- CTA -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center">
                              <a href="https://metronexa.com/dashboard" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;letter-spacing:0.3px;">
                                Go to Dashboard
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background-color:#0f172a;padding:24px 40px;text-align:center;border-top:1px solid #1e293b;">
                        <p style="margin:0 0 8px;color:#475569;font-size:13px;">MetroNexa &bull; Business Growth Solutions</p>
                        <p style="margin:0;color:#334155;font-size:12px;">You're receiving this because you submitted an inquiry on our website.</p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    };

    const [internalRes, confirmRes] = await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify(internalEmail),
      }),
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify(confirmationEmail),
      }),
    ]);

    if (!internalRes.ok) {
      const error = await internalRes.text();
      console.error("Resend API error (internal):", error);
      throw new Error(`Failed to send internal email: ${error}`);
    }

    if (!confirmRes.ok) {
      const error = await confirmRes.text();
      console.error("Resend API error (confirmation):", error);
    }

    const data = await internalRes.json();

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
});
