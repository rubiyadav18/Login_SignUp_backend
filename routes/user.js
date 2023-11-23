const { resgistration, Login, updateUser, sendotp, verifyotp } = require("../controller/user")

const router = require("express").Router()


router.post('/Signup', resgistration)
router.post('/login', Login)
router.patch('/updateUser/:userId', updateUser)
router.post('/sendotp', sendotp)
router.post('/verifyotp', verifyotp)


module.exports = router

