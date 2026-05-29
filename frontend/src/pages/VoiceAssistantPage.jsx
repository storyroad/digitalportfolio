import React, { useEffect } from "react";
import { PhoneCall, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function VoiceAssistantPage() {
  useEffect(() => {
    let cancelled = false;

    async function start() {
      if (window.__vapiWidgetStarted) return;

      const maxWaitMs = 10000;
      const startedAt = Date.now();

      while (!cancelled && !window.vapiSDK) {
        if (Date.now() - startedAt > maxWaitMs) return;
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      if (cancelled || !window.vapiSDK || window.__vapiWidgetStarted) return;

      window.__vapiWidgetStarted = true;

      window.vapiSDK.run({
        apiKey: "cd9b9c92-250a-409c-869f-2a56a012b61d",
        assistant: "37f3c136-839a-4e3d-96ee-cb974d1a87c9",
        config: {
          position: "bottom-right",
        },
      });
    }

    start();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white px-6 py-16 text-black">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Test AI Voice Assistant</h1>
              <p className="mt-4 text-base leading-relaxed text-black/70">
                You can test the assistant directly from this page or call the live
                number from your own phone.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center rounded-2xl border border-black/10 px-4 py-3 text-sm font-medium text-black transition hover:bg-slate-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to portfolio
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <h2 className="text-lg font-semibold text-emerald-900">
                Test on this page
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-emerald-800">
                Click the <span className="font-semibold">green phone widget</span>
                {" "}in the bottom-right corner to start the voice assistant call in your browser.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-slate-50 p-5">
              <h2 className="text-lg font-semibold text-black">
                Call from your phone
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-black/70">
                Prefer to test it on your phone? Use the live number below.
              </p>

              <a
                href="tel:+18574969001"
                className="mt-4 inline-flex items-center rounded-2xl bg-black px-5 py-3 text-white transition hover:opacity-90"
                aria-label="Call 857-496-9001"
              >
                <PhoneCall className="mr-2 h-4 w-4" />
                Call 857-496-9001
              </a>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-black/10 bg-white p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-black/70">
              How to test
            </h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-black/70">
              <li>Wait for the page to fully load.</li>
              <li>Look at the bottom-right corner of the screen.</li>
              <li>Click the green phone widget.</li>
              <li>Allow microphone access if your browser asks.</li>
              <li>Start speaking to test the assistant.</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
