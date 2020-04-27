import React, { useState, useEffect } from 'react';
import { Row, Col, Menu } from 'antd';
import { HomeOutlined, LaptopOutlined, SmileOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import servicerPath from '../config/apiUrl.js';

import '../public/style/components/header.css';
import servicePath from '../config/apiUrl.js';

const Header = () => {

  const [navArray, setNavArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then((res) => {
        return res.data.data
      });
      setNavArray(result);
    }
    fetchData();
  }, [])

  const handleClick = (e) => {
    if(e.key == 0) {
      Router.push('/index')
    } else {
      //console.log(e.key);
      Router.push('/list?id=' + e.key)
    }
  }

  return(
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">哈士奇</span>
          <span className="header-text">奥利给，兄弟们干了</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal" onClick={handleClick}>
            <Menu.Item key="0">
              <HomeOutlined />
              博客首页
            </Menu.Item>
            {
              navArray.map((item) => {
                return (
                  <Menu.Item key={item.Id}>
                    <Icon type={item.icon} />
                    {item.typeName}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header;