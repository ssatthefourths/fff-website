import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router';
import svgPaths from '../../../assets/svgPaths';
import imgScreenshot20240311At1201 from 'figma:asset/960a23c45c6cc9ccd4981d84131d22dc14b255d4.png';
import imgScreenshot20240311At1202 from 'figma:asset/a31414da72a96cfe72dc9096eb31f4505524a3a9.png';
import imgScreenshot20240311At1203 from 'figma:asset/82be614aad6ba9573a49093da258451aa98c533e.png';
import { imgGroup2, imgGroup3 } from '../../../imports/svg-9news';

function Title() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 text-[#3f3f3f] text-center" data-name="TITLE">
      <p className="font-['Bingo_Action_Comic:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[clamp(36px,5vw,70px)] text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-full max-w-[954px]">Love Free Stuff? There's loads to get you started!</p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[clamp(18px,2.5vw,26px)] w-full max-w-[1200px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Get started with FREE patterns, video tutorials, and a toy-making email course. Everything you need to begin your soft toy sewing journey — no experience required!`}</p>
    </div>
  );
}

function ContentSideScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => scrollRef.current?.scrollBy({ left: dir * 420, behavior: 'smooth' });

  return (
    <div className="content-stretch flex gap-[30px] items-center justify-center relative shrink-0 w-full max-w-[1440px]" data-name="CONTENT SIDE SCROLLER">
      <button onClick={() => scroll(-1)} className="h-[40px] relative shrink-0 w-[20px] cursor-pointer hover:scale-110 transition-transform" data-name="LEFT ARROW" aria-label="Scroll left">
        <div className="absolute inset-[-6.25%_-12.5%_-6.25%_-17.68%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.0355 45">
            <path d={svgPaths.p1ad98580} id="LEFT ARROW" stroke="var(--stroke-0, #3F3F3F)" strokeLinecap="round" strokeWidth="5" />
          </svg>
        </div>
      </button>
      <div ref={scrollRef} className="flex gap-[30px] overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-1 min-w-0">
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-white h-full relative rounded-[20px] shrink-0 w-full sm:w-[399px]" data-name="CARD 1">
          <div aria-hidden="true" className="absolute border-3 border-[#8b52c5] border-dashed inset-0 pointer-events-none rounded-[20px]" />
          <div className="flex flex-col items-center size-full">
            <div className="content-stretch flex flex-col gap-[27px] items-center p-[30px] relative size-full">
              <div className="relative rounded-[20px] shrink-0 size-[200px] sm:size-[280px]"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgScreenshot20240311At1201} /></div>
              <div className="capitalize flex flex-col font-['Bingo_Action_Comic:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#8b52c5] text-[50px] text-center w-[min-content]"><p className="leading-[1.1]">Start with a free pattern</p></div>
              <div className="flex flex-col font-['Avenir:Book',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#3f3f3f] text-[18px] text-center w-[min-content]"><p className="leading-[1.6]">It's EASY! Just sign up for my email Newsletter and I'll give you a thank you gift! I'll give you my Honey Teddy Pattern for FREE!</p></div>
              <Link to="/beginners" className="content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[100px] shrink-0 hover:bg-[#8b52c5]/10 hover:scale-[1.02] transition-all duration-200" data-name="Button">
                <div aria-hidden="true" className="absolute border-2 border-[#8b52c5] border-solid inset-0 pointer-events-none rounded-[100px]" />
                <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8b52c5] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}><p className="leading-[normal]">get the pattern</p></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-white h-full relative rounded-[20px] shrink-0 w-full sm:w-[399px]" data-name="CARD 2">
          <div aria-hidden="true" className="absolute border-3 border-[#8b52c5] border-dashed inset-0 pointer-events-none rounded-[20px]" />
          <div className="flex flex-col items-center size-full">
            <div className="content-stretch flex flex-col gap-[27px] items-center p-[30px] relative size-full">
              <div className="relative rounded-[20px] shrink-0 size-[200px] sm:size-[280px]"><div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px]"><img alt="" className="absolute h-full left-[-0.09%] max-w-none top-0 w-[150.66%]" src={imgScreenshot20240311At1202} /></div></div>
              <div className="capitalize flex flex-col font-['Bingo_Action_Comic:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#8b52c5] text-[50px] text-center w-[min-content]"><p className="leading-[1.1]">Video: How I made Honey Teddy</p></div>
              <div className="flex flex-col font-['Avenir:Book',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#3f3f3f] text-[18px] text-center w-[min-content]"><p className="leading-[1.6]">I have a video of making my Honey Teddy – so you can see how it's done and get to see the basics of sewing softies!</p></div>
              <Link to="/beginners" className="content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[100px] shrink-0 hover:bg-[#8b52c5]/10 hover:scale-[1.02] transition-all duration-200" data-name="Button">
                <div aria-hidden="true" className="absolute border-2 border-[#8b52c5] border-solid inset-0 pointer-events-none rounded-[100px]" />
                <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8b52c5] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}><p className="leading-[normal]">watch the video</p></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-white h-full relative rounded-[20px] shrink-0 w-full sm:w-[399px]" data-name="CARD 3">
          <div aria-hidden="true" className="absolute border-3 border-[#8b52c5] border-dashed inset-0 pointer-events-none rounded-[20px]" />
          <div className="flex flex-col items-center size-full">
            <div className="content-stretch flex flex-col gap-[27px] items-center p-[30px] relative size-full">
              <div className="relative rounded-[20px] shrink-0 size-[200px] sm:size-[280px]"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgScreenshot20240311At1203} /></div>
              <div className="capitalize flex flex-col font-['Bingo_Action_Comic:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#8b52c5] text-[50px] text-center w-[min-content]"><p className="leading-[1.1]">Toy-Making Class</p></div>
              <div className="flex flex-col font-['Avenir:Book',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#3f3f3f] text-[18px] text-center w-[min-content]"><p className="leading-[1.6]">If you want to find out ALL you need to know – to get started sewing soft toys – this course is for YOU!</p></div>
              <Link to="/beginners" className="content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[100px] shrink-0 hover:bg-[#8b52c5]/10 hover:scale-[1.02] transition-all duration-200" data-name="Button">
                <div aria-hidden="true" className="absolute border-2 border-[#8b52c5] border-solid inset-0 pointer-events-none rounded-[100px]" />
                <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8b52c5] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}><p className="leading-[normal]">sign up for free</p></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
      <button onClick={() => scroll(1)} className="flex items-center justify-center relative shrink-0 cursor-pointer hover:scale-110 transition-transform" aria-label="Scroll right">
        <div className="flex-none rotate-180">
          <div className="h-[40px] relative w-[20px]" data-name="RIGHT ARROW">
            <div className="absolute inset-[-6.25%_-12.5%_-6.25%_-17.68%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.0355 45">
                <path d={svgPaths.p1ad98580} id="RIGHT ARROW" stroke="var(--stroke-0, #3F3F3F)" strokeLinecap="round" strokeWidth="5" />
              </svg>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function Content1() {
  return (
    <div className="relative lg:absolute bg-[#dde8a3] w-full lg:inset-[0_0_9.44%_0]" data-name="CONTENT">
      <div className="content-stretch flex flex-col gap-[75px] items-center px-4 py-12 sm:px-6 md:px-10 md:py-16 lg:px-[50px] lg:py-[140px] max-w-[1400px] mx-auto">
        <Title />
        <ContentSideScroller />
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[-1.95%_0_0_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-2px] mask-size-[100%_105px]" style={{ maskImage: `url('${imgGroup2}')` }} data-name="Group">
      <div className="absolute inset-[-1.95%_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440.83 104.393">
          <g id="Group">
            <path d={svgPaths.p248b7500} fill="var(--fill-0, #DDE8A3)" id="Vector" />
            <path d={svgPaths.p7242a00} fill="var(--fill-0, #FFFDF3)" id="Vector_2" />
            <path d={svgPaths.p120c0000} id="Vector_3" stroke="var(--stroke-0, #8B52C5)" strokeDasharray="12 12" strokeWidth="4" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group2 />
    </div>
  );
}

function ShapeDivider() {
  return (
    <div className="hidden lg:block absolute inset-[90.14%_0_2.52%_0] overflow-clip" data-name="SHAPE DIVIDER">
      <ClipPathGroup2 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[19.3%_0.9%_20.8%_4.8%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-13.88px_-37.054px] mask-size-[288.262px_191.414px]" style={{ maskImage: `url('${imgGroup3}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 272.525 115.014">
        <g id="Group">
          <path d={svgPaths.p23dca880} fill="var(--fill-0, #8B52C5)" id="Vector" />
          <path d={svgPaths.p2c6ea380} fill="var(--fill-0, #8B52C5)" id="Vector_2" />
          <path d={svgPaths.p302b4400} fill="var(--fill-0, #8B52C5)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div className="absolute contents inset-[0_0.26%_0.31%_0]" data-name="Clip path group">
      <Group3 />
    </div>
  );
}

function Scissors() {
  return (
    <div className="hidden lg:block absolute inset-[86.57%_74.72%_0_5.21%] overflow-clip" data-name="SCISSORS">
      <ClipPathGroup3 />
    </div>
  );
}

export function FreeStuffSection() {
  return (
    <div className="relative h-auto lg:h-[1430px] w-full overflow-x-clip" data-name="FREE STUFF SECTION">
      <Content1 />
      <ShapeDivider />
      <Scissors />
    </div>
  );
}

export default FreeStuffSection;
