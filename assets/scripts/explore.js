// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const voiceSelect = document.getElementById('voice-select');
  const talkButton = document.querySelector('button');
  const textarea = document.getElementById('text-to-speak');
  const imgElement = document.querySelector('img');
  
  const closedMouth = 'assets/images/smiling.png';
  const openMouth = 'assets/images/talking.png';

  function populateVoiceList() {
    const voices = synth.getVoices();
    voiceSelect.innerHTML = '';

    for (const voice of voices) {
      const option = document.createElement('option');
      option.textContent = voice.name + ' (' + voice.lang + ')';
      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      voiceSelect.appendChild(option);
    }
  }

  if (typeof synth !== 'undefined' && synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
  }

  talkButton.addEventListener('click', () => {
    const utterThis = new SpeechSynthesisUtterance(textarea.value);
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

    for (const voice of synth.getVoices()) {
      if (voice.name === selectedOption) {
        utterThis.voice = voice;
      }
    }

    imgElement.src = openMouth;
    synth.speak(utterThis);
    utterThis.onend = () => {
      imgElement.src = closedMouth;
    };
  });
}