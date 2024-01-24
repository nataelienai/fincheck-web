import { ExitIcon } from '@radix-ui/react-icons';
import { useAuth } from '../../app/hooks/useAuth';
import { DropdownMenu } from './DropdownMenu';

export function UserMenu() {
  const { user, signout } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="h-12 w-12 bg-teal-50 rounded-full flex items-center justify-center">
          <span className="text-sm leading-none tracking-[-0.5px] text-teal-900 font-medium">
            {user?.name.slice(0, 2).toUpperCase()}
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32 mt-4" align="end">
        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={signout}
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
