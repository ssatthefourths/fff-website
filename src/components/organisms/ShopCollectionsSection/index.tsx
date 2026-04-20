import { useRef, useState } from 'react';
import { WaveDivider } from '../../ui/WaveDivider';
import { Link } from 'react-router';
import svgPaths from '../../../assets/svgPaths';
import { patterns } from '../../../data/products';
import imgFrame256 from 'figma:asset/c9712d88d9a9a431f7fb17b4a516a3a946e53ee0.png';
import imgFrame257 from 'figma:asset/ddd96d147d6704729dbdbb04809e812f4d2508eb.png';
import { imgGroup7, imgGroup8, imgGroup9 } from '../../../imports/svg-9news';

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
    <div className="hidden lg:block absolute top-[235px] right-0 w-[23.33%] overflow-clip" data-name="HEART BG TOP RIGHT NEW">
      <ClipPathGroup7 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 text-[#3f3f3f] text-center" data-name="TEXT">
      <p className="font-['Bingo_Action_Comic:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[clamp(36px,5vw,70px)] w-full max-w-[1200px]">Patterns for every stage of your journey!</p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[26px] w-full max-w-[1200px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Browse our collection of over 120 fun, easy-to-follow sewing patterns. From cuddly animals to adorable dolls — find the perfect pattern for every skill level. All patterns are instant PDF downloads!`}</p>
    </div>
  );
}

const TABS = [
  { key: 'featured', label: 'best sellers', filter: (p: typeof patterns[0]) => p.isFeatured },
  { key: 'beginner', label: 'beginner friendly', filter: (p: typeof patterns[0]) => p.difficulty === 'beginner' },
  { key: 'seasonal', label: 'seasonal', filter: (p: typeof patterns[0]) => p.category === 'seasonal' },
  { key: 'new', label: 'new', filter: (p: typeof patterns[0]) => p.isNew },
] as const;

const TAB_TITLES: Record<string, { title: string; subtitle: string }> = {
  featured: { title: 'Browse Best Sellers', subtitle: 'Our most popular patterns loved by thousands of Funky Friends Factory fans worldwide!' },
  beginner: { title: 'Browse Beginner Friendly Patterns', subtitle: 'Perfect for first-time sewers! These patterns are easy to follow with step-by-step photo instructions.' },
  seasonal: { title: 'Browse Seasonal Patterns', subtitle: 'Sew some cute gifts for your loved ones with these seasonal patterns. All INSTANT downloads.' },
  new: { title: 'Browse New Designs', subtitle: 'Check out our latest pattern releases — fresh designs just added to the collection!' },
};

const CARD_COLORS = ['#fdf8e0', '#d7e9f7', '#f4eefa', '#dde8a3', '#f9b7b7', '#bbd148'];

function DrawersContent() {
  const [activeTab, setActiveTab] = useState('seasonal');
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => scrollRef.current?.scrollBy({ left: dir * 290, behavior: 'smooth' });

  const tab = TABS.find(t => t.key === activeTab) ?? TABS[2];
  const filteredProducts = patterns.filter(tab.filter);
  const info = TAB_TITLES[activeTab] ?? TAB_TITLES.seasonal;

  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="DRAWERS CONTENT">
      {/* TABS */}
      <div className="content-stretch flex flex-wrap gap-[15px] items-start justify-center relative shrink-0 w-full max-w-[937px]" data-name="DRAWER TABS">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => { setActiveTab(t.key); scrollRef.current?.scrollTo({ left: 0 }); }}
            className={`content-stretch flex items-center justify-center p-[10px] relative rounded-[5px] shrink-0 cursor-pointer transition-all duration-200 ${
              activeTab === t.key
                ? 'bg-[#fffdf3] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-none rounded-br-none'
                : 'bg-[#dde8a3] hover:brightness-105'
            }`}
          >
            <span className={`font-['Roboto:Bold',sans-serif] font-bold text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap ${
              activeTab === t.key ? 'text-[#8b52c5] font-black' : 'text-[#3f3f3f]'
            }`} style={{ fontVariationSettings: "'wdth' 100" }}>
              {t.label}
            </span>
          </button>
        ))}
      </div>

      {/* DRAWER CONTENT */}
      <div className="bg-[#fffdf3] content-stretch flex flex-col gap-[40px] items-center px-4 py-8 lg:px-[30px] lg:py-[60px] relative rounded-[20px] shrink-0" data-name="DRAWER CONTENT">
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 text-[#3f3f3f] text-center">
          <p className="capitalize font-['Bingo_Action_Comic:Regular',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[clamp(28px,4vw,50px)] w-full max-w-[1200px]">{info.title}</p>
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[26px] w-full max-w-[1200px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {info.subtitle}
          </p>
        </div>

        <div className="content-stretch flex gap-[30px] items-center justify-center relative shrink-0 w-full max-w-[1270px]">
          <button onClick={() => scroll(-1)} className="h-[40px] relative shrink-0 w-[20px] cursor-pointer hover:scale-110 transition-transform" aria-label="Scroll left">
            <div className="absolute inset-[-6.25%_-12.5%_-6.25%_-17.68%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.0355 45">
                <path d={svgPaths.p1ad98580} stroke="var(--stroke-0, #3F3F3F)" strokeLinecap="round" strokeWidth="5" />
              </svg>
            </div>
          </button>

          <div ref={scrollRef} className="overflow-x-auto scroll-smooth flex gap-[30px] items-start w-full snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filteredProducts.map((product, i) => (
              <Link
                key={product.id}
                to={`/patterns/${product.category}/${product.slug}`}
                className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 w-[261px] snap-start hover:shadow-md transition-[box-shadow] duration-200"
              >
                <div className="h-[236px] relative rounded-[20px] shrink-0 w-[260px]">
                  <div className="absolute inset-0 pointer-events-none rounded-[20px]">
                    <div className="absolute inset-0 rounded-[20px]" style={{ backgroundColor: CARD_COLORS[i % CARD_COLORS.length] }} />
                    <div className="absolute inset-0 flex items-center justify-center rounded-[20px]">
                      <span className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[60px] text-white/30">{product.name.charAt(0)}</span>
                    </div>
                  </div>
                </div>
                <div className="font-['Figtree:Bold',sans-serif] font-bold leading-[1.5] text-[#8b52c5] text-[26px] text-center w-[261px]">
                  {product.name}
                </div>
                <div className="font-['Avenir:Book',sans-serif] not-italic leading-[1.6] text-[#3f3f3f] text-[18px] text-center w-[261px]">
                  {product.shortDescription}
                </div>
                <span className="font-['Roboto:Bold',sans-serif] font-bold text-[#8b52c5] text-[20px]">
                  {product.isFree ? 'FREE' : `$${product.price.toFixed(2)}`}
                </span>
              </Link>
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
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex gap-[30px] items-start relative shrink-0" data-name="BUTTONS">
      <Link to="/patterns" className="bg-[#8b52c5] content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[100px] shrink-0 hover:brightness-110 hover:scale-[1.02] transition-[transform,filter] duration-200" data-name="SHOP ALL PATTERNS">
        <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#fffdf3] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">shop all patterns</p>
        </div>
      </Link>
      <Link to="/patterns?category=free" className="bg-[#fffdf3] content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[100px] shrink-0 hover:brightness-110 hover:scale-[1.02] transition-[transform,filter] duration-200" data-name="EXPLORE WHAT'S FOR FREE">
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
    <div className="content-stretch flex flex-col gap-12 lg:gap-[103px] items-center pb-16 lg:pb-[150px] pt-16 lg:pt-[112px] px-4 sm:px-6 md:px-10 lg:px-[50px] max-w-[1440px] mx-auto" data-name="CONTAINER">
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
    <div className="hidden lg:block absolute bottom-[156px] right-[306px] w-[89px] h-[104px] overflow-clip" data-name="EXPRESSION">
      <ClipPathGroup9 />
    </div>
  );
}


export function ShopCollectionsSection() {
  return (
    <div className="relative w-full overflow-x-clip" data-name="SHOP COLLECTIONS SECTION">
      {/* Section divider: white/cream above → yellow-green below */}
      <div className="relative w-full overflow-visible">
        <WaveDivider topColor="#fffdf3" bottomColor="#bbd148" height={98} flipX />
        {/* Illustration overflows upward from divider */}
        <div className="hidden lg:flex absolute w-[196px] h-[161px] left-[90px] top-[-44px] items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[100cqh] w-[100cqw]">
            <Illustration />
          </div>
        </div>
      </div>

      {/* Yellow-green content area */}
      <div className="relative bg-[#bbd148]">
        <HeartBgTopRightNew />
        <Container1 />
      </div>
    </div>
  );
}

export default ShopCollectionsSection;
