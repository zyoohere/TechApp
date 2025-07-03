import { usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function VerifyEmail() {
  const { must_verify_email, flash } = usePage().props;
  useEffect(()=>{
    if (flash.success) toast.success(flash.success);
  },[flash]);

  if (!must_verify_email) window.location.href='/dashboard';

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <p className="text-center">Harap verifikasi email Anda dahulu.</p>
      <form method="post" action={route('verification.send')}>
        <button type="submit" className="bg-teal-600 text-white px-4 py-2 mt-4 rounded">Kirim ulang email verifikasi</button>
      </form>
    </div>
  );
}
