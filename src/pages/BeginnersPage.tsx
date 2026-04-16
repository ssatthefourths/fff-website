import { Link } from 'react-router';

const resources = [
  {
    title: 'Free Honey Teddy Pattern',
    description:
      'Sign up for our newsletter and get this adorable teddy bear pattern absolutely FREE!',
    button: 'GET THE FREE PATTERN',
    href: '/patterns?category=free',
    color: '#F6D75A',
  },
  {
    title: 'Free Toy-Making Course',
    description:
      'Learn to sew with Plattie Platypus! Our step-by-step email course covers everything from reading patterns to stuffing techniques.',
    button: 'START THE COURSE',
    href: '#',
    color: '#BBD148',
  },
  {
    title: 'Video Tutorial',
    description:
      'Watch how to make Honey Teddy from start to finish with our detailed video walkthrough.',
    button: 'WATCH THE VIDEO',
    href: '#',
    color: '#8B52C5',
  },
];

const tips = [
  {
    title: 'Choosing the Right Fabric',
    description:
      "Fleece is the best fabric for beginners — it's soft, stretchy, and forgiving!",
  },
  {
    title: 'Essential Supplies',
    description:
      "All you need is fabric, stuffing, thread, needles, and scissors. That's it!",
  },
  {
    title: 'Reading the Pattern',
    description:
      'Each pattern comes with step-by-step photo instructions — just follow along!',
  },
  {
    title: 'Stuffing Techniques',
    description:
      'Use small pieces of stuffing and pack firmly for the best shape.',
  },
  {
    title: 'Sewing Seams',
    description:
      'Use a backstitch for strong seams. Keep your stitches small and even for the neatest finish.',
  },
  {
    title: 'Adding Faces',
    description:
      'Use safety eyes for a professional look, or embroider faces for baby-safe toys.',
  },
];

function BeginnersPage() {
  return (
    <div className="bg-[#fffdf3] min-h-screen">
      {/* Hero */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pt-12 md:pt-16 lg:pt-20 pb-8 max-w-[1400px] mx-auto text-center">
        <h1 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(36px,5vw,70px)] leading-none mb-4">
          Beginners Start Here!
        </h1>
        <p
          className="font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[22px] leading-[1.6] max-w-2xl mx-auto"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Everything you need to start your toy-making journey
        </p>
      </section>

      {/* Resource Cards */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <div
              key={resource.title}
              className="bg-white rounded-[20px] shadow-lg overflow-hidden flex flex-col"
            >
              {/* Card color band */}
              <div
                className="h-3 w-full"
                style={{ backgroundColor: resource.color }}
              />
              <div className="p-8 flex flex-col flex-1">
                {/* Icon placeholder */}
                <div
                  className="w-16 h-16 rounded-full mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${resource.color}30` }}
                >
                  <svg
                    className="w-8 h-8"
                    style={{ color: resource.color }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3
                  className="font-['Avenir:Book',sans-serif] text-[#3f3f3f] text-[22px] font-bold mb-3"
                >
                  {resource.title}
                </h3>
                <p
                  className="font-['Roboto:Regular',sans-serif] text-[#3f3f3f]/80 text-[16px] leading-[1.6] mb-8 flex-1"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {resource.description}
                </p>
                <Link
                  to={resource.href}
                  className="content-stretch flex items-center justify-center rounded-[100px] shrink-0 font-['Roboto:Bold',sans-serif] font-bold leading-[0] text-center tracking-[2.7px] uppercase whitespace-nowrap transition-opacity px-[40px] py-[20px] text-[16px] hover:opacity-90"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                    backgroundColor: resource.color,
                    color: resource.color === '#8B52C5' ? '#FFFDF3' : '#3F3F3F',
                  }}
                >
                  {resource.button}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-[#f4eefa]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20 max-w-[1400px] mx-auto">
          <h2 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(28px,4vw,48px)] leading-none mb-12 text-center">
            Top Tips for Getting Started
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <div
                key={tip.title}
                className="bg-white rounded-[20px] p-6 shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-10 h-10 rounded-full bg-[#8b52c5] text-white flex items-center justify-center font-['Roboto:Bold',sans-serif] font-bold text-[16px] shrink-0">
                    {index + 1}
                  </span>
                  <h3 className="font-['Avenir:Book',sans-serif] text-[#3f3f3f] text-[18px] font-bold">
                    {tip.title}
                  </h3>
                </div>
                <p
                  className="font-['Roboto:Regular',sans-serif] text-[#3f3f3f]/80 text-[16px] leading-[1.6]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20 max-w-[1400px] mx-auto text-center">
        <h2 className="font-['Magic_Honey:Regular',sans-serif] text-[#8b52c5] text-[clamp(28px,4vw,42px)] leading-tight mb-4">
          Ready to start sewing?
        </h2>
        <p
          className="font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[18px] leading-[1.6] mb-8 max-w-xl mx-auto"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Browse our collection of beginner-friendly patterns and find the perfect first
          project!
        </p>
        <Link
          to="/patterns?category=beginner"
          className="inline-flex items-center justify-center rounded-[100px] font-['Roboto:Bold',sans-serif] font-bold leading-[0] text-center tracking-[2.7px] uppercase whitespace-nowrap transition-opacity bg-[#BBD148] text-[#3F3F3F] px-[40px] py-[20px] text-[18px] hover:opacity-90"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Browse beginner patterns
        </Link>
      </section>
    </div>
  );
}

export { BeginnersPage };
export default BeginnersPage;
