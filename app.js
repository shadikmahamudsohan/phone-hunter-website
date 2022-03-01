// spinner id
const spinner = document.getElementById('spinner');
// card container id
const cardContainer = document.getElementById('card-container');


// arrow function for loading data from api
const loadProductData = () => {
    const input = document.getElementById("search-input");
    const inputValue = input.value;
    const inputValueLowerCase = inputValue.toLowerCase();
    // clearing input
    input.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValueLowerCase}`;
    // adding spinner when searching
    spinner.classList.remove('d-none');
    // clearing card container when searching
    cardContainer.textContent = "";
    // fetching the url
    fetch(url)
        .then(res => res.json())
        .then(data => displayProductCard(data))

}

// arrow function for displaying data inside html
const displayProductCard = (data) => {
    const cardDetails = document.getElementById('card-details');
    const inputError = document.getElementById('input-error')

    // removing spinner when data is loaded
    spinner.classList.add('d-none');

    // clearing cards and card details
    cardDetails.textContent = "";

    // condition for wrong input
    if (data.status == false) {
        inputError.classList.remove('d-none');
    } else {
        inputError.classList.add('d-none');
        const products = data.data.slice(0, 20);

        products.forEach(product => {
            const div = document.createElement('div');
            div.className = "col-lg-4";

            // showing cards
            div.innerHTML = `
                    <div class="card h-100 shadow">
                        <img src="${product.image}"
                            class="card-img-top p-4 img-fluid" alt="image">
                        <div class="card-body">
                            <h2 class="card-title">${product.phone_name}</h2>
                            <h4>Brand: ${product.brand}</h4>
                            <p class="card-text"></p>
                            <button onclick="loadCardDetail('${product.slug}')" class="btn btn-primary px-4 py-2">Details</button>
                        </div>
                    </div>
        `
            cardContainer.appendChild(div)
        })
    }
}

// arrow function for loading details
const loadCardDetail = (id) => {
    // add spinner when data is loading
    spinner.classList.remove('d-none')
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    // fetching detail api
    fetch(url)
        .then(res => res.json())
        .then(data => displayCardDetail(data))
}

// arrow function for displaying details
const displayCardDetail = (data) => {
    // removing spinner when data is loaded
    spinner.classList.add('d-none');
    const productDetail = data.data;
    const cardDetails = document.getElementById('card-details');
    const mainFeatures = Object.entries(productDetail.mainFeatures);
    const otherFeatures = Object.entries(productDetail.others ? productDetail.others : ['Not available']);

    // showing card details
    cardDetails.innerHTML = `
            <div  class="row p-5 bg-white shadow my-5">
                <div class="col-lg-6">
                    <img src="${productDetail.image}"
                        class="img-fluid w-100 rounded" alt="">
                </div>
                <div class="col-lg-6 border-start border-dark border-3">
                    <h1>${productDetail.name}</h1>
                    <h4>Brand: ${productDetail.brand}</h4>
                    <p class="text-danger">${productDetail.releaseDate ? productDetail.releaseDate : 'No release date found'}</p>
                    <h4 class="mt-4"><u>Main features</u></h4>
                    <p id="features"></p>
                    <p id="sensors"></p>
                    <h4 class="mt-4"><u>Other features</u></h4>
                    <p id="other-features"></p>
                </div>
            </div>
    `
    // adding features inside card details
    const mainFeaturesId = document.getElementById('features');
    const sensorsId = document.getElementById('sensors');
    // looping trough all the main features
    mainFeatures.forEach(feature => {
        const p = document.createElement('p')
        p.innerHTML = `<strong>${feature[0]}:</strong> ${feature[1]}.`;
        // displaying sensor details
        if (Array.isArray(feature[1])) {
            sensorsId.innerHTML = `<strong>${feature[0]}: </strong>`;
            for (const sensors of feature[1]) {
                const span = document.createElement('span');
                span.innerHTML = `${sensors}. `;
                sensorsId.appendChild(span);
            }
        } else {
            mainFeaturesId.appendChild(p);
        }
    })
    // adding other features inside card details
    const otherFeaturesId = document.getElementById('other-features');

    // looping trough all the other features
    otherFeatures.forEach(feature => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${feature[0]}:</strong> ${feature[1]}.`;
        otherFeaturesId.appendChild(p);
    })
}