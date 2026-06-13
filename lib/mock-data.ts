import type { Church, MatchProfile } from "@/lib/types";

/** Demo 用教會清單；正式環境改為後端可搜尋的教會資料庫 */
export const CHURCHES: Church[] = [
  { id: "c1", name: "台北靈糧堂", denomination: "靈糧堂", city: "台北市" },
  { id: "c2", name: "校園團契信友堂", denomination: "獨立教會", city: "台北市" },
  { id: "c3", name: "新竹勝利堂", denomination: "長老教會", city: "新竹市" },
  { id: "c4", name: "高雄福氣教會", denomination: "浸信會", city: "高雄市" },
  { id: "c5", name: "台中思恩堂", denomination: "宣道會", city: "台中市" },
];

/**
 * 模擬配對對象。
 * 照片使用 Unsplash 佔位人像，正式環境須改為經審核的會員照片。
 */
export const MOCK_PROFILES: MatchProfile[] = [
  {
    id: "u1",
    name: "恩晴",
    age: 28,
    gender: "sister",
    city: "台北市",
    church: CHURCHES[0],
    faith: {
      baptizedYears: 10,
      serviceRole: "敬拜團 / 主領",
      devotionFrequency: "daily",
      lifeVerse: "你要保守你心，勝過保守一切。（箴言 4:23）",
    },
    tags: ["每日靈修", "敬拜服事", "喜歡爬山", "手沖咖啡"],
    bio: "在敬拜中遇見神，也希望遇見能一起同行、彼此提醒禱告的另一半。平日喜歡走山徑、安靜讀經。",
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80",
    ],
    compatibility: 92,
  },
  {
    id: "u2",
    name: "宥辰",
    age: 31,
    gender: "brother",
    city: "新竹市",
    church: CHURCHES[2],
    faith: {
      baptizedYears: 14,
      serviceRole: "小組長",
      devotionFrequency: "daily",
      lifeVerse: "無論做甚麼，都要從心裡做，像是給主做的。（歌羅西書 3:23）",
    },
    tags: ["小組牧養", "桌球", "古典樂", "重視家庭"],
    bio: "工程師，帶小組六年。相信感情需要委身與時間，期待認識願意一起建立家庭祭壇的姊妹。",
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=80",
    ],
    compatibility: 88,
  },
  {
    id: "u3",
    name: "心妍",
    age: 26,
    gender: "sister",
    city: "台中市",
    church: CHURCHES[4],
    faith: {
      baptizedYears: 6,
      serviceRole: "兒童主日學老師",
      devotionFrequency: "weekly",
      lifeVerse: "願頌讚歸與我們主耶穌基督的父神。（以弗所書 1:3）",
    },
    tags: ["兒主服事", "烘焙", "插畫", "喜歡孩子"],
    bio: "幼教老師，週末在兒主陪孩子。喜歡安靜的相處，慢慢認識彼此的生命故事。",
    photos: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=80",
    ],
    compatibility: 85,
  },
  {
    id: "u4",
    name: "建豪",
    age: 33,
    gender: "brother",
    city: "高雄市",
    church: CHURCHES[3],
    faith: {
      baptizedYears: 20,
      serviceRole: "招待 / 影音",
      devotionFrequency: "daily",
      lifeVerse: "你們要先求祂的國和祂的義。（馬太福音 6:33）",
    },
    tags: ["影音事工", "登山", "攝影", "穩定踏實"],
    bio: "從小在教會長大，喜歡用鏡頭記錄弟兄姊妹。盼望以婚姻榮耀神，一步一步、認真地走。",
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=80",
    ],
    compatibility: 81,
  },
];
