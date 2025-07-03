import React from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import AppLayout from "@/Layouts/AppLayout";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function CompanyProfile({ categories }) {
  return (
    <AppLayout categories={categories}>
      <Head title="Tentang Technovate" />
      <motion.section
        className="max-w-6xl mx-auto dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-8 md:p-16 space-y-24"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* Header Perusahaan */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-start gap-10 rounded-2xl shadow-md p-8 bg-primary-50 dark:bg-gray-800"
          variants={fadeInUp}
        >
          <img
            src="/images/logoicon.png"
            alt="Logo Technovate"
            className="w-36 h-36 md:w-48 md:h-48 object-cover"
          />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary-600 dark:text-primary-400 mb-4">
              Technovate
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
              Technovate adalah portal berita digital yang menyajikan informasi terkini, terpercaya, dan relevan dari dunia teknologi, startup, inovasi, dan dunia kampus.
            </p>
          </div>
        </motion.div>

        {/* Tentang Kami */}
        <motion.section variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Tentang Kami
          </h2>
          <p className="text-lg text-center max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-300">
            Kami hadir sebagai platform berita digital yang fokus memberikan informasi edukatif, akurat, dan menginspirasi generasi muda Indonesia dalam bidang teknologi dan inovasi.
          </p>
        </motion.section>

        {/* Visi & Misi */}
        <motion.section variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            Visi & Misi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-primary-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-primary-400 mb-3">Visi</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Menjadi portal berita teknologi terdepan yang membentuk wawasan masyarakat Indonesia terhadap perkembangan digital dan inovasi.
              </p>
            </div>
            <div className="bg-primary-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-primary-400 mb-3">Misi</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Menyajikan berita teknologi yang akurat dan terpercaya.</li>
                <li>Mendorong literasi digital dan inovasi di kalangan pelajar dan mahasiswa.</li>
                <li>Menjadi ruang publik yang terbuka untuk opini dan pemikiran kritis.</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Kontak Kami */}
        <motion.section className="max-w-3xl mx-auto" variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Hubungi Kami
          </h2>
          <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
            <p><strong>Alamat:</strong> Jl. Teknologi No. 123, Jakarta, Indonesia</p>
            <p><strong>Email:</strong> <a href="mailto:contact@technovate.com" className="text-primary-600 hover:underline dark:text-primary-400">contact@technovate.com</a></p>
            <p><strong>Telepon:</strong> +62 21 1234 5678</p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/62812345678" target="_blank" className="text-primary-600 hover:underline dark:text-primary-400">+62 812 3456 7890</a></p>
          </div>
        </motion.section>

        {/* Lokasi */}
        <motion.section variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Lokasi Kami
          </h2>
          <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18..."
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Lokasi Technovate"
            ></iframe>
          </div>
        </motion.section>

        {/* Struktur Redaksi */}
        <motion.section variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            Struktur Redaksi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "Trio Tahril Rifandi",
                role: "Pemimpin Redaksi",
                img: "/images/redaksi1.png",
              },
              {
                name: "Amira Nabila",
                role: "Editor Konten",
                img: "/images/redaksi2.png",
              },
              {
                name: "Dimas Pratama",
                role: "Reporter Lapangan",
                img: "/images/redaksi3.png",
              },
            ].map((person, i) => (
              <div
                key={i}
                className="bg-primary-50 dark:bg-gray-800 p-6 rounded-xl text-center shadow hover:shadow-md transition"
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary-500"
                />
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{person.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{person.role}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA Redaksi Page */}
        <motion.section variants={fadeInUp} className="text-center mt-12">
          <Link
            href="/redaksi"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-full font-medium shadow hover:bg-primary-700 transition dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            Lihat Halaman Lengkap Redaksi →
          </Link>
        </motion.section>
      </motion.section>
    </AppLayout>
  );
}
