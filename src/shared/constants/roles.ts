export const systemRoles = [
  'admin',
  'secretaria',
  'coordenador-geral',
  'coordenador-pedagogico',
  'instrutor',
  'psicologo',
  'aluno',
  'responsavel',
] as const;

export type SystemRole = (typeof systemRoles)[number];
