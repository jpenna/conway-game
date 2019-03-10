/* eslint-disable no-nested-ternary */

function getMousePosition(event, maxWidth, maxHeight) {
  const { offsetX, offsetY } = event;

  const mouseX = offsetX <= 0 ? 0 : (offsetX >= maxWidth ? (maxWidth - 1) : offsetX);
  const mouseY = offsetY <= 0 ? 0 : (offsetY >= maxHeight ? (maxHeight - 1) : offsetY);

  return [mouseX, mouseY];
}

// TODO Find out how to stub when doing `export function...` and `import * as helpers`
export default {
  getMousePosition,
};
