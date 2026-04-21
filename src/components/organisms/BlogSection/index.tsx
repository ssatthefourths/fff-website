import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import svgPaths from '../../../assets/svgPaths';
import imgUntitledDesign561 from 'figma:asset/c04939546f5c2f4cdcde698bf0467c0bdec3e6da.png';
import imgUntitledDesign562 from 'figma:asset/c7cb7de78756b698f03f3c5ee1df7454f03f49fd.png';
import imgUntitledDesign563 from 'figma:asset/f4e5f466ccd0fafd0b969fb06c776feae7507b11.png';
import { imgGroup } from '../../../imports/svg-9news';
import { fetchBlogPosts, type BlogPostSummary } from '../../../lib/blogApi';

// Figma stock images as fallbacks while a real cover hasn't been uploaded.
// Ordered so the newest post gets card1/card2/card3 styling. When blog posts
// eventually carry a cover_r2_key, swap this out for /r2/... URLs.
const CARD_IMAGES = [imgUntitledDesign561, imgUntitledDesign562, imgUntitledDesign563];

function Group() {
  return (
    <div className="absolute inset-[12.34%_-12.85%_6.23%_4.73%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-18.714px_-61.915px] mask-size-[471.407px_500.64px]" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 428.156 408.419">
        <g id="Group">
          <path d={svgPaths.p38bd1f0} fill="var(--fill-0, #F9B7B7)" id="Vector" />
          <path d={svgPaths.p3e4e7a00} id="Vector_2" stroke="var(--stroke-0, #3F3F3F)" strokeDasharray="12 12" strokeMiterlimit="10" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[0_-19.04%_0.18%_0]" data-name="Clip path group">
      <Group />
    </div>
  );
}

function BgPatch() {
  return (
    <div className="hidden lg:block absolute top-[48px] right-0 w-[27.5%] overflow-clip" data-name="BG PATCH">
      <ClipPathGroup />
    </div>
  );
}

function BlogCardText({ title, excerpt }: { title: string; excerpt: string | null | undefined }) {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start leading-[0] relative shrink-0 text-[#3f3f3f] text-center w-full">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[26px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.4] line-clamp-2">{title}</p>
      </div>
      {excerpt && (
        <div className="flex flex-col font-['Avenir:Book',sans-serif] justify-center not-italic relative shrink-0 text-[18px] w-full">
          <p className="leading-[1.6] line-clamp-3">{excerpt}</p>
        </div>
      )}
    </div>
  );
}

function BlogCards() {
  const [posts, setPosts] = useState<BlogPostSummary[] | null>(null);

  useEffect(() => {
    // The API returns posts newest-first; take the first 3 for this homepage strip.
    fetchBlogPosts()
      .then((all) => setPosts(all.slice(0, 3)))
      .catch(() => setPosts([]));
  }, []);

  return (
    <div className="content-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[40px] items-start relative shrink-0 w-full" data-name="BLOG CARDS">
      {posts === null && (
        <div className="col-span-full text-center text-[#3f3f3f]/50 text-[14px] py-8">Loading recent posts…</div>
      )}
      {posts !== null && posts.length === 0 && (
        <div className="col-span-full text-center text-[#3f3f3f]/50 text-[14px] py-8">
          No blog posts published yet.
        </div>
      )}
      {(posts ?? []).map((post, i) => (
        <Link
          key={post.id}
          to={`/blog/${post.slug}`}
          className="content-stretch flex flex-[1_0_0] flex-col gap-[36px] items-center min-h-px min-w-px relative hover:shadow-lg hover:-translate-y-1 transition-all duration-200 rounded-[20px]"
          data-name={`CARD ${i + 1}`}
        >
          <div className="h-[200px] sm:h-[250px] lg:h-[305px] relative rounded-[20px] shrink-0 w-full">
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full"
              src={CARD_IMAGES[i % CARD_IMAGES.length]}
            />
          </div>
          <BlogCardText title={post.title} excerpt={post.excerpt} />
        </Link>
      ))}
    </div>
  );
}

function BlogButton() {
  return (
    <Link to="/blog" className="content-stretch flex flex-col items-start relative shrink-0 hover:scale-[1.02] transition-all duration-200" data-name="BUTTON">
      <div className="content-stretch flex items-center justify-center px-[40px] py-[20px] relative rounded-[100px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border-3 border-[#8b52c5] border-solid inset-0 pointer-events-none rounded-[100px]" />
        <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8b52c5] text-[18px] text-center tracking-[2.7px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">check out all blog posts</p>
        </div>
      </div>
    </Link>
  );
}

function BlogContent() {
  return (
    <div className="relative content-stretch flex flex-col gap-[56px] items-center justify-center px-4 py-12 sm:px-6 md:px-10 md:py-16 lg:px-[50px] lg:py-[140px] max-w-[1440px] mx-auto" data-name="BLOG CONTENT">
      <p className="font-['Bingo_Action_Comic:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#3f3f3f] text-[clamp(36px,5vw,70px)] text-center w-full max-w-[1121px]">Read Our Blog</p>
      <BlogCards />
      <BlogButton />
    </div>
  );
}


export function BlogSection() {
  return (
    <div className="relative w-full overflow-x-clip" data-name="BLOG SECTION">
      <BgPatch />
      <BlogContent />
    </div>
  );
}

export default BlogSection;
