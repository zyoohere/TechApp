import { Link } from '@inertiajs/react';

export default function HeroArticle({ article }) {
  if (!article) return null;

  return (
    <div className="relative rounded-xl overflow-hidden h-64 shadow-lg group">
      <img
        src={article.image ? `/storage/${article.image}` : '/images/default-article.jpg'}
        alt={article.title}
        onError={(e) => (e.target.src = '/images/default-article.jpg')}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 p-4 text-white">
        <span className="text-xs bg-teal-600 px-2 py-1 rounded-full font-medium">
          {article.category?.nama ?? 'Umum'}
        </span>
        <h2 className="text-2xl font-bold mt-2 line-clamp-2">
          <Link href={`/artikel/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </h2>
        <p className="text-sm text-gray-300 mt-1">
          {article.user.name} • {new Date(article.published_at).toLocaleDateString('id-ID')}
        </p>
      </div>
    </div>
  );
}
