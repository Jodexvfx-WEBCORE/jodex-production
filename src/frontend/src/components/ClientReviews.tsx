import { cn } from "@/lib/utils";

interface Review {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const REVIEWS: Review[] = [
  {
    name: "Aryan Mehta",
    role: "3D Animation Client",
    quote:
      "Jodex Production delivered an absolutely stunning 3D product animation for our launch campaign. The attention to detail and smooth motion made our brand stand out. Truly next-level work.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Video Editing Client",
    quote:
      "The reel edit for my fashion shoot was beyond what I imagined. The color grading, transitions, and overall flow were flawless. Will definitely come back for future projects.",
    rating: 5,
  },
  {
    name: "Rahul Nair",
    role: "2D Animation Client",
    quote:
      "Our explainer video came out perfect — clean 2D animation with great pacing and a professional voiceover sync. Jodex Production really knows how to bring concepts to life.",
    rating: 5,
  },
  {
    name: "Sneha Kapoor",
    role: "Interior Designing Client",
    quote:
      "The 3D interior visualization they created for my apartment renovation was incredibly realistic. Every texture and light felt just right. Made decision-making so much easier.",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => `star-${i}`).map((key, i) => (
        <span
          key={key}
          className={cn(
            "text-base",
            i < rating ? "text-cyan-400" : "text-foreground/20",
          )}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

interface ReviewCardProps {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div
      className={cn(
        "glass-effect rounded-2xl p-6 flex flex-col gap-4",
        "border border-white/[0.08] hover:border-cyan-400/20",
        "transition-smooth hover:shadow-[0_0_24px_rgba(34,211,238,0.08)]",
      )}
      data-ocid="review-card"
    >
      <StarRating rating={review.rating} />

      <p className="text-foreground/80 text-sm leading-relaxed flex-1">
        &ldquo;{review.quote}&rdquo;
      </p>

      <div className="flex flex-col gap-0.5 pt-2 border-t border-white/[0.06]">
        <span className="text-foreground font-display font-semibold text-sm">
          {review.name}
        </span>
        <span className="text-cyan-400/70 text-xs tracking-wide uppercase font-mono">
          {review.role}
        </span>
      </div>
    </div>
  );
}

export function ClientReviews() {
  return (
    <section
      className="relative z-10 py-20 px-6 md:px-10 border-t border-white/[0.06]"
      data-ocid="client-reviews-section"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-cyan-400/70 mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            What Clients Say
          </h2>
          <p className="mt-3 text-foreground/50 text-sm max-w-md mx-auto">
            Real feedback from clients across animation, editing, and design.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          data-ocid="reviews-grid"
        >
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
