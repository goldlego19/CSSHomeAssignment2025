import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthorisationService } from '../services/authorisation.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage: string | null = null;


  constructor(private fb: FormBuilder,private authService: AuthorisationService,private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }


  onSubmit() {
    const { username, password } = this.loginForm.value;
    console.log(username, password);
    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log(response);
        this.authService.setToken(response.jwtToken);
        this.authService.setUserRole(response.role);
        this.router.navigate(['/appointments']);
        console.log('Login successful');
        console.log(this.authService.getToken());
        console.log(this.authService.getUserRole());
      },
      error: (error) => {
        console.error(error);
        
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
  shouldProcessControlValidationMessages(controlName:string){
    let control = this.loginForm.get(controlName)
    return ((control!.touched|| control!.dirty)&& control!.errors);
    }


}
