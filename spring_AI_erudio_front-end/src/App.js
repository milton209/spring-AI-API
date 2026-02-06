import { useState } from 'react';
import TalkWithAI from './pages/chat/TalkWithAI';
import RecipeGenerator from './pages/recipe/RecipeGenerator';
import ImageGenerator from './pages/image/ImageGenerator';

import './App.css';

function App() {

  const [activeTab, setactiveTab] = useState('ask-ai')

  const handleTabChange = (tab) =>{
    setactiveTab(tab);
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>🤖 AI Erudio</h1>
        <p className="subtitle">Seu assistente de IA pessoal</p>
      </header>

      <nav className="app-nav">
        <button 
          className={`nav-button ${activeTab === 'ask-ai' ? 'active' : ''}`}
          onClick={() => handleTabChange('ask-ai')}>
          💬 Chat com IA
        </button>

        <button 
          className={`nav-button ${activeTab === 'recipe-generator' ? 'active' : ''}`}
          onClick={() => handleTabChange('recipe-generator')}>
          👨‍🍳 Gerar Receitas
        </button>

        <button 
          className={`nav-button ${activeTab === 'image-generator' ? 'active' : ''}`}
          onClick={() => handleTabChange('image-generator')}>
          🖼️ Gerar Imagens
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'ask-ai' && <TalkWithAI/>}
        {activeTab === 'recipe-generator' && <RecipeGenerator/>}
        {activeTab === 'image-generator' && <ImageGenerator/>}
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 AI Erudio. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
export default App;