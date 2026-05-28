import React from 'react';
import { motion } from 'framer-motion';
import { Circle, Database, Zap, GitBranch } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

/**
 * N8N-style visual workflow component - Mobile responsive
 * Shows nodes connected with dotted lines and data flow
 */
export default function N8NWorkflow({ flow, title = "Automation Flow" }) {
  return (
    <Card className="rounded-3xl border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-xl overflow-hidden">
      <CardContent className="p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="rounded-lg bg-blue-100 p-2">
                <GitBranch className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">Visual workflow with data points and triggers</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Circle className="h-2 w-2 fill-green-500 text-green-500" />
              <span>Active</span>
            </div>
          </div>
        </div>

        {/* Workflow Canvas - Fully Responsive */}
        <div className="relative bg-slate-50/50 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200/60">
          {/* Grid pattern background */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Nodes Container */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-2">
            {flow.map((step, index) => {
              const StepIcon = step.icon;
              const isLast = index === flow.length - 1;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="relative"
                >
                  {/* Data point indicator */}
                  <div className="flex items-center gap-2 mb-2 text-xs text-slate-500 font-mono">
                    <Database className="h-3 w-3" />
                    <span>node_{index + 1}</span>
                  </div>
                  
                  {/* Node card */}
                  <div className="relative group">
                    {/* Outer ring animation */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
                    
                    <div className="relative bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-300 p-4 shadow-md hover:shadow-xl transition-all duration-300 w-full">
                      {/* Connection dots - only show on desktop */}
                      {index > 0 && (
                        <div className="hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-md z-20" />
                      )}
                      {!isLast && (
                        <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-500 border-2 border-white shadow-md z-20" />
                      )}
                      
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
                        <div className="rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 p-2">
                          <StepIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-500 font-medium">Step {index + 1}</p>
                        </div>
                        <Zap className="h-3 w-3 text-amber-500" />
                      </div>
                      
                      {/* Title */}
                      <h4 className="font-semibold text-sm text-slate-900 mb-2 leading-tight">
                        {step.label}
                      </h4>
                      
                      {/* Data points */}
                      <div className="space-y-1.5">
                        {step.detail.split(', ').slice(0, 3).map((dataPoint, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                            <div className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                            <span className="truncate">{dataPoint}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mobile/Tablet vertical connector - shown between cards */}
                  {!isLast && (
                    <div className="lg:hidden flex justify-center items-center mt-4 -mb-2">
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-px h-6 bg-gradient-to-b from-blue-400 to-cyan-400" />
                        <div className="w-2 h-2 rounded-full bg-cyan-500" />
                      </motion.div>
                    </div>
                  )}

                  {/* Desktop horizontal connector */}
                  {!isLast && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 z-0 w-4 h-px">
                      <svg className="absolute inset-0" preserveAspectRatio="none">
                        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200/60 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm" />
              <span>Input</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500 border-2 border-white shadow-sm" />
              <span>Output</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-amber-500" />
              <span>Trigger</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-3 w-3 text-slate-500" />
              <span>Data Point</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
