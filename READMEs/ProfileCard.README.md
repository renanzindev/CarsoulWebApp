# ProfileCard Component

Um componente React Native altamente customizável para exibir informações de perfil do usuário com medalhas e texto motivacional.

## 🚀 Características

- **Múltiplas variantes**: `default`, `compact`, `detailed`
- **Temas pré-definidos**: dark, light, primary, success
- **Geração automática de iniciais**
- **Sistema de medalhas flexível**
- **Totalmente tipado com TypeScript**
- **Estilizado com Tailwind CSS**
- **Altamente customizável**

## 📦 Instalação

O componente já está incluído no projeto. Importe-o assim:

```tsx
import { ProfileCard, ProfileCardUtils, type Medal } from '@/components/ProfileCard';
```

## 🎯 Uso Básico

```tsx
<ProfileCard 
  userName="João Silva"
  userRole="Desenvolvedor"
/>
```

## 🎨 Variantes

### Default
```tsx
<ProfileCard 
  variant="default"
  userName="Maria Santos"
  userRole="Designer"
/>
```

### Compact
```tsx
<ProfileCard 
  variant="compact"
  userName="Pedro Costa"
  userRole="Analista"
/>
```

### Detailed
```tsx
<ProfileCard 
  variant="detailed"
  userName="Ana Oliveira"
  userRole="Tech Lead"
  motivationText="Continue assim! Você está no caminho certo."
/>
```

## 🎭 Temas Pré-definidos

```tsx
// Tema escuro (padrão)
<ProfileCard {...ProfileCardUtils.themes.dark} userName="User" />

// Tema claro
<ProfileCard {...ProfileCardUtils.themes.light} userName="User" />

// Tema primário
<ProfileCard {...ProfileCardUtils.themes.primary} userName="User" />

// Tema de sucesso
<ProfileCard {...ProfileCardUtils.themes.success} userName="User" />
```

## 🏅 Sistema de Medalhas

### Criando medalhas
```tsx
const medals = [
  ProfileCardUtils.createMedal("🏆", true, "Troféu de Excelência"),
  ProfileCardUtils.createMedal("🥇", true, "Medalha de Ouro"),
  ProfileCardUtils.createMedal("🥈", false, "Medalha de Prata")
];

<ProfileCard 
  userName="Campeão"
  medals={medals}
/>
```

### Medalhas customizadas
```tsx
const customMedals: Medal[] = [
  { emoji: "⭐", active: true, title: "Estrela" },
  { emoji: "💎", active: true, title: "Diamante" },
  { emoji: "🚀", active: false, title: "Foguete" }
];
```

## ⚙️ Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|----------|
| `userName` | `string` | `"Renan Oliveira"` | Nome do usuário |
| `userRole` | `string` | `"Desenvolvedor"` | Cargo/função do usuário |
| `userInitials` | `string` | Auto-gerado | Iniciais do usuário |
| `medals` | `Medal[]` | Medalhas padrão | Array de medalhas |
| `motivationText` | `string` | Texto padrão | Texto motivacional |
| `variant` | `'default' \| 'compact' \| 'detailed'` | `'default'` | Variante do componente |
| `showDivider` | `boolean` | `true` | Exibir linha divisória |
| `backgroundColor` | `string` | `'bg-slate-700'` | Classe de cor de fundo |
| `textColor` | `string` | `'text-white'` | Classe de cor do texto |

## 🔧 Utilitários

### ProfileCardUtils.generateInitials()
```tsx
const initials = ProfileCardUtils.generateInitials("João Silva Santos");
// Retorna: "JS"
```

### ProfileCardUtils.createMedal()
```tsx
const medal = ProfileCardUtils.createMedal("🏆", true, "Campeão");
// Retorna: { emoji: "🏆", active: true, title: "Campeão" }
```

### ProfileCardUtils.themes
```tsx
const darkTheme = ProfileCardUtils.themes.dark;
// Retorna: { backgroundColor: 'bg-slate-700', textColor: 'text-white' }
```

## 🎨 Customização Avançada

```tsx
<ProfileCard 
  userName="Roberto Silva"
  userRole="Arquiteto de Software"
  backgroundColor="bg-purple-600"
  textColor="text-yellow-200"
  variant="detailed"
  showDivider={false}
  medals={[
    ProfileCardUtils.createMedal("🚀", true, "Inovação"),
    ProfileCardUtils.createMedal("🎯", true, "Precisão")
  ]}
  motivationText="Sua liderança técnica está inspirando toda a equipe!"
/>
```

## 📱 Responsividade

O componente se adapta automaticamente a diferentes tamanhos de tela:

- **Compact**: Ideal para espaços reduzidos
- **Default**: Balanceado para uso geral
- **Detailed**: Máxima informação em telas maiores

## 🔍 Exemplos Completos

Veja o arquivo `ProfileCard.example.tsx` para exemplos detalhados de uso.

## 🧪 Testes

Para testar o componente:

```tsx
import { ProfileCardDemo } from '@/components/ProfileCard.example';

// Use ProfileCardDemo em uma tela para ver todos os exemplos
```

## 🤝 Contribuição

Para adicionar novas funcionalidades:

1. Atualize a interface `ProfileCardProps`
2. Implemente a lógica no componente
3. Adicione exemplos em `ProfileCard.example.tsx`
4. Atualize esta documentação

## 📄 Licença

Este componente faz parte do projeto AppWebV.