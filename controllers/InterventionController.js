const { ObjectId } = require('mongodb');
const Intervention = require('../models/intervention');



module.exports = {
 addIntervention : (req, res ) =>{
    const {name  , delai , description, lieu, degree, createdBy}= req.body

    if (!name || !delai || !description || !lieu || !degree || !createdBy){
        res.status(400).json({
            message : "all fields is required!"
        })
    }

    try{
        const newIntervention = new Intervention({
            name : name

            , delai : delai , 
            description : description, 
            lieu : lieu, 
            degree : degree
            , createdBy : createdBy
        })
        newIntervention.save().then(()=>{
            res.status(200).json({
                message : "Intervention added!"
            })
        }) // yestanna serivce lin yetsajel
    }catch(err){
        res.status(500).json({
            message : "name , email and tel is required!"
        })
    }

},


 updateIntervention :  async (req, res) => {
     const {affectedBy} = req.body
        if(req.params.id && !req.body.fermer){
            try{
                const inter =  Intervention.findById({_id : req.params.id})
                await  Intervention.findByIdAndUpdate({_id : req.params.id} , { 
                    affectedBy : affectedBy ,
                    affectedToUsers : inter.affectedToUsers ? inter.affectedToUsers.push(affectedBy) : [affectedBy] ,
                    dateDebut: Date.now(),
                    etat : 'EN_COURS',

                }
                );
                res.status(200).json({
                    message : 'Intervention affected to tech successfully'
                })
             
            }catch(err){
                console.log(err)
                res.status(500).json({
                    message : 'error from server'
                })
            }
           

        }else if(req.body.fermer){
            try{
            await Intervention.findByIdAndUpdate({_id : req.params.id} , {
                dateDebut : null,
                etat : 'NON_AFFECTEE',
                affectedBy: null
            });
            res.status(200).json({
                message : 'Intervention updated successfully'
            })
        }catch(err){
            res.status(500).json({
                message : 'error from server'
            })
        }
        }

}
}


