import { Main } from '@/components/Main';
import { SwipeBackWrapper } from '@/components/SwipeBackWrapper';
import { SlidingSidebar } from '@/components/SlidingSidebar';

/**
 * Tela de Fechamento de OS
 * Agora utiliza o componente Main dinâmico para renderização
 */
export default function OSScreen() {
  return (
    <SlidingSidebar>
      <SwipeBackWrapper>
        <Main />
      </SwipeBackWrapper>
    </SlidingSidebar>
  );
}