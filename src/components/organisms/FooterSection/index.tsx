import { Link } from 'react-router';
import svgPaths from '../../../assets/svgPaths';

function FooterLogo() {
  return (
    <img
      src="/illustrations/Funky Friends Factory_RGB_Primary Logo_White.svg"
      alt="Funky Friends Factory"
      className="w-[240px] lg:w-[276px] shrink-0"
    />
  );
}

function CentreCta() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-center justify-center relative shrink-0 w-full lg:w-[605px]" data-name="CENTRE CTA">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#fffdf3] text-[26px] text-center whitespace-normal sm:whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sign up to my newsletter and get my...
      </p>
      <p className="font-['Magic_Honey:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#fffdf3] text-[clamp(28px,4vw,45px)] text-center w-full max-w-[440px]">Honey Teddy pattern for FREE!</p>
      <Link to="/beginners" className="bg-[#f6d75a] content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[100px] shrink-0 w-full sm:w-[320px] hover:brightness-110 hover:scale-[1.02] transition-all duration-200" data-name="Button">
        <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#3f3f3f] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">get your free pattern</p>
        </div>
      </Link>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[162px]">
      <Link to="/about" className="relative shrink-0 hover:underline">about</Link>
      <Link to="/patterns" className="relative shrink-0 hover:underline">shop</Link>
      <Link to="/faq" className="relative shrink-0 hover:underline">help</Link>
      <Link to="/beginners" className="relative shrink-0 hover:underline">tutorials</Link>
      <Link to="/blog" className="relative shrink-0 hover:underline">blog</Link>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0">
      <p className="relative shrink-0">Contact</p>
      <p className="relative shrink-0">Privacy Policy</p>
      <p className="relative shrink-0">Terms of Use</p>
      <p className="relative shrink-0">Cookies</p>
    </div>
  );
}

function MenuFooter() {
  return (
    <div className="capitalize content-stretch flex flex-col sm:flex-row gap-4 sm:gap-0 font-['Avenir:Heavy',sans-serif] items-start leading-[1.6] not-italic relative shrink-0 text-white text-[18px] whitespace-nowrap" data-name="MENU FOOTER">
      <Frame3 />
      <Frame5 />
    </div>
  );
}

function FooterSocial() {
  return (
    <div className="content-stretch flex gap-[27px] h-[28px] items-start relative shrink-0 w-full" data-name="FOOTER SOCIAL">
      <a href="https://www.facebook.com/FunkyFriendsFactory" target="_blank" rel="noopener noreferrer" className="overflow-clip relative shrink-0 size-[28px]" data-name="icon-facebook">
        <div className="absolute inset-[0_23.22%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9964 28">
            <path d={svgPaths.p1036e500} fill="var(--fill-0, #FFFDF3)" id="Vector" />
          </svg>
        </div>
      </a>
      <a href="https://www.pinterest.com/funkyfriendsfactory/" target="_blank" rel="noopener noreferrer" className="overflow-clip relative shrink-0 size-[28px]" data-name="icon-pinterest">
        <div className="absolute inset-[1.27%_12.5%_1.25%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 27.295">
            <path d={svgPaths.p3f7cc0} fill="var(--fill-0, #FFFDF3)" id="Vector" />
          </svg>
        </div>
      </a>
      <a href="https://www.instagram.com/funkyfriendsfactory/" target="_blank" rel="noopener noreferrer" className="overflow-clip relative shrink-0 size-[28px]" data-name="icon-instagram">
        <div className="absolute inset-[6.22%_6.22%_6.25%_6.24%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.5137 24.5082">
            <path d={svgPaths.p2d77ab80} fill="var(--fill-0, #FFFDF3)" id="Vector" />
          </svg>
        </div>
      </a>
    </div>
  );
}

function MenuItems() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full lg:w-[290px]" data-name="MENU ITEMS">
      <MenuFooter />
      <FooterSocial />
    </div>
  );
}

export function FooterSection() {
  return (
    <div className="relative w-full overflow-x-clip" data-name="FOOTER SECTION">
      <div className="bg-[#8b52c5]">
        <div className="relative px-4 py-12 sm:px-6 md:px-8 lg:px-[50px] lg:py-[60px] content-stretch max-w-[1440px] mx-auto flex flex-col items-center text-center lg:text-left lg:flex-row lg:items-center justify-between gap-8 lg:gap-0" data-name="FOOTER CONTENT">
          <FooterLogo />
          <CentreCta />
          <MenuItems />
        </div>
      </div>
      <div className="bg-white text-[#8b52c5] text-center py-4 font-['Avenir:Heavy',sans-serif] text-[18px] capitalize leading-[1.6]" data-name="COPYRIGHT BAR">
        © 2026 Funky Friends factory
      </div>
    </div>
  );
}

export default FooterSection;
