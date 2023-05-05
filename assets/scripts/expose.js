// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornSelect = document.getElementById('horn-select');
  const imgElement = document.querySelector('img');
  const audioElement = document.querySelector('audio');
  const volumeSlider = document.getElementById('volume');
  const volumeIcon = document.querySelector('#volume-controls img');
  const playButton = document.querySelector('button');

  const volumeIcons = [
    'assets/icons/volume-level-0.svg',
    'assets/icons/volume-level-1.svg',
    'assets/icons/volume-level-2.svg',
    'assets/icons/volume-level-3.svg',
  ];

  const hornData = {
    'air-horn': {
      image: 'assets/images/air-horn.svg',
      sound: 'assets/media/audio/air-horn.mp3',
    },
    'car-horn': {
      image: 'assets/images/car.svg',
      sound: 'assets/media/audio/car-horn.mp3',
    },
    'party-horn': {
      image: 'assets/images/party-horn.svg',
      sound: 'assets/media/audio/party-horn.mp3',
    },
  };

  const jsConfetti = new JSConfetti();

  hornSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    imgElement.src = hornData[value].image;
    audioElement.src = hornData[value].sound;
  });

  volumeSlider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    let iconIndex;

    if (value === 0) {
      iconIndex = 0;
    } else if (value < 33) {
      iconIndex = 1;
    } else if (value < 67) {
      iconIndex = 2;
    } else {
      iconIndex = 3;
    }

    volumeIcon.src = volumeIcons[iconIndex];
    audioElement.volume = value / 100;
  });

  playButton.addEventListener('click', () => {
    if (audioElement.src) {
      audioElement.play();

      if (hornSelect.value === 'party-horn') {
        jsConfetti.addConfetti();
      }
    }
  });
}