import {defineType, defineField} from "sanity";

export const statType = defineType({
  name: "stat",
  title: "Stat",
  type: "document",
  preview: {
    select: {
      season: "season",
      games: "games",
    },
    prepare({season, games}) {
      const firstGame = games?.[0];
      return {
        title: `${season} Season Stats`,
        subtitle: firstGame ? `First: AHS vs ${firstGame.opponent} on ${firstGame.gameDate}` : "No stats available",
      };
    },
  },
  fields: [
    defineField({
      name: "season",
      title: "Season",
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
            {name: "completions", title: "Completions", type: "number"},
            {name: "attempts", title: "Attempts", type: "number"},
            {name: "passingYards", title: "Passing Yards", type: "number"},
            {name: "touchdowns", title: "Passing Touchdowns", type: "number"},
            {name: "rushingYards", title: "Rushing Yards", type: "number"},
            {name: "rushingTds", title: "Rushing Touchdowns", type: "number"},
            {name: "interceptions", title: "Interceptions", type: "number"},
          ],
        },
      ],
    }),
  ],
});
