import React, { useState } from "react";
import "./Dashboard.scss";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  EnvironmentOutlined,
  ApartmentOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link, RouteComponentProps } from "@reach/router";

const { Header, Sider, Content } = Layout;

interface DashboardProps extends RouteComponentProps {
  children: React.ReactNode;
}

function Dashboard(props: DashboardProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => setCollapsed(!collapsed);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[
            props.location !== undefined ? props.location.pathname : "1", 
          ]}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="home">Inicio</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<EnvironmentOutlined />}>
            <Link to="hospitals">Hospitales</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="patients">Pacientes</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ApartmentOutlined />}>
            <Link to="networks">Redes</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ background: "#ffff", padding: 0 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="main-content"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <div style={{ maxWidth: "70%", margin: "0 auto" }}>
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
