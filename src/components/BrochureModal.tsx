import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Placeholder — replace with real PDF link later
const PDF_URL = "/brochure.pdf";

type Ctx = { open: () => void };
const BrochureCtx = React.createContext<Ctx | null>(null);

export function useBrochureModal() {
  const ctx = React.useContext(BrochureCtx);
  if (!ctx) throw new Error("useBrochureModal must be used within BrochureModalProvider");
  return ctx;
}

export function BrochureModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleOpen = React.useCallback(() => {
    setSubmitted(false);
    setError(null);
    setOpen(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    try {
      const stored = JSON.parse(localStorage.getItem("brochure_leads") || "[]");
      stored.push({ name: name.trim(), email: trimmed, at: new Date().toISOString() });
      localStorage.setItem("brochure_leads", JSON.stringify(stored));
    } catch {}
    setSubmitted(true);
  };

  return (
    <BrochureCtx.Provider value={{ open: handleOpen }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-background border-border">
          {!submitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl font-light">
                  Get the PDF Brochure
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Enter your email and we'll send the full Lucid Village brochure straight to your inbox.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="mt-2 space-y-4">
                <div>
                  <label className="tracking-display text-xs uppercase text-gold">Name (optional)</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="mt-2"
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="tracking-display text-xs uppercase text-gold">Email</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="mt-2"
                    maxLength={255}
                  />
                  {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground tracking-display uppercase text-xs py-6 hover:opacity-90"
                >
                  Send me the brochure
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl font-light">
                  Brochure sent.
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Check your email — it's on its way. If it doesn't appear in a few minutes, you can also download it directly below.
                </DialogDescription>
              </DialogHeader>
              <a
                href={PDF_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center border border-primary bg-primary px-8 py-3 text-xs tracking-display uppercase text-primary-foreground transition hover:opacity-90"
              >
                Download PDF
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </BrochureCtx.Provider>
  );
}

export function BrochureButton({
  children = "Get the PDF Brochure",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { open } = useBrochureModal();
  return (
    <button
      type="button"
      onClick={open}
      className={
        className ??
        "inline-flex min-w-56 items-center justify-center border border-primary bg-primary px-8 py-3 text-sm tracking-display uppercase text-primary-foreground transition hover:opacity-90"
      }
    >
      {children}
    </button>
  );
}
