import { Button, Table, Tag } from "antd";
import { find } from "lodash";
import moment from "moment";
import Wrapper from "../../../Component/Wrapper"
import TEXT_DEFINE from "../../../Constant/textDefine";
import { DISCOUNT_CONSTANT } from "../../../Mapping/Response/discountResponse";

const List = props => {
    const columns = [
        {
            title: TEXT_DEFINE.PAGE.DISCOUNT_EVENT.name,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: TEXT_DEFINE.PAGE.DISCOUNT_EVENT.code,
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: TEXT_DEFINE.PAGE.DISCOUNT_EVENT.created_at,
            dataIndex: 'created_at',
            key: 'created_at',
            render: value => value ? moment(value).format("DD-MM-YYYY hh:mm:ss") : "Chưa có thời gian tạo"
        },
        {
            title: TEXT_DEFINE.PAGE.DISCOUNT_EVENT.updated_at,
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: value => value ? moment(value).format("DD-MM-YYYY hh:mm:ss") : "Chưa cập nhật"
        },
        {
            title: TEXT_DEFINE.PAGE.DISCOUNT_EVENT.status,
            dataIndex: 'status',
            align: "center",
            render: value => <Tag color={find(DISCOUNT_CONSTANT.STATUS_DEFINE, { value: value })?.color}>{find(DISCOUNT_CONSTANT.STATUS_DEFINE, { value: value })?.title}</Tag>
        },
        {
            title: TEXT_DEFINE.PAGE.DISCOUNT_EVENT.action,
            align: "center",
            render: (value, record) => <Wrapper>
                <Button 
                    type="primary" 
                    ghost 
                    onClick={() => props.routeProps?.navigate(`/discount/action/${record?.id}`)}
                >
                    {TEXT_DEFINE.ACTION.updated}
                </Button>
                <Button
                    type="primary"
                    className="ms-4"
                    onClick={async () => {
                        await props.handleUpdate(record.id, { ...record, status: 1 });
                        props.handleGetList()
                    }}
                >
                    {TEXT_DEFINE.ACTION.active}
                </Button>
            </Wrapper>
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