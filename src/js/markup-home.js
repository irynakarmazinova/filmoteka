export default function markupHomePage() {
  return `<form class="search-form">
    <label for="searchQuery" class="sr-only"></label>
    <input class="search" type="text" name="query"
    id="searchQuery" placeholder="Movie search" autocomplete="off"/>
    <button class="button-search" type="submit"></button>
  </form>`
}