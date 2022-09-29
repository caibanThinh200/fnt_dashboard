import { Routes, Route, BrowserRouter } from 'react-router-dom'
import SecureRoute from './SecureRoute'
import Layout from '../Pages'
import Authentication from '../Pages/Authentication'

const Section = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<Authentication />} />
                <Route path="/" element={<SecureRoute />}>
                    <Route path="" element={<Layout.Dashboard />} />
                </Route>
                <Route path="/product" element={<SecureRoute />}>
                    <Route path="" element={<Layout.ProductList />} />
                </Route>
                <Route path="/product/action" element={<SecureRoute />}>
                    <Route path="" element={<Layout.ProductAction />} />
                </Route>
                <Route path="/product/action/:id" element={<SecureRoute />}>
                    <Route path="" element={<Layout.ProductAction />} />
                </Route>
                <Route path="/attribute" element={<SecureRoute />}>
                    <Route path="" element={<Layout.AttributeList />} />
                </Route>
                <Route path="/attribute/action" element={<SecureRoute />}>
                    <Route path="" element={<Layout.AttributeAction />} />
                </Route>
                <Route path="/attribute/action/:id" element={<SecureRoute />}>
                    <Route path="" element={<Layout.AttributeAction />} />
                </Route>
                <Route path="/new" element={<SecureRoute />}>
                    <Route path="" element={<Layout.NewList />} />
                </Route>
                <Route path="/new/action" element={<SecureRoute />}>
                    <Route path="" element={<Layout.NewAction />} />
                </Route>
                <Route path="/new/action/:id" element={<SecureRoute />}>
                    <Route path="" element={<Layout.NewAction />} />
                </Route>
                <Route path="/product-type" element={<SecureRoute />}>
                    <Route path="" element={<Layout.ProductTypeList />} />
                </Route>
                <Route path="/product-type/action" element={<SecureRoute />}>
                    <Route path="" element={<Layout.ProductTypeAction />} />
                </Route>
                <Route
                    path="/product-type/action/:id"
                    element={<SecureRoute />}
                >
                    <Route path="" element={<Layout.ProductTypeAction />} />
                </Route>
                <Route path="/category" element={<SecureRoute />}>
                    <Route path="" element={<Layout.CategoryList />} />
                </Route>
                <Route path="/category/action" element={<SecureRoute />}>
                    <Route path="" element={<Layout.CategoryAction />} />
                </Route>
                <Route path="/category/action/:id" element={<SecureRoute />}>
                    <Route path="" element={<Layout.CategoryAction />} />
                </Route>
                <Route path="/discount" element={<SecureRoute />}>
                    <Route path="" element={<Layout.DiscountList />} />
                </Route>
                <Route path="/discount/action" element={<SecureRoute />}>
                    <Route path="" element={<Layout.DiscountAction />} />
                </Route>
                <Route path="/discount/action/:id" element={<SecureRoute />}>
                    <Route path="" element={<Layout.DiscountAction />} />
                </Route>
                <Route path="/cms-info" element={<SecureRoute />}>
                    <Route path="" element={<Layout.LayoutForm />} />
                </Route>
                <Route path="" element={<SecureRoute />}>
                    <Route path="*" element={<div>Not found</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Section
