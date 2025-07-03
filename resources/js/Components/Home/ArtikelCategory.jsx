import { Link } from '@inertiajs/react';

export default function ArticlesByCategory({ grouped }) {
  return (
    <section className="py-16 px-4 bg-white border-t border-gray-100">
      {grouped.map((cat) =>
        cat.articles.length > 0 ? (
          <div key={cat.id} className="mt-10">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{cat.nama}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.articles.slice(0, 3).map((article) => (
                <Link
                  key={article.id}
                  href={`/artikel/${article.slug}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition"
                >
                  <img
                    src={article.image ? `/storage/${article.image}` : '/images/default-article.jpg'}
                    alt={article.title}
                    className="w-full h-32 object-cover rounded"
                  />
                  <h4 className="text-md font-semibold mt-2 text-gray-800 dark:text-white line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{article.user.name}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null
      )}
    </section>
  );
}
