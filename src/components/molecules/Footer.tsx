import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function Footer({ version }: { version: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
      }}
    >
      <Typography level="body-sm">
        Made with ♥ by{' '}
        <Link href="https://github.com/ari-party" target="_blank">
          @ari-party
        </Link>
      </Typography>

      <Typography level="body-sm">•</Typography>

      <Typography level="body-sm" fontFamily="monospace" component="code">
        {version}
      </Typography>
    </Box>
  );
}
