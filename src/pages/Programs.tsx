import { useParams } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import ProgramCard from "@/components/ProgramCard";
import CTASection from "@/components/CTASection";
import programSkills from "@/assets/program-skills.jpg";
import programEducation from "@/assets/program-education.jpg";
import programLivelihood from "@/assets/program-livelihood.jpg";

const programsData = [
  {
    slug: "skill-development",
    title: "Women's Skill Development",
    description: "Empowering women with vocational training in tailoring, handicrafts, and digital literacy.",
    image: programSkills,
    longDescription: "Our Women's Skill Development program provides comprehensive vocational training to women from underprivileged backgrounds. Through courses in tailoring, embroidery, handicrafts, and digital literacy, we equip women with marketable skills that enable them to earn a sustainable livelihood. The program includes hands-on workshops, mentorship from industry professionals, and post-training support to help women start their own micro-enterprises.",
    highlights: ["6-month intensive training", "Hands-on practical workshops", "Business mentorship", "Post-training placement support"],
  },
  {
    slug: "education-support",
    title: "Children's Education Support",
    description: "Providing quality education, school supplies, and mentorship to underprivileged children.",
    image: programEducation,
    longDescription: "Our Children's Education Support program ensures that every child, regardless of their economic background, has access to quality education. We provide school supplies, uniforms, tuition assistance, and after-school tutoring. Our dedicated mentors work closely with each child, helping them build confidence and academic skills. We also engage with parents to create a supportive learning environment at home.",
    highlights: ["Free school supplies & uniforms", "After-school tutoring centers", "One-on-one mentorship", "Parent engagement workshops"],
  },
  {
    slug: "livelihood-training",
    title: "Livelihood Training",
    description: "Creating sustainable income opportunities through entrepreneurship and skills training.",
    image: programLivelihood,
    longDescription: "Our Livelihood Training program focuses on creating sustainable income opportunities for marginalized communities. We offer training in various trades including food processing, handicrafts, and small-scale manufacturing. Participants learn not only technical skills but also business management, financial literacy, and market access. The program aims to transform beneficiaries from job seekers to job creators.",
    highlights: ["Multiple trade options", "Financial literacy training", "Market linkage support", "Micro-loan facilitation"],
  },
];

const Programs = () => {
  const { slug } = useParams();

  // Detail view
  if (slug) {
    const program = programsData.find((p) => p.slug === slug);
    if (!program) {
      return (
        <main className="section-padding">
          <div className="container-narrow text-center">
            <h1 className="text-3xl font-bold text-foreground">Program Not Found</h1>
          </div>
        </main>
      );
    }
    return (
      <main>
        <section className="bg-primary section-padding">
          <div className="container-narrow text-center">
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">{program.title}</h1>
          </div>
        </section>
        <section className="section-padding">
          <div className="container-narrow">
            <div className="grid gap-8 lg:grid-cols-2">
              <img src={program.image} alt={program.title} className="rounded-lg object-cover w-full aspect-[4/3]" />
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">About This Program</h2>
                <p className="text-muted-foreground leading-relaxed">{program.longDescription}</p>
                <h3 className="mt-6 text-lg font-semibold text-foreground">Program Highlights</h3>
                <ul className="mt-3 space-y-2">
                  {program.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-muted-foreground">
                      <span className="h-2 w-2 rounded-full bg-accent shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <CTASection
          title="Support This Program"
          description="Your contribution can help us expand this program and reach more lives."
          primaryLabel="Donate Now"
          primaryLink="/donate"
        />
      </main>
    );
  }

  // List view
  return (
    <main>
      <section className="bg-primary section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Our Programs</h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Focused programs creating lasting change in education, skills, and livelihoods.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid gap-6 md:grid-cols-3">
            {programsData.map((p) => (
              <ProgramCard key={p.slug} title={p.title} description={p.description} image={p.image} slug={p.slug} />
            ))}
          </div>
        </div>
      </section>
      <CTASection
        title="Support Our Programs"
        description="Help us create sustainable impact in communities across India."
        primaryLabel="Donate Now"
        primaryLink="/donate"
        secondaryLabel="Volunteer"
        secondaryLink="/get-involved"
      />
    </main>
  );
};

export default Programs;
