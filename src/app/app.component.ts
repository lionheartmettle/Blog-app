import { Component } from '@angular/core';
import { DataService } from './data.service';
import { ListArticle } from './data.modle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Conduit-app';
  constructor(private dataService: DataService) {
    console.log('app work');
    const data = localStorage.getItem('myTodo');
    if (!data) {
    } else {
      this.dataService.dataUser = JSON.parse(data);
    }
  }
  change() {
    this.dataService.boo = true;
    this.dataService.getArticleByProfile(this.dataService.dataUser.user.username).subscribe((atrs: ListArticle) => {
      this.dataService.listArticle = atrs;
    });
  }
}
