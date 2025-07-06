import { Link } from '@inertiajs/react';
import { ArrowRightCircle } from 'lucide-react';

export default function LatestArticles({ articles }) {
  return (
    <section className="mt-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Artikel Terbaru</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/artikel/${article.slug}`}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden"
          >
            <div className="relative w-full h-48 overflow-hidden">
              <img
                src={article.image ? `/storage/${article.image}` : `/images/artikels/${(article.id % 9) + 1}.jpg`}
                alt={article.title}
                onError={(e) => (e.target.src = '/images/default-article.jpg')}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-medium bg-teal-600 text-white px-3 py-1 rounded-full inline-block mb-3">
                {article.category?.nama ?? 'Umum'}
              </span>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white line-clamp-2 mb-1">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">By {article.user.name}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/artikel"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-medium rounded-full hover:bg-teal-700 transition"
        >
          Lihat Semua Artikel
          <ArrowRightCircle className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
