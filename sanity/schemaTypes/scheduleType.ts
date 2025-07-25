import {defineType, defineField} from "sanity";

export const scheduleType = defineType({
  name: "schedule",
  title: "Schedule",
  type: "document",
  preview: {
    select: {
      year: "year",
      games: "games",
    },
    prepare({year, games}) {
      const firstGame = games?.[0];
      return {
        title: `${year} Season Schedule`,
        subtitle: firstGame ? `First: AHS vs ${firstGame.opponent} on ${firstGame.gameDate}` : "No games scheduled",
      };
    },
  },
  fields: [
    defineField({
      name: "year",
      title: "Season Year",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "games",
      title: "Games",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "gameDate",
              title: "Game Date",
              type: "date",
              validation: (rule) => rule.required(),
            },
            {
              name: "opponent",
              title: "Opponent",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "homeOrAway",
              title: "Home or Away",
              type: "string",
              options: {
                list: [
                  {title: "Home", value: "home"},
                  {title: "Away", value: "away"},
                ],
                layout: "radio",
              },
              validation: (rule) => rule.required(),
            },
            {
              name: "result",
              title: "Result",
              type: "string",
              options: {
                list: [
                  {title: "Win", value: "win"},
                  {title: "Loss", value: "loss"},
                  {title: "Tie", value: "tie"},
                ],
                layout: "radio",
              },
            },
            {
              name: "time",
              title: "Time",
              type: "string",
            },
            {
              name: "score",
              title: "Score",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
});
