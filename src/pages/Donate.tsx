import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, BookOpen, GraduationCap, Sparkles, Loader2, Shield } from "lucide-react";
import { toast } from "sonner";

const tiers = [
  {
    amount: 1000,
    label: "₹1,000",
    impact: "School supplies for 5 children for a month",
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    amount: 5000,
    label: "₹5,000",
    impact: "Funds a woman's complete skill training course",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    amount: 10000,
    label: "₹10,000",
    impact: "Supports a child's education for an entire year",
    icon: <GraduationCap className="h-6 w-6" />,
  },
];

const Donate = () => {
  const [selected, setSelected] = useState<number | null>(5000);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [loading, setLoading] = useState(false);

  const effectiveAmount = selected ?? (custom ? Number(custom) : null);

  const handleDonate = async () => {
    if (!effectiveAmount || effectiveAmount < 100) {
      toast.error("Minimum donation amount is ₹100.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: effectiveAmount, frequency }),
      });
      const data = await res.json();
      if (data.demo) {
        // Payment gateway not yet set up
        toast.info("Payment gateway coming soon! Your generosity means the world to us. 🙏");
      } else if (data.orderId) {
        // TODO: Open Razorpay checkout with data.orderId
        toast.success("Redirecting to payment…");
      } else {
        toast.error("Unable to process donation. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="bg-primary section-padding" aria-label="Donation page header">
        <div className="container-narrow text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Make a Donation</h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Every rupee you give plants a seed of change. Help us educate a child, skill a woman, and transform a community.
          </p>
        </div>
      </section>

      <section className="section-padding" aria-label="Donation form">
        <div className="container-narrow max-w-2xl">

          {/* Impact quote */}
          <blockquote className="mb-10 border-l-4 border-accent pl-4 italic text-muted-foreground leading-relaxed">
            "I never imagined that a single course could change my life. Today I run my own tailoring shop and employ two other women."
            <footer className="mt-2 not-italic text-sm font-semibold text-foreground">— Fatima Begum, Program Graduate</footer>
          </blockquote>

          {/* Frequency toggle */}
          <fieldset className="mb-10">
            <legend className="sr-only">Donation frequency</legend>
            <div className="flex items-center justify-center gap-2 rounded-full bg-secondary p-1 max-w-xs mx-auto" role="group">
              {(["once", "monthly"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  aria-pressed={frequency === f}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    frequency === f ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f === "once" ? "One-Time" : "Monthly"}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Tiers */}
          <fieldset className="mb-6">
            <legend className="sr-only">Select donation amount</legend>
            <div className="grid gap-4 sm:grid-cols-3">
              {tiers.map((tier) => (
                <button
                  key={tier.amount}
                  type="button"
                  onClick={() => { setSelected(tier.amount); setCustom(""); }}
                  aria-pressed={selected === tier.amount}
                  className={`rounded-lg border-2 p-6 text-center transition-all focus-visible:ring-2 focus-visible:ring-accent ${
                    selected === tier.amount
                      ? "border-accent bg-accent/5 shadow-md"
                      : "border-border bg-card hover:border-accent/50"
                  }`}
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent mb-3" aria-hidden="true">
                    {tier.icon}
                  </div>
                  <p className="text-2xl font-bold text-foreground">{tier.label}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{tier.impact}</p>
                </button>
              ))}
            </div>
          </fieldset>

          {/* Custom amount */}
          <div className="mb-8">
            <label htmlFor="custom-amount" className="sr-only">Custom donation amount in rupees</label>
            <Input
              id="custom-amount"
              type="number"
              min={100}
              placeholder="Enter custom amount (₹)"
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
              className="text-center text-lg"
            />
          </div>

          <Button
            onClick={handleDonate}
            disabled={loading || !effectiveAmount}
            size="lg"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg"
            aria-label={`Donate ${effectiveAmount ? `₹${effectiveAmount.toLocaleString()}` : "now"}`}
          >
            {loading ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />Processing…</>
            ) : (
              <><Heart className="mr-2 h-5 w-5" aria-hidden="true" />
              Donate {effectiveAmount ? `₹${effectiveAmount.toLocaleString()}` : "Now"}
              {frequency === "monthly" ? " / month" : ""}</>
            )}
          </Button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Secure payment powered by Razorpay. Your data is protected.</span>
          </div>

          <div className="mt-8 rounded-lg bg-secondary p-5 text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">80G Tax Benefit:</strong> Donations to Utkrast Foundation may be eligible
            for tax deduction under Section 80G of the Income Tax Act. You'll receive an official receipt via email.
          </div>
        </div>
      </section>
    </main>
  );
};

export default Donate;
