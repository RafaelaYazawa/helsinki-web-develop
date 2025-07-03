import axios from "axios";
import React, { useEffect, useState } from "react";

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area - {country.area}</p>
      <h2>Lamguages</h2>
      <ul>
        <li>{country.languages}</li>
      </ul>
    </div>
  );
};

const App = () => {
  const apiUrl = "https://studies.cs.helsinki.fi/restcountries/api";
  const [searchTerm, setSearchTerm] = useState("");
  const [allCountries, setAllCountries] = useState([]);

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
                  <li key={country.name.common}>{country.name.common}</li>
                ))}
            </ul>
          )}

        {searchTerm && filteredCountries.length === 1 && (
          <CountryDetails country={filteredCountries} />
        )}
      </div>
    </div>
  );
};

export default App;
