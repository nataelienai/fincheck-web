import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { cn } from '../../app/utils/cn';
import React from 'react';

interface ModalRootProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

function ModalRoot({ open, children, onClose }: ModalRootProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>{children}</Dialog.Portal>
    </Dialog.Root>
  );
}

const ModalOverlay = React.forwardRef(function ModalOverlay(
  _props: unknown,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <Dialog.Overlay
      className={cn(
        'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 data-[state=open]:animate-overlay-show',
      )}
      ref={ref}
    />
  );
});

interface ModalContentProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  rightAction?: React.ReactNode;
}

const ModalContent = React.forwardRef(function ModalContent(
  { title, children, onClose, rightAction }: ModalContentProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <Dialog.Content
      className={cn(
        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[51] w-[calc(100%-48px)] max-w-[400px] p-6 space-y-10 bg-white rounded-2xl shadow-[0px_11px_20px_0px_rgb(0,0,0,0.1)] outline-none data-[state=open]:animate-content-show',
      )}
      ref={ref}
    >
      <header className="h-12 flex items-center justify-between text-gray-800">
        <button
          className="w-12 h-12 outline-none flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          onClick={onClose}
        >
          <Cross2Icon width="24" height="24" />
        </button>

        <span className="text-lg leading-6 font-bold tracking-[-1px]">
          {title}
        </span>

        <div
          className={cn(
            'w-12 h-12 flex items-center justify-center rounded-full transition-colors',
            rightAction && 'hover:bg-gray-100',
          )}
        >
          {rightAction}
        </div>
      </header>

      <div>{children}</div>
    </Dialog.Content>
  );
});

export const Modal = {
  Root: ModalRoot,
  Overlay: ModalOverlay,
  Content: ModalContent,
};
