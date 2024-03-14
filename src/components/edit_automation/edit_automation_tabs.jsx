import React, { useContext, useEffect } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Card from "../card";
import EditSidebarTabDescription from "./edit_sidebar_tab_description";
import EditSidebarTabAdditionalData from "./edit_sidebar_tab_additional_data";
import EditSidebarTabReviewAutomation from "./edit_sidebar_tab_review_automation";
import { gloabalcontext } from "../../App.js";

const EditAutomationTabs = ({ card, isactive }) => {
  const {
    handle_create_solution,
    setPayload,
    payload,
    loading,
    create_fe_name,
  } = useContext(gloabalcontext);
  const tabs = ["Description", "Required fields", "Review automation"];
  const tabs2 = ["Description", "Review automation"];
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handle_create_solution_2() {
    let fe = create_fe_name(card, "");
    setPayload({
      ...payload,
      integration_name: card.integration_name,
      fe_solution_name: fe,
    });
  }

  useEffect(() => {
    if (
      payload.integration_name ===
      "CREATE_A_REMINDER_ON_THE_CALENDAR_EVERY_TIME_A_TASK_HAS_CREATED_WITH_A_DUE_DATE"
    ) {
      handle_create_solution();
    }
  }, [payload]);

  return (
    <>
      {isactive ? (
        <div className="active_automations">
          {" "}
          <EditSidebarTabReviewAutomation card={card} isactive={isactive} />
        </div>
      ) : (
        <div className="edit_automation_tabs">
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {card.integration_name ===
              "CREATE_A_REMINDER_ON_THE_CALENDAR_EVERY_TIME_A_TASK_HAS_CREATED_WITH_A_DUE_DATE"
                ? tabs2.map((tab, index) => (
                    <Tab
                      className="tab_btn"
                      key={tab} // Use the tab label as the key
                      label={` ${tab}`}
                      value={(index + 1).toString()}
                    />
                  ))
                : tabs.map((tab, index) => (
                    <Tab
                      className="tab_btn"
                      key={tab} // Use the tab label as the key
                      label={` ${tab}`}
                      value={(index + 1).toString()}
                    />
                  ))}
            </TabList>

            {card.integration_name ===
            "CREATE_A_REMINDER_ON_THE_CALENDAR_EVERY_TIME_A_TASK_HAS_CREATED_WITH_A_DUE_DATE"
              ? tabs2.map((tab, index) => (
                  <TabPanel key={index} value={(index + 1).toString()}>
                    {tab === "Description" ? (
                      <EditSidebarTabDescription
                        card={card}
                        handleChange={handleChange}
                        valueind={value}
                        setValue={setValue}
                      />
                    ) : tab === "Review automation" ? (
                      <EditSidebarTabReviewAutomation
                        card={card}
                        handleChange={handleChange}
                        valueind={value}
                        setValue={setValue}
                      />
                    ) : null}
                  </TabPanel>
                ))
              : tabs.map((tab, index) => (
                  <TabPanel key={index} value={(index + 1).toString()}>
                    {tab === "Description" ? (
                      <EditSidebarTabDescription
                        card={card}
                        handleChange={handleChange}
                        valueind={value}
                        setValue={setValue}
                      />
                    ) : tab === "Required fields" ? (
                      <EditSidebarTabAdditionalData
                        card={card}
                        handleChange={handleChange}
                        valueind={value}
                        setValue={setValue}
                      />
                    ) : tab === "Review automation" ? (
                      <EditSidebarTabReviewAutomation
                        card={card}
                        handleChange={handleChange}
                        valueind={value}
                        setValue={setValue}
                      />
                    ) : null}
                  </TabPanel>
                ))}
          </TabContext>
          <div className="bottom_nav">
            <div className="screen_1">
              {value === "1" && (
                <button
                  className="next_btn"
                  onClick={() => {
                    setValue("2");
                  }}
                >
                  Next
                </button>
              )}
            </div>
            <div className="screen_2">
              {card.integration_name !==
                "CREATE_A_REMINDER_ON_THE_CALENDAR_EVERY_TIME_A_TASK_HAS_CREATED_WITH_A_DUE_DATE" &&
                value === "2" && (
                  <>
                    <div>
                      <button
                        className="back_btn"
                        onClick={() => {
                          setValue("1");
                        }}
                      >
                        Back
                      </button>
                    </div>
                    <div>
                      <button
                        className="next_btn"
                        onClick={() => {
                          setValue("3");
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
            </div>
            <div className="screen_3">
              {" "}
              {card.integration_name ===
                "CREATE_A_REMINDER_ON_THE_CALENDAR_EVERY_TIME_A_TASK_HAS_CREATED_WITH_A_DUE_DATE" &&
                value === "2" && (
                  <>
                    <div>
                      <button
                        className="next_btn"
                        onClick={() => {
                          setValue("1");
                        }}
                      >
                        Back
                      </button>
                    </div>
                    <div className="btn_two create_automation_trigger_btn">
                      <button
                        className="next_btn"
                        disabled={loading}
                        onClick={() => {
                          handle_create_solution_2();
                        }}
                        style={{
                          backgroundColor: loading ? "grey" : "",
                        }}
                      >
                        Complete and Enable Automation {loading && "..."}
                      </button>
                    </div>
                  </>
                )}
            </div>
            {value === "3" && (
              <>
                <div className="all_last_screen_btn">
                  <div>
                    <button
                      className="next_btn"
                      onClick={() => {
                        setValue("2");
                      }}
                    >
                      Back
                    </button>
                  </div>
                  <div className="btn_two create_automation_trigger_btn">
                    <button
                      className="next_btn"
                      disabled={loading}
                      onClick={() => {
                        handle_create_solution();
                      }}
                      style={{
                        backgroundColor: loading ? "grey" : "",
                      }}
                    >
                      Complete and Enable Automation {loading && "..."}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EditAutomationTabs;
