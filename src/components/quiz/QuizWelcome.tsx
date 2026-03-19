"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuizWelcomeProps {
    onStart: (name: string) => void;
}

const QuizWelcome = ({ onStart }: QuizWelcomeProps) => {
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onStart(name.trim());
        }
    };

    return (
        <div className="w-full max-w-lg animate-fade-in text-center space-y-8">
            <div className="space-y-4">
                {/* Title is now handled in Quiz.tsx */}
                <div className="flex items-center justify-center gap-2 text-primary font-medium">
                    <span>⏱️</span>
                    <span>Duración estimada: 7 minutos</span>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Descubre tu perfil de personalidad DISC. Elige en cada grupo la palabra que más te describe y la que menos te describe.
                </p>
                <div className="bg-secondary/50 p-4 rounded-xl text-sm text-muted-foreground border border-primary/10">
                    <p className="font-bold text-primary mb-1">💡 Instrucciones:</p>
                    <ul className="list-disc list-inside text-left space-y-1">
                        <li>Sé honesto/a y no le des muchas vueltas a cada pregunta.</li>
                        <li>No hay respuestas correctas o incorrectas.</li>
                        <li>Debes elegir un &quot;MÁS&quot; y un &quot;MENOS&quot; por grupo.</li>
                    </ul>
                </div>
                <p className="text-lg font-medium text-primary pt-4">
                    Antes de comenzar, ¿cómo te llamas?
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Input
                        type="text"
                        placeholder="Tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-center text-lg h-12"
                        autoFocus
                    />
                </div>
                <Button size="lg" type="submit" className="w-full font-bold text-lg" disabled={!name.trim()}>
                    Comenzar evaluación
                </Button>
            </form>
        </div>
    );
};

export default QuizWelcome;
