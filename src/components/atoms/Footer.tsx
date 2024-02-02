import { Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';

import DiscordIcon from './icons/Discord';
import GitHubIcon from './icons/GitHub';

import type { PropsWithChildren } from 'react';

function Row({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      {children}
    </Box>
  );
}

export default function Footer({ version }: { version: string }) {
  return (
    <Row>
      <Row>
        <Link
          color="neutral"
          href="https://github.com/ari-party/mtc-artillery"
          target="_blank"
        >
          <GitHubIcon />
        </Link>

        <Link
          color="neutral"
          href="https://discord.com/users/449250687868469258"
          target="_blank"
        >
          <DiscordIcon />
        </Link>
      </Row>

      <Typography level="body-sm">•</Typography>

      <Typography level="body-sm" component="code">
        {version}
      </Typography>
    </Row>
  );
}
