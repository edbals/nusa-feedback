import SubmitForm from "./SubmitForm";

export default function SubmitPage() {
  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-primary mb-1">
            Feedback
          </p>
          <h1 className="font-serif-display italic text-[28px] lg:text-[34px] font-bold text-white">
            Give Feedback
          </h1>
          <p className="mt-2 text-[12.5px] text-muted-text">
            → Share constructive, anonymous feedback with any NUSA team member.
          </p>
        </header>

        <div className="max-w-[560px]">
          <div className="bg-hero-card-bg rounded-[10px] shadow-card-strong p-6 sm:p-8">
            <SubmitForm />
          </div>
        </div>
      </div>
    </div>
  );
}
