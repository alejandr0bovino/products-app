import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div className="theme-loading__wrapper">
      <Spinner animation="grow" size="lg" />
    </div>
  );
}

export { Loading };
