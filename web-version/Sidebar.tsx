import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();
    const confirmed = window.confirm('Tem certeza que deseja sair do aplicativo?');
    if (confirmed) {
      console.log('Usuário fez logout');
      navigate('/');
    }
  };

  const navigateToPage = (page: string) => {
    onClose();
    switch (page) {
      case 'dashboard':
        navigate('/');
        break;
      case 'conquistas':
        navigate('/conquistas');
        break;
      case 'pcp':
        navigate('/pcp');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: '⚡', color: '#0a7ea4' },
    { id: 'conquistas', title: 'Conquistas', icon: '🎯', color: '#dc2626' },
    { id: 'pcp', title: 'PCP', icon: '📈', color: '#ea580c' },
    { id: 'logout', title: 'Sair', icon: '🔓', color: '#6b7280' },
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex">
      {/* Overlay - 20% */}
      <div 
        className="flex-1 bg-black/20 cursor-pointer" 
        onClick={onClose}
      />
      
      {/* Sidebar - 80% da largura */}
      <div 
        className="bg-slate-900 shadow-2xl w-4/5 h-full"
        style={{
          boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Header com gradiente */}
        <div 
          className="pt-16 pb-8 px-6"
          style={{
            background: 'linear-gradient(135deg, #0a7ea4 0%, #0891b2 100%)'
          }}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h2 className="text-white text-xl font-bold">Menu</h2>
              <p className="text-white/80 text-sm">Navegação do App</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 pt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="flex items-center mx-4 mb-2 p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-700 transition-colors w-auto"
              onClick={() => navigateToPage(item.id)}
              style={{
                boxShadow: `0 2px 4px ${item.color}33`
              }}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center mr-4"
                style={{backgroundColor: `${item.color}25`}}
              >
                <span className="text-lg">{item.icon}</span>
              </div>
              <span className="text-white text-base font-semibold flex-1 text-left">{item.title}</span>
              <span className="text-slate-400 text-lg">›</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700">
          <p className="text-slate-400 text-xs text-center">Versão 1.0.0</p>
        </div>
      </div>
    </div>
  );
};