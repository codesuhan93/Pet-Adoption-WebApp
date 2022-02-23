import { useState, useEffect, useContext } from "react";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";
import Results from "./Results";
import Pagination from "./Pagination";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [animal, updateAnimal] = useState("");
  const [location, updateLocation] = useState("");
  const [breed, updateBreed] = useState("");

  const [pets, setPets] = useState([]);

  const [currentPage, setcurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // const [petPerPage, setPetPerPage] = useState(10);

  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    requestPets();
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?page=${currentPage}&animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    const pagesInWhole = Math.ceil(json.numberOfResults / 10);
    setTotalPages(pagesInWhole);
    setPets(json.pets);
    // console.log("pages in total: ", pagesInWhole);
    // console.log("total data from api: ", json);
  }
  const paginate = (pageNumbers) => setcurrentPage(pageNumbers);
  console.log("current page: ", currentPage);

  return (
    <div className="home">
      <div className="search-params">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            requestPets();
          }}
        >
          <label htmlFor="location">
            Location
            <input
              id="location"
              value={location}
              placeholder="Location"
              onChange={(e) => updateLocation(e.target.value)}
            />
          </label>
          <label htmlFor="animal">
            Animal
            <select
              id="animal"
              value={animal}
              onChange={(e) => updateAnimal(e.target.value)}
              onBlur={(e) => updateAnimal(e.target.value)}
            >
              <option />
              {ANIMALS.map((animal) => (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="breed">
            Breed
            <select
              disabled={!breeds.length}
              id="breed"
              value={breed}
              onChange={(e) => updateBreed(e.target.value)}
              onBlur={(e) => updateBreed(e.target.value)}
            >
              <option />
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="theme">
            Theme
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              onBlur={(e) => setTheme(e.target.value)}
            >
              <option value="peru">Peru</option>
              <option value="darkblue">Dark Blue</option>
              <option value="chartreuse">Chartreuse</option>
              <option value="mediumorchid">Medium Orchid</option>
            </select>
          </label>
          <button style={{ backgroundColor: theme }}>Submit</button>
        </form>
        <Results pets={pets} />
      </div>
      <div>
        <Pagination totalPages={totalPages} paginate={paginate} />
      </div>
    </div>
  );
};

export default SearchParams;
