# Rede Social

> Uma rede para humanos socializarem.

Uma rede social orientada a grupos de amizade, onde a unidade principal é o grupo e o que se acumula é a história das pessoas fazendo coisas juntas.

## Conceito

**Um lugar para encontrar suas pessoas, combinar coisas e guardar o que vocês viveram juntos.**

### Princípios

1. **A pessoa tem um perfil, mas não uma audiência** - Foto, nome, bio e interesses. Sem contagem pública de seguidores ou lista de amigos.

2. **Diferentes maneiras de um grupo nascer** - Amigos existentes, interesses em comum, eventos ou locais físicos.

3. **Sem feed geral** - Existe conteúdo, mas ele pertence a uma relação ou situação específica.

4. **O evento é a peça central** - Começa como um plano e termina como uma lembrança organizada.

5. **Ideias têm um caminho até acontecer** - Alguém sugere → outras pessoas demonstram interesse → escolhem data → nasce um evento → ficam os registros.

## Funcionalidades

### Grupos
- Grupos de amigos (convite)
- Grupos por interesse (afinidade)
- Grupos de eventos (adesão)
- Grupos de locais (descoberta)

### Encontros
- Criar e gerenciar eventos
- RSVP (vou / talvez / não vou)
- Antes: horário, local, participantes, orientações
- Depois: fotos, anotações, memórias

### Ideias
- Sugerir atividades
- Demonstrar interesse
- Escolher data (votação)
- Transformar em evento

### Descoberta
- Grupos por interesse
- Grupos de locais próximos
- Matching por afinidade

## Tech Stack

- **Next.js 16** - React framework com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Styling
- **Lucide React** - Ícones
- **date-fns** - Manipulação de datas

## Cores da Marca

- **Tomate Principal**: #DE392B
- **Creme Base**: #F6F3EA
- **Preto Texto**: #111111

## Getting Started

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Estrutura

```
app/
├── (app)/              # App autenticado
│   ├── grupos/         # Listagem e detalhes de grupos
│   ├── encontros/      # Listagem e detalhes de encontros
│   ├── descobrir/      # Descoberta de grupos e pessoas
│   ├── perfil/         # Perfil do usuário
│   └── convites/       # Convites pendentes
├── page.tsx            # Landing page
└── layout.tsx          # Layout raiz

components/
├── ui/                 # Componentes base (Button, Card, etc.)
├── layout/             # Layout (Sidebar, Header, etc.)
├── grupos/             # Componentes de grupos
├── encontros/          # Componentes de encontros
└── perfil/             # Componentes de perfil

lib/
├── data.ts             # Dados mockados
└── utils.ts            # Utilitários
```

## License

MIT
