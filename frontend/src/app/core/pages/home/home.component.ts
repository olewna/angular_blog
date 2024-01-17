import { HttpErrorResponse } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/models/Post.model';
import { User } from 'src/app/shared/models/User.model';
import { PostService } from 'src/app/shared/services/post.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, DoCheck {
  public constructor(
    private postService: PostService,
    private router: Router,
    private userService: UsersService
  ) {}
  protected posts: Post[] = [];
  protected filterPosts: Post[] = [];
  protected page: number = 1;
  private limit: number = 3;
  protected showedPosts: Post[] = [];
  protected nextPagePosts: Post[] = [];
  protected isNext: boolean = false;
  protected filteredAuthor: string = 'każdy';
  protected authors: string[] = [];
  protected sortAlphabetically: boolean = false;

  public ngOnInit(): void {
    this.postService.getAllPosts().subscribe((res: Post[]) => {
      this.posts = res;
      if (this.posts.length / this.limit > 1) this.isNext = true;
    });
    this.userService.getUsers().subscribe({
      next: (res: User[]) => {
        this.authors = [...res.map((u: User) => u.login), 'każdy'];
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error);
      },
    });
  }

  public ngDoCheck(): void {
    if (this.filteredAuthor !== 'każdy') {
      this.filterPosts = this.posts.filter(
        (x: Post) => x.author === this.filteredAuthor
      );
    } else {
      this.filterPosts = [...this.posts];
    }
    if (this.sortAlphabetically === true) {
      this.filterPosts = this.filterPosts.sort((x: Post, y: Post) => {
        const authorX: string = x.author.toLowerCase();
        const authorY: string = y.author.toLowerCase();

        if (authorX > authorY) {
          return 1;
        } else if (authorY > authorX) {
          return -1;
        }

        return 0;
      });
    }

    this.showedPosts = this.filterPosts.slice(
      this.page * this.limit - this.limit,
      this.page * this.limit
    );
  }

  public nextPage(): void {
    this.page += 1;
    this.nextPagePosts = this.posts.slice(
      this.page * this.limit,
      this.page * this.limit + this.limit
    );
    if (this.nextPagePosts.length === 0) {
      this.isNext = false;
    }
  }
  public prevPage(): void {
    this.page -= 1;
    this.isNext = true;
  }

  public goToDetails(id: string): void {
    this.router.navigate(['posts', 'details', id]);
  }

  public goToAddPost(): void {
    this.router.navigate(['posts', 'add']);
  }

  public pageToOne(): void {
    this.page = 1;
  }
}
