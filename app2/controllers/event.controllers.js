const conn = require("../config/config")


const createEvent = (req,res)=>{
    const {title,description,date,place} = req.body
    const { user } = req
    try{
        if(user.type=="admin"){
            if(title?.length || description?.length){
                const query = `INSERT INTO events (title, description, user_id,date,place) VALUES ("${title}", "${description}", "${user.id}",'${date}','${place}')`;
                conn.query(query,(err,results)=>{
                    if(err) res.status(500).send(err)
                    const eventId = results?.insertId;
                    let event = {
                        id: eventId,
                        title,
                        description,
                        userId:user.id,
                    }
                    res.status(200).json(event)
                })
            }else{
                res.status(400).send("missing data")
            }
        }else{
            res.status(401).send("Access denied")
        }
    }catch(err){    
        res.status(400).send(err)
    }
}

const updateEvent = (req,res)=>{
    const {title,description,image,date,place} = req.body
    const {id} = req.params
    const { user } = req
    if(user.type=="admin"){
        conn.query(`select * from events where id= ${id}`,(error,resp)=>{
            const queryTitle = `update events set title = "${title}" , description = "${description}", image = "${image ? image : resp[0].image}", place ="${place}", date="${date ? date : resp[0].date}" WHERE (id = ${id})`
            if(error) res.status(500).send(error)
            if(resp[0]) {
                conn.query(queryTitle)
                res.status(200).json(id)
            }
            else {
                res.status(400).send("missing data")
            }
        })
    }else{
        res.status(401).json("Access denied")
    }
}

const deleteEvent = (req,res)=>{
    const {id} = req.params
    const { user } = req
    if(user.type=="admin"){
        const queryStatus = `update events set status = 0 WHERE (id = ${id})`
        conn.query(`select * from events where id= ${id}`,(error,resp)=>{
            if(error) res.status(500).send(error)
            conn.query(queryStatus,(err,response)=>{
                if(err) res.status(500).send(err)
                if(response.affectedRows) res.status(200).send("ok")
                else res.status(204).send("an ocurred error")
            })
        })
    }else{
        res.status(401).json("Access denied")
    }
}

const getEventList = (_req,res)=>{
    conn.query(`select events.*, users.id as idUser, users.name, users.email from events JOIN users on events.user_id = users.id where events.status = 1 ORDER BY events.date;`,(error,resp)=>{
        if(error) res.status(500).send(error)
        else {
            let data = resp.map(element => {
                return {
                    id: element.id,
                    title: element.title,
                    description: element.description,
                    date:element.date,
                    image: element?.image !== "undefined" ? element?.image : "https://th.bing.com/th/id/OIP.KCBUNS5Iy8kyliWRZRlSOAAAAA?pid=ImgDet&rs=1",
                    place:element.place,
                    user: {
                        name: element.name,
                        email: element.email
                    }
                    
                }
            });
            res.status(200).json(data)
        }
    })
}

const getEventById = (req,res)=>{
    const {id} = req.params
    conn.query(`select events.*, users.id as idUser, users.name, users.email from events JOIN users on events.user_id = users.id where events.id=${id}`,(error,resp)=>{
        if(error) res.status(500).send(error)
        else {
            let data = resp.map(element => {
                return {
                    id: element.id,
                    title: element.title,
                    description: element.description,
                    place:element.place,
                    date:element.date,
                    image: element?.image !== "undefined" ? element?.image : "https://th.bing.com/th/id/OIP.KCBUNS5Iy8kyliWRZRlSOAAAAA?pid=ImgDet&rs=1",
                    user: {
                        name: element.name,
                        email: element.email
                    }
                    
                }
            });
            res.status(200).json(data)
        }
    })
}





const futureEvents = (req, res) =>{
    conn.query(`SELECT events.*, users.id as idUser, users.name, users.email FROM events JOIN users on events.user_id = users.id WHERE events.status = 1 and date > NOW();`,(error,resp)=>{
        if(error) res.status(500).send(error)
        else {
            let data = resp.map(element => {
                return {
                    id: element.id,
                    title: element.title,
                    description: element.description,
                    date:element.date,
                    image: element?.image !== "undefined" ? element?.image : "https://th.bing.com/th/id/OIP.KCBUNS5Iy8kyliWRZRlSOAAAAA?pid=ImgDet&rs=1",
                    user: {
                        name: element.name,
                        email: element.email
                    }
                }
            });
            res.status(200).json(data)
        }
    })
}

const getCategority = (req,res) =>{
    conn.query("SELECT * FROM events_category",(error,resp)=>{
        if(error) res.status(500).send(error)
        res.status(200).json(resp)
    })
}

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEventList,
    getEventById,
    getEventList,
    futureEvents,
    getCategority
}