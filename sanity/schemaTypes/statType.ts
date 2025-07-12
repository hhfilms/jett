import {defineType, defineField} from "sanity";

export const statType = defineType({
  preview: {
    select: {
      opponent: "opponent",
      gameDate: "gameDate",
    },
    prepare({opponent, gameDate}) {
      return {
        title: `AHS vs ${opponent}`,
        subtitle: gameDate,
      };
    },
  },
  name: "stat",
  title: "Stat",
  type: "document",
  fields: [
    defineField({
      name: "gameDate",
      title: "Game Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "opponent",
      title: "Opponent",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "homeOrAway",
      title: "Home or Away",
      type: "string",
      options: {
        list: [
          {title: "Home", value: "home"},
          {title: "Away", value: "away"},
        ],
        layout: "radio", // optional: 'dropdown' or 'radio'
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "passingYards",
      title: "Passing Yards",
      type: "number",
    }),
    defineField({
      name: "rushingYards",
      title: "Rushing Yards",
      type: "number",
    }),

    defineField({
      name: "rushingTds",
      title: "Rushing Touchdowns",
      type: "number",
    }),

    defineField({
      name: "touchdowns",
      title: "Touchdowns",
      type: "number",
    }),

    defineField({
      name: "attempts",
      title: "Attempts",
      type: "number",
    }),

    defineField({
      name: "completions",
      title: "Completions",
      type: "number",
    }),

    defineField({
      name: "interceptions",
      title: "Interceptions",
      type: "number",
    }),
  ],
});
