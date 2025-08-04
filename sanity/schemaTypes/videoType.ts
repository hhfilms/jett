import {defineType, defineField} from "sanity";
import {HudlNote} from "@/components/Note";

export const videoType = defineType({
  name: "video",
  title: "Hudle Vids",
  type: "document",
  fields: [
    defineField({
      name: "notice",
      type: "string",
      components: {
        input: HudlNote,
      },
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
});
