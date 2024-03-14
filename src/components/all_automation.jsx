import React, { useEffect, useState, useContext } from "react";
import { get_instances, delete_instance } from "../helpers/api.js";
import { gloabalcontext } from "../App.js";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Drawer from "../components/drawer";
import Loading from "./loading.jsx";
import { RiDeleteBinLine } from "react-icons/ri";

const AllAutomation = () => {
  const [allInstances, setAllInstances] = useState([]);
  const [activeAutomations, setActiveAutomations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setPayload, payload, createFeName, allCards, setDemo, demo } =
    useContext(gloabalcontext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true before fetching data
        const res = await get_instances();
        if (res) {
          setAllInstances(res);
        } else {
          console.log("Failed to fetch contract types");
        }
      } catch (error) {
        console.error("Error fetching instances:", error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching data
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    createObj();
  }, [allInstances]); // Call createObj whenever allInstances changes

  function createObj() {
    const newActiveAutomations = [];
    for (let i = 0; i < allInstances.length; i++) {
      const instance = allInstances[i];

      console.log(demo);
      if (
        instance.integration_name ===
        "CREATE_TEMPORARY_SLACK_CHANNEL_BASED_ON_CONTRACT"
      ) {
        const activeAutomation = {
          ...demo[0],
          contract_type_id: instance.contract_type_id,
          contract_type_name: instance.contract_type_name,
          fe_solution_name: instance.fe_solution_name,
          _id: instance._id,
        };
        newActiveAutomations.push(activeAutomation);
      }
      if (
        instance.integration_name ===
        "ASSIGN_TAGS_BASED_ON_THE_SUB_STATE_ON_THE_CONTRACT"
      ) {
        const activeAutomation = {
          ...demo[1],
          contract_type_id: instance.contract_type_id,
          contract_type_name: instance.contract_type_name,
          fe_solution_name: instance.fe_solution_name,
          _id: instance._id,
        };
        newActiveAutomations.push(activeAutomation);
      }
      if (
        instance.integration_name ===
        "PUT_THE_AGREEMENT_ON_HOLD_IF_THE_COUNTERPARTY_DOES_NOT_SIGN_IT_WITHIN_X_DAYS"
      ) {
        const activeAutomation = {
          ...demo[2],
          contract_type_id: instance.contract_type_id,
          contract_type_name: instance.contract_type_name,
          fe_solution_name: instance.fe_solution_name,
          _id: instance._id,
        };
        newActiveAutomations.push(activeAutomation);
      }
      if (
        instance.integration_name ===
        "CREATE_A_REMINDER_ON_THE_CALENDAR_EVERY_TIME_A_TASK_HAS_CREATED_WITH_A_DUE_DATE"
      ) {
        const activeAutomation = {
          ...demo[3],
          contract_type_id: instance.contract_type_id,
          contract_type_name: instance.contract_type_name,
          fe_solution_name: instance.fe_solution_name,
          _id: instance._id,
          uuid: instance._uuid,
        };
        newActiveAutomations.push(activeAutomation);
      }
    }
    setActiveAutomations(newActiveAutomations);
  }

  const deleteAutomation = async (id) => {
    try {
      setIsLoading(true);
      await delete_instance(id);
      setIsLoading(false);

      setActiveAutomations(
        activeAutomations.filter((automation) => automation._id !== id)
      );
    } catch (error) {
      console.error("Error deleting automation:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : activeAutomations.length === 0 ? (
        <p>No active automations</p>
      ) : (
        <div className="automation_cards_all">
          {activeAutomations.map((automation, index) => (
            <Card
              className="card"
              sx={{ maxWidth: 345, height: 380 }}
              key={index}
            >
              <CardMedia
                sx={{ height: 140 }}
                image={automation.img}
                title="green iguana"
              />
              <CardContent className="card_content">
                <Typography
                  className="card_content_title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {automation.title}
                </Typography>
              </CardContent>
              <CardActions className="card_btns delete_btn">
                <button onClick={() => deleteAutomation(automation._id)}>
                  <span className="delete_icon">
                    {" "}
                    <RiDeleteBinLine size={20} />
                  </span>
                </button>
              </CardActions>
              <CardActions className="card_btns">
                <Drawer card={automation} isactive={true} />
              </CardActions>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default AllAutomation;
