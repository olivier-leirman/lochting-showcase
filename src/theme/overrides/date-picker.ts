import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function datePickerOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';

  return {
    // ── DatePicker / TimePicker / DateTimePicker (input field) ──
    MuiPickersTextField: {
      defaultProps: {
        variant: 'outlined' as const,
      },
    },

    // ── DateCalendar root ──
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          borderRadius: PRIMITIVES.radius.md,
        },
      },
    },

    // ── Day cells ──
    MuiPickersDay: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.sm,
          fontWeight: PRIMITIVES.fontWeight.medium,
          borderRadius: PRIMITIVES.radius.sm,
          '&:hover': {
            backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : c.bgSunken,
          },
          '&.Mui-selected': {
            background: fx.gradients.primary,
            color: '#fff',
            boxShadow: fx.shadows.primaryButton,
            '&:hover': {
              background: fx.gradients.primary,
              filter: 'brightness(1.08)',
            },
            '&:focus': {
              background: fx.gradients.primary,
            },
          },
          '&.MuiPickersDay-today:not(.Mui-selected)': {
            borderColor: c.brand400,
            borderWidth: 1.5,
          },
        },
        dayOutsideMonth: {
          color: c.contentTertiary,
        },
      },
    },

    // ── Calendar header (month/year navigation) ──
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
        },
        label: {
          fontWeight: PRIMITIVES.fontWeight.semibold,
          fontSize: PRIMITIVES.fontSize.md,
          fontFamily: brand.typography.bodyFont,
        },
        switchViewButton: {
          color: c.contentSpot,
          '&:hover': {
            backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : c.bgSunken,
          },
        },
      },
    },

    // ── Arrow buttons (prev/next month) ──
    MuiPickersArrowSwitcher: {
      styleOverrides: {
        button: {
          color: c.contentSpot,
          '&:hover': {
            backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : c.bgSunken,
          },
        },
      },
    },

    // ── Year selection buttons ──
    MuiYearCalendar: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
        },
      },
    },

    // ── Month selection buttons ──
    MuiMonthCalendar: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
        },
      },
    },

    // ── Picker toolbar (top header showing selected value) ──
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          backgroundColor: isDark ? c.bgSunken : c.bgSunken,
          borderBottom: `1px solid ${c.borderWeak}`,
        },
      },
    },

    // ── Picker layout wrapper ──
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
        },
      },
    },

    // ── Desktop picker popper paper ──
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          borderRadius: PRIMITIVES.radius.lg,
          border: `1px solid ${c.borderWeak}`,
          boxShadow: [
            `0 8px 32px 0 ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.12)'}`,
            `0 2px 8px 0 ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)'}`,
          ].join(', '),
          backgroundImage: 'none',
        },
      },
    },

    // ── Time clock ──
    MuiTimeClock: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
        },
      },
    },

    MuiClockPointer: {
      styleOverrides: {
        root: {
          backgroundColor: c.brand400,
        },
        thumb: {
          backgroundColor: c.brand400,
          borderColor: c.brand400,
        },
      },
    },

    MuiClock: {
      styleOverrides: {
        pin: {
          backgroundColor: c.brand400,
        },
      },
    },

    MuiClockNumber: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.sm,
          '&.Mui-selected': {
            backgroundColor: c.brand400,
            color: '#fff',
          },
        },
      },
    },

    // ── Digital clock ──
    MuiDigitalClock: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
        },
        item: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.sm,
          borderRadius: PRIMITIVES.radius.sm,
          '&.Mui-selected': {
            background: fx.gradients.primary,
            color: '#fff',
            boxShadow: fx.shadows.primaryButton,
            '&:hover': {
              background: fx.gradients.primary,
              filter: 'brightness(1.08)',
            },
          },
        },
      },
    },

    MuiMultiSectionDigitalClock: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          borderTop: `1px solid ${c.borderWeak}`,
        },
      },
    },

    MuiMultiSectionDigitalClockSection: {
      styleOverrides: {
        root: {
          '&::after': {
            display: 'none', // Remove fading overlay
          },
        },
        item: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.sm,
          borderRadius: PRIMITIVES.radius.sm,
          '&.Mui-selected': {
            background: fx.gradients.primary,
            color: '#fff',
            '&:hover': {
              background: fx.gradients.primary,
              filter: 'brightness(1.08)',
            },
          },
        },
      },
    },

    // ── DateTimePicker tabs (date/time switcher) ──
    MuiDateTimePickerTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            fontFamily: brand.typography.bodyFont,
          },
          '& .MuiTabs-indicator': {
            background: fx.gradients.primary,
          },
        },
      },
    },

    // ── Picker action bar (OK/Cancel buttons) ──
    MuiPickersActionBar: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          borderTop: `1px solid ${c.borderWeak}`,
        },
      },
    },
  } as Components<Theme>;
}
