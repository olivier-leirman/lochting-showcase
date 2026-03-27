import { Tabs } from '@base-ui/react/tabs';
import './BwTabs.css';

export interface BwTabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface BwTabsProps {
  tabs: BwTabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: 'underline' | 'contained' | 'pills';
  className?: string;
}

export function BwTabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  variant = 'underline',
  className = '',
}: BwTabsProps) {
  const resolvedDefault = defaultValue ?? tabs[0]?.value;

  return (
    <Tabs.Root
      value={value}
      defaultValue={resolvedDefault}
      onValueChange={(val) => onValueChange?.(val as string)}
      className={`bw-tabs bw-tabs--${variant} ${className}`}
    >
      <Tabs.List className="bw-tabs__list">
        {tabs.map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className="bw-tabs__tab"
          >
            {tab.label}
          </Tabs.Tab>
        ))}
        {variant === 'underline' && <Tabs.Indicator className="bw-tabs__indicator" />}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Panel key={tab.value} value={tab.value} className="bw-tabs__panel">
          {tab.content}
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
