import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HandHeart, Briefcase, Building, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ways = [
  {
    icon: <HandHeart className="h-8 w-8" />,
    title: "Volunteer",
    description:
      "Your time is one of the most powerful gifts you can give. Join our volunteers in teaching, mentoring, event organising, or sharing professional expertise — on-ground or remotely.",
  },
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: "Internships",
    description:
      "Gain meaningful, CV-defining experience working alongside communities. We offer internships in program management, communications, social media, research, and impact reporting.",
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "Corporate Partnership",
    description:
      "Partner with us under your CSR mandate. We offer transparent, audited, impact-driven partnership models tailored to companies that are serious about social change.",
  },
];

const GetInvolved = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    // Reuse contact API
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: "Get Involved Inquiry",
          message: form.message,
        }),
      });
    } catch { /* best effort */ }
    setLoading(false);
    setSubmitted(true);
    toast.success("Thank you! We'll be in touch soon.");
  };

  return (
    <main>
      <section className="bg-primary section-padding" aria-label="Get involved page header">
        <div className="container-narrow text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Get Involved</h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            You don't have to donate money to make a difference. There are many ways to be part of the change.
          </p>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="ways-heading">
        <div className="container-narrow">
          <SectionHeading
            id="ways-heading"
            title="Ways to Contribute"
            subtitle="Find the path that fits your skills, time, and passion."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {ways.map((item) => (
              <article key={item.title} className="rounded-lg border border-border bg-card p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4" aria-hidden="true">
                  {item.icon}
                </div>
                <h2 className="text-xl font-bold text-foreground">{item.title}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed text-sm">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary" aria-labelledby="interest-form-heading">
        <div className="container-narrow max-w-xl">
          <SectionHeading
            id="interest-form-heading"
            title="Interested? Let's Talk."
            subtitle="Tell us a little about yourself and how you'd like to help. We'll find the right opportunity together."
          />

          {submitted ? (
            <div role="status" className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
              <CheckCircle className="mx-auto h-10 w-10 text-green-600 mb-3" aria-hidden="true" />
              <p className="font-semibold text-green-800">We've received your message!</p>
              <p className="mt-1 text-green-700 text-sm">A member of our team will reach out within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Get involved form">
              <div>
                <label htmlFor="gi-name" className="sr-only">Your Name</label>
                <Input
                  id="gi-name"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="gi-email" className="sr-only">Your Email</label>
                <Input
                  id="gi-email"
                  type="email"
                  placeholder="Your Email *"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="gi-message" className="sr-only">How would you like to help?</label>
                <Textarea
                  id="gi-message"
                  placeholder="Tell us how you'd like to help… *"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  required
                  disabled={loading}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />Sending…</>
                ) : "Submit"}
              </Button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default GetInvolved;
