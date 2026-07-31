import { useState } from "react";
import { cn } from "@/lib/utils";
import { CtaButton } from "@/components/ui-kit/CtaButton";

export function NewsletterForm({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      className={cn("flex flex-col gap-3 sm:flex-row", className)}
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
        setEmail("");
      }}
    >
      <label htmlFor={`newsletter-${tone}`} className="sr-only">
        Adresse e-mail
      </label>
      <input
        id={`newsletter-${tone}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.fr"
        className={cn(
          "h-11 min-w-0 flex-1 rounded-[10px] border px-4 text-[15px] outline-none",
          tone === "light"
            ? "border-navy-foreground/25 bg-transparent text-navy-foreground placeholder:text-navy-foreground/40"
            : "border-border bg-card text-foreground placeholder:text-muted-foreground",
        )}
      />
      <CtaButton type="submit">S'inscrire</CtaButton>
      {done ? (
        <p
          role="status"
          className={cn("text-sm", tone === "light" ? "text-primary" : "text-primary")}
        >
          Merci, inscription enregistrée.
        </p>
      ) : null}
    </form>
  );
}
