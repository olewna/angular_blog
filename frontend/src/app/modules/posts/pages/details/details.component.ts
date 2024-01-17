import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from 'src/app/shared/models/Post.model';
import { PostService } from 'src/app/shared/services/post.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public constructor(
    private activaredRoute: ActivatedRoute,
    private postService: PostService,
    private userService: UsersService,
    private location: Location,
    private router: Router
  ) {}
  protected id!: string;
  protected post: Post = {
    id: '',
    title: '',
    author: '',
    body: '',
    categories: [],
  };
  protected toDelete: boolean = false;
  protected whoIsLogged: string = this.userService.getWhoIsLogged();
  protected loading: boolean = true;

  public ngOnInit(): void {
    this.activaredRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.postService.getPostById(this.id).subscribe((res: Post) => {
      this.post = res;
      this.loading = false;
    });
  }

  public deletePost(): void {
    this.toDelete = true;
  }

  public cancel(): void {
    this.toDelete = false;
  }

  public confirm(): void {
    this.postService.deletePostById(this.id).subscribe(() => {
      this.router.navigate(['home']);
    });
  }

  public goToEdit(): void {
    this.router.navigate(['posts', 'details', 'edit', this.id]);
  }

  public goBack(): void {
    this.location.back();
  }
}
