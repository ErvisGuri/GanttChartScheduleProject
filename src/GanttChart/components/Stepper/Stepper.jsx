import { useContext } from "react";
import { Steps } from "antd";
import { StepRenderer } from "./components";
import "./Stepper.scss";

/**
 * Customized AntD stepper.
 *
 * A customized AntD stepper that accepts all the properties of the AntD stepper.
 *
 * @param {int} currentStep  Active step's index. Should be saved in the state.
 * @param {function} setCurrentStep  Function that sets the active step.
 * @param {Array} steps  Array containing an object list of the steps. Step's object should have:
 *                        title - The title that is gonna appear on the stepper.
 *                        Comp - Component to be rendered.
 *                        disabled - Whether the step is disabled or not.
 *                        Any other key is gonna be passed as a prop to the Comp.
 * @param {String} [stepperClassName] Stepper's Container class name.
 * @param {String} [componentContainerClassName] Rendered Component's class name.
 * @returns {Node} Component of the active step.
 */
const Stepper = ({
  currentStep: current,
  setCurrentStep,
  size = "small",
  steps = [],
  stepperClassName = "",
  stepRenderer = true,
  componentContainerClassName = "",
  useKeys = false,
  onChange = () => {},
  ...rest
}) => {
  const { Step } = Steps;

  return (
    <>
      <div className={`antCustomStepper ${stepperClassName}`.trim()}>
        <Steps
          {...{
            size,
            current,
            onChange: (curr) => {
              onChange(curr);
              setCurrentStep(curr);
            },
            type: "navigation",
            ...rest,
          }}
        >
          {steps?.map(({ title, disabled = false, status }, key) => (
            <Step {...{ title, status, disabled, key }} />
          ))}
        </Steps>
      </div>
      {stepRenderer && (
        <div className={componentContainerClassName}>
          <StepRenderer
            {...{
              current,
              steps,
              useKeys,
            }}
          />
        </div>
      )}
    </>
  );
};

export default Stepper;
