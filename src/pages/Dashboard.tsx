import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userStr);
    setUserName(user.name || 'Пользователь');
    
    fetchTransactions(user.id);
  }, [navigate]);

  const fetchTransactions = async (userId: number) => {
    try {
      const response = await fetch('https://functions.poehali.dev/28c2f1c0-96a2-4708-b593-af2318653d27', {
        method: 'GET',
        headers: {
          'X-User-Id': userId.toString()
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalIncome = transactions.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  const totalExpense = Math.abs(transactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + parseFloat(tx.amount), 0));
  const balance = totalIncome - totalExpense;

  const recentTransactions = transactions.slice(0, 5);

  const budgets = [
    { category: "Продукты", spent: 15400, limit: 20000, color: "bg-green-500" },
    { category: "Транспорт", spent: 8200, limit: 10000, color: "bg-blue-500" },
    { category: "Развлечения", spent: 12800, limit: 12000, color: "bg-red-500" },
    { category: "Здоровье", spent: 5600, limit: 15000, color: "bg-purple-500" }
  ];

  const categories = [
    { name: "Продукты", amount: 15400, percent: 28, color: "bg-green-500" },
    { name: "Развлечения", amount: 12800, percent: 23, color: "bg-blue-500" },
    { name: "Транспорт", amount: 8200, percent: 15, color: "bg-yellow-500" },
    { name: "Здоровье", amount: 5600, percent: 10, color: "bg-purple-500" },
    { name: "Прочее", amount: 13200, percent: 24, color: "bg-gray-400" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Icon name="DollarSign" size={32} />
            <span>FinTracker</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                {userName.slice(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-6">
          <nav className="space-y-2">
            <Button variant="default" className="w-full justify-start gap-3">
              <Icon name="LayoutDashboard" size={20} />
              Дашборд
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => navigate('/transactions')}>
              <Icon name="ArrowLeftRight" size={20} />
              Транзакции
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Icon name="Target" size={20} />
              Бюджеты
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Icon name="BarChart3" size={20} />
              Аналитика
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Icon name="FolderTree" size={20} />
              Категории
            </Button>
            <div className="border-t border-gray-200 my-4"></div>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Icon name="Settings" size={20} />
              Настройки
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => navigate('/')}>
              <Icon name="LogOut" size={20} />
              Выход
            </Button>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Дашборд</h1>
                <p className="text-muted-foreground">Обзор финансов за октябрь 2024</p>
              </div>
              <div className="flex gap-2">
                <Button variant={selectedPeriod === "week" ? "default" : "outline"} onClick={() => setSelectedPeriod("week")}>
                  Неделя
                </Button>
                <Button variant={selectedPeriod === "month" ? "default" : "outline"} onClick={() => setSelectedPeriod("month")}>
                  Месяц
                </Button>
                <Button variant={selectedPeriod === "year" ? "default" : "outline"} onClick={() => setSelectedPeriod("year")}>
                  Год
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Доход</CardTitle>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-green-600">
                    <Icon name="TrendingUp" size={20} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{totalIncome.toLocaleString()} ₽</div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Расход</CardTitle>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-red-600">
                    <Icon name="TrendingDown" size={20} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{totalExpense.toLocaleString()} ₽</div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Баланс</CardTitle>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-blue-600">
                    <Icon name="Wallet" size={20} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{balance.toLocaleString()} ₽</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Бюджеты</CardTitle>
                  <CardDescription>Контроль расходов по категориям</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {budgets.map((budget, idx) => {
                    const percentage = (budget.spent / budget.limit) * 100;
                    const isOverBudget = percentage > 100;
                    return (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{budget.category}</span>
                          <span className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-muted-foreground'}`}>
                            {budget.spent.toLocaleString()} / {budget.limit.toLocaleString()} ₽
                          </span>
                        </div>
                        <div className="relative">
                          <Progress value={Math.min(percentage, 100)} className="h-2" />
                          {isOverBudget && (
                            <Badge variant="destructive" className="absolute -top-1 -right-1 text-xs">
                              Превышен
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Расходы по категориям</CardTitle>
                  <CardDescription>Распределение за текущий месяц</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.map((cat, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${cat.color}`}></div>
                            <span className="font-medium">{cat.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{cat.amount.toLocaleString()} ₽</div>
                            <div className="text-xs text-muted-foreground">{cat.percent}%</div>
                          </div>
                        </div>
                        <Progress value={cat.percent} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Последние транзакции</CardTitle>
                <CardDescription>Операции за последние 7 дней</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Загрузка...</div>
                ) : recentTransactions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Транзакций пока нет</p>
                    <Button className="mt-4" onClick={() => navigate('/transactions')}>Добавить первую транзакцию</Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {recentTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                              <Icon name={tx.icon || 'Circle'} size={20} className={tx.type === 'income' ? 'text-green-600' : 'text-red-600'} />
                            </div>
                            <div>
                              <div className="font-semibold">{tx.title}</div>
                              <div className="text-sm text-muted-foreground">{tx.category}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold text-lg ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                              {tx.type === 'income' ? '+' : ''}{parseFloat(tx.amount).toLocaleString()} ₽
                            </div>
                            <div className="text-sm text-muted-foreground">{new Date(tx.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-6" onClick={() => navigate('/transactions')}>
                      Показать все транзакции
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;