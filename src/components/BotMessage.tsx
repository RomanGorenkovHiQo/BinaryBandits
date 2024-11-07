'use client'
import { useState, useEffect } from "react";

interface BotMessageProps {
  text: string;
}

export default function BotMessage({ text }: BotMessageProps) {
  const [displayedText, setDisplayedText] = useState<string>("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Скорость отображения текста
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="text-left mb-2">
      <p className="inline-block bg-gray-200 text-gray-800 p-2 rounded-md">{displayedText}</p>
    </div>
  );
}