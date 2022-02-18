import { bindActionCreators } from "redux";
import AttributeThunk from "../../../thunk/attributeThunk";
import { connect } from "react-redux";
import { useState, useEffect } from "react"
import Wrapper from "../../../Component/Wrapper";
import TEXT_DEFINE from "../../../Constant/textDefine";
import { useOutletContext } from "react-router-dom";
import HeaderAction from "../../../Component/HeaderAction";
import List from "./List";

const AttributeList = props => {
    const routeProps = useOutletContext(), 
    [attributes, setAttributes] = useState({
        isFetching: false,
        result: [],
        item: {}
    });

    useEffect(() => {
        props.getList();
    }, []);

    useEffect(() => {
        setAttributes({
            isFetching: props.attributes.isAccessoryFetching,
            result: props.attributes.result,
            item: props.attributes.item
        })
    }, [props.attributes]);

    const pagination = {
        page_index: props.attributes.page_index || 1,
        page_size: props.attributes.page_size || 10,
        total: props.attributes.total || 0
    }

    return <Wrapper className={"mt-5"}>
        <HeaderAction title={TEXT_DEFINE.PAGE.ACCESSORY.title} isCreate onCreate={() => routeProps.navigate("/attribute/action")} />
        <List
        routeProps={routeProps}
        // typeResult={productType.result}
        isLoading={attributes.isFetching}
        pagination={pagination}
        dataSource={attributes.result}
    />
    </Wrapper>
}

const mapStateToProps = state => ({
    attributes: state.accessoryReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getList: filter => AttributeThunk.getList(filter)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AttributeList);