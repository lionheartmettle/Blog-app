import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DataService } from "../data.service";
import { Router } from "@angular/router";
import { DetailArticle } from "../data.modle";

@Component({
  selector: "app-ce-article",
  templateUrl: "./ce-article.component.html",
  styleUrls: ["./ce-article.component.css"],
})
export class CeArticleComponent implements OnInit {
  createArticleform: FormGroup;
  tagForm = [];
  errors: {
    body: string[];
    description: string[];
    title: string[];
  };
  constructor(private dataService: DataService, private router: Router) {
    this.createArticleform = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl(),
      body: new FormControl(),
      tagList: new FormControl(),
    });
  }
  a: string;
  ngOnInit() {}

  addTags(input) {
    if (input.value !== "") {
      this.tagForm.push(input.value);
    }
    input.value = "";
  }

  deleteTag(i) {
    this.tagForm.splice(i, 1);
  }

  onSubmit() {
    console.log(this.createArticleform.value);
    console.log("form wrk");
    const crArticle = {
      article: {
        title: this.createArticleform.get("title").value,
        description: this.createArticleform.get("description").value,
        body: this.createArticleform.get("body").value,
        tagList: this.tagForm,
      },
    };
    this.dataService.postArticle(crArticle).subscribe(
      (art: { article: DetailArticle }) => {
        this.errors = undefined;
        console.log(art);
        this.router.navigateByUrl(`/home/article/${art.article.slug}`);
      },
      (error: any) => {
        this.errors = error.error.errors;
      }
    );
  }
}
