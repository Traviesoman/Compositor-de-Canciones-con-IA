
import React, { useState } from 'react';
import { FeatherIcon, CopyIcon, CheckIcon, DownloadIcon, WandIcon } from './Icon';

interface LyricsDisplayProps {
    lyrics: string;
    isLoading: boolean;
    isImproving: boolean;
    onImprove: () => void;
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

export const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ lyrics, isLoading, isImproving, onImprove }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        if (!lyrics) return;
        try {
            await navigator.clipboard.writeText(lyrics);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const handleDownload = () => {
        if (!lyrics) return;
        const blob = new Blob([lyrics], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'letras-cancion.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    
    return (
        <div className="relative mt-8 w-full max-w-3xl bg-slate-800/50 p-6 sm:p-8 rounded-lg border border-slate-700 min-h-[300px] flex justify-center items-center transition-all duration-300">
            {isLoading ? (
                <LoadingSpinner />
            ) : lyrics ? (
                <>
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                         <button 
                            onClick={onImprove}
                            disabled={isImproving}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all bg-purple-600/80 hover:bg-purple-500 text-white disabled:bg-slate-600 disabled:cursor-not-allowed"
                            aria-label="Mejorar letra"
                        >
                            {isImproving ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Mejorando...
                                </>
                            ) : (
                                <>
                                    <WandIcon className="w-4 h-4" />
                                    Mejorar
                                </>
                            )}
                        </button>
                        <button 
                            onClick={handleCopy}
                            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${isCopied ? 'bg-green-600/80 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
                            aria-label={isCopied ? "Letra copiada" : "Copiar letra"}
                        >
                            {isCopied ? (
                                <>
                                    <CheckIcon className="w-4 h-4" />
                                    Copiado
                                </>
                            ) : (
                                 <>
                                    <CopyIcon className="w-4 h-4" />
                                    Copiar
                                </>
                            )}
                        </button>
                        <button 
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all bg-slate-700 hover:bg-slate-600 text-slate-300"
                            aria-label="Descargar letra"
                        >
                            <DownloadIcon className="w-4 h-4" />
                            Descargar
                        </button>
                    </div>

                    <div className="whitespace-pre-wrap text-lg leading-relaxed font-mono text-left w-full animate-fade-in pt-8 sm:pt-4">
                        {lyrics}
                    </div>
                </>
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
