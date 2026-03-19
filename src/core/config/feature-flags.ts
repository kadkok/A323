import { env } from '@/shared/utils/env';
import type { ModuleKey, ModuleManifest } from '@/shared/types/module';

const moduleDefinitions: Record<ModuleKey, Omit<ModuleManifest, 'enabled'>> = {
  core: {
    key: 'core',
    name: 'Core',
    description: 'Autenticação, navegação, auditoria e infraestrutura base.',
    dependencies: [],
    requiredRoles: ['admin'],
    maintenanceMessage: 'O núcleo não pode ser desligado.',
  },
  students: {
    key: 'students',
    name: 'Students',
    description: 'Gestão de alunos e dados acadêmicos básicos.',
    dependencies: ['core'],
    requiredRoles: ['admin', 'secretaria', 'coordenador-geral', 'coordenador-pedagogico'],
    maintenanceMessage: 'O módulo de alunos está temporariamente indisponível.',
  },
  guardians: {
    key: 'guardians',
    name: 'Guardians',
    description: 'Gestão de responsáveis e vínculos com alunos.',
    dependencies: ['core', 'students'],
    requiredRoles: ['admin', 'secretaria'],
    maintenanceMessage: 'O módulo de responsáveis está em manutenção.',
  },
  classes: {
    key: 'classes',
    name: 'Classes',
    description: 'Turmas e alocação institucional.',
    dependencies: ['core'],
    requiredRoles: ['admin', 'secretaria', 'coordenador-geral', 'coordenador-pedagogico', 'instrutor'],
    maintenanceMessage: 'O módulo de turmas está em manutenção.',
  },
  enrollments: {
    key: 'enrollments',
    name: 'Enrollments',
    description: 'Matrículas e vínculo aluno/turma.',
    dependencies: ['core', 'students', 'classes'],
    requiredRoles: ['admin', 'secretaria'],
    maintenanceMessage: 'O módulo de matrículas está em manutenção.',
  },
  attendance: {
    key: 'attendance',
    name: 'Attendance',
    description: 'Registro de frequência e ocorrências.',
    dependencies: ['core', 'students', 'classes', 'enrollments'],
    requiredRoles: ['admin', 'secretaria', 'instrutor'],
    maintenanceMessage: 'O módulo de frequência está em manutenção.',
  },
  contents: {
    key: 'contents',
    name: 'Contents',
    description: 'Conteúdos pedagógicos.',
    dependencies: ['core', 'classes'],
    requiredRoles: ['admin', 'instrutor', 'coordenador-pedagogico'],
    maintenanceMessage: 'O módulo de conteúdos está em manutenção.',
  },
  lessonPlans: {
    key: 'lessonPlans',
    name: 'Lesson plans',
    description: 'Planos de aula.',
    dependencies: ['core', 'classes', 'contents'],
    requiredRoles: ['admin', 'instrutor', 'coordenador-pedagogico'],
    maintenanceMessage: 'O módulo de planos de aula está em manutenção.',
  },
  evaluations: {
    key: 'evaluations',
    name: 'Evaluations',
    description: 'Avaliações e resultados.',
    dependencies: ['core', 'classes'],
    requiredRoles: ['admin', 'instrutor', 'coordenador-pedagogico'],
    maintenanceMessage: 'O módulo de avaliações está em manutenção.',
  },
  events: {
    key: 'events',
    name: 'Events',
    description: 'Agenda institucional e eventos.',
    dependencies: ['core'],
    requiredRoles: ['admin', 'secretaria', 'coordenador-geral'],
    maintenanceMessage: 'O módulo de eventos está em manutenção.',
  },
  messaging: {
    key: 'messaging',
    name: 'Messaging',
    description: 'Mensageria interna.',
    dependencies: ['core'],
    requiredRoles: ['admin', 'secretaria', 'coordenador-geral', 'coordenador-pedagogico', 'instrutor', 'psicologo', 'aluno', 'responsavel'],
    maintenanceMessage: 'O módulo de mensagens está em manutenção.',
  },
  reports: {
    key: 'reports',
    name: 'Reports',
    description: 'Relatórios operacionais.',
    dependencies: ['core', 'attendance'],
    requiredRoles: ['admin', 'secretaria', 'coordenador-geral', 'coordenador-pedagogico'],
    maintenanceMessage: 'O módulo de relatórios está em manutenção.',
  },
  media: {
    key: 'media',
    name: 'Media',
    description: 'Biblioteca de arquivos e mídia.',
    dependencies: ['core'],
    requiredRoles: ['admin', 'secretaria'],
    maintenanceMessage: 'O módulo de mídia está em manutenção.',
  },
  psychology: {
    key: 'psychology',
    name: 'Psychology',
    description: 'Registros e atendimentos psicológicos sensíveis.',
    dependencies: ['core', 'students', 'privacy'],
    requiredRoles: ['admin', 'psicologo'],
    maintenanceMessage: 'O módulo de psicologia está isolado para manutenção.',
  },
  privacy: {
    key: 'privacy',
    name: 'Privacy',
    description: 'LGPD, retenção e direitos do titular.',
    dependencies: ['core'],
    requiredRoles: ['admin'],
    maintenanceMessage: 'O módulo de privacidade está em manutenção.',
  },
};

const enabledFlags: Record<Exclude<ModuleKey, 'core'>, boolean> = {
  students: env.MODULE_STUDENTS,
  guardians: env.MODULE_GUARDIANS,
  classes: env.MODULE_CLASSES,
  enrollments: env.MODULE_ENROLLMENTS,
  attendance: env.MODULE_ATTENDANCE,
  contents: env.MODULE_CONTENTS,
  lessonPlans: env.MODULE_LESSON_PLANS,
  evaluations: env.MODULE_EVALUATIONS,
  events: env.MODULE_EVENTS,
  messaging: env.MODULE_MESSAGING,
  reports: env.MODULE_REPORTS,
  media: env.MODULE_MEDIA,
  psychology: env.MODULE_PSYCHOLOGY,
  privacy: env.MODULE_PRIVACY,
};

export function getModuleManifest(moduleKey: ModuleKey): ModuleManifest {
  const definition = moduleDefinitions[moduleKey];

  if (moduleKey === 'core') {
    return { ...definition, enabled: true };
  }

  return {
    ...definition,
    enabled: enabledFlags[moduleKey],
  };
}

export function isModuleEnabled(moduleKey: ModuleKey): boolean {
  return getModuleManifest(moduleKey).enabled;
}

export function listModuleManifests(): ModuleManifest[] {
  return (Object.keys(moduleDefinitions) as ModuleKey[]).map(getModuleManifest);
}
