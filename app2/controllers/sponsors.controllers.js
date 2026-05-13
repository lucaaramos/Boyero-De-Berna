const conn = require("../config/config")
const generateRandomIntegers = require("../lib/randoms")


const createSponsor = (req,res) => {
    const {name,content,webSite} = req.body
    const query = "insert into sponsors (name,content,web_site) values (?,?,?)"
    try {
        conn.query(query,[name,content,webSite], (err,resp) => {
            if(err)  return res.status(500).json({err})
            return res.status(200).json({data:resp?.insertId})
        })
    }catch(e){
        res.status(404).send(e)
    }
}
//  LIMIT ${(number - 1) * 7}, 7

const getSponsors = (req,res) => {
    const queryData = `select * from sponsors where status = '1'`
    try {
        conn.query(queryData,(err,resp) => {
            if(err)  return res.status(500).json({err})
            return res.status(200).json({data:resp})
        })
    }catch(e){
        return res.status(404).send(e)
    }
}

const getSponsorsAleatory = (req,res) => {
    const amount = parseInt(req.params.amount, 10);
    const queryData = `select * from sponsors where status = '1'`
    try {
        conn.query(queryData,(err,resp) => {
            if(err)  return res.status(500).json({err})
            if (!resp?.length) return res.status(200).json({data: []});
            const safeAmount = Number.isNaN(amount) ? 4 : amount;
            const randoms = generateRandomIntegers(resp.length, safeAmount);
            let data = randoms.map(index => resp[index]).filter(Boolean)
            return res.status(200).json({data})
        })
    }catch(e){
        return res.status(404).send(e)
    }
}


const getSponsorById = (req,res) => {
    const {id} = req.params
    const query = "select * from sponsors where status = '1' AND id = ?"
    try {
        conn.query(query,[id], (err,resp) => {
            if(err)  return res.status(500).json({err})
            return res.status(200).json({data:resp[0]})
        })
    }catch(e){
        res.status(404).send(e)
    }
}


const updtateSponsor = (req,res) => {
    const {id} = req.params;
    const {name,content} = req.body;
    const query = "UPDATE sponsors set name = ?, content = ? from sponsors where status = 1 AND id = ?"
    try {
        conn.query(query,[name,content,id],(err,resp) => {
            if(err)  return res.status(500).json({err})
            return res.status(200).json({data:resp.affectedRows ? true : false})
        })
    }catch(e){
        res.status(404).send(e)
    }
}

const deleteSponsor = (req,res) => {
    const {id} = req.params;
    const query = "update sponsors set status = 0 where id = ?"
    try {
        conn.query(query,[id],(err,resp) => {
            if(err)  return res.status(500).json({err})
            return res.status(200).json({data:resp.affectedRows ? true : false})
        })
    }catch(e){
        res.status(404).send(e)
    }
}



module.exports = {
    createSponsor,
    getSponsorById,
    getSponsors,
    deleteSponsor,
    updtateSponsor,
    getSponsorsAleatory
}
