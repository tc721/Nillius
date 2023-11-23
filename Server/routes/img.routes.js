import {Router} from 'express'
import{
    getImg,
    getImgs,
    setImg,
    deleteImg,
} from '../controllers/img.controllers.js'

const router = Router()

router.get('/img/:product_id', getImg)

router.get('/img', getImgs)

router.post('/img/:product_id', setImg)

router.delete('/img/:id', deleteImg)

export default router;