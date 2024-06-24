let api_key = "bb3b6afb809e95e7ed52ec5081c1b1f0";
let urlAPI = "https://api.themoviedb.org/3/search/movie";
let urlImg = "https://image.tmdb.org/t/p/w200";
let resultContainer = document.getElementById("results");

const searchMovies = () => {
  let searchInput = document.getElementById("searchInput").value;
  // Url de la api, api_key y selector que va a ser igual al valor del input texto que vamos a usar para buscar las peliculas
  resultContainer.innerHTML = "Cargando...";
  fetch(`${urlAPI}?api_key=${api_key}&query=${searchInput}`)
    .then((response) => response.json())
    // Para la respuesta de la promesa usamos funcion que creamos para mostrar las peliculas y le pasamos como argumento la respuesta de la busqueda
    // Dentro del objeto accedemos a los valores de la clave results
    .then((response) => displayMovies(response.results));
};
const displayMovies = (movies) => {
  // Vaciamos el contenido en caso de que contenga algo
  resultContainer.innerHTML = "";
  // Si movies.length es igual a 0, es decir que no se encontró la pelicula
  if (movies.length === 0) {
    // Mostramos un mensaje que diga que no hubo resultados
    resultContainer.innerHTML = `<p> No se encontraron resultados para tu busqueda </p>`;
    // Cortamos la ejecucion
    return;
  }
  // Recorremos cada pelicula que tengamos como resultado
  movies.forEach((movie) => {
    // Creamos un div para cada pelicula
    let movieDiv = document.createElement("div");
    // Le damos la clase movie
    movieDiv.classList.add("movie");
    // Creamos un h2 para mostrar el titulo de la pelicula
    let title = document.createElement("h2");
    // Le damos como contenido el titulo de la pelicula
    title.textContent = movie.title;
    // Creamos un p para mostrar la fecha de estreno
    let releaseDate = document.createElement("p");
    // Le damos el contenido de la clave release_date que nos trae dentro del .results
    releaseDate.textContent = `La fecha de lanzamiento fue: ${movie.release_date}`;
    // Descripcion de la pelicula
    let overview = document.createElement("p");
    overview.textContent = movie.overview;
    // Imagen de portada
    // Creamos una variable que almacene la ubicacion del poster
    let poster_path = urlImg + movie.poster_path;
    let poster = document.createElement("img");
    // Le pasamos como source la ubicacion del poster
    poster.src = poster_path;
    // Agregamos dentro del div de cada pelicula su contenido
    let infoContainer = document.createElement("div");
    infoContainer.style.display = "flex";
    infoContainer.style.flexDirection = "column";
    infoContainer.style.alignItems = "center";
    infoContainer.style.textAlign = "left";
    infoContainer.appendChild(title);
    infoContainer.appendChild(releaseDate);
    infoContainer.appendChild(overview);
    movieDiv.appendChild(poster);
    movieDiv.appendChild(infoContainer);
    // Agregamos dentro del contenedor de resultados los contenedor de cada pelicula
    resultContainer.append(movieDiv);
  });
};

document.getElementById("searchButton").addEventListener("click", searchMovies);
