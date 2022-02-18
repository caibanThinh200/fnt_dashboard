import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Wrapper from "../../../Component/Wrapper"
import ProductTypeThunk from "../../../thunk/productTypeThunk";
import { useParams, useOutletContext } from "react-router-dom";
import { FormItem, FormList, Function } from "../../../Component/Form";
import { useEffect, useState } from "react";
import TEXT_DEFINE from "../../../Constant/textDefine";
import { lowercaseFirstLetter } from "../../../Util/function";
import { Button, Collapse, Divider, Input, message, Select, Space, Tag, Upload as AntUpload } from "antd";
import AttributeThunk from "../../../thunk/attributeThunk";
import FormAction from "../../../Component/FormAction";
import Icon from "../../../Component/Icon";
import Form from "../../../../../azp-website/node_modules/antd/lib/form/Form";
import _, { find } from "lodash";

const ProductTypeAction = props => {
    const params = useParams(),
        [form] = Function.useForm(),
        routeProps = useOutletContext(),
        [action, setAction] = useState(TEXT_DEFINE.ACTION.create),
        [attributes, setAttributes] = useState({
            isFetching: props.attributes.isAccessoryFetching,
            result: props.attributes.all,
            item: props.attributes.item
        }),
        [filter, setFilter] = useState([]);

    useEffect(() => {
        if (params.id) {
            setAction(TEXT_DEFINE.ACTION.updated);
            props.getDetail(params.id);
        }
    }, [params.id])

    useEffect(() => {
        props.getListAttribute();
        return () => {
            props.onClear();
        }
    }, []);

    useEffect(() => {
        setAttributes({
            isFetching: props.attributes.isAccessoryFetching,
            result: props.attributes.all,
            item: props.attributes.item
        })
    }, [props.attributes]);

    useEffect(() => {
        if (Object.keys(props.productTypes).length > 0) {
            form.setFieldsValue(props.productTypes.item);
            if ((props.productTypes.item?.attributes || []).length > 0) {
                form.setFieldsValue({ attributes: (props.productTypes.item?.attributes || []).map(item => item?.id) })
            }
            if ((Object.keys(props.productTypes.item?.filter || {}).length > 0 && attributes.result.length > 0)) {
                let listFilter = Object.keys(props.productTypes.item?.filter || {}).map(item => {
                    return _.find(attributes.result, { id: item })
                });
                Object.keys(props.productTypes.item?.filter || {}).map(item => {
                    form.setFieldsValue({ [`filter.${item}.value`]: props.productTypes.item?.filter[item]?.value || [] })
                });
                setFilter(listFilter);
            }
        }
    }, [props.productTypes, attributes.result]);
    // console.log(props.productTypes.item)

    const onFieldChange = (field, allField) => {
        if (field[0]?.name[0] === "attributes") {
            let newFilter = [];
            (field[0]?.value || []).map(item => {
                newFilter.push(_.find(attributes.result, { id: item }));
            });
            setFilter(newFilter);
        }
    }

    const handleSubmit = e => {
        let newPayload = { ...e, ...routeProps , status: 2};
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
        setFilter([]);
        if (params.id) {
            props.update(params.id, newPayload);
        } else {
            props.create(newPayload);
        }
    }

    const actionTitle = `${action} ${lowercaseFirstLetter(TEXT_DEFINE.PAGE.PRODUCT_TYPE.title)}`;
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
                    onFinish: handleSubmit,
                    onFieldsChange: onFieldChange,
                    size: "large",
                    labelAlign: "left",
                    labelWrap: true,
                    scrollToFirstError: true,
                    // onFinish: onSubmit
                }}
                buttonPosition={1}
                action={actionMethod}
            >
                <Wrapper className={"col-6"}>
                    <FormItem
                        name="name"
                        label={TEXT_DEFINE.PAGE.PRODUCT_TYPE.name}
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        name="code"
                        label={TEXT_DEFINE.PAGE.PRODUCT_TYPE.code}
                    >
                        <Input disabled />
                    </FormItem>
                    <FormItem
                        name="attributes"
                        label={TEXT_DEFINE.PAGE.PRODUCT_TYPE.accessories}
                    >
                        <Select mode="multiple">
                            {(attributes.result || []).length > 0 && (attributes.result || []).map(item => <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>)}
                        </Select>
                    </FormItem>
                    <FormItem
                        valuePropName="fileList"
                        colon={false}
                        label={TEXT_DEFINE.PAGE.PRODUCT_TYPE.mainThumb}
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
                            maxCount={2}
                            action={`${process.env.REACT_APP_FURNITURE_HOST}upload`}
                            multiple={false}
                            listType="picture-card"
                        >
                            <Icon type={"plus-outlined"} className="fs-25" />
                        </AntUpload>
                    </FormItem>
                </Wrapper>
                <Wrapper className={"col-6"}>
                    <FormItem>
                        {
                            filter.length > 0 && filter.map((item => <Collapse className="mb-3">
                                <Collapse.Panel header={`Bộ lọc của trường ${item.name}`}>
                                    <FormList label={TEXT_DEFINE.PAGE.PRODUCT_TYPE.filterValues} name={`filter.${item.id}.value`}>
                                        {(fields, { add, remove }) => (
                                            <Wrapper>
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <Space key={key} align="baseline">
                                                        <FormItem
                                                            label={TEXT_DEFINE.PAGE.PRODUCT_TYPE.filterValues}
                                                            {...restField}
                                                            name={name}
                                                        >
                                                            <Input />
                                                        </FormItem>
                                                        <Icon type="minus-circle-outlined" className="float-end" onClick={() => remove(name)} />
                                                    </Space>
                                                ))}
                                                <FormItem>
                                                    <Button type="dashed" onClick={() => add()} block icon={<Icon type="plus-out-lined" />}>
                                                        Thêm giá trị lọc
                                                    </Button>
                                                </FormItem>
                                            </Wrapper>
                                        )}
                                    </FormList>
                                </Collapse.Panel>
                            </Collapse>))
                        }
                    </FormItem>
                </Wrapper>
            </FormAction>
        </Wrapper>
    </Wrapper>
}

const mapStateToProps = state => ({
    productTypes: state.productTypeReducer,
    attributes: state.accessoryReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onClear: () => ProductTypeThunk.onClear(),
    getDetail: id => ProductTypeThunk.getDetail(id),
    update: (id, data) => ProductTypeThunk.update(id, data),
    create: data => ProductTypeThunk.create(data),
    getListAttribute: () => AttributeThunk.getListAll()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductTypeAction);