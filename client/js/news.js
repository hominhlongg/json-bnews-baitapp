
const newsApi = "http://localhost:3000/news"

async function render() {
    try {
        //News
        let getContentRight = $('rightbody')
        let itemNewEl = $(".items-new")
        let getNewsData = await axios.get(newsApi)
        let news = getNewsData.data
        const htmlsRight = news.map(news => {
            return `
                    <ul>
                    <li>
                        <h2>
                            <a href="chitiet.html?did=${news.id}" title="">${news.description}</a>
                        </h2>
                        <div class="item">
                        <a href="chitiet.html?did=${news.id}" title=""><img src="./${news.image}" alt="" /></a>
                            <p>${news.detail}</p>
                            <div class="clr"></div>
                        </div>
                    </li>
                    </ul>
                 `
        })
        let pagination = `<div class="paginator">
        <a href="">Trang 1</a> |
        <a href="" class="active">Trang 2</a> |
        <a href="">Trang 3</a> |
        <a href="">Trang 4</a>
    </div>`
        itemNewEl.html(htmlsRight.join(""))
        itemNewEl.after(pagination)

        getContentRight.prepend(`<h1 class="title">Tin tức</h1>`)
    } catch (err) {
        newError.html(`<p style='color:red;font-style:italic'>Xảy ra lỗi khi lấy dữ liệu</p>`)
    }

}
let newError = $('.new-error')
render()

