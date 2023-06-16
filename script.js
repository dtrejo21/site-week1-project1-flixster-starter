//b97a9f4a55b95a38ab30d4c360a13786

const moviesGrid = document.getElementById("movies-grid");//required id
//const submitBtn = document.getElementById("submit");

const loadMoreMoviesBtn = document.getElementById("load-more-movies-btn"); //required id
var page = 1;

const searchInput = document.getElementById("search-input")//required id
const closeSearchInput = document.getElementById("close-search-btn");


const apiKey = "b97a9f4a55b95a38ab30d4c360a13786";
const url = "https://api.themoviedb.org/3/";
const imageURL = "https://image.tmdb.org/t/p/w500/";

//wrapper element??? IDK
//https://image.tmdb.org/t/p/w500/

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
    const endpoint = `${url}movie/now_playing?api_key=${apiKey}`;
    const playingNow = await fetchMovies(endpoint);

    playingNow.forEach(movie => {
        //create our template to display within a grid
        const movieLayout = document.createElement("div");
        movieLayout.classList.add("movie");

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

        const title = document.createElement("h2");
        title.classList.add("title");
        title.textContent = movie.title;
        title.id = "movie-title";
        movieLayout.appendChild(title);

        const votes = document.createElement("p");
        votes.classList.add("votes");
        votes.textContent = `${movie.vote_average}`;
        votes.id = "movie-votes";
        movieLayout.appendChild(votes);

        moviesGrid.append(movieLayout);//A template will then be added to the grid
    });
}

//search will just have the inside thing we did
moviesPlayingNow();
//Display Flex, way leo would do it

loadMoreMoviesBtn.addEventListener("click", async (event) =>{
    event.preventDefault();//prevent form submission
    page++;

    try{//parameters use [&]! not [?]
        const newURL = `${url}movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
        const response = await fetch(newURL);
        const data = await response.json();
        const moreMovies = data.results;
        //console.log(moreMovies);

        moreMovies.forEach(movie => {
            //create our template to display within a grid
            const movieLayout = document.createElement("div");
            movieLayout.classList.add("movie");
    
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
    
            const title = document.createElement("h2");
            title.classList.add("title");
            title.textContent = movie.title;
            title.id = "movie-title";
            movieLayout.appendChild(title);
    
            const votes = document.createElement("p");
            votes.classList.add("votes");
            votes.textContent = `${movie.vote_average}`;
            votes.id = "movie-votes";
            movieLayout.appendChild(votes);
    
            moviesGrid.append(movieLayout);//A template will then be added to the grid
        });
        
    }catch (error) {
        console.log("error")
    }

});

//async function searchInput(){


//}