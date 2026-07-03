const API_key = "bf946e4310a8c465588ecac633864e3c";
const base_url = "https://api.themoviedb.org/3/movie/top_rated";

const campoBusca = document.getElementById("search");
const resultado = document.getElementById("movie-list");
const btnProcurar = document.getElementById("btnSearch");
const mensagem = document.getElementById("message");

async function fetchMovies() {
  let resposta = await fetch(`${base_url}?api_key=${API_key}`);
  let dados = await resposta.json();
  renderMovies(dados.results);
}
fetchMovies();

btnProcurar.addEventListener("click", buscarFilme);

campoBusca.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    buscarFilme();
  }
});

async function buscarFilme() {
  let nomeFilme = campoBusca.value.toLowerCase().trim();

  try {
    showMessage("Buscando filme...");

    let resposta = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_key}&query=${nomeFilme}`,
    );

    if (!resposta.ok) {
      throw new Error("Não encontrado! (HTTP " + resposta.status + ")");
    }

    let dados = await resposta.json();
    let filme = dados.results[0];

    if (nomeFilme === "") {
      showMessage("Digite o nome de um filme.");
      return;
    }

    if (!filme) {
      showMessage("Filme não encontrado");
      return;
    } else {
      showMessage("");
    }

    renderMovies(dados.results);
  } catch (erro) {
    showMessage("Ocorreu um erro ao tentar buscar o filme");
  }
}

function showMessage(text) {
  mensagem.textContent = text;
}

function renderMovies(results) {
  resultado.innerHTML = "";
  results.forEach(function (filme) {
    createMovieCard(filme);
  });
}

function createMovieCard(filme) {
  resultado.innerHTML += `
      <div class="movie-card" style="border-top:4px solid black">
        <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="imagem não encotrada">
        <div class="flex">
          <h2>${filme.title}</h2>
          <p>data de lançamento: ${filme.release_date}</p>
          <p>nota: ${filme.vote_average}</p>
          <p>sinopse: ${filme.overview ? filme.overview.slice(0, 200) : "sinopse não encontrada"}</p> 
        </div>
      </div>
  `;
}
