export type Timing = (timeFraction: number) => number;

export type Animation = {
  timing: Timing, // timing function
  draw: (progress: number) => void, // handles the actual animating
  duration: number, // duration of animation in ms
};

export const timing: { [key: string]: Timing } = {
  linear(timeFraction) {
    return timeFraction;
  },
};

export function animate({ timing, draw, duration }: Animation): void {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}
