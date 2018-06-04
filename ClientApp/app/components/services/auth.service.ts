import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Router } from "@angular/router";


@Injectable()
export class AuthService {

    constructor(private http: Http,
        private router: Router) { }

    //URL = 'http://localhost:51828/api';
    URL = 'http://surveygenwebapi.azurewebsites.net/api'

    signupUser(email: string, password: string) {
        const userCredentials = {
            email: email,
            password: password
        };

        this.http.post(this.URL + '/signup', userCredentials).subscribe(
            (response: Response) => {
                console.log(response);
            },
            (error: Error) => {
                console.log(error);
            }
        );
    }

    signInUser(email: string, password: string) {
        const userCredentials = {
            email: email,
            password: password
        };

        localStorage.removeItem('currentUser');
        this.http.post(this.URL + '/login', userCredentials).subscribe(
            (response: Response) => {
                const token = response.json().token;
                //console.log("Storing token:" + token);
                localStorage.setItem('currentUser', token);
                this.router.navigate(['/home/recipes']);
            },
            (error: Error) => {
                console.log(error);
            }
        );
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['']);
    }

    getToken() {
        return localStorage.getItem('currentUser');
    }

    isAuthenticated() {
        //console.log("me llamaron: " + localStorage.getItem('currentUser'));
        return localStorage.getItem('currentUser') != null;
    }
}