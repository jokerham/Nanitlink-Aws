export interface IAttachment {
  id: string;
  fileName: string;
  path: string;
}

export interface IComment {
  id: string;
  content: string;
  authorId: string;
  attachments?: {
    items: IAttachment[];
  };
}

export interface ITag {
  id: string;
  name: string;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  comments?: {
    items: IComment[];
  };
  attachments?: {
    items: IAttachment[];
  };
  status: string;
  tags?: {
    items: {
      tag: ITag[];
    }
  };
}

export interface IArticle {
  id: string;
  name: string;
  post?: IPost;
}