import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { DataUser, UpdateUser } from '../data.modle';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  settingForm: FormGroup;
  update: UpdateUser;
  errors: {
    username: string[];
    email: string[];
    password: string[];
  };

  constructor(private router: Router, private dataService: DataService) {
    this.settingForm = new FormGroup({
      image: new FormControl(),
      username: new FormControl('', [Validators.required]),
      bio: new FormControl(),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    const data = localStorage.getItem('myTodo');
    if (!data) {
      this.router.navigateByUrl('/');
    } else {
      this.settingForm.get('email').setValue(JSON.parse(localStorage.getItem('myTodo')).user.email);
      this.settingForm.get('username').setValue(JSON.parse(localStorage.getItem('myTodo')).user.username);
      this.settingForm.get('bio').setValue(JSON.parse(localStorage.getItem('myTodo')).user.bio);
      if (JSON.parse(localStorage.getItem('myTodo')).user.image) {
        this.settingForm.get('image').setValue(JSON.parse(localStorage.getItem('myTodo')).user.image);
      } else {
        this.settingForm.get('image').setValue('https://static.productionready.io/images/smiley-cyrus.jpg');
      }
    }
   }
  ngOnInit() {
  }
  onSubmit() {
    this.update = {
      user: {
        email: this.settingForm.get('email').value,
        bio: this.settingForm.get('bio').value,
        image: this.settingForm.get('image').value,
        username: this.settingForm.get('username').value,
        password: this.settingForm.get('password').value
      }
    };
    this.dataService.putUpdateUser(this.update).subscribe((res: DataUser) => {
      this.dataService.dataUser = res;
      localStorage.setItem('myTodo', JSON.stringify(res));
      this.router.navigateByUrl(`/home/${res.user.username}`);
    }, (error: any) => {
      this.errors = error.error.errors;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/home');
  }
}
