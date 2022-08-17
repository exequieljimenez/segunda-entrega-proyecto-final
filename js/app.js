// para los menús en el header. Cada li de la ul llama una función  que muestra un sub-menú distinto. A su vez cada elemento del submenú llama a una función diferente.

// sub-menú donde aparece el botón para mostrar la lista completa de películas
function mostrarMenuLista() {
    tituloPagina.innerHTML = ""
    divPeliculas.innerHTML = ""
    let subMenuLista = document.getElementById("subMenu")
    subMenuLista.setAttribute("class", "subMenu")
    subMenuLista.innerHTML = `
    <div>
        Lista completa de películas
    </div>
    <section class="opciones">
        <button id="verTodas">Ver Lista completa</button>
    </section>`
    // este getElementById accede al botón con la id "verTodas"
    let botonMostrar = document.getElementById("verTodas")
    // este evento hace que al cliquear el botón llame a la función mostrarListaCompleta
    botonMostrar.addEventListener("click", mostrarListaCompleta)
}

// sub-menú con el sistema búsqueda por título, director u año. Luego de leer los inputs llama a una función utilizando los parámetros leídos.
function mostrarMenuBusqueda() {
    tituloPagina.innerHTML = ""
    divPeliculas.innerHTML = ""
    let subMenuBusqueda = document.getElementById("subMenu")
    subMenuBusqueda.setAttribute("class", "subMenu")
    subMenuBusqueda.innerHTML = `
    <div>
        Búsquedas
    </div>
    <section class="opciones">
        <article>
            <button id="enviarTitulo">Buscar por título</button>
            <input type="text" id="inputTitulo">
        </article>
        <article>
            <button id="enviarDirector">Buscar por director</button>
            <input type="text" id="inputDirector">
        </article>
        <article>
            <button id="enviarAnio">Buscar por año</button>
            <input type="text" id="inputAnio">
        </article>
    </section>`

    let titulo = document.getElementById("inputTitulo")
    let director = document.getElementById("inputDirector")
    let anio = document.getElementById("inputAnio")

    const guardarTituloBtn = document.getElementById("enviarTitulo")
    const guardarDirectorBtn = document.getElementById("enviarDirector")
    const guardarAnioBtn = document.getElementById("enviarAnio")

    guardarTituloBtn.addEventListener("click", () => guardarTitulo(titulo.value, titulo))
    guardarDirectorBtn.addEventListener("click", () => guardarDirector(director.value, director))
    guardarAnioBtn.addEventListener("click", () => guardarAnio(anio.value, anio))
}

// Esta función muestra el submenú con el botón para mostrar las películas favoritas
function mostrarMenuFavoritas() {
    tituloPagina.innerHTML = ""
    divPeliculas.innerHTML = ""
    let subMenuFavoritas = document.getElementById("subMenu")
    subMenuFavoritas.setAttribute("class", "subMenu")
    subMenuFavoritas.innerHTML = `
    <div>Ver lista de películas favoritas (Puede seleccionar las favoritas a partir de la lista completa)</div>
    <section class="opciones">
        <button id="botonMostrarFavoritas">Ver favoritas</button>
    </section>`
    let botonMostrarFavoritas = document.getElementById("botonMostrarFavoritas")
    botonMostrarFavoritas.addEventListener("click", mostrarFavoritas)
}

// A continuación están las funciones de búsqueda y presentación de resultados en caso de encontrar coincidencias
function guardarTitulo(titulo, valorInput) {
    busqueda(titulo, "titulo", valorInput)
}

function guardarDirector(director, valorInput) {
    busqueda(director, "director", valorInput)
}

function guardarAnio(anio, valorInput) {
    busqueda(anio, "anio", valorInput)
}

function busqueda(termino, datoPeli, valorInput) {
    if (datoPeli == "titulo") {
        valorInput.value = ""
        const resultado = filmoteca.filter((el) => el.titulo.toUpperCase() == termino.toUpperCase())
        resultadoONo(resultado)
    }
    else if (datoPeli == "director") {
        valorInput.value = ""
        const resultado = filmoteca.filter((el)=> el.director.toUpperCase() == termino.toUpperCase())
        resultadoONo(resultado)
    }
    else {
        valorInput.value = ""
        const resultado = filmoteca.filter((el)=> el.anio == termino)
        resultadoONo(resultado)
    }
}

function resultadoONo(resultado) {
        
    if (resultado.length == 0) {
        divPeliculas.innerHTML = ""
        tituloPagina.innerText = "Su búsqueda no arrojó resultados"
    }
    else {
        mostrarResultados(resultado)
    }
}

function mostrarResultados(resultadoBusqueda) {
        
    divPeliculas.innerHTML = ""
    tituloPagina.innerText = "Su búsqueda arrojó los siguientes resultados:"
    resultadoBusqueda.forEach((pelicula) => {
        let nuevaPelicula = document.createElement("div")
        nuevaPelicula.innerHTML = `<article class="card">
                                        <h2>${pelicula.titulo}</h2>
                                        <p>estrenada en ${pelicula.anio}</p>
                                        <p>dirigida por ${pelicula.director}</p>
                                        <img src="${pelicula.afiche}">
                                    </article>`
        divPeliculas.appendChild(nuevaPelicula)
    })
    
}

function mostrarListaCompleta() {
    tituloPagina.innerText = "Lista completa de películas"
    divPeliculas.innerHTML = ""
    filmoteca.forEach((pelicula) => {
        let nuevaPelicula = document.createElement("div")
        nuevaPelicula.innerHTML = `<article class="card">
                                        <h2>${pelicula.titulo}</h2>
                                        <p>estrenada en ${pelicula.anio}</p>
                                        <p>dirigida por ${pelicula.director}</p>
                                        <img src="${pelicula.afiche}">
                                        <button id="agregarAFavoritas${counter}">Agregar a Favoritas</button>
                                    </article>`
        divPeliculas.appendChild(nuevaPelicula)
        let botonFavoritas = document.getElementById(`agregarAFavoritas${counter}`)
        counter++
        botonFavoritas.addEventListener("click", () => agregarAFavoritas(pelicula))
    })
}

// Esta función recibe como parámetro la película sobre la que se cliqueó y la agrega al array con la lista de películas favoritas y se las guarda en texto plano en el localStorage para poder ser vistas luego
function agregarAFavoritas(pelicula) {
    console.log(pelicula.titulo + " Agregada a favoritas")
    favoritas.push(pelicula)
    localStorage.setItem("favoritas", JSON.stringify(favoritas))
    console.log(localStorage.getItem("favoritas"))
}

// Esta función parsea el array en texto plano para mostrar la lista de películas favoritas
function mostrarFavoritas() {
    tituloPagina.innerText = "Lista de películas favoritas"
    divPeliculas.innerHTML = ""
    let favoritasParseadas = JSON.parse(localStorage.getItem("favoritas"))
    favoritasParseadas.forEach((pelicula) => {
        let nuevaPelicula = document.createElement("div")
        nuevaPelicula.innerHTML = `<article class="card">
                                        <h2>${pelicula.titulo}</h2>
                                        <p>estrenada en ${pelicula.anio}</p>
                                        <p>dirigida por ${pelicula.director}</p>
                                        <img src="${pelicula.afiche}">
                                    </article>`
        divPeliculas.appendChild(nuevaPelicula)
    })
}

// Definción de nodos y de eventos para el menú
let listaBtn = document.getElementById("lista")
let busquedaBtn = document.getElementById("busqueda")
let favoritasBtn = document.getElementById("favoritas")
let tituloPagina = document.getElementById("tituloPagina")

listaBtn.addEventListener("click", mostrarMenuLista)
busquedaBtn.addEventListener("click", mostrarMenuBusqueda)
favoritasBtn.addEventListener("click", mostrarMenuFavoritas)

// clase Peliculas, a partir de la cual armar los objetos
class Peliculas {
    constructor(titulo, anio, director, afiche) {
        this.titulo = titulo,
        this.anio = anio,
        this.director = director
        this.afiche = afiche
    }
}

// lista de objetos, instancias de la clase Peliculas
let pelicula01 = new Peliculas("La morada del diablo", 1896, "Melies", "./media/manoir-melies-1896.jpg")
let pelicula02 = new Peliculas("Las cuatrocientas farsas del diablo", 1906, "Melies", "./media/farces-diable-melies-1906.jpg")
let pelicula03 = new Peliculas("El estudiante de Praga", 1913, "Rye", "./media/rye-prag-1913.jpg")
let pelicula04 = new Peliculas("El Golem", 1914, "Wegener", "./media/der-golem-1914.jpg")
let pelicula05 = new Peliculas("Los vampiros", 1915, "Feuillade", "./media/les-vampires-1915.jpg")
let pelicula06 = new Peliculas("El gabinete del Dr. Caligari", 1920, "Wiene", "./media/cabinet-caligari-1920.jpg")
let pelicula07 = new Peliculas("Dr. Jekyll y Mr. Hyde", 1920, "Robertson", "./media/dr-jekyll-1920.jpg")
let pelicula08 = new Peliculas("La carreta fantasma", 1921, "Sjostrom", "./media/korkarlen-1921.jpg")
let pelicula09 = new Peliculas("Páginas del diario de Satán", 1921, "Dreyer", "./media/satans-dreyer-1921.jpg")
let pelicula10 = new Peliculas("Haxan", 1921, "Christensen", "./media/haxan-1921.jpg")
let pelicula11 = new Peliculas("Doctor Mabuse", 1922, "Lang", "./media/dr-mabuse-1922.jpg")
let pelicula12 = new Peliculas("Nosferatu, el vampiro", 1922, "Murnau", "./media/nosferatu-1922.jpg")

// array de objetos con la lista completa de peliculas
const filmoteca = [pelicula01, pelicula02, pelicula03, pelicula04, pelicula05, pelicula06, pelicula07, pelicula08, pelicula09, pelicula10, pelicula11, pelicula12]

// array de objetos con la lista de películas favoritas 
const favoritas = []

let divPeliculas = document.getElementById("peliculas")
// este setAttribute() llama a la clase .estiloPeliculas en el css
divPeliculas.setAttribute("class", "estiloPeliculas")
let counter = 1

// definiciones de los nodos y eventos para los botones que cambian los modos claros y oscuros
let botonOscuro = document.getElementById("botonOscuro")
let botonClaro = document.getElementById("botonClaro")

botonClaro.addEventListener("click", ()=> {
    document.body.classList.add("modoClaro")
    localStorage.setItem("modoClaro", "claro")
})

botonOscuro.addEventListener("click", ()=> {
    document.body.classList.remove("modoClaro")
    localStorage.setItem("modoClaro", "oscuro")
})

// Para el default, se nombra la variable sin darle un valor para ver en qué situación está 
let modoClaro

if(localStorage.getItem("modoClaro")) {
    modoClaro = localStorage.getItem("modoClaro")
}
else {
    localStorage.setItem("modoClaro", "oscuro")
}

// Si el modoClaro está en claro, tal como lo hace el eventListener, entonces transformo la clase a claro
if(modoClaro == "claro") {
    document.body.classList.add("modoClaro")
}