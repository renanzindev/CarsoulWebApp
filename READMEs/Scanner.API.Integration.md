# Integração da API com Componentes de Scanner

Este documento explica como usar os componentes de scanner integrados com a API do projeto.

## Componentes Disponíveis

### 1. QRCodeScanner
Componente para escaneamento de códigos QR com integração automática à API.

### 2. BarcodeScannerSimple
Componente para escaneamento de códigos de barras com integração automática à API.

## Serviço ScannerService

O `ScannerService` foi criado para centralizar todas as operações relacionadas ao escaneamento e comunicação com a API.

### Métodos Disponíveis:

- `processQRCode(qrCode)` - Processa um QR Code na API
- `processBarcode(barcode)` - Processa um código de barras na API
- `getProductByBarcode(barcode)` - Busca produto por código de barras
- `getInfoByQRCode(qrCode)` - Busca informações por QR Code
- `logScan(type, code, action)` - Registra escaneamento para auditoria
- `validateCode(code, type)` - Valida código escaneado

## Como Usar

### Exemplo Básico - QR Code Scanner

```tsx
import { QRCodeScanner } from '../components/QRCodeScanner';

const MyComponent = () => {
  const [scannerVisible, setScannerVisible] = useState(false);

  const handleQRCodeScanned = (code: string, data?: any) => {
    console.log('Código escaneado:', code);
    console.log('Dados da API:', data);
    
    if (data) {
      // Código foi processado com sucesso na API
      Alert.alert('Sucesso', 'QR Code processado com sucesso!');
    } else {
      // Código foi lido mas não processado na API
      Alert.alert('Aviso', 'QR Code lido, mas sem dados da API');
    }
  };

  const handleError = (error: string) => {
    Alert.alert('Erro', error);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setScannerVisible(true)}>
        <Text>Escanear QR Code</Text>
      </TouchableOpacity>

      <QRCodeScanner
        visible={scannerVisible}
        onClose={() => setScannerVisible(false)}
        onCodeScanned={handleQRCodeScanned}
        onError={handleError}
      />
    </View>
  );
};
```

### Exemplo Básico - Barcode Scanner

```tsx
import { BarcodeScannerSimple } from '../components/BarcodeScannerSimple';

const MyComponent = () => {
  const [scannerVisible, setScannerVisible] = useState(false);

  const handleBarcodeScanned = (code: string, data?: any) => {
    console.log('Código escaneado:', code);
    console.log('Dados da API:', data);
    
    if (data) {
      // Código foi processado com sucesso na API
      Alert.alert('Sucesso', 'Código de barras processado com sucesso!');
    } else {
      // Código foi lido mas não processado na API
      Alert.alert('Aviso', 'Código de barras lido, mas sem dados da API');
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setScannerVisible(true)}>
        <Text>Escanear Código de Barras</Text>
      </TouchableOpacity>

      <BarcodeScannerSimple
        visible={scannerVisible}
        onClose={() => setScannerVisible(false)}
        onCodeScanned={handleBarcodeScanned}
      />
    </View>
  );
};
```

## Fluxo de Funcionamento

### QR Code Scanner:
1. Usuário escaneia QR Code
2. Componente registra o escaneamento (`ScannerService.logScan`)
3. Tenta processar o QR Code (`ScannerService.processQRCode`)
4. Se falhar, tenta buscar informações (`ScannerService.getInfoByQRCode`)
5. Retorna o código e dados (se houver) via callback `onCodeScanned`

### Barcode Scanner:
1. Usuário escaneia código de barras
2. Componente registra o escaneamento (`ScannerService.logScan`)
3. Tenta processar o código (`ScannerService.processBarcode`)
4. Se falhar, tenta buscar produto (`ScannerService.getProductByBarcode`)
5. Retorna o código e dados (se houver) via callback `onCodeScanned`

## Tratamento de Erros

Os componentes têm tratamento robusto de erros:

- **Erro de conexão**: Exibe mensagem e ainda retorna o código escaneado
- **Erro de processamento**: Tenta métodos alternativos de busca
- **Erro de permissão**: Solicita permissão da câmera
- **Erro da câmera**: Exibe mensagem de erro e opção para tentar novamente

## Indicadores Visuais

- **Loading**: Mostra indicador de carregamento durante processamento da API
- **Área de escaneamento**: Destaque visual da área onde posicionar o código
- **Instruções**: Texto dinâmico que muda durante o processamento

## Configuração da API

Os endpoints da API são configurados no `ScannerService` e seguem o padrão:

- `POST /{moduleIndex}/scanner/qr-code/process`
- `POST /{moduleIndex}/scanner/barcode/process`
- `GET /{moduleIndex}/produtos/buscar-por-codigo/{barcode}`
- `GET /{moduleIndex}/qr-code/buscar-informacoes/{qrCode}`
- `POST /{moduleIndex}/scanner/log`
- `POST /{moduleIndex}/scanner/validate`

## Exemplo Completo

Veja o arquivo `examples/ScannerExample.tsx` para um exemplo completo de implementação com histórico de escaneamentos e tratamento de diferentes cenários.

## Dependências

- `expo-camera` - Para acesso à câmera
- `@expo/vector-icons` - Para ícones
- `react-native` - Componentes base
- `../Services/ScannerService` - Serviço de integração com API
- `../config/Api` - Configuração da API

## Notas Importantes

1. **Permissões**: Os componentes solicitam automaticamente permissão da câmera
2. **Offline**: Se a API estiver indisponível, o código ainda é retornado
3. **Auditoria**: Todos os escaneamentos são registrados para auditoria
4. **Performance**: Loading indicators evitam múltiplos escaneamentos simultâneos
5. **Compatibilidade**: Suporta múltiplos tipos de códigos de barras e QR codes