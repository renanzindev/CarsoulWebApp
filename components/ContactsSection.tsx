import React from 'react';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email?: string;
  icon: string;
  description: string;
}

interface ContactsSectionProps {
  contacts?: Contact[];
}

export const ContactsSection: React.FC<ContactsSectionProps> = ({ contacts }) => {
  const defaultContacts: Contact[] = [
    {
      id: 1,
      name: "Fabricio Gil",
      phone: "31 99847-6992",
      email: "fabricio.souza@carsoul.com.br",
      icon: "👨‍💼",
      description: "Coordenador Produção"
    },
    {
      id: 2,
      name: "Gilene Soares",
      phone: "31 99807-1705",
      email: "gilene@carsoul.com.br",
      icon: "👨‍💼",
      description: "Supervisor Tecnico"
    },
    {
      id: 3,
      name: "David Douglas",
      phone: "31 91234-5678",
      email: "david@carsoul.com.br",
      icon: "👨‍💼",
      description: "Supervisor Operacional I"
    },
    {
      id: 4,
      name: "Alex Adriano",
      phone: "31 98267-1280",
      email: "alex@carsoul.com.br",
      icon: "👩‍💼",
      description: "PCP"
    },
    {
      id: 5,
      name: "Renan Oliveira",
      phone: "31 99934-1098",
      email: "tic@carsoul.com.br",
      icon: "👨‍💼",
      description: "TI"
    },

    {
      id: 7,
      name: "Jessica",
      phone: "31 99724-2083",
      email: "pessoal@carsoul.com.br",
      icon: "👩‍💼",
      description: "Departamento Pessoal"
    }
  ];

  const contactsList = contacts || defaultContacts;

  return `
    <div class="contacts-section">
      <div class="section-header">
        <h2 class="section-title">📞 Contatos Úteis</h2>
      </div>
      
      <div class="contacts-grid">
        ${contactsList.map(contact => `
          <div class="contact-card">
            <div class="contact-icon">${contact.icon}</div>
            <div class="contact-info">
              <h3 class="contact-name">${contact.name}</h3>
              <p class="contact-description">${contact.description}</p>
              <div class="contact-details">
                <span class="contact-phone">📞 ${contact.phone}</span>
              </div>
            </div>
            <div class="contact-actions">
              <button class="action-btn phone-btn" onclick="window.location.href='tel:${contact.phone}'"
                      title="Ligar para ${contact.name}">
                📞
              </button>
              ${contact.email ? `
                <button class="action-btn email-btn" onclick="window.location.href='mailto:${contact.email}'"
                        title="Enviar email para ${contact.name}">
                  ✉️
                </button>
              ` : ''}
              <button class="action-btn whatsapp-btn" onclick="window.open('https://wa.me/${contact.phone.replace(/\D/g, '')}', '_blank')"
                      title="Conversar no WhatsApp com ${contact.name}">
                💬
              </button>
            </div>
          </div>
        `).join('')}
      </div>
      </div>
    </div>
  `;
};

export const getContactsStyles = () => {
  return `
    .contacts-section {
      margin: 20px 0;
      padding: 0 16px;
      background: #FFFFFF;

    }
    
    .section-header {
      text-align: center;
      margin-bottom: 24px;
    }
    
    .section-title {
      font-size: 24px;
      font-weight: bold;
      color: #1a1a1a;
      margin: 0 0 8px 0;
    }
    
    .section-subtitle {
      font-size: 14px;
      color: #666;
      margin: 0;
    }
    
    .contacts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .contact-card {
      background: white;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border: 1px solid #FFFFFF;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .contact-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }
    
    .contact-icon {
      font-size: 32px;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8f9fa;
      border-radius: 50%;
      flex-shrink: 0;
    }
    
    .contact-info {
      flex: 1;
    }
    
    .contact-name {
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0 0 4px 0;
    }
    
    .contact-description {
      font-size: 12px;
      color: #666;
      margin: 0 0 8px 0;
    }
    
    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    }
    
    .contact-phone {
      font-size: 14px;
      color: #2196f3;
      font-weight: 500;
    }
    
    .contact-actions {
      flex-shrink: 0;
      display: flex;
      gap: 8px;
      align-items: center;
    }
    
    .action-btn {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 50%;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .phone-btn {
      background: #4caf50;
      color: white;
    }
    
    .phone-btn:hover {
      background: #45a049;
      transform: scale(1.1);
    }
    
    .email-btn {
      background: #2196f3;
      color: white;
    }
    
    .email-btn:hover {
      background: #1976d2;
      transform: scale(1.1);
    }
    
    .whatsapp-btn {
      background: #25d366;
      color: white;
    }
    
    .whatsapp-btn:hover {
      background: #20ba5a;
      transform: scale(1.1);
    }
    
    .emergency-icon {
      font-size: 24px;
      animation: pulse 2s infinite;
    }
    
    .emergency-text h3 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
    }
    
    .emergency-text p {
      margin: 0;
      font-size: 12px;
      opacity: 0.9;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @media (max-width: 768px) {
      .contacts-grid {
        grid-template-columns: 1fr;
      }
      
      .contact-card {
        padding: 12px;
      }
      
      .contact-icon {
        font-size: 28px;
        width: 44px;
        height: 44px;
      }
      
      .contact-name {
        font-size: 15px;
      }
      
      .contact-description {
        font-size: 11px;
      }
      
      .action-btn {
        width: 36px;
        height: 36px;
        font-size: 14px;
      }
      
      .contact-actions {
        gap: 6px;
      }
    }
  `;
};