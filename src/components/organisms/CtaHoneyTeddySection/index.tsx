import React from 'react';
import { Link } from 'react-router';
import svgPaths from '../../../assets/svgPaths';
import imgHoneyTeddyBear1 from 'figma:asset/ebfee8ac4b459ca44ac0eaa5c0382625c835ab92.png';
import { imgGroup11, imgGroup12 } from '../../../imports/svg-9news';

function Group11() {
  return (
    <div className="absolute inset-[15.89%_13.31%_12.53%_4.29%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.971px_-22.24px] mask-size-[115.25px_139.438px]" style={{ maskImage: `url('${imgGroup11}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 95.5869 100.213">
        <g id="Group">
          <path d={svgPaths.p1f3f6a00} fill="var(--fill-0, #FFFDF3)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup11() {
  return (
    <div className="absolute contents inset-[0_0.65%_0.4%_0]" data-name="Clip path group">
      <Group11 />
    </div>
  );
}

function ArrowSwirl1() {
  return (
    <div className="hidden lg:block absolute inset-[55.93%_21.59%_10.17%_70.77%] overflow-clip" data-name="ARROW SWIRL">
      <ClipPathGroup11 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="TEXT">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#fffdf3] text-[clamp(16px,2vw,26px)] w-full lg:w-[1024px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Sign up to my newsletter and I'll send you my best toy-making tips & special offers too!`}</p>
    </div>
  );
}

function Name() {
  return (
    <div className="bg-[#fffdf3] content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[20px] shrink-0 w-full sm:w-[300px]" data-name="NAME">
      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3f3f3f] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">your name</p>
      </div>
    </div>
  );
}

function Email() {
  return (
    <div className="bg-[#fffdf3] h-full relative rounded-[20px] shrink-0 w-full sm:w-[666px]" data-name="EMAIL">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[40px] py-[20px] relative size-full">
          <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3f3f3f] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal]">your email</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NameEmail() {
  return (
    <div className="content-stretch flex flex-col sm:flex-row flex-[1_0_0] gap-[25px] items-start min-h-px min-w-px relative w-full" data-name="NAME EMAIL">
      <Name />
      <Email />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#fffdf3] relative rounded-[5px] size-[30px]" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function AgreeTickbox() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0" data-name="AGREE TICKBOX">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <Button1 />
        </div>
      </div>
      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#fffdf3] text-[0px] text-center tracking-[2.7px] uppercase whitespace-normal sm:whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="text-[18px]">
          <span className="leading-[normal]">{`i agree with the `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid font-['Roboto:Bold',sans-serif] font-bold leading-[normal] text-[#f6d75a] tracking-[2.7px] underline uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
            terms of use
          </span>
        </p>
      </div>
    </div>
  );
}

function AgreeTickboxButton() {
  return (
    <div className="content-stretch flex flex-col sm:flex-row gap-4 lg:gap-[50px] items-center relative shrink-0 w-full" data-name="AGREE TICKBOX BUTTON">
      <AgreeTickbox />
      <Link to="/beginners" className="bg-[#f6d75a] content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[100px] shrink-0 w-full sm:w-[532px] hover:brightness-110 hover:scale-[1.02] transition-all duration-200" data-name="SEND ME FREE PATTERN BUTTON">
        <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3f3f3f] text-[18px] text-center tracking-[2.7px] uppercase whitespace-normal sm:whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">send me my free pattern!</p>
        </div>
      </Link>
    </div>
  );
}

function Inputs() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] h-auto lg:h-[139px] items-start relative shrink-0 w-full" data-name="INPUTS">
      <NameEmail />
      <AgreeTickboxButton />
    </div>
  );
}

function CtaContent() {
  return (
    <div className="relative px-4 py-12 sm:px-6 md:px-8 md:py-14 lg:absolute lg:px-0 lg:py-0 content-stretch flex flex-col gap-[25px] lg:inset-[18.89%_30.68%_10.9%_4.08%] items-start justify-center max-w-[1400px] mx-auto" data-name="CTA CONTENT">
      <p className="font-['Magic_Honey:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#fffdf3] text-[clamp(28px,4vw,45px)] w-full lg:w-[931px]">Get my Honey Teddy pattern for FREE!</p>
      <Text3 />
      <Inputs />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute inset-[6.28%_1.79%_7.35%_0.77%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.362px_-8.787px] mask-size-[176.699px_139.348px]" style={{ maskImage: `url('${imgGroup12}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 172.476 120.922">
        <g id="Group">
          <path d={svgPaths.p6040f00} fill="var(--fill-0, #FFFDF3)" id="Vector" />
          <path d={svgPaths.p8b12e40} fill="var(--fill-0, #FFFDF3)" id="Vector_2" />
          <path d={svgPaths.p10245100} fill="var(--fill-0, #FFFDF3)" id="Vector_3" />
          <path d={svgPaths.p1e4c180} fill="var(--fill-0, #FFFDF3)" id="Vector_4" />
          <path d={svgPaths.p341dc980} fill="var(--fill-0, #FFFDF3)" id="Vector_5" />
          <path d={svgPaths.p3625ca80} fill="var(--fill-0, #FFFDF3)" id="Vector_6" />
          <path d={svgPaths.p2cf71a00} fill="var(--fill-0, #FFFDF3)" id="Vector_7" />
          <path d={svgPaths.p24066a00} fill="var(--fill-0, #FFFDF3)" id="Vector_8" />
          <path d={svgPaths.p3dc5bcb0} fill="var(--fill-0, #FFFDF3)" id="Vector_9" />
          <path d={svgPaths.p38a52880} fill="var(--fill-0, #FFFDF3)" id="Vector_10" />
          <path d={svgPaths.p2afa8a00} fill="var(--fill-0, #FFFDF3)" id="Vector_11" />
          <path d={svgPaths.p1d7a2d00} fill="var(--fill-0, #FFFDF3)" id="Vector_12" />
          <path d={svgPaths.p3f882df0} fill="var(--fill-0, #FFFDF3)" id="Vector_13" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup12() {
  return (
    <div className="absolute contents inset-[0_0.17%_0.47%_0]" data-name="Clip path group">
      <Group12 />
    </div>
  );
}

function Stars() {
  return (
    <div className="hidden lg:block absolute inset-[2.91%_24.75%_63.2%_63.59%] overflow-clip" data-name="STARS">
      <ClipPathGroup12 />
    </div>
  );
}

export function CtaHoneyTeddySection() {
  return (
    <div className="relative h-auto min-h-[300px] lg:h-[413px] w-full mt-[-30px] bg-[#8b52c5] lg:bg-transparent" data-name="CTA HONEY TEDDY SECTION">
      <div className="absolute bg-[#8b52c5] inset-[7.26%_0_0_0]" data-name="BG" />
      <ArrowSwirl1 />
      <CtaContent />
      <Stars />
      <div className="hidden md:block absolute aspect-[2404/1656] left-[70.7%] right-0 top-[-20%] z-10" data-name="Honey-Teddy-Bear 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHoneyTeddyBear1} />
      </div>
    </div>
  );
}

export default CtaHoneyTeddySection;
