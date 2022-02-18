import Wrapper from "../Component/Wrapper";
import Form, { FormItem } from "../Component/Form";
import { Input, Button } from "antd";
import AuthThunk from "../thunk/authThunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useState } from "react";
import { useEffect } from "react";

const Authentication = props => {

    const [auth, setAuth] = useState({
        isFetching: false,
        item: {}
    })

    const loginAction = data => {
        props.login(data);
    }

    useEffect(() => {
        setAuth({
            isFetching: props.users.isAuthFetching,
            item: props.users.info
        });
    }, [props.users])

    return <Wrapper style={{ background: "#f0f0f0" }} className={"d-flex justify-content-center h-100"}>
        <Wrapper className={"furniture_auth__wrapper text-center"}>
            <Wrapper>
                <p className="h1 furniture_auth__title">AZ PRICE DASHBOARD</p>
            </Wrapper>
            <Wrapper hasBackground className={"mt-5 p-4 pe-5 rounded"} bordered shadow>
                <p style={{ fontWeight: 400 }} className="h2">--- Đăng nhập ---</p>
                <Form
                    onFinish={e => loginAction(e)}
                    className="mt-5 pe-5 row"
                    layout={{
                        labelCol: { span: 8 },
                        wrapperCol: { span: 16 }
                    }}
                >
                    <FormItem name="username" label="Tên tài khoản">
                        <Input />
                    </FormItem>
                    <FormItem name="password" label="Password">
                        <Input type={"password"} />
                    </FormItem>
                    <FormItem wrapperCol={{ offset: 8, span: 12 }} className="mt-5">
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            loading={auth.isFetching}
                            // disabled={auth.isFetching}
                        >
                            <span
                                style={{ fontWeight: 400 }}
                                className="h5">
                                Xác nhận
                            </span>
                        </Button>
                    </FormItem>
                </Form>
            </Wrapper>

        </Wrapper>
    </Wrapper>
}

const mapStateToProps = state => ({
    users: state.authReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
    login: data => AuthThunk.login(data)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);