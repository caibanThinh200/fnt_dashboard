import { Divider, Input, Radio, Switch, Tag } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { FormItem, Function } from "../../../Component/Form";
import FormAction from "../../../Component/FormAction";
import Wrapper from "../../../Component/Wrapper";
import TEXT_DEFINE from "../../../Constant/textDefine";
import { ACCESSORY_CONSTANT } from "../../../Mapping/Response/attributeResponse";
import AttributeThunk from "../../../thunk/attributeThunk";
import { lowercaseFirstLetter } from "../../../Util/function";

const AttributeAction = props => {
    const params = useParams(),
        [form] = Function.useForm(),
        routeProps = useOutletContext(),
        [action, setAction] = useState(TEXT_DEFINE.ACTION.create);
    useEffect(() => {
        if (params.id) {
            setAction(TEXT_DEFINE.ACTION.updated);
            props.getDetail(params.id);
        }
        return () => {
            props.onClearArttribute()
        }
    }, [params.id])
    console.log(props.attributes.item);
    useEffect(() => {
        if (Object.keys(props.attributes.item).length > 0) {
            if (props.attributes.item.filter?.option) {
                form.setFieldsValue({ "filter.option": props.attributes.item.filter?.option })
            }
            form.setFieldsValue(props.attributes.item);
        }
    }, [props.attributes]);

    const handleSubmit = e => {
        let newPayload = { ...e, ...routeProps, status: 2 };
        let filterParams = {};
        Object.keys(e).map((item) => {
            if (item.includes("filter")) {
                filterParams = { ...filterParams, [item]: e[item] };
                filterParams = _.transform(filterParams, function (transformed, val, key) {
                    _.set(transformed, key, val);
                });
                newPayload = _.omit({ ...newPayload, ...filterParams }, [item]);
            }
        });
        if (params.id) {
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
                    label={TEXT_DEFINE.PAGE.ACCESSORY.name}
                >
                    <Input />
                </FormItem>
                <FormItem
                    name="code"
                    label={TEXT_DEFINE.PAGE.ACCESSORY.code}
                >
                    <Input disabled />
                </FormItem>
                <FormItem
                    name="unit"
                    label={TEXT_DEFINE.PAGE.ACCESSORY.unit}
                >
                    <Input />
                </FormItem>
                {/* <FormItem
                    name="filter.value"
                    label={TEXT_DEFINE.PAGE.ACCESSORY.filterValues}
                >
                    <Input />
                </FormItem> */}
                <FormItem
                    name="filter.option"
                    label={TEXT_DEFINE.PAGE.ACCESSORY.filterType}
                >
                    <Radio.Group
                        options={ACCESSORY_CONSTANT.filterTypeOption}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </FormItem>
                <FormItem
                    name="value_type"
                    label={TEXT_DEFINE.PAGE.ACCESSORY.valueType}
                >
                    <Radio.Group
                        options={ACCESSORY_CONSTANT.value_type}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </FormItem>
                <FormItem
                    valuePropName="checked"
                    name="require"
                    label={TEXT_DEFINE.PAGE.ACCESSORY.required}
                >
                    <Switch />
                </FormItem>
                <FormItem
                    valuePropName="checked"
                    name="required_field"
                    label={TEXT_DEFINE.PAGE.ACCESSORY.required_field}
                >
                    <Switch />
                </FormItem>
            </FormAction>
        </Wrapper>
    </Wrapper>
};

const mapStateToProps = state => ({
    attributes: state.accessoryReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getDetail: id => AttributeThunk.getDetail(id),
    update: (id, data) => AttributeThunk.update(id, data),
    create: data => AttributeThunk.create(data),
    onClearArttribute: () => AttributeThunk.clear()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AttributeAction);