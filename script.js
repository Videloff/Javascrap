const searchMovieName = document.getElementById('submit')

searchMovieName.addEventListener('click',(e) => {
  e.preventDefault();
  const paragraphs = document.querySelectorAll('.deletable');
  for(let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].remove();
  }
  const movie = document.getElementById('default-search').value;
  const getMovie = async () => {
    try{
      const response = await fetch(`http://www.omdbapi.com/?s=${movie}&apikey=10ba61c0`);
      const movieSearch = await response.json();
      const container = document.body.appendChild(document.createElement("div"));
      container.setAttribute('id', 'containerId');
      container.classList.add('deletable', 'flex', 'flex-col', 'items-center');
      for (let i = 0; i < movieSearch.Search.length; i++) {
        try {
          const movieId = await fetch(`http://www.omdbapi.com/?i=${movieSearch.Search[i].imdbID}&apikey=10ba61c0`);
          const movieIdSearch = await movieId.json();
          const div = document.getElementById('containerId').appendChild(document.createElement("div"));
          div.classList.add('deletable');
          const addMovieElement = (div, title, image, date, plot) => {
            div.innerHTML = `
            <div class="m-auto">
              <div class = "max-w-xl rounded-lg shadow-md lg:flex md:flex shadow-sky-600 mt-10 bg-white">
                <img class="object-cover w-full md:w-1/2 lg:w-1/3" src="${image}" alt="image">
                <div class="px-6 py-4">
                  <h4 class="mb-3 text-base font-semibold tracking-tight text-sky-600">
                    ${title}
                  </h4>
                  <p class="mb-2 text-sm leading-normal text-justify text-sky-900">
                    ${date}
                  </p>
                  <button id="myBtn${i}" class="text-white right-2.5 bottom-2.5 bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Voir plus
                  </button>
                </div>
              </div>
            </div>
            <div id="myModal${i}" class="modal">
              <div class="modal-content">
                <span class="close">&times;</span>
                <div class="m-auto">
                  <div class = "max-w-xl rounded-lg shadow-md lg:flex md:flex shadow-sky-600 mt-10 bg-white">
                    <img class="object-cover w-full md:w-1/2 lg:w-1/3" src="${image}" alt="image">
                    <div class="px-6 py-4">
                      <h4 class="mb-3 text-base font-semibold tracking-tight text-sky-600">
                        ${title}
                      </h4>
                      <p class="mb-2 text-sm leading-normal text-justify text-sky-900">
                        ${date}
                      </p>
                      <p>
                        ${plot}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `
            const modal = document.getElementById(`myModal${i}`);
            const btn = document.getElementById(`myBtn${i}`);
            const span = document.getElementsByClassName("close")[i];
            console.log(span);
            btn.onclick = function() {
              modal.style.display = "block";
            }
            span.onclick = function(e) {
              modal.style.display = "none";
            }
            window.onclick = function(e) {
              if (e.target == modal) {
              modal.style.display = "none";
              }
            }
          }
          addMovieElement(div, movieIdSearch.Title, movieIdSearch.Poster, movieIdSearch.Released, movieIdSearch.Plot);
        } catch(error) {
          console.error('Response error', error.message);
        }
      } 
    } catch(error) {
    console.error('Response error', error.message);
    }
  }
  getMovie();
});