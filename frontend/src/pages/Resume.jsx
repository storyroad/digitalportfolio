import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Briefcase, GraduationCap, Award, Code2, 
  Languages, Mail, MapPin, Workflow, Phone, Linkedin, Shield, Globe 
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const experience = [
  {
    title: 'Founder · AI Automation, Sales & Marketing Systems',
    company: 'COMMARKAI',
    period: '2025 – Present',
    location: 'Toronto / Ottawa',
    points: [
      'Built a media monitoring automation that aggregates news content, routes items through an editorial approval workflow, and delivers formatted email notifications, eliminating manual submission steps and accelerating publication turnaround.',
      'Leveraged monitored news content to generate timely, insight-driven LinkedIn posts that achieved high executive engagement, sparked strategic conversations, and converted visibility into qualified leads.',
      'Designed chain-of-thought prompt frameworks that improved complex reasoning accuracy across generative AI tasks and built a structured prompt library adopted as a reusable reference across workflows.',
      'Optimized RAG system prompts to improve retrieval relevance and measurably reduce AI hallucinations, increasing output reliability for client-facing use cases.',
      'Built a systematic prompt testing framework with A/B evaluation methodology, identifying performance gaps and driving iterative improvements to prompt quality and consistency.',
      'Automated prompt optimization pipelines and implemented strategic information retention techniques that reduced API costs and decreased manual review requirements.',
      'Prototype voice-assisted AI and agentic workflow solutions using VAPI, covering lead qualification, client intake, customer follow-up, call handling, knowledge support, and reporting automation.',
      'Authored proprietary SOPs and data-driven documentation, including structured knowledge bases, response frameworks, and training datasets, to configure and train AI responses across voice assistants, chatbots, and automated email communications.',
      'Scope automation opportunities across CRM systems, APIs, dashboards, low-code platforms, cloud environments, and enterprise backends, weighing business goals, operational complexity, and governance requirements.'
    ]
  },
  {
    title: 'Incident Coordinator / Tactical Incident Manager',
    company: 'Shared Services Canada',
    period: '2016 – Present',
    location: '',
    points: [
      'Lead incident coordination, escalation workflows, reporting, and stakeholder communications across Government of Canada portfolios, Crown corporations, and external clients.',
      'Author timely notifications, incident updates, and executive summaries that maintain clarity and confidence during service-impacting events.',
      'Apply quality assurance standards to incident reporting, improving data accuracy, consistency, and stakeholder trust.',
      'Manage incident tracking and action logs across a multi-tool environment including Microsoft 365 (SharePoint, OneNote, Outlook, Teams, Excel), Power BI, IBM SmartCloud, BMC Tools, Enterprise Control Desk, and HP Service Manager.',
      'Deliver technical support for operating systems, peripherals, account access, application issues, and security-related incidents.'
    ]
  },
  {
    title: 'IT Consultant / iOS Device Consultant',
    company: 'Library of Parliament',
    period: '2016',
    location: '',
    points: [
      'Configured, tested, and documented mobile device installations and updates across a large-scale technology rollout.',
      'Oversaw inventory tracking for mobile devices, warranty claims, and replacement processes, maintaining accurate records throughout.',
      'Delivered tailored device training to end users at varying technical levels and deployed software in compliance with House of Commons standards.'
    ]
  },
  {
    title: 'Customer Service Representative',
    company: 'Knowledge First Financial',
    period: '2013 – 2016',
    location: '',
    points: [
      'Delivered bilingual client support for Registered Education Savings Plans (RESPs), maintaining accurate client and financial records in Cognos Business Software.',
      'Resolved client and regional sales representative inquiries with a consistent focus on accuracy, professionalism, and practical solutions.',
      'Exceeded monthly referral targets and strengthened client retention through clear communication, sound judgment, and policy-aligned guidance.'
    ]
  },
  {
    title: 'Sales Service Manager (Contract)',
    company: 'Canadian Bank Note Company',
    period: '2010 – 2011',
    location: '',
    points: [
      'Supported business development directors on request-for-proposal submissions, sales activities, and client coordination.',
      'Liaised across service providers, regional managers, manufacturing, legal, sales, design, finance, and operations to fulfill client commitments and contractual obligations.',
      'Coordinated logistics and programming for dignitary visits, client engagements, and senior-level guest events.'
    ]
  },
  {
    title: 'Production Assistant / Canadian Bar Review Coordinator',
    company: 'Canadian Bar Association',
    period: '2008 – 2010',
    location: '',
    points: [
      'Contributed to the production of print and online legal publications reaching more than 39,000 subscribers across the legal community.',
      'Organized symposiums and legal conferences, managing subscriber relations, online store operations, invoicing, inventory, database updates, and mailouts.',
      'Proofread content and footnotes for compliance with the McGill Guide to Legal Citation.'
    ]
  }
];

const coreStrengths = [
  {
    category: 'AI Automation & Business Systems',
    items: ['Agentic AI & AI Agents', 'Automation Strategy', 'Chatbot & Voice Assistant Configuration', 'Email & Media Monitoring Automation', 'Incident & Service Desk Management', 'Knowledge Base & SOP Development', 'Lead Generation Automation', 'Prompt Engineering (Chain-of-Thought, A/B Testing, Library Design, Optimization)', 'Retrieval-Augmented Generation (RAG)', 'Token Cost Management', 'Workflow Design']
  },
  {
    category: 'Technical, Data & Design Tools',
    items: ['Adobe Creative Cloud (After Effects, Illustrator, InDesign, Photoshop, Premiere Pro)', 'APIs', 'AutoCAD', 'BMC Tools', 'Cognos', 'CRM Platforms', 'Enterprise Control Desk', 'Google AI Studio', 'HP Service Manager', 'IBM SmartCloud', 'Microsoft 365 (Access, Excel, Forms, OneNote, Outlook, Power Automate, PowerPoint, SharePoint, Teams, Visio, Word)', 'Oracle Fusion AI Agent Studio', 'Power BI', 'SAP', 'SQL', 'Tableau', 'VAPI']
  },
  {
    category: 'Soft Skills',
    items: ['Data Analysis', 'Process Improvement', 'Quality Assurance', 'Stakeholder Communication', 'Value-Based Approach']
  }
];

const education = [
  { name: 'Oracle Fusion AI Agent Studio Foundations Associate', issuer: 'Oracle', year: '2025' },
  { name: 'Power BI Service and Power Query', issuer: 'Skillsoft', year: '2024' },
  { name: 'Leading Through the AI Disruption with Empathy', issuer: 'Skillsoft', year: '2024' },
  { name: 'Leading in the Age of Generative AI', issuer: 'Skillsoft', year: '2023' },
  { name: 'ITIL Specialist: Create, Deliver & Support', issuer: 'Global Knowledge', year: '2023' },
  { name: 'AWS Cloud Practitioner Technical Essentials', issuer: 'Skillsoft', year: '2023' },
  { name: 'Event Planning Certificate', issuer: 'New York Institute of Art and Design', year: '2023' },
  { name: 'Introduction to Networking', issuer: 'Skillsoft', year: '2023' },
  { name: 'Strategic Marketing Management and Public Relations / Image Management', issuer: 'Toronto Metropolitan University (TMU)', year: '2023' },
  { name: 'Graphic Design Elements for Non-Designers Specialization', issuer: 'University of Colorado Boulder', year: '2021' },
  { name: 'ITIL Foundation', issuer: 'Global Knowledge', year: '2021' },
  { name: 'Construction Management Specialization (Certificate Credits)', issuer: 'Columbia University', year: '' },
  { name: 'Bachelor of Arts, Communication and Sociology', issuer: 'University of Ottawa', year: '2004 – 2008' }
];

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
          <a
            href="/Ketsia-StLouisNoel-Resume.pdf"
            download="Ketsia-StLouisNoel-Resume.pdf"
            className="inline-flex items-center gap-2 bg-[#2A0800] hover:bg-[#775144] text-white px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300"
            data-testid="resume-download-btn"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Resume Header */}
          <div className="mb-12 pb-10 border-b border-[#BEA8A7]/30">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#C09891] mb-3">Curriculum Vitae</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A0800] tracking-tight mb-3 leading-[1.05]">
              Ketsia St-Louis Noel
            </h1>
            <p className="text-base sm:text-lg text-[#775144] mb-6 uppercase tracking-wider font-medium">
              AI Automation & Operations Strategist
            </p>
            <div className="grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-[#775144]">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Toronto / Ottawa, Canada</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:ketsiasln@gmail.com" className="hover:text-[#2A0800] transition-colors">ketsiasln@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>647-545-8958</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 flex-shrink-0" />
                <a href="https://linkedin.com/in/ketsias" target="_blank" rel="noopener noreferrer" className="hover:text-[#2A0800] transition-colors">linkedin.com/in/ketsias</a>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 flex-shrink-0" />
                <span>Federal Government Secret Level II Clearance</span>
              </div>
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 flex-shrink-0" />
                <span>Bilingual: English & French</span>
              </div>
            </div>
          </div>

          {/* Profile */}
          <section className="mb-12">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#C09891] mb-3">01 · Profile</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2A0800] tracking-tight mb-5">Profile</h2>
            <p className="text-base text-[#775144] leading-relaxed">
              Bilingual operations and IT service management professional with experience supporting Government of Canada portfolios, high-priority incident coordination, data management, process improvement, business development support, and enterprise service delivery. Founder of COMMARKAI, applying this background to AI automation, generative AI, voice-assisted AI, workflow design, sales and marketing systems, CRM and process improvement, reporting workflows, and digital transformation. Known for translating complex operational issues into clear actions, documentation, practical systems, and decision-ready visibility.
            </p>
          </section>

          {/* Core Strengths */}
          <section className="mb-12">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#C09891] mb-3">02 · Expertise</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2A0800] tracking-tight mb-6">Core Strengths</h2>
            <div className="space-y-6">
              {coreStrengths.map((group, idx) => (
                <div key={idx} className="border-l-4 border-[#2A0800] pl-5 py-1">
                  <h3 className="font-semibold text-[#2A0800] mb-3 tracking-tight">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, i) => (
                      <span key={i} className="text-xs text-[#775144] bg-white border border-[#BEA8A7]/40 px-3 py-1.5">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="mb-12">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#C09891] mb-3">03 · Experience</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2A0800] tracking-tight mb-6">Professional Experience</h2>
            <div className="space-y-8">
              {experience.map((job, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="rounded-none border border-[#BEA8A7]/40 bg-white shadow-sm">
                    <CardContent className="p-6 md:p-8">
                      <div className="mb-4 pb-4 border-b border-[#BEA8A7]/30">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-[#2A0800] tracking-tight leading-tight">{job.title}</h3>
                            <p className="text-sm font-semibold text-[#775144] mt-1">{job.company}</p>
                          </div>
                          <div className="text-xs text-[#C09891] font-mono uppercase tracking-wider flex-shrink-0">
                            <div>{job.period}</div>
                            {job.location && <div className="mt-1">{job.location}</div>}
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {job.points.map((point, i) => (
                          <li key={i} className="flex gap-3 text-sm text-[#775144] leading-relaxed">
                            <span className="text-[#C09891] flex-shrink-0 mt-1.5">▪</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education & Certifications */}
          <section className="mb-12">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#C09891] mb-3">04 · Education</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2A0800] tracking-tight mb-6">Education & Certifications</h2>
            <Card className="rounded-none border border-[#BEA8A7]/40 bg-white shadow-sm">
              <CardContent className="p-6 md:p-8">
                <ul className="space-y-3">
                  {education.map((item, idx) => (
                    <li key={idx} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 pb-3 border-b border-[#BEA8A7]/20 last:border-b-0 last:pb-0">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#2A0800]">{item.name}</p>
                        <p className="text-xs text-[#775144] mt-0.5">{item.issuer}</p>
                      </div>
                      {item.year && (
                        <span className="text-xs text-[#C09891] font-mono uppercase tracking-wider flex-shrink-0">
                          {item.year}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Additional Experience */}
          <section className="mb-12">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#C09891] mb-3">05 · Additional</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2A0800] tracking-tight mb-6">Additional Experience & Credentials</h2>
            <Card className="rounded-none border border-[#BEA8A7]/40 bg-white shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-3 text-sm text-[#775144] leading-relaxed">
                  <p>
                    <span className="font-semibold text-[#2A0800]">Ontario College of Trades Membership:</span> Information Technology Contact Centre Customer Service Agent.
                  </p>
                  <p>
                    Additional experience includes guest services, junior communications, data entry supervision, bilingual customer support, office supervision, and retail sales.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-[#BEA8A7]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href="/Ketsia-StLouisNoel-Resume.pdf"
              download="Ketsia-StLouisNoel-Resume.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2A0800] hover:bg-[#775144] text-white px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300"
              data-testid="resume-download-bottom-btn"
            >
              <Download className="h-4 w-4" />
              Download Resume (PDF)
            </a>
            <Button
              variant="outline"
              onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className="w-full sm:w-auto rounded-none border-2 border-[#2A0800] text-[#2A0800] hover:bg-[#2A0800] hover:text-white bg-transparent px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300"
              data-testid="resume-contact-btn"
            >
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
