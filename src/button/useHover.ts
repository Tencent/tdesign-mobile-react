import { useState, useEffect } from 'react';

export function useHover(ref: React.Ref<HTMLElement>, enabled = true) {
  const [isHovering, setHovering] = useState(false);

  useEffect(() => {
    if (!('current' in ref)) return;
    const node = ref?.current;

    if (!node && enabled) return;

    const handleMouseEnter = () => {
      setHovering(true);
    };

    const handleMouseLeave = () => {
      setHovering(false);
    };

    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, enabled]);

  return [isHovering];
}
