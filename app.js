const loadPhoneData = () => {
    const input = document.getElementById("search-input");
    const inputValue = input.value;
    const inputValueLowerCase = inputValue.toLowerCase();
    // clearing input
    input.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValueLowerCase}`
    // fetching the url
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhonCard(data))

}

const displayPhonCard = (data) => {
    const inputError = document.getElementById('input-error')
    if (data.status == false) {
        inputError.classList.remove('d-none')
    } else {
        inputError.classList.add('d-none')
        const products = data.data.slice(0, 20);
        const cardContainer = document.getElementById('card-container')
        cardContainer.textContent = "";
        products.forEach(product => {
            const div = document.createElement('div');
            div.className = "col-lg-4 co-sm-12"
            div.innerHTML = `
                    <div class="card h-100">
                        <img src="${product.image}"
                            class="card-img-top p-4 img-fluid" alt="image">
                        <div class="card-body">
                            <h4 class="card-title">${product.phone_name}</h4>
                            <p class="card-text"></p>
                            <button onclick="loadCardDetail('${product.slug}')" class="btn btn-primary px-4 py-2">Details</button>
                        </div>
                    </div>
        `
            cardContainer.appendChild(div)
        })
    }
}

const loadCardDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    // fetching detail api
    fetch(url)
        .then(res => res.json())
        .then(data => displayCardDetail(data))
}

const displayCardDetail = (data) => {
    const productDetail = data.data;
    const cardDetails = document.getElementById('card-details');
    const mainFeatures = Object.entries(productDetail.mainFeatures);

    cardDetails.textContent = "";
    cardDetails.innerHTML = `
            <div  class="row p-5 bg-white shadow my-5">
                <div class="col-lg-6 col-sm-12">
                    <img src="${productDetail.image}"
                        class="img-fluid w-100 rounded" alt="">
                </div>
                <div class="col-lg-6 col-sm-12 border-start border-dark border-3 p-5">
                    <h1>${productDetail.name}</h1>
                    <p class="text-danger">${productDetail.releaseDate ? productDetail.releaseDate : 'not available'}</p>
                    <h5>Main features</h5>
                    <ul id="features"></ul>
                </div>
            </div>
                
    `

    // console.log(productDetail);
}