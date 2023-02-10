import { postAxios } from './index';

function fetchBoard(paging) {
  const { currentPage, pagingSize, listSize } = paging;
  const firstPostIndex = (currentPage-1) * pagingSize + 1;
  const lastPostIndex = firstPostIndex+listSize-1;
  return postAxios.get(`?firstPostIndex=${firstPostIndex}&lastPostIndex=${lastPostIndex}`);
}

function fetchPost(postIndex) {
  return postAxios.get(postIndex);
}

function fetchBoardSize() {
  return postAxios.get('/listSize');
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

export { fetchBoard, fetchBoardSize, fetchPost, createPost, deletePost, updatePost };