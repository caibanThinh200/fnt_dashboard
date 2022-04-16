import { useEffect, useState } from "react";
import List from "./List";
import Wrapper from "../../../Component/Wrapper";
import HeaderAction from "../../../Component/HeaderAction";
import TEXT_DEFINE from "../../../Constant/textDefine";
import { useOutletContext } from "react-router-dom";
import { Collapse, Input, Select, Space, Tag, List as AntList, Button, DatePicker } from "antd";
import Icon from "../../../Component/Icon";
import Form, { FormItem } from "../../../Component/Form";
import { customOptionSelect, genaratePaginateFilterSort, removeObjectEmptyValue } from "../../../Util/function";
import queryString from "query-string";
import { omit } from "lodash";
import moment from "moment";
import { PRODUCT_CONSTANT } from "../../../Mapping/Response/productResponse";
import INFO_DEFINE from "../../../Constant/infoDefine";

const Product = props => {
    const [product, setProduct] = useState({
        isFetching: false,
        result: [],
        item: {}
    }),
        [productType, setProductType] = useState({
            isFetching: false,
            result: [],
            item: {}
        }),
        [category, setCategory] = useState({
            isFetching: false,
            result: [],
            item: {}
        }),
        [filter, setFilter] = useState({}),
        routeProps = useOutletContext();

    useEffect(() => {
        props.getProductTypes();
        props.getListAllCategory();
    }, []);

    useEffect(() => {
        setProductType({
            isFetching: props.productTypes?.isProductTypeFetching,
            result: props.productTypes?.result
        })
    }, [props.productTypes]);

    useEffect(() => {
        setCategory({
            isFetching: props.categories?.isCategoryFetching,
            result: props.categories?.result
        })
    }, [props.categories]);

    useEffect(() => {
        setProduct({
            isFetching: props.products?.isProductFetching,
            result: props.products?.result
        });
    }, [props.products]);

    useEffect(() => {
        let filterParams = INFO_DEFINE.page_default
        if (routeProps.location?.search) {
            filterParams = {...filterParams, ...queryString.parse(routeProps.location?.search)};
            setFilter(filterParams);
        }
        props.getList(filterParams);
    }, [routeProps.location]);

    const pagination = {
        page_index: props.products.page_index || 1,
        page_size: props.products.page_size || 10,
        total: props.products.total || 0,
        current: props.products.page_index || 1
    };

    const onTableChange = (pagination, filters, sorter) => {
        const newFilter = genaratePaginateFilterSort(pagination, filters, sorter);
        setFilter({ ...filter, ...newFilter });
        props.getList(removeObjectEmptyValue({ ...filter, ...newFilter }));
        const queryFilter = queryString.stringify(removeObjectEmptyValue({ ...filter, ...newFilter }));
        routeProps.navigate("/product?" + queryFilter);
    }

    const onFilterChange = params => {
        let newFilter = omit({ ...filter, ...params }, ["page_index", "page_size"]);
        setFilter(removeObjectEmptyValue(newFilter));
        props.getList(removeObjectEmptyValue(newFilter));
        const queryFilter = queryString.stringify(removeObjectEmptyValue(newFilter));
        routeProps.navigate("/product?" + queryFilter);
    }
    // console.log(customOptionSelect(productType.result, ["name", "id"]))
    const onFilterInput = event => {
        let newFilter = {
            ...filter,
            [event.target?.name]: event?.target.value
        };
        setFilter(newFilter);
        props.getList(newFilter);
    }

    return <Wrapper className={"mt-5"}>
        <HeaderAction title={TEXT_DEFINE.PAGE.PRODUCT.title} isCreate onCreate={() => routeProps.navigate("/product/action")} />
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
                                    onSearch={value => onFilterChange({ name: value })}
                                    defaultValue={filter?.name}
                                    placeholder={TEXT_DEFINE.PAGE.PRODUCT.name}
                                />
                            </Wrapper>
                            <Wrapper className={"col-3"}>
                                <Input.Search
                                    allowClear
                                    value={filter?.code}
                                    onSearch={value => onFilterChange({ code: value })}
                                    placeholder={TEXT_DEFINE.PAGE.PRODUCT.code}
                                />
                            </Wrapper>
                            <Wrapper className={"col-3"}>
                                <Select
                                    allowClear
                                    className="w-100"
                                    value={filter?.product_type}
                                    onChange={value => onFilterChange({ product_type: value })}
                                    placeholder={TEXT_DEFINE.PAGE.PRODUCT.type}
                                    options={customOptionSelect(productType.result, ["name", "id"])}
                                />
                            </Wrapper>
                            <Wrapper className={"col-3"}>
                                <Select
                                    allowClear
                                    onChange={value => onFilterChange({ category: value })}
                                    className="w-100"
                                    value={filter?.category}
                                    placeholder={TEXT_DEFINE.PAGE.PRODUCT.category}
                                    options={customOptionSelect(category.result, ["name", "id"])}
                                />
                            </Wrapper>
                            {/* <Wrapper className={'col-12 mt-3'}>
                                <Space className="float-end">
                                    <Button danger>
                                        Reset
                                    </Button>
                                    <Button type="primary">
                                        Xác nhận
                                    </Button>
                                </Space>
                            </Wrapper> */}
                        </Wrapper>
                        <Wrapper className={"row mt-4"}>
                            <Wrapper className={"col-3"}>
                                <DatePicker
                                    allowClear
                                    onChange={(date, dateString) => onFilterChange({ created_at: dateString ? moment(dateString).format("YYYY-MM-DD") : "" })}
                                    className="w-100"
                                    defaultValue={filter?.created_at ? moment(filter?.created_at) : ""}
                                    placeholder={TEXT_DEFINE.PAGE.PRODUCT.created_at}
                                    options={customOptionSelect(category.result, ["name", "id"])}
                                />
                            </Wrapper>
                            <Wrapper className={"col-3"}>
                                <DatePicker
                                    allowClear
                                    onChange={(date, dateString) => onFilterChange({ updated_at: dateString ? moment(dateString).format("YYYY-MM-DD") : "" })}
                                    className="w-100"
                                    defaultValue={filter?.updated_at ? moment(filter?.updated_at) : ""}
                                    placeholder={TEXT_DEFINE.PAGE.PRODUCT.updated_at}
                                    options={customOptionSelect(category.result, ["name", "id"])}
                                />
                            </Wrapper>
                            <Wrapper className={"col-3"}>
                                <Select
                                    allowClear
                                    onChange={value => onFilterChange({ status: value })}
                                    className="w-100"
                                    value={filter?.status && parseInt(filter?.status)}
                                    placeholder={TEXT_DEFINE.PAGE.PRODUCT.status}
                                    options={customOptionSelect(PRODUCT_CONSTANT.STATUS_DEFINE, ["title", "value"])}
                                />
                            </Wrapper>
                        </Wrapper>
                    </Wrapper>
                </Collapse.Panel>
            </Collapse>
        </Wrapper>
        <List
            routeProps={routeProps}
            categoryResult={category.result}
            typeResult={productType.result}
            isLoading={product.isFetching}
            pagination={pagination}
            dataSource={product.result}
            onTableChange={onTableChange}
        />
    </Wrapper>
}

export default Product;