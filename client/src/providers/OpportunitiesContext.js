import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const OpportunitiesContext = createContext();

export const OpportunitiesProvider = (props) => {
  const proxy = "https://vast-fortress-47186.herokuapp.com/";
  const backendURL = "https://8903663d573c.ngrok.io/api/opportunities?c=INL";
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/opportonuties?c=INL");
        const data = await response.json();
        console.log(data);
        setOpportunities([...data]);
      } catch (err) {
        console.log("There was an error getting the data");
      }
    };
    fetchData();
    console.log("Data set");
  }, []);

  return (
    <OpportunitiesContext.Provider value={[opportunities, setOpportunities]}>
      {props.children}
    </OpportunitiesContext.Provider>
  );
};
