
export enum CategoriaEnum {
    LIMPIEZA,
    ALIMENTOS    
};
export enum TagStatusEnum {
    PUSHED,
    FAILED_PUSH,
    IN_PROGRESS
};

type ProductLean = {
    id: string;
    name: string;
}

export type TagRow = {
    id: string;
    modelo: string;
    plantilla: string;
    status: TagStatusEnum;
    señal: string;
    producto: ProductLean;
    categoria: CategoriaEnum;
    lastUpdatedEpoch: number;
}

export type TagListResult = {
    results: TagRow[];
    num_results: number
};

export type TagDetailResult = {
    previewUrl: string;
    id: string;
    providerId: string;
    sn: string;
    status: TagStatusEnum;
    battery: number;
    signal: string
    lastUpdated: number;
}