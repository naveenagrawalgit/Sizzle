import express from "express";
import {protect } from "../middleware/auth.js"
import {Recipe} from "../models/recipe.model.js"

const router = express.Router();

router.post("/",protect, async (req, res)=>{

    const {title, ingredients, instructions, category, photoUrl,cookingTime}= req.body;


    try {
        if(!title || !ingredients || !instructions || !category || !photoUrl || !cookingTime) {
            return res.status(400).json({message: "please fill all fields"})}

            const recipe = await Recipe.create({
                title,
                ingredients,
                instructions,
                category,
                photoUrl,
                cookingTime,
                createdBy: req.user._id,

            })

            res.status(201).json(recipe)
        
    } catch (error) {

        res.status(500).json({message: "Server error"})
        
    }

})

// get all recipes
router.get("/", async (req,res)=>{
    const {category} = req.query;
    try {
        const query = category ? {category}: {};
        const recipes = await Recipe.find(query);

        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json({message: "Server error in getting all recipe"})
    }
})

router.get("/:id", async (req,res)=>{

    try {
        const recipe = await Recipe.findById(req.params.id);
        if(!recipe){
            return res.status(404).json({message: "Recipe not found"})
        }
        res.json(recipe)

    } catch (error) {
        res.status(500).json({message: "server error in getting recipe"})
    }
})

// update a recipe

router.put("/:id", protect, async (req,res)=>{
    const {
        title,
        ingredients,
        instructions,
        category,
        photoUrl,
        cookingTime,
    } = req.body;

    try {
        const recipe = await Recipe.findById(req.params.id);
        if(!recipe){
            return res.status(404).json({message: "recipe not found which you are looking for"})
        }
        if(recipe.createdBy.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "Not authorised"})
        }

        recipe.title = title || recipe.title;
        recipe.ingredients = ingredients || recipe.ingredients
        recipe.instructions = instructions || recipe.instructions
        recipe.category = category || recipe.category
        recipe.photoUrl = photoUrl || recipe.photoUrl
        recipe.cookingTime = cookingTime || recipe.cookingTime

        const updatedRecipe = await recipe.save()

        res.json(updatedRecipe)
    } catch (error) {
        res.status(500).json({message: "error in back during updating recipe"})
    }
})


// Delete recipe

router.delete("/:id",protect, async (req,res)=>{

    try {
        const recipe = await Recipe.findById(req.params.id);
        if(!recipe){
            return res.status(404).json({message: "Recipe not found"})
        }

        if(recipe.createdBy.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "Not authorised"})
        }

        await recipe.deleteOne();
        res.json({message: "Recipe deleted"})
    } catch (error) {
        res.status(500).json({message: "error in back during deleting recipe"})
        
    }

})

export default router

