import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import productThunk from "../../../thunk/productThunk";
import ProductTypeThunk from "../../../thunk/productTypeThunk";
import Product from "./ProductList";

const mapStateToProps = state => ({
    products: state.productReducer,
    productTypes: state.productTypeReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getList: filter => productThunk.getList(filter),
    getProductTypes: () => ProductTypeThunk.getListAll()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Product);