import { Category } from './Category.model';

export interface PostNullable {
  readonly id: string | null;
  readonly title: string | null;
  readonly body: string | null;
  readonly author: string | null;
  readonly categories: Category[];
}
