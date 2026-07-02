import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import UpcomingEventBanner from '@/components/UpcomingEventBanner';
import AboutUs from '@/components/AboutUs';
import Gallery from '@/components/Gallery';
import Events from '@/components/Events';
import ShopPreview from '@/components/ShopPreview';
import JoinUs from '@/components/JoinUs';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import AskQuestion from '@/components/AskQuestion';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <UpcomingEventBanner />
      <Hero />
      <AboutUs />
      <Gallery />
      <Events />
      
      <Blog />
      <AskQuestion />
      <Footer />
    </main>
  );
}
