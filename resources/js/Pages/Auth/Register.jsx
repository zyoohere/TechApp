import { useForm, Head, Link } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'

const InputField = ({ icon: Icon, label, type = 'text', value, onChange, error, toggleIcon }) => (
  <div className="mb-5 relative group">
    <div
      className={`flex items-center border px-3 py-2 rounded transition 
        ${error ? 'border-red-500' : 'border-gray-300 group-focus-within:border-teal-600'} bg-white dark:bg-gray-800`}
    >
      <Icon className="w-5 mr-2 text-gray-400" />
      <input
        type={type}
        className="w-full outline-none bg-transparent placeholder-transparent text-gray-900 dark:text-white"
        placeholder={label}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      {toggleIcon}
    </div>
    <label className="absolute left-3 top-[-8px] bg-white dark:bg-gray-800 px-1 text-xs text-teal-600 dark:text-teal-400">
      {label}
    </label>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
)

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [frontendErrors, setFrontendErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    if (Object.keys(errors).length > 0) toast.error('Terdapat kesalahan pada formulir.')
  }, [errors])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!data.name) newErrors.name = 'Nama wajib diisi.'
    if (!data.email) newErrors.email = 'Email wajib diisi.'
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) newErrors.email = 'Format email tidak valid.'
    if (!data.password) newErrors.password = 'Password wajib diisi.'
    if (data.password !== data.password_confirmation)
      newErrors.password_confirmation = 'Konfirmasi password tidak cocok.'

    setFrontendErrors(newErrors)

    if (Object.keys(newErrors).length === 0 && !processing) {
      post('/register', {
        onSuccess: () => toast.success('Registrasi berhasil!'),
        onError: () => toast.error('Registrasi gagal. Periksa kembali data Anda.'),
      })
    } else {
      toast.error('Silakan lengkapi data terlebih dahulu.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-100 to-white dark:from-gray-900 dark:to-gray-800 px-4">
      <Head title="Register" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md border dark:border-gray-700"
      >
        <h1 className="text-2xl font-semibold text-center text-teal-700 dark:text-teal-400 mb-6">
          Register
        </h1>

        <InputField
          icon={User}
          label="Nama Lengkap"
          value={data.name}
          onChange={(e) => {
            setData('name', e.target.value)
            setFrontendErrors((prev) => ({ ...prev, name: null }))
          }}
          error={frontendErrors.name || errors.name}
        />

        <InputField
          icon={Mail}
          label="Email"
          type="email"
          value={data.email}
          onChange={(e) => {
            setData('email', e.target.value)
            setFrontendErrors((prev) => ({ ...prev, email: null }))
          }}
          error={frontendErrors.email || errors.email}
        />

        <InputField
          icon={Lock}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={data.password}
          onChange={(e) => {
            setData('password', e.target.value)
            setFrontendErrors((prev) => ({ ...prev, password: null }))
          }}
          error={frontendErrors.password || errors.password}
          toggleIcon={
            <button type="button" className="ml-2 text-gray-400" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          }
        />

        <InputField
          icon={Lock}
          label="Konfirmasi Password"
          type={showConfirm ? 'text' : 'password'}
          value={data.password_confirmation}
          onChange={(e) => {
            setData('password_confirmation', e.target.value)
            setFrontendErrors((prev) => ({ ...prev, password_confirmation: null }))
          }}
          error={frontendErrors.password_confirmation || errors.password_confirmation}
          toggleIcon={
            <button type="button" className="ml-2 text-gray-400" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          }
        />

        <button
          type="submit"
          disabled={processing}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-50"
        >
          {processing ? 'Memproses...' : 'Register'}
        </button>

        <div className="mt-5 text-center text-sm text-gray-600 dark:text-gray-400">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-teal-700 hover:underline font-medium dark:text-teal-400">
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}
