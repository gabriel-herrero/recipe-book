import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild('f') slForm: NgForm;

    subscription: Subscription
    editMode = false;
    editedItemId: number;
    editedItem: Ingredient;

    constructor(private shoppingService: ShoppingService) { }

    ngOnInit() {
        this.subscription = this.shoppingService.startedEditing.subscribe(
            (id: number) => {
                this.editMode = true;
                this.editedItemId = id;
                this.editedItem = this.shoppingService.getIngredientById(id);
                this.slForm.setValue({
                    'name': this.editedItem.name,
                    'amount': this.editedItem.amount
                })
            }
        );
    }

    onAddItem(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(this.editedItemId, value.name, value.amount);
        if (this.editMode) {
            this.shoppingService.updateIngredient(newIngredient);
        } else {
            this.shoppingService.addIngredient(newIngredient);
        }
        this.onClear();
    }

    onClear() {
        this.slForm.reset();
        this.editMode = false;
    }

    onDeleteIngredient() {
        this.shoppingService.deleteIngredient(this.editedItemId);
        this.onClear();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
