
export const metaFetch = (url) => {
    fetch(url)
        .then(res => {
            return res.json()
        })
        .then(data => {
            localStorage.setItem("lastpage", data.lastpage)
            const lastpage = localStorage.getItem("lastpage")
            // console.log(lastpage)
            return lastpage
        })

    // return lastpage

}
