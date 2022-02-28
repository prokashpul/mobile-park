// load api 
const mobileApiLoad = () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=`
    // fetch function called
    fetch(url)
        .then(res => {
            if (res.status >= 200 && res.status <= 299) {
                return res.json();
            } else {
                throw Error(res.statusText);
            }
        })
        .then(mobileData => console.log(mobileData));
}
mobileApiLoad()