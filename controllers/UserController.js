import bcrypt from 'bcryptjs';
import models from '../models';
import token from '../services/token';

export default {
    register: async(req, res) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user = await models.User.create(req.body);
            res.status(200).json(user);
            
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIO UN PROBLEMA'
            });
            console.log(error);
        }
    },
    login: async(req, res) => {
        try {
            const user = await models.User.findOne({email: req.body.email, state: 1});
            if(user){
                let compare = await bcrypt.compare(req.body.password, user.password);
                if(compare){
                   let tokenTemp = await token.encode(user._id, user.rol, user.email);
                   const USER_FRONTEND = {
                    token: tokenTemp,
                    user: {
                        name: user.name,
                        lastname: user.lastname,
                        email: user.email
                    }
                   }

                   res.status(200).json({
                    USER_FRONTEND: USER_FRONTEND,
                   })
                }else {
                    res.status(500).send({
                        message: "CONTRASEÑA INCORRECTA"
                    });
                }
            }else {
                res.status(500).send({
                    message: "EL USUARIO NO EXISTE"
                });
            }
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIO UN PROBLEMA'
            });
            console.log(error);
        }
    },
    update: async(req, res) => {
        try {
            if(req.body.password){
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const UserT = await models.User.findByIdAndUpdate({_id: req.body._id}, req.body);
            res.status(200).json({
                message: "EL USUARIO SE HA ACTUALIZADO CORRECTAMENTE",
                user: UserT
            });
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIO UN PROBLEMA',
            });
            console.log(error);
        }
    },
    list: async(req, res) => {
        try {
            var search = req.body.search;
            const Users = await models.User.find({
                $or: [
                    {"name": new RegExp(search, "i")},
                    {"lastname": new RegExp(search, "i")},
                    {"email": new RegExp(search, "i")},
                ]
            }).sort({'createAt': -1});
            res.status(200).json({
                users: Users,
            })
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIO UN PROBLEMA',
            });
            console.log(error);
        }
    },
    remove: async(req, res) => {
        try {
            const User = await models.User.findByIdAndDelete({_id: req.body._id});
            res.status(200).json({
                message: "EL USUARIO SE ELIMINO CORRECTAMENTE",
            });
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIO UN PROBLEMA',
            });
            console.log(error);
        }
    }
}