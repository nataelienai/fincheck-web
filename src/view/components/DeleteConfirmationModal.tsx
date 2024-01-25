import { Button } from './Button';
import { Modal } from './Modal';
import { TrashIcon } from './icons/TrashIcon';

interface DeleteConfirmationModalProps {
  onConfirm(): void;
  onCancel(): void;
  title: string;
  description?: string;
  isLoading?: boolean;
}

export function DeleteConfirmationModal({
  onConfirm,
  onCancel,
  title,
  description,
  isLoading,
}: DeleteConfirmationModalProps) {
  return (
    <Modal.Root open onClose={onCancel}>
      <Modal.Content title="Excluir" onClose={onCancel}>
        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-[52px] h-[52px] p-3.5 bg-red-50 rounded-full">
            <TrashIcon className="w-6 h-6 text-red-900" />
          </div>
          <p className="max-w-[180px] text-gray-800 font-bold tracking-[-0.5px]">
            {title}
          </p>
          {description && (
            <p className="text-gray-800 tracking-[-0.5px]">{description}</p>
          )}
        </div>

        <div className="mt-10 space-y-4">
          <Button
            variant="danger"
            className="w-full"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Sim, desejo excluir
          </Button>

          <Button
            variant="ghost"
            className="w-full"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
