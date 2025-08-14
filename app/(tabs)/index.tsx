import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { DashboardHeader, getHeaderStyles, getHeaderScript } from '@/components/DashboardHeader';
import { ProfileCard, getProfileCardStyles } from '@/components/ProfileCard';
import { QuickAccessCards, getQuickAccessStyles } from '@/components/QuickAccessCards';
import { PerformanceSection, getPerformanceStyles } from '@/components/PerformanceSection';
import { NotificationsSection, getNotificationsStyles } from '@/components/NotificationsSection';
import { QuickActionsSection, getQuickActionsStyles } from '@/components/QuickActionsSection';
import { getIconStyles, getBaseStyles, getResponsiveStyles } from '@/components/DashboardStyles';

export default function DashboardScreen() {
  // Dashboard CarSoul - Layout componentizado
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>CarSoul Dashboard</title>
        <style>
            ${getBaseStyles()}
            ${getHeaderStyles()}
            ${getProfileCardStyles()}
            ${getQuickAccessStyles()}
            ${getPerformanceStyles()}
            ${getNotificationsStyles()}
            ${getQuickActionsStyles()}
            ${getIconStyles()}
            ${getResponsiveStyles()}
            
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
            
            ${QuickAccessCards({})}
            
            ${PerformanceSection({})}
            
            ${NotificationsSection({})}
            
            ${QuickActionsSection({})}
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
