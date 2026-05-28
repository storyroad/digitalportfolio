import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Briefcase, GraduationCap, Award, Code2, Languages, Mail, MapPin, Workflow } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Resume() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4DBD8]/20 via-white to-[#F4DBD8]/10">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[#BEA8A7]/30 bg-white/90 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-medium text-[#775144] hover:text-[#2A0800] transition-colors"
            data-testid="resume-back-btn"
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Resume Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#C09891] mb-3">Resume</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A0800] tracking-tight mb-3">
              Ketsia St-Louis Noel
            </h1>
            <p className="text-base sm:text-lg text-[#775144] mb-6">
              Automation Strategist · Operations Specialist
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#775144]">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>ketsiasln@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Remote · Bilingual EN/FR</span>
              </div>
            </div>
          </div>

          {/* Placeholder notice */}
          <Card className="rounded-2xl border-[#BEA8A7]/40 bg-[#F4DBD8]/30 shadow-sm mb-8">
            <CardContent className="p-6 md:p-8 text-center">
              <p className="text-sm text-[#775144] leading-relaxed">
                Resume content will be added here. Please share your full resume details and they will be inserted into structured sections below — experience, skills, certifications, and education.
              </p>
            </CardContent>
          </Card>

          {/* Placeholder Sections */}
          <div className="space-y-6">
            {[
              { icon: Briefcase, title: 'Professional Experience', desc: 'Roles, responsibilities, and key achievements across operations and automation projects.' },
              { icon: Code2, title: 'Technical Skills', desc: 'Tools, platforms, and technologies — including Power BI, Tableau, SQL, BMC, ServiceNow, SAP, and AI automation stacks.' },
              { icon: Award, title: 'Certifications & Awards', desc: 'Industry certifications, training programs, and notable recognition.' },
              { icon: GraduationCap, title: 'Education', desc: 'Academic background and relevant coursework.' },
              { icon: Languages, title: 'Languages', desc: 'English (fluent) · French (fluent / bilingual)' },
            ].map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Card className="rounded-2xl border-[#BEA8A7]/40 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl bg-[#F4DBD8]/50 p-3 flex-shrink-0">
                          <Icon className="h-5 w-5 text-[#775144]" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-lg font-semibold text-[#2A0800] mb-2">{section.title}</h2>
                          <p className="text-sm text-[#775144] leading-relaxed">{section.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Button
              onClick={() => navigate('/#contact')}
              className="rounded-none bg-[#2A0800] hover:bg-[#775144] text-white px-8 py-6 text-sm font-semibold tracking-wide uppercase transition-all duration-300"
              data-testid="resume-contact-btn"
            >
              Get in touch
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
