import { Logo } from '../../components/Logo';
import { UserMenu } from '../../components/UserMenu';
import { Accounts } from './components/Accounts';
import { Transactions } from './components/Transactions';

export function Dashboard() {
  return (
    <div className="w-full h-full p-4 lg:px-8 lg:pb-8 lg:pt-6 flex flex-col gap-2 lg:gap-4">
      <header className="flex items-center justify-between py-2 lg:p-0">
        <Logo className="h-6 text-teal-900" />

        <UserMenu />
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-4 max-h-full">
        <div className="w-full lg:w-1/2">
          <Accounts />
        </div>
        <div className="w-full lg:w-1/2">
          <Transactions />
        </div>
      </main>
    </div>
  );
}
