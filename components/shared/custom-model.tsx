"use client";
import { useModal } from "@/providers/modal-provider";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

type Props = {
  title?: string;
  subheading?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export const CustomModal = ({
  children,
  defaultOpen,
}: //   subheading,
//   title,
Props) => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className="overflow-auto md:max-h-[700px] md:h-fit h-screen">
        <DialogHeader className="pt-8 text-left">
          {/* {title && (
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          )}
          {subheading && <DialogDescription>{subheading}</DialogDescription>} */}
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
