import { useState, useEffect } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import toast from 'react-hot-toast'
import { Mail, Hash, Lock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Komponen reusable input field
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

export default function OtpLogin() {
  const {
    flash,
    errors,
    step: initialStep = 'request',
    email: initialEmail = '',
  } = usePage().props

  const [step, setStep] = useState(initialStep)

  const requestForm = useForm({ email: '' })
  const otpForm = useForm({ email: initialEmail, otp: '' })
  const resetForm = useForm({
    email: initialEmail,
    password: '',
    password_confirmation: '',
  })

  // Flash Message
  useEffect(() => {
    if (flash?.success) toast.success(flash.success)
    if (flash?.error) toast.error(flash.error)
  }, [flash])

  // Update email dan step jika berubah
  useEffect(() => {
    setStep(initialStep)
    otpForm.setData('email', initialEmail)
    resetForm.setData('email', initialEmail)
  }, [initialStep, initialEmail])

  const handleRequest = (e) => {
    e.preventDefault()
    requestForm.post('/forgot-password/send', {
      preserveScroll: true,
    })
  }

  const handleVerify = (e) => {
    e.preventDefault()
    otpForm.post('/forgot-password/verify', {
      preserveScroll: true,
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetForm.post('/forgot-password/reset', {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Password berhasil direset. Silakan login.')
        window.location.href = '/login'
      },
    })
  }

  const titles = {
    request: 'Lupa Password',
    verify: 'Verifikasi OTP',
    reset: 'Reset Password',
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-100 to-white px-4">
      <motion.div
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-semibold text-center text-teal-600 mb-6">
          {titles[step]}
        </h1>

        {step !== 'request' && otpForm.data.email && (
          <p className="text-center text-sm text-gray-500 mb-4">
            Email: <span className="font-semibold">{otpForm.data.email}</span>
          </p>
        )}

        <AnimatePresence mode="wait">
          {step === 'request' && (
            <motion.form
              key="request"
              onSubmit={handleRequest}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <InputField
                icon={Mail}
                label="Email"
                type="email"
                autoComplete="email"
                value={requestForm.data.email}
                onChange={(e) => requestForm.setData('email', e.target.value)}
                error={errors.email}
              />
              <button
                type="submit"
                disabled={requestForm.processing}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded transition"
              >
                {requestForm.processing ? 'Mengirim...' : 'Kirim OTP'}
              </button>
            </motion.form>
          )}

          {step === 'verify' && (
            <motion.form
              key="verify"
              onSubmit={handleVerify}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <InputField
                icon={Hash}
                label="Kode OTP"
                inputMode="numeric"
                maxLength={6}
                value={otpForm.data.otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '')
                  otpForm.setData('otp', val)
                }}
                error={errors.otp}
              />
              <button
                type="submit"
                disabled={otpForm.processing}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded transition"
              >
                {otpForm.processing ? 'Memverifikasi...' : 'Verifikasi OTP'}
              </button>
            </motion.form>
          )}

          {step === 'reset' && (
            <motion.form
              key="reset"
              onSubmit={handleReset}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <InputField
                icon={Lock}
                label="Password Baru"
                type="password"
                autoComplete="new-password"
                value={resetForm.data.password}
                onChange={(e) =>
                  resetForm.setData('password', e.target.value)
                }
                error={errors.password}
              />
              <InputField
                icon={Lock}
                label="Konfirmasi Password"
                type="password"
                autoComplete="new-password"
                value={resetForm.data.password_confirmation}
                onChange={(e) =>
                  resetForm.setData('password_confirmation', e.target.value)
                }
                error={errors.password_confirmation}
              />
              <button
                type="submit"
                disabled={resetForm.processing}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded transition"
              >
                {resetForm.processing ? 'Mereset...' : 'Reset Password'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
