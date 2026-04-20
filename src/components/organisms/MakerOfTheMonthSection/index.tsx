import React from 'react';
import { WaveDivider } from '../../ui/WaveDivider';
import { useRef } from 'react';
import { Link } from 'react-router';
import svgPaths from '../../../assets/svgPaths';
import imgScreenshot20240311At1204 from 'figma:asset/a68f87b1b02b49aea545440ae371b307daed5e2c.png';
import imgScreenshot20240311At1205 from 'figma:asset/f704291322bd77ffa3c361b50df9a87f66c6db7b.png';
import imgUntitledDesign563 from 'figma:asset/f4e5f466ccd0fafd0b969fb06c776feae7507b11.png';
import imgUntitledDesign561 from 'figma:asset/c04939546f5c2f4cdcde698bf0467c0bdec3e6da.png';
import { makers } from '../../../data/makers';

const MAKER_IMAGES = [imgScreenshot20240311At1204, imgScreenshot20240311At1205, imgUntitledDesign563, imgUntitledDesign561];

function BgPatch1() {
  return (
    <div className="relative size-full" data-name="BG PATCH">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 463.184 475.2">
        <g clipPath="url(#clip0_1_1531)" id="BG PATCH">
          <path d={svgPaths.p2e85d00} fill="var(--fill-0, #F6D75A)" id="Vector" />
          <path d={svgPaths.p1307af0} id="Vector_2" stroke="var(--stroke-0, #3F3F3F)" strokeDasharray="12 12" strokeMiterlimit="10" strokeWidth="3" />
        </g>
        <defs>
          <clipPath id="clip0_1_1531">
            <rect fill="white" height="475.2" width="463.184" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 text-center" data-name="TITLE">
      <p className="font-['Bingo_Action_Comic:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#8b52c5] text-[clamp(36px,5vw,70px)] w-full max-w-[954px]">Maker of the month</p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#3f3f3f] text-[26px] w-full max-w-[1200px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        {`We've had lots of lovely entries this month from Highland cows to marvellous memory bears! `}
        <br aria-hidden="true" />
        Click through to the post to find out who won this month's maker's prize.🥳.
      </p>
    </div>
  );
}

function MakerCard({ name, patternName, imgSrc }: { name: string; patternName: string; imgSrc: string }) {
  return (
    <div className="flex flex-row items-center self-stretch snap-start shrink-0">
      <div className="bg-white h-full relative rounded-[20px] w-[300px]">
        <div aria-hidden="true" className="absolute border-3 border-[#8b52c5] border-dashed inset-0 pointer-events-none rounded-[20px]" />
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col gap-[15px] items-center p-[20px] relative size-full">
            <div className="aspect-square relative rounded-[5px] shrink-0 w-full overflow-hidden">
              <img alt={name} className="absolute inset-0 max-w-none object-cover size-full" src={imgSrc} />
            </div>
            <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 text-[#3f3f3f] text-[26px] text-center w-full">
              <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[1.4]">{name}</p>
              </div>
              <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[1.4]">{patternName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentSideScroller1() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => scrollRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });

  return (
    <div className="content-stretch flex gap-[20px] items-center justify-center relative shrink-0 w-full" data-name="CONTENT SIDE SCROLLER">
      <button onClick={() => scroll(-1)} className="h-[40px] relative shrink-0 w-[20px] cursor-pointer hover:scale-110 transition-transform" aria-label="Scroll left">
        <div className="absolute inset-[-6.25%_-12.5%_-6.25%_-17.68%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.0355 45">
            <path d={svgPaths.p1ad98580} stroke="var(--stroke-0, #3F3F3F)" strokeLinecap="round" strokeWidth="5" />
          </svg>
        </div>
      </button>
      <div ref={scrollRef} className="flex gap-[20px] overflow-x-auto scroll-smooth snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-1 min-w-0">
        {makers.map((maker, i) => (
          <MakerCard key={maker.id} name={maker.name} patternName={maker.patternName} imgSrc={MAKER_IMAGES[i % MAKER_IMAGES.length]} />
        ))}
      </div>
      <button onClick={() => scroll(1)} className="flex items-center justify-center relative shrink-0 cursor-pointer hover:scale-110 transition-transform" aria-label="Scroll right">
        <div className="flex-none rotate-180">
          <div className="h-[40px] relative w-[20px]">
            <div className="absolute inset-[-6.25%_-12.5%_-6.25%_-17.68%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.0355 45">
                <path d={svgPaths.p1ad98580} stroke="var(--stroke-0, #3F3F3F)" strokeLinecap="round" strokeWidth="5" />
              </svg>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function _Unused_OriginalFrame18() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 text-[#3f3f3f] text-[26px] text-center w-full">
      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.4]">Melissa Cochrane</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.4]">Bumble the Bee</p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 text-[#3f3f3f] text-[26px] text-center w-full">
      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.4]">Mary Shaw</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.4]">Harmony Highland Cow</p>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 text-[#3f3f3f] text-[26px] text-center w-full">
      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.4]">Maggie Durham</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.4]">Harmony Highland Cow</p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 text-[#3f3f3f] text-[26px] text-center w-full">
      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.4]">Janet O'Neil-Conlon</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.4]">Horsey Horse Unicorn</p>
      </div>
    </div>
  );
}

/* Old hardcoded ContentSideScroller1 removed — now dynamic above */

function Column() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-center relative shrink-0 w-full" data-name="COLUMN">
      <Title1 />
      <ContentSideScroller1 />
      <Link to="/blog" className="bg-[#bbd148] content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[100px] shrink-0 hover:brightness-110 hover:scale-[1.02] transition-[transform,filter] duration-200" data-name="Button">
        <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3f3f3f] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">Find out who the winner is</p>
        </div>
        <svg className="shrink-0 ml-3" width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
          <path d="M1 7h17m0 0l-6-6m6 6l-6 6" stroke="#3f3f3f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}

function Content2() {
  return (
    <div className="relative px-4 py-12 sm:px-6 md:px-8 lg:px-[50px] lg:py-[100px] content-stretch flex flex-col gap-[50px] items-center max-w-[1440px] mx-auto w-full" data-name="CONTENT">
      <Column />
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#8b52c5] text-[0px] text-center w-full max-w-[912px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span className="leading-[1.4] text-[#3f3f3f] text-[26px]">{`Want to enter the competition to win a FREE Funky Friends Factory pattern ? Make something and tag us `}</span>
        <span className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] text-[26px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          @
        </span>
        <span className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] text-[26px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          FunkyFriendsFactory
        </span>
      </p>
    </div>
  );
}

export function MakerOfTheMonthSection() {
  return (
    <div className="relative w-full overflow-x-clip" data-name="MAKER OF THE MONTH SECTION">
      <div className="hidden lg:flex absolute bottom-[280px] left-[33%] w-[145px] h-[142px] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[hypot(-39.8764cqw,36.4414cqh)] rotate-[42.5deg] skew-x-[-9.11deg] w-[hypot(60.1236cqw,63.5586cqh)]">
          <div className="relative size-full" data-name="ARROW SWIRL">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133.513 83.2882">
              <path d={svgPaths.p1af03780} fill="var(--fill-0, #8B52C5)" id="ARROW SWIRL" />
            </svg>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex absolute top-[180px] left-0 w-[32%] max-w-[480px] aspect-[463/475] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[hypot(-20.5743cqw,-80.2501cqh)] rotate-[165.83deg] w-[hypot(-79.4257cqw,19.7499cqh)]">
          <BgPatch1 />
        </div>
      </div>
      <Content2 />
      <WaveDivider topColor="#fffdf3" bottomColor="#dde8a3" height={90} />
    </div>
  );
}

export default MakerOfTheMonthSection;
