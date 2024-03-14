import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Card from "../components/card";
import All_automation from "./all_automation";

const Tabs = () => {
  const tabs = ["All Automations", "Active Automations"];
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          {tabs.map((tab, index) => (
            <Tab
              className="tab_btn"
              key={index}
              label={tab}
              value={(index + 1).toString()}
            />
          ))}
        </TabList>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={(index + 1).toString()}>
            {tab === "All Automations" ? <Card /> : <All_automation />}
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
};

export default Tabs;
