import models from '../models/AppModel.js'

//Métodos

//Mostrar registros
export const getAllProducts = async (req, res) => {
    try {
        const productos = await models.ProductoModel.findAll({
            include: [{
                model: models.TipoProductoModel,
            },
            {
                model: models.DepositoModel,
            },
            {
                model: models.SegmentoModel
            },
            {
                model: models.PrestamoModel,
                include: models.AdquisicionModel
            }]
        });
        res.json(productos)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Mostrar un registro
export const getProduct = async (req, res) => {
    try {
        const producto = await models.ProductoModel.findAll({
            where: {
                id: req.params.id
            },
            include: models.TipoProductoModel
        })
        res.json(producto[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar nombre producto
export const updateProductName = async (req, res) => {
    try {
        await models.ProductoModel.update({
            nombre_producto: req.body['value']
        }, {
            where: { id: req.params.id }
        })
        res.json({ 
            message: 'Datos actualizados con éxito'
     })
    } catch (error) {
        res.json({ message: error.message })
    }
}


//Filtrar por tipo de producto
export const filterByProductType = async (req, res) => {
    try {
        const productosFiltrados = await models.ProductoModel.findAll({
            include: [
                {
                    model: models.TipoProductoModel,
                    where: { id: req.params.id }
                },
                {
                    model: models.DepositoModel,
                },
                {
                    model: models.SegmentoModel
                },
                {
                    model: models.PrestamoModel,
                    include: models.AdquisicionModel
                }
            ]
        });
        res.json(productosFiltrados)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Filtrar por segmento de cliente
export const filterBySegment = async (req, res) => {
    try {
        const productosFiltrados = await models.ProductoModel.findAll({
            include: [
                {
                    model: models.TipoProductoModel,
                },
                {
                    model: models.SegmentoModel,
                    where: { id: req.params.id }
                },
                {
                    model: models.DepositoModel,
                },
                {
                    model: models.PrestamoModel,
                    include: models.AdquisicionModel
                }
            ]
        })
        res.json(productosFiltrados)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Filtrar por tipo de vehiculo
export const filterByVehicle = async (req, res) => {
    try {
        const productosFiltrados = await models.ProductoModel.findAll({
            include: [
                {
                    model: models.TipoProductoModel,
                    where: { id: 1 }, //Prestamo Automotor
                },
                {
                    model: models.PrestamoModel,
                    required: true,
                    include: [{
                        model: models.AdquisicionModel,
                        where: { id: req.params.id }, //1: carro, 2: camioneta
                    }]
                },

            ]
        })
        res.json(productosFiltrados)
    } catch (error) {
        res.json({ message: error.message })
    }
}