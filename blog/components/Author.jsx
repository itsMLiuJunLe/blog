import React from 'react';
import { Avatar, Divider } from 'antd';
import { GithubOutlined, QqOutlined, WechatOutlined, MehOutlined } from '@ant-design/icons';
import { PandaIcon } from '../components/dog';

import '../public/style/components/author.css'



const Author = () => {
  return (
    <div className="author-div comm-box">
      <div><Avatar size={100} icon={<PandaIcon />} /></div>
      <div className="author-introduction">
        前端菜鸡，你看我代码bug多不多就完事了
        <Divider>社交账号</Divider>
        <Avatar size={28} icon={<GithubOutlined />} className="account" />
        <Avatar size={28} icon={<QqOutlined />} className="account" />
        <Avatar size={28} icon={<WechatOutlined />} className="account" />
      </div>
    </div>
  )
}
export default Author;
