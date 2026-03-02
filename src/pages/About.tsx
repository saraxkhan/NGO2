import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { Heart, Target, Eye, Shield, Lightbulb, Users } from "lucide-react";
import founder1 from "@/assets/founder1.jpg";
import founder2 from "@/assets/founder2.jpg";

const values = [
  { icon: <Heart className="h-6 w-6" />, title: "Compassion", description: "Every decision we make begins with the question: how does this serve the people we exist for?" },
  { icon: <Shield className="h-6 w-6" />, title: "Integrity", description: "We publish our accounts openly. Every rupee donated is accounted for and put to work." },
  { icon: <Lightbulb className="h-6 w-6" />, title: "Innovation", description: "Poverty is complex. We refuse cookie-cutter solutions and constantly refine what works." },
  { icon: <Users className="h-6 w-6" />, title: "Community", description: "We don't work for communities — we work with them. Local voices guide everything we do." },
];

const About = () => {
  return (
    <main>
      <section className="bg-primary section-padding" aria-label="About page header">
        <div className="container-narrow text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">About Us</h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            We started with a single room and a tailoring machine. Today we are a movement. Here is our story.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding" aria-labelledby="story-heading">
        <div className="container-narrow">
          <SectionHeading id="story-heading" title="Our Story" />
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="text-muted-foreground leading-relaxed text-lg">
              Utkrast Foundation was born from a simple truth that Sadrun Nisha and Safia Parveen saw every day:
              talent is everywhere, but opportunity is not. Two women from their own communities had the intelligence,
              the drive, and the will to change their lives — what they lacked was access.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              So Sadrun and Safia started small. A room. A sewing machine. Six women from the neighbourhood.
              Word spread. More women came. Children started showing up for lessons. Families began to believe
              that things could be different. That first small room became the foundation of something much larger.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Today, Utkrast Foundation runs structured programs across skill development, children's education,
              and livelihood creation — touching hundreds of lives each year. The room got bigger. The belief never changed.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-secondary" aria-labelledby="vision-mission-heading">
        <div className="container-narrow">
          <h2 id="vision-mission-heading" className="sr-only">Vision and Mission</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-card p-8 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-8 w-8 text-primary" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                An India where a girl's postcode does not determine her possibilities — where every child
                reads, every woman earns, and dignity is not a privilege but a guarantee.
              </p>
            </div>
            <div className="rounded-lg bg-card p-8 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-8 w-8 text-accent" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To empower underprivileged children and women through accessible education, practical
                skill training, and employment support — creating pathways out of poverty that are
                lasting, self-sustaining, and community-owned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="section-padding" aria-labelledby="founders-heading">
        <div className="container-narrow">
          <SectionHeading
            id="founders-heading"
            title="Our Founders"
            subtitle="Two women who chose to do something about inequality rather than simply witness it."
          />
          <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            {[
              {
                name: "Sadrun Nisha",
                role: "Co-Founder",
                image: founder1,
                message: "Every woman who learns a skill doesn't just change her own life — she changes the lives of everyone around her. That ripple effect is what we're building.",
              },
              {
                name: "Safia Parveen",
                role: "Co-Founder",
                image: founder2,
                message: "I have seen what happens when a child is given a book, a mentor, and the belief that they matter. They become unstoppable. That is what we give.",
              },
            ].map((founder) => (
              <article key={founder.name} className="rounded-lg border border-border bg-card p-6 text-center shadow-sm">
                <img
                  src={founder.image}
                  alt={`Portrait of ${founder.name}, Co-Founder of Utkrast Foundation`}
                  className="mx-auto h-32 w-32 rounded-full object-cover border-4 border-accent/20"
                  loading="lazy"
                  width={128}
                  height={128}
                />
                <h3 className="mt-4 text-xl font-bold text-foreground">{founder.name}</h3>
                <p className="text-sm text-accent font-medium">{founder.role}, Utkrast Foundation</p>
                <blockquote className="mt-3 text-muted-foreground italic text-sm leading-relaxed">
                  <p>"{founder.message}"</p>
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-warm" aria-labelledby="values-heading">
        <div className="container-narrow">
          <SectionHeading id="values-heading" title="Our Core Values" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-lg bg-card p-6 text-center border border-border shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mb-4" aria-hidden="true">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Join Our Mission"
        description="Behind every statistic is a real person whose life is changing. Be part of that change."
        primaryLabel="Donate Now"
        primaryLink="/donate"
        secondaryLabel="Get Involved"
        secondaryLink="/get-involved"
      />
    </main>
  );
};

export default About;
