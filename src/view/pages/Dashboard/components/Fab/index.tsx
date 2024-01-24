import { PlusIcon } from '@radix-ui/react-icons';
import { DropdownMenu } from '../../../../components/DropdownMenu';
import { BankAccountIcon } from '../../../../components/icons/BankAccountIcon';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import { useDashboard } from '../DashboardContext/useDashboard';
import { useState } from 'react';
import { cn } from '../../../../../app/utils/cn';

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="fixed right-4 bottom-4 z-20">
      <DropdownMenu.Root open={isActive} onOpenChange={setIsActive}>
        <DropdownMenu.Trigger>
          <button className="text-white w-12 h-12 bg-teal-900 hover:bg-teal-800 data-[state=open]:bg-teal-800 rounded-full flex items-center justify-center transition-all">
            <PlusIcon
              className={cn('w-6 h-6 transition-all', isActive && '-rotate-45')}
            />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="mb-4" align="end">
          <DropdownMenu.Item
            className="gap-2"
            onSelect={() => openNewTransactionModal('EXPENSE')}
          >
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="gap-2"
            onSelect={() => openNewTransactionModal('INCOME')}
          >
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
