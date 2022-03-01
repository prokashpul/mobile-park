const fetchData = (urlLink, loadData) => {
    //api link
    const url = `https://openapi.programming-hero.com/api/${urlLink}`
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
        .then((data) => {

            loadData(data)

        }).catch(error => {
            if (error.status === undefined) {
                document.getElementById('items-number').innerText = `OOps!! 😭😭 Server Problem.  please try again`
                spinnerToggle("none");
            }


        })
}

// search mobile load api 
const mobileApiLoad = (inputData) => {
    fetchData(`phones?search=${inputData}`, mobileDataDisplay);
}

// search button and input field  event handel add 
const searchBtn = () => {
    // sinner display show
    spinnerToggle("flex");
    // search result display hide
    displayDataToggle('none');

    const inputField = document.getElementById('search-input');
    const inputValue = inputField.value;
    if (inputValue == "") {
        document.getElementById('items-number').innerText = `OOps!! 😭😭 Please input any Mobile name or Model...`;
        // sinner display none
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
        div.innerHTML += `
        <div class="card border-0 shadow rounded h-100">
             <img src="${mobile?.image?mobile?.image:'img/mobile.jpg'}" class="card-img-top px-4 pt-4" height="" alt="${mobile?.phone_name?mobile?.phone_name:'Not Found'}">
                <div class="card-body text-center my-3">
                  <h3 class="card-title">${mobile?.phone_name?mobile?.phone_name:'Not Found'}</h3>
                    <p>Brand: <em> ${mobile?.brand?mobile?.brand:'Not Found'}</em></p>
                    <a class="btn btn-warning rounded-0 text-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="singleItemClick('${mobile?.slug}')">About More </a>
             </div>
            </div>
        `
        displayItems.appendChild(div);
        // spinner display hide
        spinnerToggle("none");
        // search result display show
        displayDataToggle('flex');
    })
}


// spinner page toggler add
const spinnerToggle = (displayStyle) => {
        document.getElementById('spinner').style.display = displayStyle;
    }
    //search result toggle and previous data clear
const displayDataToggle = (displayStyle) => {
        document.getElementById('display-items').style.display = displayStyle;
    }
    // single page data toggle 
const singlePageDataClear = (displayStyle) => {
    document.getElementById('single-view').style.display = displayStyle;

}


// single item api load
const singleItem = (mobileId) => {
    fetchData(`phone/${mobileId}`, showSingleItem);
}


// single item show display

const singleItemClick = (singleData) => {
        //single data display hide
        singlePageDataClear('none');
        //spinner data display show
        spinnerToggle("flex");
        // single data load
        singleItem(singleData)
    }
    // data .data convert a function


// show single in modals
const showSingleItem = (data) => {
    // console.log(data)
    const singleItem = document.getElementById('single-view');
    // empty single Item
    singleItem.textContent = '';
    // singleItem inner html set
    singleItem.innerHTML = `
    <div class="modal-content">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn-close m-3" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="card border-0 rounded-0 py-4">
                        <div class="row align-items-center">
                            <div class="col-md-6">
                                <img src="${data?.data?.image?data?.data?.image:'img/mobile.jpg'} " class="card-img-top px-5 py-3 img-fluid" height="" alt="${data?.data?.name?data?.data?.name:'no found'}">
                            </div>
                            <div class="col-md-6">
                                <ul class="list-group list-group-flush">
                                    <h2 class="card-title fw-bold  mx-3">${data?.data?.name?data?.data?.name:'no found'}</h2>
                                    <li class="list-group-item">${data.data.releaseDate?data?.data?.releaseDate:'Released ....'}</li>
                                    <li class="list-group-item"><strong>Brand : </strong> ${data?.data?.brand?data?.data?.brand:'no found'}</li>                                   
                                    <li class="list-group-item"><strong>DisplaySize : </strong> ${data?.data?.mainFeatures?.displaySize?data?.data?.mainFeatures?.displaySize:'no found'}</li>   
                                    <li class="list-group-item border-bottom"><strong>Memory : </strong> ${data?.data?.mainFeatures.memory?data?.data?.mainFeatures?.memory:'no found'}</li>        
                                </ul>
                            </div>
                        </div>
                        <h3 class="mx-3 fw-bold">More Details: </h3>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>ChipSet : </strong> ${data?.data?.mainFeatures?.chipSet?data?.data?.mainFeatures?.chipSet:'no found'}</li>  
                        <li class="list-group-item"><strong>Storage : </strong> ${data?.data?.mainFeatures?.storage?data?.data?.mainFeatures?.storage:'no found'}</li> 
                        <li class="list-group-item"><strong>Sensors : </strong> ${data?.data?.mainFeatures?.sensors?data?.data?.mainFeatures?.sensors:'no found'}</li> 
                        <li class="list-group-item"><strong>Bluetooth : </strong> ${data?.data?.others?.Bluetooth?data.data?.others?.Bluetooth:'no found'}</li> 
                        <li class="list-group-item"><strong>GPS : </strong> ${data?.data?.others?.GPS?data?.data?.others?.GPS:'not Found'}</li> 
                        <li class="list-group-item"><strong>NFC : </strong> ${data?.data?.others?.NFC?data?.data?.others?.NFC:'not Found'}</li> 
                        <li class="list-group-item"><strong>Radio: </strong> ${data?.data?.others?.Radio?data?.data?.others?.Radio:'not Found'}</li> 
                        <li class="list-group-item"><strong>USB: </strong> ${data?.data?.others?.USB?data?.data?.others?.USB:'not Found'}</li> 
                        <li class="list-group-item"><strong>USB: </strong> ${data?.data?.others?.WLAN?data?.data?.others?.WLAN:'not Found'}</li> 
                        </ul>
                    </div>
                </div>
            `
        // spinner data display hide
    spinnerToggle("none");
    // spinner data display show
    singlePageDataClear('block');
}


// page reload home click

const pageReload = () => {
    location.reload();
}