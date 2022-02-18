import { useEffect, useState } from "react";
import List from "./List";
import Wrapper from "../../../Component/Wrapper";
import HeaderAction from "../../../Component/HeaderAction";
import TEXT_DEFINE from "../../../Constant/textDefine";
import { useOutletContext } from "react-router-dom";

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
    routeProps = useOutletContext();

    useEffect(() => {
        props.getList();
        props.getProductTypes();
    }, []);

    useEffect(() => {
        setProductType({
            isFetching: props.productTypes?.isProductTypeFetching,
            result: props.productTypes?.result
        })
    }, [props.productTypes]);

    useEffect(() => {
        setProduct({
            isFetching: props.products?.isProductFetching,
            result: props.products?.result
        });
    }, [props.products]);

    const pagination = {
        page_index: props.products.page_index || 1,
        page_size: props.products.page_size || 10,
        total: props.products.total || 0
    }

    return <Wrapper className={"mt-5"}>
        <HeaderAction title={TEXT_DEFINE.PAGE.PRODUCT.title} isCreate onCreate={() => routeProps.navigate("/product/action")}/>
        <List
            routeProps={routeProps}
            typeResult={productType.result}
            isLoading={product.isFetching}
            pagination={pagination}
            dataSource={product.result}
        />
    </Wrapper>
}

export default Product;