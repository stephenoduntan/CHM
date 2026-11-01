import Link from "next/link";
import Image from "next/image";
import { ArrowRight, QrCode } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function CathedralSection() {
  return (
    <section className="w-full py-16 lg:py-24 bg-gray-50/50">
      <Container>
        <div className="relative rounded-[32px] overflow-hidden min-h-[500px] lg:min-h-[540px] flex items-center p-8 sm:p-14 lg:p-16 shadow-xl border border-gray-100">
          {/* Background Architectural Render */}
          <Image
            src="https://images.unsplash.com/photo-1548625361-195fe574041b?auto=format&fit=crop&q=80&w=1920"
            alt="Next Level Cathedral Project"
            fill
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/40" />

          {/* Content Wrapper */}
          <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left: Project Details */}
            <div className="max-w-xl">
              <p className="font-display font-recursive-sans italic text-xl sm:text-2xl text-gray-700 mb-2">
                Be a part of the
              </p>

              <h2 className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#051202] tracking-tight uppercase leading-tight mb-4">
                NEXT LEVEL CATHEDRAL
              </h2>

              <div className="w-24 h-1 bg-[#c8a96e] rounded-full mb-6" />

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                Partner with us in building a multi-generational sanctuary for
                worship, community transformation, and global kingdom impact. Every
                brick laid is a legacy secured.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/next-level-cathedral"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-[#051202] hover:bg-[#1a3a1e] shadow-md transition-all text-base group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/give?campaign=cathedral"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-[#051202] bg-[#c8a96e] hover:bg-[#b8985c] shadow-sm transition-all text-base"
                >
                  Give to Project
                </Link>
              </div>
            </div>

            {/* Right: QR Code Card */}
            <div className="flex flex-col items-center text-center p-6 sm:p-8 bg-white/90 backdrop-blur-md rounded-[28px] border border-gray-200/80 shadow-xl max-w-[320px]">
              <div className="size-[200px] relative bg-white p-4 rounded-[20px] shadow-inner flex items-center justify-center border border-gray-100">
                {/* Clean Decorative QR representation */}
                <QrCode className="size-full text-[#051202]" strokeWidth={1.5} />
              </div>
              <p className="mt-4 text-sm sm:text-base font-medium text-gray-700 leading-snug">
                Scan QR code to get more update on the project
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
