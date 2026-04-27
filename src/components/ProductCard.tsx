import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { StripeProduct } from '../stripe-config'
import { formatCurrency } from '../lib/utils'
import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface ProductCardProps {
  product: StripeProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const features = product.description.split('.').filter(f => f.trim().length > 0)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/get-started')
  }

  return (
    <Card className="w-full max-w-md bg-white border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 group">
      <CardHeader className="space-y-3 pb-6">
        <CardTitle className="text-3xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{product.name}</CardTitle>
        <CardDescription className="text-5xl font-black bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
          {formatCurrency(product.price, product.currency)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-emerald-600" />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.trim()}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleClick}
          className="w-full bg-gray-900 hover:bg-black text-white font-bold shadow-lg shadow-black/20 transition-all hover:scale-105"
          size="lg"
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  )
}
