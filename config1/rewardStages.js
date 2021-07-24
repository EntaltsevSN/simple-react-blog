export const rewardStages = [
  { id: 1, status: 'NEW', name: 'Новая', nesting: ['APG'],
    /*requirements: [
      { option: 'title', name: 'Заголовок награды' },
      { option: 'price', name: 'Цена награды' },
      { option: 'description', name: 'Краткое описание' }
    ],*/
    messages: [
      /*{ 
        status: 'failure', 
        text: 'Поля: "[FIELDS]" должны быть заполнены для подтверждения награды',
        button: null
      },*/
      { 
        status: 'success', 
        text: 'Награда доступна для подтверждения',
        button: 'Отправить заявку' 
      }
    ]
  },
  { id: 2, status: 'APG', name: 'Проверяется', nesting: ['NEW'],
    messages: [
      { 
        status: 'pending', 
        text: 'Награда проверяется. Ожидайте ответа менеджера', 
        button: 'Отменить заявку' 
      }
    ]
  },
  { id: 3, status: 'RJD', name: 'Отклонена', nesting: ['NEW'],
    messages: [
      { 
        status: 'failure',
        text: 'Вам необходимо внести изменения в награду согласно требованиям менеджера',
        button: 'Внести изменения'
      }
    ]
  },
  { id: 4, status: 'APD', name: 'Утверждена', nesting: ['SCD'],
    messages: [
      { 
        status: 'success', 
        text: 'Награда утверждена!',
        button: null
      },
    ]
  }
]