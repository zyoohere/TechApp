import React from "react";
import { Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Media({ media, categories }) {
    return (
        <AppLayout categories={categories}>
            <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-extrabold text-teal-600 dark:text-white">Media</h1>
                </div>

                {media.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {media.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition overflow-hidden"
                            >
                                <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                    {item.type === "image" && item.media_path && (
                                        <img
                                            src={`/storage/${item.media_path}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    {item.type === "video" && item.media_path && (
                                        <video
                                            controls
                                            className="w-full h-full object-cover"
                                        >
                                            <source
                                                src={`/storage/${item.media_path}`}
                                                type="video/mp4"
                                            />
                                        </video>
                                    )}
                                    {item.type === "external" && item.media_url && (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${getYouTubeId(item.media_url)}`}
                                            className="w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={item.title}
                                        ></iframe>
                                    )}
                                </div>

                                <div className="p-4">
                                    <span className="inline-block text-xs text-white bg-teal-600 rounded-full px-2 py-0.5 mb-2 capitalize">
                                        {item.type}
                                    </span>

                                    <h2 className="text-md font-semibold text-gray-800 dark:text-white truncate">
                                        {item.title || "Tanpa Judul"}
                                    </h2>

                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                        {item.caption || "Tidak ada keterangan."}
                                    </p>

                                    {item.type === "external" && item.media_url && (
                                        <a
                                            href={item.media_url}
                                            target="_blank"
                                            className="inline-block mt-2 text-sm text-teal-600 hover:underline"
                                            rel="noopener noreferrer"
                                        >
                                            Tonton di YouTube
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 space-y-4">
                        <img
                            src="/illustrations/empty-gallery.svg"
                            alt="Belum ada media"
                            className="mx-auto w-40 opacity-80"
                        />
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            Belum ada media yang tersedia saat ini.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

// Helper untuk ambil ID dari YouTube
function getYouTubeId(url) {
    if (!url) return "";
    try {
        if (url.includes("youtu.be/")) {
            return url.split("youtu.be/")[1].split("?")[0];
        }
        const params = new URLSearchParams(new URL(url).search);
        return params.get("v") || "";
    } catch (error) {
        return "";
    }
}
