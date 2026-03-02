import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Instagram, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";

const Contact = () => {
  const { form, state, setField, submit } = useContactForm();
  const isLoading = state.status === "loading";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <main>
      <section className="bg-primary section-padding" aria-label="Page header">
        <div className="container-narrow text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Contact Us</h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Have a question, partnership idea, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section-padding" aria-label="Contact form and details">
        <div className="container-narrow">
          <div className="grid gap-12 lg:grid-cols-2">

            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>

              {state.status === "success" ? (
                <div role="alert" className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                  <CheckCircle className="mx-auto h-10 w-10 text-green-600 mb-3" aria-hidden="true" />
                  <p className="font-semibold text-green-800 text-lg">Message Sent!</p>
                  <p className="mt-1 text-green-700 text-sm">
                    Thank you for reaching out. We'll respond within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate aria-label="Contact form">
                  {state.status === "error" && state.globalError && (
                    <div role="alert" className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{state.globalError}</span>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="sr-only">Your Name</label>
                      <Input
                        id="contact-name"
                        placeholder="Your Name *"
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        required
                        disabled={isLoading}
                        aria-invalid={!!state.fieldErrors.name}
                        className={state.fieldErrors.name ? "border-destructive" : ""}
                      />
                      {state.fieldErrors.name && (
                        <p role="alert" className="mt-1 text-xs text-destructive">{state.fieldErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="sr-only">Your Email</label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="Your Email *"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        required
                        disabled={isLoading}
                        aria-invalid={!!state.fieldErrors.email}
                        className={state.fieldErrors.email ? "border-destructive" : ""}
                      />
                      {state.fieldErrors.email && (
                        <p role="alert" className="mt-1 text-xs text-destructive">{state.fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="sr-only">Subject</label>
                    <Input
                      id="contact-subject"
                      placeholder="Subject *"
                      value={form.subject}
                      onChange={(e) => setField("subject", e.target.value)}
                      required
                      disabled={isLoading}
                      aria-invalid={!!state.fieldErrors.subject}
                      className={state.fieldErrors.subject ? "border-destructive" : ""}
                    />
                    {state.fieldErrors.subject && (
                      <p role="alert" className="mt-1 text-xs text-destructive">{state.fieldErrors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="sr-only">Message</label>
                    <Textarea
                      id="contact-message"
                      placeholder="Your message… *"
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                      rows={5}
                      required
                      disabled={isLoading}
                      aria-invalid={!!state.fieldErrors.message}
                      className={state.fieldErrors.message ? "border-destructive" : ""}
                    />
                    {state.fieldErrors.message && (
                      <p role="alert" className="mt-1 text-xs text-destructive">{state.fieldErrors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full sm:w-auto"
                  >
                    {isLoading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />Sending…</>
                    ) : "Send Message"}
                  </Button>
                </form>
              )}
            </div>

            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <address className="not-italic space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:utkrastfoundation61@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      utkrastfoundation61@gmail.com
                    </a>
                  </div>
                </div>
              </address>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Follow Us</h3>
                <a
                  href="https://www.instagram.com/utkrast_foundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                  aria-label="Utkrast Foundation on Instagram"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  @utkrast_foundation
                </a>
              </div>

              <div className="mt-8 rounded-lg bg-warm border border-border p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Response time:</strong> We typically respond within 48 hours.
                  For partnership or CSR inquiries, please mention it in your subject line.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
