import React, { useState } from 'react';
import { Eye, Edit3 } from 'lucide-react';

interface Agendamento {
  id: string;
  modelo: string;
  chassi?: string;
  placa?: string;
  cliente: string;
  combo: string;
  data: string;
  hora: string;
  status: 'agendado' | 'cancelado' | 'concluido' | 'pendente';
}

export const PCP: React.FC = () => {
  const [filtroAtivo, setFiltroAtivo] = useState<'semana' | 'dia'>('dia');

  const agendamentos: Agendamento[] = [
    {
      id: '1',
      modelo: 'Corolla',
      chassi: 'MZ587565',
      cliente: 'Jose Antônio',
      combo: 'Combo X',
      data: '15/08',
      hora: '11:30',
      status: 'agendado'
    },
    {
      id: '2',
      modelo: 'Frontier',
      placa: 'PQ25853',
      cliente: 'Carlos Almeida',
      combo: 'Combo X',
      data: '15/08',
      hora: '11:30',
      status: 'cancelado'
    },
    {
      id: '3',
      modelo: 'Panamera',
      chassi: 'RJ549623',
      cliente: 'Sirléia Silva',
      combo: 'Combo X',
      data: '15/08',
      hora: '11:30',
      status: 'concluido'
    },
    {
      id: '4',
      modelo: 'T-Cross',
      chassi: 'MZ587565',
      cliente: 'Raul Ferreira',
      combo: 'Combo X',
      data: '15/08',
      hora: '11:30',
      status: 'concluido'
    },
    {
      id: '5',
      modelo: 'Corolla',
      chassi: 'MZ587565',
      cliente: 'Ana Costa',
      combo: 'Combo X',
      data: '15/08',
      hora: '11:30',
      status: 'pendente'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      agendado: {
        bg: 'bg-purple-200',
        text: 'text-purple-800',
        label: 'Agendado'
      },
      cancelado: {
        bg: 'bg-red-200',
        text: 'text-red-800',
        label: 'Cancelado'
      },
      concluido: {
        bg: 'bg-green-200',
        text: 'text-green-800',
        label: 'Concluído'
      },
      pendente: {
        bg: 'bg-red-200',
        text: 'text-red-600',
        label: 'Pend. Agendamento'
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header fixo no topo */}
      <header className="fixed top-0 left-0 right-0 bg-slate-800 text-white px-4 py-3 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold">CarSoul</span>
          </div>
          <button className="p-2">
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-white"></div>
              <div className="w-full h-0.5 bg-white"></div>
              <div className="w-full h-0.5 bg-white"></div>
            </div>
          </button>
        </div>
      </header>

      {/* Conteúdo principal com padding para o header fixo */}
      <div className="pt-16 px-4 pb-6">
        {/* Card do usuário */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-semibold">CJ</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Christian Junior</h3>
              <p className="text-sm text-gray-600">Detailer CarSoul</p>
            </div>
          </div>
        </div>

        {/* Seção principal "Sua Agenda" */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Sua Agenda</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setFiltroAtivo('semana')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filtroAtivo === 'semana'
                    ? 'bg-slate-800 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setFiltroAtivo('dia')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filtroAtivo === 'dia'
                    ? 'bg-slate-800 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Dia
              </button>
            </div>
          </div>

          {/* Subtítulo da agenda */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Amanhã dia 05/10/2024</h3>
          </div>

          {/* Lista de agendamentos */}
          <div className="space-y-4">
            {agendamentos.map((agendamento) => (
              <div key={agendamento.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Modelo do carro */}
                    <div className="bg-gray-100 px-3 py-2 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">{agendamento.modelo}</span>
                    </div>

                    {/* Dados do cliente */}
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 mb-1">
                        {agendamento.chassi ? `Chassi: ${agendamento.chassi}` : `Placa: ${agendamento.placa}`}
                      </div>
                      <div className="font-semibold text-gray-900 mb-1">{agendamento.cliente}</div>
                      <div className="text-sm text-gray-600">{agendamento.combo}</div>
                    </div>

                    {/* Data e hora */}
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{agendamento.data}</div>
                      <div className="text-sm text-gray-600">{agendamento.hora}</div>
                    </div>
                  </div>

                  {/* Status e ações */}
                  <div className="flex items-center space-x-3 ml-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Edit3 size={16} />
                      </button>
                    </div>
                    {getStatusBadge(agendamento.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};