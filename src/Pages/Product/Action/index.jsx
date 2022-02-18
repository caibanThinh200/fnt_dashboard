import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import categoryThunk from "../../../thunk/categoryThunk";
import productThunk from "../../../thunk/productThunk";
import productTypeThunk from "../../../thunk/productTypeThunk";
import uploadThunk from "../../../thunk/uploadThunk";
import ProductAction from "./ProductAction";

const mapStateToProps = state => ({
    products: state.productReducer,
    uploads: state.uploadReducer,
    productTypes: state.productTypeReducer,
    categories: state.categoryReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
    create: data => productThunk.create(data),
    getDetail: id => productThunk.getDetail(id),
    update: (id, data) => productThunk.update(id, data),
    onClear: () => productThunk.clearProduct(),
    onClearType: () => productTypeThunk.onClear(),
    upload: data => uploadThunk.upload(data),
    getListProductType: () => productTypeThunk.getListAll(),
    getProductTypeDetail: (id, isUpdate) => productTypeThunk.getDetail(id, isUpdate),
    getListAllCategory: () => categoryThunk.getListAll()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductAction);