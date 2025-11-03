// Series-specific memes mapped by series ID (matches seriesId in database)
// Each series can have custom reaction GIFs for rate/hate actions
import { SeriesMeme, Meme } from "@/types";

export const seriesMemes: SeriesMeme[] = [
  {
    id: "s1",
    name: "Dark",
    hateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnJ4M29nMml0dnkwcmQ0bWRiN2dtZXdoeThveXNycmU2aGZhYjk2NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dYfBdBGvCuPWBp759y/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnJ4M29nMml0dnkwcmQ0bWRiN2dtZXdoeThveXNycmU2aGZhYjk2NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohs81iyx43AEB394I/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnJ4M29nMml0dnkwcmQ0bWRiN2dtZXdoeThveXNycmU2aGZhYjk2NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohs80N543Ccmt68x2/giphy.gif"
    ],
    rateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnJ4M29nMml0dnkwcmQ0bWRiN2dtZXdoeThveXNycmU2aGZhYjk2NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUOxfbQ47hDoRLeZji/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnJ4M29nMml0dnkwcmQ0bWRiN2dtZXdoeThveXNycmU2aGZhYjk2NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/j0pVehV4mRbxYv3PbP/giphy.gif"
    ]
  },
  {
    id: "s2",
    name: "Game of Thrones",
    hateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazFocThhczRmdmdvYmpoYTA5dW12b2QzZDAydG85YzhlN3g5N2RuNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xTcnTehwgRcbgymhTW/giphy.gif"
    ],
    rateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWwzM3poNWcwOWJuOHdkb2lwcWtzOHNjem52eHZteGs5bnBjeGJ4bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fmd46gcrNQJePMU6xa/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWwzM3poNWcwOWJuOHdkb2lwcWtzOHNjem52eHZteGs5bnBjeGJ4bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qCJQuCrgbec7u/giphy.gif"
    ]
  },
  {
    id: "s3",
    name: "Breaking Bad",
    hateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY24xYzVxZnMzMWU2dGh2Y3EwMTdzYWFuanN3cTBlMGY5eHk1bDA1OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/h4y0sg9fCZKHkExyG2/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY24xYzVxZnMzMWU2dGh2Y3EwMTdzYWFuanN3cTBlMGY5eHk1bDA1OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/TP9fAOi5StGsU/giphy.gif"
    ],
    rateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY24xYzVxZnMzMWU2dGh2Y3EwMTdzYWFuanN3cTBlMGY5eHk1bDA1OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1nCfZ1mDXGcyk/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY24xYzVxZnMzMWU2dGh2Y3EwMTdzYWFuanN3cTBlMGY5eHk1bDA1OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/iowmvjVUnDFGU/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY24xYzVxZnMzMWU2dGh2Y3EwMTdzYWFuanN3cTBlMGY5eHk1bDA1OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/yE72eDy7lj3JS/giphy.gif"
    ]
  },
  {
    id: "s4",
    name: "Hannibal",
    hateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDh6cmtydXNpN3QzOWhyMXdoMjY0dHNzaXViZTNsengwN2N0NWpjZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ExaDyHeNWx2iA/giphy.gif"
    ],
    rateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDh6cmtydXNpN3QzOWhyMXdoMjY0dHNzaXViZTNsengwN2N0NWpjZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Y42w4LXdFeI6s/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDh6cmtydXNpN3QzOWhyMXdoMjY0dHNzaXViZTNsengwN2N0NWpjZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rTb3Q9F3wKQCc/giphy.gif"
    ]
  },
  {
    id: "s5",
    name: "From",
    hateMemes: [
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHBseTRqdms3YW10Ymh6cWdoNTNkMmloOXNxZ2M4eGRjYm9iY2toaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WmtTa52BN4zTdDdyV7/giphy.gif",
    ],
    rateMemes: [
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHhieTFqMnppN2Jxa2Fkd293bnhmdDVrc2VtbDZoemxzc2lybWh5NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/98MaHVwJOmWMz4cz1K/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmh0MjM5NHRsd2l2NnNhajh0bmpuajlqN2Jrd3FnejNkNmR6bDJqcCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/hRYXatty4dJks/giphy.gif"
    ]
  },
  {
    id: "s6",
    name: "Wednesday",
    hateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTlmZjhyN3Blc2MzMmwzcW5sdnU3NDBuOXhpYTZ1c3Rxb2podTB5byZlcD12MV9naWZzX3NlYXJjaCZjdD1n/TU76e2JHkPchG/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHhieTFqMnppN2Jxa2Fkd293bnhmdDVrc2VtbDZoemxzc2lybWh5NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OPU6wzx8JrHna/giphy.gif"
    ],
    rateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczFxZGt1Y2h3bGExNHlxbGRnaTBxdzFubDlqZ2V3cDNzcGg1bWwxMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26u4cqiYI30juCOGY/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGJyNXlrYjd0YThtcjJ6ZzB3bjI3YmJqdTNyYW45Y2YxYmhsMnFsNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6Zt6KHxJTbXCnSvu/giphy.gif"
    ]
  },
  {
    id: "s7",
    name: "Stranger Things",
    hateMemes: [
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG53bHlmNTBqNXV2Y2Q0eGVlNjA2dTBra214NnNvdGM5dWV2c3phYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ZXqOCQLK8BKquLx56V/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG53bHlmNTBqNXV2Y2Q0eGVlNjA2dTBra214NnNvdGM5dWV2c3phYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/axdUGyhEPyZ2hwMtaa/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG53bHlmNTBqNXV2Y2Q0eGVlNjA2dTBra214NnNvdGM5dWV2c3phYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/iO4ptP2iuV29yui3mx/giphy.gif"
    ],
    rateMemes: [
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG53bHlmNTBqNXV2Y2Q0eGVlNjA2dTBra214NnNvdGM5dWV2c3phYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l378fCBfWv5TnkSTC/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG53bHlmNTBqNXV2Y2Q0eGVlNjA2dTBra214NnNvdGM5dWV2c3phYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WSsUgLins3y2Q/giphy.gif"
    ]
  },
  {
    id: "s8",
    name: "Mr. Robot",
    hateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG1mdzI5d3VubmhwcW1pM3c0OGl0aTZodDk0N29zcHVyanN4Nm00NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8hY1xmC9NIoDu/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG1mdzI5d3VubmhwcW1pM3c0OGl0aTZodDk0N29zcHVyanN4Nm00NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8fRwPZtbWkkX6/giphy.gif"
    ],
    rateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG1mdzI5d3VubmhwcW1pM3c0OGl0aTZodDk0N29zcHVyanN4Nm00NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/BlWF2vzpIPB0A/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG1mdzI5d3VubmhwcW1pM3c0OGl0aTZodDk0N29zcHVyanN4Nm00NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WiM5K1e9MtEic/giphy.gif"
    ]
  },
  {
    id: "s9",
    name: "True Detective",
    hateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2QzdDFnc3J6YXJ3dnF2ZGN3ejQwZzE0MHZ6bmoxMnRibnYwdnQ0MyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Zqe1S3qNQxsuQ/giphy.gif"
    ],
    rateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2QzdDFnc3J6YXJ3dnF2ZGN3ejQwZzE0MHZ6bmoxMnRibnYwdnQ0MyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6s3HtZfGOaqUU/giphy.gif"
    ]
  },
  {
    id: "s10",
    name: "Better Call Saul",
    hateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTdmcnFieGpya3BucWd3NGZlamhhMzh2ajQxYTB5dzNkcHJqdDF1ZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/frdn0r0hUXDTa/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTdmcnFieGpya3BucWd3NGZlamhhMzh2ajQxYTB5dzNkcHJqdDF1ZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/avx8Ba7NoFz3g8pFIF/giphy.gif"
    ],
    rateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTdmcnFieGpya3BucWd3NGZlamhhMzh2ajQxYTB5dzNkcHJqdDF1ZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/40dEau6bZRO3S/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTdmcnFieGpya3BucWd3NGZlamhhMzh2ajQxYTB5dzNkcHJqdDF1ZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0EwYGlvQ7STj3wyc/giphy.gif"
    ]
  },
  {
    id: "s11",
    name: "Lost",
    hateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTlmZjhyN3Blc2MzMmwzcW5sdnU3NDBuOXhpYTZ1c3Rxb2podTB5byZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ckGndVa23sCk9pae4l/giphy.gif"
    ],
    rateMemes: [
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDR3YzA3ZGw5NXFpdXprY2F6dzc5eDJ6cWJ3eWhkNGljZzNhMGkwMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/yJFeycRK2DB4c/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXN5d2JrbTN3aGU4OGt5Y3Y5NzRnY3Z4ZWczZHZwYWN5NjFxeGVxdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XreQmk7ETCak0/giphy.gif"
    ]
  },
  {
    id: "s12",
    name: "You",
    hateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWRkd3JvczRzbDMxMWZoajVuaW1uZnl5dWVzcm5zaG1vdnUzOTlpcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fUkdOIrtQdyGbpZZKu/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWRkd3JvczRzbDMxMWZoajVuaW1uZnl5dWVzcm5zaG1vdnUzOTlpcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/TFINQhNNBhM58cckE9/giphy.gif"
    ],
    rateMemes: [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWRkd3JvczRzbDMxMWZoajVuaW1uZnl5dWVzcm5zaG1vdnUzOTlpcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/28I5KEqbxUEafaeNtV/giphy.gif",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWRkd3JvczRzbDMxMWZoajVuaW1uZnl5dWVzcm5zaG1vdnUzOTlpcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kfLjUwkUZgdZOIv5hf/giphy.gif"
    ]
  }
];

/**
 * Get a series-specific meme based on seriesId
 * Each series has perfectly matched reaction GIFs
 */
export function getSeriesMeme(
  seriesId: string,
  action: "rate" | "hate"
): Meme {
  const series = seriesMemes.find((s) => s.id === seriesId);
  
  if (!series) {
    throw new Error(`Series with ID ${seriesId} not found`);
  }

  const memeUrls = action === "rate" ? series.rateMemes : series.hateMemes;
  
  if (memeUrls.length === 0) {
    throw new Error(`No ${action} memes found for ${series.name}`);
  }

  const randomUrl = memeUrls[Math.floor(Math.random() * memeUrls.length)];
  return {
    gif: randomUrl,
    text: action === "rate" ? getRandomRateText() : getRandomHateText()
  };
}

// Helper functions for random texts
function getRandomRateText(): string {
  const texts = [
    "Your taste is LEGENDARY! 🔥",
    "A person of culture, I see! 👑",
    "Absolutely PERFECT choice! ⭐",
    "You've got ELITE taste! 💯",
    "Chef's kiss! *muah* 😘",
    "BRILLIANT! You know cinema! 🎬",
    "THIS IS GOLD! 🏆",
    "Standing ovation! 👏👏👏",
    "You have IMPECCABLE taste! 😎",
    "FINALLY someone with taste! 🙌"
  ];
  return texts[Math.floor(Math.random() * texts.length)];
}

function getRandomHateText(): string {
  const texts = [
    "Why would you do this? 😭",
    "Your taste is questionable... 💀",
    "I'm judging you right now... 👀",
    "This ain't it, chief! 🚫",
    "We need to talk about this... 😤",
    "Big yikes energy here! 😬",
    "Are we watching the same movie?! 🤔",
    "Nope. Just nope. 🙅",
    "Excuse me, WHAT?! 🤯",
    "My disappointment is immeasurable! 📉",
    "This is a crime against cinema! ⚖️",
    "You need help... professional help! 🆘",
    "I have no words... just WHY?! 🙃"
  ];
  return texts[Math.floor(Math.random() * texts.length)];
}
