import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Transaction } from '../../../../../app/entities/Transaction';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { transactionsService } from '../../../../../app/services/transactionsService';

const schema = z.object({
  value: z
    .string()
    .min(1, 'Valor é obrigatório')
    .refine((value) => Number(value) > 0, 'Valor deve ser positivo'),
  name: z.string().min(1, 'Nome é obrigatório'),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  bankAccountId: z.string().min(1, 'Conta é obrigatória'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction,
  onClose: () => void,
) {
  const {
    register,
    handleSubmit: handleHookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: String(transaction.value),
      name: transaction.name,
      categoryId: transaction.categoryId,
      bankAccountId: transaction.bankAccountId,
      date: new Date(transaction.date),
    },
  });

  const { accounts } = useBankAccounts();
  const { categories } = useCategories();

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => category.type === transaction.type);
  }, [categories, transaction.type]);

  const queryClient = useQueryClient();

  const { isPending: isUpdatePending, mutateAsync: updateTransaction } =
    useMutation({
      mutationFn: transactionsService.update,
    });

  const { isPending: isRemovalPending, mutateAsync: removeTransaction } =
    useMutation({
      mutationFn: transactionsService.remove,
    });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = handleHookFormSubmit(async (editedTransaction) => {
    try {
      await updateTransaction({
        ...editedTransaction,
        id: transaction.id,
        type: transaction.type,
        value: Number(editedTransaction.value),
        date: editedTransaction.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(
        transaction.type === 'EXPENSE'
          ? 'Despesa editada com sucesso!'
          : 'Receita editada com sucesso!',
      );
      onClose();
    } catch (error) {
      toast.error(
        transaction.type === 'EXPENSE'
          ? 'Erro ao salvar a despesa!'
          : 'Erro ao salvar a receita!',
      );
    }
  });

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction.id);

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(
        transaction.type === 'EXPENSE'
          ? 'Despesa excluída com sucesso!'
          : 'Receita excluída com sucesso!',
      );
      onClose();
    } catch (error) {
      toast.error(
        transaction.type === 'EXPENSE'
          ? 'Erro ao excluir a despesa!'
          : 'Erro ao excluir a receita!',
      );
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories: filteredCategories,
    isUpdatePending,
    isDeleteModalOpen,
    isRemovalPending,
    handleDeleteTransaction,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
}
