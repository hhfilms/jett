import {defineType, defineField} from "sanity";
import UrlWithMetadata from "@/components/UrlWithMetaData";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required().uri({scheme: ["http", "https"]}),
      components: {
        input: UrlWithMetadata,
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "imageUrl",
      title: "Image URL",
      type: "string",
    }),
  ],
});
