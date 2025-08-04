import {defineType, defineField} from "sanity";
import {BioNote} from "@/components/Note";

export const bioType = defineType({
  name: "bio",
  title: "Bio Info",
  type: "document",
  fields: [
    defineField({
      name: "notice",
      type: "string",
      components: {
        input: BioNote,
      },
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "school",
      title: "School",
      type: "string",
    }),
    defineField({
      name: "jersyNumber",
      title: "Jersey #",
      type: "number",
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
    }),
    defineField({
      name: "graduationYear",
      title: "Graduation Year",
      type: "string",
    }),
    defineField({
      name: "nickname",
      title: "Nickname",
      type: "string",
    }),
    defineField({
      name: "heightFeet",
      title: "Height (Feet)",
      type: "number",
      validation: (rule) => rule.min(0).max(8),
    }),
    defineField({
      name: "heightInches",
      title: "Height (Inches)",
      type: "number",
      validation: (rule) => rule.min(0).max(11),
    }),
    defineField({
      name: "weight",
      title: "Weight",
      type: "number",
    }),
    defineField({
      name: "statement",
      title: "Personal Statement",
      type: "string",
    }),
    
    

  ],
});
