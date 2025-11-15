
import React, { useState, useCallback, useEffect } from 'react';
import { generateLyrics, improveLyrics } from './services/geminiService';
import { SongInputForm } from './components/SongInputForm';
import { LyricsDisplay } from './components/LyricsDisplay';
import { MusicNoteIcon } from './components/Icon';
import { SongHistory } from './components/SongHistory';

export interface SongHistoryEntry {
    id: number;
    title: string;
    idea: string;
    style: string;
    lyrics: string;
}

const App: React.FC = () => {
    const [idea, setIdea] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [style, setStyle] = useState<string>('Pop');
    const [lyrics, setLyrics] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isImproving, setIsImproving] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<SongHistoryEntry[]>([]);

    useEffect(() => {
        try {
            const storedHistory = localStorage.getItem('songHistory');
            if (storedHistory) {
                setHistory(JSON.parse(storedHistory));
            }
        } catch (error) {
            console.error("Failed to load or parse history from localStorage", error);
            setHistory([]);
        }
    }, []);

    const songStyles = ['Balada', 'Ranchera','Cumbia','Corrido Tumbado','Norteña','Corrido','Salsa','Con Banda','Sierreña','Blues', 'Country', 'Electrónica', 'Folk', 'Gospel', 'Jazz', 'Pop', 'Punk', 'Rap', 'Reggaetón', 'Rock'].sort();

    const handleGenerateLyrics = useCallback(async () => {
        if (!idea.trim()) {
            setError('Por favor, introduce una idea para la canción.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setLyrics('');

        try {
            const result = await generateLyrics(idea, style, title);
            setLyrics(result);

            const newEntry: SongHistoryEntry = {
                id: Date.now(),
                title,
                idea,
                style,
                lyrics: result,
            };

            setHistory(prevHistory => {
                const updatedHistory = [newEntry, ...prevHistory].slice(0, 20); // Keep max 20 items
                localStorage.setItem('songHistory', JSON.stringify(updatedHistory));
                return updatedHistory;
            });

        } catch (err) {
            console.error(err);
            setError('Hubo un problema al generar la letra. Por favor, inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    }, [idea, style, title]);

    const handleImproveLyrics = useCallback(async () => {
        if (!lyrics) return;

        setIsImproving(true);
        setError(null);

        try {
            const result = await improveLyrics(lyrics, style, title);
            setLyrics(result);
        } catch (err) {
            console.error(err);
            setError('Hubo un problema al mejorar la letra. Por favor, inténtalo de nuevo.');
        } finally {
            setIsImproving(false);
        }
    }, [lyrics, style, title]);
    
    const handleSelectHistoryItem = (entry: SongHistoryEntry) => {
        setTitle(entry.title);
        setIdea(entry.idea);
        setStyle(entry.style);
        setLyrics(entry.lyrics);
        setError(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleClearHistory = () => {
        setHistory([]);
        localStorage.removeItem('songHistory');
    };


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
                    title={title}
                    setTitle={setTitle}
                    style={style}
                    setStyle={setStyle}
                    styles={songStyles}
                    onSubmit={handleGenerateLyrics}
                    isLoading={isLoading || isImproving}
                />

                {error && (
                    <div className="mt-6 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg w-full text-center">
                        <p>{error}</p>
                    </div>
                )}
                
                <LyricsDisplay 
                    lyrics={lyrics} 
                    isLoading={isLoading} 
                    isImproving={isImproving}
                    onImprove={handleImproveLyrics}
                />
            </main>
            
            <SongHistory
                history={history}
                onSelect={handleSelectHistoryItem}
                onClear={handleClearHistory}
            />

            <footer className="mt-auto pt-8 text-center text-slate-500 text-sm">
                <p>Creado con React, Tailwind CSS y la API de Google Gemini.</p>
            </footer>
        </div>
    );
};

export default App;
