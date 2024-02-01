import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import React, { useMemo, useRef, useState } from 'react';

import CardScrollBox from '../CardScrollBox';
import DataContainer from '../DataContainer';
import { maps, projectiles } from '@/constants';
import { useDataStore } from '@/stores/data';
import { usePresetStore } from '@/stores/presets';

function NewPresetModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}) {
  const addPreset = usePresetStore((s) => s.addPreset);

  const name = useRef<string>('No name');
  const description = useRef<undefined | string>();
  const data = useDataStore();

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <ModalClose />

        <Typography level="title-lg">New preset</Typography>

        <Stack gap={1}>
          <Box>
            <Typography level="title-md">Name</Typography>
            <Input
              onChange={(event) => {
                name.current = event.target.value.trim();
              }}
              variant="soft"
              placeholder=""
            />
          </Box>

          <Box>
            <Typography level="title-md">Description</Typography>
            <Input
              onChange={(event) => {
                description.current = event.target.value.trim();
              }}
              variant="soft"
              placeholder=""
            />
          </Box>
        </Stack>

        <Button
          fullWidth
          onClick={() => {
            addPreset({
              name: name.current,
              description: description.current,
              data,
            });

            setOpen(false);
          }}
        >
          Save
        </Button>
      </ModalDialog>
    </Modal>
  );
}

function LoadPresetModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}) {
  const presets = usePresetStore((s) => s.presets);
  const { setState } = useDataStore;

  const [selectedPresetIndex, setSelectedPresetIndex] = useState<null | number>(
    null,
  );

  useMemo(() => {
    // Reset once modal is closed
    if (!open) setSelectedPresetIndex(null);
  }, [open, setSelectedPresetIndex]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <ModalClose />

        <Typography level="title-lg">Load preset</Typography>

        <CardScrollBox
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '50svh',
            gap: 1,
          }}
        >
          {presets.map((preset, index) => (
            <Card
              size="sm"
              variant="soft"
              key={index}
              onClick={() => setSelectedPresetIndex(index)}
              sx={{
                cursor: 'pointer',
                backgroundColor:
                  selectedPresetIndex === index
                    ? 'neutral.softActiveBg'
                    : 'neutral.softBg',

                '&:hover': {
                  backgroundColor: 'neutral.softHoverBg',
                },

                '&:active': {
                  backgroundColor: 'neutral.softActiveBg',
                },
              }}
            >
              <Box>
                <Typography level="title-md">{preset.name}</Typography>
                <Typography>{preset.description}</Typography>

                <Typography level="body-sm">
                  {[
                    maps[preset.data.mapIndex].name,
                    projectiles[preset.data.projectileIndex].name,
                  ].join(' • ')}
                </Typography>
              </Box>
            </Card>
          ))}
        </CardScrollBox>

        <Button
          color="neutral"
          variant="outlined"
          fullWidth
          onClick={() => {
            if (typeof selectedPresetIndex !== 'number') return;

            setState(presets[selectedPresetIndex].data);

            setOpen(false);
          }}
        >
          Load
        </Button>
      </ModalDialog>
    </Modal>
  );
}

function DeletePresetModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}) {
  const [presets, deletePreset] = usePresetStore((s) => [
    s.presets,
    s.deletePreset,
  ]);

  const [selectedPresetIndex, setSelectedPresetIndex] = useState<null | number>(
    null,
  );

  useMemo(() => {
    // Reset once modal is closed
    if (!open) setSelectedPresetIndex(null);
  }, [open, setSelectedPresetIndex]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <ModalClose />

        <Typography level="title-lg">Delete preset</Typography>

        <CardScrollBox
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '50svh',
            gap: 1,
          }}
        >
          {presets.map((preset, index) => (
            <Card
              size="sm"
              variant="soft"
              key={index}
              onClick={() => setSelectedPresetIndex(index)}
              sx={{
                cursor: 'pointer',
                backgroundColor:
                  selectedPresetIndex === index
                    ? 'neutral.softActiveBg'
                    : 'neutral.softBg',

                '&:hover': {
                  backgroundColor: 'neutral.softHoverBg',
                },

                '&:active': {
                  backgroundColor: 'neutral.softActiveBg',
                },
              }}
            >
              <Box>
                <Typography level="title-md">{preset.name}</Typography>
                <Typography>{preset.description}</Typography>

                <Typography level="body-sm">
                  {[
                    maps[preset.data.mapIndex].name,
                    projectiles[preset.data.projectileIndex].name,
                  ].join(' • ')}
                </Typography>
              </Box>
            </Card>
          ))}
        </CardScrollBox>

        <Button
          color="danger"
          fullWidth
          onClick={() => {
            if (typeof selectedPresetIndex !== 'number') return;

            deletePreset(selectedPresetIndex);

            setOpen(false);
          }}
        >
          Delete preset
        </Button>
      </ModalDialog>
    </Modal>
  );
}

export default function Presets() {
  const [newPresetOpen, setNewPresetOpen] = useState<boolean>(false);
  const [loadPresetOpen, setLoadPresetOpen] = useState<boolean>(false);
  const [deletePresetOpen, setDeletePresetOpen] = useState<boolean>(false);
  const presets = usePresetStore((s) => s.presets);

  return (
    <>
      <NewPresetModal open={newPresetOpen} setOpen={setNewPresetOpen} />
      <LoadPresetModal open={loadPresetOpen} setOpen={setLoadPresetOpen} />
      <DeletePresetModal
        open={deletePresetOpen}
        setOpen={setDeletePresetOpen}
      />

      <DataContainer>
        <Grid container spacing={1} sx={{ flexGrow: 1 }}>
          <Grid xs={4}>
            <Button fullWidth onClick={() => setNewPresetOpen(true)}>
              New preset
            </Button>
          </Grid>
          <Grid xs={4}>
            <Button
              color="neutral"
              variant="outlined"
              fullWidth
              onClick={() => {
                if (presets.length > 0) setLoadPresetOpen(true);
              }}
            >
              Load preset
            </Button>
          </Grid>
          <Grid xs={4}>
            <Button
              color="danger"
              fullWidth
              onClick={() => {
                if (presets.length > 0) setDeletePresetOpen(true);
              }}
            >
              Delete preset
            </Button>
          </Grid>
        </Grid>
      </DataContainer>
    </>
  );
}
