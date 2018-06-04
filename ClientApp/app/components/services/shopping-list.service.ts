import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs/Subject"

export class ShoppingService {

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [];

    getIngredients() {
        if (this.ingredients)
            return this.ingredients.slice();
        else
            return this.ingredients;
    }

    addIngredient(ingredient: Ingredient) {
        ingredient.id = this.ingredients.length + 1;
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(id: number) {
        const ingredient = this.ingredients.find(
            (s) => {
                return s.id === id;
            }
        );
        this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    clearIngredients() {
        this.ingredients = [];
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addMultipleIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    fetchIngredients(ingredients: Ingredient[]) {
        this.ingredients = ingredients;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredientById(id: number) {
        const ingredient = this.ingredients.find(
            (s) => {
                return s.id === id;
            }
        );
        return ingredient;
    }

    updateIngredient(ing: Ingredient) {
        const ingredient = this.ingredients.find(
            (s) => {
                return s.id === ing.id;
            }
        );
        if (ingredient) {
            ingredient.name = ing.name;
            ingredient.amount = ing.amount;
            this.ingredientsChanged.next(this.ingredients.slice());
        }
    }
}
