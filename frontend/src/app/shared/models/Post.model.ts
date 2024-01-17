export interface Post {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly author: string;
  readonly categories: string[];
}
