import React from 'react';
import { usePage } from '@inertiajs/react';

export default function MediaCard() {
    const { media } = usePage().props;

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return '';
        const videoId = url.includes('youtu.be/')
            ? url.split('youtu.be/')[1].split('?')[0]
            : url.split('v=')[1]?.split('&')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    };

    const mediaToDisplay = media.slice(0, 4);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-teal-700">Media Terbaru</h1>
                <a
                    href="/media"
                    className="text-sm font-medium text-teal-600 hover:text-teal-800 transition"
                >
                    Lihat Semua →
                </a>
            </div>

            {media.length === 0 ? (
                <p className="text-gray-500">Belum ada media yang tersedia.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {mediaToDisplay.map((item) => {
                        const isExternal = item.type === 'external';
                        const isVideo = item.type === 'video';
                        const isImage = item.type === 'image';

                        return (
                            <div
                                key={item.id}
                                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100"
                            >
                                <div className="relative w-full h-40 bg-black">
                                    {isImage && item.media_path && (
                                        <img
                                            src={`/storage/${item.media_path}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    )}
                                    {isVideo && item.media_path && (
                                        <video
                                            controls
                                            className="w-full h-full object-cover"
                                        >
                                            <source
                                                src={`/storage/${item.media_path}`}
                                                type="video/mp4"
                                            />
                                            Browser Anda tidak mendukung video.
                                        </video>
                                    )}
                                    {isExternal && item.media_url && (
                                        <iframe
                                            className="w-full h-full"
                                            src={getYouTubeEmbedUrl(item.media_url)}
                                            title={item.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    )}

                                    <span className="absolute top-2 left-2 bg-teal-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                                        {isImage ? 'Gambar' : isVideo ? 'Video' : 'YouTube'}
                                    </span>
                                </div>

                                <div className="p-3">
                                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                                        {item.caption ?? item.title ?? 'Tanpa Judul'}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
