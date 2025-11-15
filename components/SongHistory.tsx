
import React from 'react';
import { HistoryIcon, TrashIcon } from './Icon';
import { SongHistoryEntry } from '../App';

interface SongHistoryProps {
    history: SongHistoryEntry[];
    onSelect: (entry: SongHistoryEntry) => void;
    onClear: () => void;
}

export const SongHistory: React.FC<SongHistoryProps> = ({ history, onSelect, onClear }) => {
    if (history.length === 0) {
        return null; // Don't render anything if history is empty
    }

    return (
        <section className="w-full max-w-2xl mt-12 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-300 flex items-center gap-3">
                    <HistoryIcon className="w-6 h-6" />
                    Historial
                </h2>
                <button
                    onClick={onClear}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors"
                    aria-label="Limpiar historial"
                >
                    <TrashIcon className="w-4 h-4" />
                    Limpiar
                </button>
            </div>
            <ul className="space-y-3 bg-slate-800/50 border border-slate-700 rounded-lg p-4 max-h-96 overflow-y-auto">
                {history.map((entry) => (
                    <li key={entry.id}>
                        <button
                            onClick={() => onSelect(entry)}
                            className="w-full text-left p-3 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <p className="font-semibold text-purple-400">{entry.title || 'Canción sin título'}</p>
                            <p className="text-sm text-slate-400 truncate">{entry.idea}</p>
                            <span className="text-xs text-slate-500 bg-slate-700 px-2 py-0.5 rounded-full mt-2 inline-block">{entry.style}</span>
                        </button>
                    </li>
                ))}
            </ul>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s 0.2s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </section>
    );
};
