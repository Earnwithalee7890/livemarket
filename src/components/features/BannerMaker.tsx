'use client';

import React, { useState, useRef } from 'react';
import { Download } from 'lucide-react';

export function BannerMaker() {
    const [color1, setColor1] = useState('#3b82f6');
    const [color2, setColor2] = useState('#8b5cf6');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Download
        const link = document.createElement('a');
        link.download = 'farcaster-banner.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="flex flex-col h-full space-y-4">
            <div
                className="flex-1 rounded-xl shadow-lg w-full relative overflow-hidden group min-h-[100px]"
                style={{ background: `linear-gradient(to bottom right, ${color1}, ${color2})` }}
            >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                    <span className="text-white font-medium text-sm">Preview</span>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="flex-1 space-y-1">
                    <label className="text-xs text-gray-400">Start Color</label>
                    <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
                        <input
                            type="color"
                            value={color1}
                            onChange={(e) => setColor1(e.target.value)}
                            className="w-6 h-6 rounded cursor-pointer bg-transparent border-none p-0"
                        />
                        <span className="text-xs text-gray-300 font-mono">{color1}</span>
                    </div>
                </div>
                <div className="flex-1 space-y-1">
                    <label className="text-xs text-gray-400">End Color</label>
                    <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
                        <input
                            type="color"
                            value={color2}
                            onChange={(e) => setColor2(e.target.value)}
                            className="w-6 h-6 rounded cursor-pointer bg-transparent border-none p-0"
                        />
                        <span className="text-xs text-gray-300 font-mono">{color2}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-2 rounded-lg transition-colors"
            >
                <Download size={16} />
                Download Banner
            </button>

            {/* Hidden canvas for generation */}
            <canvas
                ref={canvasRef}
                width={1500}
                height={500}
                className="hidden"
            />
        </div>
    );
}
