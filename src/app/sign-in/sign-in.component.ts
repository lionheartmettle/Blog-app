import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  error: string;
  constructor(private dataService: DataService, private router: Router) {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
   }

  ngOnInit() {
  }
  onSubmit() {
    this.dataService.postUserToLogin({user: this.signInForm.value}).subscribe((res) => {
      this.error = undefined;
      localStorage.setItem('myTodo', JSON.stringify(res));
      this.router.navigateByUrl('/');
    }, (error: any) => {
      this.error = error.error.errors['email or password'][0];
      console.log(this.error);
    });
  }
}
