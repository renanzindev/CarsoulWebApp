import React, { useState } from 'react';

interface PCPItem {
  id: string;
  produto: string;
  quantidade: number;
  dataInicio: string;
  dataFim: string;
  status: 'planejado' | 'em_producao' | 'concluido' | 'atrasado';
  responsavel: string;
  progresso: number;
}

export const PCP: React.FC = () => {
  const [viewMode, setViewMode] = useState<'lista' | 'kanban'>('lista');

  const pcpItems: PCPItem[] = [
    {
      id: '1',
      produto: 'Produto A - Lote 001',
      quantidade: 100,
      dataInicio: '2024-01-15',
      dataFim: '2024-01-20',
      status: 'em_producao',
      responsavel: 'João Silva',
      progresso: 65
    },
    {
      id: '2',
      produto: 'Produto B - Lote 002',
      quantidade: 250,
      dataInicio: '2024-01-18',
      dataFim: '2024-01-25',
      status: 'planejado',
      responsavel: 'Maria Santos',
      progresso: 0
    },
    {
      id: '3',
      produto: 'Produto C - Lote 003',
      quantidade: 150,
      dataInicio: '2024-01-10',
      dataFim: '2024-01-15',
      status: 'concluido',
      responsavel: 'Pedro Costa',
      progresso: 100
    },
    {
      id: '4',
      produto: 'Produto D - Lote 004',
      quantidade: 80,
      dataInicio: '2024-01-12',
      dataFim: '2024-01-16',
      status: 'atrasado',
      responsavel: 'Ana Oliveira',
      progresso: 45
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planejado': return 'bg-blue-100 text-blue-800';
      case 'em_producao': return 'bg-yellow-100 text-yellow-800';
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'atrasado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planejado': return 'Planejado';
      case 'em_producao': return 'Em Produção';
      case 'concluido': return 'Concluído';
      case 'atrasado': return 'Atrasado';
      default: return status;
    }
  };

  const groupedItems = {
    planejado: pcpItems.filter(item => item.status === 'planejado'),
    em_producao: pcpItems.filter(item => item.status === 'em_producao'),
    concluido: pcpItems.filter(item => item.status === 'concluido'),
    atrasado: pcpItems.filter(item => item.status === 'atrasado'),
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">PCP - Planejamento e Controle de Produção</h1>
        <p className="text-gray-600">Gerencie o planejamento e controle da produção</p>
      </div>

      {/* Controles */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('lista')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'lista'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Lista
          </button>
          <button
            onClick={() => setViewMode('kanban')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'kanban'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Kanban
          </button>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          + Novo Planejamento
        </button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{groupedItems.planejado.length}</div>
          <div className="text-sm text-blue-700">Planejados</div>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{groupedItems.em_producao.length}</div>
          <div className="text-sm text-yellow-700">Em Produção</div>
        </div>
        <div className="bg-green-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{groupedItems.concluido.length}</div>
          <div className="text-sm text-green-700">Concluídos</div>
        </div>
        <div className="bg-red-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{groupedItems.atrasado.length}</div>
          <div className="text-sm text-red-700">Atrasados</div>
        </div>
      </div>

      {/* Conteúdo */}
      {viewMode === 'lista' ? (
        <div className="space-y-4">
          {pcpItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.produto}</h3>
                  <p className="text-gray-600">Quantidade: {item.quantidade} unidades</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Responsável:</span> {item.responsavel}
                </div>
                <div>
                  <span className="font-medium">Início:</span> {new Date(item.dataInicio).toLocaleDateString('pt-BR')}
                </div>
                <div>
                  <span className="font-medium">Fim:</span> {new Date(item.dataFim).toLocaleDateString('pt-BR')}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progresso</span>
                  <span>{item.progresso}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.status === 'concluido' ? 'bg-green-500' :
                      item.status === 'atrasado' ? 'bg-red-500' :
                      item.status === 'em_producao' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${item.progresso}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors">
                  Editar
                </button>
                <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition-colors">
                  Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Object.entries(groupedItems).map(([status, items]) => (
            <div key={status} className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-4 text-center">
                {getStatusText(status)} ({items.length})
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-2">{item.produto}</h4>
                    <p className="text-sm text-gray-600 mb-2">Qtd: {item.quantidade}</p>
                    <p className="text-sm text-gray-600 mb-2">{item.responsavel}</p>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full ${
                          status === 'concluido' ? 'bg-green-500' :
                          status === 'atrasado' ? 'bg-red-500' :
                          status === 'em_producao' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${item.progresso}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};