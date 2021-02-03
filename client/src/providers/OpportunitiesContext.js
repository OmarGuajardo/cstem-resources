import React, { useState, createContext, useEffect } from "react";

export const OpportunitiesContext = createContext();

export const OpportunitiesProvider = (props) => {
  const proxy = "https://vast-fortress-47186.herokuapp.com/";
  const backendURL = "https://8903663d573c.ngrok.io/api/opportunities?c=INL";
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/opportunities?c=INL");
        const data = await response.json();
        console.log(data);
        setOpportunities([...data]);
        console.log("Data set");
      } catch (err) {
        console.log("Something went wrong");
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <OpportunitiesContext.Provider value={[opportunities, setOpportunities]}>
      {props.children}
    </OpportunitiesContext.Provider>
  );
};
