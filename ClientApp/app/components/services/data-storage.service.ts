//import { Http, Response, RequestOptionsArgs, Headers } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "./recipe.service";
import { Recipe } from "../shared/recipe.model";
import 'rxjs/add/operator/map'
import { ShoppingService } from "./shopping-list.service";
import { AuthService } from "./auth.service";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class DataStorageService {

    constructor(private httpClient: HttpClient,
        private recipeService: RecipeService,
        private slService: ShoppingService,
        private authService: AuthService) { }

    //URL = 'http://localhost:51828/api';
    URL = 'http://surveygenwebapi.azurewebsites.net/api'

    storeRecipes() {
        return this.httpClient.post(this.URL + '/recipes', this.recipeService.getRecipes()).subscribe(
            (response) => {
                console.log(response);
            },
            (error: Error) => {
                console.log(error);
            }
        );
    }

    storeShoppingList() {
        this.httpClient.post(this.URL + '/shoppinglist', this.slService.getIngredients()).subscribe(
            (response) => {
                console.log('Response:' + response);
            },
            (error: Error) => {
                console.log('Error: ' + error);
            }
        );
    }

    fetchRecipes() {
        //OPTION 1
        this.httpClient.get<Recipe[]>(this.URL + '/recipes', {
            observe: 'body',
            responseType: 'json'
        })
            .map(
                (recipes: Recipe[]) => {
                    for (let recipe of recipes) {
                        if (!recipe.ingredients) {
                            recipe.ingredients = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.fetchRecipes(recipes);
                },
                (error: Error) => {

                }
            );
    }

    fetchShoppingList() {
        //OPTION 2
        this.httpClient.get<Ingredient[]>(this.URL + '/shoppinglist')
            .subscribe(
                (ingredients) => {
                    console.log(ingredients);
                    this.slService.fetchIngredients(ingredients);
                },
                (error: Error) => {

                }
            );
    }

}