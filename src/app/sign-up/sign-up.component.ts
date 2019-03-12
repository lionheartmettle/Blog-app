import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { DataService } from "../data.service";
import { DataUser } from "../data.modle";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  errors: {
    username: string[];
    email: string[];
    password: string[];
  };
  constructor(
    private builder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.signUpForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit() {}
  onSubmit() {
    this.dataService.postUser({ user: this.signUpForm.value }).subscribe(
      (res: DataUser) => {
        this.errors = undefined;
        this.dataService.dataUser = res;
        localStorage.setItem("myTodo", JSON.stringify(res));
        this.router.navigateByUrl("/");
      },
      (error: any) => {
        this.errors = error.error.errors;
      }
    );
  }
}
