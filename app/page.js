'use client'
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Page() {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const genAI = new GoogleGenerativeAI("AIzaSyDi1rUuMduZRotxECyyKwCAE7nrDpc1UTY");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const text = result.response.text;

      setGeneratedText(text);
    } catch (error) {
      console.error(error);
      alert('Failed to generate content');
    }
  };

  return (
    <div className="flex flex-col items-center justify-end h-screen">
      {generatedText && (
        <div className="mb-4">
          <h3>Generated Text:</h3>
          <input
            className="appearance-none w-2/4 border border-white w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Generated Text"
            value={generatedText}
            readOnly
          />
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center border justify-center text-gray-600 py-2">
          <input
            className="w-2/4 bg-transparent border border-white  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Message ChatGPT..."
            aria-label="Your message"
          />
          <button className="p-2" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 rotate-90 transform hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12l-9-9v4.993C7.5 7.999 3 13 3 13c3 0 4.5 3.006 4.5 3.006V21l9-9z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
