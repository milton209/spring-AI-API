import React , { useState } from "react";
import ReactMarkdown  from "react-markdown";
import api from "../../service/api";

//{{base_url}}/ai/recipe-creator?ingredients=olive&diataryRestrictions=gluten&cuisine=morroco

function RecipeGenerator(){
    
    const[ingredients , setIngredients] = useState('');
    const[cuisine , setCuisine] = useState('Any');
    const[diataryRestrictions , setDiataryRestrictions] = useState('');

    const[recipe , setRecipe] = useState('');

    const createRecipe = async() => {

        try{
            const response = await  api.get(`recipe-creator`, {
                params: { ingredients,
                    diataryRestrictions,
                    cuisine }
            })
            const data = await response.data;
            console.log(data);
            setRecipe(data);
        } catch(error){
            console.log("Error generating recipe" , error);
        }

    }

    return (
        <div>
            <h2>Generate Recipes...</h2>
            <input type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients...(comma separated)"
            />

            <input type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder="Enter cuisine type..."
            />

            <input type="text"
            value={diataryRestrictions}
            onChange={(e) => setDiataryRestrictions(e.target.value)}
            placeholder="Enter diatary restrictions..."
            />

            <button onClick={createRecipe}>Generate Recipe</button>
            
            <div className="output">
                <ReactMarkdown>{recipe}</ReactMarkdown>
            </div>
        </div>
    );
}
export default RecipeGenerator;