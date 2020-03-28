export const ECUADOR_TAX_RATE = 0.12;

export enum UserType {
    CONSUMER = 'Comprador',
    BUSINESS = 'Establecimiento'
};

export enum AuthMethods {
    EMAIL = 'Email',
    TELEFONO = 'Telefono',
    FACEBOOK = 'Facebook',
    GOOGLE = 'Google',
};

export enum PaymentMethod {
    CARD = 'Tarjeta',
    PAYPHONE = 'Payphone',
    TRANSFER = 'Transferencia'
};

export enum OrderStatus {
    PAID = 'Pagada',
    PENDING = 'En Proceso',
    REJECTED = 'Rechazada',
    ERROR = 'Error'
};

export enum Currency {
    USD = 'Dolares',
    COP = 'Pesos Colombianos',
};
// TODO: Finish indutry list
export enum Industries {
    RESTAURANT = 'Restaurante'
}

export enum PercentageDiscount {
    FIFTEEN_PERCENT = 0.15,
    TWENTY_PERCENT = 0.2,
    TWENTY_FIVE_PERCENT = 0.25,
    THIRTY_PERCENT = 0.3,
    THIRTY_FIVE_PERCENT = 0.35
}

// TODO: Lista de Bancos de Ecuador completa
export enum BankOptions {
    PRODUBANCO = 'PRODUBANCO',
    PICHINCHA = 'BANCO PICHINCHA',
    GUAYAQUIL = 'BANCO GUAYAQUIL',
    BANCO_PACIFICO = 'BANCO PACIFICO',

};

export enum NotificationType {
    SUCCESS = 'Éxito',
    ERROR = 'Error',
    WARNING = 'Advertencia'
};

export enum NotificationDeliveryMethod {
    EMAIL = 'E-mail',
    SMS = 'SMS',
    PUSH = 'Push Notification'
};

export enum CountryOptions {
    ECUADOR = 'ECUADOR',
    COLOMBIA = 'COLOMBIA'
};

export enum VoucherOptionsValues {
    FIVE = 5,
    TEN = 10,
    FIFTEEN = 15,
    TWENTY = 20,
    TWENTY_FIVE = 25,
    THIRTY = 30,
    THIRTY_FIVE = 35,
    FORTY = 40,
    FORTY_FIVE = 45,
    FIFTY = 50
};