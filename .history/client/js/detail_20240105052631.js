const newsApi = "http://localhost:3000/news"

async function getUserById() {

    function getParameterByName(name, url = location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    var id = getParameterByName('did');
    try {
        //class items-new
        let getNewDetail = $('.new-detail')
        //class rightbody > items-new > new-detai (news selected detail)
        let getRightContent = $(".rightbody")
        let itemNew = $(".items-new")
        let getRelatedData = await axios.get(newsApi)
        let related = getRelatedData.data
        var newById = await axios.get(newsApi + '/' + id);
        newById = newById.data;
        let relatedNews
        if (newById.catId === id) {
            relatedNews = related.filter(x => {
                return x.catId === id
            })
        } else {
            id = newById.catId
            relatedNews = related.filter(x => {
                return x.catId === id
            })
        }

        console.log(relatedNews)
        console.log(newById)

        getRightContent.prepend(`<h1 class="title">${newById.description}</h1>`)
        itemNew[0].insertAdjacentHTML('afterend',
            `<h2 class="title related-title" style="margin-top:30px;color:#BBB">Tin tức liên quan</h2>`)
        getNewDetail.html(newById.detail)
        //Related News
        let test = relatedNews.filter(x => {
            return x.id !== newById.id
        })
        console.log(test)
        let b = test.map(x => {
            return `<div class="items-new">
            <ul>
                <li>
                    <h2>
                        <a href="chitiet.html?did=${x.id}" title="">${x.description}</a>
                    </h2>
                    <div class="item">
                        <a href="chitiet.html?did=${x.id}" title=""><img src="./${x.image}" alt=""></a>
                        <p>${x.detail}</p>
                        <div class="clr"></div>
                    </div>
                </li>
            </ul>
        </div>`
        })
        itemNew[1].insertAdjacentHTML('beforebegin', b)
    } catch (error) {
        var errorElement = $('.new-error');
        errorElement.text('Xảy ra lỗi khi lấy dữ liệu để sửa!');
        $(errorElement).attr('style', 'color: red; font-style: italic;');
    }
}
getUserById();