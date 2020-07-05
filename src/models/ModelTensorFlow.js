import * as cocoSsd from "@tensorflow-models/coco-ssd";

export default class ModelTensorFlow{
    static instance = null;

    static getInstance (){
        if(this.instance == null){
            this.instance = new ModelTensorFlow();
        }
        return this.instance;
    }

    async cargarModelo() {
        // Promesa que carga el modelo
        const loadCoco = cocoSsd.load({base: "mobilenet_v2"});
        return loadCoco;
    }
}