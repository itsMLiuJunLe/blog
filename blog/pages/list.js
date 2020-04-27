import React,{ useState, useEffect } from 'react';
import Head from 'next/head'
import { Col, Row, List, Breadcrumb } from 'antd';
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import Link from 'next/link';
import marked from 'marked';
import hljs from 'highlight.js';

import Author from '../components/Author';
import Header from '../components/Header';
import Advert from '../components/Advert';
import Footer from '../components/Footer';

import 'highlight.js/styles/monokai-sublime.css';

const MyList = (list) => {
  useEffect(()=>{
    setMylist(list.data)
   },[list.data])

  const [mylist, setMylist] = useState(list.data);
  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });

  return(
    <div>
      <Head>
        <title>I'm HaShiQi</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={(item)=>{
              return(
                <List.Item>
                  <div className="list-title">
                    <Link href={{pathname: './detailed', query: {id: item.id}}}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><CalendarOutlined />{item.addTime}</span>
                    <span><FolderOutlined />{item.typeName}</span>
                    <span><FireOutlined />{item.view_count}</span>
                  </div>
                  <div className="list-context"
                  dangerouslySetInnerHTML={{__html: marked(item.introduce)}}
                  >
                  </div>
                </List.Item>
              )
            }}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

MyList.getInitialProps = async (context) => {
  let id = context.query.id;
  //console.log(context)
  // const promise = new Promise((resolve) => {
  //   axios('http://127.0.0.1:7001/default/getListById').then((res) => {
  //     console.log(res.data);
  //     resolve(res.data);
  //   })
  // })

  // return await promise;
  const result = await axios(servicePath.getListById + id);
  //console.log(result.data);
  return result.data;
}

export default MyList

