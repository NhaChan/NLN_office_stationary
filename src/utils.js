
//
export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false
    }
    return true //Nếu là chuỗi (string)
}
