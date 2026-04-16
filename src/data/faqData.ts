export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  name: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    name: 'About Our Products',
    items: [
      {
        question: 'What is an e-Pattern?',
        answer:
          'An e-Pattern is a digital sewing pattern that you download as a PDF file immediately after purchase. It includes full-size pattern templates that you print at home on standard A4 or US Letter paper, step-by-step photo instructions, a materials list, and helpful tips. There is no physical product shipped — you can start sewing straight away!',
      },
      {
        question: 'How do I download my pattern?',
        answer:
          'After completing your purchase, you will receive an email with a download link. You can also access your downloads at any time by logging into your account on our website and visiting the "My Downloads" page. Each pattern is a PDF file that you can save to your computer, tablet, or phone and print as many times as you need for personal use.',
      },
      {
        question: "What's the easiest pattern to start with?",
        answer:
          'We recommend starting with one of our free patterns — Ben the BEGINNER Bear is specifically designed for absolute beginners with simple shapes, few pieces, and extra-detailed instructions. Honey Teddy is another great free option. Once you are comfortable with those, our Kawaii Kuties range and the Bumble Bee pattern are wonderful next steps.',
      },
      {
        question: 'Can I sell toys made from your patterns?',
        answer:
          'Yes! You are welcome to sell hand-made toys that you personally sew using our patterns. We only ask that you credit Funky Friends Factory as the pattern designer (e.g., "Pattern by Funky Friends Factory — funkyfriendsfactory.com"). You may not resell, share, or distribute the pattern files themselves.',
      },
      {
        question: 'Are the toys safe for children?',
        answer:
          'Our patterns are designed to create toys that are safe for children when made correctly. We recommend using child-safe eyes (safety eyes with washers, or embroidered eyes for under-3s), ensuring all parts are securely attached, and using non-toxic, hypoallergenic stuffing. Always supervise young children with handmade toys, especially if they contain small parts.',
      },
    ],
  },
  {
    name: 'Placing an Order',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All payments are processed securely through our payment provider. Your financial details are never stored on our servers.',
      },
      {
        question: 'What currency are prices in?',
        answer:
          'All prices on our website are listed in US Dollars (USD). Your bank or payment provider will automatically convert the amount to your local currency at the current exchange rate when you make a purchase.',
      },
      {
        question: 'Do you offer bulk discounts?',
        answer:
          'Yes! We offer discounts when you buy multiple patterns at once. Check our current bundle deals on the shop page — we regularly run promotions such as "Buy 3 Get 1 Free" and seasonal sales. If you are a sewing group, school, or charity looking to purchase a large number of patterns, please contact us directly for a custom quote.',
      },
      {
        question: 'Can I buy printed patterns?',
        answer:
          'At this time, we only sell digital e-Patterns (PDF downloads). This allows us to offer patterns at an affordable price, deliver them instantly, and let you reprint them whenever you need. If you prefer not to print at home, most office supply stores and libraries offer inexpensive printing services.',
      },
      {
        question: 'How do I access my downloads?',
        answer:
          'You can access your purchased patterns in two ways: through the download link in your order confirmation email, or by logging into your account on our website and visiting the "My Downloads" page. Your downloads are available indefinitely, so you can re-download any pattern at any time. We recommend saving a backup copy to your computer.',
      },
    ],
  },
  {
    name: 'Other Questions',
    items: [
      {
        question: 'Where can I buy fleece fabric?',
        answer:
          'Fleece fabric is available at most fabric and craft stores, including Joann Fabrics (US), Spotlight (Australia), and Hobbycraft (UK). Online retailers like fabric.com, Minky Fabric Shop, and Etsy sellers also carry a wide range of colours and prints. We recommend anti-pill fleece for the best results — it stays smooth and is easy to sew.',
      },
      {
        question: 'How do I share photos of my toys?',
        answer:
          'We love seeing your finished Funky Friends! The best place to share photos is in our official Facebook group, "Funky Friends Factory Fans." You can also tag us on Instagram @funkyfriendsfactory or email your photos to us directly. We regularly feature community creations on our blog and social media.',
      },
      {
        question: 'Do you work with charities?',
        answer:
          'Absolutely! Our Billion Bears initiative encourages sewists to make and donate teddy bears to children in need. We provide free bear patterns (Ben the BEGINNER Bear and Honey Teddy) specifically for this purpose. Many of our community members sew for hospitals, shelters, disaster relief, and foster care organisations. Contact us if your charity would like to partner with us.',
      },
      {
        question: 'How do I join the Facebook group?',
        answer:
          'Search for "Funky Friends Factory Fans" on Facebook and click "Join Group." It is a private group, so you will need to answer a couple of short questions and agree to the group rules before being approved. Once you are in, you can share photos, ask questions, get sewing tips, and connect with thousands of fellow Funky Friends makers from around the world.',
      },
    ],
  },
];

/** @deprecated Use `faqCategories` instead. */
export const faqData = faqCategories;

export function getAllFaqItems(): FaqItem[] {
  return faqCategories.flatMap((cat) => cat.items);
}
