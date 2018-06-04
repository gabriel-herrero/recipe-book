import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { ShoppingService } from '../../services/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    id: number;
    recipeSel?: Recipe;

    constructor(private shoppingService: ShoppingService, private recipeService: RecipeService,
        private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = params.id;
                this.recipeSel = this.recipeService!.getRecipe(+this.route.snapshot.params['id']);
                //this.recipeSel = new Recipe(1006, 'my rec', 'desc', 'img', []);
            }
        );
    }

    sendToShoppingList() {
        this.shoppingService.addMultipleIngredients(this.recipeSel.ingredients);
    }

    onEditRecipe() {
        this.router.navigate(['edit'], { relativeTo: this.route });
    }

    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['../'], { relativeTo: this.route })
    }
}
