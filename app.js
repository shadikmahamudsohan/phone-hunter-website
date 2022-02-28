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
        const phones = data.data.slice(0, 20);
        const cardContainer = document.getElementById('card-container')
        cardContainer.textContent = "";
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.className = "col-lg-4 co-sm-12"
            div.innerHTML = `
                    <div class="card h-100">
                        <img src="${phone.image}"
                            class="card-img-top p-4 img-fluid" alt="image">
                        <div class="card-body">
                            <h4 class="card-title">${phone.phone_name}</h4>
                            <p class="card-text"></p>
                            <button class="btn btn-primary px-4 py-2">Details</button>
                        </div>
                    </div>
        `
            cardContainer.appendChild(div)
        })
        // console.log(phones);
    }


}