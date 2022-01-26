import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Arrow from "../../images/left.svg";
import api from "../../api";
import "./CountryDetails.scss";

export default function CountryDetails() {
  const [countryData, setCountryData] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [borderCountries, setBorderCountries] = useState([]);
  let { slug } = useParams();

  const fetchBorder = async (datas) => {
    const newArr = [];
    for (const data of datas) {
      //   console.log(data);
      const count = await api.get(`https://restcountries.com/v2/alpha/${data}`);
      //   console.log(count);
      newArr.push({ name: count.data.name, code: data });
    }
    //   console.log(newArr);
    setBorderCountries(newArr);
  };

  useEffect(() => {
    const newBorderCountries = [];
    const fetchCountryData = async () => {
      const result = await api.get(
        `https://restcountries.com/v2/alpha/${slug}`
      );
      setCountryData(result.data);
      setCurrencies(result.data.currencies);
      setLanguages(result.data.languages);
      if (result.data.borders !== undefined) {
        fetchBorder(result.data.borders);
      }
    };
    fetchCountryData();
  }, []);

  const populationFormat = (pop) => {
    return pop.toLocaleString();
  }

  return (
    <div className="country-details-page">
      <button className="back">
        <Link
          to={{
            pathname: "/",
          }}
        >
          <img src={Arrow} alt="" />
          Back
        </Link>
      </button>

      <div className="country">
        <img src={countryData.flag} alt="" className="flag" />
        <div className="country-infos">
          <h2 className="name">{countryData.name}</h2>
          <div className="main-infos">
            <ul>
              <li>
                <span className="info">Native Name: </span>
                {countryData.nativeName}
              </li>
              <li>
                <span className="info">Population: </span>
                {populationFormat(countryData.population)}
              </li>
              <li>
                <span className="info">Region: </span>
                {countryData.region}
              </li>
              <li>
                <span className="info">Sub Region: </span>
                {countryData.subregion}
              </li>
              <li>
                <span className="info">Capital: </span>
                {countryData.capital}
              </li>
            </ul>
            <ul>
              <li>
                <span className="info">Top Level Domain: </span>
                {countryData.topLevelDomain}
              </li>
              <li>
                <span className="info">Currencies: </span>
                {currencies.map((item) => {
                  return <span key={item.name}>{item.name},</span>;
                })}
              </li>
              <li>
                <span className="info">Languages: </span>
                {languages.map((item) => {
                  return <span key={item.name}> {item.name},</span>;
                })}
              </li>
            </ul>
          </div>
          {borderCountries.length === 0 ? (
            ""
          ) : (
            <div className="border-countries">
              <h3>Border Countries:</h3>
              <div className="border-nav">
                {borderCountries.map((count) => {
                  return (
                    <Link
                      to={{
                        pathname: `/${count.code}`,
                      }}
                      key={count.name}
                    >
                      <button>{count.name}</button>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
