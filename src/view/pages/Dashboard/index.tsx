import { Logo } from '../../components/Logo';
import { UserMenu } from '../../components/UserMenu';
import { Accounts } from './components/Accounts';
import {
  DashboardContext,
  DashboardProvider,
} from './components/DashboardContext';
import { Fab } from './components/Fab';
import { Transactions } from './components/Transactions';
import { EditAccountModal } from './modals/EditAccountModal';
import { NewAccountModal } from './modals/NewAccountModal';
import { NewTransactionModal } from './modals/NewTransactionModal';

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({
          isEditAccountModalOpen,
          isNewAccountModalOpen,
          isNewTransactionModalOpen,
        }) => (
          <div className="w-full h-full p-4 lg:px-8 lg:pb-8 lg:pt-6 flex flex-col gap-2 lg:gap-4">
            <header className="flex items-center justify-between py-2 lg:p-0">
              <Logo className="h-6 text-teal-900" />

              <UserMenu />
            </header>

            <main className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-4 h-[calc(100%-64px)]">
              <div className="w-full lg:w-[calc(50%-8px)]">
                <Accounts />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)] pb-4 lg:pb-0">
                <Transactions />
              </div>
            </main>

            <Fab />
            {isNewAccountModalOpen && <NewAccountModal />}
            {isNewTransactionModalOpen && <NewTransactionModal />}
            {isEditAccountModalOpen && <EditAccountModal />}
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
