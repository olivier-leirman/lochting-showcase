import { Box, Typography, Divider, Paper } from '@mui/material';
import { useBrand } from '../../theme/brand-context';
import { CodeBlock } from '../../showcase/blocks/CodeBlock';

interface EffectCardProps {
  name: string;
  description: string;
  css: string;
  gradient?: string;
  shadow?: string;
  strongWeight: number;
}

function EffectCard({ name, description, css, gradient, shadow, strongWeight }: EffectCardProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="body1" sx={{ fontWeight: strongWeight, mb: 0.5 }}>{name}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>{description}</Typography>
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
        <Paper
          elevation={0}
          sx={{
            width: 120,
            height: 80,
            borderRadius: 2,
            flexShrink: 0,
            border: '1px solid',
            borderColor: 'divider',
            ...(gradient && { background: gradient }),
            ...(shadow && { boxShadow: shadow }),
            ...(!gradient && !shadow && { bgcolor: 'background.paper' }),
          }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <CodeBlock code={css} language="css" />
        </Box>
      </Box>
    </Box>
  );
}

export function EffectsPage() {
  const { effects, brand } = useBrand();
  const sw = brand.typography.strongWeight ?? 600;

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 4, fontSize: '2.5rem' }}>Effects</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
        Gradients and layered shadows that define the {brand.name} design system's signature tactile feel. All effects adapt when switching brands.
      </Typography>
      <CodeBlock
        code={`import { useBrand } from './theme/brand-context';\nconst { effects } = useBrand();\n// effects.gradients.primary, effects.shadows.primaryButton, etc.`}
        language="tsx"
      />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ mb: 2, fontFamily: 'inherit' }}>Gradients</Typography>

      <EffectCard
        name="Primary"
        description="Used on primary buttons, switch tracks (on), slider tracks, and checked checkboxes/radios."
        gradient={effects.gradients.primary}
        css={`background: ${effects.gradients.primary};`}
        strongWeight={sw}
      />
      <EffectCard
        name="Secondary"
        description="Used on secondary buttons and elevated surfaces."
        gradient={effects.gradients.secondary}
        css={`background: ${effects.gradients.secondary};`}
        strongWeight={sw}
      />
      <EffectCard
        name="Inactive"
        description="Used on unchecked checkboxes, switch tracks (off), slider rails, and input backgrounds."
        gradient={effects.gradients.inactive}
        css={`background: ${effects.gradients.inactive};`}
        strongWeight={sw}
      />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ mb: 2, fontFamily: 'inherit' }}>Shadows</Typography>

      <EffectCard
        name="Primary Button"
        description="Drop shadow + two inner highlights for depth on primary buttons."
        gradient={effects.gradients.primary}
        shadow={effects.shadows.primaryButton}
        css={`box-shadow: ${effects.shadows.primaryButton};`}
        strongWeight={sw}
      />
      <EffectCard
        name="Secondary Button"
        description="Subtle drop shadow + two inner highlights for secondary buttons."
        gradient={effects.gradients.secondary}
        shadow={effects.shadows.secondaryButton}
        css={`box-shadow: ${effects.shadows.secondaryButton};`}
        strongWeight={sw}
      />
      <EffectCard
        name="Inactive"
        description="Inset-only shadows creating a sunken appearance for inactive elements."
        gradient={effects.gradients.inactive}
        shadow={effects.shadows.inactive}
        css={`box-shadow: ${effects.shadows.inactive};`}
        strongWeight={sw}
      />
      <EffectCard
        name="Inner Element"
        description="Drop shadow + inner shadow for floating inner elements like switch/slider thumbs."
        shadow={effects.shadows.innerElement}
        css={`box-shadow: ${effects.shadows.innerElement};`}
        strongWeight={sw}
      />
      <EffectCard
        name="Textfield"
        description="Symmetric inner highlights for input fields."
        shadow={effects.shadows.textfield}
        css={`box-shadow: ${effects.shadows.textfield};`}
        strongWeight={sw}
      />
      <EffectCard
        name="Chip Brand"
        description="Brand-tinted inner shadows for chip components."
        shadow={effects.shadows.chipBrand}
        css={`box-shadow: ${effects.shadows.chipBrand};`}
        strongWeight={sw}
      />
    </Box>
  );
}
