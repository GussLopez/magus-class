import ChatTextArea from "@/src/features/chat/components/ChatTextArea";

export default function ChatPage() {
  return (
    <main className="min-h-[calc(100dvh-73px)]">
      <div className="mx-auto flex h-full w-full max-w-3xl flex-col px-4">
        <ChatTextArea />
      </div>
    </main>
  );
}