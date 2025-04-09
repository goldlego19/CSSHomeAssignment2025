import { Component } from '@angular/core';
import { Router, RouterLink,RouterLinkActive} from '@angular/router';
import { AuthorisationService } from '../services/authorisation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  title: string = 'Veterinary Clinic System';

  constructor(private authService: AuthorisationService, private router:Router) { }
  
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  getUserRole(): string | null {
    return this.authService.getUserRole();
  }
  onSignOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
