
import React from 'react';
import { PenSparkleIcon } from './Icon';

interface SongInputFormProps {
    idea: string;
    setIdea: (idea: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

export const SongInputForm: React.FC<SongInputFormProps> = ({ idea, setIdea, onSubmit, isLoading }) => {
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Escribe tu idea para una canción aquí... Por ejemplo: 'Una canción melancólica sobre la lluvia en la ciudad y un amor perdido.'"
                className="w-full h-32 p-4 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-shadow resize-none placeholder-slate-500"
                disabled={isLoading}
            />
            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generando...
                    </>
                ) : (
                    <>
                        <PenSparkleIcon className="w-5 h-5" />
                        Generar Canción
                    </>
                )}
            </button>
        </form>
    );
};
