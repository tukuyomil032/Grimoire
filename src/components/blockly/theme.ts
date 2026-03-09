import Blockly from 'blockly';

/**
 * Dark theme for Blockly that matches Grimoire's design system.
 */
export const grimoireDarkTheme = Blockly.Theme.defineTheme('grimoire_dark', {
  name: 'grimoire_dark',
  base: Blockly.Themes.Classic,
  blockStyles: {
    trigger_blocks: {
      colourPrimary: '#E53E3E', // block-trigger red
      colourSecondary: '#C53030',
      colourTertiary: '#9B2C2C',
      hat: 'cap',
    },
    mechanic_blocks: {
      colourPrimary: '#8B5CF6', // accent-primary purple
      colourSecondary: '#7C3AED',
      colourTertiary: '#6D28D9',
    },
    condition_blocks: {
      colourPrimary: '#F6AD55', // block-condition orange
      colourSecondary: '#ED8936',
      colourTertiary: '#DD6B20',
    },
    targeter_blocks: {
      colourPrimary: '#06B6D4', // accent-secondary cyan
      colourSecondary: '#0891B2',
      colourTertiary: '#0E7490',
    },
    meta_blocks: {
      colourPrimary: '#48BB78', // block-meta green
      colourSecondary: '#38A169',
      colourTertiary: '#2F855A',
    },
    variable_blocks: {
      colourPrimary: '#9F7AEA',
      colourSecondary: '#805AD5',
      colourTertiary: '#6B46C1',
    },
  },
  categoryStyles: {
    trigger_category: { colour: '#E53E3E' },
    mechanic_category: { colour: '#8B5CF6' },
    condition_category: { colour: '#F6AD55' },
    targeter_category: { colour: '#06B6D4' },
    meta_category: { colour: '#48BB78' },
    variable_category: { colour: '#9F7AEA' },
  },
  componentStyles: {
    workspaceBackgroundColour: '#0D0D14',
    toolboxBackgroundColour: '#111118',
    toolboxForegroundColour: '#A0A0B0',
    flyoutBackgroundColour: '#15151F',
    flyoutForegroundColour: '#A0A0B0',
    flyoutOpacity: 0.95,
    scrollbarColour: '#2A2A3A',
    scrollbarOpacity: 0.6,
    insertionMarkerColour: '#8B5CF6',
    insertionMarkerOpacity: 0.3,
    cursorColour: '#8B5CF6',
  },
  fontStyle: {
    family: 'Inter, system-ui, sans-serif',
    weight: 'normal',
    size: 12,
  },
  startHats: true,
});
