import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { bindActionCreators } from "redux";
import HeaderAction from "../../../Component/HeaderAction";
import Wrapper from "../../../Component/Wrapper";
import TEXT_DEFINE from "../../../Constant/textDefine";
import categoryThunk from "../../../thunk/categoryThunk";
import ProductTypeThunk from "../../../thunk/productTypeThunk";
import { genaratePaginateFilterSort, removeObjectEmptyValue } from "../../../Util/function";
import List from "./List";
import queryString from "query-string"
import { omit } from "lodash";

const CategoryList = props => {
    const [productType, setProductType] = useState({
        isFetching: false,
        result: [],
        item: {}
    }),
    [filter, setFilter] = useState({}),
    routeProps = useOutletContext();

    useEffect(() => {
        let filterParams = {}
        if (routeProps.location?.search) {
            filterParams = queryString.parse(routeProps.location?.search);
            setFilter(filterParams);
        }
        props.getList(filterParams);
    }, [routeProps.location]);

    useEffect(() => {
        setProductType({
            isFetching: props.productTypes?.isCategoryFetching,
            result: props.productTypes?.result,
        })
    }, [props.productTypes])

    const onTableChange = (pagination, filters, sorter) => {
        const newFilter = genaratePaginateFilterSort(pagination, filters, sorter);
        setFilter({ ...filter, ...newFilter });
        props.getList(removeObjectEmptyValue({ ...filter, ...newFilter }));
        const queryFilter = queryString.stringify(removeObjectEmptyValue({ ...filter, ...newFilter }));
        routeProps.navigate("/product?" + queryFilter);
    }

    const pagination = {
        page_index: props.productTypes.page_index || 1,
        page_size: props.productTypes.page_size || 10,
        total: props.productTypes.total || 0
    }

    return <Wrapper className={"mt-5"}>
        <HeaderAction title={TEXT_DEFINE.PAGE.PRODUCT_TYPE.title} isCreate onCreate={() => routeProps.navigate("/product-type/action")}/>
        <List
            routeProps={routeProps}
            // typeResult={productType.result}
            onTableChange={onTableChange}
            isLoading={productType.isFetching}
            pagination={pagination}
            dataSource={productType.result}
        />
    </Wrapper>
}

const mapStateToProps = state => ({
    productTypes: state.productTypeReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getList: filter => ProductTypeThunk.getList(filter),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);