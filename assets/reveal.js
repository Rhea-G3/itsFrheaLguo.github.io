(() => {
  const paper = document.querySelector('.paper');
  if (!paper) return;
  const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let x = -500, y = -500;
  const clear = () => { cancelAnimationFrame(frame); frame = 0; paper.classList.remove('revealing'); };
  window.addEventListener('pointermove', event => {
    if (!pointer.matches || motion.matches || event.pointerType === 'touch') return;
    x = event.clientX; y = event.clientY;
    if (!frame) frame = requestAnimationFrame(() => {
      paper.style.setProperty('--x', `${x}px`);
      paper.style.setProperty('--y', `${y}px`);
      paper.classList.add('revealing');
      frame = 0;
    });
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', clear);
  window.addEventListener('blur', clear);
  motion.addEventListener('change', clear);
  pointer.addEventListener('change', clear);
})();
