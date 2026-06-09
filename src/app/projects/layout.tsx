export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full max-w-3xl mx-auto px-5 py-12 sm:py-16 overflow-x-hidden">
      {children}
    </main>
  )
}
