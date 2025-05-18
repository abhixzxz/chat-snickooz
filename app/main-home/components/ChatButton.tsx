'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ChatButton() {
    const router = useRouter();

    return (
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
    );
}