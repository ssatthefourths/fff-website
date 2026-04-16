import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router';
import svgPaths from '../../../assets/svgPaths';
import imgFrame256 from 'figma:asset/c9712d88d9a9a431f7fb17b4a516a3a946e53ee0.png';
import imgFrame257 from 'figma:asset/ddd96d147d6704729dbdbb04809e812f4d2508eb.png';
import { imgGroup7, imgGroup8, imgGroup9, imgGroup10 } from '../../../imports/svg-9news';

function Group7() {
  return (
    <div className="absolute inset-[9.51%_-9.47%_3.08%_3.25%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.922px_-33.393px] mask-size-[386.693px_350.219px]" style={{ maskImage: `url('${imgGroup7}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 356.904 306.805">
        <g id="Group">
          <path d={svgPaths.p3b860c80} fill="var(--fill-0, #FBEBAC)" id="Vector" />
          <path d={svgPaths.pb172900} id="Vector_2" stroke="var(--stroke-0, #3F3F3F)" strokeDasharray="12 12" strokeMiterlimit="10" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup7() {
  return (
    <div className="absolute contents inset-[0_-15.09%_0.22%_0]" data-name="Clip path group">
      <Group7 />
    </div>
  );
}

function HeartBgTopRightNew() {
  return (
    <div className="hidden lg:block absolute inset-[22.19%_0_54.43%_76.67%] overflow-clip" data-name="HEART BG TOP RIGHT NEW">
      <ClipPathGroup7 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 text-[#3f3f3f] text-center" data-name="TEXT">
      <p className="font-['Bingo_Action_Comic:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[clamp(36px,5vw,70px)] w-full max-w-[1200px]">Patterns for every stage of your journey!</p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[26px] w-full max-w-[1200px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, tellus ac consequat tempus, nunc odio consequat quam, ultricies elementum urna nulla et purus. `}</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[#dde8a3] content-stretch flex items-center justify-center p-[10px] relative rounded-[5px] shrink-0">
      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3f3f3f] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">easy/beginners</p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[#dde8a3] content-stretch flex items-center justify-center p-[10px] relative rounded-[5px] shrink-0">
      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3f3f3f] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">challenging</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#fffdf3] content-stretch flex h-[54px] items-start justify-center p-[10px] relative rounded-tl-[5px] rounded-tr-[5px] shrink-0 w-[167px]">
      <div className="flex flex-col font-['Roboto:Black',sans-serif] font-black justify-center leading-[0] relative shrink-0 text-[#8b52c5] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">seasonal</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-[#dde8a3] content-stretch flex items-center justify-center p-[10px] relative rounded-[5px] shrink-0">
      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3f3f3f] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">best sellers</p>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[#dde8a3] content-stretch flex items-center justify-center p-[10px] relative rounded-[5px] shrink-0">
      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3f3f3f] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">new designs</p>
      </div>
    </div>
  );
}

function DrawerTabs() {
  return (
    <div className="content-stretch flex flex-wrap gap-[15px] items-start justify-center relative shrink-0 w-full max-w-[937px]" data-name="DRAWER TABS">
      <Frame13 />
      <Frame12 />
      <Frame6 />
      <Frame11 />
      <Frame14 />
    </div>
  );
}

function DrawerTitle() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 text-[#3f3f3f] text-center" data-name="DRAWER TITLE">
      <p className="capitalize font-['Bingo_Action_Comic:Regular',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[clamp(28px,4vw,50px)] w-full max-w-[1200px]">Browse Seasonal Patterns</p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[26px] w-full max-w-[1200px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sew some cute gift for your loved ones with these seasonal patterns. All INSTANT downloads.
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col h-[236px] items-start p-[12px] relative rounded-[20px] shrink-0 w-[260px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[20px]">
        <div className="absolute bg-[#fdf8e0] inset-0 rounded-[20px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[20px]">
          <img alt="" className="absolute h-[100.09%] left-[-6.88%] max-w-none top-[-0.05%] w-[113.76%]" src={imgFrame256} />
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="h-[236px] relative rounded-[20px] shrink-0 w-[260px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[20px]">
        <div className="absolute bg-[#d7e9f7] inset-0 rounded-[20px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[20px]">
          <img alt="" className="absolute h-[88%] left-[10.15%] max-w-none top-[6%] w-[80%]" src={imgFrame257} />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col h-[236px] items-start p-[12px] relative rounded-[20px] shrink-0 w-[260px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[20px]">
        <div className="absolute bg-[#fdf8e0] inset-0 rounded-[20px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[20px]">
          <img alt="" className="absolute h-[100.09%] left-[-6.88%] max-w-none top-[-0.05%] w-[113.76%]" src={imgFrame256} />
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="h-[236px] relative rounded-[20px] shrink-0 w-[260px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[20px]">
        <div className="absolute bg-[#dde8a3] inset-0 rounded-[20px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[20px]">
          <img alt="" className="absolute h-[100.09%] left-[-6.88%] max-w-none top-[-0.05%] w-[113.76%]" src={imgFrame256} />
        </div>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] items-start relative shrink-0" data-name="CONTENT">
      <div className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 w-full lg:w-[261px]" data-name="DRAWER CARD 1">
        <Frame7 />
        <div className="flex flex-col font-['Figtree:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8b52c5] text-[26px] text-center w-full lg:w-[261px]">
          <p className="leading-[1.5]">Elf Christmas Twin Dolls</p>
        </div>
        <div className="flex flex-col font-['Avenir:Book',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3f3f3f] text-[18px] text-center w-full lg:w-[261px]">
          <p className="leading-[1.6]">{`They'll look awesome in all sorts of Christmas prints so get festive and mix and match to make your own!`}</p>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 w-full lg:w-[261px]" data-name="DRAWER CARD 2">
        <Frame8 />
        <div className="flex flex-col font-['Figtree:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8b52c5] text-[26px] text-center w-full lg:w-[261px]">
          <p className="leading-[1.5]">{`Reggie Reindeer `}</p>
        </div>
        <div className="flex flex-col font-['Avenir:Book',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3f3f3f] text-[18px] text-center w-full lg:w-[261px]">
          <p className="leading-[1.6]">{`They'll look awesome in all sorts of Christmas prints so get festive and mix and match to make your own!`}</p>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 w-full lg:w-[261px]" data-name="DRAWER CARD 3">
        <Frame9 />
        <div className="flex flex-col font-['Figtree:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8b52c5] text-[26px] text-center w-full lg:w-[261px]">
          <p className="leading-[1.5]">Socks the Sitting Cat</p>
        </div>
        <div className="flex flex-col font-['Avenir:Book',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3f3f3f] text-[18px] text-center w-full lg:w-[261px]">
          <p className="leading-[1.6]">{`They'll look awesome in all sorts of Christmas prints so get festive and mix and match to make your own!`}</p>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 w-full lg:w-[261px]" data-name="DRAWER CARD 4">
        <Frame10 />
        <div className="flex flex-col font-['Figtree:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8b52c5] text-[26px] text-center w-full lg:w-[261px]">
          <p className="leading-[1.5]">Ben the Beginner Bear</p>
        </div>
        <div className="flex flex-col font-['Avenir:Book',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3f3f3f] text-[18px] text-center w-full lg:w-[261px]">
          <p className="leading-[1.6]">{`They'll look awesome in all sorts of Christmas prints so get festive and mix and match to make your own!`}</p>
        </div>
      </div>
    </div>
  );
}

function DrawerContent() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });

  return (
    <div className="bg-[#fffdf3] content-stretch flex flex-col gap-[40px] items-center px-4 py-8 lg:px-[30px] lg:py-[60px] relative rounded-[20px] shrink-0" data-name="DRAWER CONTENT">
      <DrawerTitle />
      <div className="content-stretch flex gap-[30px] items-center justify-center relative shrink-0 w-full max-w-[1270px]" data-name="DRAWER CONTENT">
        <button onClick={() => scroll(-1)} className="h-[40px] relative shrink-0 w-[20px] cursor-pointer hover:scale-110 transition-transform" data-name="LEFT ARROW" aria-label="Scroll left">
          <div className="absolute inset-[-6.25%_-12.5%_-6.25%_-17.68%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.0355 45">
              <path d={svgPaths.p1ad98580} id="ARROW LEFT" stroke="var(--stroke-0, #3F3F3F)" strokeLinecap="round" strokeWidth="5" />
            </svg>
          </div>
        </button>
        <div ref={scrollRef} className="overflow-x-auto scroll-smooth flex gap-[30px] items-start w-full snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Content5 />
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
    </div>
  );
}

function DrawersContent() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="DRAWERS CONTENT">
      <DrawerTabs />
      <DrawerContent />
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex gap-[30px] items-start relative shrink-0" data-name="BUTTONS">
      <Link to="/patterns" className="bg-[#8b52c5] content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[100px] shrink-0 hover:brightness-110 hover:scale-[1.02] transition-all duration-200" data-name="SHOP ALL PATTERNS">
        <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#fffdf3] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">shop all patterns</p>
        </div>
      </Link>
      <Link to="/patterns?category=free" className="bg-[#fffdf3] content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[100px] shrink-0 hover:brightness-110 hover:scale-[1.02] transition-all duration-200" data-name="EXPLORE WHAT'S FOR FREE">
        <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8b52c5] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">explore what's for free</p>
        </div>
      </Link>
    </div>
  );
}

function Container2() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[50px] items-center ml-0 mt-0 relative row-1" data-name="CONTAINER">
      <DrawersContent />
      <Buttons />
    </div>
  );
}

function Drawers() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="DRAWERS">
      <Container2 />
    </div>
  );
}

function Container1() {
  return (
    <div className="relative lg:absolute content-stretch flex flex-col gap-12 lg:gap-[103px] inset-auto lg:inset-[6.53%_0_0_0] items-center pb-16 lg:pb-[150px] pt-16 lg:pt-[112px] px-4 sm:px-6 md:px-10 lg:px-[50px] max-w-[1400px] mx-auto" data-name="CONTAINER">
      <Text2 />
      <Drawers />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute inset-[0.01%_0.13%_0.33%_0.03%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.051px_-0.013px] mask-size-[195.76px_160.47px]" style={{ maskImage: `url('${imgGroup8}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 195.702 160.454">
        <g id="Group">
          <path d={svgPaths.p1a9d2600} fill="var(--fill-0, #8B52C5)" id="Vector" />
          <path d={svgPaths.p5ee9840} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p2e005d00} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p3bed7840} fill="var(--fill-0, #8B52C5)" id="Vector_4" />
          <path d={svgPaths.p31fc6b00} fill="var(--fill-0, #8B52C5)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup8() {
  return (
    <div className="absolute contents inset-[0_0.12%_0.33%_0]" data-name="Clip path group">
      <Group8 />
    </div>
  );
}

function Illustration() {
  return (
    <div className="overflow-clip relative size-full" data-name="ILLUSTRATION">
      <ClipPathGroup8 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[9.06%_12.63%_14.59%_7.17%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-6.379px_-9.517px] mask-size-[88.669px_104.755px]" style={{ maskImage: `url('${imgGroup9}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71.384 80.1636">
        <g id="Group">
          <path d={svgPaths.p8deb170} fill="var(--fill-0, #8B52C5)" id="Vector" />
          <path d={svgPaths.p79df400} fill="var(--fill-0, #8B52C5)" id="Vector_2" />
          <path d={svgPaths.p1d963a00} fill="var(--fill-0, #8B52C5)" id="Vector_3" />
          <path d={svgPaths.p3561700} fill="var(--fill-0, #8B52C5)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup9() {
  return (
    <div className="absolute contents inset-[0_0.37%_0.23%_0]" data-name="Clip path group">
      <Group9 />
    </div>
  );
}

function Expression() {
  return (
    <div className="hidden lg:block absolute inset-[82.61%_21.25%_10.39%_72.57%] overflow-clip" data-name="EXPRESSION">
      <ClipPathGroup9 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute inset-[0.01%_-0.04%_0.04%_0.02%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.035px_-0.02px] mask-size-[225px_144px]" style={{ maskImage: `url('${imgGroup10}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 225.058 143.919">
        <g id="Group">
          <path d={svgPaths.p10f8ac00} fill="var(--fill-0, #8B52C5)" id="Vector" />
          <path d={svgPaths.p11295480} fill="var(--fill-0, #8B52C5)" id="Vector_2" />
          <path d={svgPaths.pf64df80} fill="var(--fill-0, #8B52C5)" id="Vector_3" />
          <path d={svgPaths.p3ad61cc0} fill="var(--fill-0, #8B52C5)" id="Vector_4" />
          <path d={svgPaths.p395ab600} fill="var(--fill-0, #8B52C5)" id="Vector_5" />
          <path d={svgPaths.p39c54f00} fill="var(--fill-0, #8B52C5)" id="Vector_6" />
          <path d={svgPaths.p4b851aa} fill="var(--fill-0, #8B52C5)" id="Vector_7" />
          <path d={svgPaths.pe317100} fill="var(--fill-0, #8B52C5)" id="Vector_8" />
          <path d={svgPaths.p301f3d00} fill="var(--fill-0, #8B52C5)" id="Vector_9" />
          <path d={svgPaths.p1bb3aa00} fill="var(--fill-0, #8B52C5)" id="Vector_10" />
          <path d={svgPaths.p3e564500} fill="var(--fill-0, #8B52C5)" id="Vector_11" />
          <path d={svgPaths.p27134e00} fill="var(--fill-0, #8B52C5)" id="Vector_12" />
          <path d={svgPaths.p1a67c000} fill="var(--fill-0, #8B52C5)" id="Vector_13" />
          <path d={svgPaths.p2ac495f0} fill="var(--fill-0, #8B52C5)" id="Vector_14" />
          <path d={svgPaths.p36e6d980} fill="var(--fill-0, #8B52C5)" id="Vector_15" />
          <path d={svgPaths.p5c73870} fill="var(--fill-0, #8B52C5)" id="Vector_16" />
          <path d={svgPaths.p22a3f700} fill="var(--fill-0, #8B52C5)" id="Vector_17" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup10() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group10 />
    </div>
  );
}

function Stuffing() {
  return (
    <div className="hidden lg:block absolute inset-[87.28%_2.15%_3.13%_82.22%] overflow-clip" data-name="STUFFING">
      <ClipPathGroup10 />
    </div>
  );
}

export function ShopCollectionsSection() {
  return (
    <div className="relative h-auto lg:h-[1501px] w-full overflow-x-clip" data-name="SHOP COLLECTIONS SECTION">
      <div className="absolute bg-[#bbd148] inset-[6.53%_0_0_0]" data-name="SECTION BG" />
      <HeartBgTopRightNew />
      <Container1 />
      <div className="absolute flex inset-[0_0_93.47%_0] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="relative size-full" data-name="SECTION DIVIDER">
            <div className="absolute inset-[16.55%_0_0_0]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 81.8235">
                <path d={svgPaths.pf37eb00} fill="var(--fill-0, #FFFDF3)" id="Vector 233" />
              </svg>
            </div>
            <div className="absolute inset-[0_0_13.69%_0]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 84.6308">
                <path d={svgPaths.p18cf2a00} fill="var(--fill-0, #BBD148)" id="Vector 234" />
              </svg>
            </div>
            <div className="absolute inset-[2.27%_0_25.93%_0]">
              <div className="absolute inset-[-2.13%_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440.61 73.4006">
                  <path d={svgPaths.p15608fe0} id="Vector 235" stroke="var(--stroke-0, #8B52C5)" strokeDasharray="12 12" strokeWidth="3" />
                </svg>
              </div>
            </div>
            <div className="absolute flex inset-[-44.82%_80.14%_-19.38%_6.25%] items-center justify-center" style={{ containerType: "size" }}>
              <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
                <Illustration />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Expression />
      <Stuffing />
    </div>
  );
}

export default ShopCollectionsSection;
