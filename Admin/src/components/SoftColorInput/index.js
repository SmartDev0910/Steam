import React, { useState, useEffect } from "react";
import { Input } from "@mui/material";
import { SketchPicker } from "react-color";
import PropTypes from "prop-types";

const SoftColorInput = ({ color, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (selectedColor) => {
    onChange(selectedColor.hex);
  };

  useEffect(() => {
    // This will run whenever `color` prop changes
    onChange(color);
  }, [color, onChange]);

  return (
    <div style={{ position: "relative" }}>
      <Input
        value={color}
        onFocus={handleClick}
        onBlur={handleClose}
        style={{ cursor: "pointer" }}
      />
      {displayColorPicker ? (
        <div style={{ position: "absolute", bottom: "50px" }}>
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

SoftColorInput.propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SoftColorInput.defaultProps = {
  color: "#000000",
};

export default SoftColorInput;
