import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import Pagination from '../../Components/Paginations';

export default function Category({ category, artikels, categories }) {
    const [view, setView] = useState('grid');

    return (
        <AppLayout categories={categories}>
            <Head title={category.nama} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
                {/* Header Kategori */}
                <div className="text-center space-y-4">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-white bg-teal-600 px-4 py-1 rounded-full shadow-md">
                        {category.nama || 'Umum'}
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Artikel dalam Kategori &quot;{category.nama}&quot;
                    </h2>
                </div>

                {/* Tombol Toggle Tampilan */}
                {artikels.data.length > 0 && (
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setView('grid')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                                view === 'grid'
                                    ? 'bg-teal-600 text-white shadow'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            Grid
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                                view === 'list'
                                    ? 'bg-teal-600 text-white shadow'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            List
                        </button>
                    </div>
                )}

                {/* Daftar Artikel */}
                {artikels.data.length > 0 ? (
                    <>
                        <div
                            className={
                                view === 'grid'
                                    ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
                                    : 'space-y-6'
                            }
                        >
                            {artikels.data.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/artikel/${article.slug}`}
                                    className={`group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
                                        view === 'list' ? 'flex' : ''
                                    }`}
                                >
                                    <img
                                        src={`/storage/${article.image}`}
                                        alt={article.title}
                                        onError={(e) => {
                                            e.target.src = '/default-image.jpg';
                                        }}
                                        className={`${
                                            view === 'list'
                                                ? 'w-48 h-32 object-cover'
                                                : 'w-full h-48 object-cover'
                                        } transition-transform duration-300 group-hover:scale-105`}
                                    />
                                    <div
                                        className={`p-5 space-y-2 ${
                                            view === 'list' ? 'flex-1' : ''
                                        }`}
                                    >
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-teal-600 transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                                            <span>
                                                Oleh{' '}
                                                <span className="font-medium">
                                                    {article.user.name}
                                                </span>
                                            </span>
                                            <span>
                                                {new Date(article.published_at).toLocaleDateString(
                                                    'id-ID',
                                                    {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    }
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-10">
                            <Pagination links={artikels.links} />
                        </div>
                    </>
                ) : (
                    <div className="text-center py-24 space-y-4">
                        <img
                            src="/illustrations/empty-state.svg"
                            alt="Empty"
                            className="mx-auto w-40 opacity-80"
                        />
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            Belum ada artikel dalam kategori ini.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
