'use client';

import { motion } from 'framer-motion';
import { Users, Clock, Loader2 } from 'lucide-react';

interface QuestionSectionProps {
    step: number;
    questions: Array<{
        id: string;
        question: string;
        options: string[];
    }>;
    answers: Record<string, string>;
    isLoading: boolean;
    onAnswer: (id: string, value: string) => void;
}

export function QuestionSection({ step, questions, answers, isLoading, onAnswer }: QuestionSectionProps) {
    return (
        <motion.div
            key={questions[step].id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            <div className="mb-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-violet-100 text-violet-600">
                    {questions[step].id === 'gender' ? <Users className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
                </div>
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 mb-4 tracking-tight">
                    {questions[step].question}
                </h2>
                <p className="text-gray-500">Choose your preference to find the perfect match</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {questions[step].options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => onAnswer(questions[step].id, opt)}
                        disabled={isLoading}
                        className={`flex-1 px-8 py-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${isLoading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-200/50'}`}
                    >
                        {isLoading && answers[questions[step].id] === opt ? (
                            <Loader2 className="animate-spin inline mr-2 h-5 w-5" />
                        ) : (
                            opt
                        )}
                    </button>
                ))}
            </div>
        </motion.div>
    );
}