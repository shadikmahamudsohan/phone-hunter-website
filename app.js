const loadPhoneCards = () => {
    const inputValue = document.getElementById("search-input").value;
    const inputValueLowerCase = inputValue.toLowerCase();
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValueLowerCase}`

    // fetching the url
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data))
}
