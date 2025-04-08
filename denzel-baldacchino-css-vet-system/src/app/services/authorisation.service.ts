import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})
export class AuthorisationService {
    
    private endpoint: string = "http://localhost:8080/authenticate";
    
    constructor(private http:HttpClient) { }

    login(username: string, password: string): Observable<{ jwtToken: string, username: string, role: string }> {
        
        return this.http.post<{ jwtToken: string, username: string, role: string }>(this.endpoint, { username, password });
      }
    logout() {
        localStorage.removeItem('token');
    }
    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }
    getToken(): string | null {
        return localStorage.getItem('token');
    }
    setToken(token: string) {
        localStorage.setItem('token', token);
    }
    setUserRole(role: string) {
        localStorage.setItem('role', role);
    }
    getUserRole(): string | null {
        return localStorage.getItem('role');
    }
    
}