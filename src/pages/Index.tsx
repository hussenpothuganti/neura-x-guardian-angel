
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StartupSplash from '../components/StartupSplash';
import NeuraXHeader from '../components/NeuraXHeader';
import SidebarMenu from '../components/SidebarMenu';
import ChatWindow from '../components/ChatWindow';
import FamilyCircleMap from '../components/FamilyCircleMap';
import EmergencyAlertPanel from '../components/EmergencyAlertPanel';
import TicketBookingForm from '../components/TicketBookingForm';
import OrderAssistant from '../components/OrderAssistant';
import RemindersBoard from '../components/RemindersBoard';
import SettingsPanel from '../components/SettingsPanel';
import WakeWordEngine from '../components/WakeWordEngine';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('chat');
  const [language, setLanguage] = useState('en');
  const [isEmergency, setIsEmergency] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'chat':
        return <ChatWindow language={language} />;
      case 'family':
        return <FamilyCircleMap />;
      case 'tickets':
        return <TicketBookingForm language={language} />;
      case 'orders':
        return <OrderAssistant language={language} />;
      case 'reminders':
        return <RemindersBoard language={language} />;
      case 'settings':
        return <SettingsPanel language={language} setLanguage={setLanguage} />;
      default:
        return <ChatWindow language={language} />;
    }
  };

  if (isLoading) {
    return <StartupSplash />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      <WakeWordEngine onEmergency={() => setIsEmergency(true)} />
      
      <AnimatePresence>
        {isEmergency && (
          <EmergencyAlertPanel onClose={() => setIsEmergency(false)} />
        )}
      </AnimatePresence>

      <div className="flex h-screen">
        <SidebarMenu 
          isOpen={sidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onClose={() => setSidebarOpen(false)}
        />
        
        <div className="flex-1 flex flex-col">
          <NeuraXHeader 
            language={language}
            setLanguage={setLanguage}
            onMenuClick={() => setSidebarOpen(true)}
          />
          
          <motion.main 
            className="flex-1 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderActiveSection()}
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default Index;
