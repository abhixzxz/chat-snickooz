'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LeftSidebar from './LeftSidebar';
import RightSection from './RightSection';

export default function ChatLayout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);


  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  });

  useEffect(() => {
    const chatId = searchParams.get('chatId');
    setSelectedChat(chatId ? parseInt(chatId) : null);
  }, [searchParams]);

  const handleChatSelect = (chatId: string) => {
    router.push(`?chatId=${chatId}`);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  return (
    <div className="flex w-full relative bg-[var(--background)]">
      <div className={`${isMobileView ? 'w-full' : 'w-[30%]'} ${isMobileView && selectedChat ? 'hidden' : 'block'} border-r border-[var(--muted)]`}>
        <LeftSidebar onChatSelect={handleChatSelect} selectedChatId={selectedChat} />
      </div>
      <div 
        className={`${isMobileView ? 'w-full absolute inset-0' : 'flex-1'} 
        ${isMobileView && !selectedChat ? 'hidden' : 'block'} 
        transition-transform duration-300 ${isMobileView && selectedChat ? 'translate-x-0' : 'translate-x-full'} bg-[var(--background)]`}
      >
        <RightSection 
          onBack={isMobileView ? handleBackToList : undefined} 
          showBackButton={isMobileView}
          selectedUserId={selectedChat}
        />
      </div>
    </div>
  );
}