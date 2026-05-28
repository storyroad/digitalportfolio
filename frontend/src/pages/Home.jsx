import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, BarChart3, Mail, FileText, Users, AlertTriangle, 
  Sparkles, Workflow, CheckCircle2, Database, Bell, Calendar, 
  LineChart, FolderOpen, MessageSquare, Target, ClipboardList,
  Send, Github, Linkedin, MapPin, Code2, Briefcase, Languages,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { handleContactSubmit } from '../utils/mock';

const automations = [
  {
    id: 'incident-ops',
    title: 'Incident Management Workflow',
    tagline: 'Turn urgent service interruptions into clear, coordinated, trackable action.',
    icon: AlertTriangle,
    audience: 'IT teams, service desks, operations teams, government/enterprise environments',
    problem:
      'When incidents happen, updates can become scattered across emails, calls, tickets, spreadsheets, and chat threads. Leaders need reliable visibility while teams need a clear escalation path.',
    flow: [
      { label: 'Incident Logged', icon: AlertTriangle, detail: 'Issue, impact, affected users, urgency' },
      { label: 'Classify & Prioritize', icon: Target, detail: 'Severity, portfolio, client group, SLA risk' },
      { label: 'Notify Stakeholders', icon: Bell, detail: 'Email updates, bridge call notes, status summaries' },
      { label: 'Track Actions', icon: ClipboardList, detail: 'Owners, next steps, timeline, dependencies' },
      { label: 'Report & Improve', icon: BarChart3, detail: 'Resolution time, communication gaps, recurring issues' },
    ],
    kpis: ['Mean time to acknowledge', 'Mean time to resolve', 'Escalation volume', 'SLA risk', 'Communication intervals'],
    outputs: ['Executive incident summary', 'Stakeholder update log', 'Post-incident review', 'Trend dashboard'],
    tools: ['ServiceNow / BMC / Jira', 'Outlook', 'SharePoint', 'Power BI', 'Teams / Slack', 'AI summarizer'],
    positioning:
      'Enterprise-grade thinking: pressure, clarity, communication, accountability, and measurable service delivery.',
  },
  {
    id: 'lead-qualification',
    title: 'Lead Qualification Automation',
    tagline: 'Capture, score, route, and follow up with leads before momentum is lost.',
    icon: Users,
    audience: 'Agencies, service businesses, consultants, local businesses, B2B sales teams',
    problem:
      'Leads often arrive through forms, DMs, email, referrals, and calls. Without a system, high-intent prospects get delayed, misclassified, or forgotten.',
    flow: [
      { label: 'Lead Captured', icon: MessageSquare, detail: 'Website form, email, DM, ad, referral' },
      { label: 'Enrich & Summarize', icon: Sparkles, detail: 'AI extracts need, urgency, budget, service fit' },
      { label: 'Score Lead', icon: Target, detail: 'Intent, revenue potential, timeline, fit' },
      { label: 'Route to Pipeline', icon: Workflow, detail: 'CRM stage, owner, next action' },
      { label: 'Follow Up', icon: Mail, detail: 'Personalized email, booking link, reminder' },
    ],
    kpis: ['Lead volume', 'Qualified leads', 'Response time', 'Booking rate', 'Lead source quality'],
    outputs: ['Lead score', 'AI lead brief', 'CRM update', 'Follow-up email', 'Sales dashboard'],
    tools: ['Typeform / Webflow / Tally', 'HubSpot / GoHighLevel', 'Zapier / Make / n8n', 'OpenAI', 'Google Sheets'],
    positioning:
      'Connects operations directly to sales speed and conversion opportunities.',
  },
  {
    id: 'email-file-management',
    title: 'Email & File Management',
    tagline: 'Organize incoming requests, documents, and attachments without manual sorting.',
    icon: FolderOpen,
    audience: 'Small teams, admin-heavy businesses, agencies, legal, finance, construction, consulting',
    problem:
      'Important documents often arrive buried in inboxes. Teams waste time renaming files, sorting attachments, forwarding messages, and tracking approvals manually.',
    flow: [
      { label: 'Email Received', icon: Mail, detail: 'Client request, invoice, contract, attachment' },
      { label: 'Extract Details', icon: Sparkles, detail: 'Sender, document type, due date, client name' },
      { label: 'Route File', icon: FolderOpen, detail: 'Save to the correct folder with naming rules' },
      { label: 'Create Task', icon: CheckCircle2, detail: 'Approval, review, reply, payment, upload' },
      { label: 'Generate Summary', icon: FileText, detail: 'Daily digest, missing items, overdue items' },
    ],
    kpis: ['Emails processed', 'Files routed', 'Overdue tasks', 'Manual hours saved', 'Missing documents'],
    outputs: ['Renamed files', 'Folder updates', 'Task list', 'Daily digest', 'Audit trail'],
    tools: ['Gmail / Outlook', 'Google Drive / Dropbox', 'Airtable', 'Notion', 'Zapier / Make / n8n', 'AI parser'],
    positioning:
      'Simple, practical solutions for everyday administrative friction.',
  },
  {
    id: 'crm-follow-up',
    title: 'CRM Follow-Up Workflow',
    tagline: 'Keep sales conversations moving with automated reminders and client context.',
    icon: Calendar,
    audience: 'Sales teams, consultants, agencies, coaches, real estate, beauty businesses, local services',
    problem:
      'Sales conversations often fail because the next step is not clear, the CRM is not updated, or follow-up depends on memory instead of process.',
    flow: [
      { label: 'Conversation Logged', icon: MessageSquare, detail: 'Call, meeting, DM, consultation, form response' },
      { label: 'Next Step Detected', icon: Sparkles, detail: 'AI identifies follow-up need and timeline' },
      { label: 'CRM Updated', icon: Database, detail: 'Stage, notes, contact status, value' },
      { label: 'Reminder Triggered', icon: Bell, detail: 'Follow-up date, task owner, priority' },
      { label: 'Pipeline Reported', icon: LineChart, detail: 'Open deals, stalled leads, next actions' },
    ],
    kpis: ['Follow-up completion', 'Pipeline velocity', 'Stalled opportunities', 'Close rate', 'Average deal cycle'],
    outputs: ['CRM notes', 'Follow-up task', 'Personalized message', 'Pipeline report', 'Revenue forecast'],
    tools: ['HubSpot', 'GoHighLevel', 'Airtable', 'Google Calendar', 'Gmail / Outlook', 'OpenAI', 'n8n'],
    positioning:
      'Understanding both systems and sales behavior — not just software connections.',
  },
  {
    id: 'content-marketing',
    title: 'Content & Marketing Automation',
    tagline: 'Transform one idea into reusable content assets, distribution tasks, and performance insights.',
    icon: Sparkles,
    audience: 'Founders, creators, agencies, e-commerce brands, coaches, community builders',
    problem:
      'Marketing content takes too long when every platform is handled manually. Ideas get lost, publishing is inconsistent, and performance data is rarely connected back to strategy.',
    flow: [
      { label: 'Idea Captured', icon: FileText, detail: 'Topic, audience, offer, keyword, hook' },
      { label: 'AI Drafts Assets', icon: Sparkles, detail: 'Blog, LinkedIn, Pinterest, email, captions' },
      { label: 'Review Queue', icon: CheckCircle2, detail: 'Human approval, edits, brand voice' },
      { label: 'Schedule & Publish', icon: Calendar, detail: 'Platform-specific timing and formats' },
      { label: 'Measure Performance', icon: BarChart3, detail: 'Clicks, saves, leads, conversions, content themes' },
    ],
    kpis: ['Content volume', 'Publishing consistency', 'Click-through rate', 'Email signups', 'Top-performing topics'],
    outputs: ['Repurposed content pack', 'Publishing calendar', 'SEO brief', 'Performance dashboard', 'Lead magnet ideas'],
    tools: ['Notion', 'Canva', 'Pinterest', 'LinkedIn', 'Mailchimp / ConvertKit', 'Google Analytics', 'Zapier / n8n'],
    positioning:
      'Creative operations connected to measurable business outcomes.',
  },
];

const skills = [
  {
    icon: Briefcase,
    title: 'Operations & Service Delivery',
    items: ['Incident coordination', 'Escalation management', 'Service reporting', 'Stakeholder communications', 'Process documentation', 'Cross-functional support']
  },
  {
    icon: Sparkles,
    title: 'AI Automation & Business Systems',
    items: ['Workflow design', 'Automation strategy', 'CRM workflows', 'Lead qualification flows', 'Reporting workflows', 'SOP design']
  },
  {
    icon: Code2,
    title: 'Technical & Data Tools',
    items: ['Excel & Power BI', 'Tableau & SQL', 'SharePoint', 'BMC tools', 'HP Service Manager', 'Cognos & SAP']
  },
  {
    icon: Languages,
    title: 'Communication & Client Support',
    items: ['Bilingual English/French', 'Client relationship management', 'Executive-facing updates', 'Documentation & training', 'Stakeholder alignment']
  }
];

function AutomationCard({ automation, active, onClick }) {
  const Icon = automation.icon;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left rounded-2xl border p-5 transition-all duration-300 ${
        active 
          ? 'border-amber-200 bg-amber-50/50 shadow-lg shadow-amber-100' 
          : 'border-slate-200 bg-white hover:border-amber-100 hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`rounded-xl p-3 ${
          active ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white' : 'bg-slate-50 text-slate-700'
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base text-slate-900 leading-tight">{automation.title}</h3>
          <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{automation.tagline}</p>
        </div>
      </div>
    </motion.button>
  );
}

function FlowStep({ step, index }) {
  const StepIcon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative h-full"
    >
      <Card className="rounded-2xl h-full border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
              <StepIcon className="h-4 w-4" />
            </div>
            <span className="text-xs text-slate-500 font-medium">Step {index + 1}</span>
          </div>
          <h4 className="font-semibold text-sm text-slate-900 mb-2">{step.label}</h4>
          <p className="text-xs text-slate-600 leading-relaxed">{step.detail}</p>
        </CardContent>
      </Card>
      {index < 4 && (
        <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 rounded-full bg-white border border-slate-200 p-1.5 shadow-sm">
          <ArrowRight className="h-3.5 w-3.5 text-amber-500" />
        </div>
      )}
    </motion.div>
  );
}

function PillList({ title, items }) {
  return (
    <div>
      <h4 className="font-semibold text-sm text-slate-900 mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span key={idx} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedId, setSelectedId] = useState(automations[0].id);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const selected = automations.find((item) => item.id === selectedId);
  const SelectedIcon = selected.icon;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await handleContactSubmit(formData);
    
    if (result.success) {
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } else {
      toast.error('Failed to send message. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-teal-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-200/15 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-2.5">
              <Workflow className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900">COMMARKAI</span>
          </motion.div>
          <motion.nav 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">About</a>
            <a href="#skills" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Skills</a>
            <a href="#portfolio" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Portfolio</a>
            <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Contact</a>
          </motion.nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/50 px-4 py-2 text-sm font-medium text-amber-900 mb-8">
              <Sparkles className="h-4 w-4" />
              Automation Strategist & Operations Specialist
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
              Ketsia St-Louis Noel
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10">
              Transforming scattered signals into measurable workflows through AI-assisted automation and strategic operations design.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-8 py-6 text-base font-semibold shadow-lg shadow-amber-200 transition-all duration-300"
              >
                Let's Connect
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full border-2 border-slate-300 px-8 py-6 text-base font-semibold hover:border-slate-400 transition-all duration-300"
              >
                View Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="rounded-3xl border-slate-200 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">About</h2>
                </div>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p className="text-lg">
                    I specialize in bridging the gap between scattered operational signals and clear, measurable business workflows. With expertise spanning <span className="font-semibold text-slate-900">incident management</span>, <span className="font-semibold text-slate-900">AI automation strategy</span>, and <span className="font-semibold text-slate-900">enterprise service delivery</span>, I help teams move from reactive chaos to proactive coordination.
                  </p>
                  <p>
                    My approach combines technical precision with human-centered communication — whether it's designing CRM workflows that actually get used, building incident escalation paths that protect SLAs, or creating AI-assisted systems that save hours without losing the personal touch.
                  </p>
                  <p>
                    From coordinating enterprise-level incidents to mapping lead qualification flows for growing businesses, I bring both systems thinking and practical implementation to every project.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Remote</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Languages className="h-4 w-4" />
                    <span className="text-sm">English / French</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-24 px-6 lg:px-8 bg-slate-900/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Core Skills</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A diverse toolkit spanning operations, automation, technical systems, and communication.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, idx) => {
              const SkillIcon = skill.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="rounded-2xl border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-2.5">
                          <SkillIcon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">{skill.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item, itemIdx) => (
                          <span key={itemIdx} className="text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
                            {item}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="relative z-10 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/50 px-4 py-2 text-sm font-medium text-amber-900 mb-6">
              <Workflow className="h-4 w-4" />
              Automation Portfolio
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">From Chaos to Clarity</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Strategic automation concepts designed to capture data, route work, trigger actions, and generate insights.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
            {/* Automation List */}
            <div className="space-y-4 lg:sticky lg:top-8">
              {automations.map((automation) => (
                <AutomationCard
                  key={automation.id}
                  automation={automation}
                  active={automation.id === selectedId}
                  onClick={() => setSelectedId(automation.id)}
                />
              ))}
            </div>

            {/* Selected Automation Detail */}
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Main Card */}
              <Card className="rounded-3xl border-slate-200 bg-white shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-4 text-white">
                      <SelectedIcon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 mb-3">
                        Automation Concept
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">{selected.title}</h3>
                      <p className="text-base text-slate-600 mt-2 leading-relaxed">{selected.tagline}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mt-8">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                      <h4 className="font-semibold text-sm text-slate-900 mb-2">Problem</h4>
                      <p className="text-sm text-slate-700 leading-relaxed">{selected.problem}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                      <h4 className="font-semibold text-sm text-slate-900 mb-2">Ideal Audience</h4>
                      <p className="text-sm text-slate-700 leading-relaxed">{selected.audience}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Workflow Steps */}
              <Card className="rounded-3xl border-slate-200 bg-white shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Workflow Logic</h3>
                    <p className="text-sm text-slate-600">Step-by-step automation flow from trigger to outcome</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {selected.flow.map((step, index) => (
                      <FlowStep key={step.label} step={step} index={index} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* KPIs and Outputs */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <PillList title="KPIs Tracked" items={selected.kpis} />
                  </CardContent>
                </Card>
                <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <PillList title="Outputs Generated" items={selected.outputs} />
                  </CardContent>
                </Card>
              </div>

              {/* Tools & Positioning */}
              <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6 space-y-6">
                  <PillList title="Possible Tools & Integrations" items={selected.tools} />
                  <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
                    <h4 className="font-semibold text-sm text-slate-900 mb-2">Why This Matters</h4>
                    <p className="text-sm text-slate-700 leading-relaxed">{selected.positioning}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 px-6 lg:px-8 bg-slate-900/[0.02]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Let's Work Together</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Have a project in mind? Looking to streamline your operations? I'd love to hear from you.
              </p>
            </div>

            <Card className="rounded-3xl border-slate-200 bg-white shadow-xl">
              <CardContent className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="rounded-xl border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="rounded-xl border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project or question..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="rounded-xl border-slate-300 focus:border-amber-500 focus:ring-amber-500 resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 py-6 text-base font-semibold shadow-lg shadow-amber-200 transition-all duration-300"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white/80 backdrop-blur-sm py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-2.5">
                <Workflow className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900">COMMARKAI</span>
            </div>
            <p className="text-sm text-slate-600">
              © 2025 Ketsia St-Louis Noel. Crafted with precision and purpose.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-600 hover:text-amber-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-amber-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-amber-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
