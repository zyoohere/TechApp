import React from "react";
import { Head, Link } from "@inertiajs/react";

export default function NotFound() {
    return (
        <>
            <Head title="404 - Halaman Tidak Ditemukan" />
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-6">
                <div className="max-w-md text-center space-y-6">
                    <svg
                        className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"/>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        404
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Oops! Halaman yang kamu cari tidak ditemukan.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </>
    );
}
