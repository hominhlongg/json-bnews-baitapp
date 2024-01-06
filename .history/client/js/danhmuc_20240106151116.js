const newsApi = "http://localhost:3000/news"
async function getNewById() {

    function getParameterByName(name, url = location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    var id = getParameterByName('cid');
    try {
        let itemNews = $('.items-new')
        let getRightContent = $(".rightbody")
        var newById = await axios.get(newsApi);
        newById = newById.data;
        const htmls = newById.filter(x => {
            return x.catId === id

        })
        let getCatData = await axios.get(categoryApi + '/' + id)
        let getTitle = getCatData.data

        if (htmls.length <= 0) {
            itemNews.prepend(`<div class="empty" style="font-style:italic;text-align:center;user-select:none">Chưa có tin tức</div>`)
            getRightContent.prepend(`<h3>Tin tức >> ${getTitle.name}</h3>`)
        } else {

            let news = htmls.map(n => {
                return `
                    <ul>
                            <li>
                                <h2>
                                    <a href="chitiet.html?did=${n.id}" title="">${n.description}</a>
                                </h2>
                                <div class="item">
                                <a href="chitiet.html?did=${n.id}" title=""><img src="./${n.image}" alt="" /></a>
                                    <p>${n.detail}</p>
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
            itemNews.html(news.join(""))
            itemNews.after(pagination)
            getRightContent.prepend(`<h3 class="title">Tin tức >> ${getTitle.name}</h3>`)
        }
    } catch (err) {
        newError.html(`<p style='color:red;font-style:italic'>Xảy ra lỗi khi lấy dữ liệu</p>`)
    }
}
let newError = $('.new-error')

getNewById();
