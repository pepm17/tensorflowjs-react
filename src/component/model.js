import * as cocoSsd from "@tensorflow-models/coco-ssd";

export async function model() {
    // Promesa que carga el modelo
    const loadlModelPromise = cocoSsd.load({base: "mobilenet_v2"});
    return loadlModelPromise;
}

export default model;