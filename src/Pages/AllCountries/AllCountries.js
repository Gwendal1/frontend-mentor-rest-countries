import React, { useState, useEffect, useRef } from "react";
import Search from "../../images/search.svg";
import api from "../../api";
import "./AllCountries.scss";

export default function AllCountries() {
  const [countriesDatas, setCountriesData] = useState([]);
  const [searchState, setSearchState] = useState("");

  const fetchAllCountriesDatas = async () => {
    const result = await api.get(`https://restcountries.com/v2/all`);
    if (result.status !== undefined) {
      setCountriesData(result.data);
    } else {
      setCountriesData([]);
    }
  };

  const fetchSearchedCountriesDatas = async () => {
    const result = await api.get(
      `https://restcountries.com/v2/name/${searchState}`
    );
    if (result.data.length !== undefined) {
      setCountriesData(result.data);
    } else {
      setCountriesData([]);
    }
  };

  useEffect(() => {
    fetchAllCountriesDatas();
  }, []);

  useEffect(() => {
    if (searchState.length === 0) {
      fetchAllCountriesDatas();
    } else {
      fetchSearchedCountriesDatas();
    }
  }, [searchState]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchState(inpRef.current.value);
  };

  const inpRef = useRef();

  return (
    <div className="all-countries-page">
      <div className="searchs">
        <form onSubmit={handleSearch} className="name-form">
          <button type="submit" className="search-button">
            <img src={Search} alt="" />
          </button>
          <input
            type="text"
            id="search"
            ref={inpRef}
            placeholder="Search for a country..."
          ></input>
        </form>
      </div>
      <div className="countries">
        {countriesDatas.map((item, index) => {
          return (
            <div className="country-preview" key={index}>
              <img src={item.flags.png} alt="" />
              <div className="country-infos">
                <h2 className="name">{item.name}</h2>
                <p>
                  <span>Population: </span>
                  {item.population}
                </p>
                <p>
                  <span>Region: </span>
                  {item.region}
                </p>
                <p>
                  <span>Capital: </span>
                  {item.capital}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
