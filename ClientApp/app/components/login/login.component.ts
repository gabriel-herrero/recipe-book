import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit() {
        localStorage.removeItem('currentUser');
    }

    onSignIn(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        this.authService.signInUser(email, password);
    }
}