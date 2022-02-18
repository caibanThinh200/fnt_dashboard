import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { bindActionCreators } from "redux";
import HeaderAction from "../../../Component/HeaderAction";
import Wrapper from "../../../Component/Wrapper";
import TEXT_DEFINE from "../../../Constant/textDefine";
import categoryThunk from "../../../thunk/categoryThunk";
import List from "./List";

const CategoryList = props => {
    const [category, setCategory] = useState({
        isFetching: false,
        result: [],
        item: {}
    }),
    routeProps = useOutletContext();

    useEffect(() => {
        props.getList();
    }, [])

    useEffect(() => {
        setCategory({
            isFetching: props.categories?.isCategoryFetching,
            result: props.categories?.result,
        })
    }, [props.categories])

    const pagination = {
        page_index: props.categories.page_index || 1,
        page_size: props.categories.page_size || 10,
        total: props.categories.total || 0
    }

    return <Wrapper className={"mt-5"}>
        <HeaderAction title={TEXT_DEFINE.PAGE.CATEGORY.title} isCreate onCreate={() => routeProps.navigate("/category/action")}/>
        <List
            routeProps={routeProps}
            // typeResult={productType.result}
            isLoading={category.isFetching}
            pagination={pagination}
            dataSource={category.result}
        />
    </Wrapper>
}

const mapStateToProps = state => ({
    categories: state.categoryReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getList: filter => categoryThunk.getList(filter)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);