
"use client"
// components/ui/loading-dialog/loading-dialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { createRoot } from "react-dom/client";

interface LoadingDialogOptions {
  title?: string;
  description?: string;
}

// Class to manage the dialog
class LoadingDialogManager {
  private static container: HTMLDivElement | null = null;
  private static root: any | null = null;
  private static isOpen = false;

  private static createContainer() {
    const container = document.createElement("div");
    document.body.appendChild(container);
    this.container = container;
    this.root = createRoot(container);
  }

  private static DialogComponent({
    open,
    onOpenChange,
    options,
  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    options: LoadingDialogOptions;
  }) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{options.title || "Loading..."}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            {options.description && (
              <p className="text-sm text-muted-foreground">
                {options.description}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  static show(options: LoadingDialogOptions = {}) {
    if (!this.container) {
      this.createContainer();
    }

    this.isOpen = true;

    const handleOpenChange = (open: boolean) => {
      this.isOpen = open;
      if (!open) {
        this.hide();
      }
    };

    this.root?.render(
      <this.DialogComponent
        open={true}
        onOpenChange={handleOpenChange}
        options={options}
      />
    );
  }

  static hide() {
    if (this.root && this.isOpen) {
      this.isOpen = false;
      this.root.render(
        <this.DialogComponent
          open={false}
          onOpenChange={() => {}}
          options={{}}
        />
      );
    }
  }
}

// Export the manager functions
export const loadingDialog = {
  show: LoadingDialogManager.show.bind(LoadingDialogManager),
  hide: LoadingDialogManager.hide.bind(LoadingDialogManager),
};

// Export the root component
export function LoadingDialogRoot() {
  // This component just reserves the space for the dialog
  return null;
}
