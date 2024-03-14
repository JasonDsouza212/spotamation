import "./styles/App.css";
import React, { createContext, useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Banner from "./components/banner";
import Tabs from "./components/tabs";
import { create_solution } from "./helpers/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import automation_img_one from "../src/images/automation_img_one.png";
import automation_img_two from "../src/images//automation_img_two.png";
import automation_img_three from "../src/images//automation_img_three.png";
import automation_img_four from "../src/images//automation_image_four.png";
import slack from "../src/images/review_automation_icons/slack.png";
import doc from "../src/images/review_automation_icons/doc.png";
import deleteicon from "../src/images/review_automation_icons/delete.png";
import tag from "../src/images/review_automation_icons/tag.png";
import power_off from "../src/images/review_automation_icons/power_off.png";
import telegram from "../src/images/review_automation_icons/telegram.png";
import calender from "../src/images/review_automation_icons/calender.png";

const gloabalcontext = createContext();

function App() {
  const [payload, setPayload] = useState({
    contract_type_id: null,
    integration_name: null,
    fe_solution_name: null,
    contract_type_name: null,
    internal_bearer_token: "c8fe3aa12663ef719cb8e60001e9e77dac17ca16",
    base_url: "598b-45-117-31-170.ngrok-free.app",
    ws_id: 43714,
    webhook: null,
    testing: false,
    webhook_label: null,
    is_activity_sync_needed: true,
    put_on_hold: {
      duration: null,
      duration_label: null,
      fe_solution_name: null,
    },
  });
  const [demo, setdemo] = useState([
    {
      img: automation_img_one,
      title: "Create Temporary Slack Channel based on contract created",
      description: `Every time a user creates a new contract using the chosen contract type, automation will start a new Slack channel. 
      It will add to the Slack channel the contract's Business User and Legal User. Until the channel is executed, it will be active. After the contract is fulfilled, the channel will be archived.`,

      integration_name: "CREATE_TEMPORARY_SLACK_CHANNEL_BASED_ON_CONTRACT",
      small_description: "This is demo data that will be shown on the card",
      required_fields: [
        "contract_type_id",
        "slack_channel_id",
        "activity_sync_needed",
      ],
      steps: [
        {
          icon: doc,
          heading: "**When:** Contract gets created",
          sentence: `From the contract type : ${
            payload.contract_type_name ? payload.contract_type_name : "NDA"
          }`,
        },
        {
          icon: slack,
          heading: "**Then:** Create a separate Slack channel",
          sentence:
            "And add the Business User, Legal User and **internal signatories** in that slack channel",
        },
        {
          icon: slack,
          heading: "**Until:** Contracts get executed",
          sentence:
            "Automation will share the final PDF on the channel for everyone’s visibility",
        },
      ],
    },
    {
      img: automation_img_two,
      title: "Assign tags based on the sub-state on the contract",
      small_description: "This is demo data that will be shown on the card",
      integration_name: "ASSIGN_TAGS_BASED_ON_THE_SUB_STATE_ON_THE_CONTRACT",
      operation: {
        test: "",
      },
      required_fields: ["slack_channel_id", "activity_sync_needed"],
      steps: [
        {
          icon: doc,
          heading: `When: Contract sub-stage is ${
            payload.webhook_label
              ? payload.webhook_label
              : "Auto_Presend_Approval_In_Progress"
          }`,
          sentence: ``,
        },
        {
          icon: tag,
          heading: "**Then:** Create a separate Slack channel",
          sentence: "",
        },
        {
          icon: tag,
          heading: "Until: The contract moves to the next stage",
          sentence: "",
        },
        {
          icon: deleteicon,
          heading: `Then: Remove the tag ${
            payload.webhook_label
              ? payload.webhook_label
              : "Auto_Presend_Approval_In_Progress"
          } from the contract`,
          sentence: "",
        },
      ],
      description: `The contract is divided into 4 states. 
      - This automation will add tags for sub-stages for the user and remove it once the contract moves from that stage. 
      Draft 
      - Conditional Approval/Pre-send Approval in progress Redlining 
      - Pre-send Approval in progress 
      - Review in progress 
      - Editing in progress 
      - Pending from Counterparty 
      - Ad-hoc Approval in progress`,
    },
    {
      img: automation_img_three,
      title:
        "Put the agreement on hold if the counterparty does not sign it within X days",
      small_description: "This is demo data that will be shown on the card",

      integration_name:
        "PUT_THE_AGREEMENT_ON_HOLD_IF_THE_COUNTERPARTY_DOES_NOT_SIGN_IT_WITHIN_X_DAYS",
      steps: [
        {
          icon: doc,
          heading: `When: Counterparty doesn’t respond to the contract for ${
            payload.put_on_hold.duration_label
              ? payload.put_on_hold.duration_label
              : "X  days"
          }`,
          sentence: "",
        },
        {
          icon: power_off,
          heading: "Then: Move the contract to On Hold",
          sentence: "",
        },
        {
          icon: telegram,
          heading:
            "And: Notify the Business User and Counterparty about it via email.",
          sentence: "",
        },
      ],
      description: `All active contracts that are sent to the counterparty and the counterparty does not answer within X days, the automation will change the contract status to On Hold`,
    },
    {
      img: automation_img_four,
      title: "Create a reminder on the calendar every time a task is created ",
      small_description: "This is demo data that will be shown on the card",
      operation: {
        test: "",
      },
      integration_name:
        "CREATE_A_REMINDER_ON_THE_CALENDAR_EVERY_TIME_A_TASK_HAS_CREATED_WITH_A_DUE_DATE",
      steps: [
        {
          icon: doc,
          heading: "When: User creates a task with a deadline",
          sentence: "",
        },
        {
          icon: calender,
          heading:
            "Then: Sets up a reminder for the deadline on the assigner's and assignee's calendars",
          sentence: "",
        },
      ],
      description: `This automation sets up a reminder on the assigner's and assignee's calendars whenever a user creates a task from the task center with a deadline.`,
    },
  ]);

  const [loading, isloading] = useState(false);

  function create_fe_name(card, data) {
    let name = "";
    switch (card.integration_name) {
      case "CREATE_TEMPORARY_SLACK_CHANNEL_BASED_ON_CONTRACT":
        name = `Create slack channel when contract gets created from contract type -> ${data} `;
        break;
      case "ASSIGN_TAGS_BASED_ON_THE_SUB_STATE_ON_THE_CONTRACT":
        name = `Put tag on the contract if ${data} is in progress`;
        break;
      case "PUT_THE_AGREEMENT_ON_HOLD_IF_THE_COUNTERPARTY_DOES_NOT_SIGN_IT_WITHIN_X_DAYS":
        name = `Put the agreement on hold if the counterparty does not sign the contract after -> ${data} `;
        break;
      case "CREATE_A_REMINDER_ON_THE_CALENDAR_EVERY_TIME_A_TASK_HAS_CREATED_WITH_A_DUE_DATE":
        name = `Create a reminder on the calendar every time a task has created with a due date`;
        break;
      default:
        name = card.integration_name;
    }
    return name;
  }

  const resetPayloadToNull = () => {
    setPayload({
      contract_type_id: null,
      contract_type_name: null,
      integration_name: null,
      testing: false,
      fe_solution_name: null,
      webhook: null,
      webhook_label: null,
      internal_bearer_token: "c8fe3aa12663ef719cb8e60001e9e77dac17ca16",
      base_url: "598b-45-117-31-170.ngrok-free.app",
      ws_id: 43714,
      is_activity_sync_needed: null,
      put_on_hold: {
        duration: null,
        duration_label: null,
        fe_solution_name: null,
      },
    });
    isloading(false);
  };

  const handle_create_solution = async () => {
    isloading(true);
    console.log(payload);
    const res = await create_solution(payload);
    console.log(res);
    if (res) {
      console.log(res);
      toast.success(
        "Congratulations! The automation was created 🎉, successfully",
        {}
      );
      resetPayloadToNull();
      isloading(false);
    } else {
      toast.error("Something went wrong while creating automation", {});
    }
  };

  useEffect(() => {
    console.log(JSON.stringify(payload));
  }, [payload, setPayload]);

  let all_cards = [
    {
      img: automation_img_one,
      title: "Create Slack channel based on contract type",
      description: `Every time a user creates a new contract using the chosen contract type, automation will start a new Slack channel. 
      It will add to the Slack channel the contract's Business User and Legal User. Until the channel is executed, it will be active. After the contract is fulfilled, the channel will be archived.`,

      integration_name: "CREATE_TEMPORARY_SLACK_CHANNEL_BASED_ON_CONTRACT",
      small_description:
        "When a user creates a contract using the chosen contract type, automation will create a new slack channel and add BU and Legal user",
      required_fields: [
        "contract_type_id",
        "slack_channel_id",
        "activity_sync_needed",
      ],
      steps: [
        {
          icon: doc,
          heading: "**When:** Contract gets created",
          sentence: `From the contract type : ${
            payload.contract_type_name ? payload.contract_type_name : "NDA"
          }`,
        },
        {
          icon: slack,
          heading: "**Then:** Create a separate Slack channel",
          sentence:
            "And add the Business User, Legal User and **internal signatories** in that slack channel",
        },
        {
          icon: slack,
          heading: "**Until:** Contracts get executed",
          sentence:
            "Automation will share the final PDF on the channel for everyone’s visibility",
        },
      ],
    },
    {
      img: automation_img_two,
      title: "Assign tags based on the sub-state on the contract",
      small_description:
        "When the counterparty does not sign the contract after a predetermined number of days, automation will beg",
      integration_name: "ASSIGN_TAGS_BASED_ON_THE_SUB_STATE_ON_THE_CONTRACT",
      operation: {
        test: "",
      },
      required_fields: ["slack_channel_id", "activity_sync_needed"],
      steps: [
        {
          icon: doc,
          heading: `When: Contract sub-stage is ${
            payload.webhook_label
              ? payload.webhook_label
              : "Auto_Presend_Approval_In_Progress"
          }`,
          sentence: ``,
        },
        {
          icon: tag,
          heading: "**Then:** Create a separate Slack channel",
          sentence: "",
        },
        {
          icon: tag,
          heading: "Until: The contract moves to the next stage",
          sentence: "",
        },
        {
          icon: deleteicon,
          heading: `Then: Remove the tag ${
            payload.webhook_label
              ? payload.webhook_label
              : "Auto_Presend_Approval_In_Progress"
          } from the contract`,
          sentence: "",
        },
      ],
      description: `The contract is divided into 4 states. 
      - This automation will add tags for sub-stages for the user and remove it once the contract moves from that stage. 
      Draft 
      - Conditional Approval/Pre-send Approval in progress Redlining 
      - Pre-send Approval in progress 
      - Review in progress 
      - Editing in progress 
      - Pending from Counterparty 
      - Ad-hoc Approval in progress`,
    },
    {
      img: automation_img_three,
      title:
        "Put the agreement on hold if the counterparty does not sign it after X days.",
      small_description:
        "Automation will add the sub-state tag if the user is carrying out those sub state action, and it will remove the tags after the user has finished them.",
      operation: {
        test: "",
      },
      integration_name:
        "PUT_THE_AGREEMENT_ON_HOLD_IF_THE_COUNTERPARTY_DOES_NOT_SIGN_IT_WITHIN_X_DAYS",
      steps: [
        {
          icon: doc,
          heading: `When: Counterparty doesn’t respond to the contract for ${
            payload.put_on_hold.duration_label
              ? payload.put_on_hold.duration_label
              : "X days"
          } `,
          sentence: "",
        },
        {
          icon: power_off,
          heading: "Then: Move the contract to On Hold",
          sentence: "",
        },
        {
          icon: telegram,
          heading:
            "And: Notify the Business User and Counterparty about it via email.",
          sentence: "",
        },
      ],
      description: `All active contracts that are sent to the counterparty and the counterparty does not answer within X days, the automation will change the contract status to On Hold`,
    },
    {
      img: automation_img_four,
      title: "Create a reminder on the calendar every time a task is created ",
      small_description:
        "Automation will add reminder on the assigner's and assignee's calendars on a due date of the task.",
      operation: {
        test: "",
      },
      integration_name:
        "CREATE_A_REMINDER_ON_THE_CALENDAR_EVERY_TIME_A_TASK_HAS_CREATED_WITH_A_DUE_DATE",
      steps: [
        {
          icon: doc,
          heading: "When: User creates a task with a deadline",
          sentence: "",
        },
        {
          icon: calender,
          heading:
            "Then: Sets up a reminder for the deadline on the assigner's and assignee's calendars",
          sentence: "",
        },
      ],
      description: `This automation sets up a reminder on the assigner's and assignee's calendars whenever a user creates a task from the task center with a deadline.`,
    },
  ];
  const globalvals = {
    payload,
    setPayload,
    resetPayloadToNull,
    handle_create_solution,
    create_fe_name,
    loading,
    isloading,
    all_cards,
    demo,
    setdemo,
  };
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <gloabalcontext.Provider value={globalvals}>
        <div className="App">
          <Navbar />
          <Banner />
          <Tabs />
          {/* <Card /> */}
        </div>
      </gloabalcontext.Provider>
    </>
  );
}

export default App;
export { gloabalcontext };
