import { Typography } from "@/components/shared";
import { useState } from "react";
import { BsArrowRepeat } from 'react-icons/bs';
import { toast } from "sonner";
import { useGenerateAccessCodeMutation } from "@/store/slices/project-api-slice";
import { Button } from "@/components/ui/button";

interface GenerateNewCodeFormProps {
    accessCode: string;
    projectId: string;
}

const GenerateNewCodeForm = ({projectId, accessCode}: GenerateNewCodeFormProps) => {
    const [code, setCode] = useState(accessCode);
    const [generateAccessCode, {isLoading}] = useGenerateAccessCodeMutation();

    const handleGenerateNewCode = async () => {
        try {
            const res = await generateAccessCode(projectId).unwrap();
            setCode(res.accessCode);
            toast.success("Access code generated successfully");
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

  return (
    <div className="border py-2 px-6 space-y-2 rounded-lg">
      <div>
        <span className="font-medium">Access Code</span>
        <Typography className="text-xs text-muted-foreground">
          This code is used to access the project. <br />
          You can generate a new code if you think the current one is
          compromised.
        </Typography>
      </div>
      <div className="flex items-center space-x-2">
        <Typography className="text-xl font-bold">{code}</Typography>
        <Button
          variant="secondary"
          size={'icon'}
          onClick={handleGenerateNewCode}
          disabled={isLoading}
          value={'Generate New Code'}
        >
          <BsArrowRepeat className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

export default GenerateNewCodeForm