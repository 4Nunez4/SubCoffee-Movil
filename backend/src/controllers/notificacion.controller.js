import {pool} from "../database/conexion.js"

export const getNotificacion = async (req, res) => {
    try {
        const id = req.params
        let sql = `SELECT * FROM notificaciones WHERE pk_id_not = '${id}'`
        const [result] = await pool.query(sql)
        if(result.length > 0) {
            res.status(200).json({message:"noficaciones encontradas con exito", data:result})
        }else {
            res.status(404).json({message:"Error al encontrar las notificacinoes con el ID"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const getNotificaciones = async (req, res) => {
    try {
        let sql = `SELECT * FROM notificaciones`
        const [result] = await pool.query(sql)
        if(result.length > 0) {
            res.status(200).json({message:"notificaciones encontradas con exito", data:result})
        }else {
            res.status(404).json({message:"No se encontraron notificaiones"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const createNotificacion = async (req, res) => {
    try {
        const {tipo_not, texto_not, fk_id_subasta, fk_id_usuario} = req.body
        let sql = `INSERT INTO notificaciones(tipo_not, texto_not, fk_id_subasta, fk_id_usuario) VALUES ('${tipo_not}', '${texto_not}', '${fk_id_subasta}', '${fk_id_usuario}')`
        const [result] = await pool.query(sql)
        if(result.affectedRows > 0){
            res.status(200).json({message:"Notificacion creada con exito"})
        }else {
            res.status(404).json({message:"Error al crear la notificacion"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const updateNotificacion = async (req, res) => {
    try {
        const id = req.params.id
        const {tipo_not, texto_not} = req.body
        let sql = `UPDATE notificaciones SET tipo_not = COALESCE('${tipo_not}', tipo_not), texto_not = COALESCE('${texto_not}', texto_not) WHERE pk_id_not = '${id}'`
        const [result] = await pool.query(sql)
        if(result.affectedRows > 0){
            res.status(200).json({message:"Notificacion  actualizada con exito"})
        }else {
            res.status(404).json({message:"Error al actualizar la notificacion con el ID"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const deleteNotificacion = async (req, res) => {
    try {
        const id = req.params.id
        let sql = `DELETE FROM notificaciones WHERE pk_id_not = ${id}`
        const [result] = await pool.query(sql)
        if(result.affectedRows > 0) {
            res.status(200).json({message:"Notificacion eliminada con exito"})
        }else {
            res.status(404).json({message:"Error al aliminar la notificacion con el ID"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}
