import { Divider, Input, Switch, Tag } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { FormItem, Function } from "../../../Component/Form";
import FormAction from "../../../Component/FormAction";
import Wrapper from "../../../Component/Wrapper";
import TEXT_DEFINE from "../../../Constant/textDefine";
import DiscountThunk from "../../../thunk/discountThunk";
import { lowercaseFirstLetter } from "../../../Util/function";

const DiscountAction = props => {
    const params = useParams(),
        [form] = Function.useForm(),
        routeProps = useOutletContext(),
        [action, setAction] = useState(TEXT_DEFINE.ACTION.create);

    useEffect(() => {
        if (params.id) {
            setAction(TEXT_DEFINE.ACTION.updated);
            props.getDetail(params.id);
        }
    }, [params.id])

    useEffect(() => {
        if (Object.keys(props.discounts).length > 0) {
            form.setFieldsValue(props.discounts.item);
        }
    }, [props.discounts]);

    const handleSubmit = e => {
        let newPayload = { ...e, ...routeProps , status: 2};
        if(params.id) {
            props.update(params.id, newPayload);
        } else {
            props.create(newPayload);
        }
    }

    const actionTitle = `${action} ${lowercaseFirstLetter(TEXT_DEFINE.PAGE.ACCESSORY.title)}`;
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
                        labelCol: { span: 2 },
                        wrapperCol: { span: 8 },
                    },
                    onFinish: handleSubmit,
                    size: "large",
                    labelAlign: "left",
                    labelWrap: true,
                    scrollToFirstError: true,
                    // onFinish: onSubmit
                }}
                buttonPosition={1}
                action={actionMethod}
            >
                <FormItem
                    name="name"
                    label={TEXT_DEFINE.PAGE.DISCOUNT_EVENT.name}
                >
                    <Input />
                </FormItem>
                <FormItem
                    name="code"
                    label={TEXT_DEFINE.PAGE.DISCOUNT_EVENT.code}
                >
                    <Input disabled />
                </FormItem>
                <FormItem
                    valuePropName="checked"
                    name="isPercent"
                    label={TEXT_DEFINE.PAGE.DISCOUNT_EVENT.isPercent}
                >
                    <Switch />
                </FormItem>
                <FormItem
                    name="discount_value"
                    label={TEXT_DEFINE.PAGE.DISCOUNT_EVENT.discount_value}
                >
                     <Input type={"number"} />
                </FormItem>
            </FormAction>
        </Wrapper>
    </Wrapper>
};

const mapStateToProps = state => ({
    discounts: state.discountReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getDetail: id => DiscountThunk.getDetail(id),
    update: (id, data) => DiscountThunk.update(id, data),
    create: data => DiscountThunk.create(data),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DiscountAction);