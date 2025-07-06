<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Artikel;
use App\Models\Category;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        // Buat atau ambil user Admin
        $user = User::first() ?? User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);

        // Buat kategori
        $kategoriList = ['Teknologi', 'Pendidikan', 'Gaya Hidup', 'Politik', 'Seni'];
        $categories = collect($kategoriList)->map(fn($nama) => Category::create([
            'nama' => $nama,
            'slug' => Str::slug($nama),
        ]));

        // Buat tag
        $tagList = ['AI', 'Laravel', 'Startup', 'Design', 'React'];
        $tags = collect($tagList)->map(fn($nama) => Tag::create([
            'nama' => $nama,
            'slug' => Str::slug($nama),
        ]));

        // Buat artikel dummy
        for ($i = 1; $i <= 6; $i++) {
            $title = "Contoh Artikel $i";
            $slug = Str::slug($title) . '-' . $i;

            // Ambil kategori acak
            $category = $categories->random();

            $contentData = match ($category->nama) {
                'Teknologi' => [
                    'excerpt' => 'Membahas perkembangan teknologi terbaru dan dampaknya terhadap masyarakat digital.',
                    'content' => <<<HTML
<h2>Transformasi Digital dan Peran Teknologi</h2>
<p>Teknologi telah mengubah berbagai aspek kehidupan, mulai dari komunikasi, pekerjaan, hingga pendidikan. Kecerdasan buatan (AI), Internet of Things (IoT), dan machine learning menjadi topik hangat di era modern.</p>
<p>Perusahaan global kini mengadopsi sistem cloud untuk efisiensi dan keamanan data. Selain itu, teknologi juga mendorong tumbuhnya startup digital dan ekosistem inovasi.</p>
<h3>Kesimpulan</h3>
<p>Masyarakat perlu terus beradaptasi dan meningkatkan literasi digital untuk memanfaatkan teknologi secara maksimal dan bertanggung jawab.</p>
HTML
                ],
                'Pendidikan' => [
                    'excerpt' => 'Menyoroti pergeseran sistem pendidikan tradisional menuju pembelajaran berbasis teknologi.',
                    'content' => <<<HTML
<h2>Pendidikan di Era Digital</h2>
<p>Sistem pendidikan kini bertransformasi melalui platform daring seperti e-learning, MOOC, dan LMS. Guru dan siswa menggunakan teknologi sebagai media utama dalam proses belajar mengajar.</p>
<p>Pendidikan digital membuka akses belajar ke seluruh penjuru dunia, meski tantangan seperti kesenjangan teknologi masih menjadi hambatan di beberapa daerah.</p>
<h3>Kesimpulan</h3>
<p>Inovasi dalam pendidikan harus terus diiringi pemerataan akses agar manfaat teknologi bisa dirasakan semua lapisan masyarakat.</p>
HTML
                ],
                'Gaya Hidup' => [
                    'excerpt' => 'Tren gaya hidup sehat, produktif, dan berkelanjutan di kalangan masyarakat urban.',
                    'content' => <<<HTML
<h2>Gaya Hidup Modern: Seimbang dan Berkelanjutan</h2>
<p>Generasi milenial dan Z kini cenderung memilih gaya hidup sehat dan mindful. Pola makan organik, olahraga rutin, dan mental wellness menjadi fokus utama.</p>
<p>Selain itu, kesadaran terhadap lingkungan juga meningkat. Konsep hidup minimalis dan eco-friendly mulai diterapkan dalam kehidupan sehari-hari.</p>
<h3>Kesimpulan</h3>
<p>Gaya hidup sehat bukan hanya tentang tubuh, tapi juga tentang cara berpikir dan hidup selaras dengan alam dan masyarakat.</p>
HTML
                ],
                'Politik' => [
                    'excerpt' => 'Mengulas dinamika politik global dan pengaruh media sosial dalam demokrasi modern.',
                    'content' => <<<HTML
<h2>Politik dan Era Informasi</h2>
<p>Perkembangan teknologi komunikasi membuat politik menjadi semakin terbuka dan partisipatif. Media sosial memainkan peran besar dalam membentuk opini publik.</p>
<p>Kampanye digital, aktivisme online, dan e-voting menjadi wajah baru demokrasi. Namun, tantangan seperti hoaks dan polarisasi juga meningkat.</p>
<h3>Kesimpulan</h3>
<p>Partisipasi cerdas masyarakat menjadi kunci keberhasilan demokrasi digital yang sehat dan berimbang.</p>
HTML
                ],
                'Seni' => [
                    'excerpt' => 'Perkembangan seni kontemporer yang berkolaborasi dengan teknologi digital.',
                    'content' => <<<HTML
<h2>Seni dalam Dunia Digital</h2>
<p>Seni kini tidak terbatas pada kanvas dan panggung. Teknologi membawa seni ke bentuk baru seperti seni digital, NFT, dan seni interaktif.</p>
<p>Seniman masa kini bereksperimen dengan realitas virtual dan augmented reality untuk menyampaikan pesan yang lebih dalam dan imersif.</p>
<h3>Kesimpulan</h3>
<p>Seni tetap menjadi cerminan zaman, dan teknologi membuka ruang ekspresi yang lebih luas dan inklusif bagi para kreator.</p>
HTML
                ],
                default => [
                    'excerpt' => 'Artikel informatif tentang berbagai topik menarik.',
                    'content' => '<p>Konten umum yang membahas topik bermanfaat untuk semua kategori.</p>',
                ],
            };

            $artikel = Artikel::create([
                'title' => $title,
                'slug' => $slug,
                'excerpt' => $contentData['excerpt'],
                'content' => $contentData['content'],
                'image' => "images/{$i}.jpg", // pastikan ada file ini
                'status' => 'published',
                'category_id' => $category->id,
                'user_id' => $user->id,
                'published_at' => Carbon::now()->subDays(rand(1, 30)),
                'is_featured' => rand(0, 1),
            ]);

            $artikel->tags()->attach($tags->random(rand(2, 3))->pluck('id'));
        }
    }
}
