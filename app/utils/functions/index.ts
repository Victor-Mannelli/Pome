
export function calculatePadding({ parentWidth, childWidth }: {
  parentWidth: number, childWidth: number,
}) {
  const numChildrenPerRow = Math.floor(parentWidth / (childWidth + 24)); // 24px is the gap between children
  const totalWidth = numChildrenPerRow * childWidth + ((numChildrenPerRow - 1) * 24); // Total width of children in a row
  const padding = (parentWidth - totalWidth) / 2;

  return padding || 0
}
