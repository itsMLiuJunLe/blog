'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = 'hi api';
  }

  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = 'SELECT userName FROM admin_user WHERE userName = "' + userName + '" AND password = "' + password + '" ';
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      const openID = new Date().getTime();
      this.ctx.session.openId = { openId: openID };// { 'openId': openId }
      this.ctx.body = { data: '登陆成功', openId: openID };
    } else {
      this.ctx.body = { data: '登陆失败' };
    }
  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    console.log(resType);
    this.ctx.body = { data: resType };
  }

  async addArticle() {
    const tmpArticle = this.ctx.request.body;
    const sql = 'alter table article AUTO_INCREMENT = 1';
    await this.app.mysql.query(sql);
    const result = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertID = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId: insertID,
    };
  }

  async updateArticle() {
    const tempArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('article', tempArticle);
    const updateSuccess = result.affectedRows === 1;

    this.ctx.body = { isSuccess: updateSuccess };
  }

  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.addTime as addTime,' +
                'article.view_count as view_count,' +
                'type.typeName as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                'ORDER BY article.id DESC';
    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };
  }

  async delArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }

  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.addTime as addTime,' +
                'article.view_count as view_count,' +
                'article.article_content as article_content,' +
                'type.typeName as typeName,' +
                'type.Id as typeId ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                'WHERE article.id = ' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = MainController;
