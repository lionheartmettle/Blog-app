import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ListArticle, DetailArticle } from '../data.modle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  page = 1;
  pageSize = 10;
  profile = 'Eric Simons';
  tag: string;
  boo = true;
  foo = true;
  at: boolean;
  arr = [];
  o: string;
  currentPage = 1;

  constructor(private dataService: DataService, private router: Router) {
    const data = localStorage.getItem('myTodo');
    if (!data) {
      this.dataService.dataUser = undefined;
    } else {
      this.dataService.dataUser = JSON.parse(data);
    }
  }

  ngOnInit() {
    if (!this.dataService.dataUser) {
      this.dataService.getArticle('', '0').subscribe((res: ListArticle) => {
        this.dataService.listArticle = res;
        this.at = true;
      });
      this.boo = true;
      this.foo = true;
    } else {
      this.boo = false;
      this.dataService.getArticleByFeed('0').subscribe((res: ListArticle) => {
        this.arr = [];
        this.dataService.listArticle = res;
        for (let i = 0; i < res.articlesCount / 10; i++) {
          this.arr.push(i + 1);
        }
        this.checkAt();
      });
    }
    this.dataService.getTag().subscribe((res: { tags: string[] }) => {
      this.dataService.tags = res.tags;
    });
  }

  changeTag(tag: string, num: any) {
    this.tag = tag;
    this.o = '0';
    this.currentPage = 1;
    if (num !== undefined) {
      this.o = String(Number(this.o) + Number(num) * 10 - 10);
      this.currentPage = num;
    }
    this.dataService.getArticle(tag, this.o).subscribe((res: ListArticle) => {
      this.arr = [];
      this.dataService.listArticle = res;
      for (let i = 0; i < res.articlesCount / 10; i++) {
        this.arr.push(i + 1);
      }
    });
    this.boo = true;
    this.foo = false;
  }

  showArticleGlobal(num: any) {
    this.tag = '';
    this.o = '0';
    this.currentPage = 1;
    if (num !== undefined) {
      this.o = String(Number(this.o) + Number(num) * 10 - 10);
      this.currentPage = num;
    }
    this.dataService.getArticle('', this.o).subscribe((res: ListArticle) => {
      this.dataService.listArticle = res;
      this.at = true;
      this.arr = [];
      for (let i = 0; i < res.articlesCount / 10; i++) {
        this.arr.push(i + 1);
      }
    });
    this.boo = true;
    this.foo = true;
  }

  showArticleFeed(num: any) {
    this.tag = '';
    this.o = '0';
    this.currentPage = 1;
    if (num !== undefined) {
      this.o = String(Number(this.o) + Number(num) * 10 - 10);
      this.currentPage = num;
    }
    this.dataService.getArticleByFeed(this.o).subscribe((res: ListArticle) => {
      this.arr = [];
      this.dataService.listArticle = res;
      for (let i = 0; i < res.articlesCount / 10; i++) {
        this.arr.push(i + 1);
      }
      this.checkAt();
    });
    this.boo = false;
    this.foo = true;
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
        this.dataService
          .postFavArticle(d.slug)
          .subscribe();
      }
    }
  }

  paginationFollow(num: any) {
    if (this.foo) {
      if (this.boo) {
        this.showArticleGlobal(num);
      } else {
        this.showArticleFeed(num);
      }
    } else {
      this.changeTag(this.tag, num);
    }
  }
}
