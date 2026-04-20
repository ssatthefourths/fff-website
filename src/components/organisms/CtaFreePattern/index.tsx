import svgPaths from '../../../assets/svgPaths';
import { WaveDivider } from '../../ui/WaveDivider';

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


export function CtaFreePattern() {
  return (
    <div className="relative w-full overflow-x-clip" data-name="CTA FREE PATTERN">
      <Content3 />
      <WaveDivider topColor="#bbd148" bottomColor="#fffdf3" height={70} flipY />
    </div>
  );
}

export default CtaFreePattern;
