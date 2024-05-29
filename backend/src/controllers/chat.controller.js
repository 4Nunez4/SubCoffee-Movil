import {pool} from "../database/conexion.js"

export const getChat = async (req, res) => {
    try {
        const id = req. params.id
        let sql = `SELECT * FROM chat WHERE pk_id_chat = ${id}`
        const [result] = await pool.query(sql)
        if(result.length > 0){
            res.status(200).json({message:"Chat encontrados con exito", data:result})
        }else {
            res.status(404).json({message:"Error al buscar el chat con el ID"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const getChats = async (req, res) => {
    try {
        let sql = `SELECT * FROM chat`
        const [result] = await pool.query(sql)
        if(result.length > 0) {
            res.status(200).json({message:"Chats encontrados con exito", data:result})
        }else {
            res.status(404).json({message:"Error al buscar los chats"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const createChat = async (req, res) => {
    try {
        const {mensaje_chat, fk_id_subasta, fk_id_usuario} = req.body
        let sql = `INSERT INTO chat(mensaje_chat, fk_id_subasta, fk_id_usuario) VALUES ('${mensaje_chat}', '${fk_id_subasta}', '${fk_id_usuario}')`
        const [result] = await pool.query(sql)
        if(result.affectedRows > 0){
            res.status(200).json({message:"Chat creado con exito", data:result})
        }else {
            res.status(404).json({message:"Error al crear el chat"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const updateChat = async (req, res) => {
    try {
        const id = req.params.id
        const {mensaje_chat} = req.body
        let sql = `UPDATE chat SET mensaje_chat = COALESCE('${mensaje_chat}', mensaje_chat) WHERE pk_id_chat = '${id}'`
        const [result] = await pool.query(sql)
        if(result.affectedRows > 0){
            res.status(200).json({message:"Chat creado con exito"})
        }else {
            res.status(404).json({message:"Error al actualizar el chat con el ID"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const deleteChat = async (req, res) => {
    try {
        const id = req.params.id
        let sql = `DELETE FROM chat WHERE pk_id_chat = '${id}'`
        const [result] = await pool.query(sql)
        if(result.affectedRows > 0) {
            res.status(200).json({message:"Chat eliminado con exito"})
        }else {
            res.status(404).json({message:"Error al eliminar el chat con el ID"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}