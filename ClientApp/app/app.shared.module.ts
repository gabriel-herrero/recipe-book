import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './components/recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { DropDownDirective } from './components/shared/dropdown.directive';
import { ShoppingService } from './components/services/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './components/recipes/recipe-start.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from './components/services/recipe.service';
import { DataStorageService } from './components/services/data-storage.service';
import { AuthService } from './components/services/auth.service';
import { AuthGuardService } from './components/services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DataStorageInterceptor } from './components/services/data-storage.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        ShoppingListComponent,
        ShoppingEditComponent,
        DropDownDirective,
        RecipeStartComponent,
        RecipeEditComponent,
        LoginComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        HttpClientModule
    ],
    providers: [ShoppingService, RecipeService, DataStorageService, AuthService, AuthGuardService,
        { provide: HTTP_INTERCEPTORS, useClass: DataStorageInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModuleShared { }
