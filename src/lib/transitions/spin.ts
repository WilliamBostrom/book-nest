import { cubicInOut } from "svelte/easing";

interface SpinParams {
  delay?: number;
  duration?: number;
  easing?: (t: number) => number;
  spin?: number;
}

export default function spin(node: HTMLElement, params: SpinParams = {}) {
  const { delay = 0, duration = 400, easing = cubicInOut, spin = 1 } = params;

  const originalOpacity = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t: number) => {
      return `
      opacity: ${t * originalOpacity};
      transform: scale(${t}) rotate(${spin * 360 * t}deg)
      `;
    },
  };
}
