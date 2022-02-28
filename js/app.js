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
        }).catch(error => console.log(error))
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
    const displayItems = document.getElementById('display-items');
    displayItems.textContent = '';
    data.data.slice(0, 20).forEach((mobile, index) => {
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
        <div class="card h-100">
             <img src="img/mobile.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.</p>
             </div>
            </div>
        `
        displayItems.appendChild(div)
    })
}