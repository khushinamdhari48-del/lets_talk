export function createDeepgramSocket(onTranscript) {
  const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;

  const socket = new WebSocket(
    "wss://api.deepgram.com/v1/listen" +
      "?model=nova-2" +
      "&language=en-US" +
      "&punctuate=true" +
      "&interim_results=true" +
      "&encoding=linear16" +
      "&sample_rate=16000" +
      "&channels=1",
    ["token", apiKey]
  );

  socket.onopen = () => {
    console.log("Deepgram connected");
  };

  socket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    const transcript = data.channel?.alternatives?.[0]?.transcript;

    if (transcript && transcript.trim() !== "") {
      onTranscript(transcript, data.is_final);
    }
  };

  socket.onerror = (err) => {
    console.error("Deepgram socket error", err);
  };

  socket.onclose = () => {
    console.log("Deepgram socket closed");
  };

  return socket;
}
