import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';

import DiscordIcon from './icons/Discord';
import GitHubIcon from './icons/GitHub';

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
      }}
    >
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
    </Box>
  );
}
