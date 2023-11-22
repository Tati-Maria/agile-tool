import { Icons } from "@/components/ui/icons"

const Loading = () => {
  return (
    <div className="h-full">
        <div className="flex-center flex-col h-full">
            <Icons.spinner className="w-12 h-12 text-text-800 animate-spin" />
        </div>
    </div>
  )
}

export default Loading