import { Button, Dropdown, Menu, Space } from 'antd'
import Icon from "../Component/Icon";
import { Layout } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import React, { cloneElement, useState } from 'react';
import routes from "../Routes/routes";
import Wrapper from '../Component/Wrapper';
import TEXT_DEFINE from "../Constant/textDefine";
import { useEffect, useLayoutEffect } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AuthThunk from '../thunk/authThunk';
import INFO_DEFINE from '../Constant/infoDefine';
import LoadingOverlay from "react-loading-overlay"

const Navigation = props => {
    const { Content, Header } = Layout,
        { SubMenu } = Menu,
        [collapse, setCollapse] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem(INFO_DEFINE.KEY.userToken);
        props.navigate("/auth");
    }

    return (
        <Layout className='furniture_navigation'>
            <Header className="furniture_navigation__wrapper">
                <Wrapper className={"mt-1 float-start"}>
                    <Icon
                        onClick={() => setCollapse(!collapse)}
                        style={{
                            color: "#f0f0f0",
                            fontSize: "25px",
                        }}
                        type={collapse ? "toogle-on" : "toogle-off"}
                        className="me-2 mb-3"
                    />
                    <span className='h3 mt-3 white'>{TEXT_DEFINE.PAGE.MEMU.title}</span>
                </Wrapper>
                {
                    Object.keys(props.profile).length > 0 && <Wrapper className={"float-end"} style={{
                        color: "#f0f0f0",
                        fontSize: "25px",
                    }}>
                        <Space direction="vertical">
                            <Space wrap>
                                <Dropdown overlay={<Menu>
                                    <Menu.Item>
                                        <a onClick={handleLogout}>
                                            Đăng xuất
                                        </a>
                                    </Menu.Item>
                                </Menu>} placement="bottomCenter">
                                    <Button>User: {props.profile?.username}</Button>
                                </Dropdown>
                            </Space>
                        </Space>
                    </Wrapper>
                }
            </Header>
            <Layout hasSider>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapse}
                >
                    <Menu
                        className='h-100'
                        mode="inline"
                    >
                        {
                            routes.map((item, index) => {
                                if (item.subMenu && item.subMenu.length > 0) {
                                    return <SubMenu
                                        icon={<Icon type={item.icon} />}
                                        title={item.title}
                                        key={item.name}
                                    >
                                        {
                                            item.subMenu.map((subItem, subIndex) => <Menu.Item
                                                onClick={() => props.navigate(subItem.path)}
                                                icon={<Icon type={subItem.icon} />}
                                                key={subItem.name}
                                            >
                                                {subItem.title}
                                            </Menu.Item>)
                                        }
                                    </SubMenu>
                                } else {
                                    return <Menu.Item
                                        onClick={() => props.navigate(item.path)}
                                        icon={<Icon type={item.icon} />}
                                        key={item.name}
                                    >
                                        {item.title}
                                    </Menu.Item>
                                }
                            })
                        }
                    </Menu>
                </Sider>
                <Layout className='p-5 pt-2 furniture_navigation__content'>
                    <Content className='furniture_navigation__content__body'>
                        {cloneElement(props.children)}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

const Container = (props) => {
    const token = localStorage.getItem("azp_utk") || "",
        [user, setUser] = useState({
            isFetching: false,
            isAuth: false,
            info: {},
            permission: []
        }),
        [loading, setLoading] = useState(false),
        { categories, productTypes, products, attributes, discounts, users } = props;

    useEffect(() => {
        const checkLoading =
            categories.isCategoryFetching ||
            productTypes.isProductTypeFetching ||
            products.isProductFetching ||
            attributes.isAccessoryFetching ||
            discounts.isDiscountFetching ||
            users.isAuthFetching;
        setLoading(checkLoading);
    }, [categories, productTypes, products, attributes, discounts, users]);

    useEffect(() => {
        props.checkUser(token);
    }, [token]);

    useEffect(() => {
        if (Object.keys(props.users?.info || {}).length > 0) {
            setUser({
                ...user,
                isFetching: props.users?.isAuthFetching,
                isAuth: props.users?.isAuthed,
                info: props.users?.info
            })
        }
    }, [props.users]);

    return <LoadingOverlay
        active={loading}
        spinner
        text="Đang xử lí"
    >
        {
            user.isAuth && <Navigation {...props} profile={user.info} />
        }
    </LoadingOverlay>
}

const mapStateToProps = state => ({
    users: state.authReducer,
    categories: state.categoryReducer,
    productTypes: state.productTypeReducer,
    products: state.productReducer,
    attributes: state.accessoryReducer,
    discounts: state.discountReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
    checkUser: token => AuthThunk.checkUser(token)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Container);
