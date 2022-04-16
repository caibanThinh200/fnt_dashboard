import { Button, Table, Tag } from "antd";
import { find } from "lodash";
import moment from "moment";
import Wrapper from "../../../Component/Wrapper"
import TEXT_DEFINE from "../../../Constant/textDefine";
import { ORDER_CONSTANT } from "../../../Mapping/Response/orderResponse";
import { PRODUCT_CONSTANT } from "../../../Mapping/Response/productResponse";
import PaymentPopup from "../Action";
import { useState } from "react";

const List = props => {
    const [orderItem, setOrderItem] = useState({});
    const columns = [
        {
            title: TEXT_DEFINE.PAGE.ORDER.code,
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: TEXT_DEFINE.PAGE.ORDER.total,
            dataIndex: 'totalOrder',
            key: 'totalOrder',
        },
        {
            title: TEXT_DEFINE.PAGE.ORDER.customer_name,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: TEXT_DEFINE.PAGE.ORDER.phone,
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: TEXT_DEFINE.PAGE.ORDER.status,
            dataIndex: 'status',
            render: value => <Tag color={find(ORDER_CONSTANT.status, { value: value })?.color}>{find(ORDER_CONSTANT.status, { value: value })?.title}</Tag>
        },
        {
            title: TEXT_DEFINE.PAGE.ORDER.created_at,
            dataIndex: 'created_at',
            key: 'created_at',
            render: value => value ? moment(value).format("DD-MM-YYYY hh:mm:ss") : "Chưa có thời gian tạo"
        },
        {
            title: TEXT_DEFINE.PAGE.ORDER.updated_at,
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: value => value ? moment(value).format("DD-MM-YYYY hh:mm:ss") : "Chưa cập nhật"
        },
        {
            title: TEXT_DEFINE.PAGE.ORDER.action,
            render: (value, record) => <Button type="primary" ghost onClick={() => onPickOrderItem(record)}>{TEXT_DEFINE.ACTION.updated}</Button>
        }
    ];

    const onPickOrderItem = order => {
        setOrderItem(order);
    }

    const onSubmitModal = (id, data) => {
        props.handleUpdateStatus(id, data)
        setOrderItem({});
    }

    return <Wrapper>
        <Table
            scroll={{ x: 2000 }}
            rowKey="id"
            bordered
            columns={columns}
            loading={props.isLoading}
            dataSource={props.dataSource}
            pagination={props.pagination}
            onChange={props.onTableChange}
            // onChange={props.onTableChange}
        />
        <PaymentPopup 
            onCancel={() => setOrderItem({})}
            handleSubmit={onSubmitModal}
            style={{top: 50}}
            className={"w-100"}
            isPopup={Object.keys(orderItem).length > 0}
            orderResult={orderItem}
        />
    </Wrapper>
}

export default List;