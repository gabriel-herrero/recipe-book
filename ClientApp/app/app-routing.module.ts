import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './components/recipes/recipe-start.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { AuthGuardService } from './components/services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'home', component: HomeComponent, children: [
            { path: '', redirectTo: 'recipes', pathMatch: 'full' },
            {
                path: 'recipes', component: RecipesComponent, canActivate: [AuthGuardService], children: [
                    { path: '', component: RecipeStartComponent },
                    { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService] },
                    { path: ':id', component: RecipeDetailComponent },
                    { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService] }
                ]
            },
            { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuardService] },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
