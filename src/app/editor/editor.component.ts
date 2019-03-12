import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DetailArticle } from '../data.modle';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  createArticleform: FormGroup;
  tagForm = [];
  errors: {
    body: string[];
    description: string[];
    title: string[];
  };
  constructor(
    private dataService: DataService,
    private router: Router,
    private actRout: ActivatedRoute
  ) {
    this.createArticleform = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(),
      body: new FormControl(),
      tagList: new FormControl()
    });
  }

  ngOnInit() {
    this.actRout.paramMap.subscribe((params: ParamMap) => {
      this.dataService
        .getOneArticle(params.get('slug'))
        .subscribe((res: { article: DetailArticle }) => {
          this.dataService.detailArticle = res;
          this.createArticleform
            .get('title')
            .setValue(this.dataService.detailArticle.article.title);
          this.createArticleform
            .get('description')
            .setValue(this.dataService.detailArticle.article.description);
          this.createArticleform
            .get('body')
            .setValue(this.dataService.detailArticle.article.body);
        });
    });
  }

  addTags(input) {
    if (input.value !== '') {
      this.tagForm.push(input.value);
    }
    input.value = '';
  }

  deleteTag(i) {
    this.tagForm.splice(i, 1);
  }

  onSubmit() {
    this.createArticleform.get('tagList').setValue(this.tagForm);
    const artUp = {
      article: {
        title: this.createArticleform.get('title').value,
        description: this.createArticleform.get('description').value,
        body: this.createArticleform.get('body').value
      }
    };
    this.dataService.putArticle(this.dataService.detailArticle.article.slug, artUp).subscribe(
      (art: { article: DetailArticle }) => {
        this.errors = undefined;
        this.router.navigateByUrl(`/home/article/${art.article.slug}`);
      }
    );
  }
}
