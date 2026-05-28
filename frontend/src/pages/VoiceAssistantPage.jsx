import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, PhoneCall, Mic, Workflow } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VoiceAssistantPage() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    const maxWait = 10000;
    const startedAt = Date.now();

    const tryStart = () => {
      if (cancelled) return;
      // Guard against duplicate init (StrictMode / re-mount)
      if (window.__vapiWidgetStarted) return;

      if (window.vapiSDK && typeof window.vapiSDK.run === "function") {
        try {
          window.__vapiWidgetStarted = true;
          window.vapiSDK.run({
            apiKey: "cd9b9c92-250a-409c-869f-2a56a012b61d",
            assistant: "37f3c136-839a-4e3d-96ee-cb974d1a87c9",
            config: { position: "bottom-right" },
          });
        } catch (_err) {
          // fail silently
        }
        return;
      }

      if (Date.now() - startedAt < maxWait) {
        setTimeout(tryStart, 300);
      }
      // else fail silently
    };

    tryStart();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4DBD8]/20 via-white to-[#F4DBD8]/10">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[#BEA8A7]/30 bg-white/90 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium text-[#775144] hover:text-[#2A0800] transition-colors"
            data-testid="voice-back-btn"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </button>
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-gradient-to-br from-[#775144] to-[#2A0800] p-2">
              <Workflow className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-base text-[#2A0800] tracking-tight">COMMARKAI</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#C09891] mb-3">Live Demo</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A0800] tracking-tight mb-4 leading-[1.05]">
            AI Voice Assistant
          </h1>
          <p className="text-base md:text-lg text-[#775144] leading-relaxed mb-10">
            Click the voice widget in the bottom-right corner to start a live conversation with the AI assistant.
            Or call the number below to test the same assistant by phone.
          </p>

          <div className="space-y-4 mb-12">
            <div className="border border-[#BEA8A7]/40 bg-white p-5 flex items-start gap-4">
              <div className="rounded-none bg-[#2A0800] p-2.5 text-white flex-shrink-0">
                <Mic className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-[#2A0800] tracking-tight mb-1">Web Voice Widget</h3>
                <p className="text-sm text-[#775144] leading-relaxed">
                  The browser voice assistant will load automatically. Allow microphone access when prompted.
                </p>
              </div>
            </div>

            <a
              href="tel:+18574969001"
              className="border border-[#BEA8A7]/40 bg-white p-5 flex items-start gap-4 hover:border-[#2A0800] transition-colors group"
              data-testid="voice-page-call-btn"
            >
              <div className="rounded-none bg-[#F4DBD8]/50 p-2.5 text-[#2A0800] flex-shrink-0 group-hover:bg-[#2A0800] group-hover:text-white transition-colors">
                <PhoneCall className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-[#2A0800] tracking-tight mb-1">Call by Phone</h3>
                <p className="text-sm text-[#775144] leading-relaxed">
                  Dial <span className="font-semibold text-[#2A0800]">857-496-9001</span> to test the assistant on a real call.
                </p>
              </div>
            </a>
          </div>

          <div className="border-l-4 border-[#2A0800] bg-[#F4DBD8]/20 p-5">
            <p className="text-xs font-mono uppercase tracking-wider text-[#C09891] mb-2">Note</p>
            <p className="text-sm text-[#775144] leading-relaxed">
              If the voice widget does not appear, refresh the page or try a different browser. Microphone permission is required.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
