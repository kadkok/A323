export const publicNavigation = [
  { href: '/', label: 'Home' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/atividades', label: 'Atividades' },
  { href: '/metodologia', label: 'Metodologia' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/blog', label: 'Blog' },
  { href: '/galeria', label: 'Galeria' },
  { href: '/contato', label: 'Contato' },
  { href: '/faq', label: 'FAQ' },
  { href: '/privacidade', label: 'Privacidade' },
  { href: '/termos', label: 'Termos' },
  { href: '/acesso', label: 'Acesso' },
] as const;

export const portalNavigation = [
  { href: '/portal', label: 'Dashboard', moduleKey: 'core' },
  { href: '/portal/alunos', label: 'Alunos', moduleKey: 'students' },
  { href: '/portal/responsaveis', label: 'Responsáveis', moduleKey: 'guardians' },
  { href: '/portal/turmas', label: 'Turmas', moduleKey: 'classes' },
  { href: '/portal/matriculas', label: 'Matrículas', moduleKey: 'enrollments' },
  { href: '/portal/frequencia', label: 'Frequência', moduleKey: 'attendance' },
  { href: '/portal/privacidade', label: 'Privacidade', moduleKey: 'privacy' },
] as const;
