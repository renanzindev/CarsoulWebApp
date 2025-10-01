import { Main } from '../../components/Main';
import { SwipeBackWrapper } from '../../components/SwipeBackWrapper';

/**
 * Tela de Fechamento de OS
 * Agora utiliza o componente Main dinâmico para renderização
 */
export default function OSScreen() {
  return (
    <SwipeBackWrapper>
      <Main />
    </SwipeBackWrapper>
  );
}