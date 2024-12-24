'use client';

import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LottieAnimation from "@/components/lottie-animation";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">Message Sent Successfully</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
          <LottieAnimation 
            path="https://lottie.host/bc6c9602-f7c7-4be5-aefe-59c8e2795162/RZzJfiYYKu.json"
            width={256}
            height={256}
          />
          
          <h2 className="text-2xl font-semibold tracking-tight">Thank You!</h2>
          <p className="text-sm text-gray-500">
            I&apos;ll get back to you as soon as possible!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}