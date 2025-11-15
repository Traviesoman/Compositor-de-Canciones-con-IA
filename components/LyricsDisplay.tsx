
import React from 'react';
import { FeatherIcon } from './Icon';

interface LyricsDisplayProps {
    lyrics: string;
    isLoading: boolean;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center gap-4">
        <svg className="animate-spin h-10 w-10 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-slate-400">La musa está trabajando...</p>
    </div>
);

const InitialState: React.FC = () => (
    <div className="text-center text-slate-500 flex flex-col items-center gap-4">
        <FeatherIcon className="w-16 h-16" />
        <p className="text-lg">La letra de tu canción aparecerá aquí.</p>
        <p>Escribe una idea y presiona "Generar Canción" para empezar.</p>
    </div>
);

export const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ lyrics, isLoading }) => {
    return (
        <div className="mt-8 w-full max-w-3xl bg-slate-800/50 p-6 sm:p-8 rounded-lg border border-slate-700 min-h-[300px] flex justify-center items-center transition-all duration-300">
            {isLoading ? (
                <LoadingSpinner />
            ) : lyrics ? (
                <div className="whitespace-pre-wrap text-lg leading-relaxed font-mono text-left w-full animate-fade-in">
                    {lyrics}
                </div>
            ) : (
                <InitialState />
            )}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
