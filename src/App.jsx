import { useState } from "react";

function App() {
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h1>Lets Talk 🎤</h1>

      <button style={{ padding: "10px 20px", fontSize: 16 }}>
        Push to Talk
      </button>

      <br />
      <br />

      <textarea
        rows={8}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Your transcribed text will appear here..."
        value={text}
        readOnly
      />
    </div>
  );
}

export default App;
