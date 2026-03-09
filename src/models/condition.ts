export interface ConditionParameterSchema {
  name: string;
  type: 'number' | 'string' | 'boolean' | 'material';
  description: Record<string, string>;
  required?: boolean;
  defaultValue?: string | number | boolean;
}

export interface ConditionSchema {
  name: string;
  aliases: string[];
  category:
    | 'entity'
    | 'location'
    | 'compare'
    | 'meta'
    | 'position'
    | 'variable'
    | 'world'
    | 'relationship'
    | 'plugin'
    | 'other';
  description: Record<string, string>;
  parameters: ConditionParameterSchema[];
}
