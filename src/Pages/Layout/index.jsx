import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
    Button,
    Col,
    Collapse,
    Divider,
    Form,
    Input,
    Radio,
    Row,
    Select,
    Space,
    Switch,
    Tag,
    Upload,
} from 'antd'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useOutletContext, useParams } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { FormItem, Function } from '../../Component/Form'
import FormAction from '../../Component/FormAction'
import Icon from '../../Component/Icon'
import Wrapper from '../../Component/Wrapper'
import TEXT_DEFINE from '../../Constant/textDefine'
import CkEditorUploadAdapter from '../../Mapping/Request/CkEditorUploadAdapter'
import { ACCESSORY_CONSTANT } from '../../Mapping/Response/attributeResponse'
import { NEW_CONSTANT } from '../../Mapping/Response/newResponse'
import LayoutThunk from '../../thunk/layoutThunk'
import { lowercaseFirstLetter } from '../../Util/function'
import LIST_CITY from '../../Constant/City.json'
import { LAYOUT_CONSTANT } from '../../Mapping/Response/layoutResponse'

const LayoutForm = (props) => {
    const [form] = Function.useForm(),
        [pattern, setPattern] = useState([]),
        [listDistrict, setListDistrict] = useState([])

    useEffect(() => {
        props.getDetail()
        return () => {
            props.onClearNew()
        }
    }, [])

    useEffect(() => {
        if (props.layouts?.item?.stores?.length < 1) {
            form.setFieldsValue({ stores: [{}] })
        }
        if (props.layouts?.item?.phones?.length < 1) {
            form.setFieldsValue({ phones: [''] })
        }
        form.setFieldsValue(props.layouts?.item)
    }, [props.layouts])
    // console.log(props.news.item)
    // useEffect(() => {
    //     form.setFieldsValue(props.news?.item)
    // }, [props.news])

    const handleSubmit = (e) => {
        let newPayload = { ...e }
        props.update(newPayload)
    }

    const actionTitle = TEXT_DEFINE.PAGE.LAYOUT.title
    const actionMethod = TEXT_DEFINE.METHOD.UPDATE

    const onPhoneInputChange = (e, key) => {
        const value = e.target.value
        const currentField = form.getFieldsValue()
        const reg = /^-?\d*(\.\d*)?$/
        let updatePhoneValue = currentField
        if (reg.test(value) || value === '' || value === '-') {
            updatePhoneValue = {
                ...updatePhoneValue,
                phones: currentField['phones'].map((item, index) => {
                    // console.log(item)
                    if (index === key) {
                        item = item
                    } else {
                        item = e.target.value
                    }
                    // console.log(item)
                    return item
                }),
            }
            form.setFieldsValue(updatePhoneValue)
        }
    }

    const handleFieldChange = (values) => {
        let newValue = {}
        const currentFields = form.getFieldsValue()
        if (values[0].name[0] === 'phones') {
            const reg = /^-?\d*(\.\d*)?$/
            if (
                reg.test(values[0].value) ||
                values[0].value === '' ||
                values[0].value === '-'
            ) {
                newValue = {
                    ...newValue,
                    [values[0].name[0]]: currentFields[values[0].name[0]].map(
                        (item, index) => {
                            // console.log(item)
                            if (values[0].name[1] === index) {
                                item = item
                            }
                            // console.log(item)
                            return item
                        }
                    ),
                }
            }
        }

        if (values[0].name[0] === 'stores' && values[0].name[2] === 'city') {
            setListDistrict(
                LIST_CITY.find((city) => city.name === values[0].value)
                    ?.districts
            )
        }
        if (values[0].name[0] === 'socials') {
            let validatePattern = [...pattern]
            if (values[0].name?.length === 1) {
                validatePattern = [...validatePattern, '']
            } else {
                if (values[0].name[2] === 'type') {
                    validatePattern = validatePattern.map((item, index) => {
                        if (index === values[0].name[1]) {
                            item =
                                values[0].value === 'Facebook'
                                    ? /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w]*\/)?(?:profile.php\?id=(?=\d.*))?([\w]*)?/
                                    : values[0].value === 'Instagram'
                                    ? /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/
                                    : /^[@][a-zA-z0-9]*$/
                        }
                        return item
                    })
                }
            }
            setPattern(validatePattern)
        }
        // form.setFieldsValue(newValue)
    }

    return (
        <Wrapper>
            {/* <Wrapper>
                <ul className="">
                    <li className="d-inline me-4">
                        <span className="me-2">Người thêm:</span>
                        <span className="fw-bold">Admin</span>
                    </li>
                    <li className="d-inline me-4">
                        <span className="me-2">Trạng thái:</span>
                        <span>
                            <Tag color={'blue'}>Khởi tạo</Tag>
                        </span>
                    </li>
                </ul>
            </Wrapper> */}
            <Divider>
                <span className="h2">{actionTitle}</span>
            </Divider>
            <Wrapper className={'mt-5'}>
                <FormAction
                    formProps={{
                        className: 'row',
                        form: form,
                        layout: {
                            labelCol: { span: 6 },
                            wrapperCol: { span: 18 },
                        },
                        onFinish: handleSubmit,
                        size: 'large',
                        labelAlign: 'left',
                        labelWrap: true,
                        onFieldsChange: handleFieldChange,
                        scrollToFirstError: true,
                        // onFinish: onSubmit
                    }}
                    buttonPosition={1}
                    action={actionMethod}
                >
                    <div className="col-6">
                        <FormItem
                            label={TEXT_DEFINE.PAGE.LAYOUT.name}
                            name={'name'}
                        >
                            <Input placeholder={TEXT_DEFINE.PAGE.LAYOUT.name} />
                        </FormItem>
                        {/* <FormItem
                            label={TEXT_DEFINE.PAGE.LAYOUT.phone}
                            name={'phone'}
                        >
                            <Input multiple />
                        </FormItem> */}
                        <FormItem
                            name={'store_logo'}
                            valuePropName="fileList"
                            // valuePropName="fileList"
                            label={TEXT_DEFINE.PAGE.LAYOUT.store_logo}
                            getValueFromEvent={(e) => {
                                return e?.fileList
                            }}
                        >
                            <Upload
                                // defaultFileList={[
                                //     {
                                //         uid: 1,
                                //         name: 'thumb',
                                //         url: props.new?.item?.thumb,
                                //     },
                                // ]}
                                maxCount={1}
                                action={`${process.env.REACT_APP_FURNITURE_HOST}upload`}
                                multiple={false}
                                listType="picture-card"
                            >
                                <Icon
                                    type={'plus-outlined'}
                                    className="fs-25"
                                />
                            </Upload>
                        </FormItem>
                        <FormItem
                            label={TEXT_DEFINE.PAGE.LAYOUT.introduce}
                            rules={[
                                { max: 50, message: 'Giới hạn tối đa 50 từ' },
                            ]}
                            name={'introduce'}
                        >
                            <Input.TextArea rows={3} />
                        </FormItem>
                    </div>
                    <div className="col-6">
                        <Collapse className="mb-2">
                            <Collapse.Panel header="Số điện thoại liên hệ">
                                <Form.List name={'phones'}>
                                    {(fields, { add, remove }) => (
                                        <Wrapper>
                                            {fields.map(
                                                ({
                                                    key,
                                                    name,
                                                    ...restField
                                                }) => (
                                                    <Row key={key}>
                                                        <Col span={20}>
                                                            <Form.Item
                                                                key={key}
                                                                name={[key]}
                                                                rules={[
                                                                    {
                                                                        pattern:
                                                                            /^-?\d*(\.\d*)?$/,
                                                                        message:
                                                                            'Vui lòng nhập đúng định dạng SDT',
                                                                    },
                                                                ]}
                                                                wrapperCol={{
                                                                    span: 22,
                                                                }}
                                                            >
                                                                <Input
                                                                    placeholder="Nhập số điện thoại"
                                                                    // onChange={(
                                                                    //     e
                                                                    // ) =>
                                                                    //     onPhoneInputChange(
                                                                    //         e,
                                                                    //         key
                                                                    //     )
                                                                    // }
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={4}>
                                                            <Form.Item>
                                                                <Icon
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        remove(
                                                                            key
                                                                        )
                                                                    }
                                                                    type="minus-circle-outlined"
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                )
                                            )}
                                            <FormItem>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={
                                                        <Icon type="plus-out-lined" />
                                                    }
                                                >
                                                    Thêm số điện thoại liên hệ
                                                </Button>
                                            </FormItem>
                                        </Wrapper>
                                    )}
                                </Form.List>
                            </Collapse.Panel>
                        </Collapse>
                        <Collapse className="mb-2">
                            <Collapse.Panel header="Email liên hệ">
                                <Form.List name={'emails'}>
                                    {(fields, { add, remove }) => (
                                        <Wrapper>
                                            {fields.map(
                                                ({
                                                    key,
                                                    name,
                                                    ...restField
                                                }) => (
                                                    <Row key={key}>
                                                        <Col span={20}>
                                                            <Form.Item
                                                                key={key}
                                                                name={[key]}
                                                                rules={[
                                                                    {
                                                                        type: 'email',
                                                                        message:
                                                                            'Vui lòng nhập đúng định dạng email',
                                                                    },
                                                                ]}
                                                                wrapperCol={{
                                                                    span: 22,
                                                                }}
                                                            >
                                                                <Input
                                                                    placeholder="Nhập email"
                                                                    // onChange={(
                                                                    //     e
                                                                    // ) =>
                                                                    //     onPhoneInputChange(
                                                                    //         e,
                                                                    //         key
                                                                    //     )
                                                                    // }
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={4}>
                                                            <Form.Item>
                                                                <Icon
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        remove(
                                                                            key
                                                                        )
                                                                    }
                                                                    type="minus-circle-outlined"
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                )
                                            )}
                                            <FormItem>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={
                                                        <Icon type="plus-out-lined" />
                                                    }
                                                >
                                                    Thêm email liên hệ
                                                </Button>
                                            </FormItem>
                                        </Wrapper>
                                    )}
                                </Form.List>
                            </Collapse.Panel>
                        </Collapse>
                        <Collapse className="mb-2">
                            <Collapse.Panel header="Mạng xã hội">
                                <Form.List name={'socialMedia'}>
                                    {(fields, { add, remove }) => (
                                        <Wrapper>
                                            {fields.map(
                                                ({
                                                    key,
                                                    name,
                                                    ...restField
                                                }) => (
                                                    <Row
                                                        className="mb-5"
                                                        key={key}
                                                        gutter={10}
                                                    >
                                                        <Col span={24}>
                                                            <FormItem
                                                                wrapperCol={24}
                                                                name={[
                                                                    name,
                                                                    'type',
                                                                ]}
                                                            >
                                                                <Select
                                                                    placeholder="Chọn nền tảng"
                                                                    options={
                                                                        LAYOUT_CONSTANT.social
                                                                    }
                                                                    className="w-100"
                                                                />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={24}>
                                                            <FormItem
                                                                wrapperCol={24}
                                                                name={[
                                                                    name,
                                                                    'info_url',
                                                                ]}
                                                                rules={[
                                                                    {
                                                                        pattern:
                                                                            pattern[
                                                                                key
                                                                            ],
                                                                        message:
                                                                            'Url không đúng định dạng',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input
                                                                    placeholder="Nhập tên tài khoản"
                                                                    className="w-100"
                                                                />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={24}>
                                                            <Form.Item>
                                                                <Button
                                                                    icon={
                                                                        <Icon
                                                                            style={{
                                                                                verticalAlign:
                                                                                    'top',
                                                                            }}
                                                                            type="delete"
                                                                        />
                                                                    }
                                                                    type="danger"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        remove(
                                                                            key
                                                                        )
                                                                    }
                                                                >
                                                                    {' '}
                                                                    Xóa thông
                                                                    tin{' '}
                                                                </Button>
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                )
                                            )}
                                            <FormItem>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={
                                                        <Icon type="plus-out-lined" />
                                                    }
                                                >
                                                    Thêm mạng xã hội
                                                </Button>
                                            </FormItem>
                                        </Wrapper>
                                    )}
                                </Form.List>
                            </Collapse.Panel>
                        </Collapse>
                        <Collapse className="mb-5">
                            <Collapse.Panel header="Danh sách các cửa hàng">
                                <Form.List name={'stores'}>
                                    {(fields, { add, remove }) => (
                                        <Wrapper>
                                            <Collapse className="mb-5">
                                                {fields.map(
                                                    ({
                                                        key,
                                                        name,
                                                        ...restField
                                                    }) => (
                                                        <Collapse.Panel
                                                            key={key}
                                                            className="mb-1"
                                                            header={`Cửa hàng ${key}`}
                                                        >
                                                            <Row>
                                                                <FormItem
                                                                    wrapperCol={{
                                                                        span: 24,
                                                                    }}
                                                                    label={
                                                                        TEXT_DEFINE
                                                                            .PAGE
                                                                            .LAYOUT
                                                                            .store_name
                                                                    }
                                                                    className="w-100"
                                                                    name={[
                                                                        name,
                                                                        'name',
                                                                    ]}
                                                                >
                                                                    <Input />
                                                                </FormItem>
                                                                <FormItem
                                                                    label={
                                                                        TEXT_DEFINE
                                                                            .PAGE
                                                                            .LAYOUT
                                                                            .store_address
                                                                    }
                                                                    wrapperCol={{
                                                                        span: 24,
                                                                    }}
                                                                    className="w-100"
                                                                    name={[
                                                                        name,
                                                                        'address',
                                                                    ]}
                                                                >
                                                                    <Input />
                                                                </FormItem>
                                                                <FormItem
                                                                    label={
                                                                        TEXT_DEFINE
                                                                            .PAGE
                                                                            .LAYOUT
                                                                            .city
                                                                    }
                                                                    wrapperCol={{
                                                                        span: 24,
                                                                    }}
                                                                    className="w-100"
                                                                    name={[
                                                                        name,
                                                                        'city',
                                                                    ]}
                                                                >
                                                                    <Select
                                                                        showSearch
                                                                        options={LIST_CITY.map(
                                                                            (
                                                                                city
                                                                            ) => ({
                                                                                label: city.name,
                                                                                value: city.name,
                                                                            })
                                                                        )}
                                                                    />
                                                                </FormItem>
                                                                <FormItem
                                                                    label={
                                                                        TEXT_DEFINE
                                                                            .PAGE
                                                                            .LAYOUT
                                                                            .district
                                                                    }
                                                                    wrapperCol={{
                                                                        span: 24,
                                                                    }}
                                                                    className="w-100"
                                                                    name={[
                                                                        name,
                                                                        'district',
                                                                    ]}
                                                                >
                                                                    <Select
                                                                        options={listDistrict.map(
                                                                            (
                                                                                item
                                                                            ) => ({
                                                                                label: item.name,
                                                                                value: item.name,
                                                                            })
                                                                        )}
                                                                    />
                                                                </FormItem>
                                                            </Row>
                                                        </Collapse.Panel>
                                                    )
                                                )}
                                            </Collapse>
                                            <FormItem>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={
                                                        <Icon type="plus-out-lined" />
                                                    }
                                                >
                                                    Thêm cửa hàng
                                                </Button>
                                            </FormItem>
                                        </Wrapper>
                                    )}
                                </Form.List>
                            </Collapse.Panel>
                        </Collapse>
                    </div>
                </FormAction>
            </Wrapper>
        </Wrapper>
    )
}

const mapStateToProps = (state) => ({
    layouts: state.layoutReducer,
    users: state.authReducer,
})

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDetail: () => LayoutThunk.getDetail(),
            update: (data) => LayoutThunk.update(data),
            create: (data) => LayoutThunk.create(data),
            onClearNe01w: () => LayoutThunk.clear(),
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(LayoutForm)
