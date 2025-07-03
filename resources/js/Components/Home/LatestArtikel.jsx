import { Link } from '@inertiajs/react';
import { ArrowRightCircle } from 'lucide-react';

export default function LatestArticles({ articles }) {
  return (
    <section className="mt-12 px-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📰 Artikel Terbaru</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/artikel/${article.slug}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition overflow-hidden"
          >
            <img
              src={article.image ? `/storage/${article.image}` : '/images/default-article.jpg'}
              alt={article.title}
              onError={(e) => (e.target.src = '/images/default-article.jpg')}
              className="w-full h-40 object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <span className="text-xs bg-teal-600 text-white px-2 py-1 rounded-full inline-block mb-2">
                {article.category?.nama ?? 'Umum'}
              </span>
              <h3 className="text-md font-semibold text-gray-800 dark:text-white line-clamp-2">{article.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">By {article.user.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          href="/artikel"
          className="inline-flex items-center px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition"
        >
          Lihat Semua Artikel <ArrowRightCircle className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
