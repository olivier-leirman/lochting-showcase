import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  IconButton,
  Divider,
  alpha,
} from '@mui/material';
import { Icon } from '../../components/Icon';
import { useBrand } from '../../theme/brand-context';
import {
  runConsistencyCheck,
  type ConsistencyReport,
  type Violation,
  type ViolationCategory,
  type ViolationSeverity,
} from '../../utils/consistency-checker';

const SEVERITY_CONFIG: Record<ViolationSeverity, { icon: string; color: string; label: string }> = {
  error: { icon: 'error', color: '#ef4444', label: 'Critical' },
  warning: { icon: 'warning', color: '#f59e0b', label: 'Warning' },
  suggestion: { icon: 'lightbulb', color: '#22c55e', label: 'Suggestion' },
};

const CATEGORY_ICONS: Record<ViolationCategory, string> = {
  consistency: 'straighten',
  patterns: 'pattern',
  parity: 'compare',
  ux: 'accessibility_new',
};

export function QAReportPage() {
  const { brand } = useBrand();
  const c = brand.colors;

  const report = useMemo(() => runConsistencyCheck(brand), [brand]);
  const [categoryFilter, setCategoryFilter] = useState<ViolationCategory | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (categoryFilter === 'all') return report.violations;
    return report.violations.filter(v => v.category === categoryFilter);
  }, [report.violations, categoryFilter]);

  const errors = report.violations.filter(v => v.severity === 'error').length;
  const warnings = report.violations.filter(v => v.severity === 'warning').length;
  const suggestions = report.violations.filter(v => v.severity === 'suggestion').length;

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={500}>
            QA Report
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Automated consistency, pattern, and parity audit for {brand.name}.
          </Typography>
        </Box>
      </Box>

      {/* Score card */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 4, py: 3, flexWrap: 'wrap' }}>
          {/* Score circle */}
          <Box
            sx={{
              width: 96, height: 96, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
              bgcolor: report.score >= 80 ? alpha('#22c55e', 0.1)
                : report.score >= 60 ? alpha('#f59e0b', 0.1)
                : alpha('#ef4444', 0.1),
              border: '3px solid',
              borderColor: report.score >= 80 ? '#22c55e'
                : report.score >= 60 ? '#f59e0b'
                : '#ef4444',
              flexShrink: 0,
            }}
          >
            <Typography variant="h4" fontWeight={500} sx={{
              color: report.score >= 80 ? '#22c55e' : report.score >= 60 ? '#f59e0b' : '#ef4444',
              lineHeight: 1,
            }}>
              {report.score}
            </Typography>
            <Typography variant="caption" color="text.secondary">/100</Typography>
          </Box>

          {/* Severity summary */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            {(['error', 'warning', 'suggestion'] as ViolationSeverity[]).map(sev => {
              const count = sev === 'error' ? errors : sev === 'warning' ? warnings : suggestions;
              const cfg = SEVERITY_CONFIG[sev];
              return (
                <Box key={sev} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon name={cfg.icon} size={20} color={cfg.color} filled />
                  <Box>
                    <Typography variant="h6" sx={{ lineHeight: 1, fontWeight: 500 }}>{count}</Typography>
                    <Typography variant="caption" color="text.secondary">{cfg.label}</Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Category breakdown */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', ml: 'auto' }}>
            {report.categories.filter(cat => cat.total > 0).map(cat => (
              <Chip
                key={cat.category}
                icon={<Icon name={CATEGORY_ICONS[cat.category]} size={16} />}
                label={`${cat.label} ${cat.total}`}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Category filter */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <ToggleButtonGroup
          value={categoryFilter}
          exclusive
          onChange={(_, val) => val && setCategoryFilter(val)}
          size="small"
        >
          <ToggleButton value="all" sx={{ textTransform: 'none', px: 2 }}>
            All ({report.violations.length})
          </ToggleButton>
          {report.categories.map(cat => (
            <ToggleButton key={cat.category} value={cat.category} sx={{ textTransform: 'none', px: 2 }}>
              <Icon name={CATEGORY_ICONS[cat.category]} size={16} sx={{ mr: 0.5 }} />
              {cat.label} ({cat.total})
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography variant="caption" color="text.disabled">
          {new Date(report.checkedAt).toLocaleString()}
        </Typography>
      </Box>

      {/* Violations list */}
      {filtered.length === 0 ? (
        <Card variant="outlined" sx={{ textAlign: 'center', py: 6 }}>
          <Icon name="check_circle" size={48} color="#22c55e" />
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
            No issues found
          </Typography>
          <Typography color="text.secondary">
            {categoryFilter === 'all' ? 'Everything looks great!' : `No ${categoryFilter} issues detected.`}
          </Typography>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {filtered.map((v, i) => (
            <ViolationCard
              key={`${v.component}-${i}`}
              violation={v}
              copiedId={copiedId}
              onCopyPrompt={copyPrompt}
              index={i}
            />
          ))}
        </Box>
      )}

      {/* Claude Code Tasks section */}
      {report.violations.some(v => v.claudeCodePrompt) && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" fontWeight={500} sx={{ mb: 2 }}>
            <Icon name="terminal" size={24} sx={{ verticalAlign: 'middle', mr: 1 }} />
            Claude Code Tasks
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Copy-paste ready prompts to fix issues with Claude Code.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {report.violations.filter(v => v.claudeCodePrompt).map((v, i) => (
              <Card key={i} variant="outlined">
                <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 }, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={500}>{v.component}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'monospace',
                        color: 'text.secondary',
                        display: 'block',
                        mt: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {v.claudeCodePrompt}
                    </Typography>
                  </Box>
                  <Tooltip title={copiedId === `task-${i}` ? 'Copied!' : 'Copy prompt'}>
                    <IconButton
                      size="small"
                      onClick={() => copyPrompt(v.claudeCodePrompt!, `task-${i}`)}
                    >
                      <Icon name={copiedId === `task-${i}` ? 'check' : 'content_copy'} size={18} />
                    </IconButton>
                  </Tooltip>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

/* ── Violation card ── */

function ViolationCard({
  violation: v,
  copiedId,
  onCopyPrompt,
  index,
}: {
  violation: Violation;
  copiedId: string | null;
  onCopyPrompt: (prompt: string, id: string) => void;
  index: number;
}) {
  const cfg = SEVERITY_CONFIG[v.severity];

  return (
    <Card variant="outlined">
      <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          <Icon name={cfg.icon} size={18} color={cfg.color} filled sx={{ mt: 0.25, flexShrink: 0 }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
              <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                {v.component}
              </Typography>
              <Chip
                label={v.category}
                size="small"
                sx={{ height: 18, fontSize: '0.6rem', '& .MuiChip-label': { px: 0.75 } }}
              />
              {v.autoFixAvailable && (
                <Chip
                  label="Auto-fix"
                  size="small"
                  color="success"
                  sx={{ height: 18, fontSize: '0.6rem', '& .MuiChip-label': { px: 0.75 } }}
                />
              )}
            </Box>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              {v.violation}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              <Icon name="tips_and_updates" size={14} sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              {v.suggestion}
            </Typography>
          </Box>
          {v.claudeCodePrompt && (
            <Tooltip title={copiedId === `v-${index}` ? 'Copied!' : 'Copy Claude Code prompt'}>
              <IconButton size="small" onClick={() => onCopyPrompt(v.claudeCodePrompt!, `v-${index}`)}>
                <Icon name={copiedId === `v-${index}` ? 'check' : 'content_copy'} size={16} />
              </IconButton>
            </Tooltip>
          )}
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: cfg.color,
              flexShrink: 0,
              alignSelf: 'center',
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
