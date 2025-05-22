import { fork } from "child_process";
import sum from "../helpers/sum.helper.js";

const sumCb = (req, res) => {
    const result = sum();
    return res.json200(result);
};

const sumProcessCb = (req, res) => {
    /* ESTO FUNCIONA SI --WATCH */
    /* CREA UN SUBPROCESO */
    const childProcess = fork("./src/helpers/sumProcess.helper.js");
    /* SE INICIA EL SUBPROCESO */
    childProcess.send("start");
    /* RESPONDO */
    childProcess.on("message", result => res.json200(result));
};

export { sumCb, sumProcessCb }