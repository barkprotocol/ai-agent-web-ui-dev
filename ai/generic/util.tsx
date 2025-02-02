import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { type ToolActionResult } from '@/types/util';

// Interface to define the expected props for ConfirmDeny component
interface ConfirmDenyProps {
  message: string;
  onConfirm: () => void;
  onDeny: () => void;
}

export const ConfirmDeny = ({ message, onConfirm, onDeny }: ConfirmDenyProps) => {
  return (
    <Card className="p-4">
      <div className="text-xl font-semibold mb-4">⚠️ Confirmation</div>
      <p>{message}</p>
      <div className="mt-4 flex space-x-4">
        <Button onClick={onConfirm} variant="primary">Confirm</Button>
        <Button onClick={onDeny} variant="secondary">Deny</Button>
      </div>
    </Card>
  );
};

export const utilTools = {
  askForConfirmation: {
    displayName: '⚠️ Confirmation',
    description: 'Confirm the execution of a function on behalf of the user.',
    parameters: z.object({
      message: z.string().describe('The message to ask for confirmation'),
    }),
    action: async ({ message }: { message: string }): Promise<ToolActionResult> => {
      // Here you can trigger the ConfirmDeny component or similar
      console.log(message); // Placeholder logic for now
      return {
        success: true,
        message: 'Confirmation processed',
      };
    },
  },
};
