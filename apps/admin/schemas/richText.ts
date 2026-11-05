import { defineArrayMember, defineType } from "sanity";

export const richTextType = defineType({
  name: "richText",
  title: "Rich Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 1", value: "h1" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet List", value: "bullet" },
        { title: "Numbered List", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      name: "quote",
      title: "Quote / Scripture Callout",
      type: "object",
      fields: [
        {
          name: "quote",
          title: "Quote / Scripture Text",
          type: "text",
          rows: 3,
          description: "The core scripture verse, excerpt, or memorable quote.",
          validation: (rule) => rule.required(),
        },
        {
          name: "attribution",
          title: "Author / Speaker",
          type: "string",
          placeholder: "e.g. Pastor Fred Odekhian",
        },
        {
          name: "reference",
          title: "Bible Verse / Reference Citation",
          type: "string",
          placeholder: "e.g. 1 Corinthians 2:4 or Romans 8:28",
        },
      ],
      preview: {
        select: {
          title: "quote",
          subtitle: "reference",
          author: "attribution",
        },
        prepare(selection) {
          const { title, subtitle, author } = selection;
          const cite = [author, subtitle].filter(Boolean).join(" • ");
          return {
            title: title ? `“${title}”` : "Untitled Quote",
            subtitle: cite || "Scripture / Quote Callout",
          };
        },
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
  ],
});
