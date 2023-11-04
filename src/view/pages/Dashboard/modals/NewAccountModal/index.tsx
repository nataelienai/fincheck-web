import { Button } from '../../../../components/Button';
import { ColorsDropdownInput } from '../../../../components/ColorsDropdownInput';
import { CurrencyInput } from '../../../../components/CurrencyInput';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useNewAccountModalController } from './useNewAccountModalController';

export function NewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } =
    useNewAccountModalController();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <CurrencyInput />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input type="text" name="name" placeholder="Nome da Conta" />

          <Select
            placeholder="Tipo"
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

          <ColorsDropdownInput />
        </div>

        <Button type="submit" className="w-full mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  );
}
