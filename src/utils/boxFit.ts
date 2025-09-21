export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface BoxType {
  id: string;
  dimensions: Dimensions;
  quantity: number;
  stackable: boolean; 
}

export interface Container {
  dimensions: Dimensions;
  boxes: PlacedBox[];
}

export interface PlacedBox {
  boxId: string;
  orientation: Dimensions;
  position: { x: number; y: number; z: number };
}

function generateOrientations(box: Dimensions): Dimensions[] {
  const { length, width, height } = box;
  return [
    { length, width, height },
    { length, height, width },
    { width, length, height },
    { width, height, length },
    { height, length, width },
    { height, width, length },
  ];
}

export function packBoxesIntoContainers(
  boxes: BoxType[],
  containerDim: Dimensions
): Container[] {
  const containers: Container[] = [];
  const allBoxes: { id: string; dimensions: Dimensions; stackable: boolean }[] = [];

 
  for (const boxType of boxes) {
    for (let i = 0; i < boxType.quantity; i++) {
      allBoxes.push({
        id: boxType.id,
        dimensions: boxType.dimensions,
        stackable: boxType.stackable,
      });
    }
  }

  
  allBoxes.sort(
    (a, b) =>
      b.dimensions.length * b.dimensions.width * b.dimensions.height -
      a.dimensions.length * a.dimensions.width * a.dimensions.height
  );


let currentContainer: Container = { dimensions: containerDim, boxes: [] };

  for (const box of allBoxes) {
    let placed = false;

    for (const orientation of generateOrientations(box.dimensions)) {
      if (
        orientation.length <= containerDim.length &&
        orientation.width <= containerDim.width &&
        orientation.height <= containerDim.height
      ) {
        let pos = { x: 0, y: 0, z: 0 };

        if (currentContainer.boxes.length > 0) {
          const last = currentContainer.boxes[currentContainer.boxes.length - 1];
          pos = {
            x: last.position.x,
            y: last.position.y + last.orientation.height,  // Y first (height)
            z: last.position.z,
          };

          if (pos.y + orientation.height > containerDim.height) {
            pos.y = 0;
            pos.z = last.position.z + last.orientation.width;  // Then Z (depth)
          }
          if (pos.z + orientation.width > containerDim.width) {
            pos.y = 0;
            pos.z = 0;
            pos.x = last.position.x + last.orientation.length;  // Finally X (length)
          }
        }

        
        if (!box.stackable && pos.z > 0) {
          continue; // skip this placement
        }

        if (
          pos.x + orientation.length <= containerDim.length &&
          pos.y + orientation.height <= containerDim.height &&  // Updated boundary check
          pos.z + orientation.width <= containerDim.width
        ) {
          currentContainer.boxes.push({
            boxId: box.id,
            orientation,
            position: pos,
          });
          placed = true;
          break;
        }
      }
    }

    if (!placed) {
      containers.push(currentContainer);
      currentContainer = { dimensions: containerDim, boxes: [] };
      currentContainer.boxes.push({
        boxId: box.id,
        orientation: box.dimensions,
        position: { x: 0, y: 0, z: 0 },
      });
    }
  }

  containers.push(currentContainer);
  return containers;
}