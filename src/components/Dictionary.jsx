import React, { useState } from "react";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [datas, setDatas] = useState(null);
  const [error, setError] = useState("");

  const fetchDefinition = async () => {
    if (word) {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        if (!response.ok) {
          throw new Error("Network error, please try again later");
        }
        const fetchData = await response.json();

        setDatas(fetchData);
        console.log(fetchData);

        setError("");
        setWord("");
      } catch (error) {
        console.error("Error fetching the definition:", error);
        setError("Definition not found");
        setDatas(null);
      }
    } else {
      setError("Please insert a word");
    }
  };

  return (
    <div className="wrapper">
      <span className="disclaimer">
        The data on this website is sourced from:{" "}
        <a href="https://dictionaryapi.dev/" target="_blank">
          https://dictionaryapi.dev/
        </a>
      </span>
      <h1 id="top">English Dictionary</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchDefinition();
        }}
        className="input-button-wrapper"
      >
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word..."
        />
        <button>Search</button>
      </form>
      {error && (
        <p className="error">
          <span>***</span>
          {error}
          <span>***</span>
        </p>
      )}
      {datas && (
        <div>
          <h2 className="word">"{datas[0].word}"</h2>
          <h3>Phonetic: {datas[0].phonetic}</h3>
          {datas[0].phonetics && datas[0].phonetics[0]?.audio && (
            <audio key={datas[0].phonetics[0].audio} controls>
              <source src={datas[0].phonetics[0].audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}

          {datas.map((data, j) => (
            <div key={j}>
              <h2 className="meaning-header">Meaning {j + 1}</h2>
              {data.meanings.map((meaning, index) => (
                <div key={index}>
                  <h3>{meaning.partOfSpeech}:</h3>
                  {meaning.definitions.map((def, i) => (
                    <div key={i} className="definition">
                      <h4>Definition {i + 1}</h4>
                      <p>{def.definition}</p>
                      {def.example && (
                        <>
                          <h4>Example</h4>
                          <p>{def.example}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <a href="#top">⬆️</a>
    </div>
  );
};

export default Dictionary;
