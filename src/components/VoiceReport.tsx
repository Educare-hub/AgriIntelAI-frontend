import { useRef, useState } from "react";

export default function VoiceReport({ text }: { text: string }) {
  const synth = useRef(window.speechSynthesis);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    synth.current.cancel();
    if (!text) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.0;
    utter.pitch = 1.0;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    utterRef.current = utter;
    setSpeaking(true);
    synth.current.speak(utter);
  };

  const stop = () => {
    synth.current.cancel();
    setSpeaking(false);
  };

  return (
    <div className="voice-controls">
      {!speaking ? (
        <button onClick={speak} className="voice-btn">
          🔊 Hear Report
        </button>
      ) : (
        <button onClick={stop} className="stop-btn">
          ⏹ Stop
        </button>
      )}
    </div>
  );
}
