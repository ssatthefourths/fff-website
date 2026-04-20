import React from 'react';
import svgPaths from '../../../assets/svgPaths';
import { WaveDivider } from '../../ui/WaveDivider';
import { imgGroup4 } from '../../../imports/svg-9news';

function Socials() {
  return (
    <div className="content-stretch flex gap-[27px] h-[28px] items-start justify-center relative shrink-0 w-full" data-name="socials">
      <a href="https://www.facebook.com/FunkyFriendsFactory" target="_blank" rel="noopener noreferrer" className="overflow-clip relative shrink-0 size-[28px]"><div className="absolute inset-[0_23.22%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9964 28"><path d={svgPaths.p1036e500} fill="var(--fill-0, #8B52C5)" /></svg></div></a>
      <a href="https://www.pinterest.com/funkyfriendsfactory/" target="_blank" rel="noopener noreferrer" className="overflow-clip relative shrink-0 size-[28px]"><div className="absolute inset-[1.27%_12.5%_1.25%_12.5%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 27.295"><path d={svgPaths.p3f7cc0} fill="var(--fill-0, #8B52C5)" /></svg></div></a>
      <a href="https://www.instagram.com/funkyfriendsfactory/" target="_blank" rel="noopener noreferrer" className="overflow-clip relative shrink-0 size-[28px]"><div className="absolute inset-[6.22%_6.22%_6.25%_6.24%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.5137 24.5082"><path d={svgPaths.p2d77ab80} fill="var(--fill-0, #8B52C5)" /></svg></div></a>
    </div>
  );
}

function Content3() {
  return (
    <div className="relative bg-[#bbd148] w-full" data-name="CONTENT">
      <div className="content-stretch flex flex-col gap-[30px] items-center justify-center px-4 py-12 sm:px-6 md:px-10 lg:px-[50px] lg:py-[60px] max-w-[1440px] mx-auto">
      <p className="capitalize font-['Bingo_Action_Comic:Regular',sans-serif] leading-[1.1] min-w-full not-italic relative shrink-0 text-[#3f3f3f] text-[clamp(28px,4vw,45px)] text-center w-[min-content]">Want to get 5 FREE Funky Friends Factory Patterns for free?</p>
      <div className="font-['Roboto:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#3f3f3f] text-[0px] text-center w-full max-w-[1158px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0 text-[26px]">
          <span className="leading-[1.4]">{`This is my way of saying THANK YOU to Funky Friends Factory fans who not only sew fabulous Funky Friends toys but ALSO `}</span>
          <a className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] underline" href="https://www.funkyfriendsfactory.com/blog/easy-printable-tags-for-handmade-toys-free-copyright-credit-labels/" style={{ fontVariationSettings: "'wdth' 100" }} target="_blank" rel="noreferrer">support the independent designer community</a>
          <span className="leading-[1.4]">{` by giving pattern credits on their websites and social media posts! `}</span>
        </p>
        <p className="leading-[1.4] mb-0 text-[26px]">&nbsp;</p>
        <p className="text-[26px]">
          <span className="leading-[1.4] text-[#3f3f3f]">{`Tag your social media posts with `}</span>
          <span className="font-['Roboto:Black',sans-serif] font-black leading-[1.4] text-[#8b52c5]" style={{ fontVariationSettings: "'wdth' 100" }}>#funkyfriendsfactory</span>
          <span className="leading-[1.4] text-[#3f3f3f]">{`  – we can find your posts… \nand who knows, maybe our next featured Super Softie Seller could be be YOU!!!! `}</span>
        </p>
      </div>
      <Socials />
      </div>
    </div>
  );
}


function Group4() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.003px_-0.001px] mask-size-[121px_92px]" style={{ maskImage: `url('${imgGroup4}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120.998 91.9981">
        <g id="Group">
          <path d={svgPaths.p2124e300} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p1d9b6fe0} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.pe264880} fill="var(--fill-0, black)" id="Vector_3" />
          <path d={svgPaths.p3c7bf000} fill="var(--fill-0, black)" id="Vector_4" />
          <path d={svgPaths.p1006e00} fill="var(--fill-0, black)" id="Vector_5" />
          <path d={svgPaths.p3a41ab80} fill="var(--fill-0, black)" id="Vector_6" />
          <path d={svgPaths.p3b91e780} fill="var(--fill-0, black)" id="Vector_7" />
          <path d={svgPaths.p1fb88bc0} fill="var(--fill-0, black)" id="Vector_8" />
          <path d={svgPaths.pee2b800} fill="var(--fill-0, black)" id="Vector_9" />
          <path d={svgPaths.p28ad9700} fill="var(--fill-0, black)" id="Vector_10" />
          <path d={svgPaths.p12f4b00} fill="var(--fill-0, black)" id="Vector_11" />
          <path d={svgPaths.p24792600} fill="var(--fill-0, black)" id="Vector_12" />
          <path d={svgPaths.p11274500} fill="var(--fill-0, black)" id="Vector_13" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup4() {
  return (<div className="absolute contents inset-0" data-name="Clip path group"><Group4 /></div>);
}

function StarsIllustration() {
  return (
    <div className="hidden lg:block absolute bottom-[230px] right-[36px] w-[121px] h-[92px] overflow-clip" data-name="STARS ILLUSTRATION">
      <ClipPathGroup4 />
    </div>
  );
}


export function CtaFreePattern() {
  return (
    <div className="relative w-full overflow-x-clip" data-name="CTA FREE PATTERN">
      <Content3 />
      <WaveDivider topColor="#bbd148" bottomColor="#fffdf3" height={70} flipY />
    </div>
  );
}

export default CtaFreePattern;
