// load api 
const mobileApiLoad = (inputData) => {

    //api link
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
        }).catch(error => document.getElementById('items-number').innerText = `OOps!! 😭😭 ${error.statusText}`)
}

// search button and input field  event handel add 
const searchBtn = () => {
    spinnerToggle("flex");
    const inputField = document.getElementById('search-input');
    const inputValue = inputField.value;
    if (inputValue == "") {
        document.getElementById('items-number').innerText = `OOps!! 😭😭 Please input any Mobile name or Model...`;
        // spinner
        spinnerToggle("none");

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
    if (data.data.length <= 20 && data.data.length > 0) {
        document.getElementById('items-number').innerText = `Search Results  ( ${data.data.length}  items Found)`;
        // spinner
        spinnerToggle("none");
    } else if (data.data.length === 0) {
        document.getElementById('items-number').innerText = `OOps!! wrong input 😭😭 Please input any Mobile name or Model...`;

        // spinner
        spinnerToggle("none");
    } else {
        document.getElementById('items-number').innerText = `Search Results  ( 20+  items Found)`;
    }
    data.data.slice(0, 20).forEach((mobile) => {
        const div = document.createElement('div'); //create a div element
        div.classList.add('col'); //add a class 
        // console.log(mobile)
        // div inner html setup
        div.innerHTML = `
        <div class="card border-0 shadow rounded h-100">
             <img src="${mobile.image?mobile.image:'img/mobile.jpg'}" class="card-img-top px-4 pt-4" height="380" alt="${mobile.phone_name?mobile.phone_name:'Not Found'}">
                <div class="card-body text-center my-3">
                  <h3 class="card-title">${mobile.phone_name?mobile.phone_name:'Not Found'}</h3>
                    <p>Brand: <em> ${mobile.brand?mobile.brand:'Not Found'}</em></p>
                    <a class="btn btn-warning rounded-0 text-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="singleItemClick('${mobile.slug}')">About More </a>
             </div>
            </div>
        `
        displayItems.appendChild(div);
        spinnerToggle("none");
    })
}


// spinner page toggler add
const spinnerToggle = (displayStyle) => {
    document.getElementById('spinner').style.display = displayStyle;
}


// single item api load
const singleItem = (mobileId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${mobileId}`
    // console.log(url)
    fetch(url)
        .then((res) => {
            // condition apply
            if (res.status >= 200 && res.status <= 299) {
                return res.json();
            } else {
                throw Error(res.statusText);
            }
        })
        .then((singleMobileData) => {
            showSingleItem(singleMobileData)
        }).catch(error => document.getElementById('items-number').innerText = `OOps!! 😭😭 ${error.statusText}`)
}


// single item show display

const singleItemClick = (singleData) => {
    spinnerToggle("flex");
    singleItem(singleData)
}


// show single in modals
const showSingleItem = (data) => {
    // console.log(data)
    const singleItem = document.getElementById('single-view');
    // empty single Item
    singleItem.textContent = '';
    // singleItem inner html set
    if (data === undefined || data === null) {
        console.log("error")
    } else {
        singleItem.innerHTML = `
    <div class="modal-content">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn-close m-3" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="card border-0 rounded-0 py-4">
                        <div class="row align-items-center">
                            <div class="col-md-6">
                                <img src="${data.data.image?data.data.image:'img/mobile.jpg'} " class="card-img-top px-5 py-3" height="400" alt="${data.data.name?data.data.name:'no found'}">
                            </div>
                            <div class="col-md-6">
                                <ul class="list-group list-group-flush">
                                    <h2 class="card-title fw-bold  mx-3">${data.data.name?data.data.name:'no found'}</h2>
                                    <li class="list-group-item"><strong>Brand : </strong> ${data.data.brand?data.data.brand:'no found'}</li>      
                                    <li class="list-group-item">${data.data.releaseDate?data.data.releaseDate:'Released ....'}</li>
                                    <li class="list-group-item"><strong>DisplaySize : </strong> ${data.data.mainFeatures.displaySize?data.data.mainFeatures.displaySize:'no found'}</li>   
                                    <li class="list-group-item border-bottom"><strong>Memory : </strong> ${data.data.mainFeatures.memory?data.data.mainFeatures.memory:'no found'}</li>        
                                </ul>
                            </div>
                        </div>
                        <h3 class="mx-3 fw-bold">More Details: </h3>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>ChipSet : </strong> ${data.data.mainFeatures.chipSet?data.data.mainFeatures.chipSet:'no found'}</li>  
                        <li class="list-group-item"><strong>Storage : </strong> ${data.data.mainFeatures.storage?data.data.mainFeatures.storage:'no found'}</li> 
                        <li class="list-group-item"><strong>Sensors : </strong> ${data.data.mainFeatures.sensors?data.data.mainFeatures.sensors:'no found'}</li> 
                        <li class="list-group-item"><strong>Bluetooth : </strong> ${data.data.others.Bluetooth?data.data.others.Bluetooth:'no found'}</li> 
                        <li class="list-group-item"><strong>GPS : </strong> ${data.data.others.GPS?data.data.others.GPS:'...'}</li> 
                        <li class="list-group-item"><strong>NFC : </strong> ${data.data.others.NFC?data.data.others.NFC:'...'}</li> 
                        <li class="list-group-item"><strong>Radio: </strong> ${data.data.others.Radio?data.data.others.Radio:'...'}</li> 
                        <li class="list-group-item"><strong>USB: </strong> ${data.data.others.USB?data.data.others.USB:'...'}</li> 
                        <li class="list-group-item"><strong>USB: </strong> ${data.data.others.WLAN?data.data.others.WLAN:'...'}</li> 
                        </ul>
                    </div>
                </div>
            `
        spinnerToggle("none");
    }
}


// page reload home click

const pageReload = () => {
    location.reload();
}