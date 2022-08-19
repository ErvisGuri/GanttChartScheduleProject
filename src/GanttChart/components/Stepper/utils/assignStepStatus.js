/**
 *
 * @param {Object} completedSteps Object of the completed steps.
 * @param {int} index Index of the step that we are assigning the status.
 * @returns "finish","process" or "wait"
 */

export const assignStepStatus = (completedSteps = {}, index) =>
  !!completedSteps[index]
    ? "finish"
    : !!completedSteps[index - 1] || index === 0
    ? "process"
    : "wait"
