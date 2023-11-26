import { useState, useCallback } from 'react';
import { toast } from 'sonner';


export const useCopy = (text: string) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        toast.success('Copied to clipboard');

        setTimeout(() => {
            setIsCopied(false);
        }, 1500);

    }
    , [text]);

    return { isCopied, copyToClipboard };
}