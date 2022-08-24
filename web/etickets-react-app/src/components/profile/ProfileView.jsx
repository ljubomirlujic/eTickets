import React from "react";
import { Tabs } from "antd";
import { useState } from "react";

import ProfileForm from "./ProfileForm";
import ChangePasswordComponent from "./ChangePasswordComponent";

function ProfileView(props) {
  const { TabPane } = Tabs;
  const [activeKey, setActiveKey] = useState("1");
  const onKeyChange = (key) => setActiveKey(key);

  return (
    <div className="profile-container">
      <Tabs
        type="card"
        centered="true"
        defaultActiveKey="1"
        activeKey={activeKey}
        onChange={onKeyChange}
      >
        <TabPane tab="Profile" key="1">
          <div className="profile-tab">
            <div className="profile-heading">
              <h2>Profile data</h2>
            </div>
            <div id="profile-data">
              <ProfileForm changeData={props.changeData} user={props.user} />
            </div>
          </div>
        </TabPane>
        <TabPane tab="Change password" key="2">
          <div className="change-password-form">
            <div className="profile-heading">
              <h2>Change password</h2>
            </div>
            <ChangePasswordComponent changePassword={props.changePassword} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileView;
