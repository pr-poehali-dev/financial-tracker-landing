import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/83411b6b-e48a-46f6-b444-a5116d01cc0f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Ошибка входа",
          description: data.error || "Неверный email или пароль",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      localStorage.setItem('user', JSON.stringify(data));
      
      toast({
        title: "Добро пожаловать!",
        description: `Рады видеть вас, ${data.name}`
      });

      setTimeout(() => navigate('/dashboard'), 500);
    } catch (error) {
      toast({
        title: "Ошибка сети",
        description: "Не удалось подключиться к серверу",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-2 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
              <Icon name="DollarSign" size={36} className="text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Вход в FinTracker</CardTitle>
            <CardDescription className="text-base mt-2">Управляйте финансами с умом</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-base">Пароль</Label>
                <a href="#" className="text-sm text-primary hover:underline">Забыли пароль?</a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
              />
            </div>
            <Button type="submit" className="w-full h-12 text-base bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? "Вход..." : "Войти"}
              {!isLoading && <Icon name="ArrowRight" size={20} className="ml-2" />}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-muted-foreground">или продолжить с</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12">
              <Icon name="Mail" size={20} className="mr-2" />
              Google
            </Button>
            <Button variant="outline" className="h-12">
              <Icon name="Github" size={20} className="mr-2" />
              GitHub
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Нет аккаунта?{" "}
            <button onClick={() => navigate('/register')} className="text-primary font-semibold hover:underline">
              Зарегистрироваться
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;