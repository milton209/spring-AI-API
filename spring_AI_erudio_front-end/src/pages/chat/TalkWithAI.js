import React, { useState, useRef, useEffect } from "react";
import api from "../../service/api";

function TalkWithAI() {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Olá! Sou seu assistente de IA. Como posso ajudá-lo?', sender: 'bot', timestamp: new Date() }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages([...messages, userMessage]);
        setInputValue('');
        setLoading(true);

        try {
            const response = await api.get(`ask-ai-options`, {
                params: { prompt: inputValue }
            });
            const botMessage = {
                id: messages.length + 2,
                text: response.data || 'Desculpe, não consegui processar sua solicitação.',
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.log("Erro ao comunicar com IA:", error);
            const errorMessage = {
                id: messages.length + 2,
                text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Verifique se o servidor está rodando.',
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="talk-with-ai">
            <div className="chat-container">
                <div className="messages-list">
                    {messages.map((message) => (
                        <div key={message.id} className={`message ${message.sender}`}>
                            <div className="message-content">
                                <p>{message.text}</p>
                                <span className="timestamp">
                                    {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="message bot loading">
                            <div className="message-content">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className="chat-form" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Digite sua mensagem aqui..."
                        disabled={loading}
                        className="chat-input"
                    />
                    <button type="submit" disabled={loading} className="send-button">
                        {loading ? '⏳' : '📤'}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default TalkWithAI;