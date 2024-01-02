import React, { useEffect, useState } from "react";

// 1- create simple react application that display a list of countries and their capitals
// the application should have the following features:

// the list of countries and capitals should be fetched from and API.
// The list should be displayed in the "CountriesPage"
// each country should be displayed in the seprate component
// the user should be able to filter the list by capital

const BASE_URL = "https://restcountries.com/v3.1";

// to filter by capital city, use the "/capital/{capital}" endpoint

const FILTERABLE_CAPITAL = [
  "Tallinn",
  "Helsinki",
  "Stockholm",
  "Oslo",
  "Copenhagen",
  "Reykjavik",
];

const Country = ({ id, countryName, countryFlag, countryCapital }) => {
  return (
    <p key={id}>
      {countryFlag} {countryName}
    </p>
  );
};

const CountriesPage = () => {
  const [countries, setCountries] = useState([]);
  const [capital, setCapital] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const url =
        capital !== "all"
          ? `${BASE_URL}/capital/${capital}`
          : `${BASE_URL}/all`;
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
    };
    fetchData();
  }, [capital]);

  return (
    <>
      <h2>Countries Page</h2>
      <select
        name="capital"
        value={capital}
        onChange={(e) => setCapital(e.target.value)}
      >
        <option value="all">All</option>
        {FILTERABLE_CAPITAL.map((capital) => (
          <option value={capital} key={capital}>
            {capital}
          </option>
        ))}
      </select>

      {countries.map((country) => {
        return (
          <Country
            id={country.name.common}
            countryName={country.name.common}
            countryFlag={country.flag}
            countryCapital={country.capital}
          />
        );
      })}
    </>
  );
};

export default CountriesPage;
