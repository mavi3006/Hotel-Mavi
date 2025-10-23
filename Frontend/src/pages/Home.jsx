import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { 
  Hotel, 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Coffee,
  Dumbbell,
  Pool,
  Spa,
  Utensils,
  Shield,
  Sparkles,
  Calendar,
  Users,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  Clock,
  Award
} from 'lucide-react';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const services = [
    { icon: Wifi, title: 'Wi-Fi Gratuito', description: 'Internet de alta velocidade em todo o hotel' },
    { icon: Car, title: 'Estacionamento', description: 'Vagas gratuitas para hóspedes' },
    { icon: Coffee, title: 'Café da Manhã', description: 'Buffet completo incluído na diária' },
    { icon: Dumbbell, title: 'Academia', description: 'Equipamentos modernos 24h' },
    { icon: Pool, title: 'Piscina', description: 'Piscina aquecida com vista panorâmica' },
    { icon: Spa, title: 'Spa & Wellness', description: 'Tratamentos relaxantes e massagens' },
    { icon: Utensils, title: 'Restaurante', description: 'Culinária internacional premiada' },
    { icon: Shield, title: 'Segurança 24h', description: 'Monitoramento e segurança total' }
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      location: 'São Paulo, SP',
      rating: 5,
      text: 'Experiência incrível! O Hotel Mavi superou todas as minhas expectativas. Quartos luxuosos, atendimento excepcional.'
    },
    {
      name: 'João Santos',
      location: 'Rio de Janeiro, RJ',
      rating: 5,
      text: 'Localização perfeita, instalações modernas e uma equipe que faz toda a diferença. Recomendo de olhos fechados!'
    },
    {
      name: 'Ana Costa',
      location: 'Belo Horizonte, MG',
      rating: 5,
      text: 'O melhor hotel que já me hospedei! Spa maravilhoso, comida deliciosa e um ambiente acolhedor único.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg shadow-sm sticky top-0 z-50">
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
                <p className="text-xs text-gray-500">Luxo e Conforto</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#sobre" className="text-gray-700 hover:text-primary-600 transition-colors">Sobre</a>
              <a href="#servicos" className="text-gray-700 hover:text-primary-600 transition-colors">Serviços</a>
              <a href="#quartos" className="text-gray-700 hover:text-primary-600 transition-colors">Quartos</a>
              <a href="#contato" className="text-gray-700 hover:text-primary-600 transition-colors">Contato</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Olá, {user.nome}!</span>
                  <Button 
                    variant="outline" 
                    onClick={logout}
                    className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
                  >
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <Button variant="outline">
                      Entrar
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button>
                      Cadastrar
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-bounce-gentle"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl animate-bounce-gentle" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Award className="h-5 w-5 text-yellow-300 mr-2" />
                <span className="text-white font-medium">Hotel 5 Estrelas</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-down">
                Hotel Mavi
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up">
                Sua experiência única de luxo e conforto em um ambiente excepcional
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
              <Button 
                size="lg" 
                className="bg-white text-primary-700 hover:bg-white/90 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById('quartos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Fazer Reserva
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
                onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Conhecer Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hotel className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-600">Quartos Luxuosos</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">10k+</h3>
              <p className="text-gray-600">Hóspedes Satisfeitos</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">4.9</h3>
              <p className="text-gray-600">Avaliação Média</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">15</h3>
              <p className="text-gray-600">Anos de Excelência</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Bem-vindo ao Hotel Mavi
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Há mais de 15 anos, o Hotel Mavi é sinônimo de excelência em hospitalidade. 
                Localizado no coração da cidade, oferecemos uma experiência única que combina 
                luxo, conforto e tradição.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Nossos quartos são projetados com os mais altos padrões de qualidade, 
                oferecendo vistas deslumbrantes e todas as comodidades que você precisa 
                para uma estadia memorável.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Atendimento 24 horas</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Localização privilegiada</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Certificado de excelência</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
                <p className="text-lg text-white/90">
                  Proporcionar experiências únicas e memoráveis, superando expectativas 
                  através de um serviço personalizado e instalações de primeira qualidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos uma ampla gama de serviços para tornar sua estadia ainda mais especial
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              O Que Nossos Hóspedes Dizem
            </h2>
            <p className="text-lg text-gray-600">
              Depoimentos de quem já viveu a experiência Mavi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Entre em Contato
            </h2>
            <p className="text-lg text-white/90">
              Estamos aqui para tornar sua experiência ainda melhor
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Telefone</h3>
              <p className="text-white/90">(11) 3333-4444</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <p className="text-white/90">contato@hotelmavi.com</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Recepção</h3>
              <p className="text-white/90">24 horas por dia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-2 rounded-lg mr-3">
                  <Hotel className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Hotel Mavi</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Sua experiência única de luxo e conforto em um ambiente excepcional.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#sobre" className="text-gray-400 hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#servicos" className="text-gray-400 hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#quartos" className="text-gray-400 hover:text-white transition-colors">Quartos</a></li>
                <li><a href="#contato" className="text-gray-400 hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Restaurante</span></li>
                <li><span className="text-gray-400">Spa & Wellness</span></li>
                <li><span className="text-gray-400">Piscina</span></li>
                <li><span className="text-gray-400">Academia</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Rua das Flores, 123</li>
                <li className="text-gray-400">Centro - São Paulo, SP</li>
                <li className="text-gray-400">(11) 3333-4444</li>
                <li className="text-gray-400">contato@hotelmavi.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Hotel Mavi. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
