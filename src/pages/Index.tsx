import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const portfolioImages = [
    {
      id: 1,
      url: 'https://cdn.poehali.dev/projects/abe62bad-860d-4320-a8ed-cdd299d38cec/files/3fc55912-d57e-454b-abef-f4ebfa36ed4a.jpg',
      title: 'Портретная съёмка',
      category: 'Портрет'
    },
    {
      id: 2,
      url: 'https://cdn.poehali.dev/projects/abe62bad-860d-4320-a8ed-cdd299d38cec/files/62c26992-845f-471d-bb65-82132d6c585a.jpg',
      title: 'Пейзажная фотография',
      category: 'Пейзаж'
    },
    {
      id: 3,
      url: 'https://cdn.poehali.dev/projects/abe62bad-860d-4320-a8ed-cdd299d38cec/files/bda4bc74-ba3b-4cf8-8f95-05648acc3f2e.jpg',
      title: 'Предметная съёмка',
      category: 'Предметка'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/35f8460b-004f-4a36-9f7a-1e117e975e51', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send');
      }

      toast({
        title: "Заявка отправлена",
        description: "Спасибо! Я свяжусь с вами в ближайшее время.",
      });
      
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Александра Смирнова</h1>
          <div className="flex gap-8">
            <a href="#portfolio" className="text-sm hover:text-primary transition-colors">Портфолио</a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">Контакты</a>
          </div>
        </nav>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/abe62bad-860d-4320-a8ed-cdd299d38cec/files/bda4bc74-ba3b-4cf8-8f95-05648acc3f2e.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white animate-fade-in px-6">
          <h2 className="text-7xl md:text-9xl font-serif font-light mb-6 tracking-tight">
            Фотограф
          </h2>
          <p className="text-xl md:text-2xl font-light tracking-wide mb-8">
            Создаю истории через объектив
          </p>
          <Button 
            size="lg"
            className="bg-white text-foreground hover:bg-white/90 transition-all"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Связаться со мной
          </Button>
        </div>
      </section>

      <section id="portfolio" className="py-24 container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-serif font-light mb-4">Портфолио</h2>
          <p className="text-muted-foreground text-lg">Избранные работы</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioImages.map((image, index) => (
            <Card 
              key={image.id} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 animate-scale-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white">
                    <p className="text-sm font-sans uppercase tracking-wider mb-2">{image.category}</p>
                    <h3 className="text-2xl font-serif">{image.title}</h3>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="contact" className="py-24 bg-muted">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-serif font-light mb-4">Связаться</h2>
            <p className="text-muted-foreground text-lg">Расскажите о вашей идее</p>
          </div>

          <Card className="p-8 md:p-12 shadow-xl animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Ваше имя
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full"
                  placeholder="Иван Иванов"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full"
                  placeholder="ivan@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Телефон
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Сообщение
                </label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full min-h-[150px]"
                  placeholder="Расскажите о вашей идее съёмки..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground text-sm">
              © 2024 Александра Смирнова. Все права защищены.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Mail" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Phone" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}