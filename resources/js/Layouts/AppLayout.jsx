import { Link, usePage, router, useForm } from '@inertiajs/react'
import { useState, useEffect, useRef } from 'react'
import { FiMenu, FiX, FiUser, FiSearch, FiSun, FiMoon } from 'react-icons/fi'

export default function AppLayout({ children }) {
  const { auth, categories = [] } = usePage().props
  const user = auth?.user
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef()
  const [darkMode, setDarkMode] = useState(false)

  const { data, setData, get } = useForm({ q: '' })

  const handleLogout = () => router.post('/logout')

  const handleSearch = (e) => {
    e.preventDefault()
    get('/search')
    setMenuOpen(false)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark', !darkMode)
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light')
  }

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark'
    setDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wide text-primary-600 dark:text-primary-400 uppercase">
            Technovate
          </Link>

          {/* Search */}
          <div className="hidden md:block flex-1 mx-8 max-w-lg">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={data.q}
                onChange={(e) => setData('q', e.target.value)}
                placeholder="Cari artikel..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                <FiSearch size={18} />
              </button>
            </form>
          </div>

          {/* Action */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button onClick={toggleDarkMode} className="text-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-primary-600 transition">Home</Link>

              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 hover:text-primary-600 transition"
                  >
                    <FiUser /> {user.name}
                  </button>
                  <div className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 py-2 transition-all duration-200 origin-top-right transform ${
                    dropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                  }`}>
                    <p className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                      Halo, <span className="font-semibold text-primary-600 dark:text-primary-400">{user.name}</span>
                    </p>
                    <Link href="/profil" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Profil</Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-red-600 dark:text-red-400 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/login" className="hover:text-primary-600">Login</Link>
                  <Link href="/register" className="hover:text-primary-600">Register</Link>
                </>
              )}
            </nav>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 dark:text-gray-100">
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-3 transition-all animate-fade-in-down">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={data.q}
                onChange={(e) => setData('q', e.target.value)}
                placeholder="Cari artikel..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-sm"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <FiSearch size={18} />
              </button>
            </form>

            <Link href="/" className="block hover:text-primary-600">Home</Link>
            {user ? (
              <>
                <Link href="/profil" className="block hover:text-primary-600">Profil</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-red-600 hover:bg-gray-100 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block hover:text-primary-600">Login</Link>
                <Link href="/register" className="block hover:text-primary-600">Register</Link>
              </>
            )}
          </div>
        )}
      </header>

      {/* Category Navbar */}
      <nav className="bg-primary-50 dark:bg-gray-800 border-t border-b border-primary-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-2 flex justify-center gap-6 flex-wrap text-sm font-medium overflow-x-auto">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/kategori/${cat.slug || cat.id}`}
              className="hover:text-primary-600 dark:hover:text-primary-400 transition whitespace-nowrap"
            >
              {cat.nama}
            </Link>
          ))}
          <Link href="/media" className="hover:text-primary-600 dark:hover:text-primary-400">Media</Link>
          <Link href="/Company" className="hover:text-primary-600 dark:hover:text-primary-400">Tentang Kami</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
