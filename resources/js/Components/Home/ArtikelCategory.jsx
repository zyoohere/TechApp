import { Link } from '@inertiajs/react';

export default function ArticlesByCategory({ grouped }) {
  return (
    <section className="py-16 px-4 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
      {grouped.map((cat) =>
        cat.articles.length > 0 ? (
          <div key={cat.id} className="mt-12 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {cat.nama}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.articles.slice(0, 3).map((article) => (
                <Link
                  key={article.id}
                  href={`/artikel/${article.slug}`}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <div className="relative w-full h-36 overflow-hidden">
                    <img
                      src={article.image ? `/storage/${article.image}` : '/images/default-article.jpg'}
                      alt={article.title}
                      onError={(e) => (e.target.src = '/images/default-article.jpg')}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">By {article.user.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null
      )}
    </section>
  );
}
