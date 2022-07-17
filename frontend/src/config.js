const apiUrl = 'http://192.168.101.7:8000/productos'
const [routeAllProducts, routeProductType, routeSegmentType] = ['', 'filtrarTipo', 'filtrarSegmento']

export const queryOptions = [
    { key: 'allOption', name: 'Todos los productos'},
    { key: 'productType', name: 'Tipo de producto' },
    { key: 'segmentType', name: 'Tipo de segmento' }
]

export const queryValues = {
    productType: [
        { key: 'optionAuto', name: 'Préstamo Automotor', id: 1 },
        { key: 'optionHouse', name: 'Préstamo Hipotecario', id: 2 },
        { key: 'optionAccount', name: 'Cuentas Vista', id: 3 }
    ],
    segmentType: [
        { key: 'optionYoung', name: 'Jóvenes', id: 1 },
        { key: 'optionStan', name: 'Standard', id: 2 },
        { key: 'optionPrem', name: 'Premium', id: 3 }
    ]
}

export const queryOptionVehicleKey = 'optionAuto'

export const [optionAllProducts, optionByType, optionBySegment] = [queryOptions[0].key, queryOptions[1].key, queryOptions[2].key]

export const filterOptions = [
    { key: 'allOption', name: 'Todos', id: 0 },
    { key: 'carOption', name: 'Carro', id: 1 },
    { key: 'camOption', name: 'Camioneta', id: 2 }
]

export const getRouteAllProducts = () => `${apiUrl}/${routeAllProducts}`
export const getRouteProductType = id => `${apiUrl}/${id}/${routeProductType}`
export const getRouteSegmentType = id => `${apiUrl}/${id}/${routeSegmentType}`
export const putRouteProductName = id => `${apiUrl}/${id}`
export const getAdquisitionId = item => {
    const adquisitionRoute = item.prestamos[0]
    if (adquisitionRoute) {
        const adquisitionId = adquisitionRoute.adquisicion.id
        return adquisitionId
    } else {
        return null
    }
}