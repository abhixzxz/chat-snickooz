'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useConnectionStore } from '@/app/store/useConnectionStore';
import { User } from '@/app/api/auth';
import { useState } from 'react';

interface ChatButtonProps {
    selectedUser: User | null;
}

export function ChatButton({ selectedUser }: ChatButtonProps) {
    const router = useRouter();
    const { createConnection, loading } = useConnectionStore();
    const [error, setError] = useState<string | null>(null);

    const handleStartChat = async () => {
        console.log("clickeddd")
        if (!selectedUser) return;

        try {
            const { connection } = await createConnection(selectedUser._id);
            router.push(`/chat?connectionId=${connection._id}`);
            // Create conversation if needed
            try {
                await fetch('/api/conversations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        participants: [selectedUser._id],
                        type: 'private'
                    })
                });
            } catch (error) {
                console.error('Error creating conversation:', error);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create connection');
        }
    };

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
                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                )}
                <button
                    onClick={handleStartChat}
                    disabled={loading}
                    className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-200/50 transition-all duration-300 font-semibold transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Connecting...' : 'Start Chat'}
                </button>
            </div>
        </motion.div>
    );
}
