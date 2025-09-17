export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export function calculateFit(
  box: Dimensions,
  container: Dimensions,
  numBoxes: number,
  stackable: boolean
) {
  // How many boxes fit per axis
  const fitX = Math.floor(container.length / box.length);
  const fitY = Math.floor(container.width / box.width);
  const fitZ = Math.floor(container.height / box.height);

  let boxesPerContainer = 0;

  if (stackable) {
    // Full stacking allowed
    boxesPerContainer = fitX * fitY * fitZ;
  } else {
    // Non-stackable → only 1 layer
    boxesPerContainer = fitX * fitY;
  }

  const totalContainers = Math.ceil(numBoxes / boxesPerContainer);

  return {
    fitX,
    fitY,
    fitZ,
    boxesPerContainer,
    totalContainers,
  };
}
