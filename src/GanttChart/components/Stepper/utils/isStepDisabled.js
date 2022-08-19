/**
 *
 * @param {Object} completedSteps Object of the completed steps.
 * @param {int} currentStep Index of the current step.
 * @param {int} index Index of the step.
 * @returns {Boolean} false || true
 */

export const isStepDisabled = (completedSteps = {}, currentStep, index) =>
  !!completedSteps[index] || !!completedSteps[index - 1]
    ? false
    : index > currentStep
