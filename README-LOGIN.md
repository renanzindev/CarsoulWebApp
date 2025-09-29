# Tela de Login - React Native

## Visão Geral

A tela de login foi criada e integrada à aplicação React Native. Ela substitui a versão React original e inclui:

- **Autenticação com credenciais**: admin@admin.com / admin
- **Gerenciamento de estado**: Usando Context API
- **Persistência**: AsyncStorage para manter login
- **Navegação**: Integrada com Expo Router
- **Estilização**: React Native StyleSheet com design moderno

## Arquivos Criados

### 1. `components/Login.tsx`
- Componente principal da tela de login
- Formulário com validação
- Loading state durante autenticação
- Estilização com tema escuro

### 2. `contexts/AuthContext.tsx`
- Context para gerenciar estado de autenticação
- Funções de login/logout
- Persistência com AsyncStorage

### 3. `components/AuthWrapper.tsx`
- Wrapper que controla exibição login vs app
- Integra com AuthContext
- Gerencia loading states

## Como Funciona

### Fluxo de Autenticação

1. **Inicialização**: App verifica se usuário está logado
2. **Login**: Se não logado, mostra tela de login
3. **Credenciais**: admin@admin.com / admin
4. **Sucesso**: Salva token e mostra app principal
5. **Logout**: Remove token e volta para login

### Credenciais de Teste

```
Email: admin@admin.com
Senha: admin
```

### Integração

A tela de login foi integrada no `app/_layout.tsx` usando o `AuthWrapper`:

```tsx
<AuthWrapper>
  <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="+not-found" />
  </Stack>
</AuthWrapper>
```

### Logout

O botão de logout está disponível na sidebar (☰) no header da aplicação.

## Funcionalidades

- ✅ Validação de campos obrigatórios
- ✅ Loading state durante login
- ✅ Mensagens de erro
- ✅ Persistência de sessão
- ✅ Logout funcional
- ✅ Design responsivo
- ✅ Tema escuro
- ✅ Animações suaves

## Próximos Passos

Para usar em produção, você pode:

1. **Integrar com API real**: Substituir credenciais hardcoded
2. **Adicionar recuperação de senha**: Implementar "Esqueci minha senha"
3. **Melhorar segurança**: Usar tokens JWT reais
4. **Adicionar biometria**: Face ID / Touch ID
5. **Implementar refresh tokens**: Para sessões mais seguras

## Testando

1. Execute a aplicação: `npm start`
2. Acesse via web, iOS ou Android
3. Use as credenciais de teste
4. Teste o logout via sidebar
5. Verifique persistência fechando/abrindo app