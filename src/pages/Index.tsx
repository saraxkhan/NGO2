import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Briefcase, Heart, Star, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import StatCard from "@/components/StatCard";
import ProgramCard from "@/components/ProgramCard";
import CTASection from "@/components/CTASection";
import heroBg from "@/assets/hero-bg.jpg";
import programSkills from "@/assets/program-skills.jpg";
import programEducation from "@/assets/program-education.jpg";
import programLivelihood from "@/assets/program-livelihood.jpg";

const stats = [
  { number: "500+", label: "Women Trained", icon: <Users className="h-6 w-6" /> },
  { number: "300+", label: "Children Educated", icon: <GraduationCap className="h-6 w-6" /> },
  { number: "50+", label: "Communities Reached", icon: <Heart className="h-6 w-6" /> },
  { number: "100+", label: "Livelihoods Created", icon: <Briefcase className="h-6 w-6" /> },
];

const programs = [
  {
    title: "Women's Skill Development",
    description: "We believe no woman should ever have to choose between her dignity and her survival. Through tailoring, handicrafts, and digital literacy training, we equip women with skills that create real, lasting income.",
    image: programSkills,
    slug: "skill-development",
  },
  {
    title: "Children's Education Support",
    description: "A child who can read holds the future in their hands. We provide school supplies, mentorship, and after-school tutoring so that poverty is never a reason a child stops learning.",
    image: programEducation,
    slug: "education-support",
  },
  {
    title: "Livelihood Training",
    description: "We don't just train people — we build entrepreneurs. Our livelihood programs combine trade skills, financial literacy, and market access to turn knowledge into income.",
    image: programLivelihood,
    slug: "livelihood-training",
  },
];

const testimonials = [
  {
    quote: "The tailoring course didn't just teach me a skill — it gave me the confidence to believe I could build something of my own. Now I employ two women from my village.",
    name: "Priya Sharma",
    role: "Skill Development Graduate",
  },
  {
    quote: "My daughter was on the verge of dropping out. Thanks to the education program, she's now top of her class and dreams of becoming a doctor.",
    name: "Rekha Devi",
    role: "Parent, Education Program",
  },
  {
    quote: "Partnering with Utkrast Foundation has been one of our most impactful CSR decisions. Their on-ground transparency and genuine commitment to change is rare.",
    name: "Rajesh Mehta",
    role: "CSR Partner",
  },
];

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden" aria-label="Hero section">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={heroBg}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="relative container-narrow section-padding py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Empowering Lives,{" "}
              <span className="text-accent">Building Futures</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/85 leading-relaxed md:text-xl">
              Utkrast Foundation works to uplift underprivileged children and women through education,
              skill development, and sustainable employment across India. Because every person deserves
              the chance to live with dignity.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/donate">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8">
                  Donate Now
                </Button>
              </Link>
              <Link to="/get-involved">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8">
                  Volunteer With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-warm" aria-labelledby="impact-heading">
        <div className="container-narrow">
          <SectionHeading
            id="impact-heading"
            title="Our Impact"
            subtitle="Real numbers. Real lives. Real change — made possible by people like you."
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding" aria-labelledby="programs-heading">
        <div className="container-narrow">
          <SectionHeading
            id="programs-heading"
            title="Our Programs"
            subtitle="Focused, community-led programs that create measurable, lasting change."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.slug} {...program} />
            ))}
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="section-padding bg-secondary" aria-labelledby="story-heading">
        <div className="container-narrow">
          <SectionHeading id="story-heading" title="A Story of Hope" />
          <figure className="mx-auto max-w-3xl rounded-lg bg-card p-8 shadow-sm border border-border">
            <div className="flex items-start gap-4">
              <Star className="h-8 w-8 shrink-0 text-accent" aria-hidden="true" />
              <blockquote>
                <p className="text-foreground leading-relaxed text-lg italic">
                  "When I joined the skill development program, I had no source of income. Today, I run a small tailoring shop in my village and employ two other women.
                  Utkrast Foundation didn't just teach me a skill — they gave me dignity and independence."
                </p>
                <figcaption className="mt-4">
                  <strong className="font-semibold text-foreground">Fatima Begum</strong>
                  <span className="text-sm text-muted-foreground block">Tailoring Program Graduate, Bihar</span>
                </figcaption>
              </blockquote>
            </div>
          </figure>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding" aria-labelledby="testimonials-heading">
        <div className="container-narrow">
          <SectionHeading
            id="testimonials-heading"
            title="Voices of Change"
            subtitle="Hear from the people whose lives have been touched by our work."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <Quote className="h-6 w-6 text-accent/50 mb-3" aria-hidden="true" />
                <blockquote>
                  <p className="text-muted-foreground leading-relaxed italic">{t.quote}</p>
                </blockquote>
                <figcaption className="mt-4 border-t border-border pt-4">
                  <strong className="font-semibold text-foreground text-sm">{t.name}</strong>
                  <span className="text-xs text-muted-foreground block">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Together, We Can Make a Difference"
        description="Your support can transform lives. Join us in creating a brighter, more equitable future for underprivileged children and women across India."
        primaryLabel="Donate Now"
        primaryLink="/donate"
        secondaryLabel="Become a Volunteer"
        secondaryLink="/get-involved"
      />
    </main>
  );
};

export default Index;
