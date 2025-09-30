import { Main } from '../../components/Main';
import { SwipeBackWrapper } from '../../components/SwipeBackWrapper';
import { SlidingSidebar } from '../../components/SlidingSidebar';

/**
 * Tela de Contatos
 * Agora utiliza o componente Main dinâmico para renderização
 */
export default function ContactsScreen() {
  return (
    <SlidingSidebar>
      <SwipeBackWrapper>
        <Main />
      </SwipeBackWrapper>
    </SlidingSidebar>
  );
}