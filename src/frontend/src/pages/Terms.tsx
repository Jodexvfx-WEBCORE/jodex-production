interface TcSection {
  id: string;
  title: string;
  content?: string;
  bullets?: string[];
}

const SECTIONS: TcSection[] = [
  {
    id: "no-free-samples",
    title: "1. No Free Samples or Demo Work",
    content:
      "I do not provide free sample work or demo projects. My time and skills are professional services and require payment.",
  },
  {
    id: "advance-payment",
    title: "2. Advance Payment Policy",
    content:
      "A minimum of 50% payment must be made in advance before starting any project. Work will only begin after the advance is received.",
  },
  {
    id: "watermark",
    title: "3. Final Payment & Watermark Policy",
    bullets: [
      "The final output (without watermark) will only be delivered after full payment is completed.",
      "Until full payment is made, any preview/shared work will include a watermark.",
      "No exceptions will be made to this rule.",
    ],
  },
  {
    id: "communication",
    title: "4. Communication Policy",
    bullets: [
      "Work-related communication will be handled via WhatsApp.",
      "I do not accept project communication through Discord.",
      "For foreign clients, communication platforms can be adjusted if necessary.",
    ],
  },
  {
    id: "delivery",
    title: "5. Delivery Time & Delay Clause",
    bullets: [
      "I will always aim to deliver work on time as discussed.",
      "If I fail to deliver within the agreed timeline, the client is allowed to deduct a small reasonable margin from the final payment.",
      "Delays caused by the client (late replies, changes, missing files) will not be counted.",
    ],
  },
  {
    id: "client-responsibility",
    title: "6. Client Responsibility",
    bullets: [
      "The client must provide clear instructions, scripts, assets, and references before work begins.",
      "Any changes after project approval may require additional charges.",
    ],
  },
  {
    id: "revisions",
    title: "7. Revision Policy",
    bullets: [
      "Limited revisions will be provided as discussed before starting the project.",
      "Extra revisions beyond the agreed limit will be charged.",
    ],
  },
  {
    id: "payment-terms",
    title: "8. Payment Terms",
    bullets: [
      "Full payment must be completed on time after project completion.",
      "Delay in payment may result in delayed delivery or project hold.",
    ],
  },
  {
    id: "ownership",
    title: "9. Ownership & Usage Rights",
    bullets: [
      "Final files (without watermark) will be owned by the client only after full payment.",
      "I reserve the right to showcase the work in my portfolio unless the client requests otherwise in advance.",
    ],
  },
  {
    id: "cancellation",
    title: "10. Project Cancellation",
    bullets: [
      "If the client cancels the project after work has started, the advance payment is non-refundable.",
      "Work done up to that point may be shared at my discretion.",
    ],
  },
  {
    id: "misuse",
    title: "11. Misuse & Fraud Protection",
    bullets: [
      "Any attempt to scam, misuse work, or avoid payment will result in immediate termination of the project.",
      "Legal or platform-based actions may be taken if necessary.",
    ],
  },
  {
    id: "agreement",
    title: "12. Agreement",
    content: "By working with me, you agree to all the terms mentioned above.",
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-black px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight mb-3">
            Terms &amp; Conditions
          </h1>
          <div className="h-1 w-20 bg-cyan-400 rounded-full mx-auto mb-6" />
          <p className="text-white/80 text-lg font-medium mb-2">
            Hi, I am Jodex. This is my portfolio website.
          </p>
          <p className="text-white/50 text-sm max-w-2xl mx-auto leading-relaxed">
            By accessing or working with me through this website, you agree to
            the following Terms and Conditions:
          </p>
        </div>

        {/* Glass container wrapping all sections */}
        <div
          className="rounded-2xl border border-white/10 px-6 py-8 sm:px-10 sm:py-10 flex flex-col gap-8"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)",
          }}
        >
          {SECTIONS.map((section) => (
            <div key={section.id} data-ocid={`tc-section-${section.id}`}>
              <h2 className="font-display font-bold text-base sm:text-lg mb-2 flex items-baseline gap-2 flex-wrap">
                <span className="text-cyan-400">
                  {section.title.split(".")[0]}.
                </span>
                <span className="text-white">
                  {section.title.replace(/^\d+\.\s*/, "")}
                </span>
              </h2>

              {section.content && (
                <p className="text-white/75 text-sm sm:text-base leading-relaxed pl-1">
                  {section.content}
                </p>
              )}

              {section.bullets && (
                <ul className="flex flex-col gap-2 mt-1 pl-1">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-white/75 text-sm sm:text-base leading-relaxed"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Divider */}
          <hr className="border-white/10" />

          {/* Footer note */}
          <div className="text-center" data-ocid="tc-footer">
            <p className="text-white/80 font-semibold text-base">
              Thank you for trusting Jodex.
            </p>
            <p className="text-white/40 text-sm mt-1 tracking-widest uppercase font-body">
              Professional Editing &amp; Animation Services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
