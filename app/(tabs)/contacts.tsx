import { Main } from '../../components/Main';
import { SwipeBackWrapper } from '../../components/SwipeBackWrapper';

/**
 * Tela de Contatos
 * Agora utiliza o componente Main dinâmico para renderização
 */
export default function ContactsScreen() {
  return (
    <SwipeBackWrapper>
      <Main />
    </SwipeBackWrapper>
  );
}