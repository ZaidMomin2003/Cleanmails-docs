import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] transition-colors">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-[280px] min-h-[calc(100vh-56px)] w-full overflow-x-hidden">
          <div className="max-w-[780px] mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-14">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
