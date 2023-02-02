import React from "react";

import "./GoButton.scss";

const GoButton = () => {
  return (
    <div id="container">
      <button id="goButton" class="learn-more">
        <span class="circle" aria-hidden="true">
          <span class="icon arrow"></span>
        </span>
        <span class="button-text">사연 작성하러가기</span>
      </button>
    </div>
  );
};

export default GoButton;
