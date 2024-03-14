import React, { useEffect, useState, useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { fetchContractTypes } from "../../helpers/api";
import { gloabalcontext } from "../../App.js";

const CreateSlackChannel = ({ card }) => {
  const { setPayload, payload, create_fe_name } = useContext(gloabalcontext);
  const [contractTypes, setContractTypes] = useState([]);
  const [selectedContractType, setSelectedContractType] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSwitchChange = (event) => {
    setPayload({
      ...payload,
      is_activity_sync_needed: event.target.checked,
    });
    setChecked(event.target.checked);
  };

  const handleChange = (event) => {
    const sp = event.target.value.split(",");
    const fe = create_fe_name(card, sp[1]);
    setPayload({
      ...payload,
      contract_type_id: sp[0],
      contract_type_name: sp[1],
      integration_name: card.integration_name,
      fe_solution_name: fe,
    });

    setSelectedContractType(event.target.value);
  };

  useEffect(() => {
    const fetchContractTypesData = async () => {
      try {
        const data = await fetchContractTypes();

        if (data) {
          setContractTypes(data); // Update state with fetched data
        } else {
          console.log("Failed to fetch contract types");
        }
      } catch (error) {
        console.error("Error fetching contract types:", error);
      }
    };

    if (card.required_fields.includes("contract_type_id")) {
      fetchContractTypesData(); // Call the fetch function to get contract types
    }
  }, []); // Empty dependency array to run effect only once

  return (
    <div>
      {contractTypes && (
        <div>
          <FormControl sx={{ m: 1, minWidth: 500 }}>
            <InputLabel id="contract-type-label">Contract Type</InputLabel>
            <Select
              labelId="contract-type-label"
              id="contract-type-select"
              value={selectedContractType}
              onChange={handleChange} // Corrected: Removed parentheses ()
              autoWidth
              label="Contract Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {contractTypes.map((ctype) => (
                <MenuItem key={ctype.id} value={`${ctype.id}, ${ctype.name}`}>
                  {ctype.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
      {card.required_fields.includes("contract_type_id") && (
        <div className="slider_part">
          <div>
            <span className="slider_part_heading">
              Sync activity log with the new Slack channel
            </span>
            <br />
            <br />
            <span className="slider_part_description">
              If enabled, you will be able to see all the activity log happening
              on the contract on a separate channel.
            </span>
          </div>
          <div>
            <Switch
              checked={checked}
              onChange={handleSwitchChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSlackChannel;
