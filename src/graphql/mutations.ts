/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createBoard = /* GraphQL */ `mutation CreateBoard(
  $input: CreateBoardInput!
  $condition: ModelBoardConditionInput
) {
  createBoard(input: $input, condition: $condition) {
    id
    name
    description
    posts {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateBoardMutationVariables,
  APITypes.CreateBoardMutation
>;
export const updateBoard = /* GraphQL */ `mutation UpdateBoard(
  $input: UpdateBoardInput!
  $condition: ModelBoardConditionInput
) {
  updateBoard(input: $input, condition: $condition) {
    id
    name
    description
    posts {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateBoardMutationVariables,
  APITypes.UpdateBoardMutation
>;
export const deleteBoard = /* GraphQL */ `mutation DeleteBoard(
  $input: DeleteBoardInput!
  $condition: ModelBoardConditionInput
) {
  deleteBoard(input: $input, condition: $condition) {
    id
    name
    description
    posts {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteBoardMutationVariables,
  APITypes.DeleteBoardMutation
>;
export const createPost = /* GraphQL */ `mutation CreatePost(
  $input: CreatePostInput!
  $condition: ModelPostConditionInput
) {
  createPost(input: $input, condition: $condition) {
    id
    title
    content
    article {
      id
      name
      createdAt
      updatedAt
      articlePostId
      __typename
    }
    board {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
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
    postType
    tags {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    boardPostsId
    categoryPostsId
    postArticleId
    postBoardId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePostMutationVariables,
  APITypes.CreatePostMutation
>;
export const updatePost = /* GraphQL */ `mutation UpdatePost(
  $input: UpdatePostInput!
  $condition: ModelPostConditionInput
) {
  updatePost(input: $input, condition: $condition) {
    id
    title
    content
    article {
      id
      name
      createdAt
      updatedAt
      articlePostId
      __typename
    }
    board {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
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
    postType
    tags {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    boardPostsId
    categoryPostsId
    postArticleId
    postBoardId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePostMutationVariables,
  APITypes.UpdatePostMutation
>;
export const deletePost = /* GraphQL */ `mutation DeletePost(
  $input: DeletePostInput!
  $condition: ModelPostConditionInput
) {
  deletePost(input: $input, condition: $condition) {
    id
    title
    content
    article {
      id
      name
      createdAt
      updatedAt
      articlePostId
      __typename
    }
    board {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
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
    postType
    tags {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    boardPostsId
    categoryPostsId
    postArticleId
    postBoardId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePostMutationVariables,
  APITypes.DeletePostMutation
>;
export const createComment = /* GraphQL */ `mutation CreateComment(
  $input: CreateCommentInput!
  $condition: ModelCommentConditionInput
) {
  createComment(input: $input, condition: $condition) {
    id
    post {
      id
      title
      content
      authorId
      status
      postType
      createdAt
      updatedAt
      boardPostsId
      categoryPostsId
      postArticleId
      postBoardId
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
` as GeneratedMutation<
  APITypes.CreateCommentMutationVariables,
  APITypes.CreateCommentMutation
>;
export const updateComment = /* GraphQL */ `mutation UpdateComment(
  $input: UpdateCommentInput!
  $condition: ModelCommentConditionInput
) {
  updateComment(input: $input, condition: $condition) {
    id
    post {
      id
      title
      content
      authorId
      status
      postType
      createdAt
      updatedAt
      boardPostsId
      categoryPostsId
      postArticleId
      postBoardId
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
` as GeneratedMutation<
  APITypes.UpdateCommentMutationVariables,
  APITypes.UpdateCommentMutation
>;
export const deleteComment = /* GraphQL */ `mutation DeleteComment(
  $input: DeleteCommentInput!
  $condition: ModelCommentConditionInput
) {
  deleteComment(input: $input, condition: $condition) {
    id
    post {
      id
      title
      content
      authorId
      status
      postType
      createdAt
      updatedAt
      boardPostsId
      categoryPostsId
      postArticleId
      postBoardId
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
` as GeneratedMutation<
  APITypes.DeleteCommentMutationVariables,
  APITypes.DeleteCommentMutation
>;
export const createMedia = /* GraphQL */ `mutation CreateMedia(
  $input: CreateMediaInput!
  $condition: ModelMediaConditionInput
) {
  createMedia(input: $input, condition: $condition) {
    id
    fileName
    path
    post {
      id
      title
      content
      authorId
      status
      postType
      createdAt
      updatedAt
      boardPostsId
      categoryPostsId
      postArticleId
      postBoardId
      __typename
    }
    comment {
      id
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
` as GeneratedMutation<
  APITypes.CreateMediaMutationVariables,
  APITypes.CreateMediaMutation
>;
export const updateMedia = /* GraphQL */ `mutation UpdateMedia(
  $input: UpdateMediaInput!
  $condition: ModelMediaConditionInput
) {
  updateMedia(input: $input, condition: $condition) {
    id
    fileName
    path
    post {
      id
      title
      content
      authorId
      status
      postType
      createdAt
      updatedAt
      boardPostsId
      categoryPostsId
      postArticleId
      postBoardId
      __typename
    }
    comment {
      id
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
` as GeneratedMutation<
  APITypes.UpdateMediaMutationVariables,
  APITypes.UpdateMediaMutation
>;
export const deleteMedia = /* GraphQL */ `mutation DeleteMedia(
  $input: DeleteMediaInput!
  $condition: ModelMediaConditionInput
) {
  deleteMedia(input: $input, condition: $condition) {
    id
    fileName
    path
    post {
      id
      title
      content
      authorId
      status
      postType
      createdAt
      updatedAt
      boardPostsId
      categoryPostsId
      postArticleId
      postBoardId
      __typename
    }
    comment {
      id
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
` as GeneratedMutation<
  APITypes.DeleteMediaMutationVariables,
  APITypes.DeleteMediaMutation
>;
export const createMenu = /* GraphQL */ `mutation CreateMenu(
  $input: CreateMenuInput!
  $condition: ModelMenuConditionInput
) {
  createMenu(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMenuMutationVariables,
  APITypes.CreateMenuMutation
>;
export const updateMenu = /* GraphQL */ `mutation UpdateMenu(
  $input: UpdateMenuInput!
  $condition: ModelMenuConditionInput
) {
  updateMenu(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMenuMutationVariables,
  APITypes.UpdateMenuMutation
>;
export const deleteMenu = /* GraphQL */ `mutation DeleteMenu(
  $input: DeleteMenuInput!
  $condition: ModelMenuConditionInput
) {
  deleteMenu(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMenuMutationVariables,
  APITypes.DeleteMenuMutation
>;
export const createArticle = /* GraphQL */ `mutation CreateArticle(
  $input: CreateArticleInput!
  $condition: ModelArticleConditionInput
) {
  createArticle(input: $input, condition: $condition) {
    id
    name
    post {
      id
      title
      content
      authorId
      status
      postType
      createdAt
      updatedAt
      boardPostsId
      categoryPostsId
      postArticleId
      postBoardId
      __typename
    }
    createdAt
    updatedAt
    articlePostId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateArticleMutationVariables,
  APITypes.CreateArticleMutation
>;
export const updateArticle = /* GraphQL */ `mutation UpdateArticle(
  $input: UpdateArticleInput!
  $condition: ModelArticleConditionInput
) {
  updateArticle(input: $input, condition: $condition) {
    id
    name
    post {
      id
      title
      content
      authorId
      status
      postType
      createdAt
      updatedAt
      boardPostsId
      categoryPostsId
      postArticleId
      postBoardId
      __typename
    }
    createdAt
    updatedAt
    articlePostId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateArticleMutationVariables,
  APITypes.UpdateArticleMutation
>;
export const deleteArticle = /* GraphQL */ `mutation DeleteArticle(
  $input: DeleteArticleInput!
  $condition: ModelArticleConditionInput
) {
  deleteArticle(input: $input, condition: $condition) {
    id
    name
    post {
      id
      title
      content
      authorId
      status
      postType
      createdAt
      updatedAt
      boardPostsId
      categoryPostsId
      postArticleId
      postBoardId
      __typename
    }
    createdAt
    updatedAt
    articlePostId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteArticleMutationVariables,
  APITypes.DeleteArticleMutation
>;
export const createCategory = /* GraphQL */ `mutation CreateCategory(
  $input: CreateCategoryInput!
  $condition: ModelCategoryConditionInput
) {
  createCategory(input: $input, condition: $condition) {
    id
    name
    posts {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCategoryMutationVariables,
  APITypes.CreateCategoryMutation
>;
export const updateCategory = /* GraphQL */ `mutation UpdateCategory(
  $input: UpdateCategoryInput!
  $condition: ModelCategoryConditionInput
) {
  updateCategory(input: $input, condition: $condition) {
    id
    name
    posts {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCategoryMutationVariables,
  APITypes.UpdateCategoryMutation
>;
export const deleteCategory = /* GraphQL */ `mutation DeleteCategory(
  $input: DeleteCategoryInput!
  $condition: ModelCategoryConditionInput
) {
  deleteCategory(input: $input, condition: $condition) {
    id
    name
    posts {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCategoryMutationVariables,
  APITypes.DeleteCategoryMutation
>;
export const createTag = /* GraphQL */ `mutation CreateTag(
  $input: CreateTagInput!
  $condition: ModelTagConditionInput
) {
  createTag(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTagMutationVariables,
  APITypes.CreateTagMutation
>;
export const updateTag = /* GraphQL */ `mutation UpdateTag(
  $input: UpdateTagInput!
  $condition: ModelTagConditionInput
) {
  updateTag(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTagMutationVariables,
  APITypes.UpdateTagMutation
>;
export const deleteTag = /* GraphQL */ `mutation DeleteTag(
  $input: DeleteTagInput!
  $condition: ModelTagConditionInput
) {
  deleteTag(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTagMutationVariables,
  APITypes.DeleteTagMutation
>;
export const createSiteSetting = /* GraphQL */ `mutation CreateSiteSetting(
  $input: CreateSiteSettingInput!
  $condition: ModelSiteSettingConditionInput
) {
  createSiteSetting(input: $input, condition: $condition) {
    key
    value
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSiteSettingMutationVariables,
  APITypes.CreateSiteSettingMutation
>;
export const updateSiteSetting = /* GraphQL */ `mutation UpdateSiteSetting(
  $input: UpdateSiteSettingInput!
  $condition: ModelSiteSettingConditionInput
) {
  updateSiteSetting(input: $input, condition: $condition) {
    key
    value
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSiteSettingMutationVariables,
  APITypes.UpdateSiteSettingMutation
>;
export const deleteSiteSetting = /* GraphQL */ `mutation DeleteSiteSetting(
  $input: DeleteSiteSettingInput!
  $condition: ModelSiteSettingConditionInput
) {
  deleteSiteSetting(input: $input, condition: $condition) {
    key
    value
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSiteSettingMutationVariables,
  APITypes.DeleteSiteSettingMutation
>;
export const createActivityLog = /* GraphQL */ `mutation CreateActivityLog(
  $input: CreateActivityLogInput!
  $condition: ModelActivityLogConditionInput
) {
  createActivityLog(input: $input, condition: $condition) {
    id
    userId
    action
    timestamp
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateActivityLogMutationVariables,
  APITypes.CreateActivityLogMutation
>;
export const updateActivityLog = /* GraphQL */ `mutation UpdateActivityLog(
  $input: UpdateActivityLogInput!
  $condition: ModelActivityLogConditionInput
) {
  updateActivityLog(input: $input, condition: $condition) {
    id
    userId
    action
    timestamp
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateActivityLogMutationVariables,
  APITypes.UpdateActivityLogMutation
>;
export const deleteActivityLog = /* GraphQL */ `mutation DeleteActivityLog(
  $input: DeleteActivityLogInput!
  $condition: ModelActivityLogConditionInput
) {
  deleteActivityLog(input: $input, condition: $condition) {
    id
    userId
    action
    timestamp
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteActivityLogMutationVariables,
  APITypes.DeleteActivityLogMutation
>;
export const createPostTags = /* GraphQL */ `mutation CreatePostTags(
  $input: CreatePostTagsInput!
  $condition: ModelPostTagsConditionInput
) {
  createPostTags(input: $input, condition: $condition) {
    id
    postId
    tagId
    post {
      id
      title
      content
      authorId
      status
      postType
      createdAt
      updatedAt
      boardPostsId
      categoryPostsId
      postArticleId
      postBoardId
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
` as GeneratedMutation<
  APITypes.CreatePostTagsMutationVariables,
  APITypes.CreatePostTagsMutation
>;
export const updatePostTags = /* GraphQL */ `mutation UpdatePostTags(
  $input: UpdatePostTagsInput!
  $condition: ModelPostTagsConditionInput
) {
  updatePostTags(input: $input, condition: $condition) {
    id
    postId
    tagId
    post {
      id
      title
      content
      authorId
      status
      postType
      createdAt
      updatedAt
      boardPostsId
      categoryPostsId
      postArticleId
      postBoardId
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
` as GeneratedMutation<
  APITypes.UpdatePostTagsMutationVariables,
  APITypes.UpdatePostTagsMutation
>;
export const deletePostTags = /* GraphQL */ `mutation DeletePostTags(
  $input: DeletePostTagsInput!
  $condition: ModelPostTagsConditionInput
) {
  deletePostTags(input: $input, condition: $condition) {
    id
    postId
    tagId
    post {
      id
      title
      content
      authorId
      status
      postType
      createdAt
      updatedAt
      boardPostsId
      categoryPostsId
      postArticleId
      postBoardId
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
` as GeneratedMutation<
  APITypes.DeletePostTagsMutationVariables,
  APITypes.DeletePostTagsMutation
>;
