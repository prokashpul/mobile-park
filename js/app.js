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

            }
        })
        .then((mobileData) => {
            mobileDataDisplay(mobileData)
        }).catch(error => document.getElementById('items-number').innerText = `OOps!! 😭😭 ${error.statusText}`)
}

// search button and input field  event handel add 
const searchBtn = () => {
    const inputField = document.getElementById('search-input');
    const inputValue = inputField.value;
    if (inputValue == "") {
        document.getElementById('items-number').innerText = `OOps!! 😭😭 Please input any phone name...`;
    } else {
        mobileApiLoad(inputValue.toLowerCase());
    }
    // input value empty
    inputField.value = '';
}

// Mobile api data load in display
const mobileDataDisplay = (data) => {
    const displayItems = document.getElementById('display-items');
    // empty display Items
    displayItems.textContent = '';
    // use forEach loop get search items
    if (data.data.length <= 20) {
        document.getElementById('items-number').innerText = `Search Results  ( ${data.data.length}  items Found)`;
    } else {
        document.getElementById('items-number').innerText = `Search Results  (20 item Found)`;
    }
    data.data.slice(0, 20).forEach((mobile) => {
        const div = document.createElement('div'); //create a div element
        div.classList.add('col'); //add a class 
        console.log(mobile)
        // div inner html setup
        div.innerHTML = `
        <div class="card border-0 shadow rounded h-100">
             <img src="${mobile.image?mobile.image:'img/mobile.jpg'}" class="card-img-top px-4 pt-4" height="380" alt="${mobile.phone_name?mobile.phone_name:'Not Found'}">
                <div class="card-body text-center my-3">
                  <h3 class="card-title">${mobile.phone_name?mobile.phone_name:'Not Found'}</h3>
                    <p>Brand: <em> ${mobile.brand?mobile.brand:'Not Found'}</em></p>
                    <a class="btn btn-warning rounded-0 text-light">About More </a>
             </div>
            </div>
        `
        displayItems.appendChild(div)
    })
}