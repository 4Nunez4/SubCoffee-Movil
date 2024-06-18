import { Router } from "express";
import {
  SubastaAbierta,
  SubastaCerrada,
  SubastaEspera,
  SubastaProceso,
  subastaFiles,
  listar,
  registrar,
  actualizar,
  buscar,
/*   eliminar, */
  buscarSubastaForUser,
  actualizarFechaFin,
  listarSubsActivas,
  getSubGanador,
} from "../controllers/subasta.controllers.js";
import { validarSubasta, } from "../validations/subasta.validation.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const rutasSubastas = Router();

rutasSubastas.post("/subasta", subastaFiles, verificarUserToken, registrar);
rutasSubastas.get("/subasta", /* verificarUserToken, */ listar);
rutasSubastas.get("/subastaganador/:id", verificarUserToken, getSubGanador);
rutasSubastas.get("/subastasActivasMenosCerradas", verificarUserToken, listarSubsActivas);
rutasSubastas.put("/subasta/:id", verificarUserToken, subastaFiles, actualizar);
rutasSubastas.get("/buscar/:id", /* verificarUserToken, */ buscar); 
rutasSubastas.get("/buscarsubforuser/:id", verificarUserToken, buscarSubastaForUser); 
/* rutasSubastas.delete("/eliminar/:id", verificarUserToken, eliminar); */

rutasSubastas.put("/subastaac/:id", verificarUserToken, SubastaAbierta);
rutasSubastas.put("/subastafecha/:id", verificarUserToken, actualizarFechaFin);
rutasSubastas.put("/subastades/:id", verificarUserToken, SubastaCerrada);
rutasSubastas.put("/espera/:id", verificarUserToken, SubastaEspera);
rutasSubastas.put("/proceso/:id", verificarUserToken, SubastaProceso);

export default rutasSubastas;