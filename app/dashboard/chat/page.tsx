import ChatTextArea from "@/src/features/chat/components/ChatTextArea";

export default function ChatPage() {

  return (
    <main className="min-h-full flex flex-col justify-center items-center relative">
      <div className="flex flex-col gap-4">
        <ChatTextArea />
      </div>
    </main>
  )
}