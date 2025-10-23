import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  Hotel, 
  User, 
  Calendar, 
  Settings, 
  LogOut, 
  TrendingUp, 
  Star, 
  Bell,
  Sparkles,
  Crown,
  Shield
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-accent-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="relative">
                <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-3 rounded-xl shadow-lg">
                  <Hotel className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  Hotel Mavi
                </h1>
                <p className="text-xs text-gray-500">Sistema de Gerenciamento</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-primary-50 px-3 py-2 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Olá, {user?.nome}!</p>
                  <p className="text-xs text-gray-500">Bem-vindo de volta</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={logout}
                className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-slide-down">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <Crown className="h-8 w-8 text-yellow-300 mr-3" />
                <h2 className="text-3xl font-bold">Dashboard Executivo</h2>
              </div>
              <p className="text-white/90 text-lg mb-6">
                Bem-vindo ao centro de controle do Hotel Mavi. Acompanhe todas as métricas importantes em tempo real.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-sm text-white/80">Última atualização</p>
                  <p className="font-semibold">{new Date().toLocaleTimeString('pt-BR')}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-sm text-white/80">Status</p>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <p className="font-semibold">Online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-3 rounded-xl shadow-lg">
                    <Hotel className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Quartos</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2 este mês
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 animate-scale-in" style={{animationDelay: '0.1s'}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl shadow-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Hóspedes</p>
                    <p className="text-2xl font-bold text-gray-900">18</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5 hoje
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 animate-scale-in" style={{animationDelay: '0.2s'}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl shadow-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Reservas</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      4.8 avaliação
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 animate-scale-in" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Ocupação</p>
                    <p className="text-2xl font-bold text-gray-900">75%</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% vs ontem
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Info Card */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl animate-slide-up">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-lg mr-3">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl">Informações do Usuário</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-400" />
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary-600" />
                  Dados Pessoais
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-4 rounded-xl">
                    <dt className="text-sm font-medium text-gray-600 mb-1">Nome Completo</dt>
                    <dd className="text-lg font-semibold text-gray-900">{user?.nome}</dd>
                  </div>
                  <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-4 rounded-xl">
                    <dt className="text-sm font-medium text-gray-600 mb-1">Email</dt>
                    <dd className="text-lg font-semibold text-gray-900">{user?.email}</dd>
                  </div>
                  {user?.pronome && (
                    <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-4 rounded-xl">
                      <dt className="text-sm font-medium text-gray-600 mb-1">Pronome</dt>
                      <dd className="text-lg font-semibold text-gray-900">{user.pronome}</dd>
                    </div>
                  )}
                  {user?.tel && (
                    <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-4 rounded-xl">
                      <dt className="text-sm font-medium text-gray-600 mb-1">Telefone</dt>
                      <dd className="text-lg font-semibold text-gray-900">{user.tel}</dd>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-accent-600" />
                  Ações Rápidas
                </h4>
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-white/50 hover:bg-primary-50 hover:border-primary-200 transition-all duration-200"
                  >
                    <User className="h-4 w-4 mr-3 text-primary-600" />
                    Editar Perfil
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-white/50 hover:bg-accent-50 hover:border-accent-200 transition-all duration-200"
                  >
                    <Settings className="h-4 w-4 mr-3 text-accent-600" />
                    Configurações
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-white/50 hover:bg-green-50 hover:border-green-200 transition-all duration-200"
                  >
                    <Bell className="h-4 w-4 mr-3 text-green-600" />
                    Notificações
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
