import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Divider,
  alpha,
} from '@mui/material';
import { Icon } from '../../components/Icon';
import { config } from '../../config';
import type { DesignRule } from '../../config';

export function DesignRulesPage() {
  const rules = config.designRules.rules;

  // Group rules by category
  const grouped = useMemo(() => {
    const map = new Map<string, DesignRule[]>();
    for (const rule of rules) {
      const existing = map.get(rule.category) ?? [];
      existing.push(rule);
      map.set(rule.category, existing);
    }
    return map;
  }, [rules]);

  return (
    <Box sx={{ p: 4, maxWidth: 960, mx: 'auto' }}>
      {/* Page header */}
      <Typography variant="h4" fontWeight={700}>
        Design Rules
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
        Enforced design rules: spacing grid, icon usage, color contrast,
        component conventions. Rules marked as{' '}
        <Chip
          label="error"
          size="small"
          color="error"
          sx={{ mx: 0.5, height: 22, fontSize: 12 }}
        />{' '}
        will break builds.{' '}
        <Chip
          label="warning"
          size="small"
          color="warning"
          variant="outlined"
          sx={{ mx: 0.5, height: 22, fontSize: 12 }}
        />{' '}
        rules are advisory.
      </Typography>

      {/* Category groups */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[...grouped.entries()].map(([category, categoryRules]) => (
          <CategoryGroup
            key={category}
            category={category}
            rules={categoryRules}
          />
        ))}
      </Box>
    </Box>
  );
}

// ── Category icon mapping ──

const categoryIcons: Record<string, string> = {
  'SPACING & SIZING': 'straighten',
  ICONS: 'emoji_symbols',
  'COLOR & CONTRAST': 'palette',
};

// ── CategoryGroup ──

function CategoryGroup({
  category,
  rules,
}: {
  category: string;
  rules: DesignRule[];
}) {
  const errorCount = rules.filter((r) => r.enforcement === 'error').length;
  const warningCount = rules.filter((r) => r.enforcement === 'warning').length;
  const iconName = categoryIcons[category] ?? 'rule';

  return (
    <Box>
      {/* Category header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 2,
        }}
      >
        <Box
          sx={(theme) => ({
            width: 40,
            height: 40,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            color: 'primary.main',
          })}
        >
          <Icon name={iconName} size={22} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={700} letterSpacing={0.5}>
            {category}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {rules.length} rule{rules.length !== 1 ? 's' : ''}
            {errorCount > 0 && ` \u00b7 ${errorCount} error${errorCount !== 1 ? 's' : ''}`}
            {warningCount > 0 && ` \u00b7 ${warningCount} warning${warningCount !== 1 ? 's' : ''}`}
          </Typography>
        </Box>
      </Box>

      {/* Rules cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {rules.map((rule) => (
          <RuleCard key={rule.id} rule={rule} />
        ))}
      </Box>
    </Box>
  );
}

// ── RuleCard ──

function RuleCard({ rule }: { rule: DesignRule }) {
  const [open, setOpen] = useState(false);
  const hasExceptions = rule.exceptions.length > 0;

  return (
    <Card
      variant="outlined"
      sx={(theme) => ({
        borderColor:
          rule.enforcement === 'error'
            ? alpha(theme.palette.error.main, 0.25)
            : alpha(theme.palette.divider, 1),
        transition: 'box-shadow 0.2s, border-color 0.2s',
        '&:hover': {
          borderColor:
            rule.enforcement === 'error'
              ? alpha(theme.palette.error.main, 0.5)
              : alpha(theme.palette.primary.main, 0.3),
          boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.06)}`,
        },
      })}
    >
      <CardContent sx={{ py: 2, px: 2.5, '&:last-child': { pb: 2 } }}>
        {/* Rule row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          {/* Enforcement icon */}
          <Icon
            name={rule.enforcement === 'error' ? 'error' : 'warning'}
            size={20}
            color={
              rule.enforcement === 'error'
                ? 'var(--mui-palette-error-main, #d32f2f)'
                : 'var(--mui-palette-warning-main, #ed6c02)'
            }
            filled
          />

          {/* Rule text */}
          <Typography
            variant="body2"
            sx={{ flex: 1, fontWeight: 500, lineHeight: 1.5 }}
          >
            {rule.rule}
          </Typography>

          {/* Enforcement chip */}
          <Chip
            label={rule.enforcement}
            size="small"
            color={rule.enforcement === 'error' ? 'error' : 'warning'}
            variant={rule.enforcement === 'error' ? 'filled' : 'outlined'}
            sx={{ height: 24, fontSize: 12, fontWeight: 600 }}
          />

          {/* Expand exceptions button */}
          {hasExceptions && (
            <IconButton
              size="small"
              onClick={() => setOpen((prev) => !prev)}
              sx={{
                ml: 0.5,
                transition: 'transform 0.2s',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              <Icon name="expand_more" size={20} />
            </IconButton>
          )}
        </Box>

        {/* Exception count hint */}
        {hasExceptions && !open && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ ml: 4.5, mt: 0.5, display: 'block', cursor: 'pointer' }}
            onClick={() => setOpen(true)}
          >
            {rule.exceptions.length} exception
            {rule.exceptions.length !== 1 ? 's' : ''} registered
          </Typography>
        )}

        {/* Expandable exceptions */}
        <Collapse in={open}>
          <Divider sx={{ my: 1.5 }} />
          <Typography
            variant="caption"
            fontWeight={600}
            color="text.secondary"
            sx={{ ml: 1, mb: 0.5, display: 'block', textTransform: 'uppercase', letterSpacing: 0.8 }}
          >
            Exceptions
          </Typography>
          <List dense disablePadding>
            {rule.exceptions.map((ex, i) => (
              <ListItem
                key={i}
                sx={(theme) => ({
                  borderRadius: 1,
                  mb: 0.5,
                  bgcolor: alpha(theme.palette.warning.main, 0.04),
                })}
              >
                <Icon
                  name="subdirectory_arrow_right"
                  size={16}
                  color="var(--mui-palette-text-secondary, #666)"
                />
                <ListItemText
                  sx={{ ml: 1 }}
                  primary={
                    <Typography variant="body2" fontWeight={500}>
                      {ex.component}
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mx: 1 }}
                      >
                        &rarr;
                      </Typography>
                      <Typography
                        component="code"
                        sx={{
                          fontSize: 12,
                          px: 0.75,
                          py: 0.25,
                          borderRadius: 0.5,
                          bgcolor: 'action.hover',
                          fontFamily: 'monospace',
                        }}
                      >
                        {ex.override}
                      </Typography>
                    </Typography>
                  }
                  secondary={ex.reason}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </CardContent>
    </Card>
  );
}
