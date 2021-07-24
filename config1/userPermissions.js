export const userPermissions = [
  {
    name: 'Пользователь',
    slug: 'user',
    permissions: [
      {
        section: 'projects',
        values: [1, 1, 0, 0]
      },
      {
        section: 'news',
        values: [1, 1, 0, 0]
      },
      {
        section: 'blog',
        values: [1, 1, 0, 0]
      }
    ]
  },
  {
    name: 'Куратор',
    slug: 'creator',
    permissions: [
      {
        section: 'projects',
        values: [1, 1, 1, 0]
      },
      {
        section: 'news',
        values: [1, 1, 1, 1]
      },
      {
        section: 'blog',
        values: [1, 1, 0, 0]
      }
    ]
  },
  {
    name: 'Модератор',
    slug: 'moderator',
    permissions: [
      {
        section: 'projects',
        values: [1, 1, 0, 0]
      },
      {
        section: 'news',
        values: [1, 1, 0, 0]
      },
      {
        section: 'blog',
        values: [1, 1, 1, 1]
      }
    ]
  },
  {
    name: 'Менеджер',
    slug: 'manager',
    permissions: [
      {
        section: 'projects',
        values: [1, 1, 0, 1]
      },
      {
        section: 'news',
        values: [1, 1, 0, 0]
      },
      {
        section: 'blog',
        values: [1, 1, 0, 0]
      }
    ]
  },
  {
    name: 'Администратор',
    slug: 'admin',
    permissions: [
      {
        section: 'projects',
        values: [1, 1, 1, 1]
      },
      {
        section: 'news',
        values: [1, 1, 1, 1]
      },
      {
        section: 'blog',
        values: [1, 1, 1, 1]
      }
    ]
  }
]