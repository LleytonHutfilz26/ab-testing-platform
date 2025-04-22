"use client"

import { useParams } from "next/navigation"
import dynamic from "next/dynamic"

// Dynamically import mockup components
const DashboardA = dynamic(() => import("@/app/mockups/dashboard-a/component"), { ssr: false })
const DashboardB = dynamic(() => import("@/app/mockups/dashboard-b/component"), { ssr: false })
const EcommerceC = dynamic(() => import("@/app/mockups/ecommerce-c/component"), { ssr: false })
const EcommerceD = dynamic(() => import("@/app/mockups/ecommerce-d/component"), { ssr: false })
const SocialE = dynamic(() => import("@/app/mockups/social-e/component"), { ssr: false })
const SocialF = dynamic(() => import("@/app/mockups/social-f/component"), { ssr: false })

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