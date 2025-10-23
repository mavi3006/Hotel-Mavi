import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Hotel, Sparkles, UserPlus, CheckCircle } from 'lucide-react';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const password = watch('senha');

  // Função para validar CPF
  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Algoritmo de validação do CPF
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;
    
    return true;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await registerUser(data);
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background com gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-600 via-accent-700 to-primary-600">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-bounce-gentle"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary-300/20 rounded-full blur-3xl animate-bounce-gentle" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent-400/30 rounded-full blur-3xl animate-bounce-gentle" style={{animationDelay: '3s'}}></div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
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
              Cadastre-se como hóspede e aproveite nossos serviços
            </p>
          </div>

          {/* Register Form */}
          <div className="animate-slide-up">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Nome completo"
                      type="text"
                      placeholder="Seu nome completo"
                      required
                      error={errors.nome?.message}
                      className="bg-white/50 border-white/30 text-gray-900 placeholder-gray-600 focus:bg-white/70"
                      {...register('nome', {
                        required: 'Nome é obrigatório',
                        minLength: {
                          value: 2,
                          message: 'Nome deve ter pelo menos 2 caracteres'
                        }
                      })}
                    />

                    <Input
                      label="Pronome (opcional)"
                      type="text"
                      placeholder="ele/dele, ela/dela, etc."
                      error={errors.pronome?.message}
                      className="bg-white/50 border-white/30 text-gray-900 placeholder-gray-600 focus:bg-white/70"
                      {...register('pronome')}
                    />

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
                      label="Telefone (opcional)"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      error={errors.tel?.message}
                      className="bg-white/50 border-white/30 text-gray-900 placeholder-gray-600 focus:bg-white/70"
                      {...register('tel', {
                        pattern: {
                          value: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
                          message: 'Telefone deve estar no formato (11) 99999-9999'
                        }
                      })}
                    />

                    <Input
                      label="Data de nascimento (opcional)"
                      type="date"
                      error={errors.data_nascimento?.message}
                      className="bg-white/50 border-white/30 text-gray-900 placeholder-gray-600 focus:bg-white/70"
                      {...register('data_nascimento')}
                    />

                    <Input
                      label="CPF"
                      type="text"
                      placeholder="000.000.000-00"
                      required
                      error={errors.cpf?.message}
                      className="bg-white/50 border-white/30 text-gray-900 placeholder-gray-600 focus:bg-white/70"
                      {...register('cpf', {
                        required: 'CPF é obrigatório',
                        validate: (value) => validateCPF(value) || 'CPF inválido'
                      })}
                    />

                    <Input
                      label="Senha"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
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

                    <Input
                      label="Confirmar senha"
                      type="password"
                      placeholder="Confirme sua senha"
                      required
                      error={errors.confirmarSenha?.message}
                      className="bg-white/50 border-white/30 text-gray-900 placeholder-gray-600 focus:bg-white/70"
                      {...register('confirmarSenha', {
                        required: 'Confirmação de senha é obrigatória',
                        validate: (value) => value === password || 'Senhas não coincidem'
                      })}
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded bg-white/50 mt-1"
                    />
                    <label htmlFor="terms" className="ml-3 block text-sm text-white">
                      Aceito os{' '}
                      <a href="#" className="font-semibold text-white hover:text-yellow-300 transition-colors underline">
                        termos de uso
                      </a>{' '}
                      e{' '}
                      <a href="#" className="font-semibold text-white hover:text-yellow-300 transition-colors underline">
                        política de privacidade
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full bg-white text-accent-700 hover:bg-white/90 font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2 animate-pulse" />
                        Criando conta...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5 mr-2" />
                        Criar conta
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="p-8 pt-0">
                <div className="text-center w-full">
                  <p className="text-white/80">
                    Já tem uma conta?{' '}
                    <Link
                      to="/login"
                      className="font-semibold text-white hover:text-yellow-300 transition-colors underline decoration-2 underline-offset-2"
                    >
                      Faça login aqui
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

export default Register;
