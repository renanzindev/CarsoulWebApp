import React from 'react';

export const Contacts: React.FC = () => {
  const contacts = [
    { id: 1, name: 'João Silva', role: 'Gerente', phone: '(11) 99999-9999', email: 'joao@empresa.com' },
    { id: 2, name: 'Maria Santos', role: 'Supervisora', phone: '(11) 88888-8888', email: 'maria@empresa.com' },
    { id: 3, name: 'Pedro Costa', role: 'Técnico', phone: '(11) 77777-7777', email: 'pedro@empresa.com' },
    { id: 4, name: 'Ana Oliveira', role: 'Coordenadora', phone: '(11) 66666-6666', email: 'ana@empresa.com' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Contatos Úteis</h1>
        <p className="text-gray-600">Lista de contatos importantes da empresa</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-semibold text-lg">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{contact.name}</h3>
                <p className="text-sm text-gray-600">{contact.role}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">📞</span>
                <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">📧</span>
                <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                  {contact.email}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};