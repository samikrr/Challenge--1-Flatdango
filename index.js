const url = "http://localhost:3000/films";

function fetchfilms(){
    fetch(url)
    .then(resp => resp.json())
    .then(films =>displayMovieList(films))
}

function displayMovieList(films){
    const movieList =document.querySelector('.movie-list');
    films.forEach(film => {
        const list =document.createElement('li');
        list.textContent = film.title;
        movieList.appendChild(list);

        //display first movie when the page loads
        if(film === films[0]){
            displayMovieDetails(film)
        }
        list.addEventListener('click', () =>{
            displayMovieDetails(film)
        });
    });
}
function displayMovieDetails(film){
    const moviePoster = document.getElementById('image');
    moviePoster.src = film.poster

    const h3 = document.querySelector('.title');
    h3.textContent = film.title

    const p = document.querySelector('.description');
    p.textContent = film.description

    const l1 = document.getElementById('l1');
    l1.textContent = `Runtime:${film.runtime}`

    const l2 = document.getElementById('l2');
    l2.textContent = `Showtime:${film.showtime}`

    let availabeTickets = film.capacity - film.tickets_sold;
    const l3 = document.getElementById('l3');
    l3.textContent = `Available Tickets:${availabeTickets}`

    const btn = document.getElementById('btn');
    btn.textContent = 'Buy Ticket'

    btn.addEventListener('click', (e) =>{
        if(availabeTickets > 0){
            availabeTickets--;
            l3.textContent = `Available Tickets:${availabeTickets}`
            btn.textContent = 'Buy Ticket'
        }
        else{
            btn.textContent = 'Sold Out'
        }
    })
}
document.addEventListener('DOMContentLoaded', () =>{
    fetchfilms();
});