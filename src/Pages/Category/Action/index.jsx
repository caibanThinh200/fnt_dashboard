import { Collapse, Divider, Input, Tag, List, Button, Upload as AntUpload, message } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Function, FormItem } from "../../../Component/Form";
import FormAction from "../../../Component/FormAction";
import Wrapper from "../../../Component/Wrapper"
import TEXT_DEFINE from "../../../Constant/textDefine";
import categoryThunk from "../../../thunk/categoryThunk";
import { lowercaseFirstLetter } from "../../../Util/function";
import { useOutletContext } from "react-router-dom";
import Icon from "../../../Component/Icon";

const CategoryAction = props => {
    const params = useParams(),
        routeProps = useOutletContext(),
        [form] = Function.useForm(),
        [action, setAction] = useState(TEXT_DEFINE.ACTION.create),
        [data, setData] = useState({});

    useEffect(() => {
        if (params.id) {
            setAction(TEXT_DEFINE.ACTION.updated);
            props.getDetail(params.id);
        }
    }, [params.id]);

    useEffect(() => {
        form.setFieldsValue(props.categories.item);
        setData(props.categories.item);
    }, [props.categories]);

    useEffect(() => {
        return () => {
            props.onClear();
        }
    }, []);

    const onSubmit = e => {
        let newPayload = { ...e, ...routeProps , status: 2};
        if(params.id) {
            props.update(params.id, newPayload);
        } else {
            props.create(newPayload);
        }
    }

    const actionTitle = `${action} ${lowercaseFirstLetter(TEXT_DEFINE.PAGE.CATEGORY.title)}`;
    const actionMethod = params?.id ? TEXT_DEFINE.METHOD.UPDATE : TEXT_DEFINE.METHOD.CREATE;

    return <Wrapper>
        <Wrapper>
            <ul className="">
                <li className="d-inline me-4">
                    <span className="me-2">Người thêm:</span>
                    <span className="fw-bold">Admin</span>
                </li>
                <li className="d-inline me-4">
                    <span className="me-2">Trạng thái:</span>
                    <span><Tag color={"blue"}>Khởi tạo</Tag></span>
                </li>
            </ul>
        </Wrapper>
        <Divider><span className="h2">{actionTitle}</span></Divider>
        <Wrapper className={"mt-5"}>
            <FormAction
                formProps={{
                    className: "row",
                    form: form,
                    layout: {
                        labelCol: { span: 6 },
                        wrapperCol: { span: 18 },
                    },
                    // onFinish: handleSubmit,
                    size: "large",
                    labelAlign: "left",
                    labelWrap: true,
                    scrollToFirstError: true,
                    onFinish: onSubmit
                }}
                buttonPosition={1}
                action={actionMethod}
            >
                <Wrapper className={"col-6"}>
                    <FormItem
                        name="name"
                        label={TEXT_DEFINE.PAGE.CATEGORY.name}
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        name="code"
                        label={TEXT_DEFINE.PAGE.CATEGORY.code}
                    >
                        <Input disabled/>
                    </FormItem>
                    <FormItem
                        valuePropName="fileList"
                        colon={false}
                        label={TEXT_DEFINE.PAGE.CATEGORY.mainThumb}
                        name="thumb"
                        getValueFromEvent={e => {
                            return e?.fileList;
                        }}
                    >
                        <AntUpload
                            beforeUpload={(file, fileList) => {
                                return new Promise((resolve, reject) => {
                                    const currentList = form.getFieldValue("thumb");
                                    const newList = [...currentList, ...fileList];
                                    if (newList.length > 1) {
                                        message.error("Chỉ được chọn 1 hình");
                                        reject();
                                        return false;
                                    } else {
                                        resolve();
                                    }
                                })
                            }}
                            maxCount={1}
                            action={`${process.env.REACT_APP_FURNITURE_HOST}upload`}
                            multiple={false}
                            listType="picture-card"
                        >
                            <Icon type={"plus-outlined"} className="fs-25" />
                        </AntUpload>
                    </FormItem>
                </Wrapper>
                <Wrapper className={"col-6"}>
                    {
                        Object.keys(data).length > 0 && <Collapse className="mb-5">
                            <Collapse.Panel header="Bảng phân loại sản phẩm">
                                {
                                    data.productTypes && data.productTypes.length > 0 && data.productTypes.map(item => <Collapse>
                                        <Collapse.Panel header={item.name}>
                                            <List
                                                bordered
                                                dataSource={item?.products || []}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <Button type="link" onClick={() => routeProps.navigate(`/product/action/${item.id}`)}>{item.name}</Button>
                                                    </List.Item>
                                                )}
                                            />
                                        </Collapse.Panel>
                                    </Collapse>)
                                }
                            </Collapse.Panel>
                        </Collapse>
                    }
                </Wrapper>
            </FormAction>
        </Wrapper>
    </Wrapper >
}

const mapStateToProps = state => ({
    categories: state.categoryReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
    create: data => categoryThunk.create(data),
    getDetail: id => categoryThunk.getDetail(id),
    update: (id, data) => categoryThunk.update(id, data),
    onClear: () => categoryThunk.onClear()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAction);