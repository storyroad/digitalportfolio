import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, ChevronRight, ArrowRight, Sparkles, Users, Mail,
  FileText, Folder, CheckCircle, Bell, Calendar, Database,
  MessageSquare, Target, GitBranch, Send, Tag, Layers, 
  ClipboardList, Filter, UserPlus
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const detailedAutomations = [
  {
    id: 'lead-qualification-detailed',
    title: 'Lead Qualification Flow',
    subtitle: 'Multi-channel lead capture, scoring, and intelligent routing',
    icon: Filter,
    color: 'blue',
    trigger: 'Lead from form, ad, email, or chat',
    steps: [
      {
        label: 'Trigger',
        icon: Zap,
        details: ['Form submission', 'Ad campaign', 'Email reply', 'Chat conversation']
      },
      {
        label: 'Normalize Data',
        icon: Database,
        details: ['Standardize fields', 'Clean formatting', 'Deduplicate', 'Map to schema']
      },
      {
        label: 'Enrich',
        icon: Sparkles,
        details: ['Company lookup (optional)', 'Geo lookup (optional)', 'AI summary (optional)', 'Social profile enrichment']
      },
      {
        label: 'Score Lead',
        icon: Target,
        details: ['Apply scoring rules', 'Intent signals', 'Budget indicators', 'Fit assessment']
      },
      {
        label: 'Route',
        icon: GitBranch,
        details: [
          'Hot → Notify sales immediately',
          'Warm → CRM + nurture sequence',
          'Cold → Low-priority queue'
        ]
      },
      {
        label: 'Respond',
        icon: Send,
        details: ['Personalized email', 'Booking link', 'Auto-reply', 'Follow-up reminder']
      },
      {
        label: 'Write to Systems',
        icon: Layers,
        details: ['CRM record', 'Pipeline stage', 'Slack/Teams notification', 'Spreadsheet log']
      }
    ],
    outputs: [
      'Qualified lead score',
      'CRM record created',
      'Routing decision',
      'Stakeholder notification',
      'Personalized response sent',
      'Pipeline updated'
    ]
  },
  {
    id: 'client-onboarding',
    title: 'Client Onboarding & Intake',
    subtitle: 'From closed deal to active project — fully automated',
    icon: UserPlus,
    color: 'cyan',
    trigger: 'Client marked as "closed-won" in CRM',
    steps: [
      {
        label: 'Trigger',
        icon: Zap,
        details: ['Deal stage = closed-won', 'Manual activation', 'Calendar event']
      },
      {
        label: 'Welcome Sequence',
        icon: Mail,
        details: ['Branded welcome email', 'Set expectations', 'Introduce team', 'Share resources']
      },
      {
        label: 'Intake Form',
        icon: FileText,
        details: ['Generate custom form', 'Send via email', 'Track completion', 'Send reminders']
      },
      {
        label: 'Documents',
        icon: ClipboardList,
        details: ['Contract dispatch', 'Onboarding docs', 'NDAs if needed', 'Signature tracking']
      },
      {
        label: 'Workspace Setup',
        icon: Folder,
        details: ['Create shared folder', 'Setup project board', 'Apply task template', 'Configure permissions']
      },
      {
        label: 'Team Activation',
        icon: Users,
        details: ['Notify team members', 'Assign roles', 'Schedule internal kickoff', 'Brief stakeholders']
      },
      {
        label: 'Kickoff Call',
        icon: Calendar,
        details: ['Send booking link', 'Calendar invite', 'Pre-call questionnaire', 'Meeting agenda']
      },
      {
        label: 'Follow-Up',
        icon: Bell,
        details: ['Chase missing items', 'Automated reminders', 'Escalate delays', 'Status updates']
      }
    ],
    outputs: [
      'Onboarding email sent',
      'Intake form submitted',
      'Client folder created',
      'Project workspace ready',
      'Kickoff call booked',
      'Internal task list',
      'Status dashboard'
    ]
  },
  {
    id: 'content-repurposing',
    title: 'Content Repurposing & Distribution',
    subtitle: 'Turn one piece of content into a multi-platform asset library',
    icon: Sparkles,
    color: 'indigo',
    trigger: 'Source content uploaded or linked',
    steps: [
      {
        label: 'Source Upload',
        icon: Zap,
        details: ['Video file', 'Podcast audio', 'Article link', 'Webinar recording']
      },
      {
        label: 'Extract Content',
        icon: FileText,
        details: ['Transcribe audio/video', 'Extract text', 'Identify speakers', 'Timestamp segments']
      },
      {
        label: 'AI Analysis',
        icon: Sparkles,
        details: ['Identify key themes', 'Extract quotes', 'Find soundbites', 'Detect topics']
      },
      {
        label: 'Generate Assets',
        icon: Layers,
        details: [
          'LinkedIn post',
          'Email draft',
          'Short captions',
          'Blog outline',
          'Carousel outline'
        ]
      },
      {
        label: 'Tag & Organize',
        icon: Tag,
        details: ['Tag by topic', 'Tag by audience', 'Categorize by format', 'Apply metadata']
      },
      {
        label: 'Save to Database',
        icon: Database,
        details: ['Content database', 'Asset library', 'Version control', 'Searchable archive']
      },
      {
        label: 'Approval Flow',
        icon: CheckCircle,
        details: ['Optional review step', 'Brand voice check', 'Edit suggestions', 'Approval routing']
      },
      {
        label: 'Schedule & Publish',
        icon: Send,
        details: ['Platform-specific timing', 'Auto-publish', 'Manual export option', 'Performance tracking']
      }
    ],
    outputs: [
      'Short-form copy',
      'Platform-specific captions',
      'Blog drafts',
      'Content ideas bank',
      'Publishing queue',
      'Asset library'
    ]
  }
];

function AutomationDetailCard({ automation, index }) {
  const [expanded, setExpanded] = useState(index === 0);
  const Icon = automation.icon;
  
  const colorClasses = {
    blue: {
      gradient: 'from-blue-600 to-cyan-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    cyan: {
      gradient: 'from-cyan-600 to-teal-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200',
      text: 'text-cyan-700',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600'
    },
    indigo: {
      gradient: 'from-indigo-600 to-blue-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-700',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    }
  };
  
  const colors = colorClasses[automation.color] || colorClasses.blue;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="rounded-3xl border-slate-200 bg-white shadow-xl overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <button 
            onClick={() => setExpanded(!expanded)}
            className="w-full text-left p-6 md:p-8 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className={`rounded-2xl bg-gradient-to-br ${colors.gradient} p-3.5 text-white shadow-lg flex-shrink-0`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`inline-block rounded-full ${colors.bg} ${colors.text} ${colors.border} border px-3 py-1 text-xs font-medium`}>
                    Automation #{index + 1}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Zap className="h-3 w-3 text-amber-500" />
                    <span>Trigger: {automation.trigger}</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                  {automation.title}
                </h3>
                <p className="text-sm md:text-base text-slate-600">
                  {automation.subtitle}
                </p>
              </div>
              <ChevronRight className={`h-5 w-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${expanded ? 'rotate-90' : ''}`} />
            </div>
          </button>

          {/* Expanded Content */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-slate-200"
            >
              <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-white">
                {/* Workflow Steps */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
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
                              <div className={`rounded-xl ${colors.iconBg} p-3 ${colors.iconColor} relative z-10`}>
                                <StepIcon className="h-4 w-4" />
                              </div>
                              {!isLast && (
                                <div className="w-px flex-1 bg-gradient-to-b from-slate-300 to-slate-200 mt-2 min-h-[20px]" 
                                  style={{ 
                                    backgroundImage: 'linear-gradient(to bottom, #cbd5e1 50%, transparent 50%)', 
                                    backgroundSize: '2px 6px' 
                                  }}
                                />
                              )}
                            </div>
                            
                            {/* Step content */}
                            <div className="flex-1 pb-6">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-mono text-slate-400">
                                  {String(stepIdx + 1).padStart(2, '0')}
                                </span>
                                <h5 className="font-semibold text-slate-900">{step.label}</h5>
                                {isFirst && (
                                  <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 font-medium">
                                    Start
                                  </span>
                                )}
                                {isLast && (
                                  <span className={`text-xs ${colors.bg} ${colors.text} rounded-full px-2 py-0.5 font-medium`}>
                                    End
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {step.details.map((detail, i) => (
                                  <span 
                                    key={i} 
                                    className="text-xs text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm"
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
                <div className={`rounded-2xl ${colors.bg} ${colors.border} border p-5`}>
                  <h4 className={`text-sm font-semibold ${colors.text} mb-3 flex items-center gap-2`}>
                    <CheckCircle className="h-4 w-4" />
                    Outputs Generated
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {automation.outputs.map((output, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
                        <ArrowRight className={`h-3 w-3 ${colors.iconColor} flex-shrink-0`} />
                        <span className="text-xs text-slate-700">{output}</span>
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
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/50 px-4 py-2 text-sm font-medium text-indigo-900 mb-6">
            <Zap className="h-4 w-4" />
            Featured Automations
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Top 3 Automation Blueprints
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
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
