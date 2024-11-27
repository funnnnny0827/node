import axios from "axios"
import { load } from 'cheerio'

const fetchPages = async () => {
    // 使用 Promise.all 并发请求多个页面
    const responses = await Promise.all(urls.map((url) => axios.get(url)))
    // 输出每个页面的内容（HTML）
    responses.forEach((response, index) => {
        console.log(response.config.url)
        console.log('\tNode Information')
        const $ = load(response.data)
        let result = '\t\t{'
        $('.card-body table tbody tr').each((index, row) => {
            if (!filterNodeInfo.includes(index)) {
                $(row).find('th').each((index, cell) => {
                    result += $(cell).text().trim() + ':' + $($(row).find('td')[index]).text().trim() + ','
                })
            }
        })
        result += '}'
        console.log(result)

        $('.mt-4 .col-12 table').each((index, row) => {
            console.log('\tSession Details')
            let sessionDetails = '\t\t{'
            $(row).find('thead tr th').each((index, cell) => {
                if (!filterSession.includes(index)) {
                    sessionDetails += $(cell).text().trim() + ':' + $($(row).find('tbody td')[index]).text().trim() + ','
                }
            })
            sessionDetails += '}'
            console.log(sessionDetails)
        })
    })
}

//查询链接
const urls = [
    "http://IP:8080/status",
]

//需要过滤的Node Information行
const filterNodeInfo = [3, 4]
//需要过滤的Session Details列,0是隐藏列
const filterSession = [0]

fetchPages()