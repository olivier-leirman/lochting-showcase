import { useState } from 'react';
import { Box, Typography, Button, Chip, Avatar, alpha, LinearProgress, ToggleButton, ToggleButtonGroup, Tabs, Tab } from '@mui/material';
import { useBrand } from '../../theme/brand-context';
import { Icon } from '../../components/Icon';
import { MedipimSaasShowcase } from '../prototypes/MedipimSaasShowcase';

/* ──────────────────────────────────────────────────────────────────────────
   StyleShowcasePage — A SaaS landing page presented in a Landingfolio-style
   frame with an inline style switcher. Demonstrates how the active theme
   looks in a realistic product context.
   ────────────────────────────────────────────────────────────────────────── */

export function StyleShowcasePage() {
  const {
    brand, effects,
    currentPlatform, currentStyle,
    platforms, platformId, setPlatform,
    styleId, setStyle,
  } = useBrand();
  const c = brand.colors;
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>

      {/* ═══════════════════════════════════════════════════════════════════
          LANDINGFOLIO-STYLE HEADER
          ═══════════════════════════════════════════════════════════════════ */}
      <Box sx={{ mb: 4 }}>
        {/* Title row */}
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.75rem' }}>
          {currentPlatform.name}
        </Typography>
        <Typography variant="body2" sx={{ color: c.contentTertiary, mb: 3 }}>
          {currentPlatform.name === 'Lochting'
            ? 'Pharmacy e-commerce platform — webshop, kiosk & automaat'
            : 'Product information management for pharmacy'
          }
        </Typography>

        {/* Toolbar: style switcher + meta */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            pb: 3,
            borderBottom: '1px solid',
            borderColor: c.borderDefault,
          }}
        >
          {/* Style pills */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            {/* Platform toggle */}
            <ToggleButtonGroup
              value={platformId}
              exclusive
              onChange={(_, val) => val && setPlatform(val)}
              size="small"
              sx={{
                '& .MuiToggleButton-root': { px: 2, py: 0.5, fontSize: '0.8rem', textTransform: 'none' },
              }}
            >
              {platforms.map(p => (
                <ToggleButton key={p.id} value={p.id}>{p.name}</ToggleButton>
              ))}
            </ToggleButtonGroup>

            {/* Style variants */}
            {currentPlatform.styles.length > 1 && (
              <Box sx={{ display: 'flex', gap: 0.75 }}>
                {currentPlatform.styles.map(s => (
                  <Chip
                    key={s.id}
                    label={s.label}
                    size="small"
                    variant={s.id === styleId ? 'filled' : 'outlined'}
                    color={s.id === styleId ? 'primary' : 'default'}
                    onClick={() => setStyle(s.id)}
                    sx={{
                      fontSize: '0.78rem',
                      height: 28,
                      cursor: 'pointer',
                      fontWeight: s.id === styleId ? 600 : 400,
                      ...(s.id !== styleId && {
                        '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08) },
                      }),
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>

          {/* Meta info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={`${currentStyle.label}`}
              size="small"
              sx={{ bgcolor: c.brand100, color: c.brand450, fontWeight: 600, fontSize: '0.7rem' }}
              icon={<Icon name="brush" size={14} color={c.brand400} />}
            />
            <Typography variant="caption" sx={{ color: c.contentSpot }}>
              Page &bull; {tab === 0 ? 'Landing Page' : 'SaaS Showcase'}
            </Typography>
          </Box>
        </Box>

        {/* Page tabs */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ mt: 2, minHeight: 36, '& .MuiTab-root': { textTransform: 'none', minHeight: 36, fontSize: '0.85rem', fontWeight: 600 } }}
        >
          <Tab label="Landing Page" icon={<Icon name="web" size={16} />} iconPosition="start" />
          <Tab label="SaaS Showcase" icon={<Icon name="dashboard" size={16} />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Show SaaS Showcase tab directly (no browser frame) */}
      {tab === 1 ? (
        <MedipimSaasShowcase />
      ) : (
        <>

      {/* ═══════════════════════════════════════════════════════════════════
          BROWSER FRAME — wraps the landing page preview
          ═══════════════════════════════════════════════════════════════════ */}
      <Box
        sx={{
          border: '1px solid',
          borderColor: c.borderDefault,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: `0 4px 24px ${alpha(c.bgBaseInverse, 0.06)}`,
        }}
      >
        {/* Browser chrome bar */}
        <Box
          sx={{
            bgcolor: c.bgElevated,
            px: 2.5,
            py: 1.25,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            borderBottom: '1px solid',
            borderColor: c.borderDefault,
          }}
        >
          {/* Traffic lights */}
          <Box sx={{ display: 'flex', gap: 0.75 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff5f57' }} />
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#febc2e' }} />
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#28c840' }} />
          </Box>
          {/* URL bar */}
          <Box
            sx={{
              flex: 1,
              bgcolor: c.bgSunken,
              borderRadius: 1.5,
              px: 2,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Icon name="lock" size={12} color={c.contentSpot} />
            <Typography sx={{ fontSize: '0.7rem', color: c.contentTertiary }}>
              {currentPlatform.name.toLowerCase()}.com
            </Typography>
          </Box>
        </Box>

        {/* ─── LANDING PAGE CONTENT ─── */}
        <Box sx={{ bgcolor: c.bgBase }}>

          {/* HERO */}
          <Box
            sx={{
              background: effects.gradients.primary,
              px: { xs: 4, md: 8 },
              py: { xs: 6, md: 8 },
              position: 'relative',
            }}
          >
            {/* Nav bar */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}>
              <Typography sx={{ color: c.contentStayLight, fontWeight: 700, fontSize: '1.1rem' }}>
                {currentPlatform.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                {['Features', 'Pricing', 'Contact'].map(item => (
                  <Typography key={item} sx={{ color: alpha(c.contentStayLight, 0.75), fontSize: '0.875rem' }}>
                    {item}
                  </Typography>
                ))}
                <Chip
                  label="Start Free Trial"
                  size="small"
                  sx={{ bgcolor: c.contentStayLight, color: c.brand400, fontWeight: 600, fontSize: '0.8rem' }}
                />
              </Box>
            </Box>

            {/* Hero content */}
            <Box sx={{ maxWidth: 550 }}>
              <Typography
                sx={{
                  color: c.contentStayLight,
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  fontWeight: 700,
                  lineHeight: 1.15,
                  mb: 2,
                  fontFamily: brand.typography.displayFont,
                }}
              >
                Jouw apotheek, online.{' '}
                <Box component="span" sx={{ background: alpha(c.contentStayLight, 0.15), borderRadius: 2, px: 1 }}>
                  Simpel.
                </Box>
              </Typography>
              <Typography sx={{ color: alpha(c.contentStayLight, 0.8), fontSize: '1.1rem', lineHeight: 1.6, mb: 4 }}>
                Beheer je webshop, kiosk en automaat vanuit één platform.
                Ontworpen voor apothekers, gebouwd voor groei.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" sx={{
                  bgcolor: c.contentStayLight, color: c.brand400,
                  '&:hover': { bgcolor: alpha(c.contentStayLight, 0.9) },
                  boxShadow: 'none', px: 3,
                }}>
                  Gratis starten
                </Button>
                <Button variant="outlined" sx={{
                  borderColor: alpha(c.contentStayLight, 0.35), color: c.contentStayLight,
                  '&:hover': { borderColor: c.contentStayLight, bgcolor: alpha(c.contentStayLight, 0.08) },
                  px: 3,
                }}>
                  Demo bekijken
                </Button>
              </Box>
            </Box>

            {/* Floating stat badges */}
            <Box sx={{ position: 'absolute', right: 60, top: 140, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', gap: 2 }}>
              <StatBadge label="Actieve apothekers" value="2,400+" colors={c} />
              <StatBadge label="Uptime" value="99.9%" colors={c} />
            </Box>
          </Box>

          {/* Trust bar */}
          <Box sx={{
            bgcolor: c.bgElevated, px: { xs: 4, md: 8 }, py: 2.5,
            display: 'flex', alignItems: 'center', gap: 4,
            borderTop: '1px solid', borderBottom: '1px solid', borderColor: c.borderWeak,
          }}>
            <Typography sx={{ color: c.contentTertiary, fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
              Vertrouwd door
            </Typography>
            {['Pharma+', 'MedGroup', 'ApoConnect', 'CareLink'].map(name => (
              <Typography key={name} sx={{ color: c.contentSpot, fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                {name}
              </Typography>
            ))}
          </Box>

          {/* ACCENT COLORS STRIP */}
          {brand.accents && (
            <Box sx={{ px: { xs: 4, md: 8 }, py: 5 }}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {Object.entries(brand.accents.colors).map(([key, accent]) => (
                  <Box
                    key={key}
                    sx={{
                      flex: '1 1 180px',
                      bgcolor: accent.light,
                      border: '1px solid',
                      borderColor: alpha(accent.default, 0.15),
                      borderRadius: 2.5,
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{
                      width: 36, height: 36, borderRadius: 1.5, bgcolor: accent.default,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Icon
                        name={key === 'teal' || key === 'sage' || key === 'mint' || key === 'cyan' ? 'local_pharmacy' : key === 'gold' || key === 'sand' || key === 'amber' ? 'star' : 'favorite'}
                        size={18} sx={{ color: '#fff' }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: accent.dark }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: alpha(accent.dark, 0.65) }}>
                        Accent color
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* FEATURE GRID — BENTO */}
          <Box sx={{ px: { xs: 4, md: 8 }, py: 5 }}>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gridTemplateRows: 'auto auto',
              gap: 2.5,
            }}>
              {/* Large feature card — 2 cols */}
              <Box sx={{
                gridColumn: { md: 'span 2' },
                background: effects.gradients.primary,
                borderRadius: 3, p: 4,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 240,
              }}>
                <Box>
                  <Chip label="Webshop" size="small" sx={{ bgcolor: alpha(c.contentStayLight, 0.18), color: c.contentStayLight, mb: 2, fontWeight: 600 }} />
                  <Typography sx={{ color: c.contentStayLight, fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2, mb: 1, fontFamily: brand.typography.displayFont }}>
                    Jouw producten, automatisch gesynchroniseerd.
                  </Typography>
                  <Typography sx={{ color: alpha(c.contentStayLight, 0.75), fontSize: '0.95rem' }}>
                    Verbind je PIM en houd prijzen, stock en productinfo altijd up-to-date.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
                  {[{ name: 'Ibuprofen 400mg', price: '€7.50' }, { name: 'Vitamine D3', price: '€12.95' }, { name: 'Neusdruppels', price: '€4.20' }].map(p => (
                    <Box key={p.name} sx={{ bgcolor: alpha(c.contentStayLight, 0.12), backdropFilter: 'blur(8px)', borderRadius: 2, px: 2, py: 1.5, flex: 1 }}>
                      <Typography sx={{ color: c.contentStayLight, fontSize: '0.8rem', fontWeight: 600 }}>{p.name}</Typography>
                      <Typography sx={{ color: alpha(c.contentStayLight, 0.7), fontSize: '0.75rem' }}>{p.price}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Tall right card — analytics */}
              <Box sx={{
                gridRow: { md: 'span 2' },
                bgcolor: c.bgElevated, border: '1px solid', borderColor: c.borderDefault,
                borderRadius: 3, p: 4, display: 'flex', flexDirection: 'column',
              }}>
                <Box sx={{ bgcolor: c.brand100, borderRadius: 2, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5 }}>
                  <Icon name="insights" size={22} sx={{ color: c.brand400 }} />
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', mb: 1 }}>Analytics</Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', mb: 3 }}>
                  Realtime inzichten in verkoop, populaire producten en klantgedrag.
                </Typography>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 1.5 }}>
                  {[{ label: 'Webshop', value: 72 }, { label: 'Kiosk', value: 45 }, { label: 'Automaat', value: 28 }].map(item => (
                    <Box key={item.label}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{item.label}</Typography>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>{item.value}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={item.value} sx={{ height: 6, borderRadius: 3, bgcolor: c.bgSunken, '& .MuiLinearProgress-bar': { borderRadius: 3 } }} />
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Two bottom-left cards */}
              <FeatureCard colors={c} icon="devices" title="Kiosk & Automaat" description="Klanten bestellen en betalen zelfstandig via touchscreen of automaat." />
              <FeatureCard colors={c} icon="local_shipping" title="Click & Collect" description="Online bestellen, ophalen in de apotheek. Snel en zonder wachten." />
            </Box>
          </Box>

          {/* DASHBOARD FRAGMENT */}
          <Box sx={{ px: { xs: 4, md: 8 }, py: 5, bgcolor: c.bgSunken }}>
            <Box sx={{
              bgcolor: c.bgBase, border: '1px solid', borderColor: c.borderDefault,
              borderRadius: 3, overflow: 'hidden',
            }}>
              <Box sx={{ bgcolor: c.bgElevated, px: 4, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: c.borderWeak }}>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Dashboard</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label="Vandaag" size="small" color="primary" />
                  <Chip label="Week" size="small" variant="outlined" />
                  <Chip label="Maand" size="small" variant="outlined" />
                </Box>
              </Box>
              <Box sx={{ p: 3, display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                <KpiCard colors={c} label="Bestellingen" value="156" change="+12%" />
                <KpiCard colors={c} label="Omzet" value="€4,280" change="+8%" />
                <KpiCard colors={c} label="Nieuwe klanten" value="23" change="+34%" />
                <KpiCard colors={c} label="Retourpercentage" value="2.1%" change="-0.5%" />
              </Box>
              <Box sx={{ px: 3, pb: 3 }}>
                <Box sx={{ bgcolor: c.bgElevated, borderRadius: 2, border: '1px solid', borderColor: c.borderWeak }}>
                  {[
                    { icon: 'shopping_cart', text: 'Bestelling #1247 — Ibuprofen 400mg, Vitamine D3', time: '2 min geleden', status: 'Nieuw' },
                    { icon: 'inventory_2', text: 'Stock update — Neusdruppels opnieuw beschikbaar', time: '15 min geleden', status: 'Verwerkt' },
                    { icon: 'person_add', text: 'Nieuwe klantregistratie — Marie Janssens', time: '1 uur geleden', status: 'Actief' },
                  ].map((item, i) => (
                    <Box key={i} sx={{
                      px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 2,
                      ...(i < 2 ? { borderBottom: '1px solid', borderColor: c.borderWeak } : {}),
                    }}>
                      <Box sx={{ bgcolor: c.brand100, borderRadius: 1.5, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon name={item.icon} size={18} sx={{ color: c.brand400 }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.text}
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{item.time}</Typography>
                      </Box>
                      <Chip label={item.status} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* TESTIMONIALS */}
          <Box sx={{ px: { xs: 4, md: 8 }, py: 6 }}>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', mb: 1 }}>
              Wat apothekers zeggen
            </Typography>
            <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 4, fontSize: '0.95rem' }}>
              Ontdek waarom meer dan 2.400 apothekers kiezen voor {currentPlatform.name}.
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
              <TestimonialCard colors={c} quote="Sinds we Lochting gebruiken is onze online omzet met 40% gestegen. De integratie met ons kassasysteem is naadloos." name="Sophie De Vos" role="Apotheker, Apotheek Centraal" />
              <TestimonialCard colors={c} quote="De kiosk was binnen een dag operationeel. Klanten vinden het fantastisch dat ze zelf kunnen bestellen." name="Tom Peeters" role="Eigenaar, Pharma Plus" />
              <TestimonialCard colors={c} quote="Het dashboard geeft ons precies de inzichten die we nodig hebben. Eindelijk weten we welke producten online het best lopen." name="Lisa Mertens" role="Manager, MedGroup Vlaanderen" />
            </Box>
          </Box>

          {/* PRICING */}
          <Box sx={{ px: { xs: 4, md: 8 }, py: 6, bgcolor: c.bgSunken }}>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', mb: 1 }}>
              Eenvoudige, transparante pricing
            </Typography>
            <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 5, fontSize: '0.95rem' }}>
              Geen verborgen kosten. Upgrade of annuleer wanneer je wilt.
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5, alignItems: 'start' }}>
              <PricingCard colors={c} effects={effects} tier="Starter" price="€49" description="Perfect voor één apotheek die online wil starten." features={['Webshop', 'Tot 500 producten', 'Basis analytics', 'Email support']} highlighted={false} />
              <PricingCard colors={c} effects={effects} tier="Professional" price="€99" description="Voor apothekers die ook kiosk en automaat willen." features={['Alles in Starter', 'Kiosk integratie', 'Onbeperkt producten', 'Click & Collect', 'Priority support']} highlighted />
              <PricingCard colors={c} effects={effects} tier="Enterprise" price="Op maat" description="Multi-locatie met geavanceerde integraties." features={['Alles in Professional', 'Multi-locatie', 'API toegang', 'Custom branding', 'Dedicated support']} highlighted={false} />
            </Box>
          </Box>

          {/* FOOTER */}
          <Box sx={{
            px: { xs: 4, md: 8 }, py: 4,
            borderTop: '1px solid', borderColor: c.borderDefault,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <Typography sx={{ fontWeight: 700, color: c.contentPrimary }}>{currentPlatform.name}</Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              {['Privacy', 'Voorwaarden', 'Contact'].map(item => (
                <Typography key={item} sx={{ fontSize: '0.8rem', color: c.contentTertiary }}>{item}</Typography>
              ))}
            </Box>
          </Box>

        </Box>
      </Box>
      </>
      )}
    </Box>
  );
}

/* ── Sub-components ── */

function StatBadge({ label, value, colors }: { label: string; value: string; colors: any }) {
  return (
    <Box sx={{ bgcolor: alpha(colors.contentStayLight, 0.12), backdropFilter: 'blur(12px)', borderRadius: 2.5, px: 2.5, py: 1.5, minWidth: 140 }}>
      <Typography sx={{ color: colors.contentStayLight, fontSize: '1.25rem', fontWeight: 700 }}>{value}</Typography>
      <Typography sx={{ color: alpha(colors.contentStayLight, 0.7), fontSize: '0.75rem' }}>{label}</Typography>
    </Box>
  );
}

function FeatureCard({ colors, icon, title, description }: { colors: any; icon: string; title: string; description: string }) {
  return (
    <Box sx={{ bgcolor: colors.bgElevated, border: '1px solid', borderColor: colors.borderDefault, borderRadius: 3, p: 3.5 }}>
      <Box sx={{ bgcolor: colors.brand100, borderRadius: 2, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <Icon name={icon} size={22} sx={{ color: colors.brand400 }} />
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.75 }}>{title}</Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.5 }}>{description}</Typography>
    </Box>
  );
}

function KpiCard({ colors, label, value, change }: { colors: any; label: string; value: string; change: string }) {
  const positive = !change.startsWith('-');
  return (
    <Box sx={{ bgcolor: colors.bgElevated, border: '1px solid', borderColor: colors.borderDefault, borderRadius: 2, p: 2.5 }}>
      <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', mb: 1 }}>{label}</Typography>
      <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 0.5 }}>{value}</Typography>
      <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: positive ? colors.success.contentStrong : colors.error.contentStrong }}>
        {change}
      </Typography>
    </Box>
  );
}

function TestimonialCard({ colors, quote, name, role }: { colors: any; quote: string; name: string; role: string }) {
  return (
    <Box sx={{ bgcolor: colors.bgElevated, border: '1px solid', borderColor: colors.borderDefault, borderRadius: 3, p: 3.5, display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ color: colors.brand300, fontSize: '2rem', fontWeight: 700, lineHeight: 1, mb: 1 }}>"</Typography>
      <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'text.secondary', flex: 1, mb: 3 }}>{quote}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: colors.brand100, color: colors.brand400, fontSize: '0.8rem', fontWeight: 700 }}>
          {name.split(' ').map(n => n[0]).join('')}
        </Avatar>
        <Box>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{name}</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{role}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

function PricingCard({ colors, effects, tier, price, description, features, highlighted }: {
  colors: any; effects: any; tier: string; price: string; description: string; features: string[]; highlighted: boolean;
}) {
  return (
    <Box sx={{
      bgcolor: highlighted ? 'transparent' : colors.bgElevated,
      background: highlighted ? effects.gradients.primary : undefined,
      border: highlighted ? 'none' : '1px solid',
      borderColor: colors.borderDefault,
      borderRadius: 3, p: 4,
      display: 'flex', flexDirection: 'column',
      transform: highlighted ? 'scale(1.03)' : 'none',
      boxShadow: highlighted ? `0 8px 32px ${alpha(colors.brand400, 0.2)}` : 'none',
    }}>
      <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: highlighted ? alpha(colors.contentStayLight, 0.8) : 'text.secondary', mb: 1 }}>
        {tier}
      </Typography>
      <Typography sx={{ fontSize: '2.25rem', fontWeight: 700, color: highlighted ? colors.contentStayLight : 'text.primary', mb: 0.5 }}>
        {price}
        {price !== 'Op maat' && <Typography component="span" sx={{ fontSize: '0.9rem', fontWeight: 400, color: highlighted ? alpha(colors.contentStayLight, 0.7) : 'text.secondary' }}> /maand</Typography>}
      </Typography>
      <Typography sx={{ fontSize: '0.875rem', color: highlighted ? alpha(colors.contentStayLight, 0.75) : 'text.secondary', mb: 3 }}>
        {description}
      </Typography>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
        {features.map(f => (
          <Box key={f} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon name="check_circle" size={16} sx={{ color: highlighted ? alpha(colors.contentStayLight, 0.8) : colors.success.bgDefault }} />
            <Typography sx={{ fontSize: '0.85rem', color: highlighted ? colors.contentStayLight : 'text.primary' }}>{f}</Typography>
          </Box>
        ))}
      </Box>
      <Button
        variant={highlighted ? 'contained' : 'outlined'}
        fullWidth
        sx={highlighted ? { bgcolor: colors.contentStayLight, color: colors.brand400, '&:hover': { bgcolor: alpha(colors.contentStayLight, 0.9) }, boxShadow: 'none' } : {}}
      >
        {price === 'Op maat' ? 'Contacteer ons' : 'Kies dit plan'}
      </Button>
    </Box>
  );
}
