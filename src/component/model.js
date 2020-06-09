import * as cocoSsd from "@tensorflow-models/coco-ssd";

export async function coco() {
    // Promesa que carga el modelo
    const loadCoco = cocoSsd.load({base: "mobilenet_v2"});
    return loadCoco;
}

export default coco;