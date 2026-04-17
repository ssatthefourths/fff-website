import React from 'react';
import { Link } from 'react-router';
import svgPaths from '../../../assets/svgPaths';
import imgJan from 'figma:asset/11adb49771b256dbfb8229b0df294e2fb028fefc.png';
import imgLlamaPatternSewnByCuteCourtyardSoftToys1 from 'figma:asset/dfd428d4107e58f943f277780563ff64471632fd.png';

function PatchBehindPhoto() {
  return (
    <div className="relative size-full" data-name="PATCH BEHIND PHOTO">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 678.101 410.012">
        <g clipPath="url(#clip0_1_1303)" id="PATCH BEHIND PHOTO">
          <path d={svgPaths.p1b498880} fill="var(--fill-0, #D4BDE9)" id="Vector" />
          <path d={svgPaths.p1578ed00} id="Vector_2" stroke="var(--stroke-0, #3F3F3F)" strokeDasharray="12 12" strokeMiterlimit="10" strokeWidth="3" />
        </g>
        <defs>
          <clipPath id="clip0_1_1303">
            <rect fill="white" height="410.012" width="678.101" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Title2() {
  return (
    <div className="relative px-4 pt-12 pb-4 sm:px-6 md:px-12 lg:px-[50px] lg:pt-[60px] lg:pb-0 content-stretch flex flex-col gap-[20px] items-center text-center max-w-[1440px] mx-auto" data-name="TITLE">
      <p className="font-['Bingo_Action_Comic:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#8b52c5] text-[clamp(36px,5vw,70px)] w-full max-w-[954px]">Featured Maker</p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#3f3f3f] text-[26px] w-full max-w-[1200px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Highlighting a Super Softie SELLER. dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, tellus ac consequat tempus, nunc odio consequat quam, ultricies elementum urna nulla et purus. `}</p>
    </div>
  );
}

function SubTitle() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full lg:w-[574px]" data-name="SUB TITLE">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#3f3f3f] text-[26px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`Jan began her toy-making journey by sewing fabric dolls for orphans in Africa. Later on, she says she found FunkyFriendsFactory patterns & loved the animal patterns because she'd been sewing dollies for so long! `}</p>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full lg:w-[574px]" data-name="TEXT">
      <div className="font-['Roboto:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#3f3f3f] text-[0px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.4] mb-0 text-[18px]">{`Now she's been sewing them for 10 years! WOW!🤩 Jan sells the toys that she sews from the Funky Friends Factory patterns at local markets.  She and her hubby go to the Willunga Quarry & Stirling Market each month.`}</p>
        <p className="leading-[1.4] mb-0 text-[26px]">&nbsp;</p>
        <p>
          <span className="font-['Figtree:Bold_Italic',sans-serif] font-bold italic leading-[1.5] text-[26px]">CONGRATS Jan! You receive 5 FREE Funky Friends Factory Patterns of your choice</span>
          <span className="leading-[1.4] text-[18px]">!</span>
        </p>
      </div>
    </div>
  );
}

function ContentLeft() {
  return (
    <div className="bg-[#f4eefa] content-stretch flex flex-col gap-[25px] items-start justify-center mr-0 lg:mr-[-80px] p-[30px] relative rounded-[20px] shrink-0 w-full lg:w-[702px]" data-name="CONTENT LEFT">
      <p className="capitalize font-['Bingo_Action_Comic:Regular',sans-serif] leading-[1.1] min-w-full not-italic relative shrink-0 text-[#3f3f3f] text-[clamp(28px,4vw,50px)] w-[min-content]">Cute Courtyard Toys</p>
      <SubTitle />
      <Text />
      <Link to="/blog" className="bg-[#bbd148] content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[100px] shrink-0 hover:brightness-110 hover:scale-[1.02] transition-[transform,filter] duration-200" data-name="READ MORE ON THE BLOG">
        <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3f3f3f] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">read more on the blog</p>
        </div>
      </Link>
    </div>
  );
}

function ContentRight() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] hidden lg:inline-grid leading-[0] mr-[-80px] place-items-start relative shrink-0" data-name="CONTENT RIGHT">
      <div className="col-1 flex h-[609.168px] items-center justify-center ml-[28.17px] mt-0 relative row-1 w-[576.612px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[9.81deg]">
          <div className="bg-white h-[532.947px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] w-[492.999px]" data-name="POLOROID BG" />
        </div>
      </div>
      <div className="col-1 flex h-[524.698px] items-center justify-center ml-[59.13px] mt-[24.19px] relative row-1 w-[525.261px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[9.69deg]">
          <div className="h-[454.554px] relative w-[455.242px]" data-name="jan">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgJan} />
          </div>
        </div>
      </div>
      <p className="col-1 font-['Magic_Honey:Regular',sans-serif] leading-[1.4] ml-0 mt-[620.58px] not-italic relative row-1 text-[#3f3f3f] text-[25px] text-center w-[388px]">
        Look how supportive Jan's hubby
        <br aria-hidden="true" />
        is of her sewing biz!💗
      </p>
      <div className="col-1 flex h-[131.793px] items-center justify-center ml-[136.31px] mt-[492.51px] relative row-1 w-[136.026px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-[37.52deg]">
          <div className="h-[84px] relative w-[107.001px]" data-name="ARROW SWIRL">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 107.001 83.9995">
              <path d={svgPaths.p2e8cfa00} fill="var(--fill-0, #8B52C5)" id="ARROW SWIRL" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative px-4 py-12 sm:px-6 md:px-12 lg:py-[60px] content-stretch flex flex-col lg:flex-row items-center justify-center lg:pl-[80px] lg:pr-[160px] max-w-[1440px] mx-auto" data-name="CONTAINER">
      <ContentLeft />
      <ContentRight />
    </div>
  );
}

export function FeatureSection() {
  return (
    <div className="relative w-full overflow-x-clip" data-name="FEATURE SECTION">
      <div className="absolute hidden lg:flex inset-[6.52%_0_15.53%_53%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[hypot(-34.3312cqw,41.1529cqh)] rotate-[40.85deg] w-[hypot(65.6688cqw,58.8471cqh)]">
          <PatchBehindPhoto />
        </div>
      </div>
      <Title2 />
      <Container />
      <div className="absolute hidden lg:flex aspect-[258.73714951383954/380.76798883278116] items-center justify-center left-[66.12%] right-[18.31%] top-[586px]" style={{ containerType: "size" }}>
        <div className="-scale-x-100 flex-none h-[hypot(10.7516cqw,95.3534cqh)] rotate-[-4.38deg] w-[hypot(-89.2484cqw,4.6466cqh)]">
          <div className="relative size-full" data-name="Llama-pattern-sewn-by-CuteCourtyard-Soft-Toys 1">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLlamaPatternSewnByCuteCourtyardSoftToys1} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;
