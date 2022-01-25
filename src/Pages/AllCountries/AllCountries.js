import React , {useState, useEffect} from 'react';
import api from "../../api";
import "./AllCountries.scss";

export default function AllCountries() {
    const [allCountriesDatas, setAllCountriesData] = useState([])
    
    useEffect(() => {
        const fetchAllCountriesDatas = async () => {
            const result = await api.get(`https://restcountries.com/v2/all`);
            console.log(result.data);
            setAllCountriesData(result.data)
        }
        fetchAllCountriesDatas()
    },[])
  return (
      <div className='all-countries-page'>
          {allCountriesDatas.map((item,index) => {
              return (
                  <div className='country-preview' key={index}>
                      <img src={item.flags.png} alt="" />
                      <div className="country-infos">
                          <h2 className="name">{item.name}</h2>
                          <p><span>Population: </span>{item.population}</p>
                          <p><span>Region: </span>{item.region}</p>
                          <p><span>Capital: </span>{item.capital}</p>
                      </div>
                  </div>
              )
          })}

      </div>
  );
}
