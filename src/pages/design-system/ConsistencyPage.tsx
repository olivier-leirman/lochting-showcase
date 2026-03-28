import { useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Divider,
  alpha,
} from '@mui/material';
import { Icon } from '../../components/Icon';
import { useBrand } from '../../theme/brand-context';
import { runConsistencyCheck, type ConsistencyReport, type Violation } from '../../utils/consistency-checker';

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 90 ? 'success' : score >= 70 ? 'warning' : 'error';
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h2" sx={{ fontWeight: 500, fontSize: '3.5rem' }}>
        {score}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
        Health Score
      </Typography>
      <LinearProgress
        variant="determinate"
        value={score}
        color={color}
        sx={{ height: 8, borderRadius: 4, maxWidth: 200, mx: 'auto' }}
      />
    </Box>
  );
}

function ViolationCard({ violation }: { violation: Violation }) {
  const isError = violation.severity === 'error';
  return (
    <Card
      variant="outlined"
      sx={(theme) => ({
        borderColor: isError
          ? alpha(theme.palette.error.main, 0.3)
          : alpha(theme.palette.warning.main, 0.3),
      })}
    >
      <CardContent sx={{ py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          <Icon
            name={isError ? 'error' : 'warning'}
            size={18}
            filled
            color={isError ? 'error.main' : 'warning.main'}
            sx={{ mt: 0.25, flexShrink: 0 }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography
                component="code"
                sx={{
                  fontSize: '0.75rem',
                  px: 0.75,
                  py: 0.25,
                  borderRadius: 0.5,
                  bgcolor: 'action.hover',
                  fontFamily: 'monospace',
                  fontWeight: 500,
                }}
              >
                {violation.component}
              </Typography>
              {violation.autoFixAvailable && (
                <Chip
                  label="auto-fix"
                  size="small"
                  color="info"
                  variant="outlined"
                  sx={{ height: 20, fontSize: '0.65rem' }}
                />
              )}
            </Box>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              {violation.violation}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              <Icon name="lightbulb" size={12} sx={{ mr: 0.5, verticalAlign: 'text-bottom' }} />
              {violation.suggestion}
            </Typography>
          </Box>
          <Chip
            label={violation.severity}
            size="small"
            color={isError ? 'error' : 'warning'}
            variant={isError ? 'filled' : 'outlined'}
            sx={{ height: 22, fontSize: '0.7rem', fontWeight: 500, flexShrink: 0 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

function BrandReport({ report }: { report: ConsistencyReport }) {
  const errors = report.violations.filter((v) => v.severity === 'error');
  const warnings = report.violations.filter((v) => v.severity === 'warning');

  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <ScoreGauge score={report.score} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {report.brand}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
              {errors.length > 0 && (
                <Chip
                  icon={<Icon name="error" size={14} />}
                  label={`${errors.length} error${errors.length !== 1 ? 's' : ''}`}
                  size="small"
                  color="error"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
              )}
              {warnings.length > 0 && (
                <Chip
                  icon={<Icon name="warning" size={14} />}
                  label={`${warnings.length} warning${warnings.length !== 1 ? 's' : ''}`}
                  size="small"
                  color="warning"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
              )}
              {report.violations.length === 0 && (
                <Chip
                  icon={<Icon name="check_circle" size={14} />}
                  label="All checks passed"
                  size="small"
                  color="success"
                  sx={{ fontSize: '0.75rem' }}
                />
              )}
            </Box>
          </Box>
        </Box>

        {report.violations.length > 0 && (
          <>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {report.violations.map((v, i) => (
                <ViolationCard key={i} violation={v} />
              ))}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function ConsistencyPage() {
  const { platforms } = useBrand();

  const reports = useMemo(() => {
    const allReports: ConsistencyReport[] = [];
    for (const platform of platforms) {
      for (const style of platform.styles) {
        allReports.push(runConsistencyCheck(style.tokens));
      }
    }
    return allReports;
  }, [platforms]);

  const overallScore = Math.round(
    reports.reduce((sum, r) => sum + r.score, 0) / reports.length,
  );
  const totalErrors = reports.reduce(
    (sum, r) => sum + r.violations.filter((v) => v.severity === 'error').length,
    0,
  );
  const totalWarnings = reports.reduce(
    (sum, r) => sum + r.violations.filter((v) => v.severity === 'warning').length,
    0,
  );

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 1, fontSize: '2.5rem' }}>
        Consistency Checker
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Automated design rule validation across all brands and styles. Checks spacing grid,
        color contrast, typography, button heights, and style profile consistency.
      </Typography>

      {/* Overview stats */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <Card
          variant="outlined"
          sx={{ flex: '1 1 180px', maxWidth: 240 }}
        >
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <ScoreGauge score={overallScore} />
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
              Overall ({reports.length} brand{reports.length !== 1 ? 's' : ''})
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 140px', maxWidth: 200 }}>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Icon name="error" size={28} filled color="error.main" />
            <Typography variant="h4" sx={{ fontWeight: 500, mt: 1 }}>
              {totalErrors}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Errors
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 140px', maxWidth: 200 }}>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Icon name="warning" size={28} filled color="warning.main" />
            <Typography variant="h4" sx={{ fontWeight: 500, mt: 1 }}>
              {totalWarnings}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Warnings
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 140px', maxWidth: 200 }}>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Icon name="check_circle" size={28} filled color="success.main" />
            <Typography variant="h4" sx={{ fontWeight: 500, mt: 1 }}>
              {reports.filter((r) => r.violations.length === 0).length}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Clean brands
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Per-brand reports */}
      <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
        <Icon name="analytics" size={20} sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
        Brand Reports
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Detailed violation report for each brand × style combination.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {reports.map((report) => (
          <BrandReport key={report.brand} report={report} />
        ))}
      </Box>
    </Box>
  );
}
