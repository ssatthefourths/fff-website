import React from 'react';
import { Link } from 'react-router';
import svgPaths from '../../../assets/svgPaths';
import { WaveDivider } from '../../ui/WaveDivider';
import imgImage from 'figma:asset/e80c2105bb3cfbb556aa856bb71ecd1455ad8643.png';
import imgPrinceCharming21 from 'figma:asset/9ccf72bd11503f8e2fa1afe9127e0ef4d26deed3.png';
import { imgGroup6 } from '../../../imports/svg-9news';

function Patch() {
  return (
    <div className="h-[289px] relative w-[321px]" data-name="PATCH">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 321 289">
        <g clipPath="url(#clip0_1_1299)" id="PATCH">
          <path d={svgPaths.p24ba6100} fill="var(--fill-0, #DDE8A3)" id="Vector" />
          <path d={svgPaths.p175d9c80} id="Vector_2" stroke="var(--stroke-0, #3F3F3F)" strokeDasharray="11.91 11.91" strokeMiterlimit="10" strokeWidth="3" />
        </g>
        <defs>
          <clipPath id="clip0_1_1299">
            <rect fill="white" height="289" width="321" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[7.21%_13.72%_8.22%_20.75%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17.431px_-5.336px] mask-size-[83.094px_73.852px]" style={{ maskImage: `url('${imgGroup6}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 55.0429 62.5787">
        <g id="Group">
          <path d={svgPaths.p307bfb00} fill="var(--fill-0, #F9B7B7)" id="Vector" />
          <path d={svgPaths.p2f4eba00} fill="var(--fill-0, #B33C37)" id="Vector_2" />
          <path d={svgPaths.p2d45aa00} fill="var(--fill-0, #F3726D)" id="Vector_3" />
          <path d={svgPaths.p3175c000} fill="var(--fill-0, #F9B7B7)" id="Vector_4" />
          <path d={svgPaths.paac3640} fill="var(--fill-0, #BCBEC0)" id="Vector_5" />
          <path d={svgPaths.p36546780} fill="var(--fill-0, #BCBEC0)" id="Vector_6" />
          <path d={svgPaths.p2bb80740} fill="var(--fill-0, #F3726D)" id="Vector_7" />
          <path d={svgPaths.p31c29580} fill="var(--fill-0, #F3726D)" id="Vector_8" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup6() {
  return (
    <div className="absolute contents inset-[0_1.08%_0.2%_0]" data-name="Clip path group">
      <Group6 />
    </div>
  );
}

function Frame() {
  return (
    <div className="overflow-clip relative size-full" data-name="Frame">
      <ClipPathGroup6 />
    </div>
  );
}

function Pin() {
  return (
    <div className="h-[49.162px] overflow-clip relative w-[68.642px]" data-name="PIN">
      <div className="absolute flex inset-[-54.29%_-28.66%_-54.97%_-28.13%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[hypot(-37.7866cqw,90.3338cqh)] rotate-[25.4deg] w-[hypot(90.3338cqw,48.6893cqh)]">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function LeftContent() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] hidden lg:inline-grid leading-[0] place-items-start relative shrink-0" data-name="LEFT CONTENT">
      <div className="col-1 flex h-[325.877px] items-center justify-center ml-0 mt-[36.56px] relative row-1 w-[294.427px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[90.98deg]">
          <Patch />
        </div>
      </div>
      <div className="col-1 flex h-[629.026px] items-center justify-center ml-[83.53px] mt-0 relative row-1 w-[590.167px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[-3.63deg]">
          <div className="h-[595.164px] w-[553.589px]" data-name="vecteezy_paper-sticky-note_42054722 2" />
        </div>
      </div>
      <div className="col-1 flex h-[604.89px] items-center justify-center ml-[91.73px] mt-[41.55px] relative row-1 w-[571.84px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[-9.2deg]">
          <div className="bg-[#fffdf3] h-[532.947px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] w-[492.999px]" data-name="POLOROID BG" />
        </div>
      </div>
      <div className="col-1 flex h-[522.269px] items-center justify-center ml-[115.35px] mt-[64.08px] relative row-1 w-[522.837px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[-9.32deg]">
          <div className="h-[454.554px] relative w-[455.242px]" data-name="IMAGE">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
          </div>
        </div>
      </div>
      <div className="col-1 flex h-[73.852px] items-center justify-center ml-[482.47px] mt-[27px] relative row-1 w-[83.094px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[-25.4deg]">
          <Pin />
        </div>
      </div>
      <div className="col-1 flex h-[302px] items-center justify-center ml-[433.49px] mt-[462.33px] relative row-1 w-[341px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[302px] relative w-[341px]" data-name="Prince-Charming2 1">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[112.82%] left-0 max-w-none top-[-0.14%] w-full" src={imgPrinceCharming21} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubTitle1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full lg:w-[574px]" data-name="SUB TITLE">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#3f3f3f] text-[26px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`I'm an Australian soft toy designer on a mission to help YOU make the cutest soft toys EVER! Whether you're a beginner or experienced sewer, my patterns make it easy and fun.`}</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full lg:w-[574px]" data-name="TEXT">
      <div className="font-['Roboto:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#3f3f3f] text-[0px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.4] mb-0 text-[18px]">{`Cras facilisis sed dui id iaculis. Curabitur a est sagittis, volutpat diam a, aliquam libero. Maecenas sed pulvinar augue, id pulvinar risus. Proin aliquam, metus sed rhoncus laoreet, risus ligula cursus lectus, eu imperdiet arcu diam a nunc. Vestibulum sed risus non ligula eleifend venenatis a eget odio. `}</p>
        <p className="leading-[1.4] mb-0 text-[18px]">&nbsp;</p>
        <p className="font-['Figtree:Bold_Italic',sans-serif] font-bold italic leading-[1.5] text-[26px]">And it all started with Prince Charming!</p>
      </div>
    </div>
  );
}

function RightContent() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-start justify-center relative shrink-0 w-full lg:w-[564px]" data-name="RIGHT CONTENT">
      <p className="font-['Bingo_Action_Comic:Regular',sans-serif] leading-none min-w-full not-italic relative shrink-0 text-[#8b52c5] text-[clamp(36px,5vw,70px)] w-[min-content]">Hi, I'm Pauline</p>
      <SubTitle1 />
      <Text1 />
      <Link to="/about" className="bg-[#bbd148] content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[100px] shrink-0 hover:brightness-110 hover:scale-[1.02] transition-[transform,filter] duration-200" data-name="Button">
        <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3f3f3f] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">more about my story</p>
        </div>
      </Link>
    </div>
  );
}

function Content4() {
  return (
    <div className="relative w-full bg-[#f4eefa]" data-name="CONTENT">
      <div className="content-stretch flex flex-col lg:flex-row gap-8 lg:gap-[40px] items-center justify-center px-4 py-12 sm:px-6 md:px-10 md:py-14 lg:px-[50px] lg:py-[60px] max-w-[1440px] mx-auto">
        <LeftContent />
        <RightContent />
      </div>
    </div>
  );
}

function Stripes() {
  return (
    <div className="relative size-full" data-name="STRIPES">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 112 50">
        <g clipPath="url(#clip0_1_1523)" id="STRIPES">
          <path d={svgPaths.p2bfeb700} fill="var(--fill-0, #8B52C5)" id="Vector" />
          <path d={svgPaths.p3c8fe100} fill="var(--fill-0, #8B52C5)" id="Vector_2" />
          <path d={svgPaths.p2542b200} fill="var(--fill-0, #8B52C5)" id="Vector_3" />
          <path d={svgPaths.p24d66980} fill="var(--fill-0, #8B52C5)" id="Vector_4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1523">
            <rect fill="white" height="50" width="112" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ArrowSwirl() {
  return (
    <div className="overflow-clip relative size-full" data-name="ARROW SWIRL">
      <div className="absolute h-[122.001px] left-0 top-[-0.01px] w-[91.99px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91.9902 122.001">
          <path d={svgPaths.p7852a80} fill="var(--fill-0, #8B52C5)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Shrooms() {
  return (
    <div className="h-[131px] relative w-[171px]" data-name="SHROOMS">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 171 131">
        <g clipPath="url(#clip0_1_1239)" id="SHROOMS">
          <path d={svgPaths.p2bd51f80} fill="var(--fill-0, #F3726D)" id="Vector" />
          <path d={svgPaths.p1e407a00} fill="var(--fill-0, #F3726D)" id="Vector_2" />
          <path d={svgPaths.p2aabbb00} fill="var(--fill-0, #F3726D)" id="Vector_3" />
          <path d={svgPaths.p2b6a1580} fill="var(--fill-0, #F3726D)" id="Vector_4" />
          <path d={svgPaths.p1ec9eb00} fill="var(--fill-0, #F3726D)" id="Vector_5" />
          <path d={svgPaths.pd242880} fill="var(--fill-0, #F3726D)" id="Vector_6" />
          <path d={svgPaths.p3a59be00} fill="var(--fill-0, #F3726D)" id="Vector_7" />
        </g>
        <defs>
          <clipPath id="clip0_1_1239">
            <rect fill="white" height="131" width="171" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export function AboutSection() {
  return (
    <div className="relative w-full overflow-x-clip" data-name="ABOUT SECTION">
      <Content4 />
      <div className="absolute hidden lg:flex inset-[56.05%_47.26%_32.18%_44.58%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[hypot(-27.6521cqw,34.2727cqh)] rotate-[40.57deg] w-[hypot(72.3479cqw,65.7273cqh)]">
          <Stripes />
        </div>
      </div>
      <div className="absolute hidden lg:flex inset-[17.64%_51.75%_66.39%_38.75%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[hypot(-39.8321cqw,72.6498cqh)] rotate-[26.53deg] w-[hypot(60.1679cqw,27.3502cqh)]">
          <ArrowSwirl />
        </div>
      </div>
      <div className="relative w-full overflow-visible" data-name="ABOUT SHAPE DIVIDER">
        <WaveDivider topColor="#f4eefa" bottomColor="#fffdf3" height={100} />
        <div className="hidden lg:block absolute bottom-0 right-[239px]">
          <Shrooms />
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
