import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const hashedPassword = await bcrypt.hash('senha123', 10);

  const ana = await prisma.user.create({
    data: {
      email: 'ana@email.com',
      password: hashedPassword,
      name: 'Ana Carolina',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
      bio: 'Apaixonada por café, livros e boas conversas. Sempre procurando novos lugares e novas amizades.',
      location: 'São Paulo, SP',
      interests: JSON.stringify(['Café', 'Literatura', 'Cinema', 'Yoga', 'Música', 'Viagens']),
    },
  });

  const rafael = await prisma.user.create({
    data: {
      email: 'rafael@email.com',
      password: hashedPassword,
      name: 'Rafael Santos',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      bio: 'Designer e fotógrafo nas horas vagas.',
      location: 'São Paulo, SP',
      interests: JSON.stringify(['Design', 'Fotografia', 'Arte']),
    },
  });

  const mariana = await prisma.user.create({
    data: {
      email: 'mariana@email.com',
      password: hashedPassword,
      name: 'Mariana Costa',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      bio: 'Advogada, mas ama uma boa playlist e um rolê cultural.',
      location: 'São Paulo, SP',
      interests: JSON.stringify(['Música', 'Direito', 'Cultura']),
    },
  });

  const pedro = await prisma.user.create({
    data: {
      email: 'pedro@email.com',
      password: hashedPassword,
      name: 'Pedro Lima',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
      bio: 'Engenheiro de software, gamer nas horas vagas.',
      location: 'São Paulo, SP',
      interests: JSON.stringify(['Tecnologia', 'Games', 'Corrida']),
    },
  });

  const julia = await prisma.user.create({
    data: {
      email: 'julia@email.com',
      password: hashedPassword,
      name: 'Julia Mendes',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
      bio: 'Professora de yoga e amante da natureza.',
      location: 'São Paulo, SP',
      interests: JSON.stringify(['Yoga', 'Natureza', 'Meditação']),
    },
  });

  const lucas = await prisma.user.create({
    data: {
      email: 'lucas@email.com',
      password: hashedPassword,
      name: 'Lucas Ferreira',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      bio: 'Músico e produtor, sempre em busca de novos sons.',
      location: 'São Paulo, SP',
      interests: JSON.stringify(['Música', 'Produção', 'Shows']),
    },
  });

  const beatriz = await prisma.user.create({
    data: {
      email: 'beatriz@email.com',
      password: hashedPassword,
      name: 'Beatriz Alves',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
      bio: 'Médica, adora viajar e conhecer novas culturas.',
      location: 'São Paulo, SP',
      interests: JSON.stringify(['Viagens', 'Culinária', 'Medicina']),
    },
  });

  const thiago = await prisma.user.create({
    data: {
      email: 'thiago@email.com',
      password: hashedPassword,
      name: 'Thiago Rocha',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
      bio: 'Chef de cozinha, apaixonado por gastronomia.',
      location: 'São Paulo, SP',
      interests: JSON.stringify(['Gastronomia', 'Vinhos', 'Viagens']),
    },
  });

  const allUsers = [ana, rafael, mariana, pedro, julia, lucas, beatriz, thiago];

  const amigosFaculdade = await prisma.group.create({
    data: {
      name: 'Amigos da Faculdade',
      description: 'Turma de ADM 2018 - Porque formatura é só o começo da jornada',
      photo: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
      type: 'friends',
      location: 'São Paulo, SP',
      interests: JSON.stringify(['Happy Hour', 'Reuniões', 'Festas']),
      isPrivate: true,
    },
  });

  const clubeLivro = await prisma.group.create({
    data: {
      name: 'Clube do Livro',
      description: 'Leituras mensais e discussões que valem a pena',
      photo: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
      type: 'interest',
      location: 'São Paulo, SP',
      interests: JSON.stringify(['Literatura', 'Discussões', 'Café']),
      isPrivate: false,
    },
  });

  const trilheiros = await prisma.group.create({
    data: {
      name: 'Trilheiros SP',
      description: 'Explorando as melhores trilhas de São Paulo e região',
      photo: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop',
      type: 'interest',
      location: 'São Paulo, SP',
      interests: JSON.stringify(['Trilhas', 'Natureza', 'Aventura']),
      isPrivate: false,
    },
  });

  const corredores = await prisma.group.create({
    data: {
      name: 'Corredores SP',
      description: 'Treinos semanais no Ibirapuera e corridas de rua',
      photo: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop',
      type: 'interest',
      location: 'São Paulo, SP',
      interests: JSON.stringify(['Corrida', 'Saúde', 'Maratonas']),
      isPrivate: false,
    },
  });

  const vizinhosPinheiros = await prisma.group.create({
    data: {
      name: 'Vizinhos Pinheiros',
      description: 'Comunidade do bairro de Pinheiros',
      photo: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
      type: 'local',
      location: 'Pinheiros, SP',
      interests: JSON.stringify(['Bairro', 'Eventos', 'Comunidade']),
      isPrivate: false,
    },
  });

  const viagemPeru = await prisma.group.create({
    data: {
      name: 'Viagem Peru 2024',
      description: 'Planejamento da nossa aventura em Machu Picchu',
      photo: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&h=400&fit=crop',
      type: 'event',
      location: 'Peru',
      interests: JSON.stringify(['Viagem', 'Aventura', 'Cultura']),
      isPrivate: true,
    },
  });

  const allGroups = [amigosFaculdade, clubeLivro, trilheiros, corredores, vizinhosPinheiros, viagemPeru];

  for (const group of allGroups) {
    await prisma.groupMember.create({
      data: {
        userId: ana.id,
        groupId: group.id,
        role: 'admin',
      },
    });

    const otherMembers = allUsers.filter(u => u.id !== ana.id).slice(0, 4);
    for (const user of otherMembers) {
      await prisma.groupMember.create({
        data: {
          userId: user.id,
          groupId: group.id,
          role: 'member',
        },
      });
    }
  }

  const jantar = await prisma.event.create({
    data: {
      groupId: amigosFaculdade.id,
      title: 'Jantar de Reencontro',
      description: 'Nosso tradicional jantar mensal! Vamos matar a saudade e colocar a conversa em dia.',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      location: 'Restaurante Origem',
      locationDetails: 'Rua Bela Cintra, 1551 - Consolação',
      photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
      status: 'upcoming',
    },
  });

  const reuniaoLivro = await prisma.event.create({
    data: {
      groupId: clubeLivro.id,
      title: 'Discussão: A Metamorfose',
      description: 'Vamos discutir a obra-prima de Kafka e suas interpretações.',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: 'Livraria Cultura',
      locationDetails: 'Av. Paulista, 2073 - Bela Vista',
      photo: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop',
      status: 'upcoming',
    },
  });

  const trilha = await prisma.event.create({
    data: {
      groupId: trilheiros.id,
      title: 'Trilha Pico do Jaraguá',
      description: 'Trilha de nível médio com vista incrível de São Paulo.',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      location: 'Parque Estadual do Jaraguá',
      locationDetails: 'Portaria principal - Rod. dos Bandeirantes km 18',
      photo: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop',
      status: 'upcoming',
    },
  });

  const corrida = await prisma.event.create({
    data: {
      groupId: corredores.id,
      title: 'Treino Ibirapuera',
      description: 'Treino semanal no parque. Todos os níveis são bem-vindos!',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      location: 'Parque Ibirapuera',
      locationDetails: 'Portão 10 - Av. República do Líbano',
      photo: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop',
      status: 'upcoming',
    },
  });

  const pizzariaPast = await prisma.event.create({
    data: {
      groupId: amigosFaculdade.id,
      title: 'Pizza Night',
      description: 'Noite de pizza e histórias da faculdade.',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      location: 'Pizzaria Bráz',
      locationDetails: 'Rua Graúna, 125 - Moema',
      photo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
      status: 'past',
    },
  });

  const allEvents = [jantar, reuniaoLivro, trilha, corrida, pizzariaPast];

  for (const event of allEvents) {
    for (let i = 0; i < 3; i++) {
      await prisma.eventAttendee.create({
        data: {
          eventId: event.id,
          userId: allUsers[i].id,
          status: 'going',
        },
      });
    }
    await prisma.eventAttendee.create({
      data: {
        eventId: event.id,
        userId: allUsers[3].id,
        status: 'maybe',
      },
    });
  }

  await prisma.idea.create({
    data: {
      groupId: amigosFaculdade.id,
      title: 'Viagem para Ilhabela',
      description: 'Que tal um fim de semana na praia? Podemos alugar uma casa.',
      suggestedById: mariana.id,
      status: 'open',
    },
  });

  await prisma.idea.create({
    data: {
      groupId: amigosFaculdade.id,
      title: 'Festa Junina',
      description: 'Organizar uma festa junina com comidas típicas e quadrilha.',
      suggestedById: rafael.id,
      status: 'planning',
    },
  });

  await prisma.idea.create({
    data: {
      groupId: clubeLivro.id,
      title: '1984 - George Orwell',
      description: 'Próxima leitura sugerida: o clássico de Orwell.',
      suggestedById: lucas.id,
      status: 'open',
    },
  });

  await prisma.post.create({
    data: {
      groupId: amigosFaculdade.id,
      userId: rafael.id,
      content: 'Gente, olhem as fotos do último encontro! Foi demais! 🎉',
      images: JSON.stringify(['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop']),
      reactions: JSON.stringify([{ emoji: '❤️', count: 5 }, { emoji: '🎉', count: 3 }]),
    },
  });

  await prisma.post.create({
    data: {
      groupId: clubeLivro.id,
      userId: julia.id,
      content: 'Acabei de terminar A Metamorfose. Que livro intenso! Mal posso esperar pra discutir com vocês.',
      reactions: JSON.stringify([{ emoji: '📚', count: 4 }, { emoji: '👏', count: 2 }]),
    },
  });

  const messages = [
    { groupId: amigosFaculdade.id, userId: rafael.id, content: 'E aí pessoal, confirmados pro jantar?' },
    { groupId: amigosFaculdade.id, userId: mariana.id, content: 'Eu vou! Mal posso esperar 🎉' },
    { groupId: amigosFaculdade.id, userId: ana.id, content: 'Confirmada! Reservei mesa pra 8 pessoas' },
    { groupId: amigosFaculdade.id, userId: pedro.id, content: 'Alguém sabe se tem estacionamento no local?' },
    { groupId: amigosFaculdade.id, userId: rafael.id, content: 'Tem sim! E é gratuito pra clientes' },
    { groupId: clubeLivro.id, userId: lucas.id, content: 'Gente, terminei A Metamorfose ontem! Que livro intenso' },
    { groupId: clubeLivro.id, userId: beatriz.id, content: 'Também terminei! A transformação do Gregor é uma metáfora tão forte...' },
    { groupId: clubeLivro.id, userId: ana.id, content: 'Tô na metade ainda! Sem spoilers por favor 🙈' },
  ];

  for (const msg of messages) {
    await prisma.chatMessage.create({
      data: {
        groupId: msg.groupId,
        userId: msg.userId,
        content: msg.content,
      },
    });
  }

  await prisma.invite.create({
    data: {
      type: 'group',
      groupId: trilheiros.id,
      invitedById: pedro.id,
      invitedUserId: ana.id,
      status: 'pending',
    },
  });

  await prisma.invite.create({
    data: {
      type: 'event',
      eventId: jantar.id,
      invitedById: rafael.id,
      invitedUserId: ana.id,
      status: 'pending',
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log('📧 Demo account: ana@email.com / senha123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
