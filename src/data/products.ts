import { categories } from './categories';

export interface Pattern {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isFree: boolean;
  isNew: boolean;
  isFeatured: boolean;
  tags: string[];
}

export const patterns: Pattern[] = [
  // ── Animals (toy-sewing-patterns) ─────────────────────────────────
  {
    id: 'pat-001',
    name: 'Fifi Fox',
    slug: 'fifi-fox',
    price: 12.99,
    description:
      'Fifi Fox is a gorgeous, cuddly toy sewing pattern with a big bushy tail and cute pointy ears. The pattern includes full-size templates, step-by-step photo instructions, and a materials list. Fifi is made from fleece and felt and stands about 35 cm (14") tall when finished. A lovely intermediate-level project.',
    shortDescription:
      'Sew a cuddly fox with a big bushy tail and pointy ears — includes full-size templates and photo instructions.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: true,
    tags: ['fox', 'woodland', 'animal', 'fleece'],
  },
  {
    id: 'pat-002',
    name: 'Ellie Elephant',
    slug: 'ellie-elephant',
    price: 12.99,
    description:
      'Ellie Elephant is a sweet and sturdy soft toy pattern with big floppy ears and a curly trunk. The pattern includes detailed photo instructions for every step, full-size pattern pieces, and tips on choosing the right fabrics. Ellie stands about 30 cm (12") tall.',
    shortDescription:
      'A sweet elephant with big floppy ears and a curly trunk — detailed photo instructions included.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: true,
    tags: ['elephant', 'safari', 'animal', 'fleece'],
  },
  {
    id: 'pat-003',
    name: 'Dizzy Dolphin',
    slug: 'dizzy-dolphin',
    price: 12.99,
    description:
      'Dizzy Dolphin is a fun, streamlined soft toy pattern perfect for ocean lovers. The pattern includes full-size templates, photo instructions, and tips on getting that smooth dolphin shape. Finished size is approximately 40 cm (16") long.',
    shortDescription:
      'A fun dolphin toy pattern for ocean lovers — full-size templates and shaping tips included.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['dolphin', 'ocean', 'sea', 'animal'],
  },
  {
    id: 'pat-004',
    name: 'Digger Dachshund',
    slug: 'digger-dachshund',
    price: 12.99,
    description:
      'Digger Dachshund is an adorable sausage-dog pattern with a long body, little legs, and floppy ears. This intermediate pattern comes with full-size templates and photo instructions. Finished Digger is approximately 40 cm (16") long — a perfect gift for dog lovers.',
    shortDescription:
      'An adorable sausage-dog with a long body and floppy ears — a perfect gift for dog lovers.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['dog', 'dachshund', 'puppy', 'animal'],
  },
  {
    id: 'pat-005',
    name: 'Crocodile Steve',
    slug: 'crocodile-steve',
    price: 12.99,
    description:
      'Crocodile Steve is a big, friendly croc with a toothy grin and a long tail. This pattern includes full-size templates, step-by-step photo instructions, and ideas for choosing fabrics and embellishments. Finished size is approximately 60 cm (24") long.',
    shortDescription:
      'A big, friendly croc with a toothy grin — full-size templates and step-by-step photos.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'advanced',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['crocodile', 'reptile', 'animal'],
  },
  {
    id: 'pat-006',
    name: 'Dilby Duck',
    slug: 'dilby-duck',
    price: 12.99,
    description:
      'Dilby Duck is a cheerful, pudgy duck pattern with webbed feet and a bright orange beak. The pattern includes full-size templates, photo instructions, and tips for adding fun details. Finished Dilby stands about 28 cm (11") tall.',
    shortDescription:
      'A cheerful pudgy duck with webbed feet and a bright beak — includes tips for fun details.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['duck', 'bird', 'farm', 'animal'],
  },
  {
    id: 'pat-007',
    name: 'Coco Chameleon',
    slug: 'coco-chameleon',
    price: 12.99,
    description:
      'Coco Chameleon is a quirky, colourful lizard pattern with a curly tail and big googly eyes. This pattern is great for using up bold fabric scraps. Includes full-size templates and detailed photo instructions. Finished size about 30 cm (12") long.',
    shortDescription:
      'A quirky, colourful chameleon with a curly tail — great for bold fabric scraps.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['chameleon', 'lizard', 'reptile', 'colourful'],
  },
  {
    id: 'pat-008',
    name: 'Bill Bald Eagle',
    slug: 'bill-bald-eagle',
    price: 12.99,
    description:
      'Bill Bald Eagle is a majestic bird of prey pattern with outstretched wings and a fierce felt beak. The pattern includes full-size templates, step-by-step photo instructions, and fabric suggestions. Finished wingspan is about 45 cm (18").',
    shortDescription:
      'A majestic bald eagle with outstretched wings — full-size templates and fabric suggestions.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'advanced',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['eagle', 'bird', 'animal', 'patriotic'],
  },
  {
    id: 'pat-009',
    name: 'Belinda Butterfly',
    slug: 'belinda-butterfly',
    price: 12.99,
    description:
      'Belinda Butterfly is a whimsical butterfly pattern with gorgeous wings you can customise with your own fabric choices. Includes full-size templates and photo instructions. Finished size about 25 cm (10") tall — a delightful nursery decoration or cuddly toy.',
    shortDescription:
      'A whimsical butterfly with customisable wings — delightful as a nursery decoration or cuddly toy.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['butterfly', 'insect', 'wings', 'nursery'],
  },
  {
    id: 'pat-010',
    name: 'Bumble Bee',
    slug: 'bumble-bee',
    price: 12.99,
    description:
      'Bumble Bee is an adorable buzzy bee pattern with translucent wings and bold yellow-and-black stripes. The pattern includes full-size templates, photo instructions, and ideas for adding a cute face. Finished size about 20 cm (8") tall.',
    shortDescription:
      'An adorable buzzy bee with bold stripes and translucent wings — quick and fun to sew.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'beginner',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['bee', 'insect', 'garden', 'yellow'],
  },
  {
    id: 'pat-011',
    name: 'Aristotle Axolotl',
    slug: 'aristotle-axolotl',
    price: 12.99,
    description:
      'Aristotle Axolotl is a unique and trendy soft toy pattern featuring the internet-famous Mexican salamander. Includes full-size templates, photo instructions, and tips on creating those signature feathery gills. Finished size about 35 cm (14") long.',
    shortDescription:
      'A trendy axolotl with signature feathery gills — a unique soft toy everyone will love.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: true,
    tags: ['axolotl', 'amphibian', 'trendy', 'unique'],
  },
  {
    id: 'pat-012',
    name: 'Highland Cow',
    slug: 'highland-cow',
    price: 12.99,
    description:
      'Highland Cow is a shaggy, lovable soft toy pattern with long fluffy fringe and little horns. The pattern includes full-size templates, photo instructions, and fabric suggestions for getting that perfect Highland look. Finished size about 30 cm (12") tall.',
    shortDescription:
      'A shaggy Highland cow with fluffy fringe and little horns — fabric tips for the perfect look.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: true,
    tags: ['cow', 'highland', 'farm', 'shaggy'],
  },
  {
    id: 'pat-013',
    name: 'Sitting Cat',
    slug: 'sitting-cat',
    price: 12.99,
    description:
      'Sitting Cat is a classic feline pattern in a cute seated pose with an upright tail. Includes full-size templates, step-by-step photo instructions, and whisker-making tips. Finished size about 28 cm (11") tall — purrfect for cat lovers.',
    shortDescription:
      'A classic cat in a cute seated pose — includes whisker-making tips for a purrfect finish.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['cat', 'kitten', 'pet', 'animal'],
  },
  {
    id: 'pat-014',
    name: 'Raff Giraffe',
    slug: 'raff-giraffe',
    price: 12.99,
    description:
      'Raff Giraffe is a tall, spotted soft toy pattern with a long neck, little ossicones, and a sweet face. Includes full-size templates and photo instructions. Finished Raff stands about 45 cm (18") tall — a showstopper in any nursery.',
    shortDescription:
      'A tall giraffe with a long neck and sweet face — a showstopper at 45 cm tall.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['giraffe', 'safari', 'tall', 'nursery'],
  },
  {
    id: 'pat-015',
    name: 'Larry Lion',
    slug: 'larry-lion',
    price: 12.99,
    description:
      'Larry Lion is a regal soft toy pattern with a big fluffy mane and a friendly face. The pattern includes full-size templates, photo instructions, and tips for creating a luxurious mane from fleece or fur fabric. Finished size about 35 cm (14") tall.',
    shortDescription:
      'A regal lion with a big fluffy mane — tips for creating a luxurious mane from fleece or fur.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['lion', 'safari', 'mane', 'animal'],
  },
  {
    id: 'pat-016',
    name: 'Pablo Puppy',
    slug: 'pablo-puppy',
    price: 12.99,
    description:
      'Pablo Puppy is a floppy-eared, tail-wagging puppy pattern that kids and adults both adore. Includes full-size templates, photo instructions, and ideas for adding spots and patches. Finished size about 30 cm (12") tall.',
    shortDescription:
      'A floppy-eared puppy everyone will adore — includes ideas for adding spots and patches.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'beginner',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['puppy', 'dog', 'pet', 'animal'],
  },
  {
    id: 'pat-017',
    name: 'Koala',
    slug: 'koala',
    price: 12.99,
    description:
      'Koala is a super-cute Aussie soft toy pattern with big fluffy ears and a round nose. The pattern includes full-size templates, step-by-step photo instructions, and tips on getting that soft, cuddly koala look. Finished size about 30 cm (12") tall.',
    shortDescription:
      'A super-cute Aussie koala with big fluffy ears — soft and cuddly at 30 cm tall.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['koala', 'australian', 'marsupial', 'cuddly'],
  },
  {
    id: 'pat-018',
    name: 'Penguin',
    slug: 'penguin',
    price: 12.99,
    description:
      'Penguin is a charming tuxedo-wearing bird pattern with little flippers and an adorable waddle shape. Includes full-size templates and photo instructions. Finished size about 28 cm (11") tall — a classic soft toy for all ages.',
    shortDescription:
      'A charming penguin with little flippers and an adorable waddle shape — a classic for all ages.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'beginner',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['penguin', 'bird', 'arctic', 'animal'],
  },
  {
    id: 'pat-019',
    name: 'Owl',
    slug: 'owl',
    price: 12.99,
    description:
      'Owl is a wise and whimsical soft toy pattern with big round eyes and layered felt wings. The pattern includes full-size templates, photo instructions, and ideas for mixing prints and solids. Finished size about 25 cm (10") tall.',
    shortDescription:
      'A wise owl with big round eyes and layered felt wings — great for mixing prints and solids.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'beginner',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['owl', 'bird', 'woodland', 'night'],
  },
  {
    id: 'pat-020',
    name: 'Flamingo',
    slug: 'flamingo',
    price: 12.99,
    description:
      'Flamingo is a tall, elegant soft toy pattern with long legs, a curved neck, and vibrant pink plumage. Includes full-size templates, photo instructions, and tips for getting those long legs to stand. Finished size about 45 cm (18") tall.',
    shortDescription:
      'A tall, elegant flamingo with long legs and a curved neck — tips for getting it to stand.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'advanced',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['flamingo', 'bird', 'tropical', 'pink'],
  },

  // ── Dolls (doll-sewing-patterns) ──────────────────────────────────
  {
    id: 'pat-021',
    name: 'Daisy Dress-Up Doll',
    slug: 'daisy-dress-up-doll',
    price: 12.99,
    description:
      'Daisy Dress-Up Doll is a fully poseable cloth doll pattern with a wardrobe of removable outfits. The pattern includes the doll body, hair options, and several clothing patterns. Finished Daisy is about 40 cm (16") tall — endless dress-up fun!',
    shortDescription:
      'A cloth doll with removable outfits and hair options — endless dress-up fun at 40 cm tall.',
    image: '/api/placeholder/400/400',
    category: 'doll-sewing-patterns',
    difficulty: 'advanced',
    isFree: false,
    isNew: false,
    isFeatured: true,
    tags: ['doll', 'dress-up', 'clothes', 'hair'],
  },
  {
    id: 'pat-022',
    name: 'Adorable Angels',
    slug: 'adorable-angels',
    price: 12.99,
    description:
      'Adorable Angels is a heavenly doll pattern for making sweet angel figures with felt wings and a halo. The pattern includes templates for two sizes and photo instructions. Perfect for Christmas tree toppers or nursery decor.',
    shortDescription:
      'Sweet angel dolls with felt wings and halo — two sizes, perfect for holiday decor.',
    image: '/api/placeholder/400/400',
    category: 'doll-sewing-patterns',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['angel', 'doll', 'christmas', 'wings'],
  },
  {
    id: 'pat-023',
    name: 'Mrs. Claus & Elf Twins',
    slug: 'mrs-claus-elf-twins',
    price: 12.99,
    description:
      'Mrs. Claus & Elf Twins is a festive doll pattern set that includes three characters: a jolly Mrs. Claus and two cheeky elf helpers. Full-size templates, photo instructions, and accessory patterns included. Finished sizes range from 25–35 cm.',
    shortDescription:
      'A festive set of Mrs. Claus and two cheeky elf helpers — three characters in one pattern.',
    image: '/api/placeholder/400/400',
    category: 'doll-sewing-patterns',
    difficulty: 'advanced',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['christmas', 'doll', 'elf', 'mrs-claus', 'holiday'],
  },

  // ── Fun Stuff from Scraps ─────────────────────────────────────────
  {
    id: 'pat-024',
    name: 'Kawaii Kuties Bunny',
    slug: 'kawaii-kuties-bunny',
    price: 12.99,
    description:
      'Kawaii Kuties Bunny is a quick-sew scrap-buster pattern for making tiny, adorable bunnies. Each bunny uses just a few scraps of fabric and takes about an hour to sew. The pattern includes full-size templates and photo instructions. Finished size about 15 cm (6") tall.',
    shortDescription:
      'A tiny, adorable scrap-buster bunny — quick to sew in about an hour from fabric scraps.',
    image: '/api/placeholder/400/400',
    category: 'fun-stuff-from-scraps',
    difficulty: 'beginner',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['kawaii', 'bunny', 'scraps', 'quick-sew', 'mini'],
  },
  {
    id: 'pat-025',
    name: 'Kawaii Kuties Cat',
    slug: 'kawaii-kuties-cat',
    price: 12.99,
    description:
      'Kawaii Kuties Cat is a palm-sized kitty pattern made from fabric scraps. Quick and easy to sew — great for beginners or for making a whole litter of kittens! Includes full-size templates and photo instructions. Finished size about 15 cm (6") tall.',
    shortDescription:
      'A palm-sized kitty from fabric scraps — sew a whole litter of kittens in an afternoon.',
    image: '/api/placeholder/400/400',
    category: 'fun-stuff-from-scraps',
    difficulty: 'beginner',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['kawaii', 'cat', 'scraps', 'quick-sew', 'mini'],
  },
  {
    id: 'pat-026',
    name: 'Kawaii Kuties Fox',
    slug: 'kawaii-kuties-fox',
    price: 12.99,
    description:
      'Kawaii Kuties Fox is a sweet mini fox pattern perfect for using up orange and white fabric scraps. Includes full-size templates, photo instructions, and is quick enough to make several as gifts. Finished size about 15 cm (6") tall.',
    shortDescription:
      'A sweet mini fox from orange and white scraps — quick enough to make several as gifts.',
    image: '/api/placeholder/400/400',
    category: 'fun-stuff-from-scraps',
    difficulty: 'beginner',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['kawaii', 'fox', 'scraps', 'quick-sew', 'mini'],
  },
  {
    id: 'pat-027',
    name: 'Keepsake Bear',
    slug: 'keepsake-bear',
    price: 12.99,
    description:
      'Keepsake Bear is a memory bear pattern designed to turn cherished fabrics — baby clothes, school uniforms, or loved ones\u2019 garments — into a treasured soft toy. Includes full-size templates, photo instructions, and tips for working with non-stretch fabrics.',
    shortDescription:
      'Turn cherished fabrics into a memory bear — perfect for baby clothes and keepsake garments.',
    image: '/api/placeholder/400/400',
    category: 'fun-stuff-from-scraps',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['bear', 'keepsake', 'memory', 'upcycle'],
  },
  {
    id: 'pat-028',
    name: 'Heat Pack Owl',
    slug: 'heat-pack-owl',
    price: 12.99,
    description:
      'Heat Pack Owl is a practical and cute pattern for a microwaveable heat pack shaped like a cuddly owl. Fill it with wheat or rice, pop it in the microwave, and enjoy soothing warmth. Includes full-size templates and photo instructions.',
    shortDescription:
      'A microwaveable heat pack shaped like a cuddly owl — fill with wheat or rice for soothing warmth.',
    image: '/api/placeholder/400/400',
    category: 'fun-stuff-from-scraps',
    difficulty: 'beginner',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['owl', 'heat-pack', 'practical', 'gift'],
  },
  {
    id: 'pat-029',
    name: 'Mix & Match Monsters',
    slug: 'mix-match-monsters',
    price: 12.99,
    description:
      'Mix & Match Monsters is a creative pattern set with interchangeable body parts — mix eyes, arms, mouths, and horns to create your own unique monster every time. Includes templates for all parts and photo instructions. Great for kids\u2019 parties and workshops.',
    shortDescription:
      'Interchangeable body parts to create unique monsters every time — great for parties and workshops.',
    image: '/api/placeholder/400/400',
    category: 'fun-stuff-from-scraps',
    difficulty: 'beginner',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['monster', 'creative', 'mix-match', 'party', 'kids'],
  },

  // ── Free ──────────────────────────────────────────────────────────
  {
    id: 'pat-030',
    name: 'Honey Teddy',
    slug: 'honey-teddy',
    price: 0,
    description:
      'Honey Teddy is a free beginner-friendly teddy bear pattern with classic proportions and a friendly face. Download includes full-size templates and step-by-step photo instructions. Finished size about 30 cm (12") tall — a great first project.',
    shortDescription:
      'A free beginner-friendly teddy bear — a great first project with full photo instructions.',
    image: '/api/placeholder/400/400',
    category: 'free',
    difficulty: 'beginner',
    isFree: true,
    isNew: false,
    isFeatured: false,
    tags: ['bear', 'teddy', 'free', 'beginner'],
  },
  {
    id: 'pat-031',
    name: 'Plattie Platypus',
    slug: 'plattie-platypus',
    price: 0,
    description:
      'Plattie Platypus is a free soft toy pattern of Australia\u2019s quirkiest creature — complete with a duck bill, beaver tail, and webbed feet. Includes full-size templates and photo instructions. Finished size about 35 cm (14") long.',
    shortDescription:
      'A free platypus pattern with duck bill and beaver tail — Australia\u2019s quirkiest creature.',
    image: '/api/placeholder/400/400',
    category: 'free',
    difficulty: 'intermediate',
    isFree: true,
    isNew: false,
    isFeatured: false,
    tags: ['platypus', 'australian', 'free', 'quirky'],
  },
  {
    id: 'pat-032',
    name: 'Ben the BEGINNER Bear',
    slug: 'ben-the-beginner-bear',
    price: 0,
    description:
      'Ben the BEGINNER Bear is a free pattern specifically designed for absolute beginners. The pattern uses simple shapes, minimal pieces, and includes extra-detailed photo instructions for every single step. Finished size about 25 cm (10") tall.',
    shortDescription:
      'A free bear designed for absolute beginners — simple shapes and extra-detailed instructions.',
    image: '/api/placeholder/400/400',
    category: 'free',
    difficulty: 'beginner',
    isFree: true,
    isNew: false,
    isFeatured: false,
    tags: ['bear', 'beginner', 'free', 'simple', 'first-project'],
  },

  // ── Seasonal ──────────────────────────────────────────────────────
  {
    id: 'pat-033',
    name: 'Easter Bunny Buddies',
    slug: 'easter-bunny-buddies',
    price: 12.99,
    description:
      'Easter Bunny Buddies is a seasonal pattern for sewing a family of adorable Easter bunnies in three sizes. Includes full-size templates, photo instructions, and ideas for Easter-themed fabric and embellishments. The largest bunny is about 35 cm (14") tall.',
    shortDescription:
      'A family of Easter bunnies in three sizes — includes Easter-themed fabric and embellishment ideas.',
    image: '/api/placeholder/400/400',
    category: 'seasonal',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['easter', 'bunny', 'spring', 'seasonal'],
  },
  {
    id: 'pat-034',
    name: 'Batty Bat',
    slug: 'batty-bat',
    price: 12.99,
    description:
      'Batty Bat is a spooky-cute Halloween bat pattern with wide membrane wings and little fangs. The pattern includes full-size templates and photo instructions. Finished wingspan is about 35 cm (14") — a fun Halloween decoration or cuddly toy.',
    shortDescription:
      'A spooky-cute Halloween bat with wide wings and little fangs — fun decoration or cuddly toy.',
    image: '/api/placeholder/400/400',
    category: 'seasonal',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['bat', 'halloween', 'spooky', 'seasonal'],
  },
  {
    id: 'pat-035',
    name: 'Love Monsters',
    slug: 'love-monsters',
    price: 12.99,
    description:
      'Love Monsters is a Valentine\u2019s Day pattern for making a pair of cute, huggable monsters holding a heart between them. Includes full-size templates and photo instructions. Finished size about 25 cm (10") tall — a sweet handmade Valentine gift.',
    shortDescription:
      'A pair of huggable monsters holding a heart — a sweet handmade Valentine\u2019s Day gift.',
    image: '/api/placeholder/400/400',
    category: 'seasonal',
    difficulty: 'beginner',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['valentines', 'monster', 'heart', 'love', 'seasonal'],
  },
  {
    id: 'pat-036',
    name: 'Christmas Elf',
    slug: 'christmas-elf',
    price: 12.99,
    description:
      'Christmas Elf is a jolly seasonal pattern for a pointy-eared, hat-wearing elf toy. The pattern includes full-size templates, photo instructions, and accessory patterns for a tiny toy sack. Finished size about 30 cm (12") tall.',
    shortDescription:
      'A jolly elf with a pointy hat and tiny toy sack — a festive handmade Christmas decoration.',
    image: '/api/placeholder/400/400',
    category: 'seasonal',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['christmas', 'elf', 'holiday', 'seasonal'],
  },
  {
    id: 'pat-037',
    name: 'Reindeer',
    slug: 'reindeer',
    price: 12.99,
    description:
      'Reindeer is a festive soft toy pattern with felt antlers, a red nose option, and a jingle-bell collar. The pattern includes full-size templates and step-by-step photo instructions. Finished size about 35 cm (14") tall — a must-have for Christmas crafting.',
    shortDescription:
      'A festive reindeer with antlers and optional red nose — a must-have for Christmas crafting.',
    image: '/api/placeholder/400/400',
    category: 'seasonal',
    difficulty: 'intermediate',
    isFree: false,
    isNew: false,
    isFeatured: false,
    tags: ['reindeer', 'christmas', 'rudolph', 'seasonal'],
  },

  // ── New ───────────────────────────────────────────────────────────
  {
    id: 'pat-038',
    name: 'Best Wishes Baby Bird',
    slug: 'best-wishes-baby-bird',
    price: 12.99,
    description:
      'Best Wishes Baby Bird is the newest Funky Friends Factory pattern! This adorable little bird comes with a card-holder pocket in its wings — perfect for tucking in a gift card or a handwritten note. Includes full-size templates, photo instructions, and ideas for personalisation. Finished size about 20 cm (8") tall.',
    shortDescription:
      'An adorable baby bird with a card-holder pocket in its wings — perfect for gift-giving.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'beginner',
    isFree: false,
    isNew: true,
    isFeatured: true,
    tags: ['bird', 'baby', 'gift', 'new', 'card-holder'],
  },

  // Additional patterns marked as new
  {
    id: 'pat-039',
    name: 'Honey Teddy',
    slug: 'honey-teddy-paid',
    price: 12.99,
    description:
      'The paid version of Honey Teddy includes bonus outfit patterns — a scarf, vest, and bow tie — so you can dress up your finished bear. Also includes all full-size templates and photo instructions from the free version.',
    shortDescription:
      'The deluxe Honey Teddy with bonus outfit patterns — scarf, vest, and bow tie included.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'beginner',
    isFree: false,
    isNew: true,
    isFeatured: false,
    tags: ['bear', 'teddy', 'outfits', 'beginner'],
  },
  {
    id: 'pat-040',
    name: 'Calipso Clownfish',
    slug: 'calipso-clownfish',
    price: 12.99,
    description:
      'Calipso Clownfish is a bright and cheerful undersea friend with bold orange-and-white stripes and cute little fins. The pattern includes full-size templates and photo instructions. Finished size about 25 cm (10") long.',
    shortDescription:
      'A bright clownfish with bold stripes and cute fins — a cheerful undersea friend.',
    image: '/api/placeholder/400/400',
    category: 'toy-sewing-patterns',
    difficulty: 'intermediate',
    isFree: false,
    isNew: true,
    isFeatured: false,
    tags: ['fish', 'clownfish', 'ocean', 'nemo', 'new'],
  },
];

// ── Helper functions ────────────────────────────────────────────────

export function getPatternBySlug(slug: string): Pattern | undefined {
  return patterns.find((p) => p.slug === slug);
}

export function getPatternById(id: string): Pattern | undefined {
  return patterns.find((p) => p.id === id);
}

export function getPatternsByCategory(categorySlug: string): Pattern[] {
  return patterns.filter((p) => p.category === categorySlug);
}

export function getFeaturedPatterns(): Pattern[] {
  return patterns.filter((p) => p.isFeatured);
}

export function getNewPatterns(): Pattern[] {
  return patterns.filter((p) => p.isNew);
}

export function getFreePatterns(): Pattern[] {
  return patterns.filter((p) => p.isFree);
}

export function searchPatterns(query: string): Pattern[] {
  const lower = query.toLowerCase();
  return patterns.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.shortDescription.toLowerCase().includes(lower) ||
      p.tags.some((t) => t.toLowerCase().includes(lower)),
  );
}

// Verify categories import is used (prevents tree-shaking issues in dev)
export const categoryCount = categories.length;
