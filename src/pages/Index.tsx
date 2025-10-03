import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: "BarChart3",
      title: "Аналитика",
      description: "Визуализация доходов и расходов с интерактивными графиками и отчётами"
    },
    {
      icon: "FolderTree",
      title: "Категоризация",
      description: "Автоматическая группировка транзакций по категориям с умным распознаванием"
    },
    {
      icon: "Wallet",
      title: "Бюджеты",
      description: "Планирование расходов с уведомлениями о превышении лимитов"
    },
    {
      icon: "TrendingUp",
      title: "Прогнозы",
      description: "Предсказание финансовых трендов на основе ваших данных"
    }
  ];

  const pricing = [
    {
      name: "Базовый",
      price: "0",
      period: "навсегда",
      features: ["До 100 транзакций/месяц", "Базовая аналитика", "3 категории"],
      highlighted: false
    },
    {
      name: "Про",
      price: "490",
      period: "в месяц",
      features: ["Неограниченные транзакции", "Расширенная аналитика", "Прогнозирование", "Экспорт данных"],
      highlighted: true
    },
    {
      name: "Бизнес",
      price: "1490",
      period: "в месяц",
      features: ["Всё из Про", "Множественные аккаунты", "API доступ", "Приоритетная поддержка"],
      highlighted: false
    }
  ];

  const faqs = [
    {
      question: "Как начать пользоваться трекером?",
      answer: "Зарегистрируйтесь, подключите банковские карты или вносите транзакции вручную. Система автоматически начнёт анализировать ваши финансы."
    },
    {
      question: "Насколько безопасны мои данные?",
      answer: "Мы используем шифрование банковского уровня (256-bit SSL). Данные хранятся на защищённых серверах с регулярным резервным копированием."
    },
    {
      question: "Можно ли экспортировать данные?",
      answer: "Да, в тарифах Про и Бизнес доступен экспорт в форматы Excel, CSV и PDF для дальнейшего анализа."
    },
    {
      question: "Есть ли мобильное приложение?",
      answer: "Да, приложения доступны для iOS и Android. Все данные синхронизируются между устройствами в реальном времени."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Icon name="DollarSign" size={32} />
            <span>FinTracker</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#hero" className="hover:text-primary transition-colors">Главная</a>
            <a href="#features" className="hover:text-primary transition-colors">Возможности</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Тарифы</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-primary transition-colors">Контакты</a>
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/login')}>Войти</Button>
        </div>
      </nav>

      <section id="hero" className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Управляйте финансами с умом
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10">
            Современный трекер для полного контроля над доходами, расходами и финансовым будущим
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6" onClick={() => navigate('/dashboard')}>
              Попробовать бесплатно
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={() => navigate('/dashboard')}>
              Смотреть демо
              <Icon name="Play" size={20} className="ml-2" />
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground mt-2">Пользователей</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary">99.9%</div>
              <div className="text-sm text-muted-foreground mt-2">Безопасность</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground mt-2">Поддержка</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Возможности</h2>
            <p className="text-xl text-muted-foreground">Всё необходимое для управления финансами в одном месте</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="border-2 hover:border-primary transition-all hover:shadow-xl group">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name={feature.icon} size={28} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Тарифы</h2>
            <p className="text-xl text-muted-foreground">Выберите подходящий план для ваших целей</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, idx) => (
              <Card key={idx} className={`relative ${plan.highlighted ? 'border-primary border-4 shadow-2xl scale-105' : 'border-2'}`}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-1 rounded-full text-sm font-semibold">
                    Популярный
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-4">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">₽</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.period}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Icon name="CheckCircle2" size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className={`w-full ${plan.highlighted ? 'bg-primary hover:bg-primary/90' : ''}`} variant={plan.highlighted ? 'default' : 'outline'}>
                    {plan.price === "0" ? "Начать бесплатно" : "Выбрать план"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Частые вопросы</h2>
            <p className="text-xl text-muted-foreground">Ответы на популярные вопросы о сервисе</p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-2 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h2>
            <p className="text-xl text-muted-foreground">Свяжитесь с нами — ответим в течение 24 часов</p>
          </div>
          <Card className="border-2">
            <CardContent className="pt-6">
              <form className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Имя</label>
                  <Input placeholder="Ваше имя" className="h-12" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="your@email.com" className="h-12" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Сообщение</label>
                  <Textarea placeholder="Расскажите о вашем вопросе..." className="min-h-32" />
                </div>
                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90">
                  Отправить сообщение
                  <Icon name="Send" size={18} className="ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xl font-bold mb-4">
                <Icon name="DollarSign" size={28} />
                <span>FinTracker</span>
              </div>
              <p className="text-gray-400 text-sm">Современный финансовый трекер для управления личными финансами</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Продукт</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Возможности</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Тарифы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Обновления</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Документация</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Помощь</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© 2024 FinTracker. Все права защищены</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Github" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Linkedin" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;