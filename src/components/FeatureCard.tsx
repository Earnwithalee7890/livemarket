import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    children: React.ReactNode;
    className?: string;
}

export function FeatureCard({ title, description, icon: Icon, children, className = '' }: FeatureCardProps) {
    return (
        <div className={`
      relative overflow-hidden
      bg-white 
      border border-slate-200
      rounded-[24px] 
      shadow-sm hover:shadow-md
      transition-all duration-300
      group
      ${className}
    `}>
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-4">
                    <div className="
            w-12 h-12 rounded-2xl 
            bg-white border border-slate-200
            flex items-center justify-center 
            shadow-sm
            group-hover:scale-105 transition-transform duration-300
          ">
                        <Icon className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                        <h3 className="font-outfit text-xl font-bold text-slate-900 tracking-tight">
                            {title}
                        </h3>
                        <p className="font-inter text-sm text-slate-500">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
}
