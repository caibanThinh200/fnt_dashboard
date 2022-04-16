import { Col, Collapse, DatePicker, Input, Row, Select, Statistic, Tag } from "antd";
import Wrapper from "../../../Component/Wrapper";
import OrderThunk from "../../../thunk/orderThunk";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import INFO_DEFINE from "../../../Constant/infoDefine";
import { bindActionCreators } from "redux";
import List from "./List";
import { useOutletContext } from "react-router-dom";
import { omit } from "lodash";
import { customOptionSelect, genaratePaginateFilterSort, removeObjectEmptyValue } from "../../../Util/function";
import queryString from "query-string";
import TEXT_DEFINE from "../../../Constant/textDefine";
import moment from "moment";
import Icon from "../../../Component/Icon";
import { ORDER_CONSTANT } from "../../../Mapping/Response/orderResponse";

const Dashboard = props => {
    const [order, setOrder] = useState({
        item: {},
        result: [],
        isFetching: false,
        revenue: {
            approve_order: 0,
            cancel_order: 0,
            total_revenue: 0,
            approve_contacts: 0
        }
    }),
        [filter, setFilter] = useState({}),
        routeProps = useOutletContext()

    useEffect(() => {
        props.getRevenueOrder();
    }, []);

    useEffect(() => {
        let filterParams = INFO_DEFINE.page_default
        if (routeProps.location?.search) {
            filterParams = { ...filterParams, ...queryString.parse(routeProps.location?.search) };
            setFilter(filterParams);
        }
        props.getListOrder(filterParams);
    }, [routeProps.location]);

    useEffect(() => {
        setOrder({
            isFetching: props.orders?.isOrderFetching,
            result: props.orders?.result,
            revenue: props.orders?.revenue,
            item: props.orders?.item
        })
    }, [props.orders]);

    const onTableChange = (pagination, filters, sorter) => {
        const newFilter = genaratePaginateFilterSort(pagination, filters, sorter);
        setFilter({ ...filter, ...newFilter });
        props.getListOrder(removeObjectEmptyValue({ ...filter, ...newFilter }));
        const queryFilter = queryString.stringify(removeObjectEmptyValue({ ...filter, ...newFilter }));
        routeProps.navigate("/?" + queryFilter);
    }

    const onFilterChange = params => {
        let newFilter = omit({ ...filter, ...params }, ["page_index", "page_size"]);
        setFilter(removeObjectEmptyValue(newFilter));
        props.getListOrder(removeObjectEmptyValue(newFilter));
        const queryFilter = queryString.stringify(removeObjectEmptyValue(newFilter));
        routeProps.navigate("/?" + queryFilter);
    }

    const handleUpdateStatus = (id, status) => {
        setOrder({ ...order, item: {} });
        props.updateOrder(id, status)
    }

    const pagination = {
        page_index: props.orders.page_index || 1,
        page_size: props.orders.page_size || 10,
        total: props.orders.total || 0,
        current: props.orders.page_index || 1
    };

    return <Wrapper className={"mt-4"}>
        <Wrapper>
            <p className="h1">AZP Dashboard</p>
        </Wrapper>
        <Row gutter={30} className={"mt-5 gx-5"}>
            <Col span={12} lg={6}>
                <Wrapper shadow className={"text-center mb-4 mb-lg-0  p-4"}>
                    <Statistic
                        title={<h4>Tổng đơn hàng duyệt</h4>}
                        value={order.revenue.approve_order}
                        precision={0}
                        valueStyle={{ color: '#3f8600' }}
                    />
                </Wrapper>
            </Col>
            <Col span={12} lg={6}>
                <Wrapper shadow className={"text-center mb-4 mb-lg-0  p-4"}>
                    <Statistic
                        title={<h4>Tổng đơn hàng hủy</h4>}
                        value={order.revenue.cancel_order}
                        precision={0}
                        valueStyle={{ color: '#3f8600' }}
                    />
                </Wrapper>
            </Col>
            <Col span={12} lg={6}>
                <Wrapper shadow className={"text-center mb-4 mb-lg-0  p-4"}>
                    <Statistic
                        title={<h4>Số điện thoại đã liên lạc</h4>}
                        value={order.revenue.approve_contacts}
                        precision={0}
                        valueStyle={{ color: '#3f8600' }}
                    />
                </Wrapper>
            </Col>
            <Col span={12} lg={6}>
                <Wrapper shadow className={"text-center mb-4 mb-lg-0  p-4"}>
                    <Statistic
                        title={<h4>Tổng doanh thu</h4>}
                        value={order.revenue.total_revenue}
                        precision={0}
                        valueStyle={{ color: '#3f8600' }}
                        suffix="VND"
                    />
                </Wrapper>
            </Col>
        </Row>
        <Wrapper className={"mt-5 mb-5"}>
            <Collapse>
                <Collapse.Panel
                    showArrow={false}
                    header={<Tag className="p-2" color={"#20B2AA"}><Icon type="filter-outlined" /> Bộ lọc</Tag>}
                >
                    <Wrapper className={"p-4"}>
                        <Wrapper className={"row"}>
                            <Wrapper className={"col-3"}>
                                <Input.Search
                                    allowClear
                                    value={filter?.code}
                                    onSearch={value => onFilterChange({ code: value })}
                                    placeholder={TEXT_DEFINE.PAGE.PRODUCT.code}
                                />
                            </Wrapper>
                            <Wrapper className={"col-3"}>
                                <DatePicker
                                    allowClear
                                    onChange={(date, dateString) => onFilterChange({ created_at: dateString ? moment(dateString).format("YYYY-MM-DD") : "" })}
                                    className="w-100"
                                    defaultValue={filter?.created_at ? moment(filter?.created_at) : ""}
                                    placeholder={TEXT_DEFINE.PAGE.PRODUCT.created_at}
                                // options={customOptionSelect(category.result, ["name", "id"])}
                                />
                            </Wrapper>
                            <Wrapper className={"col-3"}>
                                <DatePicker
                                    allowClear
                                    onChange={(date, dateString) => onFilterChange({ updated_at: dateString ? moment(dateString).format("YYYY-MM-DD") : "" })}
                                    className="w-100"
                                    defaultValue={filter?.updated_at ? moment(filter?.updated_at) : ""}
                                    placeholder={TEXT_DEFINE.PAGE.PRODUCT.updated_at}
                                // options={customOptionSelect(category.result, ["name", "id"])}
                                />
                            </Wrapper>
                            <Wrapper className={"col-3"}>
                                <Select
                                    allowClear
                                    onChange={value => onFilterChange({ status: value })}
                                    className="w-100"
                                    value={filter?.status && parseInt(filter?.status)}
                                    placeholder={TEXT_DEFINE.PAGE.PRODUCT.status}
                                options={customOptionSelect(ORDER_CONSTANT.status, ["title", "value"])}
                                />
                            </Wrapper>
                        </Wrapper>
                    </Wrapper>
                </Collapse.Panel>
            </Collapse>
        </Wrapper>
        <Wrapper className={"mt-5"}>
            <List
                isLoading={order.isFetching}
                pagination={pagination}
                dataSource={order.result}
                handleUpdateStatus={handleUpdateStatus}
                onTableChange={onTableChange}
            />
        </Wrapper>
    </Wrapper>
};

const mapStateToProps = state => ({
    orders: state.orderReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getListOrder: filter => OrderThunk.getList(filter),
    getRevenueOrder: () => OrderThunk.getRevenue(),
    updateOrder: (id, data) => OrderThunk.updateStatus(id, data)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);