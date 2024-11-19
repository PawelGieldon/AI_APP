import { useState } from "react";

function Ai({ setFileContent }) {
  const [fileContent, setFileContentLocal] = useState("");

  const fetchFile = async () => {
    try {
      const response = await fetch("/plik.txt"); 
      if (!response.ok) {
        throw new Error("Błąd podczas pobierania pliku");
      }
      const text = await response.text();
      setFileContentLocal(text);
      setFileContent(text);
    } catch (error) {
      setFileContentLocal(`Wystąpił błąd: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Odczyt pliku z URL</h1>
      <button onClick={fetchFile} style={{ marginBottom: "20px", padding: "10px 20px" }}>
        Pobierz plik
      </button>
      <pre>{fileContent || "Kliknij przycisk, aby odczytać plik."}</pre>
    </div>
  );
}

export default Ai;