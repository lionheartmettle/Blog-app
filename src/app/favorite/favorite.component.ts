import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ListArticle, Profile, DetailArticle } from '../data.modle';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  page = 1;
  pageSize = 5;
  constructor(private dataService: DataService, private actRout: ActivatedRoute, private router: Router) {
    dataService.boo = false;
  }

  ngOnInit() {
    this.actRout.parent.paramMap.subscribe((resP: ParamMap) => {
      console.log(resP.get('profile'));
      this.dataService.getFavoriteArticle(resP.get('profile')).subscribe((res: ListArticle) => {
        this.dataService.listArticle = res;
      });
    });
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