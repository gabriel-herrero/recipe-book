import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];

    getRecipes() {
        if (this.recipes)
            return this.recipes.slice();
        else
            return this.recipes;
    }

    getRecipe(index: number) {
        //const recipe = this.recipes.find(
        //    (s) => {
        //        return s.id === id;
        //    }
        //);
        //return recipe;
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    fetchRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}
