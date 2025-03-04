import HeroSection from "./_components/HeroSection";
import HotDeal from "./_components/HotDeal";

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 pt-24">
        <HeroSection />
        <HotDeal />
      </div>
    </div>
  );
};

export default Home;
