/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateBoardInput = {
  id?: string | null,
  name: string,
  description?: string | null,
};

export type ModelBoardConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelBoardConditionInput | null > | null,
  or?: Array< ModelBoardConditionInput | null > | null,
  not?: ModelBoardConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Board = {
  __typename: "Board",
  id: string,
  name: string,
  description?: string | null,
  posts?: ModelPostConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items:  Array<Post | null >,
  nextToken?: string | null,
};

export type Post = {
  __typename: "Post",
  id: string,
  title: string,
  content: string,
  article?: Article | null,
  board?: Board | null,
  authorId: string,
  comments?: ModelCommentConnection | null,
  attachments?: ModelMediaConnection | null,
  status: PostStatus,
  postType: PostType,
  tags?: ModelPostTagsConnection | null,
  createdAt: string,
  updatedAt: string,
  boardPostsId?: string | null,
  categoryPostsId?: string | null,
  postArticleId?: string | null,
  postBoardId?: string | null,
};

export type Article = {
  __typename: "Article",
  id: string,
  name: string,
  post?: Post | null,
  createdAt: string,
  updatedAt: string,
  articlePostId?: string | null,
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection",
  items:  Array<Comment | null >,
  nextToken?: string | null,
};

export type Comment = {
  __typename: "Comment",
  id: string,
  post?: Post | null,
  authorId: string,
  content: string,
  attachments?: ModelMediaConnection | null,
  createdAt: string,
  updatedAt: string,
  postCommentsId?: string | null,
};

export type ModelMediaConnection = {
  __typename: "ModelMediaConnection",
  items:  Array<Media | null >,
  nextToken?: string | null,
};

export type Media = {
  __typename: "Media",
  id: string,
  fileName: string,
  path: string,
  post?: Post | null,
  comment?: Comment | null,
  createdAt: string,
  updatedAt: string,
  postAttachmentsId?: string | null,
  commentAttachmentsId?: string | null,
  authorId?: string | null,
};

export enum PostStatus {
  PUBLISHED = "PUBLISHED",
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED",
}


export enum PostType {
  BOARD = "BOARD",
  ARTICLE = "ARTICLE",
}


export type ModelPostTagsConnection = {
  __typename: "ModelPostTagsConnection",
  items:  Array<PostTags | null >,
  nextToken?: string | null,
};

export type PostTags = {
  __typename: "PostTags",
  id: string,
  postId: string,
  tagId: string,
  post: Post,
  tag: Tag,
  createdAt: string,
  updatedAt: string,
  authorId?: string | null,
};

export type Tag = {
  __typename: "Tag",
  id: string,
  name: string,
  posts?: ModelPostTagsConnection | null,
  createdAt: string,
  updatedAt: string,
  authorId?: string | null,
};

export type UpdateBoardInput = {
  id: string,
  name?: string | null,
  description?: string | null,
};

export type DeleteBoardInput = {
  id: string,
};

export type CreatePostInput = {
  id?: string | null,
  title: string,
  content: string,
  authorId: string,
  status: PostStatus,
  postType: PostType,
  boardPostsId?: string | null,
  categoryPostsId?: string | null,
  postArticleId?: string | null,
  postBoardId?: string | null,
};

export type ModelPostConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  authorId?: ModelStringInput | null,
  status?: ModelPostStatusInput | null,
  postType?: ModelPostTypeInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  boardPostsId?: ModelIDInput | null,
  categoryPostsId?: ModelIDInput | null,
  postArticleId?: ModelIDInput | null,
  postBoardId?: ModelIDInput | null,
};

export type ModelPostStatusInput = {
  eq?: PostStatus | null,
  ne?: PostStatus | null,
};

export type ModelPostTypeInput = {
  eq?: PostType | null,
  ne?: PostType | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePostInput = {
  id: string,
  title?: string | null,
  content?: string | null,
  authorId?: string | null,
  status?: PostStatus | null,
  postType?: PostType | null,
  boardPostsId?: string | null,
  categoryPostsId?: string | null,
  postArticleId?: string | null,
  postBoardId?: string | null,
};

export type DeletePostInput = {
  id: string,
};

export type CreateCommentInput = {
  id?: string | null,
  authorId: string,
  content: string,
  postCommentsId?: string | null,
};

export type ModelCommentConditionInput = {
  authorId?: ModelStringInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  postCommentsId?: ModelIDInput | null,
};

export type UpdateCommentInput = {
  id: string,
  authorId?: string | null,
  content?: string | null,
  postCommentsId?: string | null,
};

export type DeleteCommentInput = {
  id: string,
};

export type CreateMediaInput = {
  id?: string | null,
  fileName: string,
  path: string,
  postAttachmentsId?: string | null,
  commentAttachmentsId?: string | null,
};

export type ModelMediaConditionInput = {
  fileName?: ModelStringInput | null,
  path?: ModelStringInput | null,
  and?: Array< ModelMediaConditionInput | null > | null,
  or?: Array< ModelMediaConditionInput | null > | null,
  not?: ModelMediaConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  postAttachmentsId?: ModelIDInput | null,
  commentAttachmentsId?: ModelIDInput | null,
  authorId?: ModelStringInput | null,
};

export type UpdateMediaInput = {
  id: string,
  fileName?: string | null,
  path?: string | null,
  postAttachmentsId?: string | null,
  commentAttachmentsId?: string | null,
};

export type DeleteMediaInput = {
  id: string,
};

export type CreateMenuInput = {
  id?: string | null,
  name: string,
  module?: string | null,
  moduleId?: string | null,
  parentId?: string | null,
  link?: string | null,
  sortOrder: number,
};

export type ModelMenuConditionInput = {
  name?: ModelStringInput | null,
  module?: ModelStringInput | null,
  moduleId?: ModelStringInput | null,
  parentId?: ModelIDInput | null,
  link?: ModelStringInput | null,
  sortOrder?: ModelIntInput | null,
  and?: Array< ModelMenuConditionInput | null > | null,
  or?: Array< ModelMenuConditionInput | null > | null,
  not?: ModelMenuConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Menu = {
  __typename: "Menu",
  id: string,
  name: string,
  module?: string | null,
  moduleId?: string | null,
  parentId?: string | null,
  parent?: Menu | null,
  children?: ModelMenuConnection | null,
  link?: string | null,
  sortOrder: number,
  createdAt: string,
  updatedAt: string,
};

export type ModelMenuConnection = {
  __typename: "ModelMenuConnection",
  items:  Array<Menu | null >,
  nextToken?: string | null,
};

export type UpdateMenuInput = {
  id: string,
  name?: string | null,
  module?: string | null,
  moduleId?: string | null,
  parentId?: string | null,
  link?: string | null,
  sortOrder?: number | null,
};

export type DeleteMenuInput = {
  id: string,
};

export type CreateArticleInput = {
  id?: string | null,
  name: string,
  articlePostId?: string | null,
};

export type ModelArticleConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelArticleConditionInput | null > | null,
  or?: Array< ModelArticleConditionInput | null > | null,
  not?: ModelArticleConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  articlePostId?: ModelIDInput | null,
};

export type UpdateArticleInput = {
  id: string,
  name?: string | null,
  articlePostId?: string | null,
};

export type DeleteArticleInput = {
  id: string,
};

export type CreateCategoryInput = {
  id?: string | null,
  name: string,
};

export type ModelCategoryConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Category = {
  __typename: "Category",
  id: string,
  name: string,
  posts?: ModelPostConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCategoryInput = {
  id: string,
  name?: string | null,
};

export type DeleteCategoryInput = {
  id: string,
};

export type CreateTagInput = {
  id?: string | null,
  name: string,
};

export type ModelTagConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelTagConditionInput | null > | null,
  or?: Array< ModelTagConditionInput | null > | null,
  not?: ModelTagConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  authorId?: ModelStringInput | null,
};

export type UpdateTagInput = {
  id: string,
  name?: string | null,
};

export type DeleteTagInput = {
  id: string,
};

export type CreateSiteSettingInput = {
  key: string,
  value: string,
  id?: string | null,
};

export type ModelSiteSettingConditionInput = {
  key?: ModelIDInput | null,
  value?: ModelStringInput | null,
  and?: Array< ModelSiteSettingConditionInput | null > | null,
  or?: Array< ModelSiteSettingConditionInput | null > | null,
  not?: ModelSiteSettingConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type SiteSetting = {
  __typename: "SiteSetting",
  key: string,
  value: string,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSiteSettingInput = {
  key?: string | null,
  value?: string | null,
  id: string,
};

export type DeleteSiteSettingInput = {
  id: string,
};

export type CreateActivityLogInput = {
  id?: string | null,
  userId: string,
  action: string,
  timestamp?: string | null,
};

export type ModelActivityLogConditionInput = {
  userId?: ModelStringInput | null,
  action?: ModelStringInput | null,
  timestamp?: ModelStringInput | null,
  and?: Array< ModelActivityLogConditionInput | null > | null,
  or?: Array< ModelActivityLogConditionInput | null > | null,
  not?: ModelActivityLogConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ActivityLog = {
  __typename: "ActivityLog",
  id: string,
  userId: string,
  action: string,
  timestamp?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateActivityLogInput = {
  id: string,
  userId?: string | null,
  action?: string | null,
  timestamp?: string | null,
};

export type DeleteActivityLogInput = {
  id: string,
};

export type CreatePostTagsInput = {
  id?: string | null,
  postId: string,
  tagId: string,
};

export type ModelPostTagsConditionInput = {
  postId?: ModelIDInput | null,
  tagId?: ModelIDInput | null,
  and?: Array< ModelPostTagsConditionInput | null > | null,
  or?: Array< ModelPostTagsConditionInput | null > | null,
  not?: ModelPostTagsConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  authorId?: ModelStringInput | null,
};

export type UpdatePostTagsInput = {
  id: string,
  postId?: string | null,
  tagId?: string | null,
};

export type DeletePostTagsInput = {
  id: string,
};

export type ModelBoardFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelBoardFilterInput | null > | null,
  or?: Array< ModelBoardFilterInput | null > | null,
  not?: ModelBoardFilterInput | null,
};

export type ModelBoardConnection = {
  __typename: "ModelBoardConnection",
  items:  Array<Board | null >,
  nextToken?: string | null,
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  authorId?: ModelStringInput | null,
  status?: ModelPostStatusInput | null,
  postType?: ModelPostTypeInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
  boardPostsId?: ModelIDInput | null,
  categoryPostsId?: ModelIDInput | null,
  postArticleId?: ModelIDInput | null,
  postBoardId?: ModelIDInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  authorId?: ModelStringInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
  postCommentsId?: ModelIDInput | null,
};

export type ModelMediaFilterInput = {
  id?: ModelIDInput | null,
  fileName?: ModelStringInput | null,
  path?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMediaFilterInput | null > | null,
  or?: Array< ModelMediaFilterInput | null > | null,
  not?: ModelMediaFilterInput | null,
  postAttachmentsId?: ModelIDInput | null,
  commentAttachmentsId?: ModelIDInput | null,
  authorId?: ModelStringInput | null,
};

export type ModelMenuFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  module?: ModelStringInput | null,
  moduleId?: ModelStringInput | null,
  parentId?: ModelIDInput | null,
  link?: ModelStringInput | null,
  sortOrder?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMenuFilterInput | null > | null,
  or?: Array< ModelMenuFilterInput | null > | null,
  not?: ModelMenuFilterInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelArticleFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelArticleFilterInput | null > | null,
  or?: Array< ModelArticleFilterInput | null > | null,
  not?: ModelArticleFilterInput | null,
  articlePostId?: ModelIDInput | null,
};

export type ModelArticleConnection = {
  __typename: "ModelArticleConnection",
  items:  Array<Article | null >,
  nextToken?: string | null,
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection",
  items:  Array<Category | null >,
  nextToken?: string | null,
};

export type ModelTagFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTagFilterInput | null > | null,
  or?: Array< ModelTagFilterInput | null > | null,
  not?: ModelTagFilterInput | null,
  authorId?: ModelStringInput | null,
};

export type ModelTagConnection = {
  __typename: "ModelTagConnection",
  items:  Array<Tag | null >,
  nextToken?: string | null,
};

export type ModelSiteSettingFilterInput = {
  key?: ModelIDInput | null,
  value?: ModelStringInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSiteSettingFilterInput | null > | null,
  or?: Array< ModelSiteSettingFilterInput | null > | null,
  not?: ModelSiteSettingFilterInput | null,
};

export type ModelSiteSettingConnection = {
  __typename: "ModelSiteSettingConnection",
  items:  Array<SiteSetting | null >,
  nextToken?: string | null,
};

export type ModelActivityLogFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  action?: ModelStringInput | null,
  timestamp?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelActivityLogFilterInput | null > | null,
  or?: Array< ModelActivityLogFilterInput | null > | null,
  not?: ModelActivityLogFilterInput | null,
};

export type ModelActivityLogConnection = {
  __typename: "ModelActivityLogConnection",
  items:  Array<ActivityLog | null >,
  nextToken?: string | null,
};

export type ModelPostTagsFilterInput = {
  id?: ModelIDInput | null,
  postId?: ModelIDInput | null,
  tagId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPostTagsFilterInput | null > | null,
  or?: Array< ModelPostTagsFilterInput | null > | null,
  not?: ModelPostTagsFilterInput | null,
  authorId?: ModelStringInput | null,
};

export type ModelSubscriptionBoardFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionBoardFilterInput | null > | null,
  or?: Array< ModelSubscriptionBoardFilterInput | null > | null,
  boardPostsId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionPostFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  postType?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPostFilterInput | null > | null,
  or?: Array< ModelSubscriptionPostFilterInput | null > | null,
  postCommentsId?: ModelSubscriptionIDInput | null,
  postAttachmentsId?: ModelSubscriptionIDInput | null,
  postArticleId?: ModelSubscriptionIDInput | null,
  postBoardId?: ModelSubscriptionIDInput | null,
  authorId?: ModelStringInput | null,
};

export type ModelSubscriptionCommentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  content?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCommentFilterInput | null > | null,
  or?: Array< ModelSubscriptionCommentFilterInput | null > | null,
  commentAttachmentsId?: ModelSubscriptionIDInput | null,
  authorId?: ModelStringInput | null,
};

export type ModelSubscriptionMediaFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  fileName?: ModelSubscriptionStringInput | null,
  path?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMediaFilterInput | null > | null,
  or?: Array< ModelSubscriptionMediaFilterInput | null > | null,
  authorId?: ModelStringInput | null,
};

export type ModelSubscriptionMenuFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  module?: ModelSubscriptionStringInput | null,
  moduleId?: ModelSubscriptionStringInput | null,
  parentId?: ModelSubscriptionIDInput | null,
  link?: ModelSubscriptionStringInput | null,
  sortOrder?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMenuFilterInput | null > | null,
  or?: Array< ModelSubscriptionMenuFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionArticleFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionArticleFilterInput | null > | null,
  or?: Array< ModelSubscriptionArticleFilterInput | null > | null,
  articlePostId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionCategoryFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCategoryFilterInput | null > | null,
  or?: Array< ModelSubscriptionCategoryFilterInput | null > | null,
  categoryPostsId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionTagFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTagFilterInput | null > | null,
  or?: Array< ModelSubscriptionTagFilterInput | null > | null,
  authorId?: ModelStringInput | null,
};

export type ModelSubscriptionSiteSettingFilterInput = {
  key?: ModelSubscriptionIDInput | null,
  value?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSiteSettingFilterInput | null > | null,
  or?: Array< ModelSubscriptionSiteSettingFilterInput | null > | null,
};

export type ModelSubscriptionActivityLogFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  action?: ModelSubscriptionStringInput | null,
  timestamp?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionActivityLogFilterInput | null > | null,
  or?: Array< ModelSubscriptionActivityLogFilterInput | null > | null,
  userId?: ModelStringInput | null,
};

export type ModelSubscriptionPostTagsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  postId?: ModelSubscriptionIDInput | null,
  tagId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPostTagsFilterInput | null > | null,
  or?: Array< ModelSubscriptionPostTagsFilterInput | null > | null,
  authorId?: ModelStringInput | null,
};

export type CreateBoardMutationVariables = {
  input: CreateBoardInput,
  condition?: ModelBoardConditionInput | null,
};

export type CreateBoardMutation = {
  createBoard?:  {
    __typename: "Board",
    id: string,
    name: string,
    description?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBoardMutationVariables = {
  input: UpdateBoardInput,
  condition?: ModelBoardConditionInput | null,
};

export type UpdateBoardMutation = {
  updateBoard?:  {
    __typename: "Board",
    id: string,
    name: string,
    description?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteBoardMutationVariables = {
  input: DeleteBoardInput,
  condition?: ModelBoardConditionInput | null,
};

export type DeleteBoardMutation = {
  deleteBoard?:  {
    __typename: "Board",
    id: string,
    name: string,
    description?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    article?:  {
      __typename: "Article",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      articlePostId?: string | null,
    } | null,
    board?:  {
      __typename: "Board",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    authorId: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    attachments?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
    } | null,
    status: PostStatus,
    postType: PostType,
    tags?:  {
      __typename: "ModelPostTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    boardPostsId?: string | null,
    categoryPostsId?: string | null,
    postArticleId?: string | null,
    postBoardId?: string | null,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    article?:  {
      __typename: "Article",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      articlePostId?: string | null,
    } | null,
    board?:  {
      __typename: "Board",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    authorId: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    attachments?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
    } | null,
    status: PostStatus,
    postType: PostType,
    tags?:  {
      __typename: "ModelPostTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    boardPostsId?: string | null,
    categoryPostsId?: string | null,
    postArticleId?: string | null,
    postBoardId?: string | null,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    article?:  {
      __typename: "Article",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      articlePostId?: string | null,
    } | null,
    board?:  {
      __typename: "Board",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    authorId: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    attachments?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
    } | null,
    status: PostStatus,
    postType: PostType,
    tags?:  {
      __typename: "ModelPostTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    boardPostsId?: string | null,
    categoryPostsId?: string | null,
    postArticleId?: string | null,
    postBoardId?: string | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment?:  {
    __typename: "Comment",
    id: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    authorId: string,
    content: string,
    attachments?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    postCommentsId?: string | null,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment?:  {
    __typename: "Comment",
    id: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    authorId: string,
    content: string,
    attachments?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    postCommentsId?: string | null,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment?:  {
    __typename: "Comment",
    id: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    authorId: string,
    content: string,
    attachments?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    postCommentsId?: string | null,
  } | null,
};

export type CreateMediaMutationVariables = {
  input: CreateMediaInput,
  condition?: ModelMediaConditionInput | null,
};

export type CreateMediaMutation = {
  createMedia?:  {
    __typename: "Media",
    id: string,
    fileName: string,
    path: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    comment?:  {
      __typename: "Comment",
      id: string,
      authorId: string,
      content: string,
      createdAt: string,
      updatedAt: string,
      postCommentsId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    postAttachmentsId?: string | null,
    commentAttachmentsId?: string | null,
    authorId?: string | null,
  } | null,
};

export type UpdateMediaMutationVariables = {
  input: UpdateMediaInput,
  condition?: ModelMediaConditionInput | null,
};

export type UpdateMediaMutation = {
  updateMedia?:  {
    __typename: "Media",
    id: string,
    fileName: string,
    path: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    comment?:  {
      __typename: "Comment",
      id: string,
      authorId: string,
      content: string,
      createdAt: string,
      updatedAt: string,
      postCommentsId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    postAttachmentsId?: string | null,
    commentAttachmentsId?: string | null,
    authorId?: string | null,
  } | null,
};

export type DeleteMediaMutationVariables = {
  input: DeleteMediaInput,
  condition?: ModelMediaConditionInput | null,
};

export type DeleteMediaMutation = {
  deleteMedia?:  {
    __typename: "Media",
    id: string,
    fileName: string,
    path: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    comment?:  {
      __typename: "Comment",
      id: string,
      authorId: string,
      content: string,
      createdAt: string,
      updatedAt: string,
      postCommentsId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    postAttachmentsId?: string | null,
    commentAttachmentsId?: string | null,
    authorId?: string | null,
  } | null,
};

export type CreateMenuMutationVariables = {
  input: CreateMenuInput,
  condition?: ModelMenuConditionInput | null,
};

export type CreateMenuMutation = {
  createMenu?:  {
    __typename: "Menu",
    id: string,
    name: string,
    module?: string | null,
    moduleId?: string | null,
    parentId?: string | null,
    parent?:  {
      __typename: "Menu",
      id: string,
      name: string,
      module?: string | null,
      moduleId?: string | null,
      parentId?: string | null,
      link?: string | null,
      sortOrder: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    children?:  {
      __typename: "ModelMenuConnection",
      nextToken?: string | null,
    } | null,
    link?: string | null,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMenuMutationVariables = {
  input: UpdateMenuInput,
  condition?: ModelMenuConditionInput | null,
};

export type UpdateMenuMutation = {
  updateMenu?:  {
    __typename: "Menu",
    id: string,
    name: string,
    module?: string | null,
    moduleId?: string | null,
    parentId?: string | null,
    parent?:  {
      __typename: "Menu",
      id: string,
      name: string,
      module?: string | null,
      moduleId?: string | null,
      parentId?: string | null,
      link?: string | null,
      sortOrder: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    children?:  {
      __typename: "ModelMenuConnection",
      nextToken?: string | null,
    } | null,
    link?: string | null,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMenuMutationVariables = {
  input: DeleteMenuInput,
  condition?: ModelMenuConditionInput | null,
};

export type DeleteMenuMutation = {
  deleteMenu?:  {
    __typename: "Menu",
    id: string,
    name: string,
    module?: string | null,
    moduleId?: string | null,
    parentId?: string | null,
    parent?:  {
      __typename: "Menu",
      id: string,
      name: string,
      module?: string | null,
      moduleId?: string | null,
      parentId?: string | null,
      link?: string | null,
      sortOrder: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    children?:  {
      __typename: "ModelMenuConnection",
      nextToken?: string | null,
    } | null,
    link?: string | null,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateArticleMutationVariables = {
  input: CreateArticleInput,
  condition?: ModelArticleConditionInput | null,
};

export type CreateArticleMutation = {
  createArticle?:  {
    __typename: "Article",
    id: string,
    name: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    articlePostId?: string | null,
  } | null,
};

export type UpdateArticleMutationVariables = {
  input: UpdateArticleInput,
  condition?: ModelArticleConditionInput | null,
};

export type UpdateArticleMutation = {
  updateArticle?:  {
    __typename: "Article",
    id: string,
    name: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    articlePostId?: string | null,
  } | null,
};

export type DeleteArticleMutationVariables = {
  input: DeleteArticleInput,
  condition?: ModelArticleConditionInput | null,
};

export type DeleteArticleMutation = {
  deleteArticle?:  {
    __typename: "Article",
    id: string,
    name: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    articlePostId?: string | null,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input: CreateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type CreateCategoryMutation = {
  createCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCategoryMutationVariables = {
  input: UpdateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryMutation = {
  updateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCategoryMutationVariables = {
  input: DeleteCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type DeleteCategoryMutation = {
  deleteCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTagMutationVariables = {
  input: CreateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type CreateTagMutation = {
  createTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    posts?:  {
      __typename: "ModelPostTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    authorId?: string | null,
  } | null,
};

export type UpdateTagMutationVariables = {
  input: UpdateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type UpdateTagMutation = {
  updateTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    posts?:  {
      __typename: "ModelPostTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    authorId?: string | null,
  } | null,
};

export type DeleteTagMutationVariables = {
  input: DeleteTagInput,
  condition?: ModelTagConditionInput | null,
};

export type DeleteTagMutation = {
  deleteTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    posts?:  {
      __typename: "ModelPostTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    authorId?: string | null,
  } | null,
};

export type CreateSiteSettingMutationVariables = {
  input: CreateSiteSettingInput,
  condition?: ModelSiteSettingConditionInput | null,
};

export type CreateSiteSettingMutation = {
  createSiteSetting?:  {
    __typename: "SiteSetting",
    key: string,
    value: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSiteSettingMutationVariables = {
  input: UpdateSiteSettingInput,
  condition?: ModelSiteSettingConditionInput | null,
};

export type UpdateSiteSettingMutation = {
  updateSiteSetting?:  {
    __typename: "SiteSetting",
    key: string,
    value: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSiteSettingMutationVariables = {
  input: DeleteSiteSettingInput,
  condition?: ModelSiteSettingConditionInput | null,
};

export type DeleteSiteSettingMutation = {
  deleteSiteSetting?:  {
    __typename: "SiteSetting",
    key: string,
    value: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateActivityLogMutationVariables = {
  input: CreateActivityLogInput,
  condition?: ModelActivityLogConditionInput | null,
};

export type CreateActivityLogMutation = {
  createActivityLog?:  {
    __typename: "ActivityLog",
    id: string,
    userId: string,
    action: string,
    timestamp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateActivityLogMutationVariables = {
  input: UpdateActivityLogInput,
  condition?: ModelActivityLogConditionInput | null,
};

export type UpdateActivityLogMutation = {
  updateActivityLog?:  {
    __typename: "ActivityLog",
    id: string,
    userId: string,
    action: string,
    timestamp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteActivityLogMutationVariables = {
  input: DeleteActivityLogInput,
  condition?: ModelActivityLogConditionInput | null,
};

export type DeleteActivityLogMutation = {
  deleteActivityLog?:  {
    __typename: "ActivityLog",
    id: string,
    userId: string,
    action: string,
    timestamp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePostTagsMutationVariables = {
  input: CreatePostTagsInput,
  condition?: ModelPostTagsConditionInput | null,
};

export type CreatePostTagsMutation = {
  createPostTags?:  {
    __typename: "PostTags",
    id: string,
    postId: string,
    tagId: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      authorId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    authorId?: string | null,
  } | null,
};

export type UpdatePostTagsMutationVariables = {
  input: UpdatePostTagsInput,
  condition?: ModelPostTagsConditionInput | null,
};

export type UpdatePostTagsMutation = {
  updatePostTags?:  {
    __typename: "PostTags",
    id: string,
    postId: string,
    tagId: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      authorId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    authorId?: string | null,
  } | null,
};

export type DeletePostTagsMutationVariables = {
  input: DeletePostTagsInput,
  condition?: ModelPostTagsConditionInput | null,
};

export type DeletePostTagsMutation = {
  deletePostTags?:  {
    __typename: "PostTags",
    id: string,
    postId: string,
    tagId: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      authorId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    authorId?: string | null,
  } | null,
};

export type GetBoardQueryVariables = {
  id: string,
};

export type GetBoardQuery = {
  getBoard?:  {
    __typename: "Board",
    id: string,
    name: string,
    description?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBoardsQueryVariables = {
  filter?: ModelBoardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBoardsQuery = {
  listBoards?:  {
    __typename: "ModelBoardConnection",
    items:  Array< {
      __typename: "Board",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    article?:  {
      __typename: "Article",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      articlePostId?: string | null,
    } | null,
    board?:  {
      __typename: "Board",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    authorId: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    attachments?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
    } | null,
    status: PostStatus,
    postType: PostType,
    tags?:  {
      __typename: "ModelPostTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    boardPostsId?: string | null,
    categoryPostsId?: string | null,
    postArticleId?: string | null,
    postBoardId?: string | null,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment?:  {
    __typename: "Comment",
    id: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    authorId: string,
    content: string,
    attachments?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    postCommentsId?: string | null,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      authorId: string,
      content: string,
      createdAt: string,
      updatedAt: string,
      postCommentsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMediaQueryVariables = {
  id: string,
};

export type GetMediaQuery = {
  getMedia?:  {
    __typename: "Media",
    id: string,
    fileName: string,
    path: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    comment?:  {
      __typename: "Comment",
      id: string,
      authorId: string,
      content: string,
      createdAt: string,
      updatedAt: string,
      postCommentsId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    postAttachmentsId?: string | null,
    commentAttachmentsId?: string | null,
    authorId?: string | null,
  } | null,
};

export type ListMediaQueryVariables = {
  filter?: ModelMediaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMediaQuery = {
  listMedia?:  {
    __typename: "ModelMediaConnection",
    items:  Array< {
      __typename: "Media",
      id: string,
      fileName: string,
      path: string,
      createdAt: string,
      updatedAt: string,
      postAttachmentsId?: string | null,
      commentAttachmentsId?: string | null,
      authorId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMenuQueryVariables = {
  id: string,
};

export type GetMenuQuery = {
  getMenu?:  {
    __typename: "Menu",
    id: string,
    name: string,
    module?: string | null,
    moduleId?: string | null,
    parentId?: string | null,
    parent?:  {
      __typename: "Menu",
      id: string,
      name: string,
      module?: string | null,
      moduleId?: string | null,
      parentId?: string | null,
      link?: string | null,
      sortOrder: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    children?:  {
      __typename: "ModelMenuConnection",
      nextToken?: string | null,
    } | null,
    link?: string | null,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMenusQueryVariables = {
  filter?: ModelMenuFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMenusQuery = {
  listMenus?:  {
    __typename: "ModelMenuConnection",
    items:  Array< {
      __typename: "Menu",
      id: string,
      name: string,
      module?: string | null,
      moduleId?: string | null,
      parentId?: string | null,
      link?: string | null,
      sortOrder: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type MenusByParentIdAndNameQueryVariables = {
  parentId: string,
  name?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMenuFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type MenusByParentIdAndNameQuery = {
  menusByParentIdAndName?:  {
    __typename: "ModelMenuConnection",
    items:  Array< {
      __typename: "Menu",
      id: string,
      name: string,
      module?: string | null,
      moduleId?: string | null,
      parentId?: string | null,
      link?: string | null,
      sortOrder: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetArticleQueryVariables = {
  id: string,
};

export type GetArticleQuery = {
  getArticle?:  {
    __typename: "Article",
    id: string,
    name: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    articlePostId?: string | null,
  } | null,
};

export type ListArticlesQueryVariables = {
  filter?: ModelArticleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListArticlesQuery = {
  listArticles?:  {
    __typename: "ModelArticleConnection",
    items:  Array< {
      __typename: "Article",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      articlePostId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCategoryQueryVariables = {
  id: string,
};

export type GetCategoryQuery = {
  getCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCategoriesQueryVariables = {
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategoriesQuery = {
  listCategories?:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTagQueryVariables = {
  id: string,
};

export type GetTagQuery = {
  getTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    posts?:  {
      __typename: "ModelPostTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    authorId?: string | null,
  } | null,
};

export type ListTagsQueryVariables = {
  filter?: ModelTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTagsQuery = {
  listTags?:  {
    __typename: "ModelTagConnection",
    items:  Array< {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      authorId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSiteSettingQueryVariables = {
  id: string,
};

export type GetSiteSettingQuery = {
  getSiteSetting?:  {
    __typename: "SiteSetting",
    key: string,
    value: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSiteSettingsQueryVariables = {
  filter?: ModelSiteSettingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSiteSettingsQuery = {
  listSiteSettings?:  {
    __typename: "ModelSiteSettingConnection",
    items:  Array< {
      __typename: "SiteSetting",
      key: string,
      value: string,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetActivityLogQueryVariables = {
  id: string,
};

export type GetActivityLogQuery = {
  getActivityLog?:  {
    __typename: "ActivityLog",
    id: string,
    userId: string,
    action: string,
    timestamp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListActivityLogsQueryVariables = {
  filter?: ModelActivityLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListActivityLogsQuery = {
  listActivityLogs?:  {
    __typename: "ModelActivityLogConnection",
    items:  Array< {
      __typename: "ActivityLog",
      id: string,
      userId: string,
      action: string,
      timestamp?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPostTagsQueryVariables = {
  id: string,
};

export type GetPostTagsQuery = {
  getPostTags?:  {
    __typename: "PostTags",
    id: string,
    postId: string,
    tagId: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      authorId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    authorId?: string | null,
  } | null,
};

export type ListPostTagsQueryVariables = {
  filter?: ModelPostTagsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostTagsQuery = {
  listPostTags?:  {
    __typename: "ModelPostTagsConnection",
    items:  Array< {
      __typename: "PostTags",
      id: string,
      postId: string,
      tagId: string,
      createdAt: string,
      updatedAt: string,
      authorId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostTagsByPostIdQueryVariables = {
  postId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostTagsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostTagsByPostIdQuery = {
  postTagsByPostId?:  {
    __typename: "ModelPostTagsConnection",
    items:  Array< {
      __typename: "PostTags",
      id: string,
      postId: string,
      tagId: string,
      createdAt: string,
      updatedAt: string,
      authorId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostTagsByTagIdQueryVariables = {
  tagId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostTagsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostTagsByTagIdQuery = {
  postTagsByTagId?:  {
    __typename: "ModelPostTagsConnection",
    items:  Array< {
      __typename: "PostTags",
      id: string,
      postId: string,
      tagId: string,
      createdAt: string,
      updatedAt: string,
      authorId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateBoardSubscriptionVariables = {
  filter?: ModelSubscriptionBoardFilterInput | null,
};

export type OnCreateBoardSubscription = {
  onCreateBoard?:  {
    __typename: "Board",
    id: string,
    name: string,
    description?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBoardSubscriptionVariables = {
  filter?: ModelSubscriptionBoardFilterInput | null,
};

export type OnUpdateBoardSubscription = {
  onUpdateBoard?:  {
    __typename: "Board",
    id: string,
    name: string,
    description?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBoardSubscriptionVariables = {
  filter?: ModelSubscriptionBoardFilterInput | null,
};

export type OnDeleteBoardSubscription = {
  onDeleteBoard?:  {
    __typename: "Board",
    id: string,
    name: string,
    description?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
  authorId?: string | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    article?:  {
      __typename: "Article",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      articlePostId?: string | null,
    } | null,
    board?:  {
      __typename: "Board",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    authorId: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    attachments?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
    } | null,
    status: PostStatus,
    postType: PostType,
    tags?:  {
      __typename: "ModelPostTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    boardPostsId?: string | null,
    categoryPostsId?: string | null,
    postArticleId?: string | null,
    postBoardId?: string | null,
  } | null,
};

export type OnUpdatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
  authorId?: string | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    article?:  {
      __typename: "Article",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      articlePostId?: string | null,
    } | null,
    board?:  {
      __typename: "Board",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    authorId: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    attachments?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
    } | null,
    status: PostStatus,
    postType: PostType,
    tags?:  {
      __typename: "ModelPostTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    boardPostsId?: string | null,
    categoryPostsId?: string | null,
    postArticleId?: string | null,
    postBoardId?: string | null,
  } | null,
};

export type OnDeletePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
  authorId?: string | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    article?:  {
      __typename: "Article",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      articlePostId?: string | null,
    } | null,
    board?:  {
      __typename: "Board",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    authorId: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    attachments?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
    } | null,
    status: PostStatus,
    postType: PostType,
    tags?:  {
      __typename: "ModelPostTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    boardPostsId?: string | null,
    categoryPostsId?: string | null,
    postArticleId?: string | null,
    postBoardId?: string | null,
  } | null,
};

export type OnCreateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
  authorId?: string | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment?:  {
    __typename: "Comment",
    id: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    authorId: string,
    content: string,
    attachments?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    postCommentsId?: string | null,
  } | null,
};

export type OnUpdateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
  authorId?: string | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment?:  {
    __typename: "Comment",
    id: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    authorId: string,
    content: string,
    attachments?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    postCommentsId?: string | null,
  } | null,
};

export type OnDeleteCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
  authorId?: string | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment?:  {
    __typename: "Comment",
    id: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    authorId: string,
    content: string,
    attachments?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    postCommentsId?: string | null,
  } | null,
};

export type OnCreateMediaSubscriptionVariables = {
  filter?: ModelSubscriptionMediaFilterInput | null,
  authorId?: string | null,
};

export type OnCreateMediaSubscription = {
  onCreateMedia?:  {
    __typename: "Media",
    id: string,
    fileName: string,
    path: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    comment?:  {
      __typename: "Comment",
      id: string,
      authorId: string,
      content: string,
      createdAt: string,
      updatedAt: string,
      postCommentsId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    postAttachmentsId?: string | null,
    commentAttachmentsId?: string | null,
    authorId?: string | null,
  } | null,
};

export type OnUpdateMediaSubscriptionVariables = {
  filter?: ModelSubscriptionMediaFilterInput | null,
  authorId?: string | null,
};

export type OnUpdateMediaSubscription = {
  onUpdateMedia?:  {
    __typename: "Media",
    id: string,
    fileName: string,
    path: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    comment?:  {
      __typename: "Comment",
      id: string,
      authorId: string,
      content: string,
      createdAt: string,
      updatedAt: string,
      postCommentsId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    postAttachmentsId?: string | null,
    commentAttachmentsId?: string | null,
    authorId?: string | null,
  } | null,
};

export type OnDeleteMediaSubscriptionVariables = {
  filter?: ModelSubscriptionMediaFilterInput | null,
  authorId?: string | null,
};

export type OnDeleteMediaSubscription = {
  onDeleteMedia?:  {
    __typename: "Media",
    id: string,
    fileName: string,
    path: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    comment?:  {
      __typename: "Comment",
      id: string,
      authorId: string,
      content: string,
      createdAt: string,
      updatedAt: string,
      postCommentsId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    postAttachmentsId?: string | null,
    commentAttachmentsId?: string | null,
    authorId?: string | null,
  } | null,
};

export type OnCreateMenuSubscriptionVariables = {
  filter?: ModelSubscriptionMenuFilterInput | null,
};

export type OnCreateMenuSubscription = {
  onCreateMenu?:  {
    __typename: "Menu",
    id: string,
    name: string,
    module?: string | null,
    moduleId?: string | null,
    parentId?: string | null,
    parent?:  {
      __typename: "Menu",
      id: string,
      name: string,
      module?: string | null,
      moduleId?: string | null,
      parentId?: string | null,
      link?: string | null,
      sortOrder: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    children?:  {
      __typename: "ModelMenuConnection",
      nextToken?: string | null,
    } | null,
    link?: string | null,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMenuSubscriptionVariables = {
  filter?: ModelSubscriptionMenuFilterInput | null,
};

export type OnUpdateMenuSubscription = {
  onUpdateMenu?:  {
    __typename: "Menu",
    id: string,
    name: string,
    module?: string | null,
    moduleId?: string | null,
    parentId?: string | null,
    parent?:  {
      __typename: "Menu",
      id: string,
      name: string,
      module?: string | null,
      moduleId?: string | null,
      parentId?: string | null,
      link?: string | null,
      sortOrder: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    children?:  {
      __typename: "ModelMenuConnection",
      nextToken?: string | null,
    } | null,
    link?: string | null,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMenuSubscriptionVariables = {
  filter?: ModelSubscriptionMenuFilterInput | null,
};

export type OnDeleteMenuSubscription = {
  onDeleteMenu?:  {
    __typename: "Menu",
    id: string,
    name: string,
    module?: string | null,
    moduleId?: string | null,
    parentId?: string | null,
    parent?:  {
      __typename: "Menu",
      id: string,
      name: string,
      module?: string | null,
      moduleId?: string | null,
      parentId?: string | null,
      link?: string | null,
      sortOrder: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    children?:  {
      __typename: "ModelMenuConnection",
      nextToken?: string | null,
    } | null,
    link?: string | null,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateArticleSubscriptionVariables = {
  filter?: ModelSubscriptionArticleFilterInput | null,
};

export type OnCreateArticleSubscription = {
  onCreateArticle?:  {
    __typename: "Article",
    id: string,
    name: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    articlePostId?: string | null,
  } | null,
};

export type OnUpdateArticleSubscriptionVariables = {
  filter?: ModelSubscriptionArticleFilterInput | null,
};

export type OnUpdateArticleSubscription = {
  onUpdateArticle?:  {
    __typename: "Article",
    id: string,
    name: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    articlePostId?: string | null,
  } | null,
};

export type OnDeleteArticleSubscriptionVariables = {
  filter?: ModelSubscriptionArticleFilterInput | null,
};

export type OnDeleteArticleSubscription = {
  onDeleteArticle?:  {
    __typename: "Article",
    id: string,
    name: string,
    post?:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    articlePostId?: string | null,
  } | null,
};

export type OnCreateCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTagSubscriptionVariables = {
  filter?: ModelSubscriptionTagFilterInput | null,
  authorId?: string | null,
};

export type OnCreateTagSubscription = {
  onCreateTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    posts?:  {
      __typename: "ModelPostTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    authorId?: string | null,
  } | null,
};

export type OnUpdateTagSubscriptionVariables = {
  filter?: ModelSubscriptionTagFilterInput | null,
  authorId?: string | null,
};

export type OnUpdateTagSubscription = {
  onUpdateTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    posts?:  {
      __typename: "ModelPostTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    authorId?: string | null,
  } | null,
};

export type OnDeleteTagSubscriptionVariables = {
  filter?: ModelSubscriptionTagFilterInput | null,
  authorId?: string | null,
};

export type OnDeleteTagSubscription = {
  onDeleteTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    posts?:  {
      __typename: "ModelPostTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    authorId?: string | null,
  } | null,
};

export type OnCreateSiteSettingSubscriptionVariables = {
  filter?: ModelSubscriptionSiteSettingFilterInput | null,
};

export type OnCreateSiteSettingSubscription = {
  onCreateSiteSetting?:  {
    __typename: "SiteSetting",
    key: string,
    value: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSiteSettingSubscriptionVariables = {
  filter?: ModelSubscriptionSiteSettingFilterInput | null,
};

export type OnUpdateSiteSettingSubscription = {
  onUpdateSiteSetting?:  {
    __typename: "SiteSetting",
    key: string,
    value: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSiteSettingSubscriptionVariables = {
  filter?: ModelSubscriptionSiteSettingFilterInput | null,
};

export type OnDeleteSiteSettingSubscription = {
  onDeleteSiteSetting?:  {
    __typename: "SiteSetting",
    key: string,
    value: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateActivityLogSubscriptionVariables = {
  filter?: ModelSubscriptionActivityLogFilterInput | null,
  userId?: string | null,
};

export type OnCreateActivityLogSubscription = {
  onCreateActivityLog?:  {
    __typename: "ActivityLog",
    id: string,
    userId: string,
    action: string,
    timestamp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateActivityLogSubscriptionVariables = {
  filter?: ModelSubscriptionActivityLogFilterInput | null,
  userId?: string | null,
};

export type OnUpdateActivityLogSubscription = {
  onUpdateActivityLog?:  {
    __typename: "ActivityLog",
    id: string,
    userId: string,
    action: string,
    timestamp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteActivityLogSubscriptionVariables = {
  filter?: ModelSubscriptionActivityLogFilterInput | null,
  userId?: string | null,
};

export type OnDeleteActivityLogSubscription = {
  onDeleteActivityLog?:  {
    __typename: "ActivityLog",
    id: string,
    userId: string,
    action: string,
    timestamp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePostTagsSubscriptionVariables = {
  filter?: ModelSubscriptionPostTagsFilterInput | null,
  authorId?: string | null,
};

export type OnCreatePostTagsSubscription = {
  onCreatePostTags?:  {
    __typename: "PostTags",
    id: string,
    postId: string,
    tagId: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      authorId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    authorId?: string | null,
  } | null,
};

export type OnUpdatePostTagsSubscriptionVariables = {
  filter?: ModelSubscriptionPostTagsFilterInput | null,
  authorId?: string | null,
};

export type OnUpdatePostTagsSubscription = {
  onUpdatePostTags?:  {
    __typename: "PostTags",
    id: string,
    postId: string,
    tagId: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      authorId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    authorId?: string | null,
  } | null,
};

export type OnDeletePostTagsSubscriptionVariables = {
  filter?: ModelSubscriptionPostTagsFilterInput | null,
  authorId?: string | null,
};

export type OnDeletePostTagsSubscription = {
  onDeletePostTags?:  {
    __typename: "PostTags",
    id: string,
    postId: string,
    tagId: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      authorId: string,
      status: PostStatus,
      postType: PostType,
      createdAt: string,
      updatedAt: string,
      boardPostsId?: string | null,
      categoryPostsId?: string | null,
      postArticleId?: string | null,
      postBoardId?: string | null,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      authorId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    authorId?: string | null,
  } | null,
};
