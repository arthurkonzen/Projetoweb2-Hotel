// src/utils/errors.js
class RiseError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true; // Identifica erros intencionais
    }
  }
  
  class ValidationError extends RiseError {
    constructor(message) {
      super(message, 400); // Status HTTP 400 para erros de validação
      this.name = "ValidationError";
    }
  }
  
  class AuthorizationError extends RiseError {
    constructor(message) {
      super(message, 403); // Status HTTP 403 para erros de permissão
      this.name = "AuthorizationError";
    }
  }
  
  class NotFoundError extends RiseError {
    constructor(message) {
      super(message, 404); // Status HTTP 404 para recursos não encontrados
      this.name = "NotFoundError";
    }
  }
  
  export { RiseError, ValidationError, AuthorizationError, NotFoundError };  