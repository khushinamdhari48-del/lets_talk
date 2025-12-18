# Lets Talk 🎤

A Voice-to-Text Desktop App built with Tauri + Deepgram

## Overview

**Lets Talk** is a cross-platform desktop application that enables real-time voice-to-text transcription using a push-to-talk workflow.  
The app is inspired by Wispr Flow and focuses on delivering a smooth, low-latency voice input experience rather than visual polish.

The project demonstrates practical skills in:

- Native desktop app development using **Tauri**
- Real-time audio capture in the browser environment
- Streaming audio to an AI speech-to-text service (**Deepgram**)
- Handling real-time WebSocket data streams
- Clean separation of concerns and maintainable architecture

---

## Tech Stack

- **Tauri** – Lightweight, native desktop framework
- **React (Vite)** – Frontend UI and state management
- **Web Audio API** – Raw audio capture (PCM)
- **Deepgram API** – Real-time speech-to-text transcription
- **Rust** – Native backend (via Tauri);

---

## Core Features

- 🎙️ **Push-to-Talk Voice Input**  
  Press and hold a button to start recording, release to stop.

- 🎧 **Microphone Access & Audio Capture**  
  Uses the Web Audio API to capture raw PCM audio from the microphone.

- 🧠 **Real-Time Transcription**  
  Streams audio to Deepgram over WebSockets and receives live transcription.

- 📝 **Live Text Display**  
  Transcribed text appears in real time in the UI.

- ⚠️ **Graceful Error Handling**  
  Handles microphone permission issues, WebSocket errors, and connection lifecycle.

---

## Architecture & Design Decisions

### Audio Capture

- Uses **AudioContext + ScriptProcessorNode** to capture raw PCM audio.
- Audio is converted to **16-bit linear PCM (linear16)** before streaming.
- This approach is recommended by Deepgram for reliable real-time transcription.

> Note: `ScriptProcessorNode` is deprecated but still supported.  
> It was chosen for simplicity and clarity. In production, this can be migrated to `AudioWorkletNode`.

---

### Transcription Pipeline

Microphone
↓
Web Audio API (PCM)
↓
WebSocket
↓
Deepgram (Speech-to-Text)
↓
Live UI Updates

---

### Separation of Concerns

- `App.jsx`  
  Handles UI, push-to-talk logic, and audio lifecycle.

- `deepgram.js`  
  Responsible only for Deepgram WebSocket connection and message parsing.

This keeps the code clean, testable, and easy to extend.

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- Rust & Cargo
- Visual Studio Build Tools (Windows, C++ workload)
- Deepgram API key

---

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_DEEPGRAM_API_KEY=your_real_deepgram_api_key

```
