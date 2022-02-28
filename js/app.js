// load api 
const mobileApiLoad = (inputData) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputData}`
    // fetch function called
    fetch(url)
        .then((res) => {
            // condition apply
            if (res.status >= 200 && res.status <= 299) {
                return res.json();
            } else {
                throw Error(res.statusText);
            }
        })
        .then((mobileData) => {
            mobileDataDisplay(mobileData)
        })
        .catch((error) => {
            //error handel
            console.log(error)
        })
}

// search button and input field  event handel add 
const searchBtn = () => {
    const inputField = document.getElementById('search-input');
    const inputValue = inputField.value;
    mobileApiLoad(inputValue.toLowerCase());
    // input value empty
    inputField.value = '';
}

// Mobile api data load in display
const mobileDataDisplay = (data) => {
    console.log(data)
}