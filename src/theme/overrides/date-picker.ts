import { createElement } from 'react';

import type { BrandTokens, StyleProfile } from '../types';
import { DEFAULT_STYLE_PROFILE } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

/* ── Material Symbols Rounded helper (weight 200, outline) ── */
function msIcon(name: string, size = 20, color?: string) {
  return (props: Record<string, unknown>) =>
    createElement('span', {
      ...props,
      className: 'material-symbols-rounded',
      style: {
        fontFamily: '"Material Symbols Rounded"',
        fontVariationSettings: `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' ${size}`,
        fontSize: size,
        lineHeight: 1,
        color,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        WebkitFontSmoothing: 'antialiased',
        ...(props?.style as object || {}),
      },
    }, name);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function datePickerOverrides(brand: BrandTokens, fx: Effects, sp: StyleProfile = DEFAULT_STYLE_PROFILE): Record<string, any> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';

  /** Weak brand accent — same as chip colorPrimary / sidebar active item */
  const selectedBg = isDark ? c.brand500 : c.brand100;
  const selectedColor = isDark ? c.brand200 : c.brand450;
  const selectedShadow = fx.shadows.chipBrand;

  // Icon components — Material Symbols Rounded, weight 200, outline
  const CalendarIcon = msIcon('calendar_today', 20, c.contentSecondary);
  const ClockIcon = msIcon('schedule', 20, c.contentSecondary);
  const ChevronLeftIcon = msIcon('chevron_left', 20, c.contentSecondary);
  const ChevronRightIcon = msIcon('chevron_right', 20, c.contentSecondary);
  const DropdownIcon = msIcon('stat_minus_1', 20, c.contentSecondary);

  return {
    // ── DatePicker / TimePicker / DateTimePicker (input field) ──
    MuiPickersTextField: {
      defaultProps: {
        variant: 'outlined' as const,
      },
    },

    // ── Picker outlined input — match textfield overrides ──
    MuiPickersOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: sp.radius.md,
          backgroundColor: c.bgSunken,
          boxShadow: fx.shadows.textfield,
          fontFamily: brand.typography.bodyFont,
          '&:hover .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: c.brand300,
          },
          '&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: c.brand400,
            borderWidth: 1.5,
          },
        },
        notchedOutline: {
          borderColor: c.borderDefault,
        },
        input: {
          fontSize: PRIMITIVES.fontSize.md,
          color: c.contentPrimary,
          fontFamily: brand.typography.bodyFont,
        },
        inputSizeSmall: {
          fontSize: PRIMITIVES.fontSize.sm,
        },
      },
    },

    // ── Picker input label — match textfield label overrides ──
    MuiPickersInputBase: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
        },
      },
    },

    // ── DatePicker — custom icon slots ──
    MuiDatePicker: {
      defaultProps: {
        slots: {
          openPickerIcon: CalendarIcon,
          leftArrowIcon: ChevronLeftIcon,
          rightArrowIcon: ChevronRightIcon,
          switchViewIcon: DropdownIcon,
        },
      },
    },

    // ── TimePicker — custom icon slots ──
    MuiTimePicker: {
      defaultProps: {
        slots: {
          openPickerIcon: ClockIcon,
          leftArrowIcon: ChevronLeftIcon,
          rightArrowIcon: ChevronRightIcon,
        },
      },
    },

    // ── DateTimePicker — custom icon slots ──
    MuiDateTimePicker: {
      defaultProps: {
        slots: {
          openPickerIcon: CalendarIcon,
          leftArrowIcon: ChevronLeftIcon,
          rightArrowIcon: ChevronRightIcon,
          switchViewIcon: DropdownIcon,
        },
      },
    },

    // ── DateCalendar root ──
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          borderRadius: sp.radius.md,
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
          borderRadius: sp.radius.sm,
          '&:hover': {
            backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : c.bgSunken,
          },
          '&.Mui-selected': {
            backgroundColor: selectedBg,
            color: selectedColor,
            boxShadow: selectedShadow,
            '&:hover': {
              backgroundColor: selectedBg,
              filter: isDark ? 'brightness(1.12)' : 'brightness(0.97)',
            },
            '&:focus': {
              backgroundColor: selectedBg,
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

    // ── Date range picker day (between-dates highlight) ──
    MuiDateRangePickerDay: {
      styleOverrides: {
        rangeIntervalDayHighlight: {
          backgroundColor: c.bgSurface,
        },
        rangeIntervalDayPreview: {
          borderColor: c.borderWeak,
        },
        dayInsideRangeInterval: {
          color: c.contentPrimary,
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
          fontWeight: PRIMITIVES.fontWeight.medium,
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
          backgroundColor: c.bgSunken,
          borderBottom: `1px solid ${c.borderWeak}`,
        },
      },
    },

    // ── Desktop picker popper paper ──
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          borderRadius: sp.radius.lg,
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
            backgroundColor: selectedBg,
            color: selectedColor,
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
          borderRadius: sp.radius.sm,
          '&.Mui-selected': {
            backgroundColor: selectedBg,
            color: selectedColor,
            boxShadow: selectedShadow,
            '&:hover': {
              backgroundColor: selectedBg,
              filter: isDark ? 'brightness(1.12)' : 'brightness(0.97)',
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
          borderRadius: sp.radius.sm,
          '&.Mui-selected': {
            backgroundColor: selectedBg,
            color: selectedColor,
            boxShadow: selectedShadow,
            '&:hover': {
              backgroundColor: selectedBg,
              filter: isDark ? 'brightness(1.12)' : 'brightness(0.97)',
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
            backgroundColor: c.brand400,
          },
        },
      },
    },

    // ── Picker layout — action bar button styling ──
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
        },
        actionBar: {
          padding: '8px 16px',
          borderTop: `1px solid ${c.borderWeak}`,
          '& .MuiButton-root': {
            fontFamily: brand.typography.bodyFont,
            fontWeight: PRIMITIVES.fontWeight.medium,
            fontSize: PRIMITIVES.fontSize.sm,
            textTransform: 'none' as const,
            borderRadius: sp.radius.md,
            minWidth: 80,
            padding: '8px 20px',
          },
          // Cancel button (first) → outlined / secondary style
          '& .MuiButton-root:first-of-type': {
            border: `1px solid ${c.borderDefault}`,
            background: fx.gradients.secondary,
            color: c.contentSecondary,
            boxShadow: fx.shadows.secondaryButton,
            '&:hover': {
              background: fx.gradients.secondary,
              filter: isDark ? 'brightness(1.12)' : 'brightness(0.97)',
            },
          },
          // OK/Accept button (last) → contained / primary style
          '& .MuiButton-root:last-of-type': {
            background: fx.gradients.primary,
            color: '#fff',
            border: 'none',
            boxShadow: fx.shadows.primaryButton,
            '&:hover': {
              background: fx.gradients.primary,
              boxShadow: fx.shadows.primaryButtonHover,
              filter: 'brightness(1.08)',
            },
          },
        },
      },
    },
  };
}
