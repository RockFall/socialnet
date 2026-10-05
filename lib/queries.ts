import { prisma } from './db';
import { getCurrentUser } from './auth';

export type UserWithDetails = {
  id: string;
  name: string;
  email: string;
  photo: string | null;
  bio: string | null;
  location: string | null;
  interests: string[];
  createdAt: Date;
};

export type GroupWithDetails = {
  id: string;
  name: string;
  description: string;
  photo: string;
  type: string;
  location: string | null;
  interests: string[];
  isPrivate: boolean;
  createdAt: Date;
  memberCount: number;
  members: {
    user: UserWithDetails;
    role: string;
    joinedAt: Date;
  }[];
  nextEvent?: EventWithDetails;
};

export type EventWithDetails = {
  id: string;
  groupId: string;
  title: string;
  description: string;
  date: Date;
  endDate: Date | null;
  location: string;
  locationDetails: string | null;
  photo: string | null;
  status: string;
  createdAt: Date;
  group?: GroupWithDetails;
  attendees: {
    user: UserWithDetails;
    status: string;
  }[];
};

export type IdeaWithDetails = {
  id: string;
  groupId: string;
  title: string;
  description: string | null;
  status: string;
  createdAt: Date;
  suggestedBy: UserWithDetails;
  interestedUsers: UserWithDetails[];
};

export type PostWithDetails = {
  id: string;
  groupId: string;
  content: string;
  images: string[];
  createdAt: Date;
  user: UserWithDetails;
  reactions: { emoji: string; count: number }[];
};

export type InviteWithDetails = {
  id: string;
  type: string;
  status: string;
  createdAt: Date;
  group?: GroupWithDetails;
  event?: EventWithDetails;
  invitedBy: UserWithDetails;
};

export type ChatMessageWithDetails = {
  id: string;
  groupId: string;
  content: string;
  image: string | null;
  createdAt: Date;
  user: UserWithDetails;
  replyTo?: {
    id: string;
    user: UserWithDetails;
    content: string;
  };
  reactions: { emoji: string; users: UserWithDetails[] }[];
  readBy: string[];
};

function parseUser(user: any): UserWithDetails {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    photo: user.photo,
    bio: user.bio,
    location: user.location,
    interests: JSON.parse(user.interests || '[]'),
    createdAt: user.createdAt,
  };
}

export async function getAuthenticatedUser() {
  return getCurrentUser();
}

export async function getUserGroups(userId?: string) {
  const user = userId ? { id: userId } : await getCurrentUser();
  if (!user) return [];

  const memberships = await prisma.groupMember.findMany({
    where: { userId: user.id },
    include: {
      group: {
        include: {
          members: {
            include: { user: true },
            take: 5,
          },
          events: {
            where: { status: 'upcoming' },
            orderBy: { date: 'asc' },
            take: 1,
          },
        },
      },
    },
  });

  const groups: GroupWithDetails[] = await Promise.all(
    memberships.map(async (m) => {
      const memberCount = await prisma.groupMember.count({
        where: { groupId: m.group.id },
      });

      return {
        id: m.group.id,
        name: m.group.name,
        description: m.group.description,
        photo: m.group.photo,
        type: m.group.type,
        location: m.group.location,
        interests: JSON.parse(m.group.interests || '[]'),
        isPrivate: m.group.isPrivate,
        createdAt: m.group.createdAt,
        memberCount,
        members: m.group.members.map((member) => ({
          user: parseUser(member.user),
          role: member.role,
          joinedAt: member.joinedAt,
        })),
        nextEvent: m.group.events[0]
          ? {
              id: m.group.events[0].id,
              groupId: m.group.events[0].groupId,
              title: m.group.events[0].title,
              description: m.group.events[0].description,
              date: m.group.events[0].date,
              endDate: m.group.events[0].endDate,
              location: m.group.events[0].location,
              locationDetails: m.group.events[0].locationDetails,
              photo: m.group.events[0].photo,
              status: m.group.events[0].status,
              createdAt: m.group.events[0].createdAt,
              attendees: [],
            }
          : undefined,
      };
    })
  );

  return groups;
}

export async function getGroupById(groupId: string): Promise<GroupWithDetails | null> {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      members: {
        include: { user: true },
      },
      events: {
        where: { status: 'upcoming' },
        orderBy: { date: 'asc' },
        take: 1,
        include: {
          attendees: { include: { user: true } },
        },
      },
    },
  });

  if (!group) return null;

  const memberCount = await prisma.groupMember.count({
    where: { groupId: group.id },
  });

  return {
    id: group.id,
    name: group.name,
    description: group.description,
    photo: group.photo,
    type: group.type,
    location: group.location,
    interests: JSON.parse(group.interests || '[]'),
    isPrivate: group.isPrivate,
    createdAt: group.createdAt,
    memberCount,
    members: group.members.map((m) => ({
      user: parseUser(m.user),
      role: m.role,
      joinedAt: m.joinedAt,
    })),
    nextEvent: group.events[0]
      ? {
          id: group.events[0].id,
          groupId: group.events[0].groupId,
          title: group.events[0].title,
          description: group.events[0].description,
          date: group.events[0].date,
          endDate: group.events[0].endDate,
          location: group.events[0].location,
          locationDetails: group.events[0].locationDetails,
          photo: group.events[0].photo,
          status: group.events[0].status,
          createdAt: group.events[0].createdAt,
          attendees: group.events[0].attendees.map((a) => ({
            user: parseUser(a.user),
            status: a.status,
          })),
        }
      : undefined,
  };
}

export async function getGroupEvents(groupId: string): Promise<EventWithDetails[]> {
  const events = await prisma.event.findMany({
    where: { groupId },
    include: {
      attendees: { include: { user: true } },
      group: true,
    },
    orderBy: { date: 'desc' },
  });

  return events.map((e) => ({
    id: e.id,
    groupId: e.groupId,
    title: e.title,
    description: e.description,
    date: e.date,
    endDate: e.endDate,
    location: e.location,
    locationDetails: e.locationDetails,
    photo: e.photo,
    status: e.status,
    createdAt: e.createdAt,
    attendees: e.attendees.map((a) => ({
      user: parseUser(a.user),
      status: a.status,
    })),
  }));
}

export async function getGroupIdeas(groupId: string): Promise<IdeaWithDetails[]> {
  const ideas = await prisma.idea.findMany({
    where: { groupId },
    include: {
      suggestedBy: true,
      interests: { include: { user: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return ideas.map((i) => ({
    id: i.id,
    groupId: i.groupId,
    title: i.title,
    description: i.description,
    status: i.status,
    createdAt: i.createdAt,
    suggestedBy: parseUser(i.suggestedBy),
    interestedUsers: i.interests.map((int) => parseUser(int.user)),
  }));
}

export async function getGroupPosts(groupId: string): Promise<PostWithDetails[]> {
  const posts = await prisma.post.findMany({
    where: { groupId },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });

  return posts.map((p) => ({
    id: p.id,
    groupId: p.groupId,
    content: p.content,
    images: JSON.parse(p.images || '[]'),
    createdAt: p.createdAt,
    user: parseUser(p.user),
    reactions: JSON.parse(p.reactions || '[]'),
  }));
}

export async function getGroupMessages(groupId: string): Promise<ChatMessageWithDetails[]> {
  const messages = await prisma.chatMessage.findMany({
    where: { groupId },
    include: {
      user: true,
      replyTo: { include: { user: true } },
      reactions: { include: { user: true } },
      readBy: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  return messages.map((m) => {
    const reactionGroups = m.reactions.reduce(
      (acc, r) => {
        if (!acc[r.emoji]) {
          acc[r.emoji] = [];
        }
        acc[r.emoji].push(parseUser(r.user));
        return acc;
      },
      {} as Record<string, UserWithDetails[]>
    );

    return {
      id: m.id,
      groupId: m.groupId,
      content: m.content,
      image: m.image,
      createdAt: m.createdAt,
      user: parseUser(m.user),
      replyTo: m.replyTo
        ? {
            id: m.replyTo.id,
            user: parseUser(m.replyTo.user),
            content: m.replyTo.content,
          }
        : undefined,
      reactions: Object.entries(reactionGroups).map(([emoji, users]) => ({
        emoji,
        users,
      })),
      readBy: m.readBy.map((r) => r.userId),
    };
  });
}

export async function getUnreadMessageCount(groupId: string, userId: string): Promise<number> {
  const count = await prisma.chatMessage.count({
    where: {
      groupId,
      userId: { not: userId },
      readBy: {
        none: { userId },
      },
    },
  });
  return count;
}

export async function getUserInvites(): Promise<InviteWithDetails[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const invites = await prisma.invite.findMany({
    where: {
      invitedUserId: user.id,
      status: 'pending',
    },
    include: {
      invitedBy: true,
      group: {
        include: {
          members: {
            include: { user: true },
            take: 5,
          },
        },
      },
      event: {
        include: {
          attendees: { include: { user: true } },
          group: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return invites.map((i) => ({
    id: i.id,
    type: i.type,
    status: i.status,
    createdAt: i.createdAt,
    invitedBy: parseUser(i.invitedBy),
    group: i.group
      ? {
          id: i.group.id,
          name: i.group.name,
          description: i.group.description,
          photo: i.group.photo,
          type: i.group.type,
          location: i.group.location,
          interests: JSON.parse(i.group.interests || '[]'),
          isPrivate: i.group.isPrivate,
          createdAt: i.group.createdAt,
          memberCount: i.group.members.length,
          members: i.group.members.map((m) => ({
            user: parseUser(m.user),
            role: m.role,
            joinedAt: m.joinedAt,
          })),
        }
      : undefined,
    event: i.event
      ? {
          id: i.event.id,
          groupId: i.event.groupId,
          title: i.event.title,
          description: i.event.description,
          date: i.event.date,
          endDate: i.event.endDate,
          location: i.event.location,
          locationDetails: i.event.locationDetails,
          photo: i.event.photo,
          status: i.event.status,
          createdAt: i.event.createdAt,
          attendees: i.event.attendees.map((a) => ({
            user: parseUser(a.user),
            status: a.status,
          })),
        }
      : undefined,
  }));
}

export async function getAllEvents(): Promise<EventWithDetails[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const memberships = await prisma.groupMember.findMany({
    where: { userId: user.id },
    select: { groupId: true },
  });

  const groupIds = memberships.map((m) => m.groupId);

  const events = await prisma.event.findMany({
    where: { groupId: { in: groupIds } },
    include: {
      attendees: { include: { user: true } },
      group: {
        include: {
          members: { include: { user: true }, take: 5 },
        },
      },
    },
    orderBy: { date: 'asc' },
  });

  return events.map((e) => ({
    id: e.id,
    groupId: e.groupId,
    title: e.title,
    description: e.description,
    date: e.date,
    endDate: e.endDate,
    location: e.location,
    locationDetails: e.locationDetails,
    photo: e.photo,
    status: e.status,
    createdAt: e.createdAt,
    group: {
      id: e.group.id,
      name: e.group.name,
      description: e.group.description,
      photo: e.group.photo,
      type: e.group.type,
      location: e.group.location,
      interests: JSON.parse(e.group.interests || '[]'),
      isPrivate: e.group.isPrivate,
      createdAt: e.group.createdAt,
      memberCount: e.group.members.length,
      members: e.group.members.map((m) => ({
        user: parseUser(m.user),
        role: m.role,
        joinedAt: m.joinedAt,
      })),
    },
    attendees: e.attendees.map((a) => ({
      user: parseUser(a.user),
      status: a.status,
    })),
  }));
}

export async function getEventById(eventId: string): Promise<EventWithDetails | null> {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      attendees: { include: { user: true } },
      group: {
        include: {
          members: { include: { user: true } },
        },
      },
      memories: { include: { user: true } },
    },
  });

  if (!event) return null;

  return {
    id: event.id,
    groupId: event.groupId,
    title: event.title,
    description: event.description,
    date: event.date,
    endDate: event.endDate,
    location: event.location,
    locationDetails: event.locationDetails,
    photo: event.photo,
    status: event.status,
    createdAt: event.createdAt,
    group: {
      id: event.group.id,
      name: event.group.name,
      description: event.group.description,
      photo: event.group.photo,
      type: event.group.type,
      location: event.group.location,
      interests: JSON.parse(event.group.interests || '[]'),
      isPrivate: event.group.isPrivate,
      createdAt: event.group.createdAt,
      memberCount: event.group.members.length,
      members: event.group.members.map((m) => ({
        user: parseUser(m.user),
        role: m.role,
        joinedAt: m.joinedAt,
      })),
    },
    attendees: event.attendees.map((a) => ({
      user: parseUser(a.user),
      status: a.status,
    })),
  };
}

export async function getDiscoverGroups(): Promise<GroupWithDetails[]> {
  const user = await getCurrentUser();

  const whereClause = user
    ? {
        isPrivate: false,
        members: {
          none: { userId: user.id },
        },
      }
    : { isPrivate: false };

  const groups = await prisma.group.findMany({
    where: whereClause,
    include: {
      members: {
        include: { user: true },
        take: 5,
      },
    },
    take: 20,
  });

  return Promise.all(
    groups.map(async (g) => {
      const memberCount = await prisma.groupMember.count({
        where: { groupId: g.id },
      });

      return {
        id: g.id,
        name: g.name,
        description: g.description,
        photo: g.photo,
        type: g.type,
        location: g.location,
        interests: JSON.parse(g.interests || '[]'),
        isPrivate: g.isPrivate,
        createdAt: g.createdAt,
        memberCount,
        members: g.members.map((m) => ({
          user: parseUser(m.user),
          role: m.role,
          joinedAt: m.joinedAt,
        })),
      };
    })
  );
}
