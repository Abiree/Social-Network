const express = require('express');
const router = express.Router();
//include controller
const auth = require('../../controller/authentification');

//routes
//get
router.get('/',(req,res)=>{

});
router.get('/:id',(req,res)=>{

});
//post
router.post('/signup',auth.signUp);
//put
router.put('/:id',(req,res)=>{

});
//patch
router.patch('/friends/:id',(req,res)=>{

});
//delete
router.delete('/:id',(req,res)=>{

});


module.exports=router;