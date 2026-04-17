import { Link } from 'react-router';
import svgPaths from '../../../assets/svgPaths';
import { HeroGallery } from './HeroGallery';
import { WaveDivider } from '../../ui/WaveDivider';

function HeadingBlockHeroSection() {
  return (
    <div className="content-stretch flex flex-col gap-[23px] items-start relative shrink-0">
      <p className="capitalize font-['Bingo_Action_Comic:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#fdf8e0] text-[clamp(48px,6.6vw,95px)] w-full lg:w-[616px]">
        {`Come sew with our `}<span className="font-['Magic_Honey_Bold:Regular',sans-serif] text-[#bbd148] text-[clamp(44px,5.97vw,86px)]">fabulously</span>{` FUN community!`}
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#fffdf3] text-[clamp(16px,1.8vw,26px)] text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-full lg:w-[522px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        The place to find fun, easy-to-follow Soft Toy Sewing Patterns, step-by-step photo tutorials, lots of toy-making tips and tutorials to help you sew the cutest Soft Toys EVER! Come join the FUN!!!!
      </p>
    </div>
  );
}

function HeroContentHeroSection() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-start justify-end relative shrink-0" data-name="HERO CONTENT">
      <HeadingBlockHeroSection />
      <Link to="/beginners" className="bg-[#f6d75a] content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[100px] shrink-0 hover:brightness-110 hover:scale-[1.02] transition-[transform,filter] duration-200" data-name="Button">
        <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3f3f3f] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">beginner? Start here</p>
        </div>
      </Link>
    </div>
  );
}

function HeroLayoutHeroSection() {
  return (
    <div className="bg-[#8b52c5] content-stretch flex flex-col lg:flex-row items-center justify-between p-6 sm:p-8 md:p-10 lg:p-[50px] relative w-full max-w-[1440px] mx-auto" data-name="CONTENT">
      <HeroContentHeroSection />
      <HeroGallery />
    </div>
  );
}

export function HeroSection() {
  return (
    <div className="relative w-full overflow-x-clip bg-[#8b52c5] isolate" data-name="HERO SECTION">
      <HeroLayoutHeroSection />
      <div className="hidden lg:block absolute right-0 bottom-[98px] h-[148.764px] w-[265.032px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 265.032 148.764">
          <g id="Vector">
            <path d={svgPaths.p10b53e40} fill="var(--fill-0, #F6D75A)" />
            <path d={svgPaths.p2ba40600} fill="var(--fill-0, #F6D75A)" />
            <path d={svgPaths.p19108180} fill="var(--fill-0, #F6D75A)" />
          </g>
        </svg>
      </div>
      <WaveDivider topColor="#8b52c5" bottomColor="#fffdf3" height={98} />
      <div className="hidden lg:block absolute inset-[51.78%_50.54%_32.82%_37.9%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 181.943 135.499">
          <g id="Vector">
            <path d={svgPaths.p344ce340} fill="var(--fill-0, #FFFDF3)" />
            <path d={svgPaths.p3872ef80} fill="var(--fill-0, #FFFDF3)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default HeroSection;
