const textArea = document.querySelector('#text');
let voiceList = document.querySelector('#voice');
let btnSpeech = document.querySelector('.submit');

let synth = speechSynthesis
let isSpeaking = true;


//creo la funcion voicespeech

function voiceSpeech(){
    for (let voice of synth.getVoices()){
        let option = document.createElement('option');
        option.text = voice.name;
        voiceList.add(option);
        console.log(option);
    }
}
    synth.addEventListener('voiceschanged',voiceSpeech);

    function textToSpeech (text) {
        let utternace = new SpeechSynthesisUtterance(text)
        for (let voice of synth.getVoices()) {
            if (voice.name === voiceList.value) {
                utternace.voice = voice;
            }
        }
        speechSynthesis.speak(utternace);
    }

    btnSpeech.addEventListener('click',(e) => {
        e.preventDefault()
        if (textArea.value !== '') {
            if (!synth.speaking) {
             
            textToSpeech(textArea.value)   
            }
        
        if (textArea.value.lenght > 80) {
            if(isSpeaking) {
                synth.resume()
                isSpeaking= false;
                btnSpeech.innerHTML= 'pause Speech';
            } else {
                synth.pause();
                isSpeaking=true;
                btnSpeech.innerHTML = 'resume Speech';
            }
            setInterval(() => {
            if (!synth.speaking && !isSpeaking) {
                isSpeaking = true;
                btnSpeech.innerHTML = 'Convert to Speech';
                    
                }
            })
            
        } else {
         
            btnSpeech.innerHTML = 'Convert to Speech';
        }
        }
    })