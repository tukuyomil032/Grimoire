import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Palette, Save, Timer, Layout, Zap, Type } from 'lucide-react';
import { useSettingsStore } from '@/store';

export function SettingsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const locale = useSettingsStore((s) => s.locale);
  const fontSize = useSettingsStore((s) => s.fontSize);
  const autoSave = useSettingsStore((s) => s.autoSave);
  const autoSaveInterval = useSettingsStore((s) => s.autoSaveInterval);
  const showYamlPreview = useSettingsStore((s) => s.showYamlPreview);
  const editorMode = useSettingsStore((s) => s.editorMode);
  const animationsEnabled = useSettingsStore((s) => s.animationsEnabled);

  const setLocale = useSettingsStore((s) => s.setLocale);
  const setFontSize = useSettingsStore((s) => s.setFontSize);
  const setAutoSave = useSettingsStore((s) => s.setAutoSave);
  const setAutoSaveInterval = useSettingsStore((s) => s.setAutoSaveInterval);
  const setShowYamlPreview = useSettingsStore((s) => s.setShowYamlPreview);
  const setEditorMode = useSettingsStore((s) => s.setEditorMode);
  const setAnimationsEnabled = useSettingsStore((s) => s.setAnimationsEnabled);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-foreground/60 transition-colors hover:bg-surface-2 hover:text-foreground"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-lg font-semibold text-foreground">{t('nav.settings')}</h1>
      </div>

      {/* Settings content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl space-y-8 p-6">
          {/* Language */}
          <SettingsSection icon={<Globe size={18} />} title={t('settings.language') || 'Language'}>
            <div className="flex gap-2">
              {(['en', 'ja'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLocale(lang)}
                  className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                    locale === lang
                      ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                      : 'border-border bg-surface-2 text-foreground/60 hover:bg-surface-3'
                  }`}
                >
                  {lang === 'en' ? 'English' : '日本語'}
                </button>
              ))}
            </div>
          </SettingsSection>

          {/* Editor Mode */}
          <SettingsSection
            icon={<Layout size={18} />}
            title={t('settings.editorMode') || 'Editor Mode'}
          >
            <div className="flex gap-2">
              {(['block', 'node', 'both'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setEditorMode(mode)}
                  className={`rounded-md border px-4 py-2 text-sm capitalize transition-colors ${
                    editorMode === mode
                      ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                      : 'border-border bg-surface-2 text-foreground/60 hover:bg-surface-3'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </SettingsSection>

          {/* Font Size */}
          <SettingsSection icon={<Type size={18} />} title={t('settings.fontSize') || 'Font Size'}>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={10}
                max={24}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="flex-1 accent-accent-primary"
              />
              <span className="w-10 text-right text-sm text-foreground/60">{fontSize}px</span>
            </div>
          </SettingsSection>

          {/* Auto Save */}
          <SettingsSection icon={<Save size={18} />} title={t('settings.autoSave') || 'Auto Save'}>
            <div className="space-y-3">
              <ToggleSwitch
                checked={autoSave}
                onChange={setAutoSave}
                label={t('settings.enableAutoSave') || 'Enable auto save'}
              />
              {autoSave && (
                <div className="flex items-center gap-3">
                  <Timer size={14} className="text-foreground/40" />
                  <span className="text-sm text-foreground/60">
                    {t('settings.interval') || 'Interval'}:
                  </span>
                  <input
                    type="number"
                    value={autoSaveInterval}
                    onChange={(e) => setAutoSaveInterval(Number(e.target.value))}
                    min={5}
                    max={300}
                    className="w-20 rounded border border-border bg-surface-2 px-2 py-1 text-sm text-foreground outline-none focus:border-accent-primary"
                  />
                  <span className="text-sm text-foreground/40">sec</span>
                </div>
              )}
            </div>
          </SettingsSection>

          {/* Appearance */}
          <SettingsSection
            icon={<Palette size={18} />}
            title={t('settings.appearance') || 'Appearance'}
          >
            <div className="space-y-3">
              <ToggleSwitch
                checked={showYamlPreview}
                onChange={setShowYamlPreview}
                label={t('settings.showYamlPreview') || 'Show YAML preview'}
              />
              <ToggleSwitch
                checked={animationsEnabled}
                onChange={setAnimationsEnabled}
                label={t('settings.animations') || 'Enable animations'}
              />
            </div>
          </SettingsSection>

          {/* About */}
          <SettingsSection icon={<Zap size={18} />} title={t('menu.about') || 'About'}>
            <div className="space-y-1 text-sm text-foreground/60">
              <p>
                <strong className="text-foreground">Grimoire</strong> — MythicMobs Visual Editor
              </p>
              <p>Version 0.1.0 (MVP)</p>
              <p>License: MIT</p>
              <p className="text-foreground/30">
                Built with Tauri v2, React 19, Blockly, ReactFlow
              </p>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface-1 p-4">
      <div className="mb-3 flex items-center gap-2 text-foreground/80">
        {icon}
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition-colors ${
          checked ? 'bg-accent-primary' : 'bg-surface-3'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-4' : ''
          }`}
        />
      </button>
      <span className="text-sm text-foreground/60">{label}</span>
    </label>
  );
}
