import { Link } from 'react-router';
import { usePageMeta } from '../hooks/usePageMeta';

export function PrivacyPage() {
  usePageMeta('Privacy Policy', 'Funky Friends Factory privacy policy — how we collect, use, and protect your personal information.');

  return (
    <div className="bg-[#fffdf3] min-h-screen">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-20">
        <Link to="/" className="text-[#8b52c5] font-['Roboto:Bold',sans-serif] font-bold text-[14px] tracking-[2.7px] uppercase hover:underline">← Back to Home</Link>
        <h1 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(36px,5vw,50px)] mt-6 mb-8">Privacy Policy</h1>

        <div className="space-y-6 font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[18px] leading-[1.6]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p><strong>Last updated:</strong> April 2026</p>

          <h2 className="font-bold text-[24px] text-[#8b52c5] mt-8">1. Information We Collect</h2>
          <p>When you visit Funky Friends Factory, we may collect personal information you provide directly, such as your name and email address when you sign up for our newsletter, create an account, or make a purchase. We also collect standard web analytics data including your IP address, browser type, and pages visited.</p>

          <h2 className="font-bold text-[24px] text-[#8b52c5] mt-8">2. How We Use Your Information</h2>
          <p>We use your information to process orders and deliver digital pattern downloads, send our newsletter (if you've subscribed), improve our website and customer experience, and communicate with you about your account or orders.</p>

          <h2 className="font-bold text-[24px] text-[#8b52c5] mt-8">3. Digital Products</h2>
          <p>All our products are digital PDF sewing pattern downloads. When you make a purchase, we collect the information necessary to process your payment and deliver your download links. We do not store full credit card details — all payments are processed securely through our payment provider.</p>

          <h2 className="font-bold text-[24px] text-[#8b52c5] mt-8">4. Newsletter</h2>
          <p>If you subscribe to our newsletter, we will send you pattern updates, toy-making tips, competition announcements, and special offers. You can unsubscribe at any time by clicking the unsubscribe link in any email.</p>

          <h2 className="font-bold text-[24px] text-[#8b52c5] mt-8">5. Cookies</h2>
          <p>We use cookies to remember your shopping cart, keep you logged in, and analyse website traffic. You can disable cookies in your browser settings, though some site features may not work properly without them.</p>

          <h2 className="font-bold text-[24px] text-[#8b52c5] mt-8">6. Third-Party Services</h2>
          <p>We use third-party services for payment processing, email delivery, and website analytics. These services have their own privacy policies governing how they handle your data.</p>

          <h2 className="font-bold text-[24px] text-[#8b52c5] mt-8">7. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at info@funkyfriendsfactory.com.</p>

          <h2 className="font-bold text-[24px] text-[#8b52c5] mt-8">8. Contact</h2>
          <p>If you have questions about this privacy policy, please contact us at <a href="mailto:info@funkyfriendsfactory.com" className="text-[#8b52c5] underline">info@funkyfriendsfactory.com</a>.</p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;
