// Create the div element for the "Welcome" message
const welcomeDiv = document.createElement("div");
welcomeDiv.className = "welcome";
welcomeDiv.innerHTML = "<h1 class='display-4 text-center'>Welcome to the world of Pokemon</h1>";

// Create the div element for the "Pokemon" container
const pokemonDiv = document.createElement("div");
pokemonDiv.id = "pokemon-container";
pokemonDiv.style.backgroundImage = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnc3vWCz1lVj1sPxbTAj6SDkFyFDjTJK3nZw&usqp=CAU)";

// Create the div element for the "Pagination" container
const paginationDiv = document.createElement("div");
paginationDiv.id = "pagination-container";

// Add the elements to the DOM
document.body.appendChild(welcomeDiv);
document.body.appendChild(pokemonDiv);
document.body.appendChild(paginationDiv);


// Set the base URL for the PokeAPI and the maximum number of Pokemon to retrieve in one call
const BASE_URL = "https://pokeapi.co/api/v2";
const LIMIT = 50;

// Retrieve a list of Pokemon from the PokeAPI, starting at the specified offset
async function getPokemonList(offset) {
	try {
		// Send a request to the PokeAPI to retrieve the list of Pokemon
		const response = await fetch(`${BASE_URL}/pokemon?limit=${LIMIT}&offset=${offset}`);
		// Parse the response data as JSON
		const data = await response.json();
		// Return an array of Pokemon objects, each with a name and a URL
        return data.results;
	} catch (error) {
		// console.log(error);
	}
}

// Retrieve the details of a single Pokemon from the PokeAPI, given its URL
async function getPokemonDetails(pokemonUrl) {
	try {
		// Send a request to the PokeAPI to retrieve the Pokemon details
		const response = await fetch(pokemonUrl);
		// Parse the response data as JSON
		const data = await response.json();
		// Log the Pokemon details to the console
        // console.log(data);
		// Return the Pokemon details as an object
		return data;
	} catch (error) {
		// console.log(error);
	}
}

// Get references to the search button and input fields in the HTML document
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

// Display a list of Pokemon on the web page
function displayPokemonList(pokemonList) {
	// Get a reference to the div element that will hold the Pokemon cards
	const pokemonContainer = document.getElementById("pokemon-container");
	// Clear any existing contents of the Pokemon container
	pokemonContainer.innerHTML = "";
	// Loop through each Pokemon in the list and retrieve its details
	pokemonList.forEach(async (pokemon) => {
		const pokemonDetails = await getPokemonDetails(pokemon.url);
		// Create a new div element to hold the Pokemon card
		const pokemonDiv = document.createElement("div");
		// Add the "pokemon-card" class to the div element
		pokemonDiv.classList.add("pokemon-card");
		// Set the inner HTML of the div element to display the Pokemon details
		pokemonDiv.innerHTML = `
			<div class="pokemon-img-container">
            <img src="${pokemonDetails.sprites.other["official-artwork"].front_default}" alt="${pokemonDetails.name}" crossorigin="anonymous" class="card-img-top">
			</div>
			<div class="pokemon-info-container">
				<h2 class="pokemon-name card-title">${pokemonDetails.name}</h2>
				<p class="card-text"><strong>Abilities:</strong> ${pokemonDetails.abilities.map((ability) => ability.ability.name).join(", ")}</p>
				<p class="card-text"><strong>Moves:</strong> ${pokemonDetails.moves.map((move) => move.move.name).join(", ")}</p>
				<p class="card-text"><strong>Weight:</strong> ${pokemonDetails.weight}</p>
			</div>
		`;
		// Add the Pokemon card to the Pokemon container
		pokemonContainer.appendChild(pokemonDiv);
	});
}

 // This function creates pagination buttons and attaches click event listener to each button
function displayPaginationButtons() {
    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";
    // Loop through 20 pages and create a button for each page
    for (let i = 0; i < 20; i++) {
      const button = document.createElement("button");
      // Set the button text to the page number
      button.innerText = i + 1;
      // Attach click event listener to each button
      button.addEventListener("click", () => {
        // Call getPokemonList function to fetch next set of pokemon data
        getPokemonList(i * LIMIT).then((pokemonList) => {
          // Display the fetched pokemon list
          displayPokemonList(pokemonList);
        });
      });
      // Append the button to the pagination container
      paginationContainer.appendChild(button);
    }
  }
  
  // Fetch the initial pokemon list and display it
  getPokemonList(0).then((pokemonList) => {
    displayPokemonList(pokemonList);
    // Create the pagination buttons
    displayPaginationButtons();
  });
  