import React, { useEffect, useState } from "react";
import Create_slack_channel from "../automations_logic/create_slack_channel";
import Assign_tags_automation from "../automations_logic/assign_tags_automation";
import Put_agreement_on_hold from "../automations_logic/put_agreement_on_hold";

const EditSidebarTabAdditionalData = ({ card, valueind, setValue }) => {
  console.log(valueind + "demo");
  return (
    <>
      <div>
        {card.integration_name ===
          "CREATE_TEMPORARY_SLACK_CHANNEL_BASED_ON_CONTRACT" && (
          <Create_slack_channel card={card} />
        )}
        {card.integration_name ===
          "ASSIGN_TAGS_BASED_ON_THE_SUB_STATE_ON_THE_CONTRACT" && (
          <Assign_tags_automation card={card} />
        )}
        {card.integration_name ===
          "PUT_THE_AGREEMENT_ON_HOLD_IF_THE_COUNTERPARTY_DOES_NOT_SIGN_IT_WITHIN_X_DAYS" && (
          <Put_agreement_on_hold card={card} />
        )}
        {card.integration_name ===
          "CREATE_A_REMINDER_ON_THE_CALENDAR_EVERY_TIME_A_TASK_HAS_CREATED_WITH_A_DUE_DATE" && (
          <Create_slack_channel card={card} />
        )}
      </div>
    </>
  );
};

export default EditSidebarTabAdditionalData;
