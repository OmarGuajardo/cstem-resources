import React, { useState, createContext } from "react";

export const OpportunitiesContext = createContext();

export const OpportunitiesProvider = (props) => {
  const [opportunities, setOpportunities] = useState([
    {
      name:
        "Stanford Summer Research Program (SSRP) - Amgen Scholars Program (Stanford Medicine Dean's Office Funding) ",
      classification: "EPM",
      url: "http://www.grad.illinois.edu/diversity/srop ",
      major: "Biology",
      participants: "U.S. citizens or permanent residents; DACA students",
      deadline: "February 1st",
      id: 649164,
    },
    {
      name:
        "University of Utah Bioscience Undergraduate Summer Research Program ",
      classification: "EPM",
      url: "https://our.utah.edu/spur/ ",
      major:
        "Natural Science, Social Science, Health, Engineering, Education, Nursing, Psychology+",
      participants:
        "U.S. citizens or permanent residents; DACA students; int'l students studying in U.S.",
      deadline: "Late January",
      id: 23132,
    },
    {
      name:
        '"LGS-SOAR (Summer Opportunity for Academic Research) at Emory University" ',
      classification: "EPM",
      url: "https://gs.emory.edu/diversity/programming/lgs-soar/index.html ",
      major:
        "biomedical, biological, natural and public health sciences; humanities and social sciences",
      participants:
        "U.S. citizens or permanent residents; int'l students studying in U.S.",
      deadline: "Late January",
      id: 79135,
    },
  ]);

  return (
    <OpportunitiesContext.Provider value={[opportunities, setOpportunities]}>
      {props.children}
    </OpportunitiesContext.Provider>
  );
};
