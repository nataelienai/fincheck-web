import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { cn } from '../../app/utils/cn';

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
  onClose?: () => void;
}

export function Modal({
  open,
  title,
  children,
  onClose,
  rightAction,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 data-[state=open]:animate-overlay-show',
          )}
        />

        <Dialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[51] w-full max-w-[400px] p-6 space-y-10 bg-white rounded-2xl shadow-[0px_11px_20px_0px_rgb(0,0,0,0.1)] outline-none data-[state=open]:animate-content-show',
          )}
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

            <div className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
              {rightAction}
            </div>
          </header>

          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
