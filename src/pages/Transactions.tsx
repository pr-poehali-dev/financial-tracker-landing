import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
  icon: string;
  type: "income" | "expense";
}

const Transactions = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [newTransaction, setNewTransaction] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense" as "income" | "expense",
    date: new Date().toISOString().split('T')[0]
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, title: "Магазин Пятёрочка", category: "Продукты", amount: -2340, date: "2024-10-02", icon: "ShoppingCart", type: "expense" },
    { id: 2, title: "Зарплата", category: "Доход", amount: 85000, date: "2024-10-01", icon: "Briefcase", type: "income" },
    { id: 3, title: "Яндекс.Такси", category: "Транспорт", amount: -450, date: "2024-10-01", icon: "Car", type: "expense" },
    { id: 4, title: "Netflix", category: "Развлечения", amount: -799, date: "2024-09-30", icon: "Tv", type: "expense" },
    { id: 5, title: "Фриланс проект", category: "Доход", amount: 25000, date: "2024-09-28", icon: "Laptop", type: "income" },
    { id: 6, title: "Аптека", category: "Здоровье", amount: -1200, date: "2024-09-27", icon: "Heart", type: "expense" },
    { id: 7, title: "Кофейня Starbucks", category: "Развлечения", amount: -450, date: "2024-09-26", icon: "Coffee", type: "expense" },
    { id: 8, title: "Перевод от клиента", category: "Доход", amount: 15000, date: "2024-09-25", icon: "ArrowDownToLine", type: "income" },
  ]);

  const categories = [
    { value: "Продукты", icon: "ShoppingCart" },
    { value: "Транспорт", icon: "Car" },
    { value: "Развлечения", icon: "Tv" },
    { value: "Здоровье", icon: "Heart" },
    { value: "Доход", icon: "Briefcase" },
    { value: "Прочее", icon: "MoreHorizontal" }
  ];

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    
    const categoryData = categories.find(c => c.value === newTransaction.category) || categories[categories.length - 1];
    
    const transaction: Transaction = {
      id: transactions.length + 1,
      title: newTransaction.title,
      category: newTransaction.category,
      amount: newTransaction.type === "income" ? Math.abs(parseFloat(newTransaction.amount)) : -Math.abs(parseFloat(newTransaction.amount)),
      date: newTransaction.date,
      icon: categoryData.icon,
      type: newTransaction.type
    };

    setTransactions([transaction, ...transactions]);
    setIsDialogOpen(false);
    setNewTransaction({
      title: "",
      amount: "",
      category: "",
      type: "expense",
      date: new Date().toISOString().split('T')[0]
    });
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || tx.type === filterType;
    const matchesCategory = filterCategory === "all" || tx.category === filterCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const totalIncome = filteredTransactions.filter(tx => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpense = Math.abs(filteredTransactions.filter(tx => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0));

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate('/dashboard')}>
            <Icon name="DollarSign" size={32} />
            <span>FinTracker</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
              АП
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-6">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => navigate('/dashboard')}>
              <Icon name="LayoutDashboard" size={20} />
              Дашборд
            </Button>
            <Button variant="default" className="w-full justify-start gap-3">
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
                <h1 className="text-3xl font-bold mb-2">Транзакции</h1>
                <p className="text-muted-foreground">Все операции за октябрь 2024</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить транзакцию
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Новая транзакция</DialogTitle>
                    <DialogDescription>Добавьте доход или расход в систему</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddTransaction} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="tx-title">Название</Label>
                      <Input
                        id="tx-title"
                        placeholder="Например: Покупка продуктов"
                        value={newTransaction.title}
                        onChange={(e) => setNewTransaction({...newTransaction, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tx-amount">Сумма</Label>
                        <Input
                          id="tx-amount"
                          type="number"
                          placeholder="0"
                          value={newTransaction.amount}
                          onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tx-type">Тип</Label>
                        <Select value={newTransaction.type} onValueChange={(value: "income" | "expense") => setNewTransaction({...newTransaction, type: value})}>
                          <SelectTrigger id="tx-type">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="expense">Расход</SelectItem>
                            <SelectItem value="income">Доход</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tx-category">Категория</Label>
                      <Select value={newTransaction.category} onValueChange={(value) => setNewTransaction({...newTransaction, category: value})} required>
                        <SelectTrigger id="tx-category">
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat.value} value={cat.value}>{cat.value}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tx-date">Дата</Label>
                      <Input
                        id="tx-date"
                        type="date"
                        value={newTransaction.date}
                        onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                        required
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                        Отмена
                      </Button>
                      <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                        Добавить
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Доходы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">+{totalIncome.toLocaleString()} ₽</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Расходы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">-{totalExpense.toLocaleString()} ₽</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Баланс</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{(totalIncome - totalExpense).toLocaleString()} ₽</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Поиск транзакций..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все типы</SelectItem>
                        <SelectItem value="income">Доходы</SelectItem>
                        <SelectItem value="expense">Расходы</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все категории</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat.value} value={cat.value}>{cat.value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredTransactions.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="FileSearch" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Транзакции не найдены</p>
                    </div>
                  ) : (
                    filteredTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                            <Icon name={tx.icon} size={20} className={tx.type === 'income' ? 'text-green-600' : 'text-red-600'} />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-base">{tx.title}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{tx.category}</Badge>
                              <span className="text-sm text-muted-foreground">{new Date(tx.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <div className={`font-bold text-xl ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {tx.type === 'income' ? '+' : ''}{tx.amount.toLocaleString()} ₽
                          </div>
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                            <Icon name="MoreVertical" size={20} />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transactions;
