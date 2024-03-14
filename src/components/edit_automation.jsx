import React from "react";
import Edit_automation_tabs from "./edit_automation/edit_automation_tabs";
import Edit_sidebar_tab_description from "./edit_automation/edit_sidebar_tab_description";

const edit_automation = ({ card, isactive }) => {
  return (
    <div>
      <div className="drawar_title_div">
        <span className="drawar_title">
          {isactive ? card.fe_solution_name : card.title}
        </span>
      </div>
      <div>
        <Edit_automation_tabs card={card} isactive={isactive} />
        {/* <Edit_sidebar_tab_description card={card} /> */}
      </div>
    </div>
  );
};

export default edit_automation;
