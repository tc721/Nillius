import {Router} from 'express'
import{
    logInCtrl,
    signUpCtrl,
    sendVerificationCode,
    getCode,
} from '../controllers/user.controllers.js'

const router = Router()



router.post('/logIn', logInCtrl)
router.post('/signUp', signUpCtrl)
router.post('/sendVerificationCode', sendVerificationCode);
router.get('/code', getCode)


export default router;