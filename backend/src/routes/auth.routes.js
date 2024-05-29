import { Router } from "express";
import {validarUser, verificarUserToken} from "../controllers/auth.controller.js"

const routerAuth = Router()

routerAuth.post("/login", validarUser)
routerAuth.get("/validate", verificarUserToken)

export default routerAuth