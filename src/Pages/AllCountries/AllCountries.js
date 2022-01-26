import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Search from "../../images/search.svg";
import api from "../../api";
import "./AllCountries.scss";

export default function AllCountries() {
  const [countriesDatas, setCountriesData] = useState([]);
  const [searchState, setSearchState] = useState("");
  const [selectState, setSelectState] = useState("");

  const fetchAllCountriesDatas = async () => {
    const result = await api.get(`https://restcountries.com/v2/all`);
    if (result.data.length !== undefined) {
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

  const fetchCountriesByRegionDatas = async () => {
      const result = await api.get(`https://restcountries.com/v2/region/${selectState}`);
      setCountriesData(result.data)
  }

  useEffect(() => {
    fetchAllCountriesDatas();
  }, []);

  useEffect(() => {
    if (searchState.length !== 0) {
      fetchSearchedCountriesDatas();
    } else if (selectState.length !== 0){
        fetchCountriesByRegionDatas();
    } else {
        fetchAllCountriesDatas();
    }
  }, [searchState,selectState]);

  

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchState(inpRef.current.value);
    setSelectState("")
  };

  const handleSelect = (e) => {
      e.preventDefault();
      setSelectState(e.target.value)
      setSearchState("")
  }

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

        <form onChange={handleSelect} className="region-form">
            <select name="region" id="select">
                <option value="">Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </form>
      </div>
      <div className="countries">
        {countriesDatas.map((item, index) => {
          return (
            <div className="country-preview" key={index}>
                <Link to={{
                    pathname: `/${item.alpha3Code}`
                }}/>
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
