const movieName = document.getElementById("submit");

movieName.addEventListener('click', function(event) {
  event.preventDefault();

  const movie = document.getElementById("default-search").value;
  console.log(movie);

  const getMovie = async () => {
    const response = await fetch(`http://www.omdbapi.com/?s=${movie}&apikey=10ba61c0`);
    const movieSearch = await response.json();
    console.log(movieSearch);
    console.log(response);
  }

  getMovie();
})