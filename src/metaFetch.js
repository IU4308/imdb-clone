
export const metaFetch = (url) => {
    fetch(url)
        .then(res => {
            return res.json()
        })
        .then(data => {
            localStorage.setItem("lastpage", data.lastpage)
        })

    return Number(localStorage.getItem("lastpage"))

}
