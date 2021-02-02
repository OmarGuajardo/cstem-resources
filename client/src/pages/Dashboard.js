import React, { useState } from "react";
import Opportunity from "../components/Opportunity";
import "../styles/Opportunity.css";

function Dashboard() {
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
    <div className="dashBoard">
      <div className="opportunity-container">
        <div id="delete-btn" className="opportunity-info"></div>
        <div className="opportunity-info">Program</div>
        <div className="opportunity-info">Major</div>
        <div className="opportunity-info">Participants</div>
        <div className="opportunity-info">Deadline</div>
      </div>
      {opportunities.map((opportunity) => (
        <Opportunity
          name={opportunity.name}
          classification={opportunity.classification}
          url={opportunity.url}
          major={opportunity.major}
          participants={opportunity.participants}
          deadline={opportunity.deadline}
          key={opportunity.id}
        />
      ))}
    </div>
  );
}

export default Dashboard;
