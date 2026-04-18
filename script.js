async function startMic() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(stream);

  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;

  source.connect(analyser);

  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  function update() {
    analyser.getByteFrequencyData(dataArray);

    // Get average volume
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    let volume = sum / dataArray.length;

    // Normalize (0 → 1)
    let normalized = volume / 255;

    // Update bar width
    const bar = document.getElementById("bar");
    bar.style.width = (normalized * 100) + "%";

    // Color from green → red
    let r = Math.floor(255 * normalized);
    let g = Math.floor(255 * (1 - normalized));
    bar.style.backgroundColor = `rgb(${r}, ${g}, 0)`;

    requestAnimationFrame(update);
  }

  update();
}
