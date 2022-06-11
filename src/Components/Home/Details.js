import React from "react";
import { Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

const Details = (props) => {
  return (
    <>
      <ArrowBack
        onClick={() => props?.setScreen({ screenType: "home", data: null })}
      />
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Details</Typography>
        </div>
        <div>
          <img src="" alt="Image" />
          {props?.data?.keys?.map((key) => (
            <Typography>{props?.data?.row?.[key]}</Typography>
          ))}
        </div>
      </div>
    </>
  );
};

export default Details;
