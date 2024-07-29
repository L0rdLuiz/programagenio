import React, { useState } from 'react';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const SuportChat: React.FC = () => {
    const [showChat, setShowChat] = useState(false);
    const [pergunta, setPergunta] = useState('');
    const [resposta, setResposta] = useState('');

    const handleButtonClick = () => {
        setShowChat(true);
    };

    const handleCloseChat = () => {
        setShowChat(false);
    };

    const handlePerguntaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPergunta(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Enviar a pergunta para a API do OpenAI
        try {
            const response = await fetch("https://api.openai.com/v1/completions", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    prompt: pergunta,
                    max_tokens: 256,
                    temperature: 0.5,
                }),
            });
            const dados = await response.json();
            setResposta(dados.choices[0].text);
        } catch (erro) {
            console.log(erro);
            setResposta("Sem Resposta!");
        }
    };

    return (
        <div>
            {!showChat && (
                <button
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        padding: '10px',
                        borderRadius: '50%',
                        backgroundColor: 'blue',
                        color: 'white',
                        zIndex: 9999,
                    }}
                    onClick={handleButtonClick}
                >
                    Abrir Chat
                </button>
            )}

            {showChat && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        padding: '10px',
                        backgroundColor: 'white',
                        border: '1px solid black',
                        zIndex: 9999,
                    }}
                >
                    <form id="form-pergunta-chat" onSubmit={handleSubmit}>
                        <label>Pergunta:</label>
                        <textarea
                            id="campo-pergunta"
                            rows={5}
                            cols={80}
                            placeholder="Digite a Pergunta"
                            value={pergunta}
                            onChange={handlePerguntaChange}
                        ></textarea>
                        <br /><br />
                        <input type="submit" id="btn-pergunta-chat" value="Enviar" /><br /><br />
                    </form>
                    <button onClick={handleCloseChat}>Fechar Chat</button>
                    <div id="resposta">
                        <p>{resposta}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuportChat;