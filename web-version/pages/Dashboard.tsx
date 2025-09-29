import React from 'react';
import { ProfileCard } from '../components/ProfileCard';

export const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-100 w-full">
      {/* Container principal com scroll para o conteúdo */}
      <div className="flex-1 w-full">
        {/* ProfileCard fixo - sempre visível logo após o header */}
        <div className="px-2.5 pt-2.5 pb-0">
          <ProfileCard 
            userName="Renan Oliveira"
            userRole="Desenvolvedor"
            medals={[
              { icon: "🏆", isActive: true, title: "Troféu de Excelência" },
              { icon: "🥇", isActive: true, title: "Medalha de Ouro" },
              { icon: "🥈", isActive: false, title: "Medalha de Prata" }
            ]}
            motivationText="Descubra o que falta para você atingir o próximo nível"
            variant="default"
          />
        </div>
        
        {/* Área de conteúdo principal do dashboard */}
        <div className="flex-1 w-full px-2.5 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card de Estatísticas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Estatísticas</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">OS Abertas:</span>
                  <span className="font-semibold text-blue-600">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">OS Fechadas:</span>
                  <span className="font-semibold text-green-600">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pendentes:</span>
                  <span className="font-semibold text-orange-600">8</span>
                </div>
              </div>
            </div>

            {/* Card de Ações Rápidas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                  Nova OS
                </button>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors">
                  Relatório
                </button>
                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors">
                  PCP
                </button>
              </div>
            </div>

            {/* Card de Notificações */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Notificações</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-500 mr-3">📋</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Nova OS #1234</p>
                    <p className="text-xs text-gray-600">Há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-500 mr-3">✅</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">OS #1230 finalizada</p>
                    <p className="text-xs text-gray-600">Há 4 horas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};