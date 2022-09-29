import { getThumbsUrl } from '../../Util/function'

class NewResponse {
    constructor(data) {
        this.setData(data)
    }

    setData(data) {
        this.id = data._id || ''
        this.code = data?.code || ''
        this.type = data.type || ''
        this.title = data.title || ''
        this.author = data.author || ''
        this.content = data?.content || 1
        this.favorite = data.favorite || 0
        this.thumb = getThumbsUrl(data?.thumb)
        this.status = data?.status || 0
        this.created_at = data.created_at || null
        this.updated_at = data.updated_at || null
    }
}

export const NEW_CONSTANT = {
    type: [
        { label: 'Chính sách', value: 0, color: '#f50' },
        { label: 'Giới thiệu', value: 1, color: '#2db7f5' },
        { label: 'Tuyển dụng', value: 2, color: '#87d068' },
    ],
    status: [
        { label: 'Chờ duyệt', value: 0, color: '#808080' },
        { label: 'Hủy', value: 1, color: '#FF0000' },
        { label: 'Duyệt', value: 2, color: '#87d068' },
    ],
}

export default NewResponse
