import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { gloabalcontext } from "../../App.js";

const EditSidebarTabReviewAutomation = ({ card }) => {
  const { setPayload, payload } = useContext(gloabalcontext);
  return (
    <div className="review_automation">
      <Box sx={{ minWidth: 275 }}>
        {card.steps.map((step, index) => (
          <>
            <Card
              variant="outlined"
              className="review_automation_step_card"
              key={index}
            >
              <CardContent>
                <div className="review_automation_step_card">
                  <div className="review_automation_step_icon">
                    <img src={step.icon} alt="" />
                  </div>
                  <div className="review_automation_step_text_area">
                    <span className="review_automation_step_heading">
                      <ReactMarkdown>{step.heading}</ReactMarkdown>
                    </span>
                    <ReactMarkdown>{step.sentence}</ReactMarkdown>
                  </div>
                </div>
              </CardContent>
            </Card>
            {index !== card.steps.length - 1 && (
              <ArrowDownwardIcon className="arrow_icon" />
            )}
          </>
        ))}
      </Box>
    </div>
  );
};

export default EditSidebarTabReviewAutomation;
