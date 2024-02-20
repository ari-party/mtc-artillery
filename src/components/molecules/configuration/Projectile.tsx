import todec from '2dec';
import UnfoldMore from '@mui/icons-material/UnfoldMore';
import { Button, Tab, TabList, TabPanel, Tabs, Tooltip } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import React from 'react';

import DataContainer from '../../atoms/DataContainer';
import ScrollBox from '../ScrollBox';
import { projectiles } from '@/constants';
import { useDataStore } from '@/stores/data';

import type { Projectile } from '@/constants';

export default function ProjectileSelection() {
  const tooltip = React.useRef<HTMLDivElement | null>(null);
  const [selectionOpen, setSelectionOpen] = React.useState<boolean>(false);
  const [selectionTab, setSelectionTab] = React.useState<number>(0);
  const [projectileIndex, setProjectileIndex] = useDataStore((s) => [
    s.projectileIndex,
    s.setProjectileIndex,
  ]);

  const projectileCategories = React.useMemo(() => {
    const categories: Record<string, Projectile[]> = {
      // Add array in advance so that it always will be index 0
      no_name: [],
    };

    for (const projectile of projectiles) {
      const gunName = projectile.gun?.name || 'no_name';
      if (!categories[gunName]) categories[gunName] = [];
      categories[gunName].push(projectile);
    }

    return categories;
  }, []);

  React.useEffect(
    () =>
      setSelectionTab(
        Object.keys(projectileCategories).findIndex((categoryKey) =>
          projectileCategories[categoryKey].find(
            (projectile) => projectile === projectiles[projectileIndex],
          ),
        ),
      ),
    [setSelectionTab, projectileCategories, projectileIndex],
  );

  React.useEffect(() => {
    if (!tooltip.current) return;
    const element = tooltip.current;

    function mouseDown(this: Document, event: MouseEvent) {
      const contains = element.contains(event.target as Node);
      if (!contains) setSelectionOpen(false);
    }

    document.addEventListener('mousedown', mouseDown);

    return () => document.removeEventListener('mousedown', mouseDown);
  });

  return (
    <DataContainer>
      <Typography level="title-md">Projectile</Typography>

      <Tooltip
        slotProps={{ root: { ref: tooltip, open: selectionOpen } }}
        onClose={() => setSelectionOpen(false)}
        placement="top-end"
        size="lg"
        variant="outlined"
        keepMounted
        disableHoverListener
        disableTouchListener
        disableFocusListener
        sx={(theme) => ({
          backgroundColor: theme.palette.background.body,
          paddingLeft: 0,
          paddingRight: 0,
        })}
        title={
          <Tabs
            orientation="vertical"
            size="sm"
            sx={{ backgroundColor: 'unset', maxHeight: '200px' }}
            value={selectionTab}
            onChange={(event, newTab) => setSelectionTab(newTab as number)}
          >
            {Object.values(projectileCategories).map((category, index) => (
              <TabPanel value={index} key={index} sx={{ padding: 0 }}>
                <ScrollBox dependency={selectionOpen}>
                  <Stack direction="column">
                    {category.map((projectile, thisIndex) => {
                      const trueIndex = projectiles.indexOf(projectile);

                      return (
                        <Button
                          key={thisIndex}
                          color="neutral"
                          variant="plain"
                          sx={(theme) => ({
                            borderRadius: 0,
                            fontWeight: 400,

                            ...(projectileIndex === trueIndex && {
                              backgroundColor:
                                theme.palette.neutral.plainActiveBg,
                            }),
                          })}
                          size="sm"
                          onClick={() => setProjectileIndex(trueIndex)}
                        >
                          <Stack
                            sx={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              gap: 2,
                            }}
                          >
                            <Typography>{projectile.name}</Typography>

                            <Typography level="body-sm">
                              {todec(projectile.velocity)} m/s
                            </Typography>
                          </Stack>
                        </Button>
                      );
                    })}
                  </Stack>
                </ScrollBox>
              </TabPanel>
            ))}

            <TabList underlinePlacement="left">
              <ScrollBox dependency={selectionOpen}>
                {Object.keys(projectileCategories).map((key, index) => (
                  <Tab
                    variant="plain"
                    color="neutral"
                    key={index}
                    indicatorPlacement="left"
                    sx={{
                      width: '100%',

                      ...(projectileCategories[key].length < 1 && {
                        display: 'none',
                      }),
                    }}
                  >
                    {key === 'no_name' ? 'Other' : key}
                  </Tab>
                ))}
              </ScrollBox>
            </TabList>
          </Tabs>
        }
      >
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => setSelectionOpen(!selectionOpen)}
          sx={(theme) => ({
            backgroundColor: theme.palette.background.surface,
            paddingInline: '0.75rem',
            fontSize: '16px',
            fontWeight: 400,
          })}
          endDecorator={
            <UnfoldMore
              style={{
                color: 'var(--joy-palette-text-icon)',
              }}
            />
          }
        >
          {projectiles[projectileIndex]?.name ?? 'Select a projectile...'}
        </Button>
      </Tooltip>
    </DataContainer>
  );
}
