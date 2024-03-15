import token from '../services/token';

export default {
    verifyAdmin: async(req, res, next) => {
        if(!req.headers.token){
            res.status(404).send({
                message: 'NO SE ENVIO EL TOKEN'
            });
        }
        const response = await token.decode(req.headers.token);
        if(response){
            if(response.rol == "admin"){
                next();
            }else {
                res.status(403).send({
                    message:'NO ESTA PERMITIDO ACCEDER A ESTA RUTA'
                });
            }
        }else {
            res.status(403).send({
                message:'TOKEN INVALIDO O VENCIDO'
            });
        }
    }
}