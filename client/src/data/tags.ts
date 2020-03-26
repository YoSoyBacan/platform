import { CategoriaEnum, TagDetailResult, TagListResult, TagStatusEnum } from './api';

export const TagListMock: TagListResult = {
    num_results: 4,
    results: [{
        id: '1',
        modelo: 'Small',
        categoria: CategoriaEnum.ALIMENTOS,
        plantilla: 'Basic',
        señal: 'Buena',
        status: TagStatusEnum.PUSHED,
        producto: {
            id: '1',
            name: 'Galletas Oreo'
        },
        lastUpdatedEpoch: Date.now()
    }]
}

export const TagDetailMock: TagDetailResult = {
    previewUrl: 'https://via.placeholder.com/200',
    id: '111111',
    providerId: '2',
    sn: '11111111',
    status: TagStatusEnum.IN_PROGRESS,
    battery: 100,
    signal: '-49',
    lastUpdated: Date.now()
}