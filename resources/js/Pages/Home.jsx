import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import HeroSection from '../Components/Home/HeroSection';
import LatestArtikel from '../Components/Home/LatestArtikel';
import MediaCard from '../Components/MediaCard';
import ArtikelCategory from '../Components/Home/ArtikelCategory';
import FeaturedMedia from '../Components/Home/FeaturedMedia';

export default function Home({ artikels, categories, media = [], featuredMedia = [] }) {
  const groupedByCategory = categories.map((category) => ({
    ...category,
    articles: artikels.data.filter((article) => article.category?.id === category.id),
  }));

  return (
    <AppLayout categories={categories}>
      <Head title="Beranda" />

      <HeroSection article={artikels.data[0]} />
      <LatestArtikel articles={artikels.data.slice(1, 7)} />
      <MediaCard media={ media } />
      <ArtikelCategory grouped={groupedByCategory} />
      <FeaturedMedia items={featuredMedia} />
      
    </AppLayout>
  );
}
