import { bindActionCreators } from "redux";
import DiscountThunk from "../../../thunk/discountThunk";
import { connect } from "react-redux";
import { useState, useEffect } from "react"
import Wrapper from "../../../Component/Wrapper";
import TEXT_DEFINE from "../../../Constant/textDefine";
import { useOutletContext } from "react-router-dom";
import HeaderAction from "../../../Component/HeaderAction";
import List from "./List";

const DiscountList = props => {
    const routeProps = useOutletContext(),
        [discounts, setDiscounts] = useState({
            isFetching: false,
            result: [],
            item: {}
        });

    useEffect(() => {
        props.getList();
    }, []);

    useEffect(() => {
        setDiscounts({
            isFetching: props.discounts.isDiscountFetching,
            result: props.discounts.result,
            item: props.discounts.item
        })
    }, [props.discounts]);

    const pagination = {
        page_index: props.discounts.page_index || 1,
        page_size: props.discounts.page_size || 10,
        total: props.discounts.total || 0
    }

    return <Wrapper className={"mt-5"}>
        <HeaderAction title={TEXT_DEFINE.PAGE.DISCOUNT_EVENT.title} isCreate onCreate={() => routeProps.navigate("/discount/action")} />
        <List
            routeProps={routeProps}
            // typeResult={productType.result}
            handleUpdate={props.update}
            handleGetList={props.getList}
            isLoading={discounts.isFetching}
            pagination={pagination}
            dataSource={discounts.result}
        />
    </Wrapper>
}

const mapStateToProps = state => ({
    discounts: state.discountReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getList: filter => DiscountThunk.getList(filter),
    update: (id, data) => DiscountThunk.update(id, data)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DiscountList);