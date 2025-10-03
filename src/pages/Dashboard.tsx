import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const stats = [
    { label: "Доход", value: "124 500", change: "+12.5%", trend: "up", icon: "TrendingUp", color: "text-green-600" },
    { label: "Расход", value: "87 200", change: "-8.3%", trend: "down", icon: "TrendingDown", color: "text-red-600" },
    { label: "Баланс", value: "37 300", change: "+18.2%", trend: "up", icon: "Wallet", color: "text-blue-600" },
    { label: "Сбережения", value: "215 000", change: "+5.1%", trend: "up", icon: "PiggyBank", color: "text-purple-600" }
  ];

  const budgets = [
    { category: "Продукты", spent: 15400, limit: 20000, color: "bg-green-500" },
    { category: "Транспорт", spent: 8200, limit: 10000, color: "bg-blue-500" },
    { category: "Развлечения", spent: 12800, limit: 12000, color: "bg-red-500" },
    { category: "Здоровье", spent: 5600, limit: 15000, color: "bg-purple-500" }
  ];

  const transactions = [
    { id: 1, title: "Магазин Пятёрочка", category: "Продукты", amount: -2340, date: "2 окт", icon: "ShoppingCart", type: "expense" },
    { id: 2, title: "Зарплата", category: "Доход", amount: 85000, date: "1 окт", icon: "Briefcase", type: "income" },
    { id: 3, title: "Яндекс.Такси", category: "Транспорт", amount: -450, date: "1 окт", icon: "Car", type: "expense" },
    { id: 4, title: "Netflix", category: "Развлечения", amount: -799, date: "30 сен", icon: "Tv", type: "expense" },
    { id: 5, title: "Фриланс проект", category: "Доход", amount: 25000, date: "28 сен", icon: "Laptop", type: "income" }
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
                АП
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
            <Button variant="ghost" className="w-full justify-start gap-3">
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center ${stat.color}`}>
                      <Icon name={stat.icon} size={20} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{stat.value} ₽</div>
                    <p className={`text-sm flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      <Icon name={stat.trend === 'up' ? "ArrowUp" : "ArrowDown"} size={16} />
                      {stat.change} от прошлого месяца
                    </p>
                  </CardContent>
                </Card>
              ))}
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
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                          <Icon name={tx.icon} size={20} className={tx.type === 'income' ? 'text-green-600' : 'text-red-600'} />
                        </div>
                        <div>
                          <div className="font-semibold">{tx.title}</div>
                          <div className="text-sm text-muted-foreground">{tx.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold text-lg ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {tx.type === 'income' ? '+' : ''}{tx.amount.toLocaleString()} ₽
                        </div>
                        <div className="text-sm text-muted-foreground">{tx.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6">
                  Показать все транзакции
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;