import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { transactionsService } from '../../../../../app/services/transactionsService';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

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

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    newTransactionType,
    closeNewTransactionModal,
  } = useDashboard();

  const {
    register,
    handleSubmit: handleHookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: '0',
      name: '',
      categoryId: '',
      bankAccountId: '',
      date: new Date(),
    },
  });

  const { accounts } = useBankAccounts();
  const { categories } = useCategories();

  const filteredCategories = useMemo(() => {
    return categories.filter(
      (category) => category.type === newTransactionType,
    );
  }, [categories, newTransactionType]);

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: transactionsService.create,
  });

  const handleSubmit = handleHookFormSubmit(async (transaction) => {
    try {
      await mutateAsync({
        ...transaction,
        value: Number(transaction.value),
        type: newTransactionType!,
        date: transaction.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(
        newTransactionType === 'EXPENSE'
          ? 'Despesa cadastrada com sucesso!'
          : 'Receita cadastrada com sucesso!',
      );
      closeNewTransactionModal();
      reset();
    } catch (error) {
      toast.error(
        newTransactionType === 'EXPENSE'
          ? 'Erro ao cadastrar a despesa!'
          : 'Erro ao cadastrar a receita!',
      );
    }
  });

  return {
    isNewTransactionModalOpen,
    newTransactionType,
    closeNewTransactionModal,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories: filteredCategories,
    isLoading: isPending,
  };
}
