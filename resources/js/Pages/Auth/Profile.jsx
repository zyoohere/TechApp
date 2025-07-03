// resources/js/Pages/Auth/Profile.jsx

import React, { useRef, useState, useEffect } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import toast from "react-hot-toast";

export default function Profile() {
  const { auth, must_verify_email, flash, activity = {} } = usePage().props;
  const user = auth?.user;
  const fileInput = useRef();

  const [tab, setTab] = useState("profil");
  const [preview, setPreview] = useState(user.avatar_url || null);

  const { data, setData, post, processing, errors } = useForm({
    name: user.name || "",
    bio: user.bio || "",
    avatar: null,
  });

  const {
    data: pwd,
    setData: setPwd,
    post: postPwd,
    processing: loadingPwd,
    errors: errorsPwd,
    reset: resetPwd,
  } = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (flash.success) toast.success(flash.success);
  }, [flash]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setData("avatar", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    post("/profil/update", {
      preserveScroll: true,
      onSuccess: () => router.reload({ only: ["auth"] }),
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    postPwd("/profil/password", {
      preserveScroll: true,
      onSuccess: () => resetPwd(),
    });
  };

  const resendVerification = () => router.post("/profil/email/resend");
  const logoutAll = () => confirm("Yakin ingin logout dari semua perangkat?") && router.post("/profil/logout-all");
  const deleteAccount = () => confirm("Apakah Anda yakin ingin menghapus akun?") && router.delete("/profil/delete");

  const renderAvatar = () => {
    if (preview) {
      return <img src={preview} className="w-24 h-24 rounded-full object-cover border-4 border-primary-500 mx-auto" />;
    } else if (user.avatar_url) {
      return <img src={user.avatar_url + "?t=" + new Date().getTime()} className="w-24 h-24 rounded-full object-cover border-4 border-primary-500 mx-auto" />;
    } else {
      const initial = user.name?.charAt(0).toUpperCase() || "?";
      return (
        <div className="w-24 h-24 rounded-full flex items-center justify-center bg-primary-600 text-white text-2xl font-bold mx-auto">
          {initial}
        </div>
      );
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Pengaturan Profil</h1>

        <div className="flex justify-center gap-4">
          {["profil", "password", "aktivitas"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition ${
                tab === item
                  ? "bg-primary-600 text-white shadow"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {tab === "profil" && (
          <form onSubmit={handleProfileSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
            <div className="flex flex-col items-center space-y-2">
              {renderAvatar()}
              <input type="file" className="hidden" ref={fileInput} accept="image/*" onChange={handleAvatarChange} />
              <button type="button" onClick={() => fileInput.current.click()} className="text-sm text-primary-600 hover:underline">
                Ganti Avatar
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nama</label>
              <input type="text" value={data.name} onChange={(e) => setData("name", e.target.value)} className="input w-full" placeholder="Nama lengkap" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea rows={3} value={data.bio} onChange={(e) => setData("bio", e.target.value)} className="input w-full" placeholder="Ceritakan tentang dirimu" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" value={user.email} disabled className="input w-full bg-gray-100 dark:bg-gray-700 opacity-70" />
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Bergabung sejak: {new Date(user.created_at).toLocaleDateString()}
            </p>

            {must_verify_email && (
              <div className="bg-yellow-100 dark:bg-yellow-200 text-yellow-900 p-4 rounded-md text-sm text-center">
                Email belum terverifikasi.{" "}
                <button onClick={resendVerification} className="underline text-sm font-medium">
                  Kirim ulang verifikasi
                </button>
              </div>
            )}

            <button type="submit" disabled={processing} className="btn btn-primary w-full">
              Simpan Perubahan
            </button>
          </form>
        )}

        {tab === "password" && (
          <form onSubmit={handlePasswordSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Ganti Password</h2>

            <div>
              <label className="block text-sm font-medium mb-1">Password Lama</label>
              <input type="password" value={pwd.current_password} onChange={(e) => setPwd("current_password", e.target.value)} className="input w-full" />
              {errorsPwd.current_password && <p className="text-red-500 text-sm mt-1">{errorsPwd.current_password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password Baru</label>
              <input type="password" value={pwd.password} onChange={(e) => setPwd("password", e.target.value)} className="input w-full" />
              {errorsPwd.password && <p className="text-red-500 text-sm mt-1">{errorsPwd.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Konfirmasi Password</label>
              <input type="password" value={pwd.password_confirmation} onChange={(e) => setPwd("password_confirmation", e.target.value)} className="input w-full" />
            </div>

            <button type="submit" disabled={loadingPwd} className="btn btn-primary w-full">
              Update Password
            </button>
          </form>
        )}

        {tab === "aktivitas" && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Aktivitas Pengguna</h2>

            <div>
              <h3 className="font-semibold mb-2">Komentar</h3>
              {activity.comments?.length ? (
                <ul className="text-sm space-y-3">
                  {activity.comments.map((c) => (
                    <li key={c.id} className="border-b pb-2 border-gray-200 dark:border-gray-700">
                      <p className="italic">"{c.content}"</p>
                      <p className="text-xs text-gray-500">
                        di <strong>{c.article_title}</strong> — {new Date(c.created_at).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm italic text-gray-500">Belum ada komentar.</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Artikel Disukai</h3>
              {activity.liked?.length ? (
                <ul className="list-disc list-inside text-sm space-y-1">
                  {activity.liked.map((a) => <li key={a.id}>{a.title}</li>)}
                </ul>
              ) : (
                <p className="text-sm italic text-gray-500">Belum ada artikel disukai.</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Riwayat Kunjungan</h3>
              {activity.history?.length ? (
                <ul className="text-sm space-y-1">
                  {activity.history.map((h) => (
                    <li key={h.id}>
                      {h.title} — <span className="text-xs text-gray-500">{new Date(h.visited_at).toLocaleTimeString()}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm italic text-gray-500">Belum ada riwayat kunjungan.</p>
              )}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <button onClick={logoutAll} className="btn w-full border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            Logout Semua Perangkat
          </button>
          <button onClick={deleteAccount} className="w-full text-sm text-red-600 hover:underline">
            Hapus Akun
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
