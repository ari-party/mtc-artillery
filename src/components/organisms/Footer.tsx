import { Stack, Typography } from '@mui/joy';
import NextLink from 'next/link';

import BMACIcon from '../atoms/icons/BMAC';
import GitHubIcon from '../atoms/icons/GitHub';

export default function Footer({ version }: { version: string }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        marginTop: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
        <NextLink
          href="https://github.com/ari-party/mtc-artillery"
          target="_blank"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <GitHubIcon />
        </NextLink>

        <NextLink
          href="https://www.buymeacoffee.com/valk"
          target="_blank"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <BMACIcon />
        </NextLink>
      </Stack>

      <Typography
        level="body-sm"
        component="code"
        sx={(theme) => ({ fontFamily: theme.fontFamily.code })}
      >
        {version}
      </Typography>
    </Stack>
  );
}
