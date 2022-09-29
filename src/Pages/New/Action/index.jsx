import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Divider, Form, Input, Radio, Select, Switch, Tag, Upload } from 'antd'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useOutletContext, useParams } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { FormItem, Function } from '../../../Component/Form'
import FormAction from '../../../Component/FormAction'
import Icon from '../../../Component/Icon'
import Wrapper from '../../../Component/Wrapper'
import TEXT_DEFINE from '../../../Constant/textDefine'
import CkEditorUploadAdapter from '../../../Mapping/Request/CkEditorUploadAdapter'
import { ACCESSORY_CONSTANT } from '../../../Mapping/Response/attributeResponse'
import { NEW_CONSTANT } from '../../../Mapping/Response/newResponse'
import NewThunk from '../../../thunk/newThunk'
import { lowercaseFirstLetter } from '../../../Util/function'

const NewAction = (props) => {
    const params = useParams(),
        [form] = Function.useForm(),
        routeProps = useOutletContext(),
        [action, setAction] = useState(TEXT_DEFINE.ACTION.create)

    useEffect(() => {
        if (params.id) {
            setAction(TEXT_DEFINE.ACTION.updated)
            props.getDetail(params.id)
        }
        return () => {
            props.onClearNew()
        }
    }, [params.id])
    // console.log(props.news.item)
    useEffect(() => {
        form.setFieldsValue(props.news?.item)
    }, [props.news])

    const handleSubmit = (e) => {
        let newPayload = {
            ...e,
            ...routeProps,
            status: 2,
            author: props?.users?.info?.id,
            // thumb: e?.thumb
        }
        if (params.id) {
            props.update(params.id, newPayload)
        } else {
            props.create(newPayload)
        }
    }

    const actionTitle = `${action} ${lowercaseFirstLetter(
        TEXT_DEFINE.PAGE.NEW.title
    )}`
    const actionMethod = params?.id
        ? TEXT_DEFINE.METHOD.UPDATE
        : TEXT_DEFINE.METHOD.CREATE

    return (
        <Wrapper>
            <Wrapper>
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
            </Wrapper>
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
                        scrollToFirstError: true,
                        // onFinish: onSubmit
                    }}
                    buttonPosition={1}
                    action={actionMethod}
                >
                    <div className="col-6">
                        <FormItem
                            label={TEXT_DEFINE.PAGE.NEW.title_name}
                            name={'title'}
                        >
                            <Input
                                placeholder={TEXT_DEFINE.PAGE.NEW.title_name}
                            />
                        </FormItem>
                        <FormItem
                            label={TEXT_DEFINE.PAGE.NEW.code}
                            name={'code'}
                        >
                            <Input disabled />
                        </FormItem>
                        <FormItem
                            name={'thumb'}
                            valuePropName="fileList"
                            // valuePropName="fileList"
                            label={TEXT_DEFINE.PAGE.NEW.thumb}
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
                            name={'type'}
                            label={TEXT_DEFINE.PAGE.NEW.type}
                            getValueFromEvent={(e) => {
                                return e
                            }}
                        >
                            <Select
                                options={NEW_CONSTANT.type.map((item) => ({
                                    label: item.label,
                                    value: item.value,
                                }))}
                            />
                        </FormItem>
                    </div>
                    <div className="col-6">
                        <FormItem
                            colon={false}
                            label={TEXT_DEFINE.PAGE.NEW.content}
                            name="content"
                            // rules={[{
                            //     required: true,
                            //     message: TEXT_DEFINE.VALIDATE.product.invalidDetailDescription
                            // }]}
                            getValueFromEvent={(event, editor) => {
                                return editor.getData()
                            }}
                        >
                            <CKEditor
                                editor={ClassicEditor}
                                // data="<p>Hello from CKEditor 5!</p>"
                                data={props.news?.item?.content || ""}
                                onReady={(editor) => {
                                    // You can store the "editor" and use when it is needed.
                                    editor.plugins.get(
                                        'FileRepository'
                                    ).createUploadAdapter = function (loader) {
                                        return new CkEditorUploadAdapter(loader)
                                    }
                                }}
                            />
                        </FormItem>
                    </div>
                </FormAction>
            </Wrapper>
        </Wrapper>
    )
}

const mapStateToProps = (state) => ({
    news: state.newReducer,
    users: state.authReducer,
})

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDetail: (id) => NewThunk.getDetail(id),
            update: (id, data) => NewThunk.update(id, data),
            create: (data) => NewThunk.create(data),
            onClearNew: () => NewThunk.clear(),
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(NewAction)
