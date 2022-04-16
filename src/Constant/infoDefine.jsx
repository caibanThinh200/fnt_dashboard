const INFO_DEFINE = {
    pageOptions: [ 
        {
            value: 5, children: 5
        },
        {
            value: 10, children: 10
        },
        {
            value: 15, children: 15
        },
    ],
    page_default: {
        page_index: 1,
        page_size: 10
    },
    PAGE_ROUTE: {
        PRODUCT: {
            list: "/product",
            action: "/product/action",
        }
    },
    UPLOAD: {
        key: "fnt-media"
    },
    KEY: {
        upload: "https://res.cloudinary.com/dq5npd7ly/image/upload/v1645093009/azp_upload/",
        userToken: "azp_utk"
    }
}

export default INFO_DEFINE;