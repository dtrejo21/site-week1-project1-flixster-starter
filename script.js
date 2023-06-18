//b97a9f4a55b95a38ab30d4c360a13786
const moviesGrid = document.getElementById("movies-grid");//required id
const loadMoreMoviesBtn = document.getElementById("load-more-movies-btn"); //required id
const searchInput = document.getElementById("search-input")//required id
const closeSearch = document.getElementById("closeSearchBtn");

searchInput.addEventListener("keyup", searchMovie);
closeSearch.addEventListener("click", moviesPlayingNow);
var page = 1;

const apiKey = "b97a9f4a55b95a38ab30d4c360a13786";
const url = "https://api.themoviedb.org/3/";
const imageURL = "https://image.tmdb.org/t/p/w500/";

//Fetch movies from the endpoint & return endpoint if promises are kept
async function fetchMovies(endpoint){
    try{
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.results;//data is an array
        
    }catch(error){
        console.log("error");
    }

}

//this function will create a title, image, votes, template layout & grid element
//Title, image & votes will be given a source, ID, class & appended to grid
async function moviesPlayingNow(){
    loadMoreMoviesBtn.classList.remove("hidden");
    searchInput.value = "";////

    const endpoint = `${url}movie/now_playing?api_key=${apiKey}`;
    const playingNow = await fetchMovies(endpoint);
    moviesGrid.innerHTML = "";
    closeSearch.classList.add("hidden");

    playingNow.forEach(movie => {
        //create our template to display within a grid
        const movieLayout = document.createElement("div");
        movieLayout.classList.add("movie-card");

        const image = document.createElement("img");
        image.classList.add("image");
        image.src = imageURL + movie.poster_path;/////////////////////////////
        image.id = "movie-poster";
        movieLayout.appendChild(image);

        const title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = movie.title;
        title.id = "movie-title";
        movieLayout.appendChild(title);

        const votes = document.createElement("p");
        votes.classList.add("votes");
        votes.textContent = `⭐ ${movie.vote_average}/10`;
        votes.id = "movie-votes";
        movieLayout.appendChild(votes);

        moviesGrid.append(movieLayout);//A template will then be added to the grid
    });
}
//search will just have the inside thing we did
moviesPlayingNow();

//Will display new movies user searches & display the close button
async function searchMovie(event){
    if(event.key == "Enter"){
        const query = event.target.value;
        if(query == "")
        {
            return 0;
        }
    
    const movieLayout = document.getElementById("movies-grid");
    /*If searched for new movies, remove the add more movies button */
    closeSearch.classList.remove("hidden");
    loadMoreMoviesBtn.classList.add("hidden");

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
        .then((response) => response.json())
        .then(async (data) => {
            moviesGrid.innerHTML = "";
            const movies = data.results;

            for(const movie of movies){
                //create our template to display within a grid
                const movieLayout = document.createElement("div");
                movieLayout.classList.add("movie-card");
                movieLayout.id = movie.id;

                const image = document.createElement("img");
                image.classList.add("image");
                if(movie.poster_path == null)
                {
                    image.src = "";
                }
                else
                {
                    image.src = imageURL + movie.poster_path;
                }
                image.id = "movie-poster";
                movieLayout.appendChild(image);

                const title = document.createElement("h3");
                title.classList.add("title");
                title.textContent = movie.title;
                title.id = "movie-title";
                movieLayout.appendChild(title);

                const votes = document.createElement("p");
                votes.classList.add("votes");
                votes.textContent = `⭐ ${movie.vote_average}/10`;
                votes.id = "movie-votes";
                movieLayout.appendChild(votes);

                moviesGrid.append(movieLayout);//A template will then be added to the grid
            }
        })
        .catch((error) => {
            console.log("error");
        });
    }
}

loadMoreMoviesBtn.addEventListener("click", async (event) =>{
    event.preventDefault();//prevent form submission
    page++;

    try{//parameters use [&]! not [?]
        const newURL = `${url}movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
        const response = await fetch(newURL);
        const data = await response.json();
        const moreMovies = data.results;

        moreMovies.forEach(movie => {
            //create our template to display within a grid
            const movieLayout = document.createElement("div");
            movieLayout.classList.add("movie-card");
    
            const image = document.createElement("img");
            image.classList.add("image");
            if(movie.poster_path == null){
                image.src = "";
            }
            else{
                image.src = imageURL + movie.poster_path;
            }
            
            image.id = "movie-poster";
            movieLayout.appendChild(image);
    
            const title = document.createElement("h3");
            title.classList.add("title");
            title.textContent = movie.title;
            title.id = "movie-title";
            movieLayout.appendChild(title);
    
            const votes = document.createElement("p");
            votes.classList.add("votes");
            votes.textContent = `⭐ ${movie.vote_average}/10`;
            votes.id = "movie-votes";
            movieLayout.appendChild(votes);
    
            moviesGrid.append(movieLayout);//A template will then be added to the grid
        });
        
    }catch (error) {
        console.log("error")
    }

});