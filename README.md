# ApiOMDb
Practica Plataformas Web

## Ejecucion
para ejecutar el progragrama se nesesita tener instalado NodeJS y ejecutamos
```
> npm install
> npm start
```
Para el maquetado del sitio web se hace uso del framework css de Bootstrap.
Una vez realizado el diseño web se procede a dar el funcionamiento  a la pagina para ello se realiza las peticiones a la api de http://www.omdbapi.com/ con la respectiva clave para la búsqueda de películas por nombre para ello se realiza una petición con Ajax que realizara la petición al la api de acuerdo al valor ingresado por el usuario se muestra la url de la petición.
```
http://www.omdbapi.com/?apikey=[tu_llave]&s=[texto_a_buscar];
```
 
La variable tu_llave hace referencia a la llave de tu api de OMDbApi y la variable texto_a_buscar contiene el texto escrito por el usuario, para realizar la búsqueda.
El código javascript de la petición contiene la llamada Ajax y la creación del contenido en la página html dinámicamente según la respuesta.

Al tener un resultado iteramos en el arreglo y creamos una tarjeta con los datos que nos responde el api como el poster, titulo, año y colocamos en pantalla dicho resultado.

```js
function listmovies(url) {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest()
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText)
            totalR = response.totalResults;
            movies = response.Search;
            let img = null
            let HTML = ''
            movies.forEach(movie => {
                if (movie.Poster === 'N/A') {
                    img = "/img/movie.png";
                } else {
                    img = movie.Poster;
                }
                console.log(img)
                HTML += `
                        <div class="col-sm-5 col-md-3 mb-3">
                            <div class="card">
                                <img src="${img}" class="card-img-top" alt="..">
                                <div class="card-body">
                                    <h5 class="card-title">${movie.Title}</h5>
                                    <p class="card-text">${movie.Year}</p>
                                    <a href="/movie/${movie.imdbID}" class="btn btn-primary">Detalle</a>
                                </div>
                            </div>
                        </div>
                    `
            });
            if (!document.getElementById('idx')) {
                document.getElementById('pagination-items').innerHTML = `
                <li class="page-item disabled" id="next" style="cursor: pointer;">
                <a class="page-link" onclick="pagination(-1)">Atras</a>
            </li>
            <li class="page-item disabled" id="idx">
                <a class="page-link">1</a>
            </li>
            <li class="page-item" id="back" style="cursor: pointer;">
                <a class="page-link" onclick="pagination(1)">Siguiente</a>
            </li>
                `
                if (totalR <= 10) {
                    document.getElementById('back').classList.add("disabled");
                } else {
                    document.getElementById('back').classList.remove("disabled");
                }
            }            
            document.querySelector('#content-movies').innerHTML = HTML
            document.getElementById('idx').innerHTML = `<a class="page-link">${indexArray}/${totalR}</a>`

        } else {
            document.querySelector('#content-movies').innerHTML = "<h2>No existe la pelicula.</h2>"
        }
    };
    xmlhttp.open("GET", url, true)
    xmlhttp.send()
}
```
Para la búsqueda de la película se realiza la petición pasándole el id de la película esto se extrae desde la URL ya que al usar el leguaje NodeJS podemos procesar la ruta con el id la función se muestra a continuación:
```js
const link = window.location.pathname
const id = link.substring(7, link.length);
const url = "http://www.omdbapi.com/?apikey=[tu_llave]&i=" + id + "&plot=full";
movieSearch(url)
```
Generamos la url para pasarle al metodo que nos devolvera la informacion de la pelicula.
```js
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
            let img = null
            if (movie.Poster === 'N/A') {
                img = "/img/movie.png";
            } else {
                img = movie.Poster;
            }
            if (movie.Title) {
                HTML = `
                <div class="col">
                <img src="${img}" alt="...">
            </div>

            <div class="col">
                <h2>${movie.Title}</h2>
                <p><strong>Director:</strong> <span>${movie.Director}</span></p>
                <p><strong>Descripción:</strong> ${movie.Plot}</p>
                <p><strong>Actores:</strong> ${movie.Actors}</p>
                <p><strong>Año:</strong> ${movie.Year}</p>
                <p><strong>Lenguaje:</strong> ${movie.Language}</p>
                <p><strong>Pais:</strong> ${movie.Country}</p>
                <p><strong>Genero:</strong> ${movie.Genre}</p>
                <p><strong>Tipo:</strong>  ${movie.Type}</p>
                
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
};

```
La diferencia con el resultad anterior es que en esta petición nos devuelve toda la información de la película y se crea la pagina para mostrar el resultado de la información de la película.

Para paginar los resultados se realiza el algoritmo que se sume las paginas al interactuar con los botones atrás y siguiente:

![imagen](https://user-images.githubusercontent.com/15615518/78847942-e9756000-79d5-11ea-8c66-0f0023f2b0b5.png)
 
Para el funcionamiento se crea la url con el numero de pagina que se va a buscar:
```js
function pagination(index) {
    indexArray = indexArray + (index);
    if (indexArray <= 1) {
        indexArray = 1
        document.getElementById('next').classList.add("disabled");

    } else {
        document.getElementById('next').classList.remove("disabled");
    }

    if (indexArray === totalR || totalR <= 10) {
        document.getElementById('back').classList.add("disabled");
    } else {
        document.getElementById('back').classList.remove("disabled");
    }

    let url = "http://www.omdbapi.com/?apikey=[tu_llave]&s=" + [texto_a_buscar]+ "&page=" + indexArray;
    listmovies(url);
};
```
La siguiente función incrementara y decrementara el índice a realizar la petición.



