import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ListArticle, DetailArticle } from '../data.modle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  page = 1;
  pageSize = 10;
  profile = 'Eric Simons';
  tag: string;
  boo = true;
  at: boolean;
  constructor(private dataService: DataService, private router: Router) {
    const data = localStorage.getItem('myTodo');
    if (!data) {
      this.dataService.dataUser = undefined;
    } else {
      this.dataService.dataUser = JSON.parse(data);
    }
    console.log(this.dataService.dataUser);
  }

  ngOnInit() {
    if (!this.dataService.dataUser) {
      this.dataService.getArticle('').subscribe((res: ListArticle) => {
        this.dataService.listArticle = res;
        this.at = true;
      });
      this.boo = true;
    } else {
      this.boo = false;
      this.dataService.getArticleByFeed().subscribe((res: ListArticle) => {
        this.dataService.listArticle = res;
        this.checkAt();
      });
    }
    this.dataService.getTag().subscribe((res: {tags: string[]}) => {
      this.dataService.tags = res.tags;
    });
  }
  changeTag(tag: string) {
    this.tag = tag;
    this.dataService.getArticle(tag).subscribe((res: ListArticle) => {
      this.dataService.listArticle = res;
    });
  }
  showArticleGlobal() {
    this.tag = '';
    this.dataService.getArticle('').subscribe((res: ListArticle) => {
      this.dataService.listArticle = res;
      this.at = true;
    });
    this.dataService.getTag().subscribe((res: {tags: string[]}) => {
      this.dataService.tags = res.tags;
    });
    this.boo = true;
  }
  showArticleFeed() {
    this.dataService.getArticleByFeed().subscribe((res: ListArticle) => {
      this.dataService.listArticle = res;
      this.checkAt();
    });
    this.boo = false;
  }
  checkAt() {
    if (this.dataService.listArticle.articles[0]) {
      this.at = true;
    } else {
      this.at = false;
    }
  }
  changeFavCount(d: DetailArticle) {
    if (!this.dataService.dataUser) {
      this.router.navigateByUrl('/signin');
    } else {
      if (d.favorited) {
        d.favorited = false;
        d.favoritesCount -= 1;
        this.dataService.deleteFavArticle(d.slug).subscribe();
      } else {
        d.favorited = true;
        d.favoritesCount += 1;
        this.dataService.postFavArticle(d.slug).subscribe((res) => console.log(res));
      }
    }
  }
}
