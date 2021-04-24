import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Article } from 'src/app/interfaces/article';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  article$: Observable<Article>;
  article: Article;

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.article$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      switchMap(id => this.postService.getArticle(id)),
      map(singleArticle => singleArticle.article),
      // shareReplay(1) // 在同一頁面打相同API時，可取得最近(1)次API內容
    );
      // 使用以上寫法時，因switchMap會subscribe，可避免以下寫法造成巢狀結構，不易閱讀、維護

    // this.route.paramMap.subscribe(paramMap => {
    //   const id = paramMap.get('id');
    //   this.postService.getArticle(id).subscribe(singleArticle => {
    //     this.article = singleArticle.article;
    //     this.postService.getArticle(id).subscribe(singleArticle => {
    //       this.postService.getArticle(id).subscribe(singleArticle => {
    //       });
    //     });
    //   });
    // })

    // 延生閱讀以下差異
    // switchMap, concatMap, mergeMag, exhaustMap

  }
}
