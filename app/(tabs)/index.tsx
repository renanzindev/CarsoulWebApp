import { Main } from '@/components/Main';
import { SlidingSidebar } from '@/components/SlidingSidebar';

/**
 * Tela principal do Dashboard
 * Agora utiliza o componente Main dinâmico para renderização
 */
export default function TabOneScreen() {
  return (
    <SlidingSidebar>
      <Main />
    </SlidingSidebar>
  );
}