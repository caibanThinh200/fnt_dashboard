import { Button, Table, Tag } from "antd";
import { find } from "lodash";
import moment from "moment";
import Wrapper from "../../../Component/Wrapper"
import TEXT_DEFINE from "../../../Constant/textDefine";
import { CATEGORY_CONSTANT } from "../../../Mapping/Response/categoryResponse";
import { PRODUCT_CONSTANT } from "../../../Mapping/Response/productResponse";

const List = props => {
    const columns = [
        {
            title: TEXT_DEFINE.PAGE.CATEGORY.code,
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: TEXT_DEFINE.PAGE.CATEGORY.name,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: TEXT_DEFINE.PAGE.CATEGORY.created_at,
            dataIndex: 'created_at',
            key: 'created_at',
            render: value => value ? moment(value).format("DD-MM-YYYY hh:mm:ss") : "Chưa có thời gian tạo"
        },
        {
            title: TEXT_DEFINE.PAGE.CATEGORY.updated_at,
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: value => value ? moment(value).format("DD-MM-YYYY hh:mm:ss") : "Chưa cập nhật"
        },
        {
            title: TEXT_DEFINE.PAGE.CATEGORY.status,
            dataIndex: 'status',
            key: "status",
            render: value => <Tag color={find(CATEGORY_CONSTANT.STATUS_DEFINE, { value: value })?.color}>{find(CATEGORY_CONSTANT.STATUS_DEFINE, { value: value })?.title}</Tag>
        },
        {
            title: TEXT_DEFINE.PAGE.CATEGORY.action,
            key: "action",
            render: (value, record) => <Button type="primary" ghost onClick={() => props.routeProps?.navigate(`/category/action/${record?.id}`)}>{TEXT_DEFINE.ACTION.updated}</Button>
        }
    ];

    return <Wrapper>
        <Table
            rowKey="id"
            onChange={props.onTableChange}
            bordered
            columns={columns}
            loading={props.isLoading}
            dataSource={props.dataSource}
            pagination={props.pagination}
        />
    </Wrapper>
}

export default List;