"use client";

import { DiscWordGroup } from "./quizData";
import { DiscAnswer } from "./QuizEngine";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface QuizQuestionProps {
    questionGroup: DiscWordGroup;
    onAnswer: (answer: DiscAnswer) => void;
    onBack: () => void;
    currentGlobalIndex: number;
    totalQuestions: number;
    savedAnswer?: DiscAnswer;
}

const QuizQuestion = ({
    questionGroup,
    onAnswer,
    onBack,
    currentGlobalIndex,
    totalQuestions,
    savedAnswer
}: QuizQuestionProps) => {
    const [plus, setPlus] = useState<string | null>(savedAnswer?.plus ?? null);
    const [minus, setMinus] = useState<string | null>(savedAnswer?.minus ?? null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        setPlus(savedAnswer?.plus ?? null);
        setMinus(savedAnswer?.minus ?? null);
        setIsAnimating(false);
        setIsExiting(false);
    }, [currentGlobalIndex, savedAnswer]);

    const handleSelectPlus = (category: string) => {
        if (isAnimating || isExiting) return;
        setPlus(category);
        if (minus === category) setMinus(null);
    };

    const handleSelectMinus = (category: string) => {
        if (isAnimating || isExiting) return;
        setMinus(category);
        if (plus === category) setPlus(null);
    };

    const handleContinue = () => {
        if (plus && minus && !isAnimating && !isExiting) {
            setIsAnimating(true);
            setIsExiting(true);
            setTimeout(() => {
                onAnswer({ plus, minus });
            }, 300); // Allow exit animation
        }
    };

    // Auto-advance if both are selected
    useEffect(() => {
        if (plus && minus && !savedAnswer) {
             const timer = setTimeout(handleContinue, 400); 
             return () => clearTimeout(timer);
        }
    }, [plus, minus]);

    return (
        <div className={cn(
            "w-full max-w-2xl space-y-8 text-center relative px-4",
            isExiting 
                ? "animate-out fade-out slide-out-to-left-12 duration-300 ease-in-out fill-mode-forwards" 
                : "animate-in fade-in slide-in-from-right-12 duration-500 ease-out"
        )}>
            {/* Progress */}
            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    <button
                        onClick={onBack}
                        className="flex items-center hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentGlobalIndex === 0}
                    >
                        <ArrowLeft className="mr-1 h-3 w-3" />
                        Anterior
                    </button>
                    <span>Grupo {currentGlobalIndex + 1} de {totalQuestions}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                    <div
                        className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                        style={{ width: `${((currentGlobalIndex + 1) / totalQuestions) * 100}%` }}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Selecciona lo que MÁS y MENOS te describe</h2>
                <p className="text-muted-foreground">Elige una opción en cada columna</p>
            </div>

            {/* Selection Table */}
            <div className="bg-card border rounded-2xl overflow-hidden shadow-lg selection-none">
                <div className="grid grid-cols-[1fr_auto_auto] border-b bg-muted/30">
                    <div className="p-4 text-left font-bold text-sm uppercase tracking-widest opacity-70">Palabra</div>
                    <div className="p-4 text-center font-bold text-sm uppercase tracking-widest text-emerald-600 bg-emerald-500/5">MÁS</div>
                    <div className="p-4 text-center font-bold text-sm uppercase tracking-widest text-red-600 bg-red-500/5">MENOS</div>
                </div>

                <div className="divide-y">
                    {questionGroup.words.map((word) => (
                        <div key={word.category} className="grid grid-cols-[1fr_auto_auto] items-center hover:bg-muted/10 transition-colors">
                            <div className="p-4 text-left font-medium text-lg text-foreground">
                                {word.text}
                            </div>
                            
                            {/* MÁS Button */}
                            <button
                                onClick={() => handleSelectPlus(word.category)}
                                className={cn(
                                    "p-4 w-20 flex justify-center transition-all duration-200",
                                    plus === word.category 
                                        ? "bg-emerald-500 text-white shadow-inner animate-pop" 
                                        : "hover:bg-emerald-500/10 text-muted-foreground/30"
                                )}
                            >
                                <div className={cn(
                                    "h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all",
                                    plus === word.category ? "border-white bg-white/20 scale-110" : "border-emerald-500/20"
                                )}>
                                    {plus === word.category ? <Check className="h-5 w-5" strokeWidth={3} /> : <Plus className="h-4 w-4" />}
                                </div>
                            </button>

                            {/* MENOS Button */}
                            <button
                                onClick={() => handleSelectMinus(word.category)}
                                className={cn(
                                    "p-4 w-20 flex justify-center transition-all duration-200",
                                    minus === word.category 
                                        ? "bg-red-500 text-white shadow-inner animate-pop" 
                                        : "hover:bg-red-500/10 text-muted-foreground/30"
                                )}
                            >
                                <div className={cn(
                                    "h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all",
                                    minus === word.category ? "border-white bg-white/20 scale-110" : "border-red-500/20"
                                )}>
                                    {minus === word.category ? <Check className="h-5 w-5" strokeWidth={3} /> : <Minus className="h-4 w-4" />}
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 h-16">
                {(plus && minus && currentGlobalIndex === totalQuestions - 1) && (
                    <Button 
                        size="lg" 
                        onClick={handleContinue} 
                        className="w-full font-bold animate-in fade-in slide-in-from-bottom-2 duration-300"
                        disabled={isAnimating || isExiting}
                    >
                        Ver Resultados
                    </Button>
                )}
            </div>
        </div>
    );
};

export default QuizQuestion;
