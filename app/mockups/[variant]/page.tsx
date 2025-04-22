"use client"

import { useParams } from "next/navigation"
import dynamic from "next/dynamic"

// Dynamically import mockup components with no caching
const DashboardA = dynamic(() => import("@/app/mockups/dashboard-a/component").then(mod => mod.default), { 
  ssr: false,
  loading: () => <div>Loading Dashboard A...</div>
})
const DashboardB = dynamic(() => import("@/app/mockups/dashboard-b/component").then(mod => mod.default), { 
  ssr: false,
  loading: () => <div>Loading Dashboard B...</div>
})
const EcommerceC = dynamic(() => import("@/app/mockups/ecommerce-c/component").then(mod => mod.default), { 
  ssr: false,
  loading: () => <div>Loading E-commerce C...</div>
})
const EcommerceD = dynamic(() => import("@/app/mockups/ecommerce-d/component").then(mod => mod.default), { 
  ssr: false,
  loading: () => <div>Loading E-commerce D...</div>
})
const SocialE = dynamic(() => import("@/app/mockups/social-e/component").then(mod => mod.default), { 
  ssr: false,
  loading: () => <div>Loading Social E...</div>
})
const SocialF = dynamic(() => import("@/app/mockups/social-f/component").then(mod => mod.default), { 
  ssr: false,
  loading: () => <div>Loading Social F...</div>
})

const MOCKUP_COMPONENTS = {
  a: DashboardA,
  b: DashboardB,
  c: EcommerceC,
  d: EcommerceD,
  e: SocialE,
  f: SocialF,
}

export default function MockupPage() {
  const params = useParams()
  const variant = params.variant as string
  const MockupComponent = MOCKUP_COMPONENTS[variant as keyof typeof MOCKUP_COMPONENTS]

  if (!MockupComponent) {
    return <div>Mockup not found</div>
  }

  return (
    <div className="w-full h-full">
      <MockupComponent />
    </div>
  )
} 