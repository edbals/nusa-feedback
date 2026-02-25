import SubmitForm from "./SubmitForm";

export default function SubmitPage() {
  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl lg:text-[28px] font-bold text-body-text">
            Give feedback
          </h1>
          <p className="mt-2 text-sm text-muted-text">
            Share constructive, anonymous feedback with any NUSA team member.
          </p>
        </header>

        <div className="max-w-[560px]">
          <div className="bg-card-bg rounded-xl shadow-card-strong p-6 sm:p-8">
            <SubmitForm />
          </div>
        </div>
      </div>
    </div>
  );
}
