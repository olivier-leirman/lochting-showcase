import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { config as staticConfig, type AppConfig, type WorkspaceConfig } from './index';

interface ConfigContextValue {
  config: AppConfig;
  updateWorkspace: (patch: Partial<WorkspaceConfig>) => void;
}

const ConfigContext = createContext<ConfigContextValue | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [workspace, setWorkspace] = useState<WorkspaceConfig>(staticConfig.workspace);

  const updateWorkspace = useCallback((patch: Partial<WorkspaceConfig>) => {
    setWorkspace(prev => {
      const next = { ...prev, ...patch };
      // Persist to localStorage for session continuity
      localStorage.setItem('bw-ds-workspace', JSON.stringify(next));
      return next;
    });
  }, []);

  const value: ConfigContextValue = {
    config: {
      ...staticConfig,
      workspace,
    },
    updateWorkspace,
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig(): ConfigContextValue {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig must be used within a ConfigProvider');
  return ctx;
}
