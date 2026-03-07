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
  };
}
