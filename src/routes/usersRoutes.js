// ************ Require's ************
const express=require('express');

// ************ Controller Require ************
const usersControllers=require('../controllers/usersControllers');

// ************ Middlewares ************
var uploadFile = require ('../middlewares/multerUsers');
var usersValidations = require ('../middlewares/userRegisterValidattor');
var loginValidations = require ('../middlewares/loginValidattor');
var guestMiddleware =require ('../middlewares/guestMiddleware');
var authMiddleware =require ('../middlewares/authMiddleware');

// ************ router() ************
const router=express.Router();


// ************ Rutas ************
//Formulario de registro
router.get('/register', guestMiddleware, usersControllers.register);

//Procesar el registro
router.post('/register', uploadFile.single('image_profile'), usersValidations, usersControllers.ProcessRegister);

//Formulario de login
router.get('/login', guestMiddleware, usersControllers.login);

// Editar usuarios
router.get('/editUser/:id/', authMiddleware, usersControllers.editUser);
router.put('/editUser/:id/', uploadFile.single('imageEdited1'), usersValidations, usersControllers.updateUser); 


//Procesa la validacion delogin
router.post('/login', loginValidations, usersControllers.loginProcess);

//perfil de Usuario
router.get('/profile', authMiddleware,  usersControllers.profile);

//logout
router.get('/logout', usersControllers.logout);

/* Ruta eliminar usuario en forma lógica */
router.delete('/delete/:id', usersControllers.delete); 

module.exports=router;