import { useState, useEffect } from 'react';
import { 
  CheckCircle, XCircle, ArrowRight, Package, FileText, Calendar, Brain, Target, 
  ShieldCheck, AlertTriangle, Clock, Layout, BookOpen, Star, Timer,
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Book, Gift, HelpCircle
} from 'lucide-react';

// --- Subcomponentes ---

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-red-600 transition-all duration-300 group text-center flex flex-col items-center">
    <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="text-red-600" size={28} />
    </div>
    <h3 className="text-lg font-bold text-white mb-3 leading-tight">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const BonusCard = ({ title, description, oldPrice }: { title: string; description?: string; oldPrice: string }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] text-center flex flex-col items-center justify-between hover:border-red-600/50 transition-all duration-300 relative overflow-hidden h-full">
    <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
      <Gift className="text-yellow-500" size={32} />
    </div>
    <div className="flex-1 mb-6">
      <h4 className="text-xl font-black text-white mb-3 uppercase tracking-tighter leading-tight">{title}</h4>
      {description && <p className="text-zinc-400 text-sm leading-relaxed mb-4">{description}</p>}
    </div>
    <div className="w-full pt-6 border-t border-zinc-800">
      <p className="text-zinc-500 text-xs line-through mb-1 uppercase tracking-widest font-bold">De R$ {oldPrice}</p>
      <p className="text-xl font-bold text-zinc-200 uppercase tracking-widest">
        por <span className="text-yellow-500 font-black">GRÁTIS</span>
      </p>
    </div>
  </div>
);

const TestimonialCard = ({ name, role, text, photo }: { name: string; role: string; text: string; photo: string }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl relative h-full flex flex-col">
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)}
    </div>
    <p className="text-zinc-300 text-base mb-8 italic leading-relaxed flex-1">"{text}"</p>
    <div className="flex items-center gap-4 border-t border-zinc-800 pt-6">
      <img src={photo} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-red-600/30" width={48} height={48} loading="lazy" />
      <div>
        <h4 className="text-white font-bold text-base">{name}</h4>
        <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">{role}</p>
      </div>
    </div>
  </div>
);

const AccordionItem = ({ title, content, isOpen, onClick, variant = "subject" }: { title: string; content: string; isOpen: boolean; onClick: () => void; variant?: string }) => (
  <div className={`mb-3 overflow-hidden border border-zinc-800 rounded-2xl transition-all ${variant === 'faq' ? 'bg-zinc-900/50' : 'bg-zinc-900/30'}`}>
    <button 
      onClick={onClick}
      className="flex items-center justify-between w-full p-6 text-left transition-colors hover:bg-zinc-900/50"
    >
      <div className="flex items-center gap-4">
        {variant === 'subject' ? <Book className="text-red-600" size={22} /> : <HelpCircle className="text-red-600" size={22} />}
        <span className="text-base md:text-lg font-bold text-zinc-100 tracking-tight">{title}</span>
      </div>
      {isOpen ? <ChevronUp className="text-zinc-600" /> : <ChevronDown className="text-zinc-600" />}
    </button>
    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[600px] border-t border-zinc-800 p-6 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
      <p className="text-zinc-400 text-sm md:text-base leading-relaxed whitespace-pre-line">
        {content}
      </p>
    </div>
  </div>
);

// --- Componente Principal ---

const Index = () => {
  const [timeLeft, setTimeLeft] = useState(3600);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openSubject, setOpenSubject] = useState(0);
  const [openFaq, setOpenFaq] = useState(-1);
  
  const CHECKOUT_URL = "https://pay.kirvano.com/d2cd80eb-7fca-4fc1-8513-2232d2f34e98";
  
  const materialImages = [
    "/images/material-1.png",
    "/images/material-2.png",
    "/images/material-3.png",
    "/images/material-4.png"
  ];

  const subjects = [
    { title: "Língua Portuguesa", content: "Compreensão e interpretação de textos; Tipologia textual; Ortografia oficial; Acentuação gráfica; Emprego das classes de palavras; Emprego do sinal indicativo de crase; Sintaxe da oração e do período; Pontuação; Concordância nominal e verbal; Regência nominal e verbal; Significação das palavras; Redação de correspondências oficiais." },
    { title: "Direito Penal", content: "Aplicação da lei penal; Crime; Imputabilidade penal; Concurso de pessoas; Penas; Crimes contra a administração pública; Crimes contra a fé pública; Crimes praticados por funcionário público contra a administração." },
    { title: "Direito Civil", content: "Lei de Introdução às Normas do Direito Brasileiro; Pessoas naturais e jurídicas; Domicílio; Bens; Fatos e atos jurídicos; Negócio jurídico; Prescrição e decadência; Obrigações; Responsabilidade civil." },
    { title: "Direito Constitucional", content: "Princípios fundamentais; Direitos e garantias fundamentais; Organização do Estado; Administração pública; Poder Judiciário; Funções essenciais à justiça." },
    { title: "Direito Administrativo", content: "Administração pública; Atos administrativos; Poderes administrativos; Serviços públicos; Licitações e contratos administrativos; Responsabilidade civil do Estado; Agentes públicos." },
    { title: "Informática", content: "Noções de sistema operacional (Windows); Pacote Office (Word e Excel); Internet e navegação; Correio eletrônico; Segurança da informação." },
    { title: "Matemática", content: "Operações fundamentais; Razão e proporção; Regra de três; Porcentagem; Juros simples; Equações do 1º grau; Problemas matemáticos aplicados." },
    { title: "Raciocínio Lógico", content: "Estruturas lógicas; Proposições; Conectivos; Tabelas-verdade; Equivalências; Argumentação lógica; Sequências lógicas; Problemas de raciocínio." }
  ];

  const faqs = [
    { title: "Quando sai o edital?", content: "Não tem uma data ainda. Justamente por isso você precisa começar o quanto antes. Quando o edital sai, o prazo até a prova costuma ser curto. Quem já começou antes sai na frente e estuda apenas revisando." },
    { title: "O material é atualizado?", content: "Sim. O material é baseado no último edital do TJSP e estruturado de acordo com o que realmente é cobrado na prova, focando no que mais cai." },
    { title: "Esse material serve para iniciantes?", content: "Sim. O conteúdo é organizado de forma simples e progressiva, ideal tanto para quem está começando do zero quanto para quem já estuda e precisa de mais organização." },
    { title: "É material físico ou digital?", content: "O material é 100% digital. Você recebe acesso a um drive completo com todos os conteúdos organizados, podendo estudar pelo celular, tablet ou computador." },
    { title: "Como recebo o acesso?", content: "Assim que o pagamento for confirmado, você recebe o acesso imediatamente no seu e-mail. É só entrar no drive e começar a estudar." },
    { title: "Por quanto tempo tenho acesso?", content: "O acesso é vitalício para você estudar com tranquilidade, sem precisar se preocupar com prazo curto." }
  ];

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

  const nextSlide = () => setCurrentSlide((prev) => (prev === materialImages.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? materialImages.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      
      {/* Faixa de Urgência */}
      <div className="bg-yellow-400 text-black py-2.5 text-center text-xs md:text-sm font-black flex items-center justify-center gap-2 sticky top-0 z-50 shadow-xl">
        <Clock size={16} />
        OFERTA POR TEMPO LIMITADO: O PREÇO SOBE EM {formatTime(timeLeft)}
      </div>

      {/* Hero Section */}
      <header className="relative pt-12 pb-24 px-4 min-h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-bg.jpg" alt="Fundo TJSP" className="w-full h-full object-cover opacity-40 grayscale-[20%] brightness-[0.3]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-block px-5 py-1.5 bg-red-600 text-white text-[10px] md:text-xs font-black mb-8 uppercase tracking-[0.2em] rounded-full shadow-2xl">
            Concurso Escrevente TJSP 2026
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-8 text-white drop-shadow-2xl max-w-4xl text-center tracking-tighter">
            A forma mais simples e direta de estudar e sair na frente no <span className="text-red-600">Concurso de Escrevente do TJSP</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-300 mb-12 max-w-3xl mx-auto font-medium leading-relaxed opacity-90">
            Tenha acesso a um drive completo com todo o material que você precisa para o TJSP 2026, organizado de forma estratégica, direto ao ponto e pronto para você começar hoje mesmo.
          </p>

          <div className="w-full max-w-4xl mb-12 transform hover:scale-[1.01] transition-transform duration-700">
            <img 
              src="/images/drive-mockup.png" 
              alt="Mockup do Drive TJSP" 
              className="w-full h-auto drop-shadow-[0_20px_60px_rgba(220,38,38,0.3)]"
            />
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col items-center">
              <span className="text-zinc-400 uppercase text-[10px] font-black tracking-[0.2em] mb-3">Acesso imediato por apenas</span>
              <div className="text-6xl md:text-7xl font-black text-yellow-400 tracking-tighter leading-none mb-3">R$ 47,00</div>
              <span className="text-zinc-500 text-sm font-bold tracking-wide text-center">Pagamento único, sem mensalidades</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="group relative px-12 py-7 bg-red-600 hover:bg-red-700 text-white rounded-full font-black text-xl md:text-2xl transition-all shadow-[0_20px_50px_rgba(220,38,38,0.4)] flex items-center gap-4 active:scale-95 uppercase tracking-tighter"
            >
              👉 QUERO COMEÇAR AGORA
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Seção Estratégia */}
      <section className="py-24 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white uppercase italic tracking-tighter opacity-80 max-w-2xl mx-auto leading-snug">
              Você não precisa gastar centenas (ou até milhares) em cursos
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-16">
              A realidade é simples: hoje existem cursos para TJSP que custam R$300, R$500, R$1.000 ou mais… 
              E mesmo assim, muita gente continua perdida, sem saber o que estudar e pulando de conteúdo em conteúdo.
            </p>
            
            <div className="flex flex-col items-center mb-24">
                <div className="h-px w-16 bg-red-600/50 mb-8 mx-auto"></div>
                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter text-center max-w-3xl leading-tight">
                   👉 O problema não é falta de material. <br className="hidden md:block" />
                   <span className="text-red-600 font-black italic">É falta de organização e direção.</span>
                </h3>
                <div className="h-px w-16 bg-red-600/50 mt-8 mx-auto"></div>
            </div>
          </div>

          <div className="mb-24">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tighter leading-tight mb-4">
                Por que a maioria dos candidatos não é aprovada no TJSP?
              </h3>
              <p className="text-zinc-500 text-lg font-medium text-center">Porque comete erros que parecem simples… mas que custam a aprovação:</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Só teoria não fixa", desc: "Estudar apenas lendo apostilas cria uma falsa sensação de preparo. Na hora da prova a memória falha." },
                  { title: "Falta de treino", desc: "Sem praticar com questões padrão Vunesp, você não entende como a banca cobra os temas." },
                  { title: "Sem simulados", desc: "Chegar na prova sem treinar tempo gera insegurança, nervosismos e má gestão das horas." }
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-[2rem] hover:border-red-900/50 transition-all flex flex-col items-center text-center group h-full">
                    <div className="text-red-600 mb-5 group-hover:scale-110 transition-transform flex justify-center"><XCircle size={24} /></div>
                    <h5 className="text-white font-black mb-3 text-sm uppercase tracking-widest">{item.title}</h5>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-zinc-900 to-black p-10 md:p-16 rounded-[3rem] border border-zinc-800 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-red-600/5 blur-[100px] rounded-full"></div>
            <div className="relative z-10">
              
              <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-8 leading-tight">
                O <span className="text-red-600">Plano de Aprovação</span> resolve tudo isso
              </h3>
              
              <div className="mb-12">
                <p className="text-zinc-300 text-lg leading-relaxed mb-8 font-medium text-center">
                  Apostilas completas por matéria + cronograma pronto + +3000 questões + simulados + mapas mentais + estrutura de redação.
                </p>
                <p className="text-white font-bold text-lg italic border-t border-red-600/30 pt-10 inline-block px-4 text-center">
                  Tudo integrado em um único drive, para você fixar o conteúdo, treinar da forma certa e chegar na prova com confiança.
                </p>
              </div>

              <div className="h-px bg-zinc-800 w-full mb-12 opacity-50"></div>

              <div className="flex flex-col items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-yellow-500 font-black uppercase tracking-[0.2em] text-[10px]">
                  <Timer size={16} /> Atenção concurseiro
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white leading-tight uppercase italic tracking-tighter max-w-2xl mx-auto text-center">
                  Enquanto isso, o tempo está passando e quem começa antes sai na frente
                </h3>
              </div>
              
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto mb-4 text-center">
                Quando o edital sair, quem já estudou de forma organizada estará apenas revisando… enquanto outros ainda estarão tentando entender por onde começar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Entregáveis */}
      <section className="py-24 px-4 bg-black border-t border-zinc-900" id="conteudo">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white uppercase tracking-tighter text-center">
              <Package className="text-red-600 inline mr-3" /> O QUE VOCÊ VAI RECEBER
            </h2>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-sm text-center">Tudo organizado em um único drive focado no concurso 2026.</p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={FileText} title="Apostilas completas" description="Conteúdo separado por matéria, direto ao ponto e focado no concurso 2026." />
            <FeatureCard icon={Calendar} title="Cronograma" description="Plano de estudo pronto para seguir. Você não precisa pensar, apenas executar." />
            <FeatureCard icon={Brain} title="Mapas Mentais" description="Resumos visuais que aceleram a memorização dos temas mais complexos." />
            <FeatureCard icon={Target} title="+3.000 Questões" description="Treine com questões reais da banca e domine a lógica da prova na prática." />
            <FeatureCard icon={Layout} title="Simulados Completos" description="Teste seu desempenho e prepare seu psicológico para o dia da prova." />
            <FeatureCard icon={BookOpen} title="Estrutura de Redação" description="Modelos prontos para você não travar e garantir uma excelente pontuação." />
          </div>
        </div>
      </section>

      {/* SEÇÃO: O QUE VOCÊ VAI DOMINAR */}
      <section className="py-24 px-4 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 text-center">
              O QUE VOCÊ VAI <span className="text-red-600">DOMINAR</span>
            </h2>
            <p className="text-zinc-500 font-black uppercase tracking-[0.25em] text-xs mb-6 text-center">
              (Baseado no Edital)
            </p>
            <p className="text-zinc-300 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed text-center">
              Conteúdo 100% focado para o cargo de Escrevente no TJSP.
            </p>
          </div>

          <div className="space-y-3">
            {subjects.map((subject, index) => (
              <AccordionItem key={index} title={subject.title} content={subject.content} isOpen={openSubject === index} onClick={() => setOpenSubject(openSubject === index ? -1 : index)} />
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO CARROSSEL */}
      <section className="py-24 px-4 bg-black border-t border-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 text-center">
              VEJA NOSSO MATERIAL
            </h2>
            <p className="text-red-600 font-black text-lg md:text-2xl uppercase tracking-[0.15em] italic text-center">
              Qualidade visual e didática impecável.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto flex items-center justify-center gap-3 md:gap-12">
            <button onClick={prevSlide} className="flex-shrink-0 w-12 h-12 md:w-20 md:h-20 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 z-20"><ChevronLeft size={44} strokeWidth={3} /></button>

            <div className="relative flex-1 bg-zinc-900/30 border border-zinc-800 rounded-[3rem] md:rounded-[4rem] shadow-[0_0_80px_rgba(0,0,0,1)] overflow-hidden py-16 md:py-24 px-6 md:px-20 flex items-center justify-center min-h-[600px] md:min-h-[900px]">
              <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 to-transparent pointer-events-none"></div>
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img src={materialImages[currentSlide]} alt={`Preview ${currentSlide + 1}`} className="max-h-[500px] md:max-h-[800px] w-auto h-auto object-contain shadow-[0_40px_100px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-700 rounded-sm border border-white/5" />
              </div>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
                {materialImages.map((_, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)} className={`w-3 h-3 rounded-full transition-all duration-500 ${currentSlide === i ? 'bg-red-600 w-12' : 'bg-zinc-800 hover:bg-zinc-700'}`} />
                ))}
              </div>
            </div>

            <button onClick={nextSlide} className="flex-shrink-0 w-12 h-12 md:w-20 md:h-20 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 z-20"><ChevronRight size={44} strokeWidth={3} /></button>
          </div>
          
          <div className="mt-20 text-center">
            <button onClick={handleCheckout} className="px-14 py-8 bg-red-600 hover:bg-red-700 text-white rounded-full font-black text-xl md:text-2xl transition-all shadow-[0_20px_50px_rgba(220,38,38,0.5)] active:scale-95 uppercase tracking-tighter">
              🚀 QUERO ACESSO A ESSE MATERIAL
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO BÔNUS */}
      <section className="py-24 px-4 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 text-center">
              BÔNUS PARA ACELERAR SUA <span className="text-yellow-500">POSSE</span>
            </h2>
            <p className="text-zinc-500 font-black uppercase tracking-[0.3em] text-xs text-center">Inclusos no Material Gratuitamente.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <BonusCard title="Edital Verticalizado TJSP" oldPrice="29,90" />
            <BonusCard title="Caderno Questões Vunesp" oldPrice="49,90" />
            <BonusCard title="Vade Mecum TJSP" description="Direcionado apenas ao que realmente cai na prova, sem excessos jurídicos desnecessários." oldPrice="37,00" />
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-32 px-4 bg-black border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white uppercase tracking-tighter italic text-center">💬 QUEM JÁ ESTÁ À FRENTE</h2>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm text-center">Resultados reais de alunos do TJSP.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard name="Camila Rodrigues" role="Aprovada TJSP" text="O cronograma me deu a direção que faltava. Estava muito perdida e agora sinto que domino o edital." />
            <TestimonialCard name="Rafael Souza" role="Aluno TJSP 2026" text="Este drive é cirúrgico. Sem enrolação, material direto e muito bem organizado. Vale cada centavo." />
            <TestimonialCard name="Juliana Mendes" role="Aprovada TJSP" text="Mapas mentais nota 10! Facilitou muito a minha revisão final. Recomendo para quem quer passar logo." />
          </div>
        </div>
      </section>

      {/* Oferta Final */}
      <section className="py-32 px-4 border-t border-zinc-900 bg-zinc-950" id="oferta">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-zinc-900 border border-zinc-800 rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <div className="p-10 md:p-20 text-left space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic mb-12 tracking-tighter text-center">SEU INVESTIMENTO HOJE</h2>
              {[["Apostilas Completas", "R$ 150+"], ["Banco de Questões", "R$ 120+"], ["Simulados + Mapas Mentais", "R$ 90+"], ["Estrutura de Redação", "R$ 80+"], ["Cronograma Estratégico", "R$ 60+"]].map(([name, price], i) => (
                <div key={i} className="flex justify-between text-zinc-400 border-b border-zinc-800/50 pb-3 text-base md:text-lg font-medium">
                  <span>{name}</span>
                  <span className="text-white font-bold tracking-tight">{price}</span>
                </div>
              ))}
              <div className="flex justify-between text-2xl font-black text-zinc-500 pt-6">
                <span>VALOR TOTAL REAL</span>
                <span className="line-through text-red-600">R$ 500+</span>
              </div>
            </div>

            <div className="bg-red-600 p-12 md:p-16">
              <p className="text-white uppercase font-black tracking-[0.3em] mb-4 text-[10px] text-center">OFERTA DE LANÇAMENTO 2026</p>
              <div className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none text-center">R$ 47,00</div>
              <p className="text-red-100 font-bold text-xl mb-12 italic opacity-90 text-center">Acesso Imediato. Sem Recorrência.</p>

              <button onClick={handleCheckout} className="w-full py-8 bg-white text-red-600 rounded-full font-black text-2xl md:text-3xl hover:bg-zinc-100 transition-all shadow-2xl active:scale-95 uppercase tracking-tighter">
                🚀 QUERO MEU MATERIAL AGORA
              </button>
              <p className="mt-8 text-xs text-red-200 font-bold tracking-widest uppercase opacity-75 text-center">⚠️ PREÇO PROMOCIONAL POR TEMPO LIMITADO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section className="py-24 px-4 bg-black border-t border-zinc-900">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 p-12 md:p-20 bg-zinc-900/50 rounded-[4rem] border border-zinc-800 shadow-2xl">
          <div className="relative shrink-0 flex justify-center mx-auto md:mx-0">
            <div className="w-48 h-48 border-[12px] border-yellow-500 rounded-full flex flex-col items-center justify-center text-yellow-500 font-black text-6xl shadow-[0_0_50px_rgba(234,179,8,0.2)]">
              7<span className="text-sm uppercase tracking-widest mt-1 text-center">Dias</span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-4xl font-black mb-6 text-white uppercase tracking-tighter italic text-center md:text-left">🔒 SUA SATISFAÇÃO OU SEU DINHEIRO DE VOLTA</h3>
            <p className="text-zinc-400 leading-relaxed text-lg md:text-xl font-medium text-center md:text-left">
              Oferecemos uma garantia total de 7 dias. Se você não ficar satisfeito com a organização ou qualidade do material, devolvemos 100% do seu investimento sem burocracia. O risco é todo meu.
            </p>
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO: DÚVIDAS FREQUENTES */}
      <section className="py-32 px-4 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 text-center">
              DÚVIDAS <span className="text-red-600">FREQUENTES</span>
            </h2>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm text-center">
              Tudo o que você precisa saber antes de começar.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index}
                title={faq.title}
                content={faq.content}
                isOpen={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                variant="faq"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-zinc-900 text-center text-zinc-600 text-[10px] px-4 bg-black">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <img src="/images/logo-tjsp.png" alt="Logo" className="h-24 md:h-36 w-auto mb-12 drop-shadow-xl brightness-90 grayscale-[30%]" />
          <p className="mb-6 font-black tracking-[0.3em] uppercase text-zinc-500">© 2026 - PLANO DE APROVAÇÃO ESCREVENTE TJSP</p>
          <p className="max-w-2xl mx-auto leading-relaxed opacity-60 text-pretty font-medium uppercase text-center">
            Este material é um guia independente focado na preparação para o concurso. Não possuímos vínculo oficial com o Tribunal de Justiça de São Paulo. Seu sucesso depende da sua dedicação.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
