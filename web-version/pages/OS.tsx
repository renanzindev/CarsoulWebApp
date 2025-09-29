import React, { useState } from 'react';

interface OSItem {
  id: string;
  numero: string;
  cliente: string;
  descricao: string;
  status: 'aberta' | 'em_andamento' | 'fechada';
  prioridade: 'baixa' | 'media' | 'alta';
  dataAbertura: string;
  dataFechamento?: string;
  tecnico: string;
}

export const OS: React.FC = () => {
  const [filter, setFilter] = useState<'todas' | 'aberta' | 'em_andamento' | 'fechada'>('todas');

  const osItems: OSItem[] = [
    {
      id: '1',
      numero: 'OS-2024-001',
      cliente: 'Empresa ABC Ltda',
      descricao: 'Manutenção preventiva em equipamento industrial',
      status: 'aberta',
      prioridade: 'alta',
      dataAbertura: '2024-01-15',
      tecnico: 'João Silva'
    },
    {
      id: '2',
      numero: 'OS-2024-002',
      cliente: 'Indústria XYZ S.A.',
      descricao: 'Reparo em sistema elétrico',
      status: 'em_andamento',
      prioridade: 'media',
      dataAbertura: '2024-01-14',
      tecnico: 'Maria Santos'
    },
    {
      id: '3',
      numero: 'OS-2024-003',
      cliente: 'Comércio 123',
      descricao: 'Instalação de novo equipamento',
      status: 'fechada',
      prioridade: 'baixa',
      dataAbertura: '2024-01-10',
      dataFechamento: '2024-01-12',
      tecnico: 'Pedro Costa'
    },
  ];

  const filteredOS = filter === 'todas' ? osItems : osItems.filter(os => os.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberta': return 'bg-red-100 text-red-800';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
      case 'fechada': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-500';
      case 'media': return 'bg-yellow-500';
      case 'baixa': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Fechamento de OS</h1>
        <p className="text-gray-600">Gerencie suas Ordens de Serviço</p>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex flex-wrap gap-2">
        {['todas', 'aberta', 'em_andamento', 'fechada'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status === 'todas' ? 'Todas' : 
             status === 'aberta' ? 'Abertas' :
             status === 'em_andamento' ? 'Em Andamento' : 'Fechadas'}
          </button>
        ))}
      </div>

      {/* Botão Nova OS */}
      <div className="mb-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          + Nova OS
        </button>
      </div>

      {/* Lista de OS */}
      <div className="space-y-4">
        {filteredOS.map((os) => (
          <div key={os.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{os.numero}</h3>
                <p className="text-gray-600">{os.cliente}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(os.prioridade)}`}></div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(os.status)}`}>
                  {os.status === 'aberta' ? 'Aberta' :
                   os.status === 'em_andamento' ? 'Em Andamento' : 'Fechada'}
                </span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{os.descricao}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Técnico:</span> {os.tecnico}
              </div>
              <div>
                <span className="font-medium">Abertura:</span> {new Date(os.dataAbertura).toLocaleDateString('pt-BR')}
              </div>
              {os.dataFechamento && (
                <div>
                  <span className="font-medium">Fechamento:</span> {new Date(os.dataFechamento).toLocaleDateString('pt-BR')}
                </div>
              )}
            </div>

            {os.status !== 'fechada' && (
              <div className="mt-4 flex space-x-2">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-colors">
                  Fechar OS
                </button>
                <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition-colors">
                  Editar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredOS.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhuma OS encontrada para o filtro selecionado.</p>
        </div>
      )}
    </div>
  );
};