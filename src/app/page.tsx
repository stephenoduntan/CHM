import { HeroSection } from "@/components/sections/HeroSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ExploreSection } from "@/components/sections/ExploreSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { LatestSermonSection } from "@/components/sections/LatestSermonSection";
import { CathedralSection } from "@/components/sections/CathedralSection";

export default function Home() {
  return (
    <>
      {/* 1. Hero Gallery & Welcome Banner */}
      <HeroSection />

      {/* 2. Conference Countdown Timer */}
      <CountdownSection />

      {/* 3. Who We Are / Impact Showcase */}
      <ImpactSection />

      {/* 4. Explore What's On At CHM */}
      <ExploreSection />

      {/* 5. Upcoming Events Carousel */}
      <EventsSection />

      {/* 6. Latest Sermons */}
      <LatestSermonSection />

      {/* 7. Next Level Cathedral Project */}
      <CathedralSection />
    </>
  );
}
