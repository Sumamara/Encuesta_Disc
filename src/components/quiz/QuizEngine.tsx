"use client";

import { useState } from "react";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import QuizWelcome from "./QuizWelcome";
import { discQuestions, DiscWordGroup, getDiscProfile } from "./quizData";
import { supabase } from "@/integrations/supabase/client";

export interface DiscAnswer {
    plus: string; // 'D' | 'I' | 'S' | 'C'
    minus: string; // 'D' | 'I' | 'S' | 'C'
}

const QuizEngine = () => {
    const totalQuestions = discQuestions.length;

    const [currentGlobalIndex, setCurrentGlobalIndex] = useState(0);
    const [answers, setAnswers] = useState<(DiscAnswer | null)[]>(new Array(totalQuestions).fill(null));
    const [showResult, setShowResult] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [userName, setUserName] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);

    const handleStart = (name: string) => {
        setUserName(name);
        setHasStarted(true);
        setStartTime(Date.now());
    };

    const currentQuestion = discQuestions[currentGlobalIndex];

    const calculateScores = (finalAnswers: (DiscAnswer | null)[]) => {
        const scores: Record<string, number> = { D: 0, I: 0, S: 0, C: 0 };
        finalAnswers.forEach(ans => {
            if (ans) {
                scores[ans.plus] += 1;
                scores[ans.minus] -= 1;
            }
        });
        return scores;
    };

    const saveResults = async (finalAnswers: (DiscAnswer | null)[]) => {
        if (!startTime) return;

        const endTime = Date.now();
        const timer = Math.floor((endTime - startTime) / 1000);
        const finalScores = calculateScores(finalAnswers);

        try {
            const profile = getDiscProfile(finalScores);
            
            // Construir el objeto de resultados para la tabla "DISC"
            const resultsData: any = {
                user_name: userName,
                time_taken_seconds: timer,
                d_score: finalScores.D || 0,
                i_score: finalScores.I || 0,
                s_score: finalScores.S || 0,
                c_score: finalScores.C || 0,
                profile_code: profile.profileCode,
                primary_style: profile.primary.title,
                secondary_style: profile.secondary.title,
                answers: finalAnswers // Guardamos el JSON completo
            };

            // Mapear cada una de las 24 preguntas a sus columnas plus/minus
            finalAnswers.forEach((ans, index) => {
                if (ans) {
                    resultsData[`q${index + 1}_plus`] = ans.plus;
                    resultsData[`q${index + 1}_minus`] = ans.minus;
                }
            });

            const { error } = await supabase
                .from("DISC")
                .insert([resultsData]);

            if (error) throw error;
            console.log("Resultados guardados correctamente en tabla DISC");
        } catch (error) {
            console.error("Error al guardar resultados:", error);
        }
    };

    const handleAnswer = (answer: DiscAnswer) => {
        const newAnswers = [...answers];
        newAnswers[currentGlobalIndex] = answer;
        setAnswers(newAnswers);

        if (currentGlobalIndex < totalQuestions - 1) {
            setCurrentGlobalIndex(currentGlobalIndex + 1);
        } else {
            saveResults(newAnswers);
            setShowResult(true);
        }
    };

    const handleBack = () => {
        if (currentGlobalIndex > 0) {
            setCurrentGlobalIndex(currentGlobalIndex - 1);
        }
    };

    const handleRetake = () => {
        setAnswers(new Array(totalQuestions).fill(null));
        setCurrentGlobalIndex(0);
        setShowResult(false);
        setHasStarted(false);
        setStartTime(null);
    };

    if (!hasStarted) {
        return <QuizWelcome onStart={handleStart} />;
    }

    if (showResult) {
        return <QuizResult scores={calculateScores(answers)} onRetake={handleRetake} userName={userName} />;
    }

    return (
        <div className="w-full flex justify-center min-h-[450px]">
            <QuizQuestion
                key={currentGlobalIndex}
                questionGroup={currentQuestion}
                onAnswer={handleAnswer}
                onBack={handleBack}
                currentGlobalIndex={currentGlobalIndex}
                totalQuestions={totalQuestions}
                savedAnswer={answers[currentGlobalIndex] || undefined}
            />
        </div>
    );
};

export default QuizEngine;
