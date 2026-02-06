import React, { useState } from "react";
import api from "../../service/api";

function ImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [quality, setQuality] = useState('hd');
    const [quantity, setQuantity] = useState('1');
    const [height, setHeight] = useState('1024');
    const [width, setWidth] = useState('1024');
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const generateImages = async () => {
        if (!prompt.trim()) {
            setError('Por favor, insira uma descrição para a imagem');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await api.get(`generate-image`, {
                params: {
                    prompt,
                    quality,
                    n: quantity,
                    height,
                    width
                }
            });
            const data = response.data;
            console.log('Imagens geradas:', data);

            // Se for um blob (imagem), converter para data URL
            if (data instanceof Blob) {
                const url = URL.createObjectURL(data);
                setImageUrls([url]);
            } else if (Array.isArray(data)) {
                setImageUrls(data);
            } else {
                setImageUrls([data]);
            }
        } catch (error) {
            console.log("Erro ao gerar imagem:", error);
            setError('Erro ao gerar imagem. Verifique se o servidor está rodando.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            generateImages();
        }
    };

    return (
        <div className="image-generator">
            <div className="generator-container">
                <div className="form-section">
                    <h2>🖼️ Gerador de Imagens</h2>

                    <div className="form-group">
                        <label htmlFor="prompt">Descrição da Imagem:</label>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Descreva a imagem que deseja gerar (ex: um gato fofo em um jardim de flores)"
                            rows="4"
                            disabled={loading}
                            className="prompt-input"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="quality">Qualidade:</label>
                            <select
                                id="quality"
                                value={quality}
                                onChange={(e) => setQuality(e.target.value)}
                                disabled={loading}
                            >
                                <option value="standard">Standard</option>
                                <option value="hd">HD</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="quantity">Quantidade:</label>
                            <input
                                id="quantity"
                                type="number"
                                min="1"
                                max="4"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="width">Largura:</label>
                            <select
                                id="width"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                disabled={loading}
                            >
                                <option value="512">512</option>
                                <option value="1024">1024</option>
                                <option value="1792">1792</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="height">Altura:</label>
                            <select
                                id="height"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                disabled={loading}
                            >
                                <option value="512">512</option>
                                <option value="1024">1024</option>
                                <option value="1792">1792</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={generateImages}
                        disabled={loading}
                        className="generate-button"
                    >
                        {loading ? '⏳ Gerando...' : '✨ Gerar Imagens'}
                    </button>

                    {error && <div className="error-message">{error}</div>}
                </div>

                <div className="images-section">
                    <div className="image-grid">
                        {imageUrls.map((url, index) => (
                            <div key={index} className="image-item">
                                <img src={url} alt={`Imagem gerada ${index + 1}`} />
                                <a href={url} download={`image-${index + 1}.png`} className="download-btn">
                                    ⬇️ Baixar
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageGenerator;