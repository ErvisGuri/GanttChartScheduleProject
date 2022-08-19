import { v4 as uuidv4 } from "uuid";

const StepRenderer = ({ current, steps = [], useKeys = false }) => {
  const { Comp: StepToRender, ...rest } =
    steps?.find((_, index) => index === current) || {};

  return <StepToRender {...rest} {...(!!useKeys ? { key: uuidv4() } : {})} />;
};

export default StepRenderer;
