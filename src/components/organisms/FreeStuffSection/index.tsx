import { useRef } from 'react';
import { Link } from 'react-router';
import svgPaths from '../../../assets/svgPaths';
import { WaveDivider } from '../../ui/WaveDivider';
import imgScreenshot20240311At1201 from 'figma:asset/960a23c45c6cc9ccd4981d84131d22dc14b255d4.png';
import imgScreenshot20240311At1202 from 'figma:asset/a31414da72a96cfe72dc9096eb31f4505524a3a9.png';
import imgScreenshot20240311At1203 from 'figma:asset/82be614aad6ba9573a49093da258451aa98c533e.png';

function Title() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 text-[#3f3f3f] text-center" data-name="TITLE">
      <p className="font-['Bingo_Action_Comic:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[clamp(36px,5vw,70px)] w-full max-w-[954px]">Love Free Stuff? There's loads to get you started!</p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[clamp(18px,2.5vw,26px)] w-full max-w-[1200px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Get started with FREE patterns, video tutorials, and a toy-making email course. Everything you need to begin your soft toy sewing journey — no experience required!`}</p>
    </div>
  );
}

interface FreeStuffCardProps {
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
  to: string;
}

function FreeStuffCard({ imageSrc, title, description, buttonText, to }: FreeStuffCardProps) {
  return (
    <div className="bg-white relative rounded-[20px] w-full h-full">
      <div aria-hidden="true" className="absolute border-3 border-[#8b52c5] border-dashed inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-center p-[25px] relative size-full">
          <div className="aspect-square relative rounded-[10px] shrink-0 w-full overflow-hidden">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imageSrc} />
          </div>
          <div className="capitalize flex flex-col font-['Bingo_Action_Comic:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#8b52c5] text-[clamp(28px,2.6vw,42px)] text-center w-[min-content] min-h-[70px] lg:min-h-[100px]">
            <p className="leading-[1.1]">{title}</p>
          </div>
          <div className="flex flex-col font-['Avenir:Book',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#3f3f3f] text-[18px] text-center w-[min-content]">
            <p className="leading-[1.5]">{description}</p>
          </div>
          <Link to={to} className="content-stretch flex items-center justify-center px-[40px] py-[16px] relative rounded-[100px] shrink-0 mt-auto hover:bg-[#8b52c5]/10 hover:scale-[1.02] transition-[transform,background-color] duration-200" data-name="Button">
            <div aria-hidden="true" className="absolute border-2 border-[#8b52c5] border-solid inset-0 pointer-events-none rounded-[100px]" />
            <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8b52c5] text-[16px] text-center tracking-[2.5px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[normal]">{buttonText}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

const CARDS: FreeStuffCardProps[] = [
  {
    imageSrc: imgScreenshot20240311At1201,
    title: 'Start with a free pattern',
    description: "It's EASY! Just sign up for my email Newsletter and I'll give you a thank you gift! I'll give you my Honey Teddy Pattern for FREE!",
    buttonText: 'get the pattern',
    to: '/beginners',
  },
  {
    imageSrc: imgScreenshot20240311At1202,
    title: 'Video: How I made Honey Teddy',
    description: "I have a video of making my Honey Teddy – so you can see how it's done and get to see the basics of sewing softies!",
    buttonText: 'watch the video',
    to: '/beginners',
  },
  {
    imageSrc: imgScreenshot20240311At1203,
    title: 'Toy-Making Class',
    description: 'If you want to find out ALL you need to know – to get started sewing soft toys – this course is for YOU!',
    buttonText: 'sign up for free',
    to: '/beginners',
  },
];

function ArrowIcon() {
  return (
    <div className="absolute inset-[-6.25%_-12.5%_-6.25%_-17.68%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.0355 45">
        <path d={svgPaths.p1ad98580} stroke="var(--stroke-0, #3F3F3F)" strokeLinecap="round" strokeWidth="5" />
      </svg>
    </div>
  );
}

function ContentSideScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => scrollRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });

  return (
    <div className="w-full max-w-[1440px]" data-name="CONTENT SIDE SCROLLER">
      {/* Desktop: 3-column grid — all cards visible, no horizontal scroll needed */}
      <div className="hidden lg:grid grid-cols-3 gap-[30px]">
        {CARDS.map((card) => (
          <FreeStuffCard key={card.title} {...card} />
        ))}
      </div>

      {/* Mobile + tablet: horizontal scroll carousel with snap + arrows */}
      <div className="lg:hidden content-stretch flex gap-[20px] items-center justify-center w-full">
        <button onClick={() => scroll(-1)} className="h-[40px] relative shrink-0 w-[20px] cursor-pointer hover:scale-110 transition-transform" aria-label="Scroll left">
          <ArrowIcon />
        </button>
        <div ref={scrollRef} className="flex gap-[20px] overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-1 min-w-0 px-2 scroll-px-2">
          {CARDS.map((card) => (
            <div key={card.title} className="flex flex-row items-stretch shrink-0 snap-start w-[min(320px,85vw)]">
              <FreeStuffCard {...card} />
            </div>
          ))}
        </div>
        <button onClick={() => scroll(1)} className="flex items-center justify-center relative shrink-0 cursor-pointer hover:scale-110 transition-transform" aria-label="Scroll right">
          <div className="flex-none rotate-180">
            <div className="h-[40px] relative w-[20px]">
              <ArrowIcon />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="relative bg-[#dde8a3] w-full" data-name="CONTENT">
      <div className="content-stretch flex flex-col gap-[75px] items-center px-4 py-12 sm:px-6 md:px-10 md:py-16 lg:px-[50px] lg:py-[140px] max-w-[1440px] mx-auto">
        <Title />
        <ContentSideScroller />
      </div>
    </div>
  );
}

export function FreeStuffSection() {
  return (
    <div className="relative w-full overflow-x-clip" data-name="FREE STUFF SECTION">
      <Content1 />
      <WaveDivider topColor="#dde8a3" bottomColor="#fffdf3" height={104} flipY />
    </div>
  );
}

export default FreeStuffSection;
