import React from "react";
import MainLayout from "../layouts/MainLayout";
import successImage from "../assets/img/success.png";

function SuccessPage() {
  return (
    <MainLayout>
      <div className="successPurchase">
        <div>
          <img src={successImage} alt="success purchase image" />
          <h2>Successful shopping :)</h2>
        </div>
      </div>
    </MainLayout>
  );
}

export default SuccessPage;
