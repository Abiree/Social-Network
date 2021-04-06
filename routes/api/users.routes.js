const express = require('express');
const router = express.Router();
//include controller
const userCont = require('../../controller/userController');
//routes
//get
router.get('/',userCont.getAllUsers);
router.get('/:id', userCont.getUser);
//post
router.post('/signup',userCont.signUp);
//put
router.put('/:id', userCont.updateUser);
//patch
router.patch('/friends/:id',userCont.acceptInvitation);
router.patch('/invitations/:id',userCont.sendInvitation);
//delete
router.delete('/:id',userCont.deleteUser);


module.exports=router;