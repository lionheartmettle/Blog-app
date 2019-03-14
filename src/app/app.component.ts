import { Component } from '@angular/core';
import { DataService } from './data.service';
import { ListArticle } from './data.modle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Conduit-app';
  constructor(private dataService: DataService, private router: Router) {
    const data = localStorage.getItem('myTodo');
    if (!data) {
    } else {
      this.dataService.dataUser = JSON.parse(data);
    }
  }
  // change() {
  //   this.dataService.boo = true;
  //   this.dataService.getArticleByProfile(this.dataService.dataUser.user.username, '0').subscribe((atrs: ListArticle) => {
  //     this.dataService.listArticle = atrs;
  //   });
  // }
  watchIn() {
    if (this.dataService.dataUser) {
      if (((new Date()).getTime() - this.dataService.time) > 10000) {
        localStorage.clear();
        alert('You dont use this app to long, plz sign in again !');
        this.router.navigateByUrl('/');
        window.location.reload();
      }
    }
  }
  watchOut() {
    if (this.dataService.dataUser) {
      this.dataService.time = (new Date()).getTime();
    }
  }
}
