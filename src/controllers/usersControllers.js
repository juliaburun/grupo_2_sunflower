const fs = require('fs');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
<<<<<<< HEAD
const User = require('../models/User');
const db = require('../database/models');

=======
const db = require('../database/models')
>>>>>>> c6750b9c4324395e439564ea35ea91276429628d


const controller = {

    register: (req, res) => {
        res.render('./users/register');
    },

<<<<<<< HEAD
    ProcessRegister: async (req, res) =>{
=======
    ProcessRegister: (req, res) => {
>>>>>>> c6750b9c4324395e439564ea35ea91276429628d
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('./users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        db.User.findAll(
            {
                where: { email: req.body.email }
            }
        )
            .then((userInDb) => {
                console.log(userInDb)
                if (userInDb.length > 0) {
                    return res.render('./users/register', {
                        errors: {
                            email: {
                                msg: 'Este email ya está registrado'
                            }
                        },
                        oldData: req.body
                    })
                }

                let userToCreate = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    rol_id: 2,
                    image_profile: req.file ? req.file.filename : "user.jpg",
                    deleted: 0
                }

                db.User.create(
                    userToCreate
                )
                res.redirect('/users/login')

            })
            .catch((error) => res.send(error))
    },

    login: (req, res) => {
        res.render('./users/login');
    },

    loginProcess: (req, res) => {

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
<<<<<<< HEAD
			return res.render('./users/login', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

        
 		/* let userToLogin = User.findByField('email', req.body.email) */
        db.User.findOne(
            {
                where: {
                    email: req.body.email,
                    deleted: 0
                }
            }
        )

        .then(user => {
            let usuarioJson = JSON.parse(JSON.stringify(user));
            let userToLogin = usuarioJson;

            if(userToLogin){
                if(userToLogin.password.substr(0,7) == '$2a$10$'){
                    let isOkPassword = bcryptjs.compareSync( req.body.password, userToLogin.password)
                    if (isOkPassword){
                        delete userToLogin.password;
                        req.session.userLogged = userToLogin;

                        if(req.body.remember_user){
                            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                        }
                        return res.redirect('/users/profile');
                    }
                    return res.render('./users/login', {
                        errors: {
                            password: {
                                msg: 'Las credenciales son inválidas'
                            }
                        },
                        olData: req.body
                    });
                }

                if(userToLogin.password == req.body.password){
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;

                    if(req.body.remember_user){
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                    }

                    return res.redirect('/users/profile'); 
                }

                return res.render('./users/login', {
                    errors: {
                        password: {
                            msg: 'Las credenciales son inválidas'
                        }
                    },
                    olData: req.body
                });
            }
  
            return res.render('./users/login', {
                errors: {
                    email: {
                        msg: 'No se encuentra este email en nuestra base de datos'
                    }
                },
                oldData: req.body
            });
        })
    },

    profile: (req, res) => {
        let user = db.User.findAll({
            where:{
                deleted: 0
            }
        });

        let rols = db.Rol.findAll();

        Promise.all([user, rols])
        .then(([user, rols]) => {
            res.render('./users/profile', {
                user: req.session.userLogged, 
                rols, 
            })
        })
        .catch(function(error){
            console.log(error);
        })
    },

    editUser: (req, res) =>{
        let user = db.User.findOne({
            where:{
                id: req.params.id
            }
        })
        .then (user => {
            res.render ('users/editUser', {
                user
            })
        })
        .catch(function(error){
            console.log(error);
        })
    },

    updateUser: async (req, res) =>{

        const resultValidation = validationResult(req);
     
        let emailChange = false;

        let emailInDb = await db.User.findOne({
            where:{
                id: req.params.id
            }
        })

        .then(user => {
            data = JSON.parse(JSON.stringify(user));
            return data; 
        })

        // Se evalua si el email cambió
        if (emailInDb.email != req.body.email){
            emailChange = true;
        }

        if (emailChange == true){
           let  userInBd = await db.User.findOne({
            where: {
                email: req.body.email,
            }
           })
           .then(user => {
                data = JSON.parse(JSON.stringify(user));
                return data;  
           })


           if (userInBd){
                if(req.file) {
                    if(req.file.filename) {
                        if(req.file.filename != 'user.jpg') {
                            fs.unlinkSync(path.join(__dirname, '../../public/img/users/'+req.file.filename))
                        }
                    }
                }
                return res.render('./users/editUser',{
                    user: emailInDb,
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            }
        }

        let userPassword;

        if(req.body.password != ""){
            userPassword = bcryptjs.hashSync(req.body.password, 10);
        }else{
            userPassword = db.User.password;
        }
        
        db.User.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            image_profile: req.file ? req.file.filename : db.User.image_profile,
            password: userPassword
        },{
            where: {
                id : req.params.id
            }
        })
        .then(() => {
            /* res.send({product}) */
             res.redirect('/users/profile')
        })
        .catch(function(error){
            console.log(error);
        }) 

=======
            return res.render('./users/login', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        db.User.findOne(
            {
                where: { email: req.body.email }
            }
        )
            .then((userToLogin) => {

                if (userToLogin) {
                    let isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
                    if (isOkPassword) {
                        delete userToLogin.password;
                        req.session.userLogged = userToLogin;


                        if (req.body.remember_user) {
                            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 })
                        }

                        return res.redirect('/users/profile')
                    }

                    return res.render('./users/login', {
                        errors: {
                            email: {
                                msg: 'Las credenciales son inválidas'
                            }
                        }
                    })
                }

                return res.render('/users/login', {
                    errors: {
                        email: {
                            msg: 'No se encuentra este email en nuestra base de datos'
                        }
                    }
                })
            }
        )

            .catch((error) => console.log(error))

    },

    profile: (req, res) => {
        return res.render('./users/userEdit', {
            user: req.session.userLogged
        });
>>>>>>> c6750b9c4324395e439564ea35ea91276429628d
    },

    logout: (req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy();
        return res.redirect('/');
    },

<<<<<<< HEAD
    delete: (req, res) => {
        let id = req.params.id
        db.User.findByPk(id)
        .then (() =>{
            db.User.update(
                {
                    deleted:1,
                },
                {
                    where:{
                        id: id,
                    },
                }
            )
        })
        .then(() => {
           res.redirect("/");
        })
    },
=======
    edit: (req,res) => {
       let user = db.User.findOne(
            {
                where: { id: req.params.id }
            }
        )
        .then((user) => res.render('./users/userEdit', { user } ))

    },

    update: (req,res) => {
        console.log('update')
        console.log(req.body)
         db.User.findOne(
            {
                where: { id: req.params.id }
            }
        )
        .then((userToEdit) => {
            
            db.User.update(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    phone: req.body.phone,
                    image_profile: req.file ? req.file.filename : 'imagen'/* userToEdit.image_profile */,
                },
                {
                    where: {id: req.params.id}
                })
            .then(()=> {
                return res.redirect('/users/profile')})            
            .catch(error => res.send(error))

        })

    }



>>>>>>> c6750b9c4324395e439564ea35ea91276429628d
}

module.exports = controller;