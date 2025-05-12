'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Loader2, CheckCircle, Heart, Users, Clock } from 'lucide-react';

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
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handle answer selection
    const handleAnswer = (id: string, value: string) => {
        setIsLoading(true);
        const newAnswers = { ...answers, [id]: value };
        setAnswers(newAnswers);
        const search = new URLSearchParams(newAnswers).toString();

        // Navigate to /main-home after gender selection
        if (id === 'gender') {
            router.push(`/main-home?${search}`);
        } else {
            router.replace(`/main-home?${search}`);
        }

        setTimeout(() => {
            if (step < questions.length - 1) {
                setStep(step + 1);
            } else {
                setStep(step + 1); // Move to image selection
            }
            setIsLoading(false);
        }, 500);
    };

    // Handle image selection
    const handleImageSelect = (img: string) => {
        setSelectedImage(img);
    };

    // Initialize answers from URL params
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
                                        onClick={() => handleAnswer(questions[step].id, opt)}
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
                    )}

                    {step >= questions.length && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="text-center"
                        >
                            <div className="mb-12 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-pink-100 text-pink-600">
                                    <Heart className="w-8 h-8" />
                                </div>
                                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-violet-600 mb-4 tracking-tight">
                                    Select a person to connect with
                                </h2>
                                <p className="text-gray-500">Choose someone you'd like to start a conversation with</p>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                {mockImages.sort(() => 0.5 - Math.random()).map((img, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.1, rotate: 2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleImageSelect(img)}
                                        className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform ${selectedImage === img ? 'ring-4 ring-violet-500 ring-offset-4 scale-105 shadow-xl' : 'hover:shadow-lg hover:scale-105'}`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`user-${idx}`}
                                            width={160}
                                            height={160}
                                            className="w-full h-40 object-cover"
                                        />
                                        {selectedImage === img && (
                                            <div className="absolute inset-0 bg-indigo-500 bg-opacity-20 flex items-center justify-center">
                                                <CheckCircle className="h-8 w-8 text-white" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                            {selectedImage && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-8"
                                >
                                    <div className="bg-violet-50 rounded-2xl p-6 max-w-md mx-auto">
                                        <p className="text-lg text-violet-700 font-semibold flex items-center justify-center mb-4">
                                            <CheckCircle className="h-6 w-6 mr-3" />
                                            Perfect! Ready to start chatting?
                                        </p>
                                        <button
                                            onClick={() => router.push('/chat')}
                                            className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-200/50 transition-all duration-300 font-semibold transform hover:scale-105"
                                        >
                                            Start Chat
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}