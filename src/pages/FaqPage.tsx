import { Link } from 'react-router';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../app/components/ui/accordion';
import { faqData } from '../data/faqData';
import type { FaqCategory } from '../data/faqData';

function FaqPage() {
  return (
    <div className="bg-[#fffdf3] min-h-screen">
      {/* Hero */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pt-12 md:pt-16 lg:pt-20 pb-8 max-w-[1400px] mx-auto text-center">
        <h1 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(36px,5vw,70px)] leading-none mb-4">
          Frequently Asked Questions
        </h1>
        <p
          className="font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[20px] leading-[1.6] max-w-2xl mx-auto"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Find answers to common questions about our patterns, ordering, and toy
          making.
        </p>
      </section>

      {/* FAQ Categories */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20 max-w-[1400px] mx-auto">
        <div className="max-w-3xl mx-auto space-y-12">
          {faqData.map((category: FaqCategory) => (
            <div key={category.name}>
              <h2 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(24px,3vw,36px)] leading-none mb-6">
                {category.name}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.name}-${index}`}
                    className="border-b border-[#8b52c5]/15 last:border-b-0"
                  >
                    <AccordionTrigger
                      className="font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[16px] md:text-[18px] font-medium leading-[1.4] py-5 hover:no-underline hover:text-[#8b52c5] transition-colors"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent
                      className="font-['Roboto:Regular',sans-serif] text-[#3f3f3f]/80 text-[16px] leading-[1.6] pb-5"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#f4eefa]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20 max-w-[1400px] mx-auto text-center">
          <h2 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(28px,4vw,42px)] leading-none mb-6">
            Still have questions?
          </h2>
          <p
            className="font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[18px] leading-[1.6] mb-8"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Email us at{' '}
            <a
              href="mailto:info@funkyfriendsfactory.com"
              className="text-[#8b52c5] underline hover:opacity-80 transition-opacity"
            >
              info@funkyfriendsfactory.com
            </a>
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-[100px] font-['Roboto:Bold',sans-serif] font-bold leading-[0] text-center tracking-[2.7px] uppercase whitespace-nowrap transition-opacity bg-[#8B52C5] text-[#FFFDF3] px-[40px] py-[20px] text-[18px] hover:opacity-90"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}

export { FaqPage };
export default FaqPage;
