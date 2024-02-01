import Box from '@mui/joy/Box';
import { mergeSx } from 'merge-sx';
import { useRef, type PropsWithChildren, useEffect, useState } from 'react';

import type { BoxProps } from '@mui/joy/Box';

export default function CardScrollBox({
  children,
  ...props
}: PropsWithChildren<BoxProps>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [maskImage, setMaskImage] = useState('unset');

  useEffect(() => {
    if (ref.current)
      if (ref.current.scrollHeight > ref.current.clientHeight)
        setMaskImage(
          'linear-gradient(rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)',
        );
  }, [setMaskImage]);

  return (
    <Box
      ref={ref}
      {...props}
      sx={mergeSx(props.sx, {
        maxHeight: '250px',
        overflow: 'scroll',
        maskImage,
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      })}
      onScroll={(event) => {
        const target = event.target as HTMLDivElement;

        const percentage =
          (target.scrollTop / (target.scrollHeight - target.clientHeight)) *
          100;

        if (percentage === 0)
          setMaskImage(
            'linear-gradient(rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)',
          );
        else if (percentage === 100)
          setMaskImage(
            'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 50%)',
          );
        else
          setMaskImage(
            `linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) ${percentage / 2}%, rgb(0, 0, 0) ${percentage / 2 + 50}%, rgba(0, 0, 0, 0) 100%)`,
          );
      }}
    >
      {children}
    </Box>
  );
}
