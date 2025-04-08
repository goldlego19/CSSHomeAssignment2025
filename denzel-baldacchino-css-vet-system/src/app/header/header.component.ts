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

  title: string = 'Veterinary Clinic sys';

  constructor(private authService: AuthorisationService, private router:Router) { }

  onSignOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
