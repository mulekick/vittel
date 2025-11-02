/**
 * Common shared enums.
 * @module
 * @remarks
 * - Scope : DOMAIN.
 * - This module can be imported in node.js based packages as well as browser packages.
 */

/**
 * Enum used for domain errors definitions.
 * @enum
 */
export enum domainErrors {
    USER_AUTHENTICATION_FAILED = `userAuthenticationFailed`,
    FILE_UPLOAD_FAILED = `fileUploadFailed`,
    GENERIC_DOMAIN_ERROR = `genericDomainError`
};

/**
 * Enum used for simulated message queue events.
 * @enum
 */
export enum domainEvents {
    EVT_PROCESS_DATA = `processData`,
    EVT_PERSIST_DATA = `persistData`,
    EVT_DATA_PROCESSED = `dataProcessed`,
    EVT_DATA_PERSISTED = `dataPersisted`
};