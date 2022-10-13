import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch( 'NzYxODA5NmY0ODRjYTRmMzQ2YjMzNzNmZmFhNjY5ZGRmYjZlMzViN2VkZDIzMGUwYjM5ZjQ5NjAwZGI4ZTc5MHJlc3RyaWN0SW5kaWNlcz1wcm9kdWN0aW9uX21lZGlhJmZpbHRlcnM9Tk9UK2FnZVJhdGluZyUzQVIxOA==');

function Hit({ hit }) {
  return (
    <article>
      <img src={hit.image} alt={hit.name} />
      <p>{hit.categories[0]}</p>
      <h1>{hit.name}</h1>
      <p>${hit.price}</p>
    </article>
  );
}

function AlgoliaSearch() {
  
  const fetchKitsuAlgoliaKeys = () => {
    fetch('https://kitsu.io/api/edge/algolia-keys')
    .then(res => res.json())
    .then(data => console.log(data))
}

  return (
    <>
      <InstantSearch searchClient="NzYxODA5NmY0ODRjYTRmMzQ2YjMzNzNmZmFhNjY5ZGRmYjZlMzViN2VkZDIzMGUwYjM5ZjQ5NjAwZGI4ZTc5MHJlc3RyaWN0SW5kaWNlcz1wcm9kdWN0aW9uX21lZGlhJmZpbHRlcnM9Tk9UK2FnZVJhdGluZyUzQVIxOA==" indexName="production_media">
        <SearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearch>

      <button className="bg-green-700 hover:bg-green-600 rounded-md p-2 w-1/4 text-white" type="button" onClick={ fetchKitsuAlgoliaKeys }> Keys </button>

    </>


  );
}

export default AlgoliaSearch;