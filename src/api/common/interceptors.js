import store from '@/vuex/store';

export function setInterceptors(instance) {
  instance.interceptors.request.use(
    function (config) {
      store.commit('LOADING_STATUS', true);
      config.headers.Authorization =
        'Bearer ' + localStorage.getItem('user_token');
      return config;
    },
    function (error) {
      store.commit('LOADING_STATUS', false);
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response) {
      store.commit('LOADING_STATUS', false);
      return response;
    },
    function (error) {
      store.commit('LOADING_STATUS', false);
      return Promise.reject(error);
    },
  );
  return instance;
}
