import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useRegisterController } from './useRegisterController';

export function Register() {
  const { handleSubmit, register, errors, isLoading } = useRegisterController();

  const hasErrors = Boolean(errors.name || errors.email || errors.password);

  return (
    <div>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900  tracking-[-1px]">
          Crie sua conta
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Já possui uma conta?
          </span>
          <Link
            to="/login"
            className="text-teal-900 font-medium tracking-[-0.5px]"
          >
            Fazer login
          </Link>
        </p>
      </header>

      <form
        className="mt-[60px] flex flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          placeholder="Nome"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          type="email"
          placeholder="E-mail"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button
          type="submit"
          className="mt-2"
          disabled={hasErrors}
          isLoading={isLoading}
        >
          Criar conta
        </Button>
      </form>
    </div>
  );
}
