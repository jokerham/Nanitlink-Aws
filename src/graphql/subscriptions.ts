/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateBoard = /* GraphQL */ `subscription OnCreateBoard($filter: ModelSubscriptionBoardFilterInput) {
  onCreateBoard(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateBoardSubscriptionVariables,
  APITypes.OnCreateBoardSubscription
>;
export const onUpdateBoard = /* GraphQL */ `subscription OnUpdateBoard($filter: ModelSubscriptionBoardFilterInput) {
  onUpdateBoard(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateBoardSubscriptionVariables,
  APITypes.OnUpdateBoardSubscription
>;
export const onDeleteBoard = /* GraphQL */ `subscription OnDeleteBoard($filter: ModelSubscriptionBoardFilterInput) {
  onDeleteBoard(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteBoardSubscriptionVariables,
  APITypes.OnDeleteBoardSubscription
>;
export const onCreatePost = /* GraphQL */ `subscription OnCreatePost(
  $filter: ModelSubscriptionPostFilterInput
  $authorId: String
) {
  onCreatePost(filter: $filter, authorId: $authorId) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePostSubscriptionVariables,
  APITypes.OnCreatePostSubscription
>;
export const onUpdatePost = /* GraphQL */ `subscription OnUpdatePost(
  $filter: ModelSubscriptionPostFilterInput
  $authorId: String
) {
  onUpdatePost(filter: $filter, authorId: $authorId) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePostSubscriptionVariables,
  APITypes.OnUpdatePostSubscription
>;
export const onDeletePost = /* GraphQL */ `subscription OnDeletePost(
  $filter: ModelSubscriptionPostFilterInput
  $authorId: String
) {
  onDeletePost(filter: $filter, authorId: $authorId) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePostSubscriptionVariables,
  APITypes.OnDeletePostSubscription
>;
export const onCreateComment = /* GraphQL */ `subscription OnCreateComment(
  $filter: ModelSubscriptionCommentFilterInput
  $authorId: String
) {
  onCreateComment(filter: $filter, authorId: $authorId) {
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
    commentIndex
    commentIndexString
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
` as GeneratedSubscription<
  APITypes.OnCreateCommentSubscriptionVariables,
  APITypes.OnCreateCommentSubscription
>;
export const onUpdateComment = /* GraphQL */ `subscription OnUpdateComment(
  $filter: ModelSubscriptionCommentFilterInput
  $authorId: String
) {
  onUpdateComment(filter: $filter, authorId: $authorId) {
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
    commentIndex
    commentIndexString
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
` as GeneratedSubscription<
  APITypes.OnUpdateCommentSubscriptionVariables,
  APITypes.OnUpdateCommentSubscription
>;
export const onDeleteComment = /* GraphQL */ `subscription OnDeleteComment(
  $filter: ModelSubscriptionCommentFilterInput
  $authorId: String
) {
  onDeleteComment(filter: $filter, authorId: $authorId) {
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
    commentIndex
    commentIndexString
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
` as GeneratedSubscription<
  APITypes.OnDeleteCommentSubscriptionVariables,
  APITypes.OnDeleteCommentSubscription
>;
export const onCreateMedia = /* GraphQL */ `subscription OnCreateMedia(
  $filter: ModelSubscriptionMediaFilterInput
  $authorId: String
) {
  onCreateMedia(filter: $filter, authorId: $authorId) {
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
      commentIndex
      commentIndexString
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
` as GeneratedSubscription<
  APITypes.OnCreateMediaSubscriptionVariables,
  APITypes.OnCreateMediaSubscription
>;
export const onUpdateMedia = /* GraphQL */ `subscription OnUpdateMedia(
  $filter: ModelSubscriptionMediaFilterInput
  $authorId: String
) {
  onUpdateMedia(filter: $filter, authorId: $authorId) {
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
      commentIndex
      commentIndexString
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
` as GeneratedSubscription<
  APITypes.OnUpdateMediaSubscriptionVariables,
  APITypes.OnUpdateMediaSubscription
>;
export const onDeleteMedia = /* GraphQL */ `subscription OnDeleteMedia(
  $filter: ModelSubscriptionMediaFilterInput
  $authorId: String
) {
  onDeleteMedia(filter: $filter, authorId: $authorId) {
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
      commentIndex
      commentIndexString
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
` as GeneratedSubscription<
  APITypes.OnDeleteMediaSubscriptionVariables,
  APITypes.OnDeleteMediaSubscription
>;
export const onCreateMenu = /* GraphQL */ `subscription OnCreateMenu($filter: ModelSubscriptionMenuFilterInput) {
  onCreateMenu(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMenuSubscriptionVariables,
  APITypes.OnCreateMenuSubscription
>;
export const onUpdateMenu = /* GraphQL */ `subscription OnUpdateMenu($filter: ModelSubscriptionMenuFilterInput) {
  onUpdateMenu(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMenuSubscriptionVariables,
  APITypes.OnUpdateMenuSubscription
>;
export const onDeleteMenu = /* GraphQL */ `subscription OnDeleteMenu($filter: ModelSubscriptionMenuFilterInput) {
  onDeleteMenu(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMenuSubscriptionVariables,
  APITypes.OnDeleteMenuSubscription
>;
export const onCreateArticle = /* GraphQL */ `subscription OnCreateArticle($filter: ModelSubscriptionArticleFilterInput) {
  onCreateArticle(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateArticleSubscriptionVariables,
  APITypes.OnCreateArticleSubscription
>;
export const onUpdateArticle = /* GraphQL */ `subscription OnUpdateArticle($filter: ModelSubscriptionArticleFilterInput) {
  onUpdateArticle(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateArticleSubscriptionVariables,
  APITypes.OnUpdateArticleSubscription
>;
export const onDeleteArticle = /* GraphQL */ `subscription OnDeleteArticle($filter: ModelSubscriptionArticleFilterInput) {
  onDeleteArticle(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteArticleSubscriptionVariables,
  APITypes.OnDeleteArticleSubscription
>;
export const onCreateCategory = /* GraphQL */ `subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
  onCreateCategory(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCategorySubscriptionVariables,
  APITypes.OnCreateCategorySubscription
>;
export const onUpdateCategory = /* GraphQL */ `subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
  onUpdateCategory(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCategorySubscriptionVariables,
  APITypes.OnUpdateCategorySubscription
>;
export const onDeleteCategory = /* GraphQL */ `subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
  onDeleteCategory(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCategorySubscriptionVariables,
  APITypes.OnDeleteCategorySubscription
>;
export const onCreateTag = /* GraphQL */ `subscription OnCreateTag(
  $filter: ModelSubscriptionTagFilterInput
  $authorId: String
) {
  onCreateTag(filter: $filter, authorId: $authorId) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTagSubscriptionVariables,
  APITypes.OnCreateTagSubscription
>;
export const onUpdateTag = /* GraphQL */ `subscription OnUpdateTag(
  $filter: ModelSubscriptionTagFilterInput
  $authorId: String
) {
  onUpdateTag(filter: $filter, authorId: $authorId) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTagSubscriptionVariables,
  APITypes.OnUpdateTagSubscription
>;
export const onDeleteTag = /* GraphQL */ `subscription OnDeleteTag(
  $filter: ModelSubscriptionTagFilterInput
  $authorId: String
) {
  onDeleteTag(filter: $filter, authorId: $authorId) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTagSubscriptionVariables,
  APITypes.OnDeleteTagSubscription
>;
export const onCreateSiteSetting = /* GraphQL */ `subscription OnCreateSiteSetting(
  $filter: ModelSubscriptionSiteSettingFilterInput
) {
  onCreateSiteSetting(filter: $filter) {
    key
    value
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSiteSettingSubscriptionVariables,
  APITypes.OnCreateSiteSettingSubscription
>;
export const onUpdateSiteSetting = /* GraphQL */ `subscription OnUpdateSiteSetting(
  $filter: ModelSubscriptionSiteSettingFilterInput
) {
  onUpdateSiteSetting(filter: $filter) {
    key
    value
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSiteSettingSubscriptionVariables,
  APITypes.OnUpdateSiteSettingSubscription
>;
export const onDeleteSiteSetting = /* GraphQL */ `subscription OnDeleteSiteSetting(
  $filter: ModelSubscriptionSiteSettingFilterInput
) {
  onDeleteSiteSetting(filter: $filter) {
    key
    value
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSiteSettingSubscriptionVariables,
  APITypes.OnDeleteSiteSettingSubscription
>;
export const onCreateActivityLog = /* GraphQL */ `subscription OnCreateActivityLog(
  $filter: ModelSubscriptionActivityLogFilterInput
  $userId: String
) {
  onCreateActivityLog(filter: $filter, userId: $userId) {
    id
    userId
    action
    timestamp
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateActivityLogSubscriptionVariables,
  APITypes.OnCreateActivityLogSubscription
>;
export const onUpdateActivityLog = /* GraphQL */ `subscription OnUpdateActivityLog(
  $filter: ModelSubscriptionActivityLogFilterInput
  $userId: String
) {
  onUpdateActivityLog(filter: $filter, userId: $userId) {
    id
    userId
    action
    timestamp
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateActivityLogSubscriptionVariables,
  APITypes.OnUpdateActivityLogSubscription
>;
export const onDeleteActivityLog = /* GraphQL */ `subscription OnDeleteActivityLog(
  $filter: ModelSubscriptionActivityLogFilterInput
  $userId: String
) {
  onDeleteActivityLog(filter: $filter, userId: $userId) {
    id
    userId
    action
    timestamp
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteActivityLogSubscriptionVariables,
  APITypes.OnDeleteActivityLogSubscription
>;
export const onCreatePostTags = /* GraphQL */ `subscription OnCreatePostTags(
  $filter: ModelSubscriptionPostTagsFilterInput
  $authorId: String
) {
  onCreatePostTags(filter: $filter, authorId: $authorId) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePostTagsSubscriptionVariables,
  APITypes.OnCreatePostTagsSubscription
>;
export const onUpdatePostTags = /* GraphQL */ `subscription OnUpdatePostTags(
  $filter: ModelSubscriptionPostTagsFilterInput
  $authorId: String
) {
  onUpdatePostTags(filter: $filter, authorId: $authorId) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePostTagsSubscriptionVariables,
  APITypes.OnUpdatePostTagsSubscription
>;
export const onDeletePostTags = /* GraphQL */ `subscription OnDeletePostTags(
  $filter: ModelSubscriptionPostTagsFilterInput
  $authorId: String
) {
  onDeletePostTags(filter: $filter, authorId: $authorId) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePostTagsSubscriptionVariables,
  APITypes.OnDeletePostTagsSubscription
>;
