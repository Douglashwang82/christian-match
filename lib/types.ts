/** 平台共用型別定義 */

export type Gender = "brother" | "sister"; // 弟兄 / 姊妹

export interface Church {
  id: string;
  name: string; // 教會名稱
  denomination: string; // 宗派，如「長老教會」「靈糧堂」
  city: string;
}

/** 靈命 / 生活習慣問卷的精簡結果 */
export interface FaithProfile {
  baptizedYears: number; // 受洗年數
  serviceRole?: string; // 服事 / 小組角色，如「敬拜團」「小組長」
  devotionFrequency: "daily" | "weekly" | "occasional"; // 靈修頻率
  lifeVerse?: string; // 生命經文
}

export interface MatchProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  city: string;
  church: Church;
  faith: FaithProfile;
  /** 個人標籤：信仰特質 + 生活興趣，前者優先呈現 */
  tags: string[];
  bio: string;
  photos: string[]; // 第一張為主照
  /** 系統依問卷算出的契合度 0–100，用於溫和排序而非排名施壓 */
  compatibility: number;
}

/** 使用者在卡片上的決定 */
export type SwipeDirection = "left" | "right" | "up"; // 婉拒 / 想認識 / 標記為「為他禱告」

/** 破冰提示：一段經文 + 一個開啟深度對話的問題 */
export interface Icebreaker {
  verse?: string; // 破冰經文
  question: string; // 破冰問題
}

/** 單則訊息。time 以字串保存顯示值，避免在元件內做時間格式化。 */
export interface ChatMessage {
  id: string;
  fromMe: boolean; // true = 目前使用者送出
  text: string;
  time: string; // 顯示用時間，如「14:32」
}

/** 一段配對成功後的對話 */
export interface Conversation {
  id: string;
  profile: MatchProfile; // 配對對象
  matchedOn: string; // 配對日期，如「7 月 26 日配對成功」
  lastTime: string; // 最後訊息時間（列表顯示）
  unread: number; // 未讀數
  icebreakers: Icebreaker[]; // 系統預備的破冰提示
  messages: ChatMessage[]; // 對話內容（空陣列＝尚未開啟對話）
}
