// 학습 노트 조작과 관련된 CRUD API 함수 파일
import { instance } from './index';

// 학습 노트 데이터 목록을 조회하는 API
function fetchBoard() {
  return instance.get('/board/list');
}

export { fetchBoard };