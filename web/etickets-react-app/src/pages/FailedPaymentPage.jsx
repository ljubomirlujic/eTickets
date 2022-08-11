import React from "react";
import MainLayout from "../layouts/MainLayout";
import unSuccessImage from "../assets/img/unsuccess.PNG";

function FailedPaymentPage() {
  return (
    <MainLayout>
      <div className="successPurchase">
        <div>
          <img src={unSuccessImage} alt="unsuccess purchase image" />
          <h2>Failed shopping :(</h2>
        </div>
      </div>
    </MainLayout>
  );
}

export default FailedPaymentPage;
