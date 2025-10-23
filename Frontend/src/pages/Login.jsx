import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Hotel, Sparkles, Shield, Zap } from 'lucide-react';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await login(data);
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erro no login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background com gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-bounce-gentle"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-primary-300/20 rounded-full blur-3xl animate-bounce-gentle" style={{animationDelay: '2s'}}></div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center animate-slide-down">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl shadow-2xl border border-white/30">
                  <Hotel className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                </div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">
              Hotel Mavi
            </h2>
            <p className="text-white/80 text-lg">
              Entre em sua conta de hóspede
            </p>
          </div>

          {/* Login Form */}
          <div className="animate-slide-up">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    error={errors.email?.message}
                    className="bg-white/50 border-white/30 text-gray-900 placeholder-gray-600 focus:bg-white/70"
                    {...register('email', {
                      required: 'Email é obrigatório',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    })}
                  />

                  <Input
                    label="Senha"
                    type="password"
                    placeholder="Sua senha"
                    required
                    error={errors.senha?.message}
                    className="bg-white/50 border-white/30 text-gray-900 placeholder-gray-600 focus:bg-white/70"
                    {...register('senha', {
                      required: 'Senha é obrigatória',
                      minLength: {
                        value: 6,
                        message: 'Senha deve ter pelo menos 6 caracteres'
                      }
                    })}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded bg-white/50"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                        Lembrar de mim
                      </label>
                    </div>

                    <div className="text-sm">
                      <a href="#" className="font-medium text-white/80 hover:text-white transition-colors">
                        Esqueceu sua senha?
                      </a>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full bg-white text-primary-700 hover:bg-white/90 font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Zap className="w-5 h-5 mr-2 animate-pulse" />
                        Entrando...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
                        Entrar
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="p-8 pt-0">
                <div className="text-center w-full">
                  <p className="text-white/80">
                    Não tem uma conta?{' '}
                    <Link
                      to="/register"
                      className="font-semibold text-white hover:text-yellow-300 transition-colors underline decoration-2 underline-offset-2"
                    >
                      Cadastre-se aqui
                    </Link>
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center animate-fade-in">
            <p className="text-white/60 text-sm">
              © 2025 Hotel Mavi. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
