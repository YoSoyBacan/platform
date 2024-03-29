export const ECUADOR_TAX_RATE = 0.12;

export enum UserType {
    CONSUMER = 'Comprador',
    BUSINESS = 'Negocio'
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
    THIRTY_FIVE_PERCENT = 0.35,
    FORTY_PERCENT = 0.4,
    FIFTY_PERCENT = 0.5
}

// TODO: Lista de Bancos de Ecuador completa
export enum BankOptions {
    PRODUBANCO = 'Produbanco',
    PICHINCHA = 'Banco del Pichincha',
    GUAYAQUIL = 'Banco de Guayaquil',
    BANCO_PACIFICO = 'Banco de Pacifico',
    BANCO_INTERNACIONAL = "Banco Internacional",
    BANCO_SOLIDARIO = "Banco Solidario",
    BANCO_DINERS_CLUB = "Banco Diners Club",
    BANCO_PRO_CREDIT = "Banco ProCredit",
    BANCO_BOLIVARIANO = "Banco Bolivariano",
    BIESS = "BIESS",
    BANCO_GENERAL_RUMINAUI = "Banco General Rumiñahui",
    BANCO_LOJA = "Banco de Loja",
    BANCO_MACHALA = "Banco de Machala"
};

export enum EntityType {
    PERSONA_NATURAL = 'Persona Natural',
    PERSONA_JURIDICA = 'Persona Juridica'
}

export enum BankAccountType {
    AHORROS = 'Ahorros',
    CORRIENTE = 'Corriente'
}

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

export const VoucherOptionValuesC = {
    FIVE: 5,
    TEN: 10,
    FIFTEEN: 15,
    TWENTY: 20,
    TWENTY_FIVE: 25,
    THIRTY: 30,
    THIRTY_FIVE: 35,
    FORTY: 40,
    FORTY_FIVE: 45,
    FIFTY: 50
}