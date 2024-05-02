// @ts-nocheck
"use client"
import { useRef, useState } from "react";

export default function Home() {
  const LANGUAGES = [
    { code: 'af', name: 'Afrikaans' },
    { code: 'sq', name: 'Albanian' },
    { code: 'ar', name: 'Arabic' },
    // { code: 'hy', name: 'Armenian' },
    { code: 'ca', name: 'Catalan' },
    { code: 'zh', name: 'Chinese' },
    { code: 'zh-cn', name: 'Chinese (Mandarin/China)' },
    { code: 'zh-tw', name: 'Chinese (Mandarin/Taiwan)' },
    { code: 'zh-yue', name: 'Chinese (Cantonese)' },
    { code: 'hr', name: 'Croatian' },
    { code: 'cs', name: 'Czech' },
    { code: 'da', name: 'Danish' },
    { code: 'nl', name: 'Dutch' },
    { code: 'en', name: 'English' },
    { code: 'en-au', name: 'English (Australia)' },
    { code: 'en-uk', name: 'English (United Kingdom)' },
    { code: 'en-us', name: 'English (United States)' },
    // { code: 'eo', name: 'Esperanto' },
    { code: 'fi', name: 'Finnish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'el', name: 'Greek' },
    { code: 'ht', name: 'Haitian Creole' },
    { code: 'hi', name: 'Hindi' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'is', name: 'Icelandic' },
    { code: 'id', name: 'Indonesian' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'la', name: 'Latin' },
    { code: 'lv', name: 'Latvian' },
    { code: 'mk', name: 'Macedonian' },
    { code: 'no', name: 'Norwegian' },
    { code: 'pl', name: 'Polish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'pt-br', name: 'Portuguese (Brazil)' },
    { code: 'ro', name: 'Romanian' },
    { code: 'ru', name: 'Russian' },
    { code: 'sr', name: 'Serbian' },
    { code: 'sk', name: 'Slovak' },
    { code: 'es', name: 'Spanish' },
    { code: 'es-es', name: 'Spanish (Spain)' },
    { code: 'es-us', name: 'Spanish (United States)' },
    { code: 'sw', name: 'Swahili' },
    { code: 'sv', name: 'Swedish' },
    { code: 'ta', name: 'Tamil' },
    { code: 'th', name: 'Thai' },
    { code: 'tr', name: 'Turkish' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'cy', name: 'Welsh' }
  ];
  const [data, setData] = useState({
    text: '',
    lang: ''
  });
  const [audioSrc, setAudioSrc] = useState('');
  const [loading, setLoading] = useState(false)

  const audioRef = useRef()

  const handleChange = (e) => {
    setData({ ...data, lang: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    if (!data.text || !data.lang) {
      alert('Please enter text and select a language');
      setLoading(false);
      return;
    }
  
    const apiUrl = 'api/convert';
    const requestData = {
      text: data.text,
      lang: data.lang
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        alert("something went wrong!!")
      }
  
      const result = await response.json();
      console.log(result.data);
      const blob = new Blob([new Uint8Array(result.data)], { type: 'audio/mp3' });
      console.log(blob);
      const url = URL.createObjectURL(blob);
  
      setAudioSrc(url);
      setLoading(false);
      if (audioRef.current) {
        audioRef.current.load();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  


  return (
    <div className="flex p-4 max-h-[90vh] flex-col items-center gap-10 justify-center">
      <div className="container gap-4 flex flex-col">
        <div className="w-full">
          <textarea
            id="message"
            className="block max-h-96 min-h-96 h-96 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            value={data.text}
            onChange={(e) => setData({ ...data, text: e.target.value })}
          ></textarea>
        </div>

        <div className="flex bg-gray-800 p-4 gap-2 rounded-md items-center justify-between">
          <div>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
              value={data.lang}
            >
              <option value="">Choose a Language</option>
              {LANGUAGES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button onClick={handleSubmit} className="px-3 rounded-md py-2 bg-green-500">Convert</button>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center container">
        {loading &&
        <div className="">

          <img width={40} src="assets/loading.gif" />
        </div>
}

        {audioSrc && !loading && (
          <audio className="w-full" controls ref={audioRef}>
            <source src={audioSrc} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
}
