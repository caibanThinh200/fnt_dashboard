import { Button, Table, Tag } from "antd";
import { find } from "lodash";
import moment from "moment";
import Wrapper from "../../../Component/Wrapper"
import TEXT_DEFINE from "../../../Constant/textDefine";
import { PRODUCT_CONSTANT } from "../../../Mapping/Response/productResponse";

const List = props => {
    const columns = [
        {
            title: TEXT_DEFINE.PAGE.PRODUCT.code,
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: TEXT_DEFINE.PAGE.PRODUCT.name,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: TEXT_DEFINE.PAGE.PRODUCT.type,
            width: 200,
            dataIndex: 'product_type',
            key: 'product_type',
            render: value => find(props.typeResult, {id: value})?.name || ""
        },
        {
            title: TEXT_DEFINE.PAGE.PRODUCT.category,
            dataIndex: 'category',
            key: 'category',
            render: value => find(props.categoryResult, {id: value})?.name || ""
        },
        {
            title: TEXT_DEFINE.PAGE.PRODUCT.price,
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => {
                return a.price - b.price
            }
        },
        {
            title: TEXT_DEFINE.PAGE.PRODUCT.created_at,
            dataIndex: 'created_at',
            key: 'created_at',
            render: value => value ? moment(value).format("DD-MM-YYYY hh:mm:ss") : "Chưa có thời gian tạo"
        },
        {
            title: TEXT_DEFINE.PAGE.PRODUCT.updated_at,
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: value => value ? moment(value).format("DD-MM-YYYY hh:mm:ss") : "Chưa cập nhật"
        },
        {
            title: TEXT_DEFINE.PAGE.PRODUCT.status,
            dataIndex: 'status',
            render: value => <Tag color={find(PRODUCT_CONSTANT.STATUS_DEFINE, {value: value})?.color}>{find(PRODUCT_CONSTANT.STATUS_DEFINE, {value: value})?.title}</Tag>
        },
        {
            title: TEXT_DEFINE.PAGE.PRODUCT.action,
            render: (value, record) => <Button type="primary" ghost onClick={() => props.routeProps?.navigate(`/product/action/${record?.id}`)}>{TEXT_DEFINE.ACTION.updated}</Button>
        }
    ];

    return <Wrapper>
        <Table 
            scroll={{x: 2000}}
            rowKey="id"
            bordered
            columns={columns}
            loading={props.isLoading}
            dataSource={props.dataSource}
            pagination={props.pagination}
            onChange={props.onTableChange}
        />
    </Wrapper>
}

export default List;