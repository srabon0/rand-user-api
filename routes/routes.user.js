const express = require('express');
const userController = require('../controllers/user.controller')
const router = express.Router()


router.get('/all',userController.getAllUser);
router.get('/random',userController.getARandomUser);
router.delete('/delete',userController.deleteSpecificUser);
router.post('/save',userController.saveUser);
router.patch('/update',userController.updateUser);
router.patch('/bulk-update',userController.bulkUserUpdate);
module.exports = router