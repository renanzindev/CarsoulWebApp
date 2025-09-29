import React from 'react';

export const Conquistas: React.FC = () => {
  const achievements = [
    { id: 1, title: 'Primeira OS', description: 'Complete sua primeira Ordem de Serviço', icon: '🎯', completed: true, date: '2024-01-15' },
    { id: 2, title: 'Velocista', description: 'Complete 10 OS em um dia', icon: '⚡', completed: true, date: '2024-02-20' },
    { id: 3, title: 'Perfeccionista', description: 'Complete 50 OS sem erros', icon: '🏆', completed: false, progress: 35 },
    { id: 4, title: 'Colaborador', description: 'Ajude 5 colegas com suas OS', icon: '🤝', completed: false, progress: 2 },
    { id: 5, title: 'Inovador', description: 'Sugira 3 melhorias implementadas', icon: '💡', completed: false, progress: 1 },
    { id: 6, title: 'Veterano', description: 'Complete 1000 OS', icon: '🥇', completed: false, progress: 456 },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Conquistas</h1>
        <p className="text-gray-600">Acompanhe seu progresso e desbloqueie novas conquistas</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {achievements.filter(a => a.completed).length}
          </div>
          <div className="text-sm text-green-700">Conquistas Desbloqueadas</div>
        </div>
        <div className="bg-blue-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {achievements.filter(a => !a.completed).length}
          </div>
          <div className="text-sm text-blue-700">Em Progresso</div>
        </div>
        <div className="bg-purple-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round((achievements.filter(a => a.completed).length / achievements.length) * 100)}%
          </div>
          <div className="text-sm text-purple-700">Progresso Total</div>
        </div>
      </div>

      {/* Lista de Conquistas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
              achievement.completed ? 'border-green-500' : 'border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <span className={`text-3xl mr-4 ${achievement.completed ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </span>
                <div>
                  <h3 className={`text-lg font-semibold ${
                    achievement.completed ? 'text-gray-800' : 'text-gray-600'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
              {achievement.completed && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Completo
                </span>
              )}
            </div>

            {achievement.completed ? (
              <div className="text-sm text-gray-500">
                Desbloqueado em {new Date(achievement.date!).toLocaleDateString('pt-BR')}
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progresso</span>
                  <span>{achievement.progress}/{achievement.title === 'Perfeccionista' ? 50 : achievement.title === 'Colaborador' ? 5 : achievement.title === 'Inovador' ? 3 : 1000}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(achievement.progress! / (achievement.title === 'Perfeccionista' ? 50 : achievement.title === 'Colaborador' ? 5 : achievement.title === 'Inovador' ? 3 : 1000)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};