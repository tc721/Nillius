import {Router} from 'express'
import{
    getProducts,
    getProductsId,
    getProduct,
    setProduct,
    updateProduct,
    deleteProduct,
    getProductCategory,
} from '../controllers/products.controllers.js'

const router = Router()

router.get('/product', getProducts)
router.get('/productsId', getProductsId)
router.get('/product/:id', getProduct)
router.get('/productcategory/:category', getProductCategory)

router.post('/product', setProduct)
router.put('/product/:id', updateProduct)

router.delete('/product/:id', deleteProduct)

export default router;