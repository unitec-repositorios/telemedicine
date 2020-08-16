import React, { useState } from "react";
import './dashboard.scss';
import { Layout, Menu } from "antd";
import Hospital from '../Components/Hospitals/Hospital';
import Patient from '../Components/Patients/Patient';
import Network from '../Components/Networks/Network';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    ContactsOutlined,
    ReconciliationOutlined,
    EnvironmentOutlined,
    UploadOutlined,
    ApartmentOutlined,
    HomeOutlined,
  } from '@ant-design/icons';

import AddForm from '../Components/Hospitals/addForm/AddForm'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => setCollapsed(!collapsed);

    return (
      <Router>
      <Layout style={{
        minHeight: "100vh",
      }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">
                Inicio
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<EnvironmentOutlined />}>
              <Link to="/hospitales">
                Hospitales
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/pacientes">
                Pacientes
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<ApartmentOutlined />}>
              <Link to="/redes">
                Redes
              </Link>
            </Menu.Item>
            {/* <SubMenu 
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
            </Menu.Item> */}
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
            <Switch>
                <Route path="/" exact>
                  Inicio
                </Route>
                <Route path="/hospitales">
                  <Hospital />
                </Route>
                <Route path="/pacientes">
                  <Patient />
                </Route>
                <Route path="/redes">
                  <Network />
                </Route>
                <Route path="/addForm">
                  <AddForm />
                </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
      </Router>
    );
}

export default Dashboard;





