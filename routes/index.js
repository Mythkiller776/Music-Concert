var express = require('express');
var router = express.Router();
var fs = require('fs')
var nodemailer = require('nodemailer')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/about',function(req,res,next){
  res.render('about')
})
router.get('/gallery',function(req,res,next){
  res.render('gallery')
})
router.get('/contact',function(req,res,next){
  res.render('contact')
})
router.post('/submit', function(req,res){
  let name = req.body.name
  let email =req.body.email
  let number = req.body.number
   fs.appendFile('data.txt',`name:${name},email:${email},number:${number}\n`, function(e){
     if(e){
       console.log(e)
     }
   })
   var transporter = nodemailer.createTransport({
     service:'gmail',
      auth:{
        user:'musicconcert776@gmail.com',
        pass:'Mithil1234'
      }
   })
   var mailOptions = {
     from:'Musicconcert776@gmail.com',
     to:req.body.email,
     subject:'Ticket booked successfully',
    text:'Congratulations !! You have successfully booked the tickets for the upcoming event and your response is recorded'     
   }
   transporter.sendMail(mailOptions,function(error,info){
     if(error){ 
       console.log(error)
     }
     else{
       res.render('success')
     }
   })
})
module.exports = router;
 

