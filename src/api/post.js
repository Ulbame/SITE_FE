import { postAxios } from './index';
import _ from 'lodash';

function fetchBoard(postIndex, searchCondition) {
  const indexUrl = Object.keys(postIndex)
    .map(key => `${key}=${postIndex[key]}`)
    .join('&');
  let conditionUrl = '';
  if (!_.isEmpty(searchCondition)) {
    conditionUrl = searchCondition.selectedArea
      .map(key => `${key}=${searchCondition.value[key]}`)
      .join('&');
  }
  let url = '?' + indexUrl + '&' + conditionUrl;
  return postAxios.get(url);
}

function fetchPost(postIndex) {
  return postAxios.get(postIndex);
}

function fetchBoardSize(searchCondition) {
  let conditionUrl = '';
  if (!_.isEmpty(searchCondition)) {
    conditionUrl = searchCondition.selectedArea
      .map(key => `${key}=${searchCondition.value[key]}`)
      .join('&');
  }
  let url = '/listSize?' + conditionUrl;
  return postAxios.get(url);
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
