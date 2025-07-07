import axios from "axios";
import React, { useEffect, useState } from "react";

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area - {country.area} km²</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

const App = () => {
  const apiUrl = "https://studies.cs.helsinki.fi/restcountries/api";
  const [searchTerm, setSearchTerm] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiUrl}/all`)
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((error) => {
        console.log("fetching error", error);
        setAllCountries([]);
      });
  }, []);

  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log("filteredCountries", filteredCountries);
  // console.log("filteredCountries[0]", filteredCountries[0]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div>
        <p>Find countries</p>
        <input type="text" onChange={handleInputChange} />

        {searchTerm && filteredCountries.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}

        {searchTerm &&
          filteredCountries.length <= 10 &&
          filteredCountries.length > 1 && (
            <ul>
              {searchTerm &&
                filteredCountries.map((country) => (
                  <div key={country.name.common}>
                    <li key={country.name.common}>{country.name.common}</li>
                    <button onClick={() => setSelectedCountry(country)}>
                      Show
                    </button>
                  </div>
                ))}
            </ul>
          )}
        {selectedCountry && <CountryDetails country={selectedCountry} />}

        {searchTerm && filteredCountries.length === 1 && (
          <CountryDetails country={filteredCountries[0]} />
        )}
      </div>
    </div>
  );
};

export default App;
