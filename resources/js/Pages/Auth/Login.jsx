import { useForm, Link, usePage, Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

// Reusable InputField component
const InputField = ({ icon: Icon, label, type = 'text', value, onChange, error, ...props }) => (
  <div className="mb-5 relative group">
    <div className={`flex items-center border px-3 py-2 rounded transition duration-200 
      ${error ? 'border-red-500' : 'border-gray-300 group-focus-within:border-teal-600'} bg-white`}>
      <Icon className="w-5 mr-2 text-gray-400" />
      <input
        type={type}
        className="w-full outline-none bg-transparent placeholder-transparent"
        placeholder={label}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
    <label className="absolute left-3 top-[-8px] bg-white px-1 text-xs text-teal-600">
      {label}
    </label>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
)

export default function Login() {
  const { flash, errors } = usePage().props
  const [showPassword, setShowPassword] = useState(false)
  const [frontendErrors, setFrontendErrors] = useState({})

  const form = useForm({
    email: '',
    password: '',
    remember: false,
  })

  useEffect(() => {
    if (flash.success) toast.success(flash.success)
    if (flash.error) toast.error(flash.error)
  }, [flash])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!form.data.email) newErrors.email = 'Email wajib diisi.'
    if (!form.data.password) newErrors.password = 'Password wajib diisi.'

    setFrontendErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      form.post('/login', {
        onError: () => toast.error('Login gagal. Cek email dan password.'),
      })
    } else {
      toast.error('Form tidak lengkap.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-100 to-white px-4">
      <Head title="Login" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border"
      >
        <h1 className="text-2xl font-semibold text-center text-teal-600 mb-6">Login</h1>

        <InputField
          icon={Mail}
          label="Email"
          type="email"
          value={form.data.email}
          onChange={(e) => form.setData('email', e.target.value)}
          error={frontendErrors.email || errors.email}
          autoComplete="email"
        />

        <div className="mb-5 relative group">
          <div className={`flex items-center border px-3 py-2 rounded transition duration-200 
            ${frontendErrors.password || errors.password ? 'border-red-500' : 'border-gray-300 group-focus-within:border-teal-600'} bg-white`}>
            <Lock className="w-5 mr-2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full outline-none bg-transparent placeholder-transparent"
              placeholder="Password"
              value={form.data.password}
              onChange={(e) => form.setData('password', e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <label className="absolute left-3 top-[-8px] bg-white px-1 text-xs text-teal-600">
            Password
          </label>
          {(frontendErrors.password || errors.password) && (
            <p className="text-red-500 text-sm mt-1">
              {frontendErrors.password || errors.password}
            </p>
          )}
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="mr-2"
            checked={form.data.remember}
            onChange={(e) => form.setData('remember', e.target.checked)}
          />
          <label htmlFor="remember" className="text-sm text-gray-700">
            Ingat saya
          </label>
        </div>

        <button
          type="submit"
          disabled={form.processing}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {form.processing ? 'Memproses...' : 'Login'}
        </button>

        <div className="mt-5 text-center text-sm text-gray-600 space-y-1">
          <div>
            Belum punya akun?{' '}
            <Link href="/register" className="text-teal-600 hover:underline">
              Daftar
            </Link>
          </div>
          <div>
            <Link href="/forgot-password" className="text-gray-500 hover:underline">
              Lupa password?
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
