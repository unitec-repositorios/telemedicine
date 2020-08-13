import React, { useState } from "react";
import './dashboard.scss';
import { Layout, Menu } from "antd";

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    ContactsOutlined,
    ReconciliationOutlined,
    EnvironmentOutlined,
    UploadOutlined,
  } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => setCollapsed(!collapsed);

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Usuario
            </Menu.Item>
            <Menu.Item key="2" icon={<EnvironmentOutlined />}>
              Hospitales
            </Menu.Item>
            <SubMenu 
            key="3"
            title={
                <span>Items</span>
            }
          >
            <Menu.Item key="4">
              <span>Mas items</span>
            </Menu.Item>
          </SubMenu>
            <Menu.Item key="5" icon={<ContactsOutlined />}>
              Pacientes
            </Menu.Item>
            <Menu.Item key="6" icon={<ReconciliationOutlined />}>
              Doctores
            </Menu.Item>
            <Menu.Item key="7" icon={<UploadOutlined />}>
              Pacientes
            </Menu.Item>
          </Menu>
        </Sider> 
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ background: "#ffff", padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
}

export default Dashboard;





