'use client'

import { CheckIcon, Copy } from "lucide-react";
import { Button } from "./button";
import { cn } from "../../lib/utils";

interface CopyButtonProps {
  text: string | null;
  copied: boolean;
  setCopied: (val: boolean) => void;
  className?: string;
}

export default function CopyButton({ text, setCopied, copied, className }: CopyButtonProps) {

  const handleCopy = async () => {
    try {
      if (!text) return;

      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }
  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      className={cn(className, 'relative transition-all duration-500')}
      onClick={handleCopy}
      disabled={copied}
    >
      <span className={cn('transition-all', copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0')}>
        <CheckIcon className='stroke-green-600 dark:stroke-green-400' />
      </span>
      <span className={cn('absolute  transition-all', copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100')}>
        <Copy className="size-4 " />
      </span>
    </Button>
  )
}
