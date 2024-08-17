const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: "3b16422a0d097da70622a99bf0a58bbe",
    apiUrl: "https://api.themoviedb.org/3/",
  },
};

const displayPopularMovies = async () => {
  const { results } = await fetchData("movie/popular");
  //  console.log(results)
  results.forEach((movie) => {
    // console.log(movie);
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
    ${
      movie.poster_path
        ? `<img
    src="http://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt="${movie.original_title}"
    />`
        : `<img
    src="../images/500x750.png"
    class="card-img-top"
    alt="${movie.original_title}"
    />`
    }
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.original_title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>
  `;
    document.getElementById("popular-movies").appendChild(div);
  });
};

const displayPopularTVShows = async () => {
  const { results } = await fetchData("tv/popular");
  //  console.log(results)
  results.forEach((tvshow) => {
    // console.log(tvshow);
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="tv-details.html?id=${tvshow.id}">
    ${
      tvshow.poster_path
        ? `<img
    src="http://image.tmdb.org/t/p/w500${tvshow.poster_path}"
    class="card-img-top"
    alt="${tvshow.original_name}"
    />`
        : `<img
    src="../images/500x750.png"
    class="card-img-top"
    alt="${tvshow.original_name}"
    />`
    }
    </a>
    <div class="card-body">
      <h5 class="card-title">${tvshow.original_name}</h5>
      <p class="card-text">
        <small class="text-muted">First Air Date: ${
          tvshow.first_air_date
        }</small>
      </p>
    </div>
  `;
    document.getElementById("popular-shows").appendChild(div);
  });
};

//Movie Details

const displayMovieDetails = async () => {
  // const movieID = window.location.search;
  // console.log(movieID);

  const movieID = window.location.search.split("=")[1];
  // console.log(movieID[1])
  const movie = await fetchData(`movie/${movieID}`);
  // console.log(movie);
  //Overlay for bg image

  displayBackgroundImage("movie", movie.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    movie.poster_path
      ? `<img
  src="http://image.tmdb.org/t/p/w500${movie.poster_path}"
  class="card-img-top"
  alt="${movie.original_name}"
  />`
      : `<img
  src="../images/500x750.png"
  class="card-img-top"
  alt="${movie.original_name}"
  />`
  }
  </div>
  <div>
    <h2>${movie.original_title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
      ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
    ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
    <a href="${
      movie.homepage
    }" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> ${formatToDollars(
      movie.budget
    )}</li>
    <li><span class="text-secondary">Revenue:</span> ${formatToDollars(
      movie.revenue
    )}</li>
    <li><span class="text-secondary">Runtime:</span> ${
      movie.runtime
    } minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${movie.production_companies.map(
    (company) => ` ${company.name}`
  )}</div>
</div>`;

  document.querySelector("#movie-details").appendChild(div);
};

const displayTVShowDetails = async () => {
  // const movieID = window.location.search;
  // console.log(movieID);

  const showID = window.location.search.split("=")[1];
  // console.log(movieID[1])
  const show = await fetchData(`tv/${showID}`);
  // console.log(show);
  //Overlay for bg image

  displayBackgroundImage("show", show.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    show.poster_path
      ? `<img
  src="http://image.tmdb.org/t/p/w500${show.poster_path}"
  class="card-img-top"
  alt="${show.name}"
  />`
      : `<img
  src="../images/500x750.png"
  class="card-img-top"
  alt="${show.name}"
  />`
  }
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${show.first_air_date}</p>
    <p>
      ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
    ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
    <a href="${
      show.homepage
    }" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number of Episodes:</span> ${
      show.number_of_episodes
    }</li>
    <li><span class="text-secondary">Last Episode To Air:</span> ${
      show.last_episode_to_air.name
    }</li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${show.production_companies.map(
    (company) => ` ${company.name}`
  )}</div>
</div>`;

  document.querySelector("#show-details").appendChild(div);
};

//Highlight Active Link
const highlightActiveLink = () => {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
};

// bg on details page
const displayBackgroundImage = (type, bgPath) => {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${bgPath})`;

  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.3";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
};

// Fetch data from TMDB API
const fetchData = async (endpoint) => {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  // console.log(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();

  hideSpinner();

  return data;
};

// Spinner

const showSpinner = () => {
  document.querySelector(".spinner").classList.add("show");
};

const hideSpinner = () => {
  document.querySelector(".spinner").classList.remove("show");
};

// search Movie / TV Show

const searchInput = async () => {
  const queryString = window.location.search;
  // console.log(queryString)
  const urlParams = new URLSearchParams(queryString);

  // console.log(urlParams.get("type"));

  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");

  if (global.search.term !== "" && global.search.term !== null) {
    // const results = await searchData();
    // console.log(results)
    const { results, total_pages, page, total_results } = await searchData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert("Not found", "alert-error");
      return;
    }

    displaySearchResults(results);

    // document.querySelector("#search-term").value = "";
  } else {
    console.log("Not Searching...");
    showAlert("Please enter a valid search", "alert-error");
  }
};

//Funct to display results
const displaySearchResults = (results) => {
  document.getElementById("search-results").innerHTML = "";
  document.getElementById("search-results-heading").innerHTML = "";
  document.getElementById("pagination").innerHTML = "";

  results.forEach((result) => {
    // console.log(movie);
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="${global.search.type}-details.html?id=${result.id}">
    ${
      result.poster_path
        ? `<img
    src="http://image.tmdb.org/t/p/w500${result.poster_path}"
    class="card-img-top"
    alt="${global.search.type === "movie" ? result.title : result.name}"
    />`
        : `<img
    src="../images/500x750.png"
    class="card-img-top"
    alt="${global.search.type === "movie" ? result.title : result.name}"
    />`
    }
    </a>
    <div class="card-body">
      <h5 class="card-title">${
        global.search.type === "movie" ? result.title : result.name
      }</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${
          global.search.type === "movie"
            ? result.release_date
            : result.first_air_date
        }</small>
      </p>
    </div>
  `;

    document.querySelector(
      "#search-results-heading"
    ).innerHTML = `<h2>${results.length} of ${global.search.totalResults} Results
  for ${global.search.term}</h2>`;

    document.getElementById("search-results").appendChild(div);
  });

  displayPagination();
};

// pagination function

const displayPagination = () => {

  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;

  document.querySelector("#pagination").appendChild(div);

  //Disabe prev button on irst page
  if (global.search.page === 1) {
    document.querySelector("#prev").disabled = true;
  }

  if (global.search.page === global.search.totalPages) {
    document.querySelector("#next").disabled = true;
  }

  //Next page

  document.querySelector("#next").addEventListener("click", async () => {
    global.search.page++;
    const { results, total_pages } = await searchData();
    displaySearchResults(results);
  });

  document.querySelector("#prev").addEventListener("click", async () => {
    global.search.page--;
    const { results, total_pages } = await searchData();
    displaySearchResults(results);
  });

};

//make request to search
const searchData = async () => {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();
  // console.log(
  //   `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`
  // );
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}
    &page=${global.search.page}`
  );

  // console.log(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();

  hideSpinner();

  return data;
};

// Display slider movies

const initSwiper = () => {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    apaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
};

const displaySlider = async () => {
  const { results } = await fetchData("movie/now_playing");
  console.log(results);

  const swiperWrapper = document.querySelector(".swiper-wrapper");

  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
      <a href="movie-details.html?id=${result.id}">
        <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${
      result.title
    }" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${result.vote_average.toFixed(
          1
        )} / 10
      </h4>`;

    // Append each slide to the swiper wrapper
    swiperWrapper.appendChild(div);
  });

  // Initialize Swiper after appending all slides
  initSwiper();
};

const formatToDollars = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

//Error alert
const showAlert = (msg, className) => {
  const div = document.createElement("div");
  div.classList.add("alert", className);
  div.appendChild(document.createTextNode(msg));
  document.querySelector("#alert").appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 4000);
};

//Init App
const init = () => {
  switch (global.currentPage) {
    case "/index.html":
    case "/":
      // console.log("Home");
      displaySlider();
      displayPopularMovies();
      break;
    case "/shows.html":
      // console.log("Shows");
      displayPopularTVShows();
      break;
    case "/movie-details.html":
      // console.(log"Movie Details");
      displayMovieDetails();
      break;
    case "/tv-details.html":
      // console.log("TV Details");
      displayTVShowDetails();
      break;
    case "/search.html":
      // console.log("Search");
      searchInput();
      break;
    default:
      break;
  }

  highlightActiveLink();
  // displayPopularMovies();
};

document.addEventListener("DOMContentLoaded", init);
