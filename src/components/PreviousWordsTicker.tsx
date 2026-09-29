import React, { useState } from 'react';
import { History, ChevronUp, ChevronDown, CheckCircle2, RotateCcw } from 'lucide-react';
import { ColorTheme } from '../types';

interface PreviousWordsTickerProps {
  history: { word: string; timestamp: number; definition: string }[];
  totalWordsCount: number;
  theme: ColorTheme;
  onSelectWord: (word: string) => void;
  onClearHistory: () => void;
}

export const PreviousWordsTicker: React.FC<PreviousWordsTickerProps> = ({
  history,
  totalWordsCount,
  theme,
  onSelectWord,
  onClearHistory,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (history.length === 0) return null;

  const uniqueViewedCount = new Set(history.map((h) => h.word.toLowerCase())).size;

  return (
    <footer className="relative z-30 w-full border-t border-white/10 bg-black/40 backdrop-blur-md transition-all">
      {/* Expanded Drawer */}
      {isExpanded && (
        <div className="max-h-56 overflow-y-auto p-4 border-b border-white/10 bg-black/60 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-sans-ui text-stone-300">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-amber-400" />
              <span className="font-semibold uppercase tracking-wider text-stone-200">
                Explored Words Archive
              </span>
              <span className="text-stone-400">
                ({uniqueViewedCount} of {totalWordsCount} words unrepeated)
              </span>
            </div>
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-rose-300 transition-colors"
              title="Reset view history to cycle entire dictionary anew"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Cycle History</span>
            </button>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {history.slice(0, 16).map((item, idx) => (
              <button
                key={`${item.word}_${idx}`}
                onClick={() => onSelectWord(item.word)}
                className="text-left p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors capitalize text-sm">
                    {item.word}
                  </span>
                  <span className="text-[10px] font-mono-data text-stone-400">
                    {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-xs text-stone-400 line-clamp-1 font-editorial-body">
                  {item.definition}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Persistent Compact Ticker Bar */}
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between text-xs font-sans-ui">
        <div className="flex items-center gap-3 overflow-hidden flex-1 mr-4">
          <div className="flex items-center gap-1.5 text-stone-400 shrink-0 font-medium tracking-wide">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Anti-Reuse Tracker:</span>
            <span className="text-amber-300 font-mono-data font-semibold">
              {uniqueViewedCount} / {totalWordsCount}
            </span>
          </div>

          {/* Scrolling horizontal past words */}
          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap py-0.5 no-scrollbar text-stone-300">
            {history.slice(0, 8).map((item, index) => (
              <button
                key={`${item.word}_ticker_${index}`}
                onClick={() => onSelectWord(item.word)}
                className="hover:text-amber-200 transition-colors text-xs flex items-center gap-1"
                title={`${item.word}: ${item.definition}`}
              >
                <span className="text-stone-500 font-serif italic">#</span>
                <span className="capitalize font-medium">{item.word}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Expand / Collapse */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-200 shrink-0 border border-white/10 px-2 py-1 rounded transition-colors"
        >
          <span>{isExpanded ? 'Hide' : 'View History'}</span>
          {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        </button>
      </div>
    </footer>
  );
};
