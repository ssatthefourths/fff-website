import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div className="bg-[#f4eefa] min-h-screen flex items-center justify-center">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20 max-w-[1400px] mx-auto text-center">
        <h1 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(80px,15vw,200px)] leading-none mb-4">
          404
        </h1>
        <p className="font-['Magic_Honey:Regular',sans-serif] text-[#3f3f3f] text-[clamp(24px,4vw,42px)] leading-tight mb-4">
          Oops! This page seems to have wandered off...
        </p>
        <p
          className="font-['Roboto:Regular',sans-serif] text-[#3f3f3f]/70 text-[18px] leading-[1.6] mb-10 max-w-lg mx-auto"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Don't worry, let's get you back to making fun toys!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-[100px] font-['Roboto:Bold',sans-serif] font-bold leading-[0] text-center tracking-[2.7px] uppercase whitespace-nowrap transition-opacity bg-[#8B52C5] text-[#FFFDF3] px-[40px] py-[20px] text-[18px] hover:opacity-90"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Go Home
          </Link>
          <Link
            to="/patterns"
            className="inline-flex items-center justify-center rounded-[100px] font-['Roboto:Bold',sans-serif] font-bold leading-[0] text-center tracking-[2.7px] uppercase whitespace-nowrap transition-opacity bg-[#BBD148] text-[#3F3F3F] px-[40px] py-[20px] text-[18px] hover:opacity-90"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Browse Patterns
          </Link>
        </div>
      </div>
    </div>
  );
}

export { NotFoundPage };
export default NotFoundPage;
