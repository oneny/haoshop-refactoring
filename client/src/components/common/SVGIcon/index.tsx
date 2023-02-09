import type { TIconProps } from 'types/icon';
import spriteSVG from 'assets/icons/sprite-icons.svg';

export const SVGIcon = ({ id, size = 24 }: TIconProps) => {
  return (
    <svg width={size} height={size}>
      <use href={`${spriteSVG}#${id}`} />
    </svg>
  );
};
