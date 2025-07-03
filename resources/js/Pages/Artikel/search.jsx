import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function SearchPage({ categories, artikels, query }) {
  return (
    <AppLayout categories={categories}>
      <Head title={`Pencarian: ${query}`} />
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        
        {/* Judul Hasil Pencarian */}
        <h1 className="text-xl md:text-xl font-extrabold text-start text-gray-900 dark:text-white mb-10">
          Hasil Pencarian untuk:{" "}
          <span className="text-text-light dark:text-indigo-400">&quot;{query}&quot;</span>
        </h1>

        {/* Kondisi Tidak Ada Artikel */}
        {artikels.data.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-6 text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Maaf, tidak ada artikel yang ditemukan untuk pencarian Anda.
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-2">
              Coba gunakan kata kunci lain atau jelajahi kategori kami.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {artikels.data.map((article) => (
              <Link
                key={article.id}
                href={`/artikel/${article.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <img
                  src={`/storage/${article.image}`}
                  alt={article.title}
                  onError={(e) => { e.target.src = '/default-image.jpg'; }}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-5 space-y-3">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-text-light dark:group-hover:text-text-light transition">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between">
                    <span>
                      Oleh <span className="font-medium">{article.user.name}</span>
                    </span>
                    <span>
                      {new Date(article.published_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
