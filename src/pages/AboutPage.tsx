import { Link } from 'react-router';

function AboutPage() {
  return (
    <div className="bg-[#fffdf3] min-h-screen">
      {/* Hero */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] pt-12 md:pt-16 lg:pt-20 pb-8 max-w-[1400px] mx-auto text-center">
        <h1 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(36px,5vw,70px)] leading-none">
          About Pauline
        </h1>
      </section>

      {/* Story Section */}
      <section className="bg-[#f4eefa]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20 max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            {/* Photo placeholder */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="w-full max-w-[480px] aspect-[4/5] bg-[#e0d0f0] rounded-[20px] flex items-center justify-center shadow-lg">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#8b52c5]/20 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-[#8b52c5]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <p
                    className="font-['Roboto:Regular',sans-serif] text-[#8b52c5] text-sm"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Photo of Pauline McArthur
                  </p>
                </div>
              </div>
            </div>

            {/* Story text */}
            <div className="w-full lg:w-1/2">
              <h2 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(28px,4vw,48px)] leading-none mb-6">
                My Story
              </h2>
              <p
                className="font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[18px] leading-[1.6] mb-6"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Hi, I'm Pauline McArthur, an Australian soft toy designer. I used to work in
                optometry, but I realized you're never too old to do what you love!
              </p>
              <p
                className="font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[18px] leading-[1.6] mb-6"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                It all started when I began making baby-safe bunnies with sewn-on faces for
                friends' newborns. The demand grew, and I started designing more patterns. When
                my husband wanted a Jack Russell terrier toy with movable joints, I designed
                'Jake the Jack Russell' — and that's when I realized I could help others create
                their own soft toys with easy-to-follow patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20 max-w-[1400px] mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(28px,4vw,48px)] leading-none mb-8">
            My Mission
          </h2>
          <p
            className="font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[22px] leading-[1.6]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            My mission is to provide fun, easy-to-follow Soft Toy Sewing Patterns with
            step-by-step photo tutorials.
          </p>
        </div>
      </section>

      {/* Billion Bears Charity Section */}
      <section className="bg-[#f4eefa]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20 max-w-[1400px] mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(28px,4vw,48px)] leading-none mb-8">
              Billion Bears Charity Drive
            </h2>
            <p
              className="font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[18px] leading-[1.6] mb-6"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              I founded the Billion Bears Charity Drive to give back. I offer the free Honey
              Teddy pattern to support charities worldwide — because giving something back
              matters.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/patterns?category=free"
                className="content-stretch flex items-center justify-center rounded-[100px] shrink-0 font-['Roboto:Bold',sans-serif] font-bold leading-[0] text-center tracking-[2.7px] uppercase whitespace-nowrap transition-opacity bg-[#F6D75A] text-[#3F3F3F] px-[40px] py-[20px] text-[18px] hover:opacity-90"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Get the free pattern
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20 max-w-[1400px] mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-['Magic_Honey:Regular',sans-serif] text-[#8b52c5] text-[clamp(28px,4vw,48px)] leading-tight mb-6">
            Join our Facebook Pattern Fan Club!
          </h2>
          <p
            className="font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[18px] leading-[1.6] mb-8"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Connect with thousands of toy makers from around the world. Share your
            creations, get tips, and be part of our wonderful crafting community!
          </p>
          <a
            href="https://www.facebook.com/groups/funkyfriendsfactory"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-[100px] font-['Roboto:Bold',sans-serif] font-bold leading-[0] text-center tracking-[2.7px] uppercase whitespace-nowrap transition-opacity bg-[#8B52C5] text-[#FFFDF3] px-[40px] py-[20px] text-[18px] hover:opacity-90"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Join the community
          </a>
        </div>
      </section>
    </div>
  );
}

export { AboutPage };
export default AboutPage;
