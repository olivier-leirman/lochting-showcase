import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
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

export function buildAllOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  return {
    ...globalOverrides(brand),
    ...buttonOverrides(brand, fx),
    ...buttonGroupOverrides(brand, fx),
    ...checkboxOverrides(brand, fx),
    ...radioOverrides(brand, fx),
    ...switchOverrides(brand, fx),
    ...sliderOverrides(brand, fx),
    ...textFieldOverrides(brand, fx),
    ...selectOverrides(brand, fx),
    ...chipOverrides(brand, fx),
    ...toggleButtonOverrides(brand, fx),
    ...badgeOverrides(brand, fx),
    ...autocompleteOverrides(brand, fx),
    ...tabsOverrides(brand, fx),
    ...stepperOverrides(brand, fx),
    ...dialogOverrides(brand, fx),
    ...tableOverrides(brand, fx),
    ...accordionOverrides(brand, fx),
    ...cardOverrides(brand, fx),
    ...datePickerOverrides(brand, fx),
    ...navigationOverrides(brand, fx),
  };
}
