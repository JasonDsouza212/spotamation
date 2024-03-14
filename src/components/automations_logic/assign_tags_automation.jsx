import React, { useState, useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { gloabalcontext } from "../../App.js";

const AssignTagsAutomation = ({ card }) => {
  const { setPayload, payload, create_fe_name } = useContext(gloabalcontext);
  const webhookTriggers = [
    {
      id: "CONTRACT_REVIEW",
      value: "Contract review In progress",
    },
    {
      id: "CONTRACT_APPROVAL_REQUESTED",
      value: "Contract Approval In Progress",
    },
    {
      id: "CONTRACT_EDITING",
      value: "Contract Editing In Progress",
    },
  ];

  const [selectedWebhookTrigger, setSelectedWebhookTrigger] = useState("");

  const handleChange = (event) => {
    const sp = event.target.value.split(",");
    const fe = create_fe_name(card, sp[1]);
    setPayload({
      ...payload,
      webhook: sp[0],
      webhook_label: sp[1],
      integration_name: card.integration_name,
      fe_solution_name: fe,
    });
    setSelectedWebhookTrigger(event.target.value);
  };

  return (
    <div className="assign_tags_automation">
      <div>
        <div className="assign_tags_automation_description">
          In order to establish an automated tag that will assist you in finding
          certain contracts, select the contract's sub-stage
        </div>

        <FormControl sx={{ m: 1, minWidth: 500 }}>
          <InputLabel id="webhook-trigger-label">Webhook Trigger</InputLabel>
          <Select
            labelId="webhook-trigger-label"
            id="webhook-trigger-select"
            value={selectedWebhookTrigger}
            onChange={handleChange}
            autoWidth
            label="Webhook Trigger"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {webhookTriggers.map((trigger) => (
              <MenuItem
                key={trigger.id}
                value={`${trigger.id}, ${trigger.value}`}
              >
                {trigger.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default AssignTagsAutomation;
