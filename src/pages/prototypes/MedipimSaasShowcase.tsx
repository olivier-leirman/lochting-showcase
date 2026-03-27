import {
  Box, Typography, Button, Chip, TextField, Select, MenuItem,
  InputAdornment, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Tabs, Tab, IconButton, alpha,
} from '@mui/material';
import { Icon } from '../../components/Icon';
import { useBrand } from '../../theme/brand-context';

/* ──────────────────────────────────────────────────────────────────────────
   MedipimSaasShowcase — Replicates the Medipim Mini Design System image
   with Buttons & Actions, Cards & Badges, Inputs & Controls, Data Display,
   and Navigation Elements sections in a 2-column grid.
   ────────────────────────────────────────────────────────────────────────── */

export function MedipimSaasShowcase() {
  const { brand, effects } = useBrand();
  const c = brand.colors;

  const sectionLabel = (text: string) => (
    <Typography
      sx={{
        fontSize: '0.65rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: c.contentTertiary,
        mb: 2,
      }}
    >
      {text}
    </Typography>
  );

  const card = (children: React.ReactNode, sx?: object) => (
    <Box
      sx={{
        bgcolor: c.bgElevated,
        borderRadius: 3,
        p: 3.5,
        border: '1px solid',
        borderColor: c.borderWeak,
        boxShadow: effects.shadows.secondaryButton,
        ...sx,
      }}
    >
      {children}
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
          ═══════════════════════════════════════════════════════════════════ */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36, height: 36, borderRadius: 2,
              background: effects.gradients.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Icon name="local_pharmacy" size={20} sx={{ color: c.contentStayLight }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1.35rem', lineHeight: 1.2, fontFamily: brand.typography.displayFont }}>
              Medipim
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: c.contentTertiary }}>
              Mini Design System &bull; Pharmacy Product Information
            </Typography>
          </Box>
        </Box>
        <Chip
          icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981', ml: 1 }} />}
          label="System v2.0 AI"
          size="small"
          variant="outlined"
          sx={{ fontSize: '0.7rem', fontWeight: 500, borderColor: c.borderDefault, color: c.contentSecondary }}
        />
      </Box>

      {/* ═══════════════════════════════════════════════════════════════════
          2-COLUMN GRID
          ═══════════════════════════════════════════════════════════════════ */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>

        {/* ─── LEFT COLUMN ─── */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

          {/* BUTTONS & ACTIONS */}
          <Box>
            {sectionLabel('Buttons & Actions')}
            {card(
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    endIcon={<Icon name="arrow_forward" size={16} />}
                    sx={{ textTransform: 'none', fontWeight: 600, px: 2.5 }}
                  >
                    Save Product Info
                  </Button>
                  <IconButton
                    size="small"
                    sx={{
                      background: effects.gradients.primary,
                      color: c.contentStayLight,
                      width: 36, height: 36,
                      '&:hover': { background: effects.gradients.primary, filter: 'brightness(1.1)' },
                    }}
                  >
                    <Icon name="keyboard_arrow_up" size={18} />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    startIcon={<Icon name="auto_awesome" size={16} />}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      bgcolor: c.contentPrimary,
                      color: c.contentStayLight,
                      '&:hover': { bgcolor: c.contentPrimary, filter: 'brightness(1.2)' },
                      boxShadow: 'none',
                      px: 2.5,
                    }}
                  >
                    AI Enrich Data
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<Icon name="file_upload" size={16} />}
                    sx={{ textTransform: 'none', fontWeight: 500, color: c.contentSecondary }}
                  >
                    Export
                  </Button>
                </Box>
              </Box>
            )}
          </Box>

          {/* INPUTS & CONTROLS */}
          <Box>
            {sectionLabel('Inputs & Controls')}
            {card(
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  placeholder="Search medications, CNK codes..."
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon name="search" size={18} sx={{ color: c.contentTertiary }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Chip label="⌘K" size="small" sx={{ height: 20, fontSize: '0.6rem', bgcolor: c.bgSunken, color: c.contentTertiary }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Box>
                  <Typography sx={{ fontSize: '0.75rem', color: c.contentSecondary, mb: 0.75, fontWeight: 500 }}>
                    Active Ingredient
                  </Typography>
                  <TextField
                    value="Paracetamol"
                    size="small"
                    fullWidth
                  />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.75rem', color: c.contentSecondary, mb: 0.75, fontWeight: 500 }}>
                    Administration Route
                  </Typography>
                  <Select value="oral" size="small" fullWidth>
                    <MenuItem value="oral">Oral</MenuItem>
                    <MenuItem value="topical">Topical</MenuItem>
                    <MenuItem value="injection">Injection</MenuItem>
                  </Select>
                </Box>
              </Box>
            )}
          </Box>

          {/* NAVIGATION ELEMENTS */}
          <Box>
            {sectionLabel('Navigation Elements')}
            {card(
              <Tabs value={0} sx={{ minHeight: 36 }}>
                <Tab label="Overview" sx={{ textTransform: 'none', minHeight: 36, fontSize: '0.85rem' }} />
                <Tab label="Composition" sx={{ textTransform: 'none', minHeight: 36, fontSize: '0.85rem' }} />
                <Tab label="Packaging" sx={{ textTransform: 'none', minHeight: 36, fontSize: '0.85rem' }} />
              </Tabs>
            )}
          </Box>
        </Box>

        {/* ─── RIGHT COLUMN ─── */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

          {/* CARDS & BADGES */}
          <Box>
            {sectionLabel('Cards & Badges')}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Product info card with AI badge */}
              {card(
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: c.bgSunken, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="description" size={18} sx={{ color: c.contentTertiary }} />
                      </Box>
                    </Box>
                    <Chip
                      icon={<Icon name="auto_awesome" size={12} sx={{ color: c.brand400 }} />}
                      label="AI Generated"
                      size="small"
                      sx={{
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        bgcolor: c.brand100,
                        color: c.brand450,
                        height: 24,
                      }}
                    />
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.75 }}>
                    Usage Summary
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: c.contentSecondary, lineHeight: 1.6, mb: 2.5 }}>
                    Recommended dosage for adults is 1-2 tablets every 4 to 6 hours. Do not exceed 8 tablets in 24 hours.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Button variant="contained" size="small" sx={{ textTransform: 'none', fontWeight: 600 }}>
                      Approve
                    </Button>
                    <Button variant="text" size="small" sx={{ textTransform: 'none', fontWeight: 500, color: c.contentSecondary }}>
                      Edit
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Product detail card */}
              {card(
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: c.bgSunken, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="medication" size={18} sx={{ color: c.contentTertiary }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Dafalgan Forte</Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: c.contentTertiary }}>CNK: 1234-567 &bull; 1000mg</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                    {[
                      { label: 'Status', value: 'Active', isChip: true },
                      { label: 'Stock', value: 'In Stock (240)', isBold: true },
                      { label: 'Category', value: 'Analgesics', isLink: true },
                    ].map(row => (
                      <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '0.8rem', color: c.contentSecondary }}>{row.label}</Typography>
                        {row.isChip ? (
                          <Chip
                            label={row.value}
                            size="small"
                            sx={{
                              fontSize: '0.65rem',
                              fontWeight: 600,
                              height: 22,
                              bgcolor: c.success.bgWeakest,
                              color: c.success.contentStrong,
                            }}
                          />
                        ) : row.isLink ? (
                          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: c.brand400 }}>{row.value}</Typography>
                        ) : (
                          <Typography sx={{ fontSize: '0.8rem', fontWeight: row.isBold ? 700 : 400 }}>{row.value}</Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          {/* DATA DISPLAY */}
          <Box>
            {sectionLabel('Data Display')}
            {card(
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Recent Updates</Typography>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: c.brand400, cursor: 'pointer' }}>
                    View All
                  </Typography>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: c.contentTertiary, borderBottom: `1px solid ${c.borderDefault}` }}>
                          Product Name
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: c.contentTertiary, borderBottom: `1px solid ${c.borderDefault}` }}>
                          Code (CNK)
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: c.contentTertiary, borderBottom: `1px solid ${c.borderDefault}` }}>
                          Last Edited
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: c.contentTertiary, borderBottom: `1px solid ${c.borderDefault}`, width: 40 }}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[
                        { icon: 'medication', name: 'Amoxicillin 500mg', sub: 'Capsules • 16 pack', code: '0892-334', time: '⚡ 2 hours ago', timeColor: c.brand400 },
                        { icon: 'medication', name: 'Ibuprofen 400mg', sub: 'Tablets • 30 pack', code: '1120-988', time: 'Yesterday', timeColor: c.contentSecondary },
                        { icon: 'medication', name: 'Cetirizine 10mg', sub: 'Tablets • 20 pack', code: '2451-002', time: 'Oct 12, 2023', timeColor: c.contentSecondary },
                      ].map((row, i) => (
                        <TableRow key={i} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                          <TableCell sx={{ borderBottom: `1px solid ${c.borderWeak}`, py: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                              <Box sx={{ width: 28, height: 28, borderRadius: 1, bgcolor: c.bgSunken, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Icon name={row.icon} size={14} sx={{ color: c.contentTertiary }} />
                              </Box>
                              <Box>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>{row.name}</Typography>
                                <Typography sx={{ fontSize: '0.65rem', color: c.contentTertiary }}>{row.sub}</Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ borderBottom: `1px solid ${c.borderWeak}`, py: 1.5 }}>
                            <Typography sx={{ fontSize: '0.8rem', color: c.contentSecondary, fontFamily: 'monospace' }}>{row.code}</Typography>
                          </TableCell>
                          <TableCell sx={{ borderBottom: `1px solid ${c.borderWeak}`, py: 1.5 }}>
                            <Typography sx={{ fontSize: '0.75rem', color: row.timeColor, fontWeight: row.timeColor === c.brand400 ? 600 : 400 }}>
                              {row.time}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ borderBottom: `1px solid ${c.borderWeak}`, py: 1.5 }}>
                            <IconButton size="small" sx={{ color: c.contentTertiary }}>
                              <Icon name="edit" size={16} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>,
              { p: 3 }
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
