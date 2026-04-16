import { Link } from 'react-router';
import { usePageMeta } from '../hooks/usePageMeta';

export function TermsPage() {
  usePageMeta('Terms of Use', 'Funky Friends Factory terms of use — rules for using our website and purchasing sewing patterns.');

  return (
    <div className="bg-[#fffdf3] min-h-screen">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-20">
        <Link to="/" className="text-[#8b52c5] font-['Roboto:Bold',sans-serif] font-bold text-[14px] tracking-[2.7px] uppercase hover:underline">← Back to Home</Link>
        <h1 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(36px,5vw,50px)] mt-6 mb-8">Terms of Use</h1>

        <div className="space-y-6 font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[18px] leading-[1.6]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p><strong>Last updated:</strong> April 2026</p>

          <h2 className="font-bold text-[24px] text-[#8b52c5] mt-8">1. Pattern Licence</h2>
          <p>When you purchase a Funky Friends Factory sewing pattern, you receive a personal-use licence. You may sew toys from our patterns and sell the finished handmade toys you create. However, you may NOT copy, redistribute, resell, or share the pattern files themselves.</p>

          <h2 className="font-bold text-[24px] text-[#8b52c5] mt-8">2. Selling Toys You Make</h2>
          <p>Yes! You are welcome to sell soft toys that you personally sew from our patterns at markets, online stores, and craft fairs. We just ask that you credit Funky Friends Factory as the pattern designer. We provide free printable credit labels on our blog to make this easy!</p>

          <h2 className="font-bold text-[24px] text-[#8b52c5] mt-8">3. Digital Downloads</h2>
          <p>All patterns are delivered as instant PDF downloads. Once purchased, you can download your pattern immediately. Please save the file — we recommend keeping a backup copy. If you have trouble accessing your download, contact us and we'll help.</p>

          <h2 className="font-bold text-[24px] text-[#8b52c5] mt-8">4. Refund Policy</h2>
          <p>Due to the digital nature of our products, we generally cannot offer refunds once a pattern has been downloaded. If you experience any issues with a pattern, please contact us and we will do our best to resolve the problem.</p>

          <h2 className="font-bold text-[24px] text-[#8b52c5] mt-8">5. Copyright</h2>
          <p>All patterns, images, text, and content on this website are copyright © Funky Friends Factory. You may not reproduce, distribute, or create derivative works from our patterns or content without written permission.</p>

          <h2 className="font-bold text-[24px] text-[#8b52c5] mt-8">6. Toy Safety</h2>
          <p>Our patterns include safety guidance. If making toys for children under 3 years of age, please use safety eyes (lock-in type) or embroider the eyes instead of using button eyes. Always supervise young children with handmade toys.</p>

          <h2 className="font-bold text-[24px] text-[#8b52c5] mt-8">7. Contact</h2>
          <p>For any questions about these terms, please contact us at <a href="mailto:info@funkyfriendsfactory.com" className="text-[#8b52c5] underline">info@funkyfriendsfactory.com</a>.</p>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
