let ipUrl = 'http://127.0.0.1:7001/admin/';

let servicePath = {
  checkLogin: ipUrl + 'checkLogin',//检查用户名与密码
  getTypeInfo: ipUrl + 'getTypeInfo',//获得文章类别信息
  addArticle: ipUrl + 'addArticle',//添加文章
  updateArticle: ipUrl + 'updateArticle',//修改文章
  getArticleList: ipUrl + 'getArticleList',//文章列表
  delArticle: ipUrl + 'delArticle/',//删除列表
  getArticleById: ipUrl + 'getArticleById/',//修改文章，根据id获得文章
}

export default servicePath;