'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { QuestionSection } from './components/QuestionSection';
import { ImageSelection } from './components/ImageSelection';
import { ChatButton } from './components/ChatButton';
import { User } from '../api/auth';

const questions = [
    {
        id: 'gender',
        question: 'Are you interested in talking to a Male or Female?',
        options: ['Male', 'Female'],
    },
    {
        id: 'ageGroup',
        question: 'Choose an age group:',
        options: ['18-25', '26-35', '35+'],
    },
];

const mockImages = [
    '/avatars/user1.jpg',
    '/avatars/user2.jpg',
    '/avatars/user3.jpg',
    '/avatars/user4.jpg',
];

export default function HomePage() {
    const router = useRouter();
    const params = useSearchParams();
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [step, setStep] = useState(0);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnswer = (id: string, value: string) => {
        setIsLoading(true);
        const newAnswers = { ...answers, [id]: value };
        setAnswers(newAnswers);
        const search = new URLSearchParams(newAnswers).toString();

        if (id === 'gender') {
            router.push(`/main-home?${search}`);
        } else {
            router.replace(`/main-home?${search}`);
        }

        setTimeout(() => {
            if (step < questions.length - 1) {
                setStep(step + 1);
            } else {
                setStep(step + 1);
            }
            setIsLoading(false);
        }, 500);
    };

    useEffect(() => {
        const query: Record<string, string> = {};
        params.forEach((value, key) => {
            query[key] = value;
        });
        setAnswers(query);
        setStep(Object.keys(query).length);
    }, [params]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-violet-100 via-pink-50 to-cyan-100 flex items-center justify-center p-6 bg-pattern">
            <div className="w-full max-w-3xl bg-white/90 backdrop-blur-sm p-12 rounded-[2rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] transform transition-all duration-500 border border-white/20">
                <AnimatePresence mode="wait">
                    {step < questions.length && (
                        <QuestionSection
                            step={step}
                            questions={questions}
                            answers={answers}
                            isLoading={isLoading}
                            onAnswer={handleAnswer}
                        />
                    )}

                    {step >= questions.length && (
                        <>
                            <ImageSelection
                                selectedUser={selectedUser}
                                onUserSelect={setSelectedUser}
                            />
                            {selectedUser && <ChatButton selectedUser={selectedUser} />}
                        </>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}