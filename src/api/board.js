import { instance } from './index';

function fetchBoard() {
  return instance.get('/board/list');
}

function fetchPost(index) {
  return instance.get('/board/post/'+index);
}

function createPost(post) {
  return instance.post('/board/post', post);
}

function updatePost(post) {
  return instance.patch('/board/post', post);
}

function deletePost(postIndex) {
  return instance.delete('/board/post/'+postIndex);
}

export { fetchBoard, fetchPost, createPost, deletePost, updatePost };