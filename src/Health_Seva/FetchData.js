
// This One Is For Get Request From Server....
export async function FetchData(url) {
    const UserData = JSON.parse(sessionStorage.getItem("BharatSevaUser"))
    try {
        let res = await fetch(url, {
            method: "GET",
            headers: {
                'content-type': "application/json",
                "Authorization": `Bearer ${UserData.token}`
            }
        })
        let data = await res.json()
        return { data, res }

    } catch (err) {
        return err
    }
}

// This One Is For Post Request!
export async function PostData(url, values) {
    const UserData = JSON.parse(sessionStorage.getItem("BharatSevaUser"))
    try {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'content-type': "application/json",
                "Authorization": `Bearer ${UserData.token}`
            },
            body: JSON.stringify(values)
        })
        let data = await res.json()
        console.log(data)
        return { data, res }
    } catch (err) {
        return err
    }
}