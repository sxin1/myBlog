export default {
  'register': {
    type: 'register',
    url: '/admin/register',
    method: 'POST',
    rsaKey: 'pwd',
    setToken: true,
  },
  'login': {
    type: 'login',
    url: '/admin/login',
    method: 'POST',
    rsaKey: 'pwd',
    setToken: true,
  },
  'pubKey': {
    type: 'getPublicKey',
    url: '/keys',
    method: 'POST'
  },
  'index': {
    url: '/index',
    method: 'GET',
    noMessage: true
  },
  'articles': {
    url: '/api/rest/articles',
    method: 'GET'
  },
  'postArticle': {
    url: '/api/rest/articles',
    method: 'POST'
  },
  'getArticleById': {
    rest: true,
    url: '/api/rest/articles/:articleID',
    method: 'GET'
  },
  'getUserInfo': {
    url: '/user',
    method: 'GET'
  },
  'putUserInfo': {
    url: '/user',
    method: 'PUT'
  },
  'columns': {
    url: '/api/rest/columns',
    method: 'GET'
  },
  'postColumn': {
    url: '/api/rest/columns',
    method: 'POST'
  },
  'postComment': {
    url: '/api/rest/comments',
    method: 'POST'
  },
  'uploadArticle': {
    url: '/upload/article',
    method: 'POST'
  },
  'uploadUser': {
    url: '/upload/user',
    method: 'POST'
  },
  'articleLikes': {
    url: '/articles/likes/:id',
    method: 'POST',
    rest: true
  }
}