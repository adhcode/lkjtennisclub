'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
  className?: string
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`p-3 text-[#911b1e] hover:text-[#fcf7dc] hover:bg-[#911b1e] border border-[#911b1e]/20 hover:border-[#911b1e] rounded-lg transition-colors ${className}`}
      title={copied ? 'Copied!' : 'Copy URL'}
    >
      {copied ? (
        <Check className="w-4 h-4" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  )
}