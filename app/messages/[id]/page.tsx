import { notFound } from "next/navigation";
import { ChatThread } from "@/components/messages/ChatThread";
import { CONVERSATIONS, getConversation } from "@/lib/messages-data";

/** 預先產生已知對話的靜態頁 */
export function generateStaticParams() {
  return CONVERSATIONS.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const convo = getConversation(params.id);
  return { title: convo ? `與 ${convo.profile.name} 的對話 · 同心` : "對話 · 同心" };
}

export default function ConversationPage({ params }: { params: { id: string } }) {
  const conversation = getConversation(params.id);
  if (!conversation) notFound();

  return (
    <main className="relative">
      <ChatThread conversation={conversation} />
    </main>
  );
}
