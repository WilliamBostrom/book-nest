import { cubicInOut } from "svelte/easing";

export default function spin(
  node,
  { delay = 0, duration = 400, easing = cubicInOut, spin = 1 }
) {
  const originalOpacity = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => {
      return `
      opacity: ${t * originalOpacity};
      transform: scale(${t}) rotate(${spin * 360 * t}deg)
      `;
    },
  };
}
