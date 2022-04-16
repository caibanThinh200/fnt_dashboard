import { Divider, Tag, Input, Switch, message, Upload as AntUpload, Select, Collapse } from "antd";
import { FormItem, Function } from "../../../Component/Form";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Wrapper from "../../../Component/Wrapper";
import TEXT_DEFINE from "../../../Constant/textDefine";
import FormAction from "../../../Component/FormAction";
import Icon from "../../../Component/Icon";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState, ContentState, convertFromHTML } from "draft-js";
import draftToHTML from "draftjs-to-html";
import Urls from "../../../Util/Urls";
import * as _ from "lodash";
import htmlToDraft from "html-to-draftjs";
import { lowercaseFirstLetter } from "../../../Util/function";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CkEditorUploadAdapter from "../../../Mapping/Request/CkEditorUploadAdapter";
import { PRODUCT_CONSTANT } from "../../../Mapping/Response/productResponse";
import { find, get } from "lodash";

const ProductAction = props => {
    const params = useParams(),
        [form] = Function.useForm(),
        routeProps = useOutletContext(),
        [action, setAction] = useState(TEXT_DEFINE.ACTION.create),
        [editor, setEditor] = useState(EditorState.createEmpty()),
        [productType, setProductType] = useState({
            isFetching: false,
            result: [],
            item: {}
        }),
        [category, setCategory] = useState({
            isFetching: false,
            result: [],
            item: {}
        });

    useEffect(() => {
        if (params?.id) {
            setAction(TEXT_DEFINE.ACTION.updated);
            props.getDetail(params?.id);
        }
    }, [params?.id]);

    useEffect(() => {
        props.getListProductType();
        props.getListAllCategory();
        return () => {
            props.onClear();
            props.onClearType();
        }
    }, []);

    useEffect(() => {
        setCategory({
            isFetching: props.categories.isCategoryFetching,
            result: props.categories.result,
            item: props.categories.item
        })
    }, [props.categories]);

    useEffect(() => {
        let productTypeParams = { ...productType };
        if ((props.productTypes?.item?.attributes || []).length > 0) {
            productTypeParams = {
                ...productTypeParams,
                isFetching: props.productTypes.isProductTypeFetching,
                result: props.productTypes.result,
                item: {
                    ...productTypeParams.item,
                    ...props.productTypes?.item,
                    attributes: props.productTypes?.item?.attributes
                }
            };
        } else {
            productTypeParams = {
                ...productTypeParams,
                isFetching: props.productTypes.isProductTypeFetching,
                result: props.productTypes.result,
                item: {
                    ...productTypeParams.item,
                    ...props.productTypes?.item,
                    attributes: []
                }
            };
        }
        setProductType({ ...productTypeParams })
    }, [props.productTypes]);

    useEffect(() => {
        if (Object.keys(props.products?.item).length > 0) {
            let params = props.products?.item;
            Object.keys(props.products?.item).map(key => {
                if (key === "product_type") {
                    if (props.productTypes?.result.length > 0) {
                        params[key] = _.find(props.productTypes?.result, { id: params[key] })?.id || "";
                    }
                }
                // if (key === "detailDescription") {
                //     if (params[key]) {
                //         const blocksFromHTML = typeof window !== 'undefined' ? convertFromHTML(params[key]) : null;
                //         const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
                //         const editorFromHtml = EditorState.createWithContent(customContentStateConverter(state));
                //         // params = { ...params, [key]: editorFromHtml };
                //         setEditor(editorFromHtml);
                //     }
                // }
                if (key === "product_type" && params[key]) {
                    const typeId = params[key];
                    props.getProductTypeDetail(typeId);
                }
                if (key.includes("attribute")) {
                    Object.keys(params[key] || {}).map(item => form.setFieldsValue({ [`attributes.${item}`]: params[key][item] }))
                }
            });
            form.setFieldsValue(params);
        }
    }, [props.products]);

    const customContentStateConverter = (contentState) => {
        // changes block type of images to 'atomic'
        const newBlockMap = contentState.getBlockMap().map((block) => {
            const entityKey = block.getEntityAt(0);
            if (entityKey !== null) {
                const entityBlock = contentState.getEntity(entityKey);
                const entityType = entityBlock.getType();
                switch (entityType) {
                    case 'IMAGE': {
                        const newBlock = block.merge({
                            type: 'atomic',
                            text: 'img',
                        });
                        return newBlock;
                    }
                    default:
                        return block;
                }
            }
            return block;
        });
        const newContentState = contentState.set('blockMap', newBlockMap);
        return newContentState;
    }

    const onEditorChange = (editorState) => {
        if (editorState) {
            const contentRaw = convertToRaw(editorState.getCurrentContent());
            const htmlContent = draftToHTML(contentRaw);
            setEditor(editorState);
            form.setFieldsValue({ detailDescription: htmlContent });
        }
    };

    function uploadImageCallBack(file) {
        return new Promise(async (resolve, reject) => {
            const result = await props.upload(file);
            if (result) {
                resolve({
                    data: {
                        link: result
                    }
                });
            } else {
                reject();
            }
        })
    };

    const onFieldsChange = (field, allField) => {
        if (field[0].name[0] === "main_thumb") {
            // form.setFieldsValue({ mainThumb: field[0].value.map(file => file) });
        }
        if (field[0].name[0] === "product_type") {
            productType.item.attributes.length > 0 &&
                productType.item.attributes.map(item => {
                    form.setFieldsValue({ [`attributes.${item.id}`]: "" })
                })
            setProductType({
                ...productType,
                item: {
                    ...productType.item,
                    attribute: []
                }
            });
            props.getProductTypeDetail(field[0].value, true);
        }
    }

    const getDatasource = (id) => {
        if (Object.keys(productType.item).length > 0) {
            const filterParams = productType.item?.filter[id]?.value || [];
            return filterParams.map(item => item ? ({ label: item, value: item }) : []);
        } else {
            return []
        }
    }

    const handleSubmit = e => {
        let newPayload = { ...e, ...routeProps, status: 2 };
        if (Object.keys(e).length > 0) {
            let attributeObj = {};
            Object.keys(e).map((item) => {
                if (item.includes("attributes")) {
                    attributeObj = { ...attributeObj, [item]: e[item] };
                    attributeObj = _.transform(attributeObj, function (transformed, val, key) {
                        _.set(transformed, key, val);
                    });
                    newPayload = _.omit({ ...newPayload, ...attributeObj }, [item]);
                }
            });
        };
        if (!params.id) {
            props.create(newPayload);
        } else {
            props.update(params.id, newPayload);
        }
    }
    // console.log(productType.item.attributes, props.productTypes.item)
    const actionTitle = `${action} ${lowercaseFirstLetter(TEXT_DEFINE.PAGE.PRODUCT.title)}`;
    const actionMethod = params?.id ? TEXT_DEFINE.METHOD.UPDATE : TEXT_DEFINE.METHOD.CREATE;

    return <Wrapper className={"mt-4"}>
        <Wrapper>
            <ul className="">
                <li className="d-inline me-4">
                    <span className="me-2">Người thêm:</span>
                    <span className="fw-bold">Admin</span>
                </li>
                <li className="d-inline me-4">
                    <span className="me-2">Trạng thái:</span>
                    <span><Tag color={get(find(PRODUCT_CONSTANT.STATUS_DEFINE, { value: form.getFieldValue("status") }), "color")}>
                        {get(find(PRODUCT_CONSTANT.STATUS_DEFINE, { value: form.getFieldValue("status") }), "title")}    
                    </Tag></span>
                </li>
            </ul>
        </Wrapper>
        <Divider><span className="h2">{actionTitle}</span></Divider>
        <Wrapper className={"mt-5"}>
            <FormAction
                action={actionMethod}
                formProps={{
                    onFinishFailed: e => message.error("Chưa đủ điều kiện để xác nhận, vui lòng kiểm tra lại các trường"),
                    onFieldsChange: onFieldsChange,
                    className: "row",
                    layout: {
                        labelCol: { span: 6 },
                        wrapperCol: { span: 18 },
                    },
                    form: form,
                    onFinish: handleSubmit,
                    size: "large",
                    labelAlign: "left",
                    labelWrap: true,
                    scrollToFirstError: true
                }}
            >
                <Wrapper className={"col-6"}>
                    <FormItem
                        label={TEXT_DEFINE.PAGE.PRODUCT.name}
                        name="name"
                        required
                        colon={false}
                        rules={[{
                            required: true,
                            message: TEXT_DEFINE.VALIDATE.product.invalidName
                        }]}
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        colon={false}
                        label={TEXT_DEFINE.PAGE.PRODUCT.code}
                        name="code"
                    >
                        <Input disabled />
                    </FormItem>
                    <FormItem
                        colon={false}
                        label={TEXT_DEFINE.PAGE.PRODUCT.type}
                        name="product_type"
                        required
                        rules={[{
                            required: true,
                            message: TEXT_DEFINE.VALIDATE.product.invalidType
                        }]}
                    >
                        <Select>
                            {productType.result.length > 0 && productType.result.map((item, index) => <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>)}
                        </Select>
                    </FormItem>

                    <FormItem
                        colon={false}
                        label={TEXT_DEFINE.PAGE.PRODUCT.category}
                        name="category"
                        rules={[{
                            required: true,
                            message: TEXT_DEFINE.VALIDATE.product.invalidCategory
                        }]}
                    >
                        <Select>
                            {category.result.length > 0 && category.result.map((item, index) => <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>)}
                        </Select>
                    </FormItem>
                    <FormItem
                        colon={false}
                        label={TEXT_DEFINE.PAGE.PRODUCT.price}
                        name="price"
                        rules={[{
                            required: true,
                            type: "number",
                            transform: value => parseInt(value),
                            min: 1
                        }]}
                    >
                        <Input type={"number"} />
                    </FormItem>
                    <FormItem
                        colon={false}
                        label={TEXT_DEFINE.PAGE.PRODUCT.discount_value}
                        name="discount_value"
                        tooltip={{
                            title: TEXT_DEFINE.VALIDATE.product.isPercent,
                            icon: <Icon type="warning" />
                        }}
                    >
                        <Input type={"number"} />
                    </FormItem>
                    <FormItem
                        colon={false}
                        valuePropName={"checked"}
                        label={TEXT_DEFINE.PAGE.PRODUCT.is_percent}
                        name="isPercent"
                    >
                        <Switch />
                    </FormItem>
                </Wrapper>
                <Wrapper className={'col-6'}>
                    {
                        (productType.item.attributes || []).length > 0 && <Collapse accordion className="mb-5">
                            <Collapse.Panel forceRender header={`Thông số của loại sản phẩm ${productType.item?.name && productType.item?.name}`}>
                                {(productType.item.attributes || []).map(item => <FormItem
                                    rules={[{ required: item?.require, message: 'Trường thông số này không được trống' }]}
                                    required={item?.require}
                                    key={item.id}
                                    name={`attributes.${item.id}`}
                                    label={item.name}
                                >
                                    {
                                        item?.value_type === 2 ? <Select
                                            showSearch
                                            options={getDatasource(item.id)}
                                            placeholder="Chọn hoặc nhập thông số"
                                            notFoundContent={null}
                                        // optionFilterProp="children"
                                        // filterOption={(input, option) =>
                                        //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        // }
                                        >
                                        </Select> : <Select mode="tags" placeholder="Trường này cho phép nhập nhiều giá trị"></Select>
                                    }
                                </FormItem>)}
                                <span><Icon type="warning" /> Lưu ý: Nếu nhập thông số mới thay vì chọn giá trị có sẵn thì sẽ không có kết quả lọc</span>
                            </Collapse.Panel>
                        </Collapse>
                    }
                    <FormItem
                        valuePropName="fileList"
                        colon={false}
                        label={TEXT_DEFINE.PAGE.PRODUCT.main_thumb}
                        name="main_thumb"
                        getValueFromEvent={e => {
                            return e.fileList
                        }}
                    >
                        <AntUpload
                            beforeUpload={(file, fileList) => {
                                return new Promise((resolve, reject) => {
                                    const currentList = form.getFieldValue("main_thumb");
                                    const newList = [...currentList, ...fileList];
                                    if (newList.length > 2) {
                                        message.error("Chỉ được chọn 2 hình");
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
                    <FormItem
                        valuePropName="fileList"
                        colon={false}
                        label={TEXT_DEFINE.PAGE.PRODUCT.sub_thumb}
                        name="sub_thumb"
                        getValueFromEvent={e => {
                            return e.fileList
                        }}
                    >
                        <AntUpload
                            beforeUpload={(file, fileList) => {
                                return new Promise((resolve, reject) => {
                                    const currentList = form.getFieldValue("sub_thumb");
                                    const newList = [...currentList, ...fileList];
                                    if (newList.length > 6) {
                                        message.error("Chỉ được chọn 6 hình");
                                        reject();
                                        return false;
                                    } else {
                                        resolve();
                                    }
                                })
                            }}
                            maxCount={6}
                            action={`${process.env.REACT_APP_FURNITURE_HOST}upload`}
                            multiple={false}
                            listType="picture-card"
                        >
                            <Icon type={"plus-outlined"} className="fs-25" />
                        </AntUpload>
                    </FormItem>
                </Wrapper>
                <Divider className="m-5"></Divider>
                <Wrapper className={"col-12"}>
                    <FormItem
                        colon={false}
                        label={TEXT_DEFINE.PAGE.PRODUCT.short_description}
                        name="shortDescription"
                        rules={[{
                            required: true,
                            message: TEXT_DEFINE.VALIDATE.product.invalidShortDescription
                        }]}
                    >
                        <Input.TextArea />
                    </FormItem>
                    <FormItem
                        colon={false}
                        label={TEXT_DEFINE.PAGE.PRODUCT.detail_description}
                        name="detailDescription"
                        rules={[{
                            required: true,
                            message: TEXT_DEFINE.VALIDATE.product.invalidDetailDescription
                        }]}
                        getValueFromEvent={(event, editor) => {
                            return editor.getData();
                        }}

                    >
                        {/* <Editor
                            wrapperClassName="furniture_editor__wrapper"
                            editorClassName="demo-editor"
                            toolbarClassName="toolbar-class"
                            editorState={editor}
                            valuePropName="editorState"
                            onEditorStateChange={onEditorChange}
                            toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                                image: {
                                    previewImage: true,
                                    defaultSize: "100px",
                                    uploadCallback: uploadImageCallBack,
                                    // alt: { present: true, mandatory: true },
                                },
                            }}
                        /> */}
                        <CKEditor
                            editor={ClassicEditor}
                            data={props.products.item?.detailDescription}
                            // config={{
                            //     ckfinder: { uploadUrl: `${process.env.REACT_APP_FURNITURE_DEV_HOST}/upload` }
                            // }}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                editor.plugins.get("FileRepository").createUploadAdapter = function (loader) {
                                    return new CkEditorUploadAdapter(loader);
                                };
                                // console.log("Editor is ready to use!", editor);
                            }}
                        // config={custom_config}
                        // plugins={[Image, ImageResizeEditing, ImageResizeHandles,]}
                        />
                    </FormItem>
                </Wrapper>
            </FormAction>
        </Wrapper>
    </Wrapper>
}

export default ProductAction;