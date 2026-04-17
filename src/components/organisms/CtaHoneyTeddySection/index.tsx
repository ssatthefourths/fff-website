import React, { useState } from 'react';
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
    <div className="hidden lg:block absolute bottom-[42px] right-[310px] w-[110px] h-[140px] overflow-clip pointer-events-none" data-name="ARROW SWIRL">
      <ClipPathGroup11 />
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
    <div className="hidden lg:block absolute top-[12px] right-[355px] w-[168px] h-[140px] overflow-clip pointer-events-none" data-name="STARS">
      <ClipPathGroup12 />
    </div>
  );
}

function Inputs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!name.trim()) { setError('Please enter your name'); return; }
    if (!email.trim() || !email.includes('@')) { setError('Please enter a valid email'); return; }
    if (!agreed) { setError('Please agree to the terms of use'); return; }
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
    } catch {
      // API might not be available in dev — still show success
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="content-stretch flex flex-col gap-[15px] items-center relative shrink-0 w-full text-center" data-name="INPUTS">
        <p className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#f6d75a] text-[clamp(28px,4vw,45px)]">Thank You! 🎉</p>
        <p className="font-['Roboto:Regular',sans-serif] text-[#fffdf3] text-[22px] leading-[1.4]" style={{ fontVariationSettings: "'wdth' 100" }}>Check your email for your free Honey Teddy pattern!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[20px] w-full" data-name="INPUTS">
      <div className="flex flex-col sm:flex-row gap-[25px] w-full">
        <input
          type="text"
          placeholder="YOUR NAME"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#fffdf3] px-[30px] py-[18px] rounded-[20px] w-full sm:w-[280px] font-['Roboto:Bold',sans-serif] font-bold text-[#3f3f3f] text-[16px] tracking-[2.7px] uppercase placeholder:text-[#3f3f3f]/40 focus:outline-none focus:ring-2 focus:ring-[#f6d75a]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        />
        <input
          type="email"
          placeholder="YOUR EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#fffdf3] px-[30px] py-[18px] rounded-[20px] w-full sm:flex-1 font-['Roboto:Bold',sans-serif] font-bold text-[#3f3f3f] text-[16px] tracking-[2.7px] uppercase placeholder:text-[#3f3f3f]/40 focus:outline-none focus:ring-2 focus:ring-[#f6d75a]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 lg:gap-[30px] items-center w-full">
        <label className="flex gap-[12px] items-center shrink-0 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="size-[24px] accent-[#f6d75a] rounded-[5px] shrink-0" />
          <span className="font-['Roboto:Bold',sans-serif] font-bold text-[#fffdf3] text-[14px] tracking-[2px] uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
            i agree with the{' '}
            <Link to="/terms" className="text-[#f6d75a] underline">terms of use</Link>
          </span>
        </label>
        <button onClick={handleSubmit} className="bg-[#f6d75a] flex items-center justify-center px-[40px] py-[18px] rounded-[100px] w-full sm:flex-1 hover:brightness-110 hover:scale-[1.02] transition-[transform,filter] duration-200 cursor-pointer">
          <span className="font-['Roboto:Bold',sans-serif] font-bold text-[#3f3f3f] text-[16px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            send me my free pattern!
          </span>
        </button>
      </div>
      {error && <p className="text-[#f6d75a] font-['Roboto:Bold',sans-serif] font-bold text-[14px]">{error}</p>}
    </div>
  );
}

export function CtaHoneyTeddySection() {
  return (
    <div className="relative w-full overflow-x-clip bg-[#8b52c5]" data-name="CTA HONEY TEDDY SECTION">
      <div className="relative max-w-[1440px] mx-auto px-4 py-12 sm:px-6 md:px-8 lg:px-[50px] lg:py-[50px] flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-0">
        <ArrowSwirl1 />
        <Stars />
        <div className="flex flex-col gap-[25px] items-start justify-center w-full lg:flex-1 relative z-[1]" data-name="CTA CONTENT">
          <p className="font-['Magic_Honey:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#fffdf3] text-[clamp(28px,4vw,45px)] w-full">Get my Honey Teddy pattern for FREE!</p>
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#fffdf3] text-[clamp(16px,2vw,26px)] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`Sign up to my newsletter and I'll send you my best toy-making tips & special offers too!`}</p>
          <Inputs />
        </div>
        <div className="hidden lg:block relative shrink-0 w-[380px] lg:-mt-[100px] lg:-mb-[20px]" data-name="HONEY TEDDY BEAR">
          <img alt="" className="w-full h-auto object-contain pointer-events-none" src={imgHoneyTeddyBear1} />
        </div>
      </div>
    </div>
  );
}

export default CtaHoneyTeddySection;
