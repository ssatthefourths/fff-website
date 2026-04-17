import { useState } from 'react';
import svgPaths from '../../../assets/svgPaths';
import imgImage1 from 'figma:asset/ca6d7901d0de35208dd65f919ab6f2d662531784.png';

const reviews = [
  {
    text: "I absolutely LOVE Funky Friends Factory patterns! They are so easy to follow with the step-by-step photo instructions. I've made over 20 toys now and every single one has turned out adorable. My grandkids go crazy for them!",
    name: 'Sarah M. — Verified Buyer',
  },
  {
    text: "The patterns are fantastic! As a complete beginner, I was nervous about sewing a stuffed animal, but the step-by-step photos made it so easy. My first Honey Teddy turned out perfect and now I'm hooked!",
    name: 'Jennifer K. — Verified Buyer',
  },
  {
    text: "I've tried many toy patterns over the years and Funky Friends Factory are hands down the best. The quality of the instructions, the clever designs, and the cute results keep me coming back for more. Highly recommend!",
    name: 'Margaret T. — Verified Buyer',
  },
];

export function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((i) => (i + 1) % reviews.length);

  return (
    <div className="relative content-stretch flex gap-4 sm:gap-8 lg:gap-[60px] items-center justify-center px-4 py-12 sm:px-6 md:px-12 md:py-16 lg:px-[80px] lg:py-[120px] w-full overflow-x-clip max-w-[1440px] mx-auto" data-name="REVIEWS SECTION">
      {/* LEFT ARROW */}
      <button onClick={prev} className="h-[40px] relative shrink-0 w-[20px] cursor-pointer hover:scale-110 transition-transform" data-name="LEFT ARROW" aria-label="Previous review">
        <div className="absolute inset-[-6.25%_-12.5%_-6.25%_-17.68%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.0355 45">
            <path d={svgPaths.p1ad98580} id="LEFT ARROW" stroke="var(--stroke-0, #3F3F3F)" strokeLinecap="round" strokeWidth="5" />
          </svg>
        </div>
      </button>

      {/* CONTENT */}
      <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative" data-name="CONTENT">
        <p className="font-['Bingo_Action_Comic:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#8b52c5] text-[60px] sm:text-[100px] lg:text-[150px] text-center whitespace-nowrap">"</p>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[30px] items-center min-h-px min-w-px relative" data-name="CENTRE IMAGE AND TEXT">
          <div className="h-[153px] relative shrink-0 w-[150px]" data-name="IMAGE">
            <div className="absolute inset-[-3.27%_-3.33%]">
              <img alt="" className="block max-w-none size-full" height="163" src={imgImage1} width="160" />
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[34px] items-center relative shrink-0 text-center w-full" data-name="TEXT">
            <p className="font-['Magic_Honey:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#3f3f3f] text-[clamp(24px,3.5vw,45px)] w-full transition-opacity duration-300" key={index}>
              {review.text}
            </p>
            <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#8b52c5] text-[18px] tracking-[2.7px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
              {review.name}
            </p>
          </div>
        </div>
        <p className="font-['Bingo_Action_Comic:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#8b52c5] text-[60px] sm:text-[100px] lg:text-[150px] text-center whitespace-nowrap">"</p>
      </div>

      {/* RIGHT ARROW */}
      <button onClick={next} className="h-[40px] relative shrink-0 w-[20px] cursor-pointer hover:scale-110 transition-transform" data-name="RIGHT ARROW" aria-label="Next review">
        <div className="absolute inset-[-6.25%_-12.5%_-6.25%_-17.68%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.0355 45">
            <path d="M2.5 42.5L22.5 22.5L2.5 2.5" id="RIGHT ARROW" stroke="var(--stroke-0, #3F3F3F)" strokeLinecap="round" strokeWidth="5" />
          </svg>
        </div>
      </button>
    </div>
  );
}

export default ReviewsSection;
