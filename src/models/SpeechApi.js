import Speech from 'speak-tts';

export default class SpeechApi{
    static instance = null;
    static getInstance(){
        if(this.instance == null){
            this.instance = new Speech();
            this.instance.init({
                'volume': 1,
                'lang': 'es-MX',
                'rate': 1,
                'pitch': 1
            });
        }
        return this.instance;
    }
}