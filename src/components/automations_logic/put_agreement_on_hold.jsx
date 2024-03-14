import React, { useState, useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { gloabalcontext } from "../../App.js";

const PutAgreementOnHold = ({ card }) => {
  const { setPayload, payload, create_fe_name } = useContext(gloabalcontext);
  // Renamed component to start with uppercase letter
  const duration = [
    {
      id: "24",
      value: "Today",
    },
    {
      id: "48",
      value: "Yesterday",
    },
    {
      id: "168",
      value: "Last 7 days",
    },
    {
      id: "720",
      value: "last 30 days",
    },
    {
      id: "1440",
      value: "Last 60 days",
    },
    {
      id: "2160",
      value: "Last 90 days",
    },
    {
      id: "4320",
      value: "last 180 days",
    },
    {
      id: "8760",
      value: "Last 1 year",
    },
  ];
  const [selectedWebhookTrigger, setSelectedWebhookTrigger] = useState("");

  const handleChange = (event) => {
    const sp = event.target.value.split(",");
    const fe = create_fe_name(card, sp[1]);
    setPayload({
      ...payload,
      put_on_hold: {
        ...payload.put_on_hold,
        duration: sp[0],
        duration_label: sp[1],
      },
      integration_name: card.integration_name,
      fe_solution_name: fe,
    });
    setSelectedWebhookTrigger(event.target.value);
  };

  return (
    <div className="put_agreement_on_hold">
      <div>
        <div className="put_agreement_on_hold_description">
          Please choose a time frame after which we move contracts on which the
          counterparty does not respond so that we can set up an automated
          system to place contracts on hold.
        </div>

        <FormControl sx={{ m: 1, minWidth: 500 }}>
          <InputLabel id="webhook-trigger-label">Select Duration</InputLabel>
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
            {duration.map((trigger) => (
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

export default PutAgreementOnHold; // Renamed export to match component name
