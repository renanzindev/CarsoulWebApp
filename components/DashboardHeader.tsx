import React from 'react';

interface DashboardHeaderProps {
  logoSrc?: string;
  userName?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  logoSrc = "./assets/images/Logo-CarSoul.png",
  userName = "Usuário" 
}) => {
  return (
    `
    <!-- Header -->
    <div class="header">
        <img src="${logoSrc}" alt="CarSoul" class="logo" />
        <div class="header-right">
            <nav class="nav-links">
                <a href="#" class="nav-link active" onclick="navigateToPage('dashboard')">Dashboard</a>
                <a href="#" class="nav-link" onclick="navigateToPage('contacts')">Contatos Úteis</a>
                <a href="#" class="nav-link" onclick="navigateToPage('reports')">Relatórios</a>
                <a href="#" class="nav-link" onclick="navigateToPage('profile')">Perfil</a>
            </nav>
            <div class="menu-icon" onclick="toggleMenu()">
                 ☰
                 <div class="dropdown-menu" id="dropdownMenu">
                     <a href="#" class="dropdown-item" onclick="navigateToPage('dashboard')">Dashboard</a>
                     <a href="#" class="dropdown-item" onclick="navigateToPage('contacts')">Contatos Úteis</a>
                     <a href="#" class="dropdown-item" onclick="navigateToPage('conquistas')">Conquistas</a>
                     <a href="#" class="dropdown-item" onclick="navigateToPage('os')">Fechamento de OS</a>
                     <a href="#" class="dropdown-item" onclick="navigateToPage('notifications')">Notificações</a>
                     <a href="#" class="dropdown-item" onclick="navigateToPage('agendamentos')">Agendamentos</a>
                     <a href="#" class="dropdown-item" onclick="navigateToPage('logout')">Sair</a>
                 </div>
             </div>
        </div>
    </div>
    `
  );
};

export const getHeaderStyles = () => {
  return `
    /* Header */
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
        background: #1E1E2D;
        margin: 0 -16px;
        padding-left: 16px;
        padding-right: 16px;
    }
    
    .nav-links {
        display: flex;
        gap: 20px;
        align-items: center;
    }
    
    .nav-link {
        color: #6c757d;
        text-decoration: none;
        font-size: 14px;
        padding: 8px 12px;
        border-radius: 6px;
        transition: all 0.2s;
        cursor: pointer;
    }
    
    .nav-link:hover {
        color: #FFFFFF;
        background: #FFFFFF;

    }
    
    .nav-link.active {
        color: #FFFFFF;
        background: #FFFFFF;
    }
    
    .logo {
         height: 40px;
         width: auto;
         color: #A6CE38;
     }
    
    .header-right {
         display: flex;
         align-items: center;
         gap: 15px;
     }
     
     .menu-icon {
          width: 48px;
          height: 48px;
          background: #1E1E2D;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #FFFFFF;
          font-weight: bold;
          position: relative;
          font-size: 18px;
      }
      
      .dropdown-menu {
           position: absolute;
           top: 100%;
           right: 0;
           background: #ffffff;
           border-radius: 12px;
           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
           min-width: 280px;
           z-index: 1000;
           opacity: 0;
           visibility: hidden;
           transform: translateY(-10px);
           transition: all 0.3s ease;
           margin-top: 10px;
           border: 1px solid rgba(0, 0, 0, 0.1);
       }
      
      .dropdown-menu.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
      }
      
      .dropdown-item {
           display: block;
           padding: 16px 20px;
           color: #2d3748;
           text-decoration: none;
           font-size: 15px;
           font-weight: 500;
           border-bottom: 1px solid rgba(0, 0, 0, 0.08);
           transition: all 0.2s;
       }
       
       .dropdown-item:last-child {
           border-bottom: none;
       }
       
       .dropdown-item:hover {
           background: #f7fafc;
           color: #1a202c;
           padding-left: 24px;
       }
       
       .dropdown-item:first-child {
           border-radius: 12px 12px 0 0;
       }
       
       .dropdown-item:last-child {
           border-radius: 0 0 12px 12px;
       }
  `;
};

export const getHeaderScript = () => {
  return `
    function toggleMenu() {
        const menu = document.getElementById('dropdownMenu');
        menu.classList.toggle('show');
    }
    
    function navigateToPage(page) {
        // Fechar menu dropdown se estiver aberto
        const menu = document.getElementById('dropdownMenu');
        if (menu) {
            menu.classList.remove('show');
        }
        
        switch(page) {
            case 'contacts':
                // Navegar para a tela de contatos
                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'navigate',
                        route: '/contacts'
                    }));
                } else {
                    // Fallback para web
                    window.location.href = '/contacts';
                }
                break;
            case 'dashboard':
                // Navegar para o dashboard
                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'navigate',
                        route: '/'
                    }));
                } else {
                    window.location.href = '/';
                }
                break;
            default:
                console.log('Página não implementada:', page);
        }
    }
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const menu = document.getElementById('dropdownMenu');
        const menuIcon = event.target.closest('.menu-icon');
        
        if (!menuIcon && menu) {
            menu.classList.remove('show');
        }
    });
  `;
};