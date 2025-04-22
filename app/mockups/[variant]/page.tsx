"use client"

import { useParams } from "next/navigation"
import dynamic from "next/dynamic"

// Dynamically import mockup components
const DashboardA = dynamic(() => import("../dashboard-a/page"), { ssr: false })
const DashboardB = dynamic(() => import("../dashboard-b/page"), { ssr: false })
const EcommerceC = dynamic(() => import("../ecommerce-c/page"), { ssr: false })
const EcommerceD = dynamic(() => import("../ecommerce-d/page"), { ssr: false })
const SocialE = dynamic(() => import("../social-e/page"), { ssr: false })
const SocialF = dynamic(() => import("../social-f/page"), { ssr: false })

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

  return <MockupComponent />
} 