export const projectStages = [
  { id: 1, status: 'NEW', name: 'Новый', nesting: ['APG'],
    requirements: [
      { option: 'title', name: 'Заголовок проекта' },
      { option: 'funding_goal', name: 'Цель проекта' }
    ],
    messages: [
      { 
        status: 'failure', 
        text: 'Поля: "[FIELDS]" должны быть заполнены для подтверждения проекта',
        button: null
      },
      { 
        status: 'success', 
        text: 'Проект доступен для подтверждения',
        button: 'Отправить заявку' 
      }
    ]
  },
  { id: 2, status: 'APG', name: 'Проверяется', nesting: ['NEW'],
    messages: [
      { 
        status: 'pending', 
        text: 'Проект проверяется. Ожидайте ответа менеджера', 
        button: 'Отменить заявку' 
      }
    ]
  },
  { id: 3, status: 'RJD', name: 'Отклонён', nesting: ['NEW'],
    messages: [
      { 
        status: 'failure',
        text: 'Внесите изменения согласно требованиям менеджера',
        button: 'Внести изменения'
      }
    ]
  },
  { id: 4, status: 'APD', name: 'Подтверждён', nesting: ['SCD'],
    requirements: [
      { option: 'title', name: 'Заголовок проекта' },
      { option: 'funding_goal', name: 'Цель проекта' },
      { option: 'date_start', name: 'Старт проекта' },
      { option: 'date_finish', name: 'Окончание проекта' },
      { option: 'rewards', name: 'Список наград' }
    ],
    messages: [
      {
        status: 'failure',
        text: 'Поля: "[FIELDS]" должны быть заполнены для запуска проекта',
        button: null
      },
      { 
        status: 'success', 
        text: 'Проект доступен для запуска',
        button: 'Запустить' 
      },
    ]
  },
  { id: 5, status: 'SCD', name: 'В очереди', nesting: ['NEW'],
    messages: [
      { 
        status: 'pending', 
        text: 'Проект в очереди. Запуск произойдёт через [TIME]', 
        button: 'Отменить запуск'
      }
    ]
  },
  { id: 6, status: 'FND', name: 'Активный', nesting: ['CSD'],
    messages: [
      { 
        status: 'pending', 
        text: 'Проект запущен! Сбор средств закончится через [TIME]', 
        button: 'Закрыть проект'
      }
    ]
    // При нажатии отправлять сообщение менеджеру для решения по проекту
  },
  { id: 7, status: 'SCS', name: 'Успешный', nesting: ['PRD', 'CHN'],
    messages: [
      {
        status: 'success',
        text: 'Цель достигнута! Для запуска проекта в произовдство свяжитесь с менеджером',
        button: null
      }
    ]
  },
  { id: 8, status: 'CHN', name: 'Второе дыхание', nesting: ['FLR', 'SCS'],
    messages: [
      { 
        status: 'pending', 
        text: 'Проект запущен в режиме "Второе дыхание". Сбор средств закончится через [TIME]', 
        button: null
      }
    ]
  },
  { id: 9, status: 'FLR', name: 'Провальный', nesting: null,
    messages: [
      {
        status: 'failure',
        text: 'Проект не достиг цели. Свяжитесь с менеджером для возврата средств участникам',
        button: null
      }
    ]
    // При нажатии отправлять сообщение менеджеру для возврата средств
  },
  { id: 10, status: 'PRD', name: 'Производство', nesting: ['PBL'],
    messages: [
      {
        status: 'success',
        text: 'Проект находится на производстве!',
        button: null
      }
    ]
  },
  { id: 11, status: 'PBL', name: 'Издание', nesting: null,
    messages: [
      {
        status: 'success',
        text: 'Поздравляем Вас с изданием проекта!',
        button: null
      }
    ]
  },
  { id: 12, status: 'CSD', name: 'Закрыт', nesting: null,
    messages: [
      {
        status: 'failure',
        text: 'Проект закрыт! Ожидайте отклика от менеджера',
        button: null
      }
    ]
  }
]

// new => apg (client) + req(title, goal)
// apg => new (client)
// apg => rjd (manager)
// apg => apd (manager)
// rjd => new (client)
// apd => scd (client) + req(title, goal, date.s, date.f, rewards)
// scd => fnd (auto) + req(date.s === date)
// fnd => scs (auto) + req(date.f === date && sum >= goal)
// fnd => chn (manager) + req(rewards['second_chance'])
// fnd => flr (auto) + req(date.f === date && sum < goal)
// chn => scs (auto) + req(date.f === date && sum >= goal)
// chn => flr (auto) + req(date.f === date && sum < goal)
// scs => chn (manager) + req(rewards['second_chance'])
// scs => prd (manager)
// prd => pbl (manager)


// FND disabled: title, category, funding_goal, date_start, date_finish, goals['funding_goal'](remove), rewards['price'](backed > 0 && remove)

// CHN disabled: title, category, funding_goal, date_start, date_finish, date_second_chance, goals['funding_goal'](remove), rewards[!secondChance ? ... : 'price'](backed > 0 && remove)

// SCS disabled: [basic], [media], [goals], [rewards]

// PRD disabled: [basic], [media], [goals], [rewards]

// PBL disabled: [basic], [media], [goals], [rewards]