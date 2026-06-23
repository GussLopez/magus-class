'use client'

import { Button } from "@/src/shared/components/ui/button";
import { Textarea } from "@/src/shared/components/ui/textarea";
import { Paperclip, Send } from "lucide-react";
import { useState } from "react";

export default function ChatTextArea() {
  const [text, setText] = useState('');
  
  return (
    <form className="relative">
      <Textarea
        className="w-175 h-30 p-4 border rounded-xl border-input focus-visible:border-muted-foreground/40 resize-none duration-300"
        placeholder="Cual es tu pregunta de hoy..."
      />

      <div className="w-full absolute bottom-0 flex justify-between p-3">
        <Button
          size={'icon-lg'}
          variant={'ghost'}
          type="button"
          className="bg-muted hover:bg-muted! text-muted-foreground cursor-pointer"
        >
          <Paperclip className="size-4.5" />
        </Button>

        <Button
          size={'icon-lg'}
          variant={'ghost'}
          type="button"
          className="bg-muted hover:bg-muted! text-muted-foreground cursor-pointer group"
        >
          <Send className="size-4.5" />
        </Button>
      </div>
    </form>
  )
}
