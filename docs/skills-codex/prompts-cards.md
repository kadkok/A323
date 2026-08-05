# Prompts dos cards faltantes

14 personas já têm card ilustrado. Faltam 18. Este arquivo traz o bloco de estilo comum
(extraído dos 14 cards existentes) e o prompt específico de cada persona pendente.

## Como usar

Concatene: `[BLOCO DE ESTILO]` + `[PROMPT DA PERSONA]`. O bloco garante que a nova arte
caia no mesmo mundo visual dos cards já feitos.

**Sobre texto na imagem:** os cards existentes mostram que texto denso sai embaralhado.
Cada prompt abaixo limita-se a ~5 strings curtas e legíveis. Se o gerador embaralhar mesmo
assim, remova as notas adesivas e mantenha só a placa de latão — ela é a única string
que precisa sair perfeita.

---

## Bloco de estilo

```
Painterly semi-realistic digital illustration, 4:5 portrait. Dark moody workshop
interior at night, lit by a single warm tungsten desk lamp; deep amber and gold rim
light, cool shadow falloff. Dark teak worktable in the foreground, cluttered with the
tools of one specific craft. Wall behind densely pinned with handwritten index cards,
printed reference sheets and small sticky notes. A dark ceramic mug with a short
three-word mantra. A short stack of hardcover books with legible spine titles. Shallow
depth of field, cinematic, high detail, rich texture on paper and brass. Along the
bottom edge: an ornate black plaque with an engraved gold filigree border, bearing the
skill name in lowercase gold serif lettering.
```

---

# Ateliê

### Cifra, a Cartógrafa de Dados — `dataviz`

```
A Black woman in her thirties with locs pulled back, wearing a slate-grey utility shirt
and thin brass reading glasses, holding a color swatch fan against a glowing chart on
her monitor to check it. On the desk: printed bar and line charts with hand-drawn
correction marks in red, a contrast-ratio card, a small physical color wheel. Two
monitors behind show a clean sequential palette ramp and a scatter plot with one
emphasized endpoint. Wall notes read "FORM FOLLOWS QUESTION", "CHECK CONTRAST",
"ONE IDEA PER CHART". Mug reads "COLOR IS DATA". Books: "The Grammar of Graphics",
"Visual Perception". Bottom plaque: dataviz
```

---

# Oficina

### O Piloto de Prova — `/run`

```
A young Latino man with a buzzcut and a scuffed flight jacket, one hand on a keyboard
and the other holding a stopwatch, eyes locked on a laptop running a live app with a
loading spinner mid-flight. Desk covered in cables, a phone in a test rig, a browser
window mid-screenshot. Behind him a whiteboard reads "LAUNCH · DRIVE · SEE IT".
Sticky notes: "GREEN TESTS ≠ WORKING APP", "OPEN THE ACTUAL SCREEN". Mug reads
"SHIP IT LIVE". Books: "Systems in Production". Bottom plaque: run
```

### O Podador — `/simplify`

```
An older East Asian man with silver cropped hair and rolled sleeves, calmly drawing a
single long red line through a printed code listing, half the page already crossed out
and set aside. Desk holds pruning shears resting on paper as a visual pun, a neat
stack of discarded pages, one clean short page under the lamp. Wall notes: "LESS, BUT
BETTER", "DELETE BEFORE YOU ADD", "NOT A BUG HUNT". Mug reads "CUT CUT KEEP".
Books: "On Refactoring", "The Shape of Code". Bottom plaque: simplify
```

### A Sentinela — `/security-review`

```
A woman in her forties with a shaved head and a dark high-collar coat, standing at a
console, tracing a diff on a screen with one finger; the highlighted line glows amber
in a wall of otherwise dim code. Desk holds a brass key, a sealed envelope, a magnifier.
Behind her a board lists "INPUT · AUTH · SECRETS · DEPS". Sticky notes: "TRUST THE
DIFF, NOT THE INTENT". Mug reads "ASSUME BREACH". Books: "Threat Modeling".
Bottom plaque: security-review
```

### O Auditor — `/review`

```
A middle-aged South Asian man in a charcoal cardigan and half-moon glasses, reading a
long printed pull request laid across the desk, annotating margins with a fine pen.
A second screen shows a diff with green and red gutters. Desk holds a rubber stamp, a
ruler, sorted paper tabs. Wall notes: "READ THE WHOLE DIFF", "ASK, DON'T ASSUME".
Mug reads "SECOND PAIR EYES". Books: "Code Reading". Bottom plaque: review
```

### O Cartógrafo — `/init`

```
A young androgynous person with short bleached hair and an oversized wool sweater,
drafting a hand-drawn map of a codebase onto large paper — folders as territories,
modules as districts, a compass rose in the corner. Desk holds drafting triangles,
a magnifying loupe, ink bottles. Wall shows earlier draft maps pinned in rows. Sticky
notes: "NAME THE TERRITORY", "WHERE DO TESTS LIVE?". Mug reads "MAP THE REPO".
Books: "Atlas of Structures". Bottom plaque: init
```

### O Bibliotecário — `claude-api`

```
An elderly white man with a trimmed beard and a knitted vest, standing on a low
library stool, pulling a thin reference volume from a tall shelf of identical
spines labelled with model names and version numbers. A brass card catalogue sits
open on the desk beside a single lamp. Wall notes: "NEVER ANSWER FROM MEMORY",
"CHECK THE VERSION". Mug reads "LOOK IT UP". Books on desk: "Model Reference",
"Rates & Limits". Bottom plaque: claude-api
```

---

# Escrivaninha

### Vellum, o Escrivão — `docx`

```
A tall thin man in his fifties, dark skin, wire spectacles and a paper-cuff sleeve
protector, setting a formal letterhead page under the lamp with both hands, a document
with a visible table of contents and page numbers beside it. Desk holds a bone folder,
a wax seal, a ream of cream paper, a ruler measuring a margin. Wall notes: "MARGINS
MATTER", "HEADING ONE, ONCE". Mug reads "CLEAN CLEAR FINAL". Books: "Typographic
Style", "The Well-Set Page". Bottom plaque: docx
```

### Palco, o Apresentador — `pptx`

```
A charismatic Brazilian woman in her thirties with cropped curly hair and a sharp
blazer, mid-gesture presenting to an unseen room, a large screen behind her showing
one bold headline slide. On the desk, a row of small printed slide thumbnails laid out
in sequence like a storyboard, a clicker, speaker notes with three bullets. Wall notes:
"ONE SLIDE ONE IDEA", "SAY IT, THEN SHOW IT". Mug reads "OPEN STRONG CLOSE".
Books: "Presenting Data". Bottom plaque: pptx
```

### Ábaco, o Guarda-livros — `xlsx`

```
A meticulous older Japanese woman in a grey apron over a white shirt, sliding beads on
a real wooden abacus with one hand while the other rests on a printed spreadsheet with
a column of figures reconciled in green pen. Desk holds a ledger, a mechanical
calculator, colored tabs marking rows. A monitor behind shows a clean pivot table.
Wall notes: "TIE OUT EVERY TOTAL", "MESSY IN, CLEAN OUT". Mug reads "THE CELL KNOWS".
Books: "Double Entry". Bottom plaque: xlsx
```

### Selo, o Arquivista — `pdf`

```
A stout Middle Eastern man in his sixties with a leather apron, pressing a brass seal
onto a thick bound stack of pages, other stacks already sealed and shelved behind him
in labelled boxes. Desk holds a guillotine paper cutter, a stitching awl, a rotary
stamp, a scanner lamp glowing over an old page. Wall notes: "MERGE · SPLIT · SEAL",
"SCANNED IS NOT SEARCHABLE". Mug reads "SIGNED AND FILED". Books: "Archival
Practice". Bottom plaque: pdf
```

---

# Torre

### O Metrônomo — `/loop`

```
A lean nonbinary person with an undercut and a black turtleneck, one finger resting on
a large brass metronome mid-swing, watching a wall of small identical status panels
that refresh in sequence. Desk holds a stopwatch, an interval chart, a wind-up timer.
Wall notes: "CADENCE BEATS EFFORT", "ONE-OFF? DON'T LOOP". Mug reads "AGAIN IN FIVE".
Books: "On Rhythm". Bottom plaque: loop
```

### O Chaveiro — `update-config`

```
A broad-shouldered Black man in a canvas work apron, cutting a new key at a bench
grinder, a wall of hanging labelled keys behind him — each tagged with a permission
name. Desk holds a ring of keys, a lock cutaway showing its pins, a small open
settings ledger. Wall notes: "A RULE YOU MUST REMEMBER ISN'T A RULE", "HOOKS, NOT
HABITS". Mug reads "SET IT ONCE". Books: "Locks & Levers". Bottom plaque:
update-config
```

### O Porteiro — `fewer-permission-prompts`

```
A calm woman in her fifties, olive skin, grey uniform jacket with brass buttons,
seated at a doorman's desk stamping a short approved list while a long queue of
repetitive request slips is set aside. Desk holds a guest ledger, a bell, a rubber
stamp reading ALLOWED. Wall notes: "SAFE READS PASS FREELY", "ASK ONCE, NOT TWENTY".
Mug reads "ON THE LIST". Books: "House Rules". Bottom plaque:
fewer-permission-prompts
```

### O Luthier — `keybindings-help`

```
A slight young man with long dark hair tied back, wearing a leather apron, fitting a
keycap onto a disassembled mechanical keyboard held like an instrument on a workbench
cradle. Desk holds switch samples in a tray, tweezers, tiny springs, a keymap drawn on
graph paper. Wall notes: "THE HAND LEARNS FIRST", "CHORDS, NOT CONTORTIONS". Mug
reads "TUNE THE TOUCH". Books: "Ergonomics". Bottom plaque: keybindings-help
```

### O Zelador — `session-start-hook`

```
An older woman with a headscarf and a caretaker's coat, unlocking and lighting a
workshop at dawn — lamps coming on down a corridor of already-prepared benches, tools
laid out, kettle on. Desk in foreground holds a checklist with three items ticked, a
ring of keys, a lint roller and a test-tube rack. Wall notes: "READY BEFORE THEY
ARRIVE", "INSTALL · BUILD · TEST". Mug reads "DOORS OPEN EARLY". Books:
"Preparation". Bottom plaque: session-start-hook
```

### O Curador — `artifact-design`

```
A poised person of ambiguous gender in a slate suit with a single gold lapel pin,
standing in a small gallery hanging one framed page perfectly level, three other
candidate frames leaning against the wall unchosen. A spirit level and a measuring
tape rest on the plinth. Wall notes: "MATCH THE TREATMENT TO THE TASK", "NEVER
OVER-DESIGN". Mug reads "COMPOSE, DON'T DECORATE". Books: "On Restraint",
"Type & Space". Bottom plaque: artifact-design
```

### O Eletricista — `artifact-capabilities`

```
A wiry woman in her thirties with short copper hair and insulated gloves, wiring the
back of an illuminated framed page — glowing cables running from the frame into a
small junction box labelled LIVE. The page's front, visible in a mirror, updates with
fresh numbers. Desk holds a multimeter, wire spools, a fuse box. Wall notes: "STATIC
IS JUST A DRAWING", "CHECK THE ROSTER FIRST". Mug reads "GIVE IT POWER". Books:
"Circuits". Bottom plaque: artifact-capabilities
```
