export default function FeaturedMedia({ items }) {
  if (items.length === 0) return null;

  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📸 Media Unggulan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((media) => (
            <div key={media.id} className="bg-white rounded shadow overflow-hidden">
              {media.type === 'image' && (
                <img src={`/storage/${media.media_path}`} alt={media.title} className="w-full h-48 object-cover" />
              )}
              {media.type === 'video' && (
                <video controls className="w-full h-48 object-cover">
                  <source src={`/storage/${media.media_path}`} type="video/mp4" />
                </video>
              )}
              {media.type === 'external' && (
                <iframe
                  src={media.media_url}
                  title={media.title}
                  className="w-full h-48"
                  allowFullScreen
                ></iframe>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{media.title}</h3>
                {media.caption && <p className="text-gray-600 text-sm mt-1">{media.caption}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
