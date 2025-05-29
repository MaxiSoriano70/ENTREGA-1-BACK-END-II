import { connect } from "mongoose";

class DatabaseConnect {
    constructor(url){
        this.url = url;
        if(typeof DatabaseConnect.instance === "object"){
            //console.log("No se crea la instancia, porque ya existe.");
            return DatabaseConnect.instance;
        }
        else{
            //console.log("Se crea la instancia por primera vez.");
            DatabaseConnect.instance = this;
            return this;
        }
    }

    dbConnect = async(url) =>{
    try {
        connect(url);
        console.log("mongo database connected");
    } catch (error) {
        console.log(error);
    }
}
}

export default DatabaseConnect;