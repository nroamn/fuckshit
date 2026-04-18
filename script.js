async function startMic() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  console.log("Mic started", stream);
}
