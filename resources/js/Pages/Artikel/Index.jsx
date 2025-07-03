import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Show({
    artikels: artikel,
    categories = [],
    tags = [],
    comments = [],
    relatedArticles = [],
    latestArticles = [],
    hastag = [],
}) {
    const { data, setData, post, processing, reset } = useForm({
        artikel_id: artikel.id,
        content: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/artikel/komentar`, {
            onSuccess: () => reset("content"),
        });
    };

    return (
        <AppLayout categories={categories}>
            <Head title={artikel.title} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {/* Breadcrumb */}
                <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1">
                        <li>
                            <Link href="/" className="hover:underline text-teal-600 dark:text-teal-400">
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <span className="mx-2">›</span>
                        </li>
                        <li className="text-gray-700 dark:text-gray-300">
                            {artikel.category?.nama || "Berita"}
                        </li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Article */}
                    <main className="lg:col-span-8">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                            {artikel.title}
                        </h1>

                        {artikel.image && (
                            <img
                                src={`/storage/${artikel.image}`}
                                alt={artikel.title}
                                className="w-full h-auto rounded-2xl object-cover shadow-xl mb-6"
                            />
                        )}

                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex flex-wrap gap-4 items-center">
                            <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
                                {artikel.category?.nama || "Berita"}
                            </span>
                            <span>Oleh <strong>{artikel.user?.name || "Penulis"}</strong></span>
                            <time dateTime={artikel.created_at}>
                                {new Date(artikel.created_at).toLocaleDateString()}
                            </time>
                        </div>

                        <article className="prose prose-lg dark:prose-invert max-w-none mb-10">
                            <div dangerouslySetInnerHTML={{ __html: artikel.content }} />
                        </article>

                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-3 mb-10">
                                {tags.map((tag) => (
                                    <Link
                                        key={tag.id}
                                        href={`/tag/${tag.nama}`}
                                        className="text-sm bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 px-4 py-1 rounded-full hover:underline transition-all"
                                    >
                                        #{tag.nama}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Komentar */}
                        <section>
                            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Tinggalkan Komentar</h4>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <textarea
                                    className="w-full p-4 border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    value={data.content}
                                    onChange={(e) => setData("content", e.target.value)}
                                    placeholder="Tulis komentar..."
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                >
                                    {processing ? "Mengirim..." : "Kirim Komentar"}
                                </button>
                            </form>

                            {comments.length > 0 && (
                                <div className="mt-8 space-y-4">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm flex gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-teal-600 text-white flex items-center justify-center font-bold text-lg">
                                                {comment.user.avatar ? (
                                                    <img
                                                        src={`/storage/${comment.user.avatar}`}
                                                        alt={comment.user.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    comment.user.name.charAt(0).toUpperCase()
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 dark:text-white">{comment.user.name}</p>
                                                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap mt-1">{comment.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </main>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
                                Artikel Terbaru
                            </h3>
                            <ul className="space-y-3">
                                {latestArticles.map((article) => (
                                    <li key={article.id} className="flex gap-3">
                                        <img
                                            src={`/storage/${article.image}`}
                                            alt={article.title}
                                            className="w-16 h-16 rounded-md object-cover"
                                        />
                                        <div>
                                            <Link
                                                href={`/artikel/${article.slug}`}
                                                className="text-sm font-semibold text-gray-800 dark:text-white hover:underline"
                                            >
                                                {article.title}
                                            </Link>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(article.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {relatedArticles.length > 0 && (
                            <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
                                    Artikel Terkait
                                </h3>
                                <ul className="space-y-3">
                                    {relatedArticles.map((related) => (
                                        <li key={related.id} className="flex gap-3">
                                            <img
                                                src={`/storage/${related.image}`}
                                                alt={related.title}
                                                className="w-16 h-16 rounded-md object-cover"
                                            />
                                            <div>
                                                <Link
                                                    href={`/artikel/${related.slug}`}
                                                    className="text-sm font-semibold text-gray-800 dark:text-white hover:underline"
                                                >
                                                    {related.title}
                                                </Link>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {new Date(related.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
                                Hastag
                            </h3>
                            <ul className="flex flex-wrap gap-3">
                                {hastag.map((tag) => (
                                    <li key={tag.id}>
                                        <Link
                                            href={`/kategori/${tag.slug}`}
                                            className="text-sm text-teal-600 dark:text-teal-300 hover:underline"
                                        >
                                            #{tag.nama}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </aside>
                </div>
            </div>

            <div className="fixed bottom-5 right-5 z-50">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow-lg transition-all"
                >
                    ↑
                </button>
            </div>
            
        </AppLayout>
    );
}
