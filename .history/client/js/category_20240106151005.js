const categoryApi = "http://localhost:3000/categories"
async function render() {
    try {
        let getCate = $('.leftpanel')
        let getData = await axios.get(categoryApi)
        let categories = getData.data
        const htmls = categories.map(cat => {
            return `
            <ul>
            <li><a href="danhmuc.html?cid=${cat.id}">${cat.name}</a></li>
            </ul>
        `
        })
        getCate.html(htmls.join(""))
        getCate.prepend(`<h2>Danh mục tin</h2>`)
    } catch (err) {
        errorEl.html(`<p style='color:red;font-style:italic'>Xảy ra lỗi khi lấy dữ liệu</p>`)
    }

}
let errorEl = $('.new-error')
render()
