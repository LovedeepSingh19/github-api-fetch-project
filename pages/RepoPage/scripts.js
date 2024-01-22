let numberOfPages;
let deployed_url
let currentPage = 1;
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const username = params.get("userName");


let pageInputValue = 10;
let prevPageInput;
const searchInput = document.getElementById("RepoPerPage");
const pageFetchBtn = document.getElementById("pageFetch");


searchInput.addEventListener("input", (event) => {
  pageInputValue = event.target.value;
});

pageFetchBtn.onclick = () => {
  console.log("clicked")
    redirectToRepoPage();
};

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        redirectToRepoPage();
    }
});

async function redirectToRepoPage() {
  const RepoContainer = document.getElementById("heroes-list");
  const repoData = await fetchRepoData(currentPage, pageInputValue ??10);
  RepoContainer.innerHTML = repoData;
  

  const pages = document.getElementById("page-numbers");
  pages.innerHTML = '';
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  numberOfPages = (numberOfPages*10)/pageInputValue;

  for (let i = 0; i < numberOfPages; i++) {
      const button = document.createElement("button");
      button.classList.add("btn-outline-secondary");
      button.classList.add("btn");
      button.id = `button-${i + 1}`;
      button.textContent = `${i + 1}`;
    
      // Check if i + 1 is equal to currentPage
      if (i + 1 === currentPage) {
        button.classList.add("btn-primary"); // Add the class for blue color (assuming btn-primary is your class for the blue color)
      }
    
      button.addEventListener("click", async () => {
        if (i + 1 !== currentPage) {
          currentPage = i + 1;
    
          // Reset the color of all buttons
          for (let j = 0; j < numberOfPages; j++) {
            const otherbutton = document.getElementById(`button-${j + 1}`);
            if (j + 1 === currentPage) {
              
              button.classList.add("btn-primary"); // Add the class for blue color (assuming btn-primary is your class for the blue color)
            }else if(j + 1 !== currentPage){
              otherbutton.classList.remove("btn-primary"); // Add the class for blue color (assuming btn-primary is your class for the blue color)
      
            }
          }
    
          spinner.style.display = "block";
          const RepoContainer = document.getElementById("heroes-list");
          const repoData = await fetchRepoData(currentPage, pageInputValue??10);
          RepoContainer.innerHTML = repoData;
          spinner.style.display = "none";
        }
      });
    
      buttonContainer.appendChild(button);
    }

    pages.appendChild(buttonContainer);
  numberOfPages = (numberOfPages*pageInputValue)/10
}


fetch('../../.env')
    .then(response => response.text())
    .then(envContent => {
        const envVariables = envContent
            .split('\n')
            .filter(line => line.trim() !== '')
            .reduce((acc, line) => {
                const [key, value] = line.split('=');
                acc[key.trim()] = value.trim();
                return acc;
            }, {});
        console.log('DEPLOYED_URL:', envVariables.DEPLOYED_URL);
        deployed_url = envVariables.DEPLOYED_URL
    })
    .catch(error => console.error('Error loading .env file:', error));


async function fetchRepoData(pages, per_page) {
  return fetch(
    `http://${deployed_url}:3000/?userName=${username}&page=${pages}&perPage=${per_page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  });
}
const fetchProfileData = async () => {
  return await fetch(`https://api.github.com/users/${username}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(`API Fetch error! Status: ${response.status}`);
      }
      console.log(response)
      return response.json();
    }
  );
};

const spinner = document.getElementById("spinner");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const profileData = await fetchProfileData();
    console.log(profileData);

    const profileimage = document.getElementById("profile-image");
    profileimage.src = profileData.avatar_url;

    const profileName = document.getElementById("profile-name");
    profileName.textContent = profileData.name;

    const profileBio = document.getElementById("profile-bio");
    profileBio.textContent = profileData.bio;

    const profileLocation = document.getElementById("profile-location");
    profileLocation.textContent = profileData.location;

    const profileTwitter = document.getElementById("profile-twitter");
    profileTwitter.textContent = profileData.twitter_username;

    const profileURL = document.getElementById("profile-url");
    profileURL.textContent = profileData.html_url;

    const RepoContainer = document.getElementById("heroes-list");
    const repoData = await fetchRepoData(1, pageInputValue??10);
    RepoContainer.innerHTML = repoData;

    numberOfPages = Math.ceil(profileData.public_repos / (pageInputValue?? 10));
    spinner.style.display = "none";

    const pages = document.getElementById("page-numbers");
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    for (let i = 0; i < numberOfPages; i++) {
        const button = document.createElement("button");
        button.classList.add("btn-outline-secondary");
        button.classList.add("btn");
        button.id = `button-${i + 1}`;
        button.textContent = `${i + 1}`;
      
        // Check if i + 1 is equal to currentPage
        if (i + 1 === currentPage) {
          button.classList.add("btn-primary"); // Add the class for blue color (assuming btn-primary is your class for the blue color)
        }
      
        button.addEventListener("click", async () => {
          if (i + 1 !== currentPage) {
            currentPage = i + 1;
      
            // Reset the color of all buttons
            for (let j = 0; j < numberOfPages; j++) {
              const button = document.getElementById(`button-${j + 1}`);
              if (j + 1 === currentPage) {
                
                button.classList.add("btn-primary"); // Add the class for blue color (assuming btn-primary is your class for the blue color)
              }else if(j + 1 !== currentPage){
                button.classList.remove("btn-primary"); // Add the class for blue color (assuming btn-primary is your class for the blue color)
        
              }
            }
      
            spinner.style.display = "block";
            const RepoContainer = document.getElementById("heroes-list");
            const repoData = await fetchRepoData(currentPage, pageInputValue??10);
            RepoContainer.innerHTML = repoData;
            spinner.style.display = "none";
          }
        });
      
        buttonContainer.appendChild(button);
      }

    pages.appendChild(buttonContainer);

    console.log(numberOfPages);
  } catch (error) {
    console.error("Error fetching or rendering HTML:", error);
  }
});

const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

prevButton.onclick = async () => {
  const RepoContainer = document.getElementById("heroes-list");
  if (currentPage > 1) {
    spinner.style.display = "block";
    currentPage -= 1;
    const repoData = await fetchRepoData(currentPage, pageInputValue??10);
    RepoContainer.innerHTML = repoData;
    spinner.style.display = "none";

    for (let i = 0; i < numberOfPages; i++) {
      const button = document.getElementById(`button-${i + 1}`);
      if (i + 1 === currentPage) {
        
        button.classList.add("btn-primary"); // Add the class for blue color (assuming btn-primary is your class for the blue color)
      }else if(i + 1 !== currentPage){
        button.classList.remove("btn-primary"); // Add the class for blue color (assuming btn-primary is your class for the blue color)

      }
    }
  }
};

nextButton.onclick = async () => {
  const RepoContainer = document.getElementById("heroes-list");
  if (currentPage < numberOfPages) {
    spinner.style.display = "block";
    currentPage += 1;
    const repoData = await fetchRepoData(currentPage, pageInputValue??10);
    RepoContainer.innerHTML = repoData;
    spinner.style.display = "none";

    for (let i = 0; i < numberOfPages; i++) {
      const button = document.getElementById(`button-${i + 1}`);
      if (i + 1 === currentPage) {
        
        button.classList.add("btn-primary"); // Add the class for blue color (assuming btn-primary is your class for the blue color)
      }else if(i + 1 !== currentPage){
        button.classList.remove("btn-primary"); // Add the class for blue color (assuming btn-primary is your class for the blue color)

      }
    }
  }
};

function showLoadingSpinner(container) {
  let spinner = container.querySelector(".spinner-border");
  if (spinner) {
    spinner.style.display = "block";
  }
}

function hideLoadingSpinner(container) {
  let spinner = container.querySelector(".spinner-border");
  if (spinner) {
    spinner.style.display = "none";
  }
}
