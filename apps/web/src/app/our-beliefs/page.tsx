import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { BeliefsList } from "@/components/sections/BeliefsList";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Beliefs",
  description: `The 40 fundamental Bible teachings and doctrinal foundations of ${SITE_CONFIG.fullName}.`,
};

export default function OurBeliefsPage() {
  return (
    <div className="w-full bg-white min-h-screen">
      <section
        className="w-full pt-32 sm:pt-36 lg:pt-[140px] pb-16 lg:pb-[100px]"
        data-node-id="2086:1640"
        data-name="explore"
      >
        <Container className="max-w-[1440px]">
          {/* Header Block matching Figma node 2086:1643 */}
          <div
            className="flex flex-col items-center text-center mb-12 sm:mb-16 lg:mb-20"
            data-node-id="2086:1643"
          >
            <div data-node-id="2086:1644">
              <h1
                className="font-display font-recursive-sans font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#0a0a0a] tracking-tight leading-tight"
                data-node-id="2086:1645"
              >
                Our Beliefs
              </h1>
            </div>
            <p className="mt-4 text-[#3d3d3d] text-base sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
              The fundamental Bible teachings and doctrinal foundations guiding {SITE_CONFIG.fullName}.
            </p>
          </div>

          {/* Interactive Beliefs List */}
          <BeliefsList />
        </Container>
      </section>
    </div>
  );
}

