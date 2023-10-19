import React, { useState } from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import ButtonGroup from "layouts/home/components/elements/ButtonGroup";
import Button from "layouts/home/components/elements/Button";
import Image from "layouts/home/components/elements/Image";
import VideoPlaceHolderImage from "assets/images/video-placeholder.jpg";

const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

const HeroSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {
  const outerClasses = classNames(
    "hero section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <div className={splitClasses}>
            <div className="split-item">
              <div className="hero-content split-item-content center-content-mobile reveal-from-top">
                <h1 className="mt-0 mb-16">CircuitRP </h1>
                <p className="mt-0 mb-32">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                {/* <ButtonGroup>
                  <Button
                    tag="a"
                    color="primary"
                    href="http://localhost:3000/authentication/sign-in"
                    wideMobile
                  >
                    Sign In
                  </Button>
                  <Button tag="a" color="dark" href="https://cruip.com/" wideMobile>
                    Learn more
                  </Button>
                </ButtonGroup> */}
              </div>
              <div className="hero-figure split-item-image split-item-image-fill illustration-element-01 reveal-from-bottom">
                <Image src="https://picsum.photos/528/396" alt="Hero" width={528} height={396} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroSplit.propTypes = propTypes;
HeroSplit.defaultProps = defaultProps;

export default HeroSplit;
