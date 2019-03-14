import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ListArticle, DetailArticle } from '../data.modle';
import { ParamMap, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  o: string;
  constructor(private dataService: DataService, private actRout: ActivatedRoute) {
    dataService.boo = false;
  }
  arr = [];
  currentPage = 1;
  ngOnInit() {
    this.actRout.parent.paramMap.subscribe((resP: ParamMap) => {
      console.log(resP.get('profile'));
      this.dataService.getFavoriteArticle(resP.get('profile'), '0').subscribe((res: ListArticle) => {
        this.dataService.listArticle = res;
        for (let i = 0; i < res.articlesCount / 5; i++) {
          this.arr.push(i + 1);
        }
      });
    });
  }

  showFavoriteArticle(num: number) {
    this.o = '0';
    if (num !== undefined) {
      this.o = String(Number(this.o) + Number(num) * 5 - 5);
    }
    this.actRout.parent.paramMap.subscribe((resP: ParamMap) => {
      console.log(resP.get('profile'));
      this.dataService.getFavoriteArticle(resP.get('profile'), this.o).subscribe((res: ListArticle) => {
        this.dataService.listArticle = res;
      });
    });
    this.currentPage = num;
  }
  changeMy() {
    this.dataService.boo = true;
  }
  changeFavCount(d: DetailArticle) {
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
