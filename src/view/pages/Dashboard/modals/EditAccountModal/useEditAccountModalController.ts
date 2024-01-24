import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { bankAccountsService } from '../../../../../app/services/bankAccountsService';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

const schema = z.object({
  initialBalance: z.string().min(1, 'Saldo inicial é obrigatório'),
  name: z.string().min(1, 'Nome da Conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: String(accountBeingEdited?.initialBalance),
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      color: accountBeingEdited?.color,
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { isPending: isUpdatePending, mutateAsync: updateAccount } =
    useMutation({
      mutationFn: bankAccountsService.update,
    });

  const { isPending: isRemovalPending, mutateAsync: removeAccount } =
    useMutation({
      mutationFn: bankAccountsService.remove,
    });

  const handleSubmit = hookFormHandleSubmit(async (editedAccount) => {
    try {
      await updateAccount({
        ...editedAccount,
        initialBalance: Number(editedAccount.initialBalance),
        id: accountBeingEdited!.id,
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Conta editada com sucesso!');
      closeEditAccountModal();
    } catch (error) {
      toast.error('Erro ao salvar as alterações!');
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Conta excluída com sucesso!');
      closeEditAccountModal();
    } catch (error) {
      toast.error('Erro ao excluir a conta!');
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isUpdatePending,
    isRemovalPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
  };
}
