import ChatTextArea from "@/src/features/chat/components/ChatTextArea";

export default function ChatPage() {

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 pb-40">
        <ChatTextArea />
      </div>
    </main>
  )
}