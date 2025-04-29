/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getBoard = /* GraphQL */ `query GetBoard($id: ID!) {
  getBoard(id: $id) {
    id
    name
    description
    rowsPerPage
    headerText
    footerText
    posts {
      nextToken
      __typename
    }
    categories {
      nextToken
      __typename
    }
    lastPostIndex
    totalPosts
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetBoardQueryVariables, APITypes.GetBoardQuery>;
export const listBoards = /* GraphQL */ `query ListBoards(
  $filter: ModelBoardFilterInput
  $limit: Int
  $nextToken: String
) {
  listBoards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      rowsPerPage
      headerText
      footerText
      lastPostIndex
      totalPosts
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBoardsQueryVariables,
  APITypes.ListBoardsQuery
>;
export const getPost = /* GraphQL */ `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    moduleId
    module
    categoryId
    category {
      id
      name
      boardId
      categoryIndex
      categoryIndexString
      createdAt
      updatedAt
      __typename
    }
    categoryIndexString
    postIndex
    postIndexString
    title
    content
    authorId
    comments {
      nextToken
      __typename
    }
    attachments {
      nextToken
      __typename
    }
    status
    tags {
      nextToken
      __typename
    }
    views
    createdAt
    updatedAt
    boardPostsId
    categoryPostId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPostQueryVariables, APITypes.GetPostQuery>;
export const listPosts = /* GraphQL */ `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      moduleId
      module
      categoryId
      categoryIndexString
      postIndex
      postIndexString
      title
      content
      authorId
      status
      views
      createdAt
      updatedAt
      boardPostsId
      categoryPostId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPostsQueryVariables, APITypes.ListPostsQuery>;
export const postsByModuleAndModuleIdAndPostIndexString = /* GraphQL */ `query PostsByModuleAndModuleIdAndPostIndexString(
  $module: String!
  $moduleIdPostIndexString: ModelPostByModuleCompositeKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  postsByModuleAndModuleIdAndPostIndexString(
    module: $module
    moduleIdPostIndexString: $moduleIdPostIndexString
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      moduleId
      module
      categoryId
      categoryIndexString
      postIndex
      postIndexString
      title
      content
      authorId
      status
      views
      createdAt
      updatedAt
      boardPostsId
      categoryPostId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PostsByModuleAndModuleIdAndPostIndexStringQueryVariables,
  APITypes.PostsByModuleAndModuleIdAndPostIndexStringQuery
>;
export const postsByModuleAndModuleIdAndCategoryIndexStringAndPostIndexString = /* GraphQL */ `query PostsByModuleAndModuleIdAndCategoryIndexStringAndPostIndexString(
  $module: String!
  $moduleIdCategoryIndexStringPostIndexString: ModelPostByModuleCategoryCompositeKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  postsByModuleAndModuleIdAndCategoryIndexStringAndPostIndexString(
    module: $module
    moduleIdCategoryIndexStringPostIndexString: $moduleIdCategoryIndexStringPostIndexString
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      moduleId
      module
      categoryId
      categoryIndexString
      postIndex
      postIndexString
      title
      content
      authorId
      status
      views
      createdAt
      updatedAt
      boardPostsId
      categoryPostId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PostsByModuleAndModuleIdAndCategoryIndexStringAndPostIndexStringQueryVariables,
  APITypes.PostsByModuleAndModuleIdAndCategoryIndexStringAndPostIndexStringQuery
>;
export const getComment = /* GraphQL */ `query GetComment($id: ID!) {
  getComment(id: $id) {
    id
    postId
    post {
      id
      moduleId
      module
      categoryId
      categoryIndexString
      postIndex
      postIndexString
      title
      content
      authorId
      status
      views
      createdAt
      updatedAt
      boardPostsId
      categoryPostId
      __typename
    }
    authorId
    content
    attachments {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    postCommentsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCommentQueryVariables,
  APITypes.GetCommentQuery
>;
export const listComments = /* GraphQL */ `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      postId
      authorId
      content
      createdAt
      updatedAt
      postCommentsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCommentsQueryVariables,
  APITypes.ListCommentsQuery
>;
export const commentsByPostId = /* GraphQL */ `query CommentsByPostId(
  $postId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  commentsByPostId(
    postId: $postId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      postId
      authorId
      content
      createdAt
      updatedAt
      postCommentsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CommentsByPostIdQueryVariables,
  APITypes.CommentsByPostIdQuery
>;
export const getMedia = /* GraphQL */ `query GetMedia($id: ID!) {
  getMedia(id: $id) {
    id
    fileName
    path
    post {
      id
      moduleId
      module
      categoryId
      categoryIndexString
      postIndex
      postIndexString
      title
      content
      authorId
      status
      views
      createdAt
      updatedAt
      boardPostsId
      categoryPostId
      __typename
    }
    comment {
      id
      postId
      authorId
      content
      createdAt
      updatedAt
      postCommentsId
      __typename
    }
    createdAt
    updatedAt
    postAttachmentsId
    commentAttachmentsId
    authorId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetMediaQueryVariables, APITypes.GetMediaQuery>;
export const listMedia = /* GraphQL */ `query ListMedia(
  $filter: ModelMediaFilterInput
  $limit: Int
  $nextToken: String
) {
  listMedia(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      fileName
      path
      createdAt
      updatedAt
      postAttachmentsId
      commentAttachmentsId
      authorId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListMediaQueryVariables, APITypes.ListMediaQuery>;
export const getMenu = /* GraphQL */ `query GetMenu($id: ID!) {
  getMenu(id: $id) {
    id
    name
    module
    moduleId
    parentId
    parent {
      id
      name
      module
      moduleId
      parentId
      link
      sortOrder
      createdAt
      updatedAt
      __typename
    }
    children {
      nextToken
      __typename
    }
    link
    sortOrder
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetMenuQueryVariables, APITypes.GetMenuQuery>;
export const listMenus = /* GraphQL */ `query ListMenus(
  $filter: ModelMenuFilterInput
  $limit: Int
  $nextToken: String
) {
  listMenus(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      module
      moduleId
      parentId
      link
      sortOrder
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListMenusQueryVariables, APITypes.ListMenusQuery>;
export const menusByParentIdAndName = /* GraphQL */ `query MenusByParentIdAndName(
  $parentId: ID!
  $name: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMenuFilterInput
  $limit: Int
  $nextToken: String
) {
  menusByParentIdAndName(
    parentId: $parentId
    name: $name
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      module
      moduleId
      parentId
      link
      sortOrder
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.MenusByParentIdAndNameQueryVariables,
  APITypes.MenusByParentIdAndNameQuery
>;
export const getArticle = /* GraphQL */ `query GetArticle($id: ID!) {
  getArticle(id: $id) {
    id
    name
    post {
      id
      moduleId
      module
      categoryId
      categoryIndexString
      postIndex
      postIndexString
      title
      content
      authorId
      status
      views
      createdAt
      updatedAt
      boardPostsId
      categoryPostId
      __typename
    }
    createdAt
    updatedAt
    articlePostId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetArticleQueryVariables,
  APITypes.GetArticleQuery
>;
export const listArticles = /* GraphQL */ `query ListArticles(
  $filter: ModelArticleFilterInput
  $limit: Int
  $nextToken: String
) {
  listArticles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      createdAt
      updatedAt
      articlePostId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListArticlesQueryVariables,
  APITypes.ListArticlesQuery
>;
export const getCategory = /* GraphQL */ `query GetCategory($id: ID!) {
  getCategory(id: $id) {
    id
    name
    boardId
    board {
      id
      name
      description
      rowsPerPage
      headerText
      footerText
      lastPostIndex
      totalPosts
      createdAt
      updatedAt
      __typename
    }
    post {
      nextToken
      __typename
    }
    categoryIndex
    categoryIndexString
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCategoryQueryVariables,
  APITypes.GetCategoryQuery
>;
export const listCategories = /* GraphQL */ `query ListCategories(
  $filter: ModelCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      boardId
      categoryIndex
      categoryIndexString
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCategoriesQueryVariables,
  APITypes.ListCategoriesQuery
>;
export const categoriesByBoardIdAndCategoryIndexString = /* GraphQL */ `query CategoriesByBoardIdAndCategoryIndexString(
  $boardId: ID!
  $categoryIndexString: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  categoriesByBoardIdAndCategoryIndexString(
    boardId: $boardId
    categoryIndexString: $categoryIndexString
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      boardId
      categoryIndex
      categoryIndexString
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CategoriesByBoardIdAndCategoryIndexStringQueryVariables,
  APITypes.CategoriesByBoardIdAndCategoryIndexStringQuery
>;
export const getTag = /* GraphQL */ `query GetTag($id: ID!) {
  getTag(id: $id) {
    id
    name
    posts {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    authorId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTagQueryVariables, APITypes.GetTagQuery>;
export const listTags = /* GraphQL */ `query ListTags($filter: ModelTagFilterInput, $limit: Int, $nextToken: String) {
  listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      createdAt
      updatedAt
      authorId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTagsQueryVariables, APITypes.ListTagsQuery>;
export const getSiteSetting = /* GraphQL */ `query GetSiteSetting($id: ID!) {
  getSiteSetting(id: $id) {
    key
    value
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSiteSettingQueryVariables,
  APITypes.GetSiteSettingQuery
>;
export const listSiteSettings = /* GraphQL */ `query ListSiteSettings(
  $filter: ModelSiteSettingFilterInput
  $limit: Int
  $nextToken: String
) {
  listSiteSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      key
      value
      id
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSiteSettingsQueryVariables,
  APITypes.ListSiteSettingsQuery
>;
export const getActivityLog = /* GraphQL */ `query GetActivityLog($id: ID!) {
  getActivityLog(id: $id) {
    id
    userId
    action
    timestamp
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetActivityLogQueryVariables,
  APITypes.GetActivityLogQuery
>;
export const listActivityLogs = /* GraphQL */ `query ListActivityLogs(
  $filter: ModelActivityLogFilterInput
  $limit: Int
  $nextToken: String
) {
  listActivityLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      action
      timestamp
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListActivityLogsQueryVariables,
  APITypes.ListActivityLogsQuery
>;
export const getPostTags = /* GraphQL */ `query GetPostTags($id: ID!) {
  getPostTags(id: $id) {
    id
    postId
    tagId
    post {
      id
      moduleId
      module
      categoryId
      categoryIndexString
      postIndex
      postIndexString
      title
      content
      authorId
      status
      views
      createdAt
      updatedAt
      boardPostsId
      categoryPostId
      __typename
    }
    tag {
      id
      name
      createdAt
      updatedAt
      authorId
      __typename
    }
    createdAt
    updatedAt
    authorId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPostTagsQueryVariables,
  APITypes.GetPostTagsQuery
>;
export const listPostTags = /* GraphQL */ `query ListPostTags(
  $filter: ModelPostTagsFilterInput
  $limit: Int
  $nextToken: String
) {
  listPostTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      postId
      tagId
      createdAt
      updatedAt
      authorId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPostTagsQueryVariables,
  APITypes.ListPostTagsQuery
>;
export const postTagsByPostId = /* GraphQL */ `query PostTagsByPostId(
  $postId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelPostTagsFilterInput
  $limit: Int
  $nextToken: String
) {
  postTagsByPostId(
    postId: $postId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      postId
      tagId
      createdAt
      updatedAt
      authorId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PostTagsByPostIdQueryVariables,
  APITypes.PostTagsByPostIdQuery
>;
export const postTagsByTagId = /* GraphQL */ `query PostTagsByTagId(
  $tagId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelPostTagsFilterInput
  $limit: Int
  $nextToken: String
) {
  postTagsByTagId(
    tagId: $tagId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      postId
      tagId
      createdAt
      updatedAt
      authorId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PostTagsByTagIdQueryVariables,
  APITypes.PostTagsByTagIdQuery
>;
