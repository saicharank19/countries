let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");
let url = "https://apis.ccbp.in/countries-data";
 
let countriesList = [];

function getTheCountryDetails() {
    let options = {
        method: "GET"
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            countriesList = jsonData;
        });
}

function displayResultCountries(country) {
    let {
        name,
        flag,
        population
    } = country;

    let countryCard = document.createElement("div");
    countryCard.classList.add("country-card", "col-12", "col-md-6", "d-flex", "flex-row");
    resultCountriesEl.appendChild(countryCard);

    let countryFlag = document.createElement("img");
    countryFlag.src = flag;
    countryFlag.classList.add("country-flag");
    countryCard.appendChild(countryFlag);

    let countryTexContainer = document.createElement("div");
    countryTexContainer.classList.add("pl-3");
    countryCard.appendChild(countryTexContainer);

    let countryName = document.createElement("h1");
    countryName.textContent = name;
    countryName.classList.add("country-name");
    countryTexContainer.appendChild(countryName);

    let countryPopulation = document.createElement("p");
    countryPopulation.textContent = population;
    countryPopulation.classList.add("country-population");
    countryTexContainer.appendChild(countryPopulation);
}

function getTheInput(event) {
    let searchedCountry = event.target.value;
    spinnerEl.classList.remove('d-none');
    spinnerEl.classList.add('d-none');
    resultCountriesEl.textContent = "";
    for (let country of countriesList) {
        let name = country.name;
        if (name.toLowerCase().includes(searchedCountry.toLowerCase())) {
            displayResultCountries(country);
        }
    }
}
getTheCountryDetails();
searchInputEl.addEventListener("keyup", getTheInput);