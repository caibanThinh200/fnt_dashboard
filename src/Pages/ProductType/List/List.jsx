import { Button, Table, Tag } from "antd";
import { find } from "lodash";
import moment from "moment";
import Wrapper from "../../../Component/Wrapper"
import TEXT_DEFINE from "../../../Constant/textDefine";
import { PRODUCT_TYPE_CONSTANT } from "../../../Mapping/Response/productTypeResponse";

const List = props => {
    const columns = [
        {
            title: TEXT_DEFINE.PAGE.PRODUCT_TYPE.name,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: TEXT_DEFINE.PAGE.PRODUCT_TYPE.code,
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: TEXT_DEFINE.PAGE.PRODUCT_TYPE.created_at,
            dataIndex: 'created_at',
            key: 'created_at',
            render: value => value ? moment(value).format("DD-MM-YYYY hh:mm:ss") : "Chưa có thời gian tạo"
        },
        {
            title: TEXT_DEFINE.PAGE.PRODUCT_TYPE.updated_at,
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: value => value ? moment(value).format("DD-MM-YYYY hh:mm:ss") : "Chưa cập nhật"
        },
        {
            title: TEXT_DEFINE.PAGE.PRODUCT_TYPE.status,
            dataIndex: 'status',
            key: "status",
            render: value => <Tag color={find(PRODUCT_TYPE_CONSTANT.productTypeStatus, {value: value})?.color}>{find(PRODUCT_TYPE_CONSTANT.productTypeStatus, {value: value})?.title}</Tag>
        },
        {
            title: TEXT_DEFINE.PAGE.PRODUCT_TYPE.action,
            key: "action",
            render: (value, record) => <Button type="primary" ghost onClick={() => props.routeProps?.navigate(`/product-type/action/${record?.id}`)}>{TEXT_DEFINE.ACTION.updated}</Button>
        }
    ];

    return <Wrapper>
        <Table 
            rowKey="id"
            bordered
            columns={columns}
            loading={props.isLoading}
            dataSource={props.dataSource}
            pagination={props.pagination}
        />
    </Wrapper>
}

export default List;