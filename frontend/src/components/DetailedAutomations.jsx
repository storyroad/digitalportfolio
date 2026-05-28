import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, ChevronRight, ArrowRight, Cpu, Users, Mail,
  FileText, Folder, CheckCircle, Bell, Calendar, Database,
  MessageSquare, Target, GitBranch, Send, Tag, Layers, 
  ClipboardList, Filter, UserPlus, BookOpen
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const detailedAutomations = [
  {
    id: 'lead-qualification-detailed',
    title: 'Lead Qualification Flow',
    subtitle: 'Multi-channel lead capture, scoring, and intelligent routing',
    icon: Filter,
    trigger: 'Lead from form, ad, email, or chat',
    steps: [
      { label: 'Trigger', icon: Zap, details: ['Form submission', 'Ad campaign', 'Email reply', 'Chat conversation'] },
      { label: 'Normalize Data', icon: Database, details: ['Standardize fields', 'Clean formatting', 'Deduplicate', 'Map to schema'] },
      { label: 'Enrich', icon: Cpu, details: ['Company lookup (optional)', 'Geo lookup (optional)', 'AI summary (optional)', 'Social profile enrichment'] },
      { label: 'Score Lead', icon: Target, details: ['Apply scoring rules', 'Intent signals', 'Budget indicators', 'Fit assessment'] },
      { label: 'Route', icon: GitBranch, details: ['Hot → Notify sales immediately', 'Warm → CRM + nurture sequence', 'Cold → Low-priority queue'] },
      { label: 'Respond', icon: Send, details: ['Personalized email', 'Booking link', 'Auto-reply', 'Follow-up reminder'] },
      { label: 'Write to Systems', icon: Layers, details: ['CRM record', 'Pipeline stage', 'Slack/Teams notification', 'Spreadsheet log'] }
    ],
    outputs: ['Qualified lead score', 'CRM record created', 'Routing decision', 'Stakeholder notification', 'Personalized response sent', 'Pipeline updated']
  },
  {
    id: 'client-onboarding',
    title: 'Client Onboarding & Intake',
    subtitle: 'From closed deal to active project — fully automated',
    icon: UserPlus,
    trigger: 'Client marked as "closed-won" in CRM',
    steps: [
      { label: 'Trigger', icon: Zap, details: ['Deal stage = closed-won', 'Manual activation', 'Calendar event'] },
      { label: 'Welcome Sequence', icon: Mail, details: ['Branded welcome email', 'Set expectations', 'Introduce team', 'Share resources'] },
      { label: 'Intake Form', icon: FileText, details: ['Generate custom form', 'Send via email', 'Track completion', 'Send reminders'] },
      { label: 'Documents', icon: ClipboardList, details: ['Contract dispatch', 'Onboarding docs', 'NDAs if needed', 'Signature tracking'] },
      { label: 'Workspace Setup', icon: Folder, details: ['Create shared folder', 'Setup project board', 'Apply task template', 'Configure permissions'] },
      { label: 'Team Activation', icon: Users, details: ['Notify team members', 'Assign roles', 'Schedule internal kickoff', 'Brief stakeholders'] },
      { label: 'Kickoff Call', icon: Calendar, details: ['Send booking link', 'Calendar invite', 'Pre-call questionnaire', 'Meeting agenda'] },
      { label: 'Follow-Up', icon: Bell, details: ['Chase missing items', 'Automated reminders', 'Escalate delays', 'Status updates'] }
    ],
    outputs: ['Onboarding email sent', 'Intake form submitted', 'Client folder created', 'Project workspace ready', 'Kickoff call booked', 'Internal task list', 'Status dashboard']
  },
  {
    id: 'content-repurposing',
    title: 'Content Repurposing & Distribution',
    subtitle: 'Turn one piece of content into a multi-platform asset library',
    icon: BookOpen,
    trigger: 'Source content uploaded or linked',
    steps: [
      { label: 'Source Upload', icon: Zap, details: ['Video file', 'Podcast audio', 'Article link', 'Webinar recording'] },
      { label: 'Extract Content', icon: FileText, details: ['Transcribe audio/video', 'Extract text', 'Identify speakers', 'Timestamp segments'] },
      { label: 'AI Analysis', icon: Cpu, details: ['Identify key themes', 'Extract quotes', 'Find soundbites', 'Detect topics'] },
      { label: 'Generate Assets', icon: Layers, details: ['LinkedIn post', 'Email draft', 'Short captions', 'Blog outline', 'Carousel outline'] },
      { label: 'Tag & Organize', icon: Tag, details: ['Tag by topic', 'Tag by audience', 'Categorize by format', 'Apply metadata'] },
      { label: 'Save to Database', icon: Database, details: ['Content database', 'Asset library', 'Version control', 'Searchable archive'] },
      { label: 'Approval Flow', icon: CheckCircle, details: ['Optional review step', 'Brand voice check', 'Edit suggestions', 'Approval routing'] },
      { label: 'Schedule & Publish', icon: Send, details: ['Platform-specific timing', 'Auto-publish', 'Manual export option', 'Performance tracking'] }
    ],
    outputs: ['Short-form copy', 'Platform-specific captions', 'Blog drafts', 'Content ideas bank', 'Publishing queue', 'Asset library']
  }
];

function AutomationDetailCard({ automation, index }) {
  const [expanded, setExpanded] = useState(index === 0);
  const Icon = automation.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="rounded-none border border-[#BEA8A7]/40 bg-white shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <button 
            onClick={() => setExpanded(!expanded)}
            className="w-full text-left p-6 md:p-8 hover:bg-[#F4DBD8]/20 transition-colors"
            data-testid={`automation-detail-${automation.id}`}
          >
            <div className="flex items-start gap-4">
              <div className="rounded-none bg-[#2A0800] p-3.5 text-white flex-shrink-0">
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="inline-block rounded-none bg-[#F4DBD8]/40 text-[#775144] border border-[#BEA8A7]/40 px-3 py-1 text-xs font-medium uppercase tracking-wider">
                    Automation · {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#C09891]">
                    <Zap className="h-3 w-3 text-[#775144]" />
                    <span>Trigger: {automation.trigger}</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#2A0800] tracking-tight mb-1">
                  {automation.title}
                </h3>
                <p className="text-sm md:text-base text-[#775144]">
                  {automation.subtitle}
                </p>
              </div>
              <ChevronRight className={`h-5 w-5 text-[#775144] transition-transform duration-300 flex-shrink-0 ${expanded ? 'rotate-90' : ''}`} />
            </div>
          </button>

          {/* Expanded Content */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="border-t border-[#BEA8A7]/30"
            >
              <div className="p-6 md:p-8 bg-[#F4DBD8]/10">
                {/* Workflow Steps */}
                <div className="mb-8">
                  <h4 className="text-xs font-semibold text-[#2A0800] mb-4 flex items-center gap-2 uppercase tracking-wider">
                    <GitBranch className="h-4 w-4" />
                    Workflow Steps
                  </h4>
                  <div className="space-y-3">
                    {automation.steps.map((step, stepIdx) => {
                      const StepIcon = step.icon;
                      const isFirst = stepIdx === 0;
                      const isLast = stepIdx === automation.steps.length - 1;
                      
                      return (
                        <motion.div
                          key={stepIdx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: stepIdx * 0.05 }}
                          className="relative"
                        >
                          <div className="flex gap-4">
                            {/* Step indicator */}
                            <div className="flex flex-col items-center flex-shrink-0">
                              <div className="rounded-none bg-[#F4DBD8]/50 border border-[#BEA8A7]/40 p-3 text-[#2A0800] relative z-10">
                                <StepIcon className="h-4 w-4" />
                              </div>
                              {!isLast && (
                                <div className="w-px flex-1 mt-2 min-h-[20px]" 
                                  style={{ 
                                    backgroundImage: 'linear-gradient(to bottom, #BEA8A7 50%, transparent 50%)', 
                                    backgroundSize: '2px 6px' 
                                  }}
                                />
                              )}
                            </div>
                            
                            {/* Step content */}
                            <div className="flex-1 pb-6">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="text-xs font-mono text-[#C09891]">
                                  {String(stepIdx + 1).padStart(2, '0')}
                                </span>
                                <h5 className="font-semibold text-[#2A0800] tracking-tight">{step.label}</h5>
                                {isFirst && (
                                  <span className="text-xs bg-[#2A0800] text-white px-2 py-0.5 font-medium uppercase tracking-wider">
                                    Start
                                  </span>
                                )}
                                {isLast && (
                                  <span className="text-xs bg-[#775144] text-white px-2 py-0.5 font-medium uppercase tracking-wider">
                                    End
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {step.details.map((detail, i) => (
                                  <span 
                                    key={i} 
                                    className="text-xs text-[#775144] bg-white border border-[#BEA8A7]/40 rounded-none px-3 py-1.5"
                                  >
                                    {detail}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Outputs */}
                <div className="rounded-none bg-white border-l-4 border-[#2A0800] p-5">
                  <h4 className="text-xs font-semibold text-[#2A0800] mb-3 flex items-center gap-2 uppercase tracking-wider">
                    <CheckCircle className="h-4 w-4" />
                    Outputs Generated
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {automation.outputs.map((output, i) => (
                      <div key={i} className="flex items-center gap-2 bg-[#F4DBD8]/20 border border-[#BEA8A7]/30 px-3 py-2">
                        <ArrowRight className="h-3 w-3 text-[#775144] flex-shrink-0" />
                        <span className="text-xs text-[#2A0800]">{output}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function DetailedAutomations() {
  return (
    <section id="automations" className="relative z-10 py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#C09891] mb-3">Featured · Automations</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2A0800] tracking-tight mb-3 leading-tight">
            Top 3 Automation Blueprints
          </h2>
          <p className="text-base md:text-lg text-[#775144] max-w-2xl">
            Detailed multi-step automation flows showing triggers, decision points, integrations, and measurable outputs.
          </p>
        </motion.div>

        {/* Detailed Automation Cards */}
        <div className="space-y-6">
          {detailedAutomations.map((automation, index) => (
            <AutomationDetailCard 
              key={automation.id} 
              automation={automation} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
