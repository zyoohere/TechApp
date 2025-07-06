import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Show() {
  const { artikels, category } = usePage().props;

  // Fungsi untuk menghapus tag HTML dari string
  const stripHtml = (html) => html.replace(/<[^>]*>?/gm, '');

  return (
    <AppLayout category={category} title="Semua Artikel">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white text-center">
          Semua Artikel
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {artikels.data.map((artikel) => (
            <div
              key={artikel.id}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:ring-2 hover:ring-teal-400 transition duration-300 flex flex-col"
            >
              {artikel.image && (
                <img
                  src={artikel.image ? `/storage/${artikel.image}` : '/images/default-article.jpg'}
                  alt={artikel.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              )}

              <div className="p-5 flex flex-col flex-grow">
                {artikel.category && (
                  <span className="text-xs px-2 py-1 mb-2 rounded-full bg-teal-100 text-teal-700 w-fit">
                    {artikel.category.nama}
                  </span>
                )}

                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-2">
                  {artikel.title}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 flex-grow">
                  {artikel.excerpt_clean || stripHtml(artikel.excerpt || artikel.content)}
                </p>

                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  Oleh {artikel.user?.name || 'Admin'} •{' '}
                  {new Date(artikel.published_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>

                <Link
                  href={`/artikel/${artikel.slug}`}
                  className="mt-4 text-teal-600 dark:text-teal-400 font-medium text-sm hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {artikels.links.length > 3 && (
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {artikels.links.map((link, i) => (
              <Link
                key={i}
                href={link.url || ''}
                className={`px-4 py-2 rounded-md text-sm transition ${
                  link.active
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
