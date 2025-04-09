import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = !!localStorage.getItem('token'); // Example: Check if a token exists
    const userRole = localStorage.getItem('role'); // Example: Retrieve user role from localStorage

    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirect to login if not logged in
      return false;
    }

    // Check if the route has a required role
    const requiredRoles = route.data['roles'] as Array<string>;
    if (requiredRoles && !requiredRoles.includes(userRole ?? '')) {
      this.router.navigate(['/appointments']); 
      return false;
    }

    return true;
  }
}