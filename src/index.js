// Function to update the remaining tickets in the HTML
function updateRemainingTickets(remainingTickets) {
    const ticketNumElement = document.getElementById("ticket-num");
    ticketNumElement.textContent = `${remainingTickets}`;
}

// Function to handle the "Buy Ticket" button click
function handleBuyTicket() {
    const ticketNumElement = document.getElementById("ticket-num");
    let remainingTickets = parseInt(ticketNumElement.textContent);
    // Reduce the remaining tickets by 1 if there are tickets available
    if (remainingTickets > 0) {
        remainingTickets--;
        updateRemainingTickets(remainingTickets);
    }
    // Disable the button and display a message if tickets have run out
    if (remainingTickets <= 0) {
        const buyTicketButton = document.getElementById("buy-ticket");
        buyTicketButton.disabled = true;
        buyTicketButton.textContent = "Sold Out! NEXT TIME BUY EARLY!";
    }
}

// Function to change the poster image based on the selected movie
function changePoster(posterUrl) {
    const posterImg = document.getElementById("poster");
    posterImg.src = posterUrl;
}

// Function to update the movie title in the HTML
function updateMovieTitle(title) {
    const titleElement = document.getElementById("title");
    titleElement.textContent = title;
}

// Function to update the movie description in the HTML
function updateMovieDescription(description) {
    const filmInfoElement = document.getElementById("film-info");
    filmInfoElement.textContent = description;
}

// Function to update the showtime in the HTML
function updateShowtime(showtime) {
    const showtimeElement = document.getElementById("showtime");
    showtimeElement.textContent = showtime;
}

// Function to update the runtime in the HTML
function updateRuntime(runtime) {
    const runtimeElement = document.getElementById("runtime");
    runtimeElement.textContent = `${runtime} minutes`;
}

// Function to populate the list of movie titles
function displayMovieTitles() {
    // Fetching movie data from the API
    fetch("http://localhost:3000/films")
        .then(response => response.json())
        .then(data => {
            // The map method iterates over each movie object in the data array and extracts the title property in all of them.
            const titles = data.map(movie => movie.title);
            // Getting the <ul> element to populate
            const filmsList = document.getElementById("films");
            // Clearing previous content
            filmsList.innerHTML = "";
            // Iterating through each movie to create <li> elements
            data.forEach(movie => {
                const li = document.createElement("li");
                // Getting the list and assigning it a classname
                li.className = "film item";
                li.textContent = movie.title;
                // Add event listener to each movie title for changing the poster
                li.addEventListener('click', () => {
                    changePoster(movie.poster);
                });
                // Add a new event listener to each movie title for updating the movie title
                li.addEventListener('click', () => {
                    updateMovieTitle(movie.title);
                });
                // Add a new event listener to each movie title for updating the movie description
                li.addEventListener('click', () => {
                    updateMovieDescription(movie.description);
                });
                // Add a new event listener to each movie title for updating the showtime
                li.addEventListener('click', () => {
                    updateShowtime(movie.showtime);
                });
                // Add a new event listener to each movie title for updating the runtime
                li.addEventListener('click', () => {
                    updateRuntime(movie.runtime);
                });
                // Add a new event listener to each movie title for updating the remaining tickets
                li.addEventListener('click', () => {
                    updateRemainingTickets(movie.tickets_sold);
                });

                // Creating delete button
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.style.backgroundColor = "red";
                deleteButton.style.marginLeft = "10px"; // Adding margin for spacing
                deleteButton.addEventListener('click', () => {
                    li.remove();
                });
                // Appending delete button to li
                li.appendChild(deleteButton);

                // Appending li to filmsList
                filmsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
        });
}

// Add event listener to the "Buy Ticket" button
const buyTicketButton = document.getElementById("buy-ticket");
buyTicketButton.addEventListener("click", handleBuyTicket);

// Call the function to fetch and display movie titles
displayMovieTitles();
