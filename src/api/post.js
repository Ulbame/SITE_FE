import { postAxios } from './index';

function fetchBoard(postIndex, searchCondition) {
  const { firstPostIndex, lastPostIndex } = postIndex;
  const { title, contents, creatorId } = searchCondition.value;
  const params = { firstPostIndex, lastPostIndex, title, contents, creatorId };
  return postAxios.get(null, { params });
}

function fetchPost(postIndex) {
  return postAxios.get(postIndex);
}

function fetchBoardSize(searchCondition) {
  const { title, contents, creatorId } = searchCondition.value;
  const params = { title, contents, creatorId };
  return postAxios.get('listSize', { params });
}

function createPost(post) {
  return postAxios.post(null, post);
}

function updatePost(post) {
  return postAxios.patch(null, post);
}

function deletePost(postIndex) {
  return postAxios.delete(postIndex);
}

export {
  fetchBoard,
  fetchBoardSize,
  fetchPost,
  createPost,
  deletePost,
  updatePost,
};
