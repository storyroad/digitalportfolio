import React from 'react';
import { motion } from 'framer-motion';
import { Circle, Database, Zap, GitBranch } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

/**
 * N8N-style visual workflow - Sleek corporate, mobile responsive
 */
export default function N8NWorkflow({ flow, title = "Automation Flow" }) {
  return (
    <Card className="rounded-none border border-[#BEA8A7]/40 bg-white shadow-sm overflow-hidden">
      <CardContent className="p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="rounded-none bg-[#2A0800] p-2">
                <GitBranch className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#2A0800] tracking-tight">{title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#775144]">Visual workflow with data points and triggers</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#775144]">
            <div className="flex items-center gap-1">
              <Circle className="h-2 w-2 fill-[#775144] text-[#775144]" />
              <span className="uppercase tracking-wider">Active</span>
            </div>
          </div>
        </div>

        {/* Workflow Canvas */}
        <div className="relative bg-[#F4DBD8]/15 rounded-none p-4 sm:p-6 md:p-8 border border-[#BEA8A7]/30">
          {/* Grid pattern background */}
          <div 
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #BEA8A7 1px, transparent 1px)',
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
                  <div className="flex items-center gap-2 mb-2 text-xs text-[#C09891] font-mono">
                    <Database className="h-3 w-3" />
                    <span>node_{index + 1}</span>
                  </div>
                  
                  {/* Node card */}
                  <div className="relative group">
                    <div className="relative bg-white rounded-none border border-[#BEA8A7]/50 hover:border-[#2A0800] p-4 shadow-sm hover:shadow-md transition-all duration-300 w-full">
                      {/* Connection dots - desktop */}
                      {index > 0 && (
                        <div className="hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#775144] border-2 border-white shadow-md z-20" />
                      )}
                      {!isLast && (
                        <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#2A0800] border-2 border-white shadow-md z-20" />
                      )}
                      
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#BEA8A7]/30">
                        <div className="rounded-none bg-[#F4DBD8]/40 p-2">
                          <StepIcon className="h-4 w-4 text-[#2A0800]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-[#C09891] font-mono uppercase tracking-wider">Step {index + 1}</p>
                        </div>
                        <Zap className="h-3 w-3 text-[#775144]" />
                      </div>
                      
                      {/* Title */}
                      <h4 className="font-semibold text-sm text-[#2A0800] mb-2 leading-tight tracking-tight">
                        {step.label}
                      </h4>
                      
                      {/* Data points */}
                      <div className="space-y-1.5">
                        {step.detail.split(', ').slice(0, 3).map((dataPoint, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#775144]">
                            <div className="w-1 h-1 bg-[#C09891] flex-shrink-0" />
                            <span className="truncate">{dataPoint}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mobile/Tablet vertical connector */}
                  {!isLast && (
                    <div className="lg:hidden flex justify-center items-center mt-4 -mb-2">
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-px h-6 bg-gradient-to-b from-[#775144] to-[#C09891]" />
                        <div className="w-2 h-2 bg-[#2A0800]" />
                      </motion.div>
                    </div>
                  )}

                  {/* Desktop horizontal connector */}
                  {!isLast && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 z-0 w-4 h-px">
                      <svg className="absolute inset-0" preserveAspectRatio="none">
                        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="#BEA8A7" strokeWidth="2" strokeDasharray="4,4" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#BEA8A7]/30 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-[#775144]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#775144] border-2 border-white shadow-sm" />
              <span className="uppercase tracking-wider">Input</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#2A0800] border-2 border-white shadow-sm" />
              <span className="uppercase tracking-wider">Output</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-[#775144]" />
              <span className="uppercase tracking-wider">Trigger</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-3 w-3 text-[#C09891]" />
              <span className="uppercase tracking-wider">Data Point</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
