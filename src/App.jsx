import { useRef, useState } from "react";
import { createDeepgramSocket } from "./deepgram";

function App() {
  const [status, setStatus] = useState("Idle");
  const [text, setText] = useState("");

  const audioContextRef = useRef(null);
  const processorRef = useRef(null);
  const socketRef = useRef(null);

  const startRecording = async () => {
    setStatus("Recording 🎙️");

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const audioContext = new AudioContext({ sampleRate: 16000 });
    audioContextRef.current = audioContext;

    const source = audioContext.createMediaStreamSource(stream);

    const processor = audioContext.createScriptProcessor(4096, 1, 1);
    processorRef.current = processor;

    const socket = createDeepgramSocket((transcript, isFinal) => {
      setText((prev) => (isFinal ? prev + " " + transcript : prev));
    });
    socketRef.current = socket;

    processor.onaudioprocess = (event) => {
      if (socket.readyState !== WebSocket.OPEN) return;

      const input = event.inputBuffer.getChannelData(0);
      const pcm16 = new Int16Array(input.length);

      for (let i = 0; i < input.length; i++) {
        pcm16[i] = Math.max(-1, Math.min(1, input[i])) * 0x7fff;
      }

      socket.send(pcm16.buffer);
    };

    source.connect(processor);
    processor.connect(audioContext.destination);
  };

  const stopRecording = () => {
    setStatus("Stopped ⏹️");

    processorRef.current?.disconnect();
    audioContextRef.current?.close();
    socketRef.current?.close();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Lets Talk 🎤</h1>

      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        style={{ padding: "12px 24px", fontSize: 16 }}
      >
        Push to Talk
      </button>

      <p>Status: {status}</p>

      <textarea
        rows={8}
        style={{ width: "100%", fontSize: 16 }}
        value={text}
        placeholder="Live transcription appears here..."
        readOnly
      />
    </div>
  );
}

export default App;
