import HowItWorks from "./_components/HowItWorks";
import UpcomingDraws from "./_components/UpcomingDraws";
import CurrentJackpot from "./_components/CurrentJackpot";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen   text-white">
      <div className="container  mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="flex flex-col">
          <HowItWorks />
          <UpcomingDraws />
        </div>
        <div className="flex flex-col">
          <CurrentJackpot />
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
