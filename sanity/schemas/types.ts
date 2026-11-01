export type Rule = {
  required: () => Rule;
  min?: (n: number) => Rule;
  max?: (n: number) => Rule;
};

export type SchemaDefinition = Record<string, any>;

export function defineType<T extends SchemaDefinition>(definition: T): T {
  return definition;
}

export function defineField<T extends SchemaDefinition>(definition: T): T {
  return definition;
}

