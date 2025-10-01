import React from 'react';
import { SlidingSidebar } from '../components/SlidingSidebar';
import { ProfileScreen } from '../components/ProfileScreen';

/**
 * Tela de Perfil do Usuário
 * 
 * Esta tela utiliza o SlidingSidebar para manter a navegação consistente
 * O componente ProfileScreen é renderizado dentro do SlidingSidebar
 */
export default function ProfilePage() {
  return (
    <SlidingSidebar>
      <ProfileScreen />
    </SlidingSidebar>
  );
}