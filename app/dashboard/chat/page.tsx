import ChatTextArea from "@/src/features/chat/ChatTextArea";

export default function ChatPage() {

  return (
    <main className="min-h-full flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-[32px] font-semibold text-center">¿Por donde quiere comenzar?</h1>
        <ChatTextArea />
      </div>
    </main>
  )
}