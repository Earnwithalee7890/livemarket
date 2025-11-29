'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const FONTS = {
    'Normal': (s: string) => s,
    'Serif Bold': (s: string) => s.replace(/[a-zA-Z0-9]/g, (c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D400 + code - 65);
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D41A + code - 97);
        if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7CE + code - 48);
        return c;
    }),
    'Script': (s: string) => s.replace(/[a-zA-Z]/g, (c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D4D0 + code - 65);
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D4EA + code - 97);
        return c;
    }),
    'Typewriter': (s: string) => s.replace(/[a-zA-Z0-9]/g, (c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D670 + code - 65);
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D68A + code - 97);
        if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7F6 + code - 48);
        return c;
    }),
    'Circles': (s: string) => s.replace(/[a-zA-Z0-9]/g, (c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + code - 65);
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + code - 97);
        if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + code - 49);
        if (code === 48) return '⓪';
        return c;
    }),
    'Squares': (s: string) => s.replace(/[a-zA-Z]/g, (c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F130 + code - 65);
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1F130 + code - 97);
        return c;
    }),
};

export function StylishText() {
    const [text, setText] = useState('');
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (fontName: string, content: string) => {
        navigator.clipboard.writeText(content);
        setCopied(fontName);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="w-full space-y-4">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something magical..."
                className="
          w-full 
          bg-white/5 backdrop-blur-sm
          border-2 border-white/10 
          focus:border-purple-500/50
          rounded-xl px-4 py-3 
          text-white placeholder-gray-400
          focus:outline-none 
          transition-all duration-300
          focus:shadow-lg focus:shadow-purple-500/20
          hover:bg-white/10
        "
            />

            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries(FONTS).map(([name, transform]) => {
                    const result = transform(text || 'Preview Text');
                    const isCopied = copied === name;
                    return (
                        <div
                            key={name}
                            onClick={() => handleCopy(name, result)}
                            className={`
                group flex items-center justify-between p-3 
                rounded-xl cursor-pointer 
                transition-all duration-300
                border-2
                ${isCopied
                                    ? 'bg-green-500/20 border-green-500/50 scale-105'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/30 hover:scale-105'
                                }
                backdrop-blur-sm
                hover:shadow-lg hover:shadow-purple-500/20
              `}
                        >
                            <div className="flex flex-col min-w-0 flex-1">
                                <span className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider">{name}</span>
                                <span className={`font-medium truncate transition-colors ${isCopied ? 'text-green-300' : 'text-white group-hover:text-purple-200'}`}>
                                    {result}
                                </span>
                            </div>
                            <div className={`transition-all duration-300 ${isCopied ? 'scale-125' : 'group-hover:scale-110'}`}>
                                {isCopied ? (
                                    <Check size={18} className="text-green-400 animate-bounce" />
                                ) : (
                                    <Copy size={18} className="text-gray-400 group-hover:text-purple-400" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
