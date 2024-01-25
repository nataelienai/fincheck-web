import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { CurrencyInput } from '../../../../components/CurrencyInput';
import { DatePickerInput } from '../../../../components/DatePickerInput';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useNewTransactionModalController } from './useNewTransactionModalController';

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isLoading,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';

  const hasErrors = Boolean(
    errors.value ||
      errors.name ||
      errors.categoryId ||
      errors.bankAccountId ||
      errors.date,
  );

  return (
    <Modal.Root
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <Modal.Overlay />

      <Modal.Content
        title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
        onClose={closeNewTransactionModal}
      >
        <form onSubmit={handleSubmit}>
          <div>
            <span className="text-gray-600 tracking-[-0.5px] text-xs">
              Valor
            </span>
            <div className="flex items-center gap-2 relative">
              <span className="text-gray-600 tracking-[-0.5px] text-lg">
                R$
              </span>
              <Controller
                control={control}
                name="value"
                render={({ field: { value, onChange } }) => (
                  <CurrencyInput
                    error={errors.value?.message}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <Input
              type="text"
              placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
              error={errors.name?.message}
              {...register('name')}
            />

            <Controller
              control={control}
              name="categoryId"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  placeholder="Categoria"
                  error={errors.categoryId?.message}
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                />
              )}
            />

            <Controller
              control={control}
              name="bankAccountId"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  placeholder={isExpense ? 'Pagar com' : 'Receber em'}
                  error={errors.bankAccountId?.message}
                  options={accounts.map((account) => ({
                    value: account.id,
                    label: account.name,
                  }))}
                />
              )}
            />

            <Controller
              control={control}
              name="date"
              render={({ field: { value, onChange } }) => (
                <DatePickerInput
                  error={errors.date?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-6"
            isLoading={isLoading}
            disabled={hasErrors}
          >
            Criar
          </Button>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
