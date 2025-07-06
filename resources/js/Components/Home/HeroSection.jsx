import { Link } from '@inertiajs/react';

export default function HeroArticle({ article }) {
  if (!article) return null;

  const fallbackImage = `/images/artikels/${(article.id % 9) + 1}.jpg`;

  const imageUrl = article.image
    ? `/storage/${article.image}`
    : fallbackImage;

  return (
    <section className="mt-6 md:mt-10 px-4">
      <div className="relative rounded-2xl overflow-hidden h-72 sm:h-80 md:h-[28rem] shadow-lg group">
        <img
          src={imageUrl}
          alt={article.title}
          onError={(e) => (e.target.src = fallbackImage)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay gradasi gelap transparan */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent backdrop-blur-sm" />

        {/* Konten teks */}
        <div className="absolute bottom-0 p-6 text-white z-10 w-full">
          <span className="text-xs sm:text-sm font-semibold bg-teal-600 px-3 py-1 rounded-full inline-block mb-3 shadow-md">
            {article.category?.nama ?? 'Umum'}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug line-clamp-2 drop-shadow-lg">
            <Link
              href={`/artikel/${article.slug}`}
              className="hover:underline transition duration-200"
            >
              {article.title}
            </Link>
          </h1>

          <p className="text-sm text-gray-300 mt-2 drop-shadow">
            {article.user.name} •{' '}
            {new Date(article.published_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
