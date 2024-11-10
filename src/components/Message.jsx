import React from "react";
import PropTypes from "prop-types";

const Message = ({ message, type }) => {
  return (
    <div
      className={`p-4 rounded-md flex border-[1.5px] flex-col gap-2 w-[calc(25%+40px)] ${
        type === "success"
          ? "bg-green-100 border-green-300"
          : "bg-red-100 border-red-300"
      }`}
    >
      <span
        className={`font-bold ${
          type === "success" ? "text-green-500" : "text-red-500"
        }`}
      >
        {type === "success" ? "Success" : "Oops!"}
      </span>
      <p className={`text-${type === "success" ? "green" : "red"}-500 text-sm`}>
        {message}
      </p>
    </div>
  );
};

export default Message;

Message.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
};
