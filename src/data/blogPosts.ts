export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-001',
    title: 'Easter Sewing Competition 2026 Winner',
    slug: 'easter-sewing-competition-2026-winner',
    excerpt:
      'The votes are in! See who won our Easter Sewing Competition 2026 and marvel at the incredible entries from our talented community of sewists.',
    content: `We are thrilled to announce the winner of our Easter Sewing Competition 2026! The creativity and talent on display this year was absolutely extraordinary, and choosing a winner was no easy task.

After hundreds of votes from our community, the grand prize goes to a stunning collection of Easter bunnies made from vintage floral fabrics. The attention to detail, from the hand-embroidered faces to the tiny felt carrots, truly set this entry apart from the rest.

Thank you to everyone who entered and voted. Your passion for sewing and toy-making is what makes the Funky Friends Factory community so special. Stay tuned for our next competition — we have some exciting themes planned for later this year!`,
    date: '2026-04-09',
    category: 'competitions',
    image: '/api/placeholder/800/400',
    author: 'Pauline McArthur',
  },
  {
    id: 'blog-002',
    title: 'Easter & Spring Sewing Competition',
    slug: 'easter-spring-sewing-competition',
    excerpt:
      'It\u2019s time for our annual Easter & Spring Sewing Competition! Enter your best spring-themed soft toy for a chance to win a Funky Friends Factory prize pack.',
    content: `Spring is in the air, and that means it\u2019s time for our annual Easter & Spring Sewing Competition! We want to see your best spring-themed soft toys — bunnies, chicks, lambs, flowers, or anything that says "spring" to you.

To enter, simply make a soft toy using any Funky Friends Factory pattern (or combine elements from several patterns), snap a photo, and share it in our Facebook group with the hashtag #FFFSpring2026. Entries close on April 7th, and community voting will determine the winner.

The grand prize winner will receive a Funky Friends Factory prize pack including five patterns of their choice, a bundle of premium fleece fabric, and a feature on our blog. Good luck, everyone — we can\u2019t wait to see what you create!`,
    date: '2026-03-30',
    category: 'competitions',
    image: '/api/placeholder/800/400',
    author: 'Pauline McArthur',
  },
  {
    id: 'blog-003',
    title: 'Best Wishes Baby Bird Pattern Ideas',
    slug: 'best-wishes-baby-bird-pattern-ideas',
    excerpt:
      'Looking for inspiration for your Best Wishes Baby Bird? Check out these gorgeous versions made by our pattern testers and community members.',
    content: `Since releasing the Best Wishes Baby Bird pattern, we\u2019ve been blown away by the creative ways people are making this little bird their own. Today we\u2019re sharing some of our favourite versions for inspiration.

From pastel nursery colours to bold tropical prints, there\u2019s a Baby Bird for every occasion. Several makers have used the card-holder pocket to create adorable "welcome baby" gifts, while others have turned them into tooth fairy pouches or birthday card holders. One clever maker even created a whole flock in rainbow colours!

If you haven\u2019t tried this pattern yet, we hope these photos inspire you to give it a go. And if you\u2019ve already made your own, we\u2019d love to see it — share your photos in our Facebook group or tag us on Instagram.`,
    date: '2026-02-27',
    category: 'new-patterns',
    image: '/api/placeholder/800/400',
    author: 'Pauline McArthur',
  },
  {
    id: 'blog-004',
    title: 'Meet Best Wishes Baby Bird',
    slug: 'meet-best-wishes-baby-bird',
    excerpt:
      'Introducing our newest pattern — Best Wishes Baby Bird! A sweet little bird with a special card-holder pocket, perfect for gift-giving.',
    content: `We are so excited to introduce our newest Funky Friends Factory pattern — Best Wishes Baby Bird! This adorable little bird has been in development for months, and we\u2019re thrilled to finally share it with you.

What makes Baby Bird special is the clever card-holder pocket hidden in its wings. Tuck in a gift card, a handwritten note, or even a small cash gift, and you\u2019ve got the most adorable gift presentation ever. It\u2019s perfect for baby showers, birthdays, get-well wishes, and thinking-of-you gifts.

The pattern is beginner-friendly with just a few simple pieces, and the finished bird is about 20 cm (8") tall. It\u2019s also a great scrap-buster — you only need small amounts of fabric for each bird. Download it now from our shop!`,
    date: '2026-02-07',
    category: 'new-patterns',
    image: '/api/placeholder/800/400',
    author: 'Pauline McArthur',
  },
  {
    id: 'blog-005',
    title: 'Maker of the Month \u2014 January 2026',
    slug: 'maker-of-the-month-january-2026',
    excerpt:
      'Meet our January 2026 Maker of the Month! This talented sewist has been creating stunning soft toys and sharing her passion with her local community.',
    content: `Every month we spotlight a member of the Funky Friends Factory community who has gone above and beyond with their toy-making. Our January 2026 Maker of the Month has been a dedicated member of our community for over three years and has made more than 50 Funky Friends.

What sets this month\u2019s maker apart is her commitment to sharing the joy of sewing with others. She runs a weekly sewing circle at her local library, teaching beginners how to make soft toys using our free patterns. Several of her students have gone on to purchase their own patterns and start their own toy-making journeys.

Congratulations to our Maker of the Month! If you\u2019d like to nominate someone for a future feature, send us a message through our Facebook page or email us at funkyfriendsfactory@gmail.com.`,
    date: '2026-02-06',
    category: 'news',
    image: '/api/placeholder/800/400',
    author: 'Pauline McArthur',
  },
  {
    id: 'blog-006',
    title: 'Baby Bird Pattern Testing Call',
    slug: 'baby-bird-pattern-testing-call',
    excerpt:
      'We\u2019re looking for pattern testers for our upcoming Baby Bird design! Find out how to apply and what\u2019s involved.',
    content: `Exciting news — we\u2019re developing a brand new pattern and we need YOUR help to test it! We\u2019re looking for experienced sewists of all skill levels to test our upcoming Baby Bird pattern and provide feedback before the official release.

As a pattern tester, you\u2019ll receive a free copy of the pattern before it\u2019s released to the public. In return, we ask that you make the pattern, provide detailed feedback on the instructions, and share photos of your finished toy. Testing typically takes two to three weeks.

If you\u2019re interested in joining our testing team, please fill out the application form linked below. We\u2019ll be selecting testers by the end of January, and the testing period will run through February. We look forward to your applications!`,
    date: '2026-01-20',
    category: 'news',
    image: '/api/placeholder/800/400',
    author: 'Pauline McArthur',
  },
  {
    id: 'blog-007',
    title: 'Top 10 Tips for Stuffing Soft Toys',
    slug: 'top-10-tips-for-stuffing-soft-toys',
    excerpt:
      'Getting the stuffing right can make or break your soft toy. Here are our top 10 tips for perfectly stuffed Funky Friends every time.',
    content: `Stuffing is one of the most important steps in making a soft toy, and getting it right can be the difference between a lumpy lump and a perfectly plump friend. Here are our top 10 tips for stuffing success.

First, always use quality polyester fibrefill — cheap stuffing clumps and goes flat over time. Tear the stuffing into small pieces rather than pushing in big wads. Use a stuffing tool (a chopstick or the blunt end of a pencil works great) to push small amounts firmly into corners, noses, and limbs before filling the body. Stuff firmly but not so tight that the seams strain. For floppy toys like Dizzy Dolphin, use less stuffing for a softer, more poseable result. For standing toys like Raff Giraffe, pack the legs and base firmly so they hold their shape.

Other tips include using weighted pellets in the base for stability, ladder-stitching the opening closed with matching thread, and taking your time — rushing the stuffing step is the number-one mistake beginners make. With practice, you\u2019ll develop a feel for the perfect amount of stuffing for each toy.`,
    date: '2026-01-05',
    category: 'tips-tutorials',
    image: '/api/placeholder/800/400',
    author: 'Pauline McArthur',
  },
  {
    id: 'blog-008',
    title: 'How to Choose Fabrics for Soft Toys',
    slug: 'how-to-choose-fabrics-for-soft-toys',
    excerpt:
      'Not sure which fabric to use for your next Funky Friend? This guide covers the best fabrics for soft toy making, from fleece to felt and beyond.',
    content: `Choosing the right fabric is essential for a great-looking, long-lasting soft toy. In this guide, we\u2019ll walk you through the most popular fabrics for toy making and when to use each one.

Fleece is our go-to recommendation for most patterns. It\u2019s soft, stretchy, forgiving of small mistakes, and comes in a huge range of colours. Anti-pill fleece is best — it stays smooth and doesn\u2019t develop those annoying little balls over time. For details like eyes, noses, and small accents, felt is ideal because it doesn\u2019t fray and holds its shape well. Minky fabric creates ultra-cuddly toys but can be tricky to sew because it\u2019s so slippery — pin generously and use a walking foot if you have one.

Cotton is great for patchwork-style toys and keepsake bears made from clothing, though it doesn\u2019t stretch so you need to be precise with your cutting. Fur fabric is perfect for shaggy characters like Highland Cow but requires a bit of experience to handle. Whatever fabric you choose, always pre-wash it to prevent shrinkage after your toy is finished.`,
    date: '2025-12-15',
    category: 'tips-tutorials',
    image: '/api/placeholder/800/400',
    author: 'Pauline McArthur',
  },
  {
    id: 'blog-009',
    title: 'Billion Bears Charity Drive Update',
    slug: 'billion-bears-charity-drive-update',
    excerpt:
      'An update on our Billion Bears charity initiative — see how many bears our community has sewn and donated to children in need around the world.',
    content: `We are so proud to share the latest update on our Billion Bears charity drive. Since we launched this initiative, our incredible community of sewists has hand-made and donated thousands of teddy bears to children in need around the world.

This quarter alone, we received reports of bears being donated to children\u2019s hospitals, refugee shelters, foster care agencies, and disaster relief organisations across 15 countries. Each bear is handmade with love using our free Ben the BEGINNER Bear or Honey Teddy patterns, and each one brings comfort and joy to a child who needs it.

If you\u2019d like to get involved, simply download one of our free bear patterns, sew a bear (or a whole batch!), and donate them to a local charity or organisation that supports children. Share your photos with us using #BillionBears — we\u2019d love to see your contributions and add them to our running total.`,
    date: '2025-12-01',
    category: 'news',
    image: '/api/placeholder/800/400',
    author: 'Pauline McArthur',
  },
];

// ── Helper functions ────────────────────────────────────────────────

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export function getRecentBlogPosts(count: number = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
