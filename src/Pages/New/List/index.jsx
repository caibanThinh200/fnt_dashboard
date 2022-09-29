import { bindActionCreators } from "redux";
import NewThunk from "../../../thunk/newThunk";
import { connect } from "react-redux";
import { useState, useEffect } from "react"
import Wrapper from "../../../Component/Wrapper";
import TEXT_DEFINE from "../../../Constant/textDefine";
import { useOutletContext } from "react-router-dom";
import HeaderAction from "../../../Component/HeaderAction";
import List from "./List";
import { genaratePaginateFilterSort, removeObjectEmptyValue } from "../../../Util/function";
import queryString from "query-string";

const NewList = props => {
    const routeProps = useOutletContext(),
        [news, setNews] = useState({
            isFetching: false,
            result: [],
            item: {}
        }),
        [filter, setFilter] = useState({});

    useEffect(() => {
        setNews({
            isFetching: props.news.isAccessoryFetching,
            result: props.news.result,
            item: props.news.item
        })
    }, [props.news]);

    useEffect(() => {
        let filterParams = {}
        if (routeProps.location?.search) {
            filterParams = queryString.parse(routeProps.location?.search);
            setFilter(filterParams);
        }
        props.getList(filterParams);
    }, [routeProps.location]);

    const onTableChange = (pagination, filters, sorter) => {
        const newFilter = genaratePaginateFilterSort(pagination, filters, sorter);
        setFilter({ ...filter, ...newFilter });
        props.getList(removeObjectEmptyValue({ ...filter, ...newFilter }));
        const queryFilter = queryString.stringify(removeObjectEmptyValue({ ...filter, ...newFilter }));
        routeProps.navigate("/new?" + queryFilter);
    };

    const pagination = {
        page_index: props.news.page_index || 1,
        page_size: props.news.page_size || 10,
        total: props.news.total || 0
    }

    return <Wrapper className={"mt-5"}>
        <HeaderAction 
        title={TEXT_DEFINE.PAGE.NEW.title}
            isCreate
            onCreate={() => routeProps.navigate("/new/action")} />
        <List
            routeProps={routeProps}
            // typeResult={productType.result}
            onTableChange={onTableChange}
            isLoading={news.isFetching}
            pagination={pagination}
            dataSource={news.result}
        />
    </Wrapper>
}

const mapStateToProps = state => ({
    news: state.newReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getList: filter => NewThunk.getList(filter)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewList);