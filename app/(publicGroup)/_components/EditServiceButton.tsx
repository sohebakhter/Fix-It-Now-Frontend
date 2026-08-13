"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Loader2, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { getCategoriesAction, updateServiceAction } from "@/app/(dashboardGroup)/_actions/serviceActions";
import type { IService } from "@/lib/types";

interface EditServiceButtonProps {
  service: IService;
}

export function EditServiceButton({ service }: EditServiceButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Form State
  const [categoryId, setCategoryId] = useState(service.categoryId || "");
  const [title, setTitle] = useState(service.title || "");
  const [description, setDescription] = useState(service.description || "");
  const [price, setPrice] = useState(service.price?.toString() || "");

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const handleOpen = async () => {
    setIsOpen(true);
    setLoadingCategories(true);
    try {
      const res = await getCategoriesAction();
      if (res?.success) {
        setCategories(res.data || []);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      toast.error("Please enter a valid price");
      return;
    }

    startTransition(async () => {
      try {
        const payload = {
          categoryId,
          title: title.trim(),
          description: description.trim(),
          location: service.location,
          price: parsedPrice,
        };

        const response = await updateServiceAction(service.id, payload);

        if (response.success) {
          toast.success("Service updated successfully!");
          setIsOpen(false);
          router.refresh();
        } else {
          toast.error(response.message || "Failed to update service");
        }
      } catch (error: unknown) {
        toast.error((error as Error).message || "An unexpected error occurred");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted shrink-0 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          title="Edit Service"
        >
          <Pencil className="size-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6 rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Service</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Update the service details. Note that location changes are not editable.
          </DialogDescription>
        </DialogHeader>

        {loadingCategories ? (
          <div className="flex items-center justify-center p-8 text-xs text-muted-foreground gap-2">
            <Loader2 className="size-4 animate-spin text-primary" />
            <span>Loading categories...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="edit-service-category" className="text-xs font-semibold text-foreground">Category</Label>
              <select
                id="edit-service-category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                disabled={isPending}
                className="h-10 w-full rounded-xl border border-input bg-input/30 px-3 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm dark:aria-invalid:border-destructive/50"
                required
              >
                <option value="" disabled className="text-muted-foreground">
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-background text-foreground">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-service-title" className="text-xs font-semibold text-foreground">Title</Label>
              <Input
                id="edit-service-title"
                type="text"
                placeholder="e.g. Kitchen Pipe Repair"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isPending}
                required
                className="rounded-xl h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-service-description" className="text-xs font-semibold text-foreground">Description</Label>
              <Textarea
                id="edit-service-description"
                placeholder="e.g. Leakage repair service."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isPending}
                className="rounded-xl min-h-22.5 text-xs p-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="edit-service-location" className="text-xs font-semibold text-foreground">Location</Label>
                <Input
                  id="edit-service-location"
                  type="text"
                  value={service.location || ""}
                  disabled={true}
                  className="rounded-xl h-10 opacity-70 cursor-not-allowed bg-muted"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-service-price" className="text-xs font-semibold text-foreground">Price (BDT)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="edit-service-price"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={isPending}
                    required
                    className="pl-8 rounded-xl h-10"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="rounded-xl min-w-25 gap-2 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isPending ? (
                  <>
                    <Spinner className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditServiceButton;
