import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function ImpactSection() {
  return (
    <section className="w-full py-12 md:py-20 bg-white">
      <Container>
        <div className="relative w-full rounded-[32px] overflow-hidden min-h-[500px] lg:min-h-[540px] flex items-center shadow-xl">
          {/* Background Image with Cinematic Overlay */}
          <Image
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1920"
            alt="Impacted Lives Changing Community"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

          {/* Content */}
          <div className="relative z-10 px-8 sm:px-14 lg:px-20 py-16 max-w-3xl text-white">
            <h2 className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight mb-6">
              Impacted Lives <br />
              <span className="text-white/90">Changing Community</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed font-normal mb-10 max-w-xl">
              Discover new ways to connect, serve, and grow as you live out your
              faith alongside others at Court of His Majesty.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/ministries"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-[#051202] bg-white hover:bg-gray-100 shadow-md transition-all text-base group"
              >
                <span>View Ministries</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/new-here"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-white bg-black/40 hover:bg-black/60 border border-white/30 backdrop-blur-sm transition-all text-base"
              >
                I&apos;m new here
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
