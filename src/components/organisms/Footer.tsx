import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import Link from '../atoms/footer/Link';
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
        <Link href="https://github.com/ari-party/mtc-artillery">
          <GitHubIcon />
        </Link>

        <Link href="https://www.buymeacoffee.com/valk">
          <BMACIcon />
        </Link>
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
