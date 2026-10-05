export interface User {
  id: string;
  name: string;
  photo: string;
  bio: string;
  interests: string[];
  location?: string;
}

export interface GroupMember {
  user: User;
  role: 'admin' | 'member';
  joinedAt: Date;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  photo: string;
  type: 'friends' | 'interest' | 'event' | 'local';
  memberCount: number;
  members: GroupMember[];
  nextEvent?: Event;
  createdAt: Date;
  location?: string;
  interests?: string[];
  isPrivate: boolean;
}

export interface Event {
  id: string;
  groupId: string;
  group?: Group;
  title: string;
  description: string;
  date: Date;
  endDate?: Date;
  location: string;
  locationDetails?: string;
  photo?: string;
  attendees: { user: User; status: 'going' | 'maybe' | 'declined' }[];
  memories?: Memory[];
  status: 'upcoming' | 'ongoing' | 'past';
}

export interface Memory {
  id: string;
  eventId: string;
  userId: string;
  user: User;
  type: 'photo' | 'note' | 'highlight';
  content: string;
  caption?: string;
  createdAt: Date;
}

export interface Idea {
  id: string;
  groupId: string;
  title: string;
  description?: string;
  suggestedBy: User;
  interestedUsers: User[];
  status: 'open' | 'planning' | 'scheduled' | 'done';
  eventId?: string;
  createdAt: Date;
}

export interface Invite {
  id: string;
  type: 'group' | 'event';
  group?: Group;
  event?: Event;
  invitedBy: User;
  createdAt: Date;
}

export interface Post {
  id: string;
  groupId: string;
  user: User;
  content: string;
  images?: string[];
  eventId?: string;
  createdAt: Date;
  reactions: { emoji: string; count: number }[];
}

export interface ChatMessage {
  id: string;
  groupId: string;
  user: User;
  content: string;
  image?: string;
  replyTo?: {
    id: string;
    user: User;
    content: string;
  };
  reactions?: { emoji: string; users: User[] }[];
  createdAt: Date;
  readBy: string[];
}

export const currentUser: User = {
  id: 'me',
  name: 'Ana Carolina',
  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  bio: 'Apaixonada por café, livros e boas conversas. Sempre procurando novos lugares e novas amizades.',
  interests: ['Café', 'Literatura', 'Cinema', 'Yoga', 'Música', 'Viagens'],
  location: 'São Paulo, SP'
};

export const users: User[] = [
  currentUser,
  {
    id: 'u1',
    name: 'Rafael Santos',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    bio: 'Desenvolvedor e músico nas horas vagas',
    interests: ['Tecnologia', 'Música', 'Games', 'Café'],
    location: 'São Paulo, SP'
  },
  {
    id: 'u2',
    name: 'Marina Costa',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    bio: 'Designer e amante de arte',
    interests: ['Design', 'Arte', 'Fotografia', 'Viagens'],
    location: 'São Paulo, SP'
  },
  {
    id: 'u3',
    name: 'Bruno Oliveira',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    bio: 'Corredor e entusiasta de esportes',
    interests: ['Corrida', 'Futebol', 'Nutrição', 'Viagens'],
    location: 'São Paulo, SP'
  },
  {
    id: 'u4',
    name: 'Juliana Mendes',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    bio: 'Professora de yoga e meditação',
    interests: ['Yoga', 'Meditação', 'Natureza', 'Culinária'],
    location: 'São Paulo, SP'
  },
  {
    id: 'u5',
    name: 'Pedro Almeida',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    bio: 'Chef de cozinha experimental',
    interests: ['Gastronomia', 'Vinhos', 'Viagens', 'Fotografia'],
    location: 'São Paulo, SP'
  },
  {
    id: 'u6',
    name: 'Camila Ferreira',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    bio: 'Leitora voraz e escritora em formação',
    interests: ['Literatura', 'Escrita', 'Café', 'Teatro'],
    location: 'São Paulo, SP'
  },
  {
    id: 'u7',
    name: 'Lucas Ribeiro',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
    bio: 'Fotógrafo urbano',
    interests: ['Fotografia', 'Arquitetura', 'Viagens', 'Cinema'],
    location: 'São Paulo, SP'
  },
  {
    id: 'u8',
    name: 'Fernanda Lima',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face',
    bio: 'Advogada e sommelier amadora',
    interests: ['Direito', 'Vinhos', 'Jazz', 'Teatro'],
    location: 'São Paulo, SP'
  }
];

const createMembers = (userIds: string[], adminId: string): GroupMember[] => {
  return userIds.map(id => ({
    user: users.find(u => u.id === id) || users[0],
    role: id === adminId ? 'admin' as const : 'member' as const,
    joinedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
  }));
};

export const groups: Group[] = [
  {
    id: 'g1',
    name: 'Amigos',
    description: 'Nosso grupo de amigos de sempre. Aqui combinamos os rolês e guardamos as memórias.',
    photo: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop',
    type: 'friends',
    memberCount: 8,
    members: createMembers(['me', 'u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7'], 'me'),
    createdAt: new Date('2023-01-15'),
    isPrivate: true
  },
  {
    id: 'g2',
    name: 'Clube do Livro',
    description: 'Lemos um livro por mês e nos encontramos para discutir. Todos os níveis de leitura são bem-vindos!',
    photo: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
    type: 'interest',
    memberCount: 12,
    members: createMembers(['me', 'u6', 'u2', 'u8'], 'u6'),
    createdAt: new Date('2023-06-01'),
    interests: ['Literatura', 'Escrita', 'Café'],
    isPrivate: false
  },
  {
    id: 'g3',
    name: 'Pessoas do Bairro',
    description: 'Vizinhos da Vila Madalena que querem se conhecer melhor e fazer coisas juntos.',
    photo: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=400&fit=crop',
    type: 'local',
    memberCount: 27,
    members: createMembers(['me', 'u1', 'u3', 'u4', 'u5'], 'u1'),
    createdAt: new Date('2024-01-10'),
    location: 'Vila Madalena, São Paulo',
    isPrivate: false
  },
  {
    id: 'g4',
    name: 'Corredores SP',
    description: 'Grupo de corrida para todos os níveis. Treinos semanais no Ibirapuera.',
    photo: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=400&fit=crop',
    type: 'interest',
    memberCount: 45,
    members: createMembers(['me', 'u3', 'u4'], 'u3'),
    createdAt: new Date('2023-03-20'),
    interests: ['Corrida', 'Esportes', 'Saúde'],
    isPrivate: false
  },
  {
    id: 'g5',
    name: 'Café Mocha',
    description: 'Frequentadores do Café Mocha na Vila Madalena. Aqui combinamos encontros no nosso café favorito.',
    photo: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop',
    type: 'local',
    memberCount: 18,
    members: createMembers(['me', 'u2', 'u6', 'u8'], 'u2'),
    createdAt: new Date('2024-02-01'),
    location: 'Café Mocha - Vila Madalena',
    isPrivate: false
  },
  {
    id: 'g6',
    name: 'Viagem Peru 2024',
    description: 'Organização da nossa viagem para o Peru em outubro!',
    photo: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&h=400&fit=crop',
    type: 'event',
    memberCount: 5,
    members: createMembers(['me', 'u1', 'u2', 'u7'], 'me'),
    createdAt: new Date('2024-05-01'),
    isPrivate: true
  }
];

export const events: Event[] = [
  {
    id: 'e1',
    groupId: 'g1',
    group: groups[0],
    title: 'Jantar de Sexta',
    description: 'Nosso jantar mensal! Dessa vez no novo restaurante japonês da Oscar Freire.',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    location: 'Restaurante Koya',
    locationDetails: 'Rua Oscar Freire, 123 - Jardins',
    photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
    attendees: [
      { user: users[0], status: 'going' },
      { user: users[1], status: 'going' },
      { user: users[2], status: 'going' },
      { user: users[3], status: 'maybe' },
      { user: users[4], status: 'going' }
    ],
    status: 'upcoming'
  },
  {
    id: 'e2',
    groupId: 'g2',
    group: groups[1],
    title: 'Discussão: A Metamorfose',
    description: 'Encontro para discutir "A Metamorfose" de Franz Kafka. Tragam suas reflexões!',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    location: 'Café Mocha',
    locationDetails: 'Rua Harmonia, 57 - Vila Madalena',
    attendees: [
      { user: users[0], status: 'going' },
      { user: users[5], status: 'going' },
      { user: users[7], status: 'going' }
    ],
    status: 'upcoming'
  },
  {
    id: 'e3',
    groupId: 'g4',
    group: groups[3],
    title: 'Treino - Sábado, 15h',
    description: 'Treino semanal no Ibirapuera. Vamos fazer 5km leve para iniciantes e 10km para avançados.',
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    location: 'Parque Ibirapuera',
    locationDetails: 'Portão 3 - Próximo ao MAC',
    photo: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&h=400&fit=crop',
    attendees: [
      { user: users[0], status: 'going' },
      { user: users[3], status: 'going' },
      { user: users[4], status: 'going' }
    ],
    status: 'upcoming'
  },
  {
    id: 'e4',
    groupId: 'g1',
    group: groups[0],
    title: 'Churrasco do Bruno',
    description: 'Aniversário do Bruno! Cada um leva uma bebida.',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    location: 'Casa do Bruno',
    locationDetails: 'Rua dos Pinheiros, 456',
    photo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop',
    attendees: [
      { user: users[0], status: 'going' },
      { user: users[1], status: 'going' },
      { user: users[2], status: 'going' },
      { user: users[3], status: 'going' },
      { user: users[4], status: 'going' },
      { user: users[5], status: 'going' }
    ],
    memories: [
      {
        id: 'm1',
        eventId: 'e4',
        userId: 'me',
        user: users[0],
        type: 'photo',
        content: 'https://images.unsplash.com/photo-1529543544277-750e0862a240?w=600&h=600&fit=crop',
        caption: 'A turma reunida! 🎉',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'm2',
        eventId: 'e4',
        userId: 'u1',
        user: users[1],
        type: 'photo',
        content: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=600&fit=crop',
        caption: 'Bruno cortando o bolo!',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'm3',
        eventId: 'e4',
        userId: 'u2',
        user: users[2],
        type: 'highlight',
        content: 'O Bruno ficou surpreso demais quando a gente apareceu! A cara dele foi impagável 😂',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      }
    ],
    status: 'past'
  },
  {
    id: 'e5',
    groupId: 'g3',
    group: groups[2],
    title: 'Feira no Beco',
    description: 'Vamos conhecer a feirinha de artesanato do beco do Batman juntos!',
    date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    location: 'Beco do Batman',
    locationDetails: 'Vila Madalena',
    photo: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=600&h=400&fit=crop',
    attendees: [
      { user: users[0], status: 'maybe' },
      { user: users[1], status: 'going' },
      { user: users[3], status: 'going' }
    ],
    status: 'upcoming'
  }
];

export const ideas: Idea[] = [
  {
    id: 'i1',
    groupId: 'g1',
    title: 'Fazer canoagem',
    description: 'Alguém anima uma canoagem no fim de semana? Tem um lugar legal em São Roque.',
    suggestedBy: users[1],
    interestedUsers: [users[0], users[2], users[4]],
    status: 'open',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'i2',
    groupId: 'g1',
    title: 'Escape room',
    description: 'Aquele escape room novo na Augusta! Tem temática de terror.',
    suggestedBy: users[2],
    interestedUsers: [users[0], users[1], users[5], users[6]],
    status: 'planning',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'i3',
    groupId: 'g2',
    title: 'Visitar a Livraria Cultura',
    description: 'Podemos ir juntos na Livraria Cultura escolher os próximos livros do clube.',
    suggestedBy: users[5],
    interestedUsers: [users[0], users[7]],
    status: 'open',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'i4',
    groupId: 'g4',
    title: 'Corrida noturna',
    description: 'Que tal um treino noturno pra variar? Podemos correr às 20h.',
    suggestedBy: users[3],
    interestedUsers: [users[0], users[4]],
    status: 'open',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  }
];

export const invites: Invite[] = [
  {
    id: 'inv1',
    type: 'group',
    group: {
      id: 'g7',
      name: 'Cinéfilos SP',
      description: 'Grupo para amantes de cinema. Vamos juntos às estreias e discutimos filmes.',
      photo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=400&fit=crop',
      type: 'interest',
      memberCount: 34,
      members: [],
      createdAt: new Date('2023-08-01'),
      interests: ['Cinema', 'Filmes', 'Séries'],
      isPrivate: false
    },
    invitedBy: users[7],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'inv2',
    type: 'event',
    event: {
      id: 'e6',
      groupId: 'g7',
      title: 'Estreia: Duna Parte 3',
      description: 'Vamos juntos na pré-estreia de Duna!',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      location: 'Cinemark JK Iguatemi',
      attendees: [],
      status: 'upcoming'
    },
    invitedBy: users[7],
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
  }
];

export const posts: Post[] = [
  {
    id: 'p1',
    groupId: 'g1',
    user: users[2],
    content: 'Gente, olha essa foto que achei do nosso último rolê! Que saudade desse dia 💛',
    images: ['https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=600&h=400&fit=crop'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    reactions: [{ emoji: '❤️', count: 5 }, { emoji: '😍', count: 3 }]
  },
  {
    id: 'p2',
    groupId: 'g2',
    user: users[5],
    content: 'Acabei de terminar A Metamorfose! Que livro intenso. Mal posso esperar pra discutir com vocês.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    reactions: [{ emoji: '📚', count: 4 }, { emoji: '👏', count: 2 }]
  },
  {
    id: 'p3',
    groupId: 'g4',
    user: users[3],
    content: 'Treino de hoje foi puxado mas valeu muito! 8km em 45min. Quem foi, conseguiu acompanhar bem?',
    images: ['https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&h=400&fit=crop'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    reactions: [{ emoji: '💪', count: 8 }, { emoji: '🏃', count: 5 }]
  }
];

export const suggestedGroups: Group[] = [
  {
    id: 'sg1',
    name: 'Amantes de Café SP',
    description: 'Exploramos as melhores cafeterias de São Paulo juntos.',
    photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    type: 'interest',
    memberCount: 89,
    members: [],
    createdAt: new Date('2023-04-01'),
    interests: ['Café', 'Gastronomia'],
    isPrivate: false
  },
  {
    id: 'sg2',
    name: 'Yoga no Parque',
    description: 'Práticas de yoga ao ar livre nos parques de SP.',
    photo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    type: 'interest',
    memberCount: 156,
    members: [],
    createdAt: new Date('2022-11-01'),
    interests: ['Yoga', 'Meditação', 'Natureza'],
    isPrivate: false
  },
  {
    id: 'sg3',
    name: 'Livraria da Vila',
    description: 'Grupo dos frequentadores da Livraria da Vila.',
    photo: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=400&fit=crop',
    type: 'local',
    memberCount: 42,
    members: [],
    createdAt: new Date('2024-01-15'),
    location: 'Livraria da Vila - Fradique Coutinho',
    isPrivate: false
  }
];

export function getUpcomingEvents(): Event[] {
  return events
    .filter(e => e.status === 'upcoming')
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function getPastEvents(): Event[] {
  return events
    .filter(e => e.status === 'past')
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getGroupEvents(groupId: string): Event[] {
  return events.filter(e => e.groupId === groupId);
}

export function getGroupIdeas(groupId: string): Idea[] {
  return ideas.filter(i => i.groupId === groupId);
}

export function getGroupPosts(groupId: string): Post[] {
  return posts.filter(p => p.groupId === groupId);
}

export function getUserGroups(userId: string): Group[] {
  return groups.filter(g => g.members.some(m => m.user.id === userId));
}

export const chatMessages: ChatMessage[] = [
  // Grupo Amigos (g1)
  {
    id: 'msg1',
    groupId: 'g1',
    user: users[1],
    content: 'E aí galera, confirmado o jantar de sexta?',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    readBy: ['me', 'u2', 'u3']
  },
  {
    id: 'msg2',
    groupId: 'g1',
    user: users[2],
    content: 'Confirmadíssimo! Já reservei mesa pra 8 pessoas',
    createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
    readBy: ['me', 'u1', 'u3']
  },
  {
    id: 'msg3',
    groupId: 'g1',
    user: users[3],
    content: 'Vou chegar um pouco atrasado, saio do trabalho às 19h',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    readBy: ['me', 'u1', 'u2']
  },
  {
    id: 'msg4',
    groupId: 'g1',
    user: users[0],
    content: 'Tranquilo Bruno! A reserva é pras 20h mesmo',
    replyTo: {
      id: 'msg3',
      user: users[3],
      content: 'Vou chegar um pouco atrasado, saio do trabalho às 19h'
    },
    createdAt: new Date(Date.now() - 50 * 60 * 1000),
    readBy: ['u1', 'u2', 'u3']
  },
  {
    id: 'msg5',
    groupId: 'g1',
    user: users[4],
    content: 'Alguém sabe se tem estacionamento no local?',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    readBy: ['me', 'u1']
  },
  {
    id: 'msg6',
    groupId: 'g1',
    user: users[1],
    content: 'Tem sim! E é gratuito pra clientes',
    createdAt: new Date(Date.now() - 25 * 60 * 1000),
    readBy: ['me', 'u4']
  },
  {
    id: 'msg7',
    groupId: 'g1',
    user: users[5],
    content: 'Gente, olha o que achei! O cardápio deles 😍',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    readBy: ['me', 'u1', 'u2'],
    reactions: [{ emoji: '😍', users: [users[0], users[1]] }, { emoji: '🤤', users: [users[2]] }]
  },
  {
    id: 'msg8',
    groupId: 'g1',
    user: users[0],
    content: 'Que demais! Já sei o que vou pedir 🍣',
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
    readBy: ['u1', 'u5']
  },
  {
    id: 'msg9',
    groupId: 'g1',
    user: users[6],
    content: 'Pessoal, posso levar a Fernanda? Ela tá querendo conhecer vocês',
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    readBy: ['me', 'u1']
  },
  {
    id: 'msg10',
    groupId: 'g1',
    user: users[2],
    content: 'Claro! Quanto mais gente melhor 🎉',
    createdAt: new Date(Date.now() - 2 * 60 * 1000),
    readBy: ['me', 'u6']
  },

  // Clube do Livro (g2)
  {
    id: 'msg11',
    groupId: 'g2',
    user: users[5],
    content: 'Gente, terminei A Metamorfose ontem! Que livro intenso',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    readBy: ['me', 'u2', 'u8']
  },
  {
    id: 'msg12',
    groupId: 'g2',
    user: users[7],
    content: 'Também terminei! A transformação do Gregor é uma metáfora tão forte...',
    createdAt: new Date(Date.now() - 4.5 * 60 * 60 * 1000),
    readBy: ['me', 'u6']
  },
  {
    id: 'msg13',
    groupId: 'g2',
    user: users[0],
    content: 'Tô na metade ainda! Sem spoilers por favor 🙈',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    readBy: ['u6', 'u8']
  },
  {
    id: 'msg14',
    groupId: 'g2',
    user: users[5],
    content: 'Tranquilo Ana! A gente guarda pra discussão presencial',
    createdAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
    readBy: ['me'],
    reactions: [{ emoji: '❤️', users: [users[0]] }]
  },
  {
    id: 'msg15',
    groupId: 'g2',
    user: users[2],
    content: 'Qual vai ser o próximo livro? Tenho algumas sugestões!',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    readBy: ['me', 'u6', 'u8']
  },

  // Corredores SP (g4)
  {
    id: 'msg16',
    groupId: 'g4',
    user: users[3],
    content: 'Bom dia pessoal! Treino confirmado pro sábado?',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    readBy: ['me', 'u4']
  },
  {
    id: 'msg17',
    groupId: 'g4',
    user: users[0],
    content: 'Confirmado! 🏃‍♀️',
    createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000),
    readBy: ['u3', 'u4']
  },
  {
    id: 'msg18',
    groupId: 'g4',
    user: users[4],
    content: 'Eu vou! Mas preciso ir devagar, ainda tô me recuperando da última corrida',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    readBy: ['me', 'u3']
  },
  {
    id: 'msg19',
    groupId: 'g4',
    user: users[3],
    content: 'Sem problemas! Vamos ter ritmo pra todos os níveis',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    readBy: ['me', 'u4'],
    reactions: [{ emoji: '💪', users: [users[0], users[4]] }]
  },

  // Viagem Peru (g6)
  {
    id: 'msg20',
    groupId: 'g6',
    user: users[1],
    content: 'Gente, olha esse hostel em Cusco! Parece incrível',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&h=400&fit=crop',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    readBy: ['me', 'u2', 'u7']
  },
  {
    id: 'msg21',
    groupId: 'g6',
    user: users[0],
    content: 'Amei! Já temos as passagens compradas?',
    createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000),
    readBy: ['u1', 'u2', 'u7']
  },
  {
    id: 'msg22',
    groupId: 'g6',
    user: users[2],
    content: 'Eu e o Lucas já compramos! Tá na hora de vocês 😄',
    createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000),
    readBy: ['me', 'u1', 'u7']
  },
  {
    id: 'msg23',
    groupId: 'g6',
    user: users[6],
    content: 'Vou comprar amanhã! Alguém quer ir no mesmo voo?',
    createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
    readBy: ['me', 'u1', 'u2']
  }
];

export function getGroupMessages(groupId: string): ChatMessage[] {
  return chatMessages
    .filter(m => m.groupId === groupId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

export function getUnreadCount(groupId: string, userId: string): number {
  return chatMessages.filter(m => 
    m.groupId === groupId && 
    !m.readBy.includes(userId) &&
    m.user.id !== userId
  ).length;
}
