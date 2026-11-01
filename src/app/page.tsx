import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

export default function Home() {
  return (
    <>
      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-primary to-primary/80 text-white">
        <Container>
          <div className="max-w-2xl py-20">
            <p className="text-sm font-medium uppercase tracking-widest text-white/70 mb-4">
              Welcome to {"{"}Church Name{"}"}
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              A Place of Faith, Hope & Love
            </h1>
            <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-xl">
              Join a community of believers growing together in faith. Experience
              powerful worship, life-changing sermons, and genuine fellowship.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" variant="secondary">
                Watch Live
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Plan Your Visit
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── About Section ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <Container>
          <SectionHeading
            title="Who We Are"
            subtitle="A vibrant community rooted in love, united in purpose, and committed to making a difference."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Our Mission", desc: "To equip believers for the work of ministry and build up the body of Christ." },
              { title: "Our Vision", desc: "A church where every member is empowered to live out their God-given purpose." },
              { title: "Our Values", desc: "Faith, Love, Community, Excellence, and Service — the pillars of our church." },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 rounded-2xl bg-gray-50">
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Sermons Section ──────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <Container>
          <SectionHeading
            title="Recent Sermons"
            subtitle="Watch or listen to our latest messages."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-200" />
                <div className="p-6">
                  <p className="text-sm text-primary font-medium">Series Name</p>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">Sermon Title {i}</h3>
                  <p className="text-sm text-gray-500 mt-2">Speaker Name · Jan {i}, 2024</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/sermons">
              <Button variant="outline">View All Sermons</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ─── Events Section ───────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <Container>
          <SectionHeading
            title="Upcoming Events"
            subtitle="Join us for our upcoming gatherings and programs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-6 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex flex-col items-center justify-center w-14 h-14 bg-primary/10 rounded-xl">
                    <span className="text-xs font-medium text-primary uppercase">Jan</span>
                    <span className="text-lg font-bold text-primary">{i + 14}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Event Title {i}</h3>
                    <p className="text-sm text-gray-500">6:00 PM · Church Auditorium</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  A brief description of this upcoming event and what attendees can expect.
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/events">
              <Button variant="outline">See All Events</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ─── CTA Section ──────────────────────────────────────────── */}
      <section className="py-20 bg-primary text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold sm:text-4xl">Join Us This Sunday</h2>
            <p className="mt-4 text-lg text-white/80">
              We'd love to welcome you. Come experience the warmth of our community
              and grow together in faith.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary">
                Plan Your Visit
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
