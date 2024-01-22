let searchInputValue = "";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");


searchInput.addEventListener("input", (event) => {
    searchInputValue = event.target.value;
});

searchBtn.onclick = () => {
    redirectToRepoPage();
};

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        redirectToRepoPage();
    }
});

function redirectToRepoPage() {
    const newUrl = `/pages/RepoPage/?userName=${encodeURIComponent(searchInputValue)}`;
    window.location.href = newUrl;
}