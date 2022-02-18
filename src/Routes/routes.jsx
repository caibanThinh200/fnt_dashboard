const routes = [
    {
        title: 'Trang chủ',
        name: 'dashboard',
        icon: 'dashboard',
        path: '/',
        hidden: false
    },
    {
        title: 'Sản phẩm',
        icon: 'product',
        name: 'productSub',
        subMenu: [
            {
                title: "Danh sách sản phẩm",
                name: "productList",
                path: "/product"
            },
            {
                title: "Danh sách loại sản phẩm",
                name: "product-type",
                path: "/product-type"
            },
            {
                title: "Thông số sản phẩm",
                name: "attribute",
                path: "/attribute"
            },
            {
                title: "Danh mục sản phẩm",
                name: "category",
                path: "/category"
            }
        ]
    },
    {
        title: 'Sự kiện',
        icon: 'cash',
        name: 'discountSub',
        subMenu: [
            {
                title: "Danh sách khuyến mãi",
                name: 'discountList',
                path: "/discount"
            }
        ]
    }
];

export default routes;