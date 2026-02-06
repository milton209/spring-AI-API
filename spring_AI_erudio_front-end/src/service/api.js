import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Chat API
export const chatWithAI = async (message) => {
    try {
        const response = await api.post('/chat', {
            message: message,
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao comunicar com o chat:', error);
        throw error;
    }
};

// Image Generation API
export const generateImage = async (prompt) => {
    try {
        const response = await api.post('/images/generate', {
            prompt: prompt,
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao gerar imagem:', error);
        throw error;
    }
};

// Recipe Generation API
export const generateRecipe = async (ingredients) => {
    try {
        const response = await api.post('/recipes/generate', {
            ingredients: ingredients,
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao gerar receita:', error);
        throw error;
    }
};

export default api;