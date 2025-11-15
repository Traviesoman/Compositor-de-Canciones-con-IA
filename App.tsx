
import React, { useState, useCallback } from 'react';
import { generateLyrics } from './services/geminiService';
import { SongInputForm } from './components/SongInputForm';
import { LyricsDisplay } from './components/LyricsDisplay';
import { MusicNoteIcon } from './components/Icon';

const App: React.FC = () => {
    const [idea, setIdea] = useState<string>('');
    const [lyrics, setLyrics] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateLyrics = useCallback(async () => {
        if (!idea.trim()) {
            setError('Por favor, introduce una idea para la canción.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setLyrics('');

        try {
            const result = await generateLyrics(idea);
            setLyrics(result);
        } catch (err) {
            console.error(err);
            setError('Hubo un problema al generar la letra. Por favor, inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    }, [idea]);


    return (
        <div className="min-h-screen bg-slate-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <header className="text-center my-8">
                <div className="flex justify-center items-center gap-4">
                    <MusicNoteIcon className="w-12 h-12 text-purple-400" />
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        Compositor de Canciones IA
                    </h1>
                </div>
                <p className="text-slate-400 mt-2 text-lg">
                    Transforma tus ideas en letras de canciones con el poder de Gemini.
                </p>
            </header>

            <main className="w-full max-w-2xl flex flex-col items-center">
                <SongInputForm
                    idea={idea}
                    setIdea={setIdea}
                    onSubmit={handleGenerateLyrics}
                    isLoading={isLoading}
                />

                {error && (
                    <div className="mt-6 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg w-full text-center">
                        <p>{error}</p>
                    </div>
                )}
                
                <LyricsDisplay lyrics={lyrics} isLoading={isLoading} />
            </main>
            
            <footer className="mt-auto pt-8 text-center text-slate-500 text-sm">
                <p>Creado con React, Tailwind CSS y la API de Google Gemini.</p>
            </footer>
        </div>
    );
};

export default App;
