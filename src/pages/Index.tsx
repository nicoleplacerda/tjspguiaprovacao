import { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Package,
  FileText,
  Calendar,
  Brain,
  Target,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Layout,
  BookOpen
} from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';

const CHECKOUT_URL = "https://pay.kirvano.com/d2cd80eb-7fca-4fc1-8513-2232d2f34e98";

const Index = () => {
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCheckout = () => {
    window.location.href = CHECKOUT_URL;
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">

      {/* Faixa de Urgência */}
      <div className="bg-warning text-warning-foreground py-2 text-center text-sm font-bold flex items-center justify-center gap-2 sticky top-0 z-50">
        <Clock size={16} />
        OFERTA POR TEMPO LIMITADO: O preço sobe em {formatTime(timeLeft)}
      </div>

      {/* Hero */}
      <header className="relative pt-20 pb-32 px-4 overflow-hidden min-h-[85vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Fundo TJSP"
            className="w-full h-full object-cover opacity-80 brightness-[0.8] contrast-[1.1]"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[150px] rounded-full -z-10" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1 bg-card/80 backdrop-blur-md border border-border rounded-full text-muted-foreground text-xs font-semibold mb-6 uppercase tracking-widest shadow-2xl">
            Concurso Escrevente TJSP 2026
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-foreground drop-shadow-2xl text-balance">
            A forma mais simples de estudar para o concurso de <span className="text-primary">Escrevente do TJSP</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium drop-shadow-md">
            Tenha acesso a um drive completo com todo o material que você precisa para o TJSP 2026 — organizado, direto ao ponto e pronto pra seguir.
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2 mb-4 bg-background/60 backdrop-blur-md p-6 rounded-3xl border border-border shadow-2xl">
              <span className="text-muted-foreground uppercase text-xs font-bold tracking-widest">Acesso imediato por apenas</span>
              <div className="text-6xl font-black text-warning tracking-tighter">R$ 47,00</div>
              <span className="text-muted-foreground text-sm font-semibold tracking-wide">PAGAMENTO ÚNICO</span>
            </div>

            <button
              onClick={handleCheckout}
              className="group relative px-10 py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold text-xl md:text-2xl transition-all shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_45px_hsl(var(--primary)/0.7)] flex items-center gap-3 active:scale-95"
            >
              👉 QUERO COMEÇAR AGORA
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Entregáveis */}
      <section className="py-24 px-4 bg-surface" id="conteudo">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3 text-foreground">
              <Package className="text-primary" /> O QUE VOCÊ VAI RECEBER
            </h2>
            <p className="text-muted-foreground">Tudo organizado em um único drive focado no concurso de Escrevente do TJSP 2026.</p>
          </div>

          {/* 3 tópicos + mockup flutuante */}
          <div className="relative mb-10">
            <div className="md:w-[55%] space-y-4">
              <FeatureCard icon={FileText} title="Apostilas completas por matéria" description="Conteúdo separado conforme o edital, com cada disciplina organizada para facilitar seu estudo." />
              <FeatureCard icon={Calendar} title="Cronograma + edital verticalizado" description="Plano de estudo pronto para seguir. Você não precisa pensar, apenas executar." />
              <FeatureCard icon={Brain} title="Mapas mentais" description="Resumos visuais que facilitam a memorização e aceleram suas revisões." />
            </div>

            <img
              src="/images/drive-mockup.png?v=2"
              alt="Preview do Drive com materiais TJSP"
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[280px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)] z-10 pointer-events-none"
              width={280}
              height={560}
            />

            {/* Mobile: show below */}
            <div className="flex justify-center mt-8 md:hidden">
              <img
                src="/images/drive-mockup.png"
                alt="Preview do Drive com materiais TJSP"
                className="w-[220px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
                width={220}
                height={440}
              />
            </div>
          </div>

          {/* Restante dos tópicos */}
          <div className="grid md:grid-cols-2 gap-4">
            <FeatureCard icon={Target} title="+ de 3.000 questões do TJSP" description="Treine com questões reais da banca e entenda como a prova funciona na prática." />
            <FeatureCard icon={Layout} title="Simulados completos" description="Teste seu desempenho e se prepare para o dia da prova." />
            <FeatureCard icon={BookOpen} title="Estrutura de redação" description="Modelo pronto para você não travar e conseguir desenvolver uma boa redação." />
            <FeatureCard icon={ShieldCheck} title="Vade Mecum direcionado" description="Conteúdo focado no que realmente importa para a prova, sem excesso desnecessário." />
            <div className="md:col-span-2 bg-gradient-to-r from-primary/20 to-card border border-primary/30 p-8 rounded-2xl flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Acesso Imediato ao Drive</h3>
              <p className="text-muted-foreground">Após a confirmação do pagamento, você recebe os dados de acesso no seu e-mail instantaneamente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dores */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Você não precisa gastar centenas (ou até milhares) em cursos</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A realidade é simples: Hoje existem cursos para TJSP que custam R$300, R$500, R$1.000 ou mais…
              </p>
              <p className="text-foreground/80 font-medium mb-4">E mesmo assim, muita gente continua:</p>

              <ul className="space-y-4">
                {["perdida", "sem saber o que estudar", "pulando de conteúdo em conteúdo"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-destructive font-semibold">
                    <XCircle size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground mt-6 italic">
                👉 É falta de organização e direção. E é exatamente isso que trava sua aprovação.
              </p>
            </div>

            <div className="bg-card p-8 rounded-3xl border border-border relative shadow-2xl">
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-3 rounded-xl shadow-lg rotate-12">
                <AlertTriangle size={24} />
              </div>
              <p className="text-xl italic text-foreground/80 mb-6">
                "O problema não é falta de material… É falta de organização."
              </p>
              <p className="text-muted-foreground text-sm">
                ⚠️ E o pior: o tempo vai passando enquanto você decide por onde começar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experiências Negativas */}
      <section className="py-20 px-4 bg-surface">
        <div className="max-w-4xl mx-auto bg-primary rounded-3xl p-1 shadow-2xl">
          <div className="bg-background rounded-[22px] p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-foreground">Você provavelmente já passou por isso:</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Baixou vários PDFs e não soube por onde começar",
                "Ficou alternando entre conteúdos sem sequência",
                "Estudou muito… mas sem evolução clara",
                "Sentiu que estava \"fazendo esforço\", mas sem resultado"
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start p-4 bg-card/50 rounded-xl border border-border transition-colors hover:bg-card">
                  <span className="text-destructive mt-1">⚠️</span>
                  <p className="text-muted-foreground text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparação de Preços */}
      <section className="py-24 px-4 border-t border-border" id="oferta">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 italic text-foreground">💰 Se você fosse montar tudo isso sozinho...</h2>

          <div className="bg-card rounded-3xl overflow-hidden mb-12 border border-border shadow-2xl">
            <div className="p-8 space-y-4 text-left">
              {[
                ["Apostilas completas por matéria", "R$ 150+"],
                ["Banco de 3.000+ questões", "R$ 120+"],
                ["Simulados + Mapas Mentais", "R$ 90+"],
                ["Estrutura de Redação + Vade Mecum", "R$ 80+"],
                ["Cronograma + Edital verticalizado", "R$ 60+"],
              ].map(([name, price], i) => (
                <div key={i} className="flex justify-between text-muted-foreground border-b border-border pb-2 text-sm md:text-base">
                  <span>{name}</span>
                  <span className="text-foreground font-bold">{price}</span>
                </div>
              ))}
              <div className="h-4" />
              <div className="flex justify-between text-2xl font-bold text-foreground/80">
                <span>Valor Total de Mercado</span>
                <span className="line-through text-destructive font-black">R$ 500+</span>
              </div>
            </div>

            <div className="bg-primary p-10">
              <p className="text-primary-foreground uppercase font-bold tracking-widest mb-2">🔥 MAS HOJE VOCÊ PAGA APENAS:</p>
              <div className="text-7xl font-black text-primary-foreground mb-2 tracking-tighter">R$ 47,00</div>
              <p className="text-primary-foreground/80 font-medium text-lg">Pagamento único. Acesso imediato.</p>

              <button
                onClick={handleCheckout}
                className="mt-8 w-full py-6 bg-foreground text-background rounded-full font-black text-2xl hover:opacity-90 transition-all shadow-xl active:scale-95 uppercase"
              >
                🚀 Começar Agora
              </button>

              <p className="mt-4 text-xs text-primary-foreground/70">⚠️ Esse valor não deve ficar disponível por muito tempo. O preço pode subir a qualquer momento.</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2"><ShieldCheck className="text-success" /> Acesso Vitalício</div>
            <div className="flex items-center gap-2"><ShieldCheck className="text-success" /> Sem Mensalidade</div>
            <div className="flex items-center gap-2"><ShieldCheck className="text-success" /> Pagamento Único</div>
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section className="py-20 px-4 bg-surface">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 p-10 bg-card rounded-[40px] border border-border shadow-xl">
          <div className="relative shrink-0">
            <div className="w-40 h-40 border-8 border-warning rounded-full flex items-center justify-center text-warning font-black text-5xl">7</div>
            <div className="absolute -bottom-2 -right-2 bg-warning text-warning-foreground px-4 py-1 rounded-full font-bold text-xs uppercase tracking-tighter">Garantia</div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-foreground uppercase tracking-tight">🔒 Você ainda tem garantia de 7 dias</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Se não gostar do material, você pode pedir reembolso. Sem burocracia. O risco é todo meu. Se o material não te ajudar a se organizar para o TJSP, eu devolvo seu dinheiro.
            </p>
            <button
              onClick={handleCheckout}
              className="mt-6 px-8 py-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl font-bold transition-all active:scale-95 border border-border"
            >
              GARANTIR MINHA VAGA AGORA
            </button>
          </div>
        </div>
      </section>

      {/* Decisão Final */}
      <section className="py-24 px-4 text-center bg-background">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-10 text-foreground uppercase italic tracking-tighter">A decisão agora é sua</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="p-8 bg-card rounded-2xl border border-border text-left opacity-60">
              <XCircle className="text-destructive mb-4" size={32} />
              <p className="text-base font-bold mb-2 text-foreground">❌ Continuar perdido</p>
              <p className="text-muted-foreground text-sm">Tentando estudar sem direção e gastando centenas em cursos caros.</p>
            </div>
            <div className="p-8 bg-primary/10 rounded-2xl border border-primary text-left shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
              <CheckCircle className="text-success mb-4" size={32} />
              <p className="text-base font-bold mb-2 text-foreground">✅ Começar hoje</p>
              <p className="text-foreground/80 text-sm">Com um material completo, organizado e acessível por apenas R$47.</p>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full md:w-auto px-16 py-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-black text-2xl transition-all shadow-2xl flex items-center justify-center gap-4 mx-auto active:scale-95"
          >
            👉 QUERO ACESSAR O MATERIAL DO TJSP
          </button>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="py-12 border-t border-border text-center text-muted-foreground text-xs px-4">
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo-tjsp.png"
            alt="Logo TJSP Escrevente"
            className="h-20 md:h-24 w-auto"
            width={200}
            height={96}
          />
        </div>
        <p className="mb-4">© 2026 - Guia de Aprovação Escrevente TJSP. Todos os direitos reservados.</p>
        <p className="max-w-2xl mx-auto leading-relaxed">
          Este produto não garante a aprovação no concurso. O resultado depende exclusivamente do empenho e dedicação do estudante. Não temos vínculo direto com o Tribunal de Justiça de São Paulo.
        </p>
      </footer>
    </div>
  );
};

export default Index;
