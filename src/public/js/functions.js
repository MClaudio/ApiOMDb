
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.indexOf("movie/") === -1) {
        const fecha = new Date()
        const anio = fecha.getFullYear()
        const url = "http://www.omdbapi.com/?apikey=a784252&s=" + anio;
        listmovies(url);
    } else {
        const link = window.location.pathname
        const id = link.substring(7, link.length);
        const url = "http://www.omdbapi.com/?apikey=a784252&i=" + id;
        movieSearch(url)
    }

    const searchForm = document.querySelector("#form-search")
    searchForm.addEventListener('submit', search)
})

function search(e) {
    e.preventDefault();
    const text = document.querySelector("#form-search input[type=search]")
    url = "http://www.omdbapi.com/?apikey=a784252&s=" + text.value;
    listmovies(url);
}


function listmovies(url) {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest()
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText)
            let HTML = ''
            response.Search.forEach(movie => {
                HTML += `
                <div class="col mb-3">
                <div class="card" style="width: 18rem;">
                    <img src="${movie.Poster}" class="card-img-top" alt="..">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">${movie.Year}</p>
                        <a href="/movie/${movie.imdbID}" class="btn btn-primary">Detalle</a>
                    </div>
                </div>
            </div>
                `
            });
            document.querySelector('#content-movies').innerHTML = HTML
        } else {
            document.querySelector('#content-movies').innerHTML = "<h2>No existe la pelicula.</h2>"
        }
    };
    xmlhttp.open("GET", url, true)
    xmlhttp.send()
}

function movieSearch(url) {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest()
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const movie = JSON.parse(this.responseText)
            var HTML = '';
            if (movie.Title) {
                HTML = `
                <div class="col">
                <img src="${movie.Poster}" alt="...">
            </div>

            <div class="col">
                <h2>${movie.Title}</h2>
                <p>Director: <span>${movie.Director}</span></p>
                <p>Descripcion: ${movie.Plot}</p>
                <p>Actores: ${movie.Actors}</p>
                <p>Año: ${movie.Year}</p>
                <p>Genero: ${movie.Genre}</p>
            </div>
                `
            } else {
                HTML = "<h2>No existe la pelicula.</h2>"
            }
            document.querySelector('#content-movies').innerHTML = HTML
        }
    };
    xmlhttp.open("GET", url, true)
    xmlhttp.send()
}