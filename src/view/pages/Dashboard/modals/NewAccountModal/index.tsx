import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { ColorsDropdownInput } from '../../../../components/ColorsDropdownInput';
import { CurrencyInput } from '../../../../components/CurrencyInput';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useNewAccountModalController } from './useNewAccountModalController';

export function NewAccountModal() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
    errors,
    handleSubmit,
    register,
    control,
    isPending,
  } = useNewAccountModalController();

  const hasErrors = Boolean(
    errors.initialBalance || errors.name || errors.type || errors.color,
  );

  return (
    <Modal.Root open={isNewAccountModalOpen} onClose={closeNewAccountModal}>
      <Modal.Overlay />

      <Modal.Content title="Nova Conta" onClose={closeNewAccountModal}>
        <form onSubmit={handleSubmit}>
          <div>
            <span className="text-gray-600 tracking-[-0.5px] text-xs">
              Saldo inicial
            </span>
            <div className="flex items-center gap-2 relative">
              <span className="text-gray-600 tracking-[-0.5px] text-lg">
                R$
              </span>
              <Controller
                control={control}
                name="initialBalance"
                render={({ field: { value, onChange } }) => (
                  <CurrencyInput
                    error={errors.initialBalance?.message}
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
              placeholder="Nome da Conta"
              error={errors.name?.message}
              {...register('name')}
            />

            <Controller
              control={control}
              name="type"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  placeholder="Tipo"
                  error={errors.type?.message}
                  options={[
                    {
                      label: 'Conta Corrente',
                      value: 'CHECKING',
                    },
                    {
                      label: 'Investimentos',
                      value: 'INVESTMENT',
                    },
                    {
                      label: 'Dinheiro Físico',
                      value: 'CASH',
                    },
                  ]}
                />
              )}
            />

            <Controller
              control={control}
              name="color"
              render={({ field: { value, onChange } }) => {
                return (
                  <ColorsDropdownInput
                    error={errors.color?.message}
                    value={value}
                    onChange={onChange}
                  />
                );
              }}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-6"
            isLoading={isPending}
            disabled={hasErrors}
          >
            Criar
          </Button>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
