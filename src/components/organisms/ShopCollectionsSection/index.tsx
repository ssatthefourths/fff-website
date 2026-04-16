import React from 'react';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import svgPaths from '../../../assets/svgPaths';
import { patterns } from '../../../data/products';
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
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[26px] w-full max-w-[1200px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Browse our collection of over 120 fun, easy-to-follow sewing patterns. From cuddly animals to adorable dolls — find the perfect pattern for every skill level. All patterns are instant PDF downloads!`}</p>
    </div>
  );
}

const TABS = [
  { key: 'beginner', label: 'easy/beginners', filter: (p: typeof patterns[0]) => p.difficulty === 'beginner' },
  { key: 'advanced', label: 'challenging', filter: (p: typeof patterns[0]) => p.difficulty === 'advanced' || p.difficulty === 'intermediate' },
  { key: 'seasonal', label: 'seasonal', filter: (p: typeof patterns[0]) => p.category === 'seasonal' },
  { key: 'featured', label: 'best sellers', filter: (p: typeof patterns[0]) => p.isFeatured },
  { key: 'new', label: 'new designs', filter: (p: typeof patterns[0]) => p.isNew },
] as const;

const TAB_TITLES: Record<string, { title: string; subtitle: string }> = {
  beginner: { title: 'Browse Beginner Patterns', subtitle: 'Perfect for first-time sewers! These patterns are easy to follow with step-by-step photo instructions.' },
  advanced: { title: 'Browse Challenging Patterns', subtitle: 'Ready for a challenge? These patterns feature more complex techniques for experienced sewers.' },
  seasonal: { title: 'Browse Seasonal Patterns', subtitle: 'Sew some cute gifts for your loved ones with these seasonal patterns. All INSTANT downloads.' },
  featured: { title: 'Browse Best Sellers', subtitle: 'Our most popular patterns loved by thousands of Funky Friends Factory fans worldwide!' },
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
                className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 w-[261px] snap-start hover:-translate-y-1 transition-all duration-200"
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
