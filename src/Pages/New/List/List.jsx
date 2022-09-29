import { Button, Table, Tag } from 'antd'
import { find } from 'lodash'
import moment from 'moment'
import Wrapper from '../../../Component/Wrapper'
import TEXT_DEFINE from '../../../Constant/textDefine'
import { ACCESSORY_CONSTANT } from '../../../Mapping/Response/attributeResponse'
import { NEW_CONSTANT } from '../../../Mapping/Response/newResponse'
import { PRODUCT_CONSTANT } from '../../../Mapping/Response/productResponse'

const List = (props) => {
    const columns = [
        {
            title: TEXT_DEFINE.PAGE.NEW.code,
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: TEXT_DEFINE.PAGE.NEW.title_name,
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: TEXT_DEFINE.PAGE.NEW.type,
            dataIndex: 'type',
            key: 'type',
            render: (value) => (
                <Tag
                    color={
                        find(NEW_CONSTANT.type, { value: parseInt(value) })
                            ?.color
                    }
                >
                    {find(NEW_CONSTANT.type, { value: parseInt(value) })?.label}
                </Tag>
            ),
        },
        {
            title: TEXT_DEFINE.PAGE.NEW.created_at,
            dataIndex: 'created_at',
            key: 'created_at',
            render: (value) =>
                value
                    ? moment(value).format('DD-MM-YYYY hh:mm:ss')
                    : 'Chưa có thời gian tạo',
        },
        {
            title: TEXT_DEFINE.PAGE.NEW.updated_at,
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (value) =>
                value
                    ? moment(value).format('DD-MM-YYYY hh:mm:ss')
                    : 'Chưa cập nhật',
        },
        {
            title: TEXT_DEFINE.PAGE.NEW.status,
            dataIndex: 'status',
            render: (value) => {
                return (
                    <Tag color={find(NEW_CONSTANT.status, { value })?.color}>
                        {find(NEW_CONSTANT.status, { value })?.label}
                    </Tag>
                )
            },
        },
        {
            title: TEXT_DEFINE.PAGE.NEW.action,
            render: (value, record) => (
                <Button
                    type="primary"
                    ghost
                    onClick={() =>
                        props.routeProps?.navigate(`/new/action/${record?.id}`)
                    }
                >
                    {TEXT_DEFINE.ACTION.updated}
                </Button>
            ),
        },
    ]

    return (
        <Wrapper>
            <Table
                rowKey="id"
                bordered
                onChange={props.onTableChange}
                columns={columns}
                loading={props.isLoading}
                dataSource={props.dataSource}
                pagination={props.pagination}
            />
        </Wrapper>
    )
}

export default List
