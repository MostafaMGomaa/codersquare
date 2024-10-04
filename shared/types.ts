export interface AbstractEntitiy {
  id: string;

  createdAt: Date;

  updatedAt: Date;
}
export interface Post {
  title: string;
  url: string;
  authorId: string;
  // comments:
  // likes:
}
