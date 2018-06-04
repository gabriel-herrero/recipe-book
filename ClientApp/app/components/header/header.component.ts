import { Component } from "@angular/core";
import { DataStorageService } from "../services/data-storage.service";
import { Response } from "@angular/http";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {

    constructor(private dataStorage: DataStorageService,
        private authService: AuthService) { }

    onSaveData() {
        this.dataStorage.storeRecipes();
        this.dataStorage.storeShoppingList();
    }

    onFetchData() {
        this.dataStorage.fetchRecipes();
        this.dataStorage.fetchShoppingList();
    }

    onLogout() {
        this.authService.logout();
    }
}
