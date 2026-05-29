import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, BarChart3, Mail, FileText, Users, Layers, 
  Workflow, CheckCircle2, Database, Bell, Calendar, 
  LineChart, FolderOpen, MessageSquare, Target, ClipboardList,
  Send, Github, Linkedin, MapPin, Code2, Briefcase, Languages,
  ChevronDown, Settings, ServerCog, GitBranch, Headphones, Menu, X,
  Cpu, Zap, BookOpen, PhoneCall, Mic
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { handleContactSubmit } from '../utils/mock';
import N8NWorkflow from '../components/N8NWorkflow';
import DetailedAutomations from '../components/DetailedAutomations';

const automations = [
  {
    id: 'incident-ops',
    title: 'Incident Management Workflow',
    tagline: 'Turn urgent service interruptions into clear, coordinated, trackable action.',
    icon: Layers,
    audience: 'IT teams, service desks, operations teams, government/enterprise environments',
    problem:
      'When incidents happen, updates can become scattered across emails, calls, tickets, spreadsheets, and chat threads. Leaders need reliable visibility while teams need a clear escalation path.',
    flow: [
      { label: 'Incident Logged', icon: Layers, detail: 'Issue, impact, affected users, urgency' },
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
    id: 'service-management',
    title: 'Service Management Workflow',
    tagline: 'Streamline service requests, change management, and ongoing service delivery.',
    icon: ServerCog,
    audience: 'IT service teams, managed service providers, internal IT departments, enterprise operations',
    problem:
      'Service requests pile up in disconnected systems. Change approvals get stuck in email chains. SLAs slip without visibility. Teams need a unified workflow for service intake, fulfillment, and continuous improvement.',
    flow: [
      { label: 'Request Intake', icon: ClipboardList, detail: 'Service catalog, self-service portal, email, chat' },
      { label: 'Categorize & Assign', icon: GitBranch, detail: 'Service type, priority, team routing, SLA mapping' },
      { label: 'Approval Workflow', icon: CheckCircle2, detail: 'Change advisory board, stakeholder sign-off, risk assessment' },
      { label: 'Fulfill & Update', icon: Settings, detail: 'Task execution, status updates, user communication, documentation' },
      { label: 'Review & Optimize', icon: LineChart, detail: 'SLA performance, satisfaction surveys, process improvements' },
    ],
    kpis: ['SLA compliance', 'First-call resolution', 'Request volume', 'Change success rate', 'Customer satisfaction (CSAT)'],
    outputs: ['Service catalog updates', 'Change calendar', 'SLA dashboard', 'CSAT reports', 'Knowledge base articles'],
    tools: ['ServiceNow', 'Jira Service Management', 'Freshservice', 'SharePoint', 'Power BI', 'Microsoft Teams'],
    positioning:
      'Demonstrates mastery of structured service delivery — balancing speed, governance, and continuous improvement.',
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
      { label: 'Enrich & Summarize', icon: Cpu, detail: 'AI extracts need, urgency, budget, service fit' },
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
      { label: 'Extract Details', icon: Cpu, detail: 'Sender, document type, due date, client name' },
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
      { label: 'Next Step Detected', icon: Cpu, detail: 'AI identifies follow-up need and timeline' },
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
    icon: BookOpen,
    audience: 'Founders, creators, agencies, e-commerce brands, coaches, community builders',
    problem:
      'Marketing content takes too long when every platform is handled manually. Ideas get lost, publishing is inconsistent, and performance data is rarely connected back to strategy.',
    flow: [
      { label: 'Idea Captured', icon: FileText, detail: 'Topic, audience, offer, keyword, hook' },
      { label: 'AI Drafts Assets', icon: Cpu, detail: 'Blog, LinkedIn, Pinterest, email, captions' },
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
    icon: Cpu,
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
      className={`w-full text-left rounded-none border p-5 transition-all duration-300 ${
        active 
          ? 'border-[#2A0800] bg-[#F4DBD8]/30 shadow-md' 
          : 'border-[#BEA8A7]/40 bg-white hover:border-[#775144]/60 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`rounded-none p-3 ${
          active ? 'bg-[#2A0800] text-white' : 'bg-[#F4DBD8]/40 text-[#775144]'
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base text-[#2A0800] leading-tight tracking-tight">{automation.title}</h3>
          <p className="text-sm text-[#775144] mt-1.5 leading-relaxed">{automation.tagline}</p>
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
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
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
          <ArrowRight className="h-3.5 w-3.5 text-blue-600" />
        </div>
      )}
    </motion.div>
  );
}

function PillList({ title, items }) {
  return (
    <div>
      <h4 className="font-semibold text-sm text-[#2A0800] mb-3 tracking-tight">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span key={idx} className="rounded-none border border-[#BEA8A7]/40 bg-[#F4DBD8]/30 px-3 py-1.5 text-xs text-[#775144]">
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
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
    <div className="min-h-screen bg-gradient-to-br from-[#F4DBD8]/20 via-white to-[#F4DBD8]/10">
      {/* Decorative Elements - subtle */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F4DBD8]/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#BEA8A7]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#C09891]/15 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[#BEA8A7]/30 bg-white/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="rounded-xl bg-gradient-to-br from-[#775144] to-[#2A0800] p-2.5">
              <Workflow className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-base sm:text-lg text-[#2A0800] tracking-tight">COMMARKAI</span>
          </motion.div>
          <motion.nav 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-6 lg:gap-8"
          >
            <a href="#about" className="text-sm font-medium text-[#775144] hover:text-[#2A0800] transition-colors">About</a>
            <a href="#skills" className="text-sm font-medium text-[#775144] hover:text-[#2A0800] transition-colors">Skills</a>
            <a href="#portfolio" className="text-sm font-medium text-[#775144] hover:text-[#2A0800] transition-colors">Portfolio</a>
            <a href="#automations" className="text-sm font-medium text-[#775144] hover:text-[#2A0800] transition-colors">Automations</a>
            <a href="#contact form" className="text-sm font-medium text-[#775144] hover:text-[#2A0800] transition-colors">Contact Form</a>
            <button 
              onClick={() => navigate('/resume')}
              className="text-sm font-semibold text-[#2A0800] hover:text-[#775144] transition-colors border-b-2 border-[#2A0800] hover:border-[#775144] pb-0.5"
              data-testid="nav-resume-btn"
            >
              Resume
            </button>
          </motion.nav>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-[#F4DBD8]/40 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-[#2A0800]" /> : <Menu className="h-5 w-5 text-[#2A0800]" />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-[#BEA8A7]/30 bg-white/95 backdrop-blur-xl"
          >
            <div className="px-4 py-3 space-y-1">
              {[
                { href: '#about', label: 'About' },
                { href: '#skills', label: 'Skills' },
                { href: '#portfolio', label: 'Portfolio' },
                { href: '#automations', label: 'Automations' },
                { href: '#contact form', label: 'Contact Form' }
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-[#775144] hover:bg-[#F4DBD8]/40 hover:text-[#2A0800] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/resume'); }}
                className="w-full text-left block px-3 py-2 rounded-lg text-sm font-semibold text-[#2A0800] bg-[#F4DBD8]/40 hover:bg-[#F4DBD8]/60 transition-colors"
              >
                View Resume →
              </button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-10 sm:pb-14 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Subtle eyebrow text - no border, no icon */}
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-[#C09891] mb-5 sm:mb-6">
              Automation Strategist · Operations Specialist
            </p>
            
            {/* Name - more balanced size */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2A0800] tracking-tight leading-[1.05] mb-6">
              Ketsia <span className="block sm:inline">St-Louis Noel</span>
            </h1>
            
                        {/* Tagline */}
            <p className="text-base sm:text-lg md:text-xl text-[#775144] leading-relaxed max-w-2xl mx-auto mb-10">
              Transforming scattered signals into measurable workflows through AI-assisted automation and strategic operations design.
            </p>

                        {/* CTAs - primary and secondary */}
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Button 
                  onClick={() => navigate('/resume')}
                  data-testid="hero-resume-btn"
                  className="w-full sm:w-auto rounded-none bg-[#2A0800] hover:bg-[#775144] text-white px-8 py-6 text-sm font-semibold tracking-wide uppercase transition-all duration-300"
                >
                  View Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button 
                  variant="outline"
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="hero-portfolio-btn"
                  className="w-full sm:w-auto rounded-none border-2 border-[#2A0800] text-[#2A0800] hover:bg-[#2A0800] hover:text-white bg-transparent px-8 py-6 text-sm font-semibold tracking-wide uppercase transition-all duration-300"
                >
                  View Portfolio
                </Button>
              </div>

              <button
                onClick={() => navigate('/voice-assistant')}
                data-testid="hero-voice-assistant-btn"
                className="inline-flex items-center gap-2 border-b border-[#3D9B6D]/40 pb-1 text-sm font-semibold uppercase tracking-wide text-[#3D9B6D] transition hover:border-[#2f7f59] hover:text-[#2f7f59]"
              >
                <Mic className="h-4 w-4" />
                Test AI Voice Assistant
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#C09891] mb-3">01 · About</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2A0800] tracking-tight">A systems thinker for modern operations.</h2>
            </div>
            <Card className="rounded-none border border-[#BEA8A7]/40 bg-white shadow-sm">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <div className="space-y-4 text-[#775144] leading-relaxed">
                  <p className="text-base md:text-lg">
                    I specialize in bridging the gap between scattered operational signals and clear, measurable business workflows. With expertise spanning <span className="font-semibold text-[#2A0800]">incident management</span>, <span className="font-semibold text-[#2A0800]">AI automation strategy</span>, and <span className="font-semibold text-[#2A0800]">enterprise service delivery</span>, I help teams move from reactive chaos to proactive coordination.
                  </p>
                  <p>
                    My approach combines technical precision with human-centered communication — whether it's designing CRM workflows that actually get used, building incident escalation paths that protect SLAs, or creating AI-assisted systems that save hours without losing the personal touch.
                  </p>
                  <p>
                    From coordinating enterprise-level incidents to mapping lead qualification flows for growing businesses, I bring both systems thinking and practical implementation to every project.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-[#BEA8A7]/30">
                  <div className="flex items-center gap-2 text-[#775144]">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Remote</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#775144]">
                    <Languages className="h-4 w-4" />
                    <span className="text-sm">English · French</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F4DBD8]/15">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#C09891] mb-3">02 · Expertise</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2A0800] tracking-tight mb-3">Core Skills</h2>
            <p className="text-base md:text-lg text-[#775144] max-w-2xl">
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
                  <Card className="rounded-none border border-[#BEA8A7]/40 bg-white shadow-sm hover:shadow-md hover:border-[#775144]/40 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-none bg-[#2A0800] p-2.5">
                          <SkillIcon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#2A0800] tracking-tight">{skill.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item, itemIdx) => (
                          <span key={itemIdx} className="text-sm text-[#775144] bg-[#F4DBD8]/40 border border-[#BEA8A7]/30 rounded-none px-3 py-1.5">
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
      <section id="portfolio" className="relative z-10 py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#C09891] mb-3">03 · Portfolio</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2A0800] tracking-tight leading-tight mb-3">From Chaos to Clarity</h2>
            <p className="text-base md:text-lg text-[#775144] max-w-2xl">
              Strategic automation concepts designed to capture data, route work, trigger actions, and generate insights.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-8 items-start">
            {/* Automation List */}
            <div className="space-y-3 lg:sticky lg:top-8">
              {automations.map((automation) => (
                <AutomationCard
                  key={automation.id}
                  automation={automation}
                  active={automation.id === selectedId}
                  onClick={() => {
                    setSelectedId(automation.id);
                    // Scroll to detail on mobile
                    if (window.innerWidth < 1024) {
                      setTimeout(() => {
                        document.getElementById('automation-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }
                  }}
                />
              ))}
            </div>

            {/* Selected Automation Detail */}
            <motion.div
              id="automation-detail"
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Main Card */}
              <Card className="rounded-none border border-[#BEA8A7]/40 bg-white shadow-sm">
                <CardContent className="p-5 sm:p-6 md:p-8">
                  <div className="flex items-start gap-3 sm:gap-4 mb-6">
                    <div className="rounded-none bg-[#2A0800] p-3 sm:p-4 text-white flex-shrink-0">
                      <SelectedIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block rounded-none border border-[#BEA8A7]/40 bg-[#F4DBD8]/30 px-3 py-1 text-xs font-medium text-[#775144] mb-3 tracking-wide uppercase">
                        Automation Concept
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2A0800] tracking-tight leading-tight">{selected.title}</h3>
                      <p className="text-sm sm:text-base text-[#775144] mt-2 leading-relaxed">{selected.tagline}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mt-6">
                    <div className="rounded-none border border-[#BEA8A7]/40 bg-[#F4DBD8]/20 p-4 sm:p-5">
                      <h4 className="font-semibold text-sm text-[#2A0800] mb-2 tracking-tight">Problem</h4>
                      <p className="text-sm text-[#775144] leading-relaxed">{selected.problem}</p>
                    </div>
                    <div className="rounded-none border border-[#BEA8A7]/40 bg-[#F4DBD8]/20 p-4 sm:p-5">
                      <h4 className="font-semibold text-sm text-[#2A0800] mb-2 tracking-tight">Ideal Audience</h4>
                      <p className="text-sm text-[#775144] leading-relaxed">{selected.audience}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visual N8N-style Workflow */}
              <N8NWorkflow flow={selected.flow} title={`${selected.title} - Workflow`} />

              {/* KPIs and Outputs */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <Card className="rounded-none border border-[#BEA8A7]/40 bg-white shadow-sm">
                  <CardContent className="p-5 sm:p-6">
                    <PillList title="KPIs Tracked" items={selected.kpis} />
                  </CardContent>
                </Card>
                <Card className="rounded-none border border-[#BEA8A7]/40 bg-white shadow-sm">
                  <CardContent className="p-5 sm:p-6">
                    <PillList title="Outputs Generated" items={selected.outputs} />
                  </CardContent>
                </Card>
              </div>

              {/* Tools & Positioning */}
              <Card className="rounded-none border border-[#BEA8A7]/40 bg-white shadow-sm">
                <CardContent className="p-5 sm:p-6 space-y-6">
                  <PillList title="Possible Tools & Integrations" items={selected.tools} />
                  <div className="rounded-none border-l-4 border-[#2A0800] bg-[#F4DBD8]/20 p-4 sm:p-5">
                    <h4 className="font-semibold text-sm text-[#2A0800] mb-2 tracking-tight">Why This Matters</h4>
                    <p className="text-sm text-[#775144] leading-relaxed">{selected.positioning}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Automations Section */}
      <DetailedAutomations />

      {/* AI Voice Assistant Section */}
      <section id="voice-assistant" className="relative z-10 py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-12"
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#C09891] mb-3">Live Demo · Try It</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2A0800] tracking-tight mb-3 leading-tight">
              AI Voice Assistant
            </h2>
            <p className="text-base md:text-lg text-[#775144] max-w-2xl">
              Capture phone inquiries, structure call details, and trigger follow-up actions. Test it live in your browser or call the assistant directly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-none border border-[#BEA8A7]/40 bg-white shadow-sm">
              <CardContent className="p-6 sm:p-8 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="rounded-none bg-[#2A0800] p-3 sm:p-4 text-white flex-shrink-0">
                    <Mic className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block rounded-none border border-[#BEA8A7]/40 bg-[#F4DBD8]/30 px-3 py-1 text-xs font-medium text-[#775144] mb-3 tracking-wide uppercase">
                      Automation Concept
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2A0800] tracking-tight leading-tight">
                      AI Voice Assistant Workflow
                    </h3>
                    <p className="text-sm sm:text-base text-[#775144] mt-2 leading-relaxed">
                      An AI voice assistant answers calls, captures structured information, and routes the request into the next operational step.
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-8 pt-6 border-t border-[#BEA8A7]/30 flex flex-col sm:flex-row flex-wrap gap-3">
                  <a
                    href="/voice-assistant"
                    className="inline-flex items-center justify-center gap-2 bg-[#2A0800] hover:bg-[#775144] text-white px-6 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300"
                    data-testid="voice-test-btn"
                  >
                    <Mic className="h-4 w-4" />
                    Test on Website
                  </a>
                  <a
                    href="tel:+18574969001"
                    aria-label="Call 857-496-9001"
                    className="inline-flex items-center justify-center gap-2 border-2 border-[#2A0800] text-[#2A0800] hover:bg-[#2A0800] hover:text-white bg-transparent px-6 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300"
                    data-testid="voice-call-btn"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Call 857-496-9001
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact form" className="relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F4DBD8]/15">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-10 md:mb-12">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#C09891] mb-3">04 · Contact</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2A0800] tracking-tight leading-tight mb-3">Let's work together.</h2>
              <p className="text-base md:text-lg text-[#775144] max-w-2xl">
                Have a project in mind? Looking to streamline your operations? I'd love to hear from you.
              </p>
            </div>

            <Card className="rounded-none border border-[#BEA8A7]/40 bg-white shadow-sm">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-[#2A0800] mb-2 tracking-wide uppercase">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      data-testid="contact-name-input"
                      className="rounded-none border-[#BEA8A7]/50 border-2 focus:border-[#2A0800] focus:ring-0 bg-white text-[#2A0800] placeholder:text-[#C09891]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-[#2A0800] mb-2 tracking-wide uppercase">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      data-testid="contact-email-input"
                      className="rounded-none border-[#BEA8A7]/50 border-2 focus:border-[#2A0800] focus:ring-0 bg-white text-[#2A0800] placeholder:text-[#C09891]"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-[#2A0800] mb-2 tracking-wide uppercase">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project or question..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      data-testid="contact-message-input"
                      className="rounded-none border-[#BEA8A7]/50 border-2 focus:border-[#2A0800] focus:ring-0 bg-white text-[#2A0800] placeholder:text-[#C09891] resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="contact-submit-btn"
                    className="w-full rounded-none bg-[#2A0800] hover:bg-[#775144] text-white py-6 text-sm font-semibold tracking-wide uppercase transition-all duration-300"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#BEA8A7]/30 bg-white py-10 md:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-gradient-to-br from-[#775144] to-[#2A0800] p-2.5">
                <Workflow className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-[#2A0800] tracking-tight">COMMARKAI</span>
            </div>
            <p className="text-xs sm:text-sm text-[#775144] text-center">
              © 2025 Ketsia St-Louis Noel · Crafted with precision and purpose.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/ketsias/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#775144] hover:text-[#2A0800] transition-colors"
                data-testid="footer-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
