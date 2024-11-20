import { useState } from 'react';
import './App.css';
import Ai from './Ai';

function App() {
  const [input, setInput] = useState(''); 
  const [response, setResponse] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleFetch = async () => {
    try {
      
      const result = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { 
              role: 'user', 
              content: `${input}\n\n${fileContent}\n\nPlease respond with HTML code.` 
            }
          ],
        }),
      });

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const data = await result.json();
      const responseText = data.choices[0].message.content;
      setResponse(responseText);

      
      createHtmlFile(responseText);

    } catch (error) {
      console.error('Error:', error);
      setResponse('Coś poszło nie tak. Spróbuj ponownie później.');
    }
  };

  
  const createHtmlFile = (htmlContent) => {
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="pl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Odpowiedź AI</title>
      </head>
      <body>
        ${htmlContent} <!-- Tutaj wstawiamy odpowiedź HTML -->
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlTemplate], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'artykuł.html'; 
    link.click();

    
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Inteligentny Chat</h2>
      <textarea
        rows="5"
        cols="50"
        placeholder="Wpisz swoje zapytanie..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', height:'400px'}}
      />
      <button onClick={handleFetch} style={{ padding: '10px 20px' }}>
        Wyślij
      </button>
      {response && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd' }}>
          <h4>Odpowiedź:</h4>
          <div dangerouslySetInnerHTML={{ __html: response }} /> {}
        </div>
      )}
      <Ai setFileContent={setFileContent} />
    </div>
  );
}

export default App;
