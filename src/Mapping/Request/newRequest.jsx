class NewRequest {
    constructor(data) {
        this.setData(data)
    }

    setData(data) {
        this.title = data?.title || ''
        this.thumb =
            ((data?.thumb || []).length > 0 && {
                ...data?.thumb[0],
                url: data?.thumb[0]?.response?.url
                    ? data?.thumb[0]?.response?.url
                    : data.thumb[0]?.url,
            }) ||
            {}
        this.type = data?.type || 0
        this.content = data?.content || ''
        this.status = data?.status || 0
        this.author = data?.author || ''
    }
}

export default NewRequest
