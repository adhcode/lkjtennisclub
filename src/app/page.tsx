import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import AboutUs from '@/components/AboutUs';
import Gallery from '@/components/Gallery';
import Events from '@/components/Events';
import JoinUs from '@/components/JoinUs';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import AskQuestion from '@/components/AskQuestion';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutUs />
      <Gallery />
      <Events />
      <JoinUs />
      <Blog />
      <AskQuestion />
      <Footer />
    </main>
  );
}
