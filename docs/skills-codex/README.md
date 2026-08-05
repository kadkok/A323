# Codex de Personas

As 32 skills instaladas no Claude Code, cada uma como um personagem — para lembrar
**quem chamar** em vez de qual slug digitar.

- `codex.html` — versão navegável com busca por situação. Abra no navegador.
- `prompts-cards.md` — prompts de imagem dos 18 cards que ainda faltam.

O campo mais útil de cada verbete é **não faz**: é ali que a escolha costuma errar.

## Guildas

Agrupadas por tipo de entregável, que é o que se reconhece na hora:

| Guilda | Critério |
| --- | --- |
| Ateliê | o entregável é visual |
| Oficina | o entregável é software |
| Escrivaninha | o entregável é um documento |
| Torre | o que muda é o Claude Code em si |

---

## Ateliê — o entregável é visual

| Persona | Skill | Chame quando | Não faz |
| --- | --- | --- | --- |
| **Gênese**, o Mestre do Traço | `genese-art-master` | O produto final é a imagem — ilustração, hero, ícone, cena 3D, cartaz, identidade | Não diagrama documento. PDF/pôster é Solano; slide é Palco |
| **Solano**, o Compositor | `canvas-design` | Peça estática pra imprimir ou exibir — saída `.png` ou `.pdf` | Não faz web e não anima |
| **Íris**, a Semeadora | `algorithmic-art` | A arte nasce de uma regra — flow field, fractal, partículas | Não é ilustração figurativa nem gráfico de dados |
| **Vex**, a Caldeireira | `theme-factory` | O artefato já existe mas está sem cara | Não constrói o artefato — veste o que o Kai levantou |
| **Nova**, a Guardiã | `brand-guidelines` | Precisa parecer oficial (cores e tipografia Anthropic) | Não é a identidade A323 — essa é do Gênese |
| **Pip**, o Hype | `slack-gif-creator` | GIF animado pro Slack | Não é vídeo nem animação longa |
| **Cifra**, a Cartógrafa de Dados | `dataviz` | Qualquer gráfico — **antes** da primeira linha de código do chart | Não é maquiagem em gráfico pronto |

> Bordões — Gênese: *"Antes do pixel, o traço."* · Solano: *"Bom design é pensamento
> claro tornado visível."* · Íris: *"A beleza emerge da regra."* · Vex: *"Você escolhe
> o clima. Eu forjo a paleta."* · Nova: *"Consistência é confiança."* · Pip: *"Frames —
> mas engraçado."* · Cifra: *"Cor é dado. Não desperdice."*

## Oficina — o entregável é software

| Persona | Skill | Chame quando | Não faz |
| --- | --- | --- | --- |
| **Kai**, o Arquiteto de Vidro | `web-artifacts-builder` | Artifact com estado, rotas e vários componentes | Não use pra HTML/JSX de arquivo único |
| **Roan**, o Encanador de Protocolos | `mcp-builder` | Expor uma API externa ao Claude como ferramenta | Não é consumir API dentro do seu app |
| **Fabro**, o Forjador de Personas | `skill-creator` | Falta alguém no elenco — ou o gatilho de uma skill não pega | Meta-persona: resolve a falta de quem resolva |
| **Vigil e a Matilha** | `multi-agent-qa-sweep` | "Testa tudo", "preciso entregar em X horas", "valida todos os papéis" | Artilharia pesada — bug único não precisa de enxame |
| **Ás**, o Urbanista ⚠️ | `pro-kadmus-arquitetura-autonoma-as323` | Arquitetura autônoma AS323 | **Não instalada** — tem card, mas não aparece no `ListSkills` |
| **O Piloto de Prova** | `/run` | Provar que funciona no app de verdade | Não substitui suíte de teste |
| **O Podador** | `/simplify` | O diff funciona mas está inchado | **Não caça bug** — isso é `/code-review` |
| **A Sentinela** | `/security-review` | Antes de abrir o PR, varrer a branch | Não audita o repo inteiro, só o que mudou |
| **O Auditor** | `/review` | Revisar um PR do GitHub | Diff local ainda não enviado é `/code-review` |
| **O Cartógrafo** | `/init` | Repo novo, Claude não conhece o terreno | Roda uma vez; depois edita-se à mão |
| **O Bibliotecário** | `claude-api` | Modelo, preço, limite, cache, tool use, SDK | Nunca responda essas coisas de memória |

> Bordões — Kai: *"Se tem estado, é obra minha."* · Roan: *"Toda ferramenta precisa de
> um cabo."* · Fabro: *"Não adicione recursos. Crie alavanca."* · Vigil: *"Edge case
> deixa de ser edge quando quebra."* · Piloto: *"Teste verde não é app funcionando."* ·
> Podador: *"O que sobra atrapalha."* · Sentinela: *"O que você não olhou é o que
> vaza."* · Auditor: *"Ninguém revisa o próprio texto."* · Cartógrafo: *"Todo repo
> merece um mapa."* · Bibliotecário: *"Consulte antes de afirmar."*

## Escrivaninha — o entregável é um documento

Quatro cuidam do **formato**; dois cuidam do **que está escrito**.

| Persona | Skill | Chame quando | Não faz |
| --- | --- | --- | --- |
| **Vellum**, o Escrivão | `docx` | Word — relatório, memorando, carta, template, timbre | Não é PDF nem planilha |
| **Palco**, o Apresentador | `pptx` | Slides — deck, pitch; inclusive só pra extrair o texto | Não é documento corrido |
| **Ábaco**, o Guarda-livros | `xlsx` | Planilha — inclusive "limpa essa tabela bagunçada" | Se a saída final é Word/HTML/script, o dado é só insumo |
| **Selo**, o Arquivista | `pdf` | Juntar, dividir, marca d'água, formulário, OCR | Não desenha a peça — fecha o envelope |
| **Mira**, a Coautora | `doc-coauthoring` | Escrever spec, proposta ou doc de decisão iterando junto | É processo, não formato |
| **Téo**, o Porta-voz | `internal-comms` | Status report, update de liderança, FAQ, incidente | Não é texto pra cliente ou público externo |

> A distinção que mais importa: **Mira decide o que dizer; Vellum decide em que arquivo
> sai.**
>
> Bordões — Vellum: *"Timbre, sumário, e a margem certa."* · Palco: *"Um slide, uma
> ideia."* · Ábaco: *"A célula não mente."* · Selo: *"Fechado, assinado, arquivado."* ·
> Mira: *"Escrever bem é reescrever."* · Téo: *"Clareza é gentileza."*

## Torre — o que muda é o Claude Code em si

| Persona | Skill | Chame quando | Não faz |
| --- | --- | --- | --- |
| **Aurora**, a Sineira | `/morning` | Você pediu o briefing matinal, com essas palavras | Pergunta sobre a agenda **não** é pedido de briefing |
| **O Metrônomo** | `/loop` | Rodar algo de tempos em tempos | Tarefa única não entra em loop |
| **O Chaveiro** | `update-config` | "De agora em diante, sempre que X…", permissões, hooks | Memória e preferência não fazem isso |
| **O Porteiro** | `fewer-permission-prompts` | Cansou de aprovar o mesmo comando toda hora | Não libera comando destrutivo |
| **O Luthier** | `keybindings-help` | Reatribuir tecla, criar acorde | Não é atalho do sistema operacional |
| **O Zelador** | `session-start-hook` | Preparar o repo pro Claude na web rodar teste e linter | Não configura a máquina local |
| **O Curador** | `artifact-design` | Antes de publicar Artifact — carrega sozinho | Não é opcional quando se publica página |
| **O Eletricista** | `artifact-capabilities` | A página precisa de dado ao vivo, estado compartilhado ou auto-republicação | Página estática não precisa dele |

> Bordões — Aurora: *"O dia começa quando alguém o nomeia."* · Metrônomo: *"Cadência
> vence esforço."* · Chaveiro: *"Regra que depende de lembrar não é regra."* ·
> Porteiro: *"Confiança se configura uma vez."* · Luthier: *"A mão decora antes da
> cabeça."* · Zelador: *"Chegou, já tem que funcionar."* · Curador: *"Uma página bem
> composta nunca é a resposta errada."* · Eletricista: *"Sem fiação, é só desenho."*

---

## Estado dos cards

14 personas têm card ilustrado: Gênese, Solano, Íris, Vex, Nova, Pip, Kai, Roan, Fabro,
Vigil, Ás, Mira, Téo, Aurora.

As outras 18 estão em `prompts-cards.md`, com o bloco de estilo que mantém a coesão
com os que já existem: ateliê noturno, luz quente de lâmpada, placa de latão gravada
com o slug.
