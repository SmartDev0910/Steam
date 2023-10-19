import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Switch from "../elements/Switch";
import Button from "../elements/Button";

const propTypes = {
  ...SectionTilesProps.types,
  pricingSwitcher: PropTypes.bool,
  pricingSlider: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
  pricingSwitcher: false,
  pricingSlider: false,
};

class StarterGuide extends React.Component {
  state = {
    priceChangerValue: "4",
    priceInput: {
      0: "1,000",
      1: "1,250",
      2: "1,500",
      3: "2,000",
      4: "2,500",
      5: "3,500",
      6: "6,000",
      7: "15,000",
      8: "50,000",
    },
    priceOutput: {
      plan1: {
        0: ["$", "0", "/m"],
        1: ["$", "13", "/m"],
        2: ["$", "17", "/m"],
        3: ["$", "21", "/m"],
        4: ["$", "27", "/m"],
        5: ["$", "42", "/m"],
        6: ["$", "58", "/m"],
        7: ["$", "117", "/m"],
        8: ["$", "208", "/m"],
      },
      plan2: {
        0: ["$", "13", "/m"],
        1: ["$", "17", "/m"],
        2: ["$", "21", "/m"],
        3: ["$", "25", "/m"],
        4: ["$", "47", "/m"],
        5: ["$", "58", "/m"],
        6: ["$", "117", "/m"],
        7: ["$", "208", "/m"],
        8: ["$", "299", "/m"],
      },
      plan3: {
        0: ["$", "17", "/m"],
        1: ["$", "21", "/m"],
        2: ["$", "25", "/m"],
        3: ["$", "42", "/m"],
        4: ["$", "67", "/m"],
        5: ["$", "117", "/m"],
        6: ["$", "208", "/m"],
        7: ["$", "299", "/m"],
        8: ["$", "499", "/m"],
      },
    },
  };

  slider = React.createRef();
  sliderValue = React.createRef();

  componentDidMount() {}

  handleStarterGuideSwitch = (e) => {
    this.setState({ priceChangerValue: e.target.checked ? "1" : "0" });
  };

  handleStarterGuideSlide = (e) => {
    this.setState({ priceChangerValue: e.target.value });
    this.handleSliderValuePosition(e.target);
  };

  handleSliderValuePosition = (input) => {
    const multiplier = input.value / input.max;
    const thumbOffset = this.thumbSize * multiplier;
    const priceInputOffset = (this.thumbSize - this.sliderValue.current.clientWidth) / 2;
    this.sliderValue.current.style.left =
      input.clientWidth * multiplier - thumbOffset + priceInputOffset + "px";
  };

  getStarterGuideData = (values, set) => {
    return set !== undefined
      ? values[this.state.priceChangerValue][set]
      : values[this.state.priceChangerValue];
  };

  render() {
    const {
      className,
      topOuterDivider,
      bottomOuterDivider,
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      pushLeft,
      pricingSwitcher,
      pricingSlider,
      ...props
    } = this.props;

    const outerClasses = classNames(
      "pricing section",
      topOuterDivider && "has-top-divider",
      bottomOuterDivider && "has-bottom-divider",
      hasBgColor && "has-bg-color",
      invertColor && "invert-color",
      className
    );

    const innerClasses = classNames(
      "pricing-inner section-inner",
      topDivider && "has-top-divider",
      bottomDivider && "has-bottom-divider"
    );

    const tilesClasses = classNames("tiles-wrap", pushLeft && "push-left");

    const sectionHeader = {
      title: "Starter Guide",
      paragraph: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    };

    return (
      <section {...props} className={outerClasses} id="starter-guide">
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content invert-color" />
          </div>
        </div>
      </section>
    );
  }
}

StarterGuide.propTypes = propTypes;
StarterGuide.defaultProps = defaultProps;

export default StarterGuide;
