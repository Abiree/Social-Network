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
router.patch('/friends/:id',(req,res)=>{

});
//delete
router.delete('/:id',(req,res)=>{

});


module.exports=router;