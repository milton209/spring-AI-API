import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import api from "../../service/api";

function RecipeGenerator() {
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('Qualquer');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [recipe, setRecipe] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const createRecipe = async () => {
        if (!ingredients.trim()) {
            setError('Por favor, insira pelo menos um ingrediente');
            return;
        }

        setLoading(true);
        setError('');
        setRecipe('');

        try {
            const response = await api.get(`recipe-creator`, {
                params: {
                    ingredients,
                    dietaryRestrictions,
                    cuisine
                }
            });
            const data = response.data;
            console.log('Receita gerada:', data);
            setRecipe(data);
        } catch (error) {
            console.log("Erro ao gerar receita:", error);
            setError('Erro ao gerar receita. Verifique se o servidor está rodando.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            createRecipe();
        }
    };

    return (
        <div className="recipe-generator">
            <div className="recipe-container">
                <div className="form-section">
                    <h2>👨‍🍳 Gerador de Receitas</h2>

                    <div className="form-group">
                        <label htmlFor="ingredients">Ingredientes:</label>
                        <textarea
                            id="ingredients"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Digite os ingredientes (separados por vírgula ou quebra de linha)"
                            rows="4"
                            disabled={loading}
                            className="ingredients-input"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="cuisine">Tipo de Culinária:</label>
                            <select
                                id="cuisine"
                                value={cuisine}
                                onChange={(e) => setCuisine(e.target.value)}
                                disabled={loading}
                            >
                                <option value="Qualquer">Qualquer</option>
                                <option value="Italiana">Italiana</option>
                                <option value="Francesa">Francesa</option>
                                <option value="Mexicana">Mexicana</option>
                                <option value="Asiática">Asiática</option>
                                <option value="Brasileira">Brasileira</option>
                                <option value="Vegana">Vegana</option>
                                <option value="Vegetariana">Vegetariana</option>
                                <option value="Fitness">Fitness</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dietary">Restrições Dietárias:</label>
                            <select
                                id="dietary"
                                value={dietaryRestrictions}
                                onChange={(e) => setDietaryRestrictions(e.target.value)}
                                disabled={loading}
                            >
                                <option value="">Nenhuma</option>
                                <option value="sem glúten">Sem Glúten</option>
                                <option value="sem lactose">Sem Lactose</option>
                                <option value="vegetariana">Vegetariana</option>
                                <option value="vegana">Vegana</option>
                                <option value="sem amendoim">Sem Amendoim</option>
                                <option value="sem ovos">Sem Ovos</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={createRecipe}
                        disabled={loading}
                        className="generate-button"
                    >
                        {loading ? '⏳ Gerando Receita...' : '🍳 Gerar Receita'}
                    </button>

                    {error && <div className="error-message">{error}</div>}
                </div>

                <div className="recipe-output">
                    {recipe && (
                        <div className="recipe-content">
                            <ReactMarkdown>{recipe}</ReactMarkdown>
                        </div>
                    )}
                    {loading && (
                        <div className="loading-message">
                            <div className="spinner"></div>
                            <p>Preparando a receita...</p>
                        </div>
                    )}
                    {!recipe && !loading && (
                        <div className="placeholder-message">
                            <p>Insira os ingredientes e clique em "Gerar Receita" para começar! 👨‍🍳</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default RecipeGenerator;