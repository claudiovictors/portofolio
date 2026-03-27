import { 
  Github, 
  Linkedin, 
  Instagram, 
  MessageCircle, 
  Code2, 
  Database, 
  Terminal, 
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Monitor,
  Server,
  Layout,
  Cpu,
  ArrowUp,
  Smartphone,
  FileCode
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'sobre', 'tecnologias', 'projetos', 'contato'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sobre', href: '#sobre', id: 'sobre' },
    { name: 'Tecnologias', href: '#tecnologias', id: 'tecnologias' },
    { name: 'Projetos', href: '#projetos', id: 'projetos' },
    { name: 'Contato', href: '#contato', id: 'contato' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-gh-bg/90 backdrop-blur-xl border-b border-gh-border py-4' : 'bg-transparent py-8'}`}>
      <nav className="container-custom flex justify-between items-center">
        <motion.a 
          href="#home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold tracking-tighter text-gh-blue"
        >
          CV<span className="text-gh-text">.dev</span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.name}
            </a>
          ))}
          <a 
            href="https://wa.me/244931474092"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary py-2 px-6 text-sm"
          >
            Contratar
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gh-text p-2 hover:bg-gh-card rounded-md transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-gh-card border-b border-gh-border shadow-2xl"
          >
            <div className="container-custom py-8 flex flex-col gap-6">
              {navLinks.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className={`nav-link text-xl py-2 ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="https://wa.me/244931474092"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full mt-4 py-4"
                onClick={() => setIsOpen(false)}
              >
                Contratar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const TypingText = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return (
    <span className="text-gh-blue min-h-[1.2em] inline-block">
      {texts[index].substring(0, subIndex)}
      <span className="animate-pulse ml-1">|</span>
    </span>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-32 pb-20 hero-gradient relative">
      <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gh-blue/10 border border-gh-blue/20 text-gh-blue text-[12px] font-bold mb-8 uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gh-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gh-blue"></span>
            </span>
            Disponível para novos projetos
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Backend Developer <br />
            <TypingText texts={['PHP & Golang', 'Performance', 'Arquitetura']} />
          </h1>
          
          <p className="text-gh-text-muted text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed">
            Sou Cláudio Victor, desenvolvedor fullstack com foco em backend, criando sistemas robustos, APIs seguras e arquiteturas escaláveis desde 2020.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5">
            <a href="#projetos" className="btn-primary gap-3 min-w-[180px]">
              Ver Projetos <ChevronRight size={20} />
            </a>
            <a href="#contato" className="btn-secondary min-w-[180px]">
              Entrar em Contato
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative order-1 lg:order-2"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-gh-border aspect-square max-w-[320px] md:max-w-md mx-auto lg:ml-auto shadow-2xl">
            <img 
              src="/avatar.png" 
              alt="Cláudio Victor" 
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-gh-blue/10 rounded-3xl -z-10 max-w-[320px] md:max-w-md mx-auto lg:ml-auto hidden sm:block" />
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-gh-blue/5 rounded-full blur-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: 'Anos de Experiência', value: '4+' },
    { label: 'Projetos Entregues', value: '25+' },
    { label: 'Linguagens', value: '6+' },
    { label: 'Foco Backend', value: '100%' },
  ];

  return (
    <section className="py-20 border-y border-gh-border bg-gh-card/10">
      <div className="container-custom grid grid-cols-2 lg:grid-cols-4 gap-12">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-bold text-gh-blue mb-2">{stat.value}</div>
            <div className="text-xs text-gh-text-muted uppercase tracking-widest font-bold">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  const skills = [
    { name: 'PHP', level: 95 },
    { name: 'Golang', level: 85 },
    { name: 'JavaScript', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'Java', level: 55 },
    { name: 'Flutter', level: 45 },
  ];

  return (
    <section id="sobre" className="py-32">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              <span className="section-number">01.</span> Sobre mim
            </h2>
            <div className="space-y-8 text-gh-text-muted leading-relaxed text-lg">
              <p>
                Minha paixão por tecnologia começou em 2020. Desde então, foquei em dominar o <span className="text-gh-text font-medium">Backend</span>, onde a lógica e a performance se encontram para sustentar grandes aplicações.
              </p>
              <p>
                Aos 19 anos, busco constantemente a excelência técnica. Especialista em <span className="text-gh-text font-medium">PHP</span> e <span className="text-gh-text font-medium">Golang</span>, desenvolvo soluções que priorizam a escalabilidade e a segurança, sem abrir mão da simplicidade no código.
              </p>
              <p>
                Além do backend, exploro o desenvolvimento mobile com <span className="text-gh-text font-medium">Flutter</span> e automação com <span className="text-gh-text font-medium">Python</span>, mantendo uma visão holística do desenvolvimento de software moderno.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10"
          >
            <h3 className="text-xl font-bold mb-10 flex items-center gap-3">
              <Cpu size={20} className="text-gh-blue" /> Habilidades Técnicas
            </h3>
            <div className="space-y-8">
              {skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-bold text-gh-text">{skill.name}</span>
                    <span className="text-xs font-mono text-gh-blue">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                      className="skill-bar-fill"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Technologies = () => {
  const categories = [
    {
      title: 'Backend',
      icon: <Server size={22} />,
      items: ['PHP', 'Golang', 'Python', 'Java (Básico)']
    },
    {
      title: 'Frontend & Mobile',
      icon: <Smartphone size={22} />,
      items: ['HTML5 / CSS3', 'JavaScript', 'Flutter']
    },
    {
      title: 'Bancos de Dados',
      icon: <Database size={22} />,
      items: ['MySQL', 'PostgreSQL']
    },
    {
      title: 'Sistemas',
      icon: <Monitor size={22} />,
      items: ['Linux', 'Windows']
    }
  ];

  return (
    <section id="tecnologias" className="py-32 bg-gh-card/10">
      <div className="container-custom">
        <h2 className="section-title justify-center">
          <span className="section-number">02.</span> Tecnologias
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 hover:border-gh-blue/40 hover:-translate-y-2 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-gh-blue/5 flex items-center justify-center text-gh-blue mb-8 border border-gh-blue/10 group-hover:bg-gh-blue/10 transition-colors">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold mb-6">{cat.title}</h3>
              <ul className="space-y-4">
                {cat.items.map((item, j) => (
                  <li key={j} className="text-gh-text-muted text-sm flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gh-blue/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'Slenix Framework',
      description: 'Micro-framework PHP de alta performance focado em simplicidade e arquitetura limpa para APIs RESTful.',
      tech: ['PHP', 'MySQL', 'Architecture'],
      github: 'https://github.com/claudiovictors',
      demo: '#'
    },
    {
      title: 'Go Auth Microservice',
      description: 'Serviço de autenticação distribuído em Golang com foco em segurança, JWT e alta disponibilidade.',
      tech: ['Golang', 'PostgreSQL'],
      github: 'https://github.com/claudiovictors',
      demo: '#'
    },
    {
      title: 'E-commerce Engine',
      description: 'Motor de e-commerce robusto com gestão de estoque em tempo real e integração de pagamentos.',
      tech: ['PHP', 'JavaScript', 'MySQL'],
      github: 'https://github.com/claudiovictors',
      demo: '#'
    },
    {
      title: 'CLI System Monitor',
      description: 'Ferramenta de monitoramento de recursos do sistema para Linux escrita inteiramente em Golang.',
      tech: ['Golang', 'Linux API'],
      github: 'https://github.com/claudiovictors',
      demo: '#'
    }
  ];

  return (
    <section id="projetos" className="py-32">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <div>
            <h2 className="section-title mb-4">
              <span className="section-number">03.</span> Projetos Selecionados
            </h2>
            <p className="text-gh-text-muted text-lg max-w-2xl">Uma amostra do meu trabalho em engenharia de backend e sistemas escaláveis.</p>
          </div>
          <a href="https://github.com/claudiovictors" target="_blank" className="btn-secondary text-sm gap-2">
            GitHub <ExternalLink size={16} />
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 group hover:border-gh-blue/30 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 rounded-xl bg-gh-bg border border-gh-border text-gh-blue group-hover:border-gh-blue/40 transition-all">
                  <FileCode size={24} />
                </div>
                <div className="flex gap-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gh-text-muted hover:text-gh-blue transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github size={22} />
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gh-text-muted hover:text-gh-blue transition-colors"
                    aria-label="Live Demo"
                  >
                    <ExternalLink size={22} />
                  </a>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-gh-blue transition-colors">{project.title}</h3>
              <p className="text-gh-text-muted mb-10 leading-relaxed flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {project.tech.map((t, j) => (
                  <span key={j} className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded bg-gh-bg border border-gh-border text-gh-text-muted">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4 pt-4 border-t border-gh-border/50">
                <a href={project.github} className="text-sm font-bold text-gh-blue hover:underline underline-offset-4">Ver código</a>
                <a href={project.demo} className="text-sm font-bold text-gh-text hover:underline underline-offset-4">Ver projeto</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const socials = [
    { icon: <Github size={22} />, label: 'GitHub', url: 'https://github.com/claudiovictors' },
    { icon: <Linkedin size={22} />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/cl%C3%A1udio-victor-710986291/' },
    { icon: <Instagram size={22} />, label: 'Instagram', url: 'https://instagram.com/claudiovicor.dev' },
    { icon: <MessageCircle size={22} />, label: 'WhatsApp', url: 'https://wa.me/244931474092' },
  ];

  return (
    <section id="contato" className="py-32 border-t border-gh-border relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hero-gradient -z-10" />
      <div className="container-custom text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-8">Vamos construir o futuro?</h2>
        <p className="text-gh-text-muted text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
          Estou sempre em busca de novos desafios técnicos. Se você precisa de um backend sólido e performático, vamos conversar.
        </p>
        
        <div className="flex flex-wrap justify-center gap-5 mb-20">
          {socials.map((social, i) => (
            <motion.a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass-card px-8 py-5 flex items-center gap-4 hover:text-gh-blue hover:border-gh-blue/40"
            >
              {social.icon}
              <span className="font-bold tracking-tight">{social.label}</span>
            </motion.a>
          ))}
        </div>
        
        <a 
          href="mailto:claudiodev147@gmail.com" 
          className="text-2xl md:text-4xl font-bold text-gh-blue hover:text-blue-400 transition-all border-b-2 border-transparent hover:border-gh-blue pb-2"
        >
          claudiodev147@gmail.com
        </a>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 border-t border-gh-border bg-gh-bg">
      <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-xl font-bold text-gh-blue">CV.dev</div>
          <div className="text-gh-text-muted text-sm font-medium">
            © {new Date().getFullYear()} Cláudio Victor. Desenvolvido com foco em engenharia.
          </div>
        </div>
        <div className="flex gap-8">
          <a href="https://github.com/claudiovictors" target="_blank" className="text-gh-text-muted hover:text-gh-blue transition-all" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/cl%C3%A1udio-victor-710986291/" target="_blank" className="text-gh-text-muted hover:text-gh-blue transition-all" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="https://instagram.com/claudiovicor.dev" target="_blank" className="text-gh-text-muted hover:text-gh-blue transition-all" aria-label="Instagram">
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gh-blue text-gh-bg rounded-full flex items-center justify-center shadow-xl hover:bg-blue-400 transition-colors active:scale-90"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-gh-bg min-h-screen">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gh-blue z-[60] origin-left" style={{ scaleX }} />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Technologies />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
