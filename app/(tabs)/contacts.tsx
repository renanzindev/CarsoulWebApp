import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { router } from 'expo-router';
import { DashboardHeader, getHeaderStyles, getHeaderScript } from '@/components/DashboardHeader';
import { ProfileCard, getProfileCardStyles } from '@/components/ProfileCard';
import { ContactsSection, getContactsStyles } from '@/components/ContactsSection';
import { getIconStyles, getBaseStyles, getResponsiveStyles } from '@/components/DashboardStyles';

export default function ContactsScreen() {
  // Função para lidar com mensagens do WebView
  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'navigate') {
        switch(data.route) {
          case '/contacts':
            router.push('/contacts');
            break;
          case '/':
            router.push('/');
            break;
          default:
            console.log('Rota não implementada:', data.route);
        }
      }
    } catch (error) {
      console.log('Erro ao processar mensagem do WebView:', error);
    }
  };

  // Tela de Contatos Úteis - Mantém padrão visual do dashboard
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>CarSoul - Contatos Úteis</title>
        <style>
            ${getBaseStyles()}
            ${getHeaderStyles()}
            ${getProfileCardStyles()}
            ${getContactsStyles()}
            ${getIconStyles()}
            ${getResponsiveStyles()}
            
            /* Estilos específicos para a tela de contatos */
            body {
                background: #FFFFFF;
                min-height: 100vh;
            }
            
            .container {
                background: transparent;
            }
            
            .profile-card {
                margin-bottom: 16px;
            }
            
            @media (max-width: 768px) {
                .nav-links {
                    display: none;
                }
                
                .header {
                    padding-left: 12px;
                    padding-right: 12px;
                }
                
                .container {
                    padding: 0 12px;
                }
            }
        </style>
        <script>
            ${getHeaderScript()}
        </script>
     </head>
    <body>
        <div class="container">
            ${DashboardHeader({})}
            
            ${ProfileCard({})}
            
            ${ContactsSection({})}
        </div>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        onMessage={handleWebViewMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});