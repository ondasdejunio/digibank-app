import express from 'express'
import { filterByVehicle, filterBySegment, filterByProductType, getAllProducts, getProduct, updateProductName } from '../controllers/AppController.js'
const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getProduct)
router.put('/:id', updateProductName)
router.get('/:id/filtrarTipo', filterByProductType)
router.get('/:id/filtrarSegmento', filterBySegment)
router.get('/:id/filtrarVehiculo', filterByVehicle)


export default router