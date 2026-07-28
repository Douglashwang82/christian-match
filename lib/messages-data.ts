import type { Conversation } from "@/lib/types";
import { MOCK_PROFILES } from "@/lib/mock-data";

/**
 * Demo 用的配對對話。
 * 破冰提示 (icebreakers) 是「同心」的差異化設計：配對成功後不從空白畫面開始，
 * 而是提供一段經文與一個能開啟深度交流的問題，鼓勵有意義的對話。
 * 正式環境由後端依雙方問卷與教會背景動態生成。
 */
export const CONVERSATIONS: Conversation[] = [
  {
    id: "m1",
    profile: MOCK_PROFILES[0], // 恩晴
    matchedOn: "7 月 26 日配對成功",
    lastTime: "14:32",
    unread: 2,
    icebreakers: [
      {
        verse: "你要保守你心，勝過保守一切。（箴言 4:23）",
        question: "這是恩晴的生命經文，想聊聊它在你們各自生命中的意義嗎？",
      },
      { question: "最近一次在敬拜或讀經中特別被觸摸，是什麼時候？" },
      { question: "如果週末有半天空檔，你會想去爬山、看展，還是安靜讀本書？" },
    ],
    messages: [
      { id: "m1-1", fromMe: false, text: "嗨，很開心認識你！看到你也常爬山 😊", time: "14:20" },
      { id: "m1-2", fromMe: true, text: "哈囉恩晴！對啊，最近剛走完抹茶山，風景超美。你都爬哪些路線？", time: "14:24" },
      { id: "m1-3", fromMe: false, text: "我比較常走郊山，像是劍潭山。其實走山的時候最容易安靜下來禱告。", time: "14:31" },
      { id: "m1-4", fromMe: false, text: "你在教會有參與服事嗎？", time: "14:32" },
    ],
  },
  {
    id: "m2",
    profile: MOCK_PROFILES[2], // 心妍
    matchedOn: "7 月 25 日配對成功",
    lastTime: "昨天",
    unread: 0,
    icebreakers: [
      {
        verse: "願頌讚歸與我們主耶穌基督的父神。（以弗所書 1:3）",
        question: "心妍在兒主服事，聊聊你最近一次覺得被神祝福的小事？",
      },
      { question: "你喜歡孩子嗎？對未來的家庭生活有什麼想像？" },
    ],
    messages: [
      { id: "m2-1", fromMe: true, text: "嗨心妍，看到你在教兒主，覺得很有愛心 :)", time: "昨天" },
      { id: "m2-2", fromMe: false, text: "謝謝你～孩子們很單純，跟他們相處也常提醒我要有單純的信心。", time: "昨天" },
    ],
  },
  {
    id: "m3",
    profile: MOCK_PROFILES[1], // 宥辰
    matchedOn: "剛剛配對成功",
    lastTime: "新配對",
    unread: 0,
    icebreakers: [
      {
        verse: "無論做甚麼，都要從心裡做，像是給主做的。（歌羅西書 3:23）",
        question: "宥辰帶小組多年，聊聊牧養中最有成就感的一刻？",
      },
      { question: "你理想中的家庭祭壇，是什麼樣子？" },
    ],
    messages: [], // 尚未開啟對話 → 顯示破冰提示引導
  },
];

export function getConversation(id: string): Conversation | undefined {
  return CONVERSATIONS.find((c) => c.id === id);
}
