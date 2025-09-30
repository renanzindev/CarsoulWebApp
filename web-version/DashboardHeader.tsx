import React, { useState } from 'react';
import { Sidebar } from './Sidebar';

interface DashboardHeaderProps {
  vectorSrc?: string;
  logoSrc?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  vectorSrc,
  logoSrc
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-800 shadow-lg">
      {/* Header Superior */}
      <div className="flex items-center justify-between px-3 pt-4 pb-3">
        
        {/* Logo no canto esquerdo */}
        <img 
          src="/assets/images/logo-carsoul1.png" 
          alt="CarSoul Logo" 
          className="ml-4 w-16 h-8 object-contain" 
        />
        
        {/* Ícone da sidebar no canto direito */}
        <button 
          onClick={toggleSidebar} 
          className="p-4 rounded-lg bg-slate-800 mr-4 hover:bg-slate-700 transition-colors"
        >
          <span className="text-white text-xl font-bold">☰</span>
        </button>
      </div>
      
      <Sidebar isVisible={isSidebarOpen} onClose={closeSidebar} />
    </div>
  );
};