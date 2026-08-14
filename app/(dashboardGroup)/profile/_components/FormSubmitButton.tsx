"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { DialogFooter } from "@/components/ui/dialog";

interface FormSubmitButtonProps {
  isPending: boolean;
  onCancel: () => void;
}

export function FormSubmitButton({ isPending, onCancel }: FormSubmitButtonProps) {
  return (
    <DialogFooter className="pt-4 flex items-center justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isPending}
        className="rounded-xl"
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isPending} className="rounded-xl min-w-25 gap-2">
        {isPending ? (
          <>
            <Spinner className="size-4" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </DialogFooter>
  );
}
