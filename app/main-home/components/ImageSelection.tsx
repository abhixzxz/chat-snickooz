'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { usersApi } from '@/app/api/users';
import { User } from '@/app/api/auth';

interface ImageSelectionProps {
    selectedUser: User | null;
    onUserSelect: (user: User) => void;
}

export function ImageSelection({ selectedUser, onUserSelect }: ImageSelectionProps) {
    const randomUsersQuery = useQuery({
        queryKey: ['randomUsers'],
        queryFn: () => usersApi.getRandomUsers(),
        refetchOnWindowFocus: false
    });

    const handleRefresh = () => {
        randomUsersQuery.refetch();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="text-center"
        >
            <div className="mb-8 md:mb-12 text-center px-4 md:px-0 relative">
                <button
                    onClick={handleRefresh}
                    disabled={randomUsersQuery.isLoading}
                    className="absolute right-4 top-0 p-2 rounded-full hover:bg-pink-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <RefreshCw className={`w-5 h-5 text-pink-600 ${randomUsersQuery.isLoading ? 'animate-spin' : ''}`} />
                </button>
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 rounded-full bg-pink-100 text-pink-600">
                    <Heart className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h2 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-violet-600 mb-2 md:mb-4 tracking-tight leading-tight">
                    Select a person to connect with
                </h2>
                <p className="text-sm md:text-base text-gray-500">Choose someone you'd like to start a conversation with</p>
            </div>
            {/* Random Users Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 px-4 md:px-0">
                {randomUsersQuery.isLoading ? (
                    <div className="col-span-4 flex justify-center items-center py-10">
                        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
                    </div>
                ) : randomUsersQuery.data?.data.users.map((user) => (
                    <motion.div
                        key={user._id}
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onUserSelect(user)}
                        className={`relative cursor-pointer rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 transform bg-white p-3 md:p-4 ${selectedUser?._id === user._id ? 'ring-2 md:ring-4 ring-violet-500 ring-offset-2 md:ring-offset-4 scale-102 shadow-lg md:shadow-xl' : 'hover:shadow-lg'}`}
                    >
                        <div className="relative mb-3">
                            <Image
                                src={user.avatar}
                                alt={`${user.firstName} ${user.lastName}`}
                                width={180}
                                height={180}
                                className="w-full h-24 md:h-32 object-contain rounded-lg md:rounded-xl"
                            />
                            {selectedUser?._id === user._id && (
                                <div className="absolute inset-0 bg-indigo-500 bg-opacity-20 flex items-center justify-center rounded-xl">
                                    <CheckCircle className="h-8 w-8 text-white" />
                                </div>
                            )}
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-gray-800 truncate text-sm md:text-base">
                                {user.firstName} {user.lastName}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-500 truncate">@{user.username}</p>
                            <div className="flex items-center mt-1 md:mt-2">
                                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                <span className="text-xs text-gray-600 capitalize">{user.status}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}