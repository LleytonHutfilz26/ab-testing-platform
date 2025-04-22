const VARIANTS = ['a', 'b', 'c', 'd', 'e', 'f']

export function generateStaticParams() {
  return VARIANTS.map((variant) => ({
    variant,
  }))
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
} 