import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeArticleComponent } from './ce-article.component';

describe('CeArticleComponent', () => {
  let component: CeArticleComponent;
  let fixture: ComponentFixture<CeArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
