import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens, StyleProfile } from '../types';
import { DEFAULT_STYLE_PROFILE } from '../types';
import type { Effects } from '../tokens/effects';
import { buttonOverrides } from './button';
import { checkboxOverrides } from './checkbox';
import { radioOverrides } from './radio';
import { switchOverrides } from './switch';
import { sliderOverrides } from './slider';
import { textFieldOverrides } from './text-field';
import { selectOverrides } from './select';
import { chipOverrides } from './chip';
import { toggleButtonOverrides } from './toggle-button';
import { badgeOverrides } from './badge';
import { buttonGroupOverrides } from './button-group';
import { autocompleteOverrides } from './autocomplete';
import { tabsOverrides } from './tabs';
import { stepperOverrides } from './stepper';
import { dialogOverrides } from './dialog';
import { tableOverrides } from './table';
import { accordionOverrides } from './accordion';
import { cardOverrides } from './card';
import { datePickerOverrides } from './date-picker';
import { navigationOverrides } from './navigation';
import { globalOverrides } from './global';

export function buildAllOverrides(
  brand: BrandTokens,
  fx: Effects,
  sp: StyleProfile = DEFAULT_STYLE_PROFILE,
): Components<Theme> {
  return {
    ...globalOverrides(brand),
    ...buttonOverrides(brand, fx, sp),
    ...buttonGroupOverrides(brand, fx, sp),
    ...checkboxOverrides(brand, fx, sp),
    ...radioOverrides(brand, fx, sp),
    ...switchOverrides(brand, fx, sp),
    ...sliderOverrides(brand, fx, sp),
    ...textFieldOverrides(brand, fx, sp),
    ...selectOverrides(brand, fx, sp),
    ...chipOverrides(brand, fx, sp),
    ...toggleButtonOverrides(brand, fx, sp),
    ...badgeOverrides(brand, fx),
    ...autocompleteOverrides(brand, fx, sp),
    ...tabsOverrides(brand, fx, sp),
    ...stepperOverrides(brand, fx),
    ...dialogOverrides(brand, fx, sp),
    ...tableOverrides(brand, fx, sp),
    ...accordionOverrides(brand, fx, sp),
    ...cardOverrides(brand, fx, sp),
    ...datePickerOverrides(brand, fx, sp),
    ...navigationOverrides(brand, fx, sp),
  };
}
