import React from "react";

const EditSidebarTabDescription = ({ card }) => {
  const lines = card.description.split("\n");
  return (
    <div className="edit_sidebar_tab_description">
      <div>
        <img src={card.img} alt="" className="description_img" />
      </div>
      <div>
        <br></br>
        <div>Description</div>
        <br></br>
        <ul style={{ listStyle: "none" }} className="description_ul">
          {lines.map((line, index) =>
            line.includes("-") ? (
              <>
                <li key={index} className="blockquote">
                  {line}
                </li>
              </>
            ) : (
              <>
                <br></br>
                <li className="none_blockquote " key={index}>
                  {line}
                </li>
              </>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default EditSidebarTabDescription;
