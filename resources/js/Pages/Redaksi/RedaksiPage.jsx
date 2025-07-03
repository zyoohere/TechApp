import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export default function RedaksiPage({ categories }) {
  return (
    <AppLayout categories={categories}>
      <Head title="Struktur Redaksi" />
      <motion.div
        className="max-w-5xl mx-auto px-6 py-12 space-y-16"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <motion.h1
          className="text-4xl font-bold text-center text-primary-600 dark:text-primary-400"
          variants={fadeInUp}
        >
          Struktur Redaksi Technovate
        </motion.h1>

        {/* Hierarki Struktur */}
        <motion.div variants={fadeInUp} className="space-y-12">
          {/* Level 1 */}
          <div className="flex flex-col items-center">
            <img src="/images/redaksi1.png" alt="Trio" className="w-24 h-24 rounded-full mb-3" />
            <div className="text-center bg-primary-100 dark:bg-gray-800 px-6 py-4 rounded-lg shadow">
              <p className="text-xl font-semibold text-gray-900 dark:text-primary-400">Trio Tahril Rifandi</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pemimpin Redaksi</p>
            </div>
          </div>

          {/* Level 2 */}
          <div className="flex justify-center gap-10 flex-wrap">
            {[{
              name: "Amira Nabila",
              role: "Editor Konten",
              img: "/images/redaksi2.png"
            }, {
              name: "Dimas Pratama",
              role: "Reporter Lapangan",
              img: "/images/redaksi3.png"
            }].map((person, i) => (
              <div key={i} className="text-center">
                <img src={person.img} alt={person.name} className="w-24 h-24 rounded-full mb-3 mx-auto" />
                <div className="bg-primary-100 dark:bg-gray-800 px-6 py-4 rounded-lg shadow">
                  <p className="font-semibold text-gray-900 dark:text-primary-400">{person.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{person.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Level 3: Kontributor */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Kontributor</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {["Aldi Rahman", "Nadya Salsabila", "Fajar Hidayat"].map((name, i) => (
                <div key={i} className="text-center">
                  <img src={`/images/kontributor${i+1}.png`} alt={name} className="w-20 h-20 rounded-full mb-2 mx-auto" />
                  <p className="font-medium text-gray-800 dark:text-gray-200">{name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Kontributor</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form Kirim Opini */}
        <motion.section variants={fadeInUp} className="pt-16 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Kirim Opini Publik</h2>
          <form className="max-w-2xl mx-auto space-y-4">
            <input type="text" placeholder="Nama Lengkap" className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none" />
            <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none" />
            <textarea rows="5" placeholder="Tulis opini Anda..." className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none"></textarea>
            <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg">Kirim</button>
          </form>
        </motion.section>
      </motion.div>
    </AppLayout>
  );
}
