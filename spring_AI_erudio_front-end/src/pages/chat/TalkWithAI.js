import React, { useState } from "react";
import api from "../../service/api";

function TalkWithAI(){

    const[prompt , setprompt] = useState('');
    const[chatResponse , setChatResponse] = useState('');

    const askAI = async() => {

        try{
            //{{base_url}}/ask-ai-options?prompt=List of holiday dates in Brasil in 2025
            const response = await  api.get(`ask-ai-options`, {
                params: { prompt }
            })
            const data = await response.data;
            console.log(data);
            setChatResponse(data);
        } catch(error){
            console.log("Error generating response" , error);
        }
    }

    return (
        <div>
            <h2>Talk with AI...</h2>
            <input type="text"
            value={prompt}
            onChange={(e) => setprompt(e.target.value)}
            placeholder="enter a prompt for AI"
            />
            <button onClick={askAI}>Ask AI</button>
            <div className="output">
                <p>{chatResponse}</p>
            </div>
        </div>
    );
}
export default TalkWithAI;