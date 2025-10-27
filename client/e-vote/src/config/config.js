// src/config/config.js
const config = {
    // API Endpoints
    API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    BLOCKCHAIN_API: process.env.REACT_APP_BLOCKCHAIN_API || 'http://localhost:8545',
    FOG_NODE_API: process.env.REACT_APP_FOG_NODE_API || 'http://localhost:3001/api',
    
    // Blockchain Configuration
    ETHEREUM: {
      NETWORK_ID: process.env.REACT_APP_NETWORK_ID || '5777',
      CONTRACT_ADDRESS: process.env.REACT_APP_CONTRACT_ADDRESS || '0x...',
      GAS_LIMIT: 3000000,
    },
    
    // Biometric Settings
    BIOMETRIC: {
      FACE_RECOGNITION_TIMEOUT: 10000, // 10 seconds
      FINGERPRINT_TIMEOUT: 8000, // 8 seconds
      MAX_RETRY_ATTEMPTS: 3,
      CONFIDENCE_THRESHOLD: 0.85,
    },
    
    // Security Settings
    SECURITY: {
      ENCRYPTION_ALGORITHM: 'AES-256',
      SESSION_TIMEOUT: 1800000, // 30 minutes
      MAX_LOGIN_ATTEMPTS: 3,
      TOKEN_EXPIRY: 3600, // 1 hour
    },
    
    // Application Settings
    APP: {
      SUPPORTED_LANGUAGES: ['en', 'hi', 'mr', 'ta', 'te', 'bn'],
      DEFAULT_LANGUAGE: 'en',
      VOTING_DURATION: 86400000, // 24 hours
      RESULTS_VISIBLE: false,
    },
    
    // Performance Settings
    PERFORMANCE: {
      MAX_CONCURRENT_USERS: 10000,
      VERIFICATION_TIMEOUT: 2000, // 2 seconds
      CACHE_DURATION: 300000, // 5 minutes
    },
    
    // Admin Settings
    ADMIN: {
      DASHBOARD_REFRESH_INTERVAL: 5000, // 5 seconds
      MAX_EXPORT_RECORDS: 50000,
    },
  };
  
  export default config;