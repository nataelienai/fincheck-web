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
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';

  return (
    <Modal
      title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Valor</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <CurrencyInput />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            name="name"
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
          />

          <Select
            placeholder="Categoria"
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

          <Select
            placeholder={isExpense ? 'Pagar com' : 'Receber em'}
            options={[
              {
                label: 'Nubank',
                value: 'Nubank',
              },
              {
                label: 'Carteira',
                value: 'Carteira',
              },
              {
                label: 'XP Investimentos',
                value: 'XP Investimentos',
              },
            ]}
          />

          <DatePickerInput />
        </div>

        <Button type="submit" className="w-full mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  );
}
