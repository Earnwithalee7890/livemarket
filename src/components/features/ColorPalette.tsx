'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';

export function ColorPalette() {
    const [colors, setColors] = useState<string[]>([]);
    const [copied, setCopied] = useState<string | null>(null);

    const generatePalette = () => {
        const newColors = Array.from({ length: 5 }, () =>
            '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
        );
        setColors(newColors);
    };

    useEffect(() => {
        generatePalette();
    }, []);

    const copyToClipboard = (color: string) => {
        navigator.clipboard.writeText(color);
        setCopied(color);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="flex-1 grid grid-cols-5 gap-1 h-24 rounded-xl overflow-hidden shadow-lg">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="h-full w-full cursor-pointer group relative"
                        style={{ backgroundColor: color }}
                        onClick={() => copyToClipboard(color)}
                    >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                            {copied === color ? <Check size={16} className="text-white" /> : <Copy size={16} className="text-white" />}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center px-1">
                <div className="flex gap-2 w-full justify-between">
                    {colors.map((color, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <span className="text-[10px] text-gray-400 font-mono uppercase">{color}</span>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={generatePalette}
                className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-2 rounded-lg transition-colors"
            >
                <RefreshCw size={16} />
                Generate New Palette
            </button>
        </div>
    );
}
