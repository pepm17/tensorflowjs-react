import SpeechApi from './SpeechApi';

export default class Voice{

    static instance = null;

    static getInstance(){
        if(this.instance == null){
            this.instance = new Voice();
        }
        return this.instance;
    }

    speak(palabra){
        const speackWord = SpeechApi.getInstance();
        if(!speackWord.speaking()){
            speackWord.speak({
            text: "El objeto es " + palabra,
            }).then(() => {
                console.log("Success !");
            }).catch(e => {
                console.error("An error occurred :", e);
            })
        }
    }
}
