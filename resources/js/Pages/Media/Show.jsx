import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Show() {
  const { media } = usePage().props;

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const videoId = url.includes('youtu.be/')
      ? url.split('youtu.be/')[1].split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        href="/media"
        className="text-sm text-teal-600 hover:underline mb-6 inline-block"
      >
        ← Kembali ke Daftar Media
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        {media.title ?? 'Media'}
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {media.caption ?? 'Tidak ada deskripsi'}
      </p>

      <div className="w-full aspect-video mb-6 bg-black rounded-lg overflow-hidden shadow">
        {media.type === 'image' && media.media_path && (
          <img
            src={`/storage/${media.media_path}`}
            alt={media.title}
            className="w-full h-full object-contain"
          />
        )}

        {media.type === 'video' && media.media_path && (
          <video controls className="w-full h-full object-contain bg-black">
            <source src={`/storage/${media.media_path}`} type="video/mp4" />
            Browser tidak mendukung pemutaran video.
          </video>
        )}

        {media.type === 'external' && media.media_url && (
          <iframe
            className="w-full h-full"
            src={getYouTubeEmbedUrl(media.media_url)}
            title={media.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        Diunggah oleh: {media.uploader?.name ?? 'Tidak diketahui'} <br />
        Tanggal: {new Date(media.published_at).toLocaleDateString('id-ID')}
      </div>
    </div>
  );
}
