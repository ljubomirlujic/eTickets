import React from "react";
import EditEventManager from "../event/EditEventManager";
function EditEventView(props) {
  return <EditEventManager event={props.event} />;
}

export default EditEventView;
