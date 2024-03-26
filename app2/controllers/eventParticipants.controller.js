const conn = require("../config/config");

const createParticipant = (req,res)=>{
    const {id_events,category_id} = req.params
    const {name,sex,race,registration_number,date_birth,name_dad,name_mom,breeder,name_owner,id_user, expositor} = req.body
    try{
        if(name.length || sex.length || race.length || registration_number.length || date_birth.length || name_dad.length || name_mom.length || breeder.length || name_owner.length || expositor.length){
        const verifyDog = `select * from events_participants where registration_number = '${registration_number}' and id_events = '${id_events}'`
        conn.query(verifyDog,(error,result)=>{
            if(error) res.status(500).send(error)
            if(result.length && result[0].category_id === parseInt(category_id)){
                return res.status(201).send("este perro ya esta inscripto en este evento para esta categoria puede intentar con otra categoria!")
            } else{
                const query = `INSERT INTO events_participants (id_events,name,sex, race, registration_number,date_birth,name_dad,name_mom,breeder,name_owner,category_id,id_user,expositor) VALUES ('${id_events}', '${name}', '${sex}', '${race}', '${registration_number}', '${date_birth}', '${name_dad}', '${name_mom}', '${breeder}', '${name_owner}', '${category_id}',${id_user ? id_user : null}, '${expositor}')`;
                conn.query(query,(err,results)=>{
                    if(err) res.status(500).send(err)
                    const eventId = results?.insertId;
                    let event = {
                        id: eventId,
                        name,
                        sex,
                        race,
                        registration_number,
                        date_birth,
                        name_dad,
                        name_mom,
                        breeder,
                        name_owner,
                        expositor
                    }
                    res.status(200).json(event)
                    // res.status(200).send("OK")

                })
            }
        })
        }else{
            res.status(400).send("missing data")
        }
    }catch(err){    
        res.status(400).send(err)
    }
}


const getAllParticipants = (req, res) => {
    const query = 'SELECT * FROM events_participants';

    conn.query(query, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }

        if (results.length) {
            return res.status(200).json(results);
        } else {
            return res.status(404).send("No participants found");
        }
    });
};



const getParticipantByEventId = (req,res) =>{
    const {eventId} = req.params
    try{
        conn.query(`select * from events_participants where id_events = '${eventId}'`,(err,resp)=>{
            if(err) return res.status(500).send(err)
            return res.status(200).json(resp)
        })
    }catch(err){
        res.status(400).send(err)
    }
}

const getParticipantByEventIdWithGroup = (req,res) =>{
    const {eventId} = req.params
    try{
            conn.query(`select * from events_participants where id_events = '${eventId}'`,(err,resp)=>{
                if(err) return res.status(500).send(err)
                const groupedByCategory = resp.reduce((result, currentItem) => {
                    const categoryId = currentItem.category_id;
                    
                    if (!result[categoryId]) {
                        result[categoryId] = [];
                    }
                    
                    result[categoryId].push(currentItem);
                    
                    return result;
                }, {});
                return res.status(200).json(groupedByCategory)
            })
    }catch(err){
        res.status(400).send(err)
    }
}

const getParticipantsByCategority = (req,res) => {
    const {idCategority} = req.params
    try{
        conn.query(`select * from events_participants where category_id = '${idCategority}'`,(err,resp)=>{
            if(err) return res.status(500).send(err)
            return res.status(200).json(resp)
        })
    }catch(err){
        res.status(400).send(err)
    }
}



module.exports = {
    createParticipant,
    getParticipantByEventId,
    getParticipantsByCategority,
    getParticipantByEventIdWithGroup,
    getAllParticipants
}