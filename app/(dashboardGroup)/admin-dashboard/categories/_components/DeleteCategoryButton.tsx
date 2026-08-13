"use client";

import React, { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { deleteCategoryAction } from "@/app/(dashboardGroup)/_actions/categoryActions";

interface DeleteCategoryButtonProps {
  categoryId: string;
  categoryName: string;
}

export function DeleteCategoryButton({ categoryId, categoryName }: DeleteCategoryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const response = await deleteCategoryAction(categoryId);
        if (response.success) {
          toast.success(response.message || `Category "${categoryName}" deleted successfully.`);
          setIsOpen(false);
        } else {
          toast.error(response.message || "Failed to delete category.");
        }
      } catch (error: unknown) {
        toast.error((error as Error).message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="rounded-xl flex items-center gap-1.5 cursor-pointer bg-red-600 hover:bg-red-700 text-white"
        >
          <Trash2 className="size-3.5" />
          <span>Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-bold text-foreground">
            Delete Category
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Are you absolutely sure you want to delete the category <strong>{categoryName}</strong>? All services associated with this category may be affected. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl cursor-pointer"
            disabled={isPending}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="rounded-xl flex items-center gap-1.5 cursor-pointer bg-red-600 hover:bg-red-700 text-white"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? (
              <Spinner className="size-3.5 animate-spin" />
            ) : (
              <>
                <Trash2 className="size-3.5" />
                <span>Delete Category</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteCategoryButton;
