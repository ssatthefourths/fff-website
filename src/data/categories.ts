export interface Category {
  slug: string;
  name: string;
  description: string;
  count: number;
}

export const categories: Category[] = [
  {
    slug: 'toy-sewing-patterns',
    name: 'Toy Sewing Patterns',
    description:
      'Our full collection of soft toy sewing patterns — animals, creatures, and cuddly friends of every kind.',
    count: 111,
  },
  {
    slug: 'doll-sewing-patterns',
    name: 'Doll Sewing Patterns',
    description:
      'Dress-up dolls, angels, elves and more — sewing patterns for adorable handmade dolls.',
    count: 8,
  },
  {
    slug: 'fun-stuff-from-scraps',
    name: 'Fun Stuff from Scraps',
    description:
      'Quick-sew projects that turn fabric scraps into cute little toys, keepsakes, and gifts.',
    count: 37,
  },
  {
    slug: 'seasonal',
    name: 'Seasonal',
    description:
      'Holiday and seasonal patterns — Easter bunnies, Halloween bats, Christmas characters, and Valentine love monsters.',
    count: 12,
  },
  {
    slug: 'beginner',
    name: 'Beginner',
    description:
      'Easy-to-sew patterns perfect for first-time sewists and anyone new to toy making.',
    count: 15,
  },
  {
    slug: 'free',
    name: 'Free',
    description:
      'Free sewing patterns to download — a great way to try Funky Friends Factory patterns before you buy.',
    count: 5,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
