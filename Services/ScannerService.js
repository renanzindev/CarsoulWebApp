import Api from '../config/Api';
import Utils from '../config/Utils';

let moduleIndex = '';
const v3 = true;

const ScannerService = {
  // Processa código de barras escaneado
  processBarcode: async (barcode) => {
    try {
      await Utils.defaultModuleIndex(v3).then((result) => {
        moduleIndex = result;
      });

      const result = await Api.post(
        `/producao/prefechamento/consultar/codigo`,
        { codigo_servico: barcode }
      );

      return [result.ok, result.data];
    } catch (error) {
      console.error('Erro ao processar código de barras:', error);
      return [false, error];
    }
  },

  // Busca produto por código de barras
  getProductByBarcode: async (barcode) => {
    try {
      await Utils.defaultModuleIndex(v3).then((result) => {
        moduleIndex = result;
      });

      const result = await Api.get(
        `${moduleIndex}/produtos/buscar-por-codigo/${barcode}`
      );

      return [result.ok, result.data];
    } catch (error) {
      console.error('Erro ao buscar produto por código de barras:', error);
      return [false, error];
    }
  },

  // Registra escaneamento para auditoria
  logScan: async (type, code, action = 'scan') => {
    try {
      await Utils.defaultModuleIndex(v3).then((result) => {
        moduleIndex = result;
      });

      const result = await Api.post(
        `${moduleIndex}/scanner/log`,
        { 
          type: type, // 'barcode'
          code: code,
          action: action,
          timestamp: new Date().toISOString()
        }
      );

      return [result.ok, result.data];
    } catch (error) {
      console.error('Erro ao registrar escaneamento:', error);
      return [false, error];
    }
  },

  // Valida código escaneado
  validateCode: async (code, type = 'auto') => {
    try {
      await Utils.defaultModuleIndex(v3).then((result) => {
        moduleIndex = result;
      });

      const result = await Api.post(
        `${moduleIndex}/scanner/validate`,
        { 
          code: code,
          type: type
        }
      );

      return [result.ok, result.data];
    } catch (error) {
      console.error('Erro ao validar código:', error);
      return [false, error];
    }
  },

  // Busca OS por código escaneado
  getOSByCode: async (code) => {
    try {
      await Utils.defaultModuleIndex().then((result) => {
        moduleIndex = result;
      });

      const result = await Api.post(
        `${moduleIndex}/prefechamento/consultar/codigo`,
        { codigo: code }
      );

      return [result.ok, result.data];
    } catch (error) {
      console.error('Erro ao buscar OS por código:', error);
      return [false, error];
    }
  }
};

export default ScannerService;