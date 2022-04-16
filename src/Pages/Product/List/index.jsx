import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import productThunk from "../../../thunk/productThunk";
import ProductTypeThunk from "../../../thunk/productTypeThunk";
import Product from "./ProductList";
import categoryThunk from "../../../thunk/categoryThunk";

const mapStateToProps = state => ({
    products: state.productReducer,
    productTypes: state.productTypeReducer,
    categories: state.categoryReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getList: filter => productThunk.getList(filter),
    getProductTypes: () => ProductTypeThunk.getListAll(),
    getListAllCategory: () => categoryThunk.getListAll()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Product);