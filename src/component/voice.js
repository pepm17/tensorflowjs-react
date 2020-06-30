import Speech from 'speak-tts';

export function voice() {
    const speech = new Speech();
    speech.init({
        'volume': 1,
        'lang': 'es-MX',
        'rate': 1,
        'pitch': 1
    });
    return speech;
}

export default voice;