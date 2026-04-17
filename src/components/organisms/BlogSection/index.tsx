import React from 'react';
import { Link } from 'react-router';
import svgPaths from '../../../assets/svgPaths';
import imgUntitledDesign561 from 'figma:asset/c04939546f5c2f4cdcde698bf0467c0bdec3e6da.png';
import imgUntitledDesign562 from 'figma:asset/c7cb7de78756b698f03f3c5ee1df7454f03f49fd.png';
import imgUntitledDesign563 from 'figma:asset/f4e5f466ccd0fafd0b969fb06c776feae7507b11.png';
import { imgGroup } from '../../../imports/svg-9news';
import { Illustration } from '../../ui/Illustration';

function Group() {
  return (
    <div className="absolute inset-[12.34%_-12.85%_6.23%_4.73%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-18.714px_-61.915px] mask-size-[471.407px_500.64px]" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 428.156 408.419">
        <g id="Group">
          <path d={svgPaths.p38bd1f0} fill="var(--fill-0, #F9B7B7)" id="Vector" />
          <path d={svgPaths.p3e4e7a00} id="Vector_2" stroke="var(--stroke-0, #3F3F3F)" strokeDasharray="12 12" strokeMiterlimit="10" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[0_-19.04%_0.18%_0]" data-name="Clip path group">
      <Group />
    </div>
  );
}

function BgPatch() {
  return (
    <div className="hidden lg:block absolute top-[48px] right-0 w-[27.5%] overflow-clip" data-name="BG PATCH">
      <ClipPathGroup />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start leading-[0] relative shrink-0 text-[#3f3f3f] text-center w-full">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[26px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.4]">Easter Sewing Competition 2026 Winner</p>
      </div>
      <div className="flex flex-col font-['Avenir:Book',sans-serif] justify-center not-italic relative shrink-0 text-[18px] w-full">
        <p className="leading-[1.6]">See the amazing entries in our Easter sewing competition! The creativity and skill on display this year was truly incredible.</p>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start leading-[0] relative shrink-0 text-[#3f3f3f] text-center w-full">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[26px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.4]">Best Wishes Baby Bird Pattern</p>
      </div>
      <div className="flex flex-col font-['Avenir:Book',sans-serif] justify-center not-italic relative shrink-0 text-[18px] w-full">
        <p className="leading-[1.6]">Introducing our newest pattern! The Best Wishes Baby Bird is perfect for baby showers and makes a wonderful keepsake gift.</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start leading-[0] relative shrink-0 text-[#3f3f3f] text-center w-full">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[26px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.4]">Maker of the Month — January 2026</p>
      </div>
      <div className="flex flex-col font-['Avenir:Book',sans-serif] justify-center not-italic relative shrink-0 text-[18px] w-full">
        <p className="leading-[1.6]">Meet this month's Super Softie Seller! Find out who won and see their fabulous handmade Funky Friends.</p>
      </div>
    </div>
  );
}

function BlogCards() {
  return (
    <div className="content-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[40px] items-start relative shrink-0 w-full" data-name="BLOG CARDS">
      <Link to="/blog/easter-sewing-competition-2026-winner" className="content-stretch flex flex-[1_0_0] flex-col gap-[36px] items-center min-h-px min-w-px relative hover:shadow-lg hover:-translate-y-1 transition-all duration-200 rounded-[20px]" data-name="CARD 1">
        <div className="h-[200px] sm:h-[250px] lg:h-[305px] relative rounded-[20px] shrink-0 w-full" data-name="Untitled design (56) 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgUntitledDesign561} />
        </div>
        <Frame15 />
      </Link>
      <Link to="/blog/best-wishes-baby-bird-pattern" className="content-stretch flex flex-[1_0_0] flex-col gap-[36px] items-center min-h-px min-w-px relative hover:shadow-lg hover:-translate-y-1 transition-all duration-200 rounded-[20px]" data-name="CARD 2">
        <div className="h-[200px] sm:h-[250px] lg:h-[305px] relative rounded-[20px] shrink-0 w-full" data-name="Untitled design (56) 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px]">
            <img alt="" className="absolute h-[126.67%] left-0 max-w-none top-[0.11%] w-full" src={imgUntitledDesign562} />
          </div>
        </div>
        <Frame16 />
      </Link>
      <Link to="/blog/maker-of-the-month-january-2026" className="content-stretch flex flex-[1_0_0] flex-col gap-[36px] items-center min-h-px min-w-px relative hover:shadow-lg hover:-translate-y-1 transition-all duration-200 rounded-[20px]" data-name="CARD 3">
        <div className="h-[200px] sm:h-[250px] lg:h-[305px] relative rounded-[20px] shrink-0 w-full" data-name="Untitled design (56) 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgUntitledDesign563} />
        </div>
        <Frame17 />
      </Link>
    </div>
  );
}

function BlogButton() {
  return (
    <Link to="/blog" className="content-stretch flex flex-col items-start relative shrink-0 hover:scale-[1.02] transition-all duration-200" data-name="BUTTON">
      <div className="content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[100px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border-3 border-[#8b52c5] border-solid inset-0 pointer-events-none rounded-[100px]" />
        <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8b52c5] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">check out all blog posts</p>
        </div>
      </div>
    </Link>
  );
}

function BlogContent() {
  return (
    <div className="relative content-stretch flex flex-col gap-[56px] items-center justify-center px-4 py-12 sm:px-6 md:px-10 md:py-16 lg:px-[50px] lg:py-[140px] max-w-[1440px] mx-auto" data-name="BLOG CONTENT">
      <p className="font-['Bingo_Action_Comic:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#3f3f3f] text-[clamp(36px,5vw,70px)] text-center w-full max-w-[1121px]">Read Our Blog</p>
      <BlogCards />
      <BlogButton />
    </div>
  );
}

function PinCushion() {
  return (
    <div className="hidden lg:block absolute bottom-[40px] right-[29px] w-[196px] h-[168px]" data-name="THIMBLE">
      <Illustration type="pin-cushion" variant="purple" />
    </div>
  );
}

export function BlogSection() {
  return (
    <div className="relative w-full overflow-x-clip" data-name="BLOG SECTION">
      <BgPatch />
      <BlogContent />
      <PinCushion />
    </div>
  );
}

export default BlogSection;
