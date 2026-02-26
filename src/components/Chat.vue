<template>
  <div class="chat flex column">
    <div class="chat-item"  v-for="g of json.data.dialog.messages.grouped">
      <template v-for="i in g['groups']">
        <!-- {{ i.userId }} -->
        <!-- {{ findUserInfo(i.userId).avatar }} -->
      <Avatar 
        size="45" 
        :avatar="findUserInfo(i.userId).avatar"
      />
      </template>
      
      
      <div class="message flex row">
        <p v-for="m in g.messages">{{ m.text }}</p>
        
      </div>
    </div>
    
  </div>
</template>
<script setup>
import Avatar from './Avatar.vue';
const findUserInfo = (id) => {
  return json.data.dialog.participants.find(e => e.userId == id)
}
const json = {
  "status": "success",
  "data": {
    "dialog": {
      "dialogId": "d7c9e8f2-1a3b-4c5d-9e6f-8a7b6c5d4e3f",
      "type": "private",
      "participants": [
        {
          "userId": 4,
          "name": "Анна Шатова",
          "avatar": require('@/assets/img/UserIcon2.jpg'),
          "isOnline": true,
          "lastSeen": "2024-01-25T14:30:00Z"
        },
        {
          "userId": 1002,
          "name": "Василий Николаев",
          "avatar": require('@/assets/img/UserIcon.jpg'),
          "isOnline": false,
          "lastSeen": "2024-01-25T13:15:00Z",
          "status": "online"
        }
      ],
      "messages": {
        "total": 34,
        "unread": 2,
        "grouped": [
          {
            "date": "2024-01-25",
            "groups": [
              {
                "time": "09:35",
                "userId": 4,
                "messages": [
                  {
                    "messageId": "msg_001",
                    "text": "Доброе утро! Ты уже проснулась?",
                    "timestamp": "2024-01-25T09:35:10Z",
                    "status": "read",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_002",
                    "text": "Хотел спросить про планы на выходные",
                    "timestamp": "2024-01-25T09:35:45Z",
                    "status": "read",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "09:36",
                "userId": 1002,
                "messages": [
                  {
                    "messageId": "msg_003",
                    "text": "Доброе! Да уже на работе",
                    "timestamp": "2024-01-25T09:36:20Z",
                    "status": "read",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "09:38",
                "userId": 4,
                "messages": [
                  {
                    "messageId": "msg_004",
                    "text": "Ого, рано сегодня",
                    "timestamp": "2024-01-25T09:38:05Z",
                    "status": "read",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "10:15",
                "userId": 1002,
                "messages": [
                  {
                    "messageId": "msg_005",
                    "text": "Слушай, а ты не помнишь, какой фильм нам советовал Коля?",
                    "timestamp": "2024-01-25T10:15:30Z",
                    "status": "read",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "10:17",
                "userId": 4,
                "messages": [
                  {
                    "messageId": "msg_006",
                    "text": "Кажется, 'Остров проклятых'",
                    "timestamp": "2024-01-25T10:17:15Z",
                    "status": "read",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_007",
                    "text": "Там Леонардо ДиКаприо играет",
                    "timestamp": "2024-01-25T10:17:42Z",
                    "status": "read",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_008",
                    "text": "Очень атмосферный триллер",
                    "timestamp": "2024-01-25T10:17:58Z",
                    "status": "read",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "10:19",
                "userId": 1002,
                "messages": [
                  {
                    "messageId": "msg_009",
                    "text": "Точно! Давно хотела его пересмотреть",
                    "timestamp": "2024-01-25T10:19:10Z",
                    "status": "read",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "12:30",
                "userId": 1002,
                "messages": [
                  {
                    "messageId": "msg_010",
                    "text": "Кстати, как твой проект? Сдал отчёт?",
                    "timestamp": "2024-01-25T12:30:05Z",
                    "status": "read",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_011",
                    "text": "Очень интересно, чем всё закончилось",
                    "timestamp": "2024-01-25T12:30:30Z",
                    "status": "read",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "12:45",
                "userId": 4,
                "messages": [
                  {
                    "messageId": "msg_012",
                    "text": "Ой, только что с защиты",
                    "timestamp": "2024-01-25T12:45:20Z",
                    "status": "read",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_013",
                    "text": "Всё прошло отлично! Пятёрка 🎉",
                    "timestamp": "2024-01-25T12:45:35Z",
                    "status": "read",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_014",
                    "text": "https://example.com/photo_celebrate.jpg",
                    "timestamp": "2024-01-25T12:45:58Z",
                    "status": "read",
                    "type": "image",
                    "mediaUrl": "https://example.com/photo_celebrate.jpg",
                    "mediaThumbnail": "https://example.com/photo_celebrate_thumb.jpg"
                  }
                ]
              },
              {
                "time": "12:47",
                "userId": 1002,
                "messages": [
                  {
                    "messageId": "msg_015",
                    "text": "Поздравляю! 🥳",
                    "timestamp": "2024-01-25T12:47:10Z",
                    "status": "read",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_016",
                    "text": "",
                    "timestamp": "2024-01-25T12:47:22Z",
                    "status": "read",
                    "type": "sticker",
                    "stickerId": "congrats_001",
                    "stickerUrl": "https://example.com/stickers/congrats.gif"
                  }
                ]
              },
              {
                "time": "14:00",
                "userId": 4,
                "messages": [
                  {
                    "messageId": "msg_017",
                    "text": "Спасибо! Может отметим вечером?",
                    "timestamp": "2024-01-25T14:00:15Z",
                    "status": "read",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "14:05",
                "userId": 1002,
                "messages": [
                  {
                    "messageId": "msg_018",
                    "text": "С удовольствием! Во сколько и где?",
                    "timestamp": "2024-01-25T14:05:30Z",
                    "status": "read",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "14:06",
                "userId": 4,
                "messages": [
                  {
                    "messageId": "msg_019",
                    "text": "Давай в 19:00 в 'У Грека'?",
                    "timestamp": "2024-01-25T14:06:10Z",
                    "status": "read",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_020",
                    "text": "У них там новая терраса открылась",
                    "timestamp": "2024-01-25T14:06:40Z",
                    "status": "read",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "14:08",
                "userId": 1002,
                "messages": [
                  {
                    "messageId": "msg_021",
                    "text": "Отличная идея! Люблю это место",
                    "timestamp": "2024-01-25T14:08:15Z",
                    "status": "read",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_022",
                    "text": "Только давай на 20:00? У меня совещание может задержать",
                    "timestamp": "2024-01-25T14:08:45Z",
                    "status": "read",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "14:10",
                "userId": 4,
                "messages": [
                  {
                    "messageId": "msg_023",
                    "text": "Без проблем, в 20:00 так в 20:00",
                    "timestamp": "2024-01-25T14:10:20Z",
                    "status": "read",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_024",
                    "text": "Я пока меню изучу, говорят у них новый шеф-повар",
                    "timestamp": "2024-01-25T14:10:50Z",
                    "status": "read",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "18:30",
                "userId": 1002,
                "messages": [
                  {
                    "messageId": "msg_025",
                    "text": "Я уже выезжаю, буду минут через 40",
                    "timestamp": "2024-01-25T18:30:15Z",
                    "status": "delivered",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_026",
                    "text": "Пробок много, но успеваю",
                    "timestamp": "2024-01-25T18:30:45Z",
                    "status": "delivered",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "18:45",
                "userId": 4,
                "messages": [
                  {
                    "messageId": "msg_027",
                    "text": "Окей, я уже на месте, столик занял",
                    "timestamp": "2024-01-25T18:45:10Z",
                    "status": "delivered",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_028",
                    "text": "Терраса шикарная, вид на закат 🔥",
                    "timestamp": "2024-01-25T18:45:35Z",
                    "status": "delivered",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_029",
                    "text": "https://example.com/photo_sunset.jpg",
                    "timestamp": "2024-01-25T18:45:58Z",
                    "status": "delivered",
                    "type": "image",
                    "mediaUrl": "https://example.com/photo_sunset.jpg",
                    "mediaThumbnail": "https://example.com/photo_sunset_thumb.jpg"
                  }
                ]
              },
              {
                "time": "19:15",
                "userId": 1002,
                "messages": [
                  {
                    "messageId": "msg_030",
                    "text": "Какая красота! Уже паркуюсь",
                    "timestamp": "2024-01-25T19:15:20Z",
                    "status": "delivered",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_031",
                    "text": "Заодно и аудиосообщение тебе отправила с мыслями о новом проекте, послушай пока ждёшь",
                    "timestamp": "2024-01-25T19:15:48Z",
                    "status": "delivered",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_032",
                    "text": "",
                    "timestamp": "2024-01-25T19:15:58Z",
                    "status": "delivered",
                    "type": "voice",
                    "audioUrl": "https://example.com/audio/voice_msg_032.ogg",
                    "audioDuration": 45
                  }
                ]
              },
              {
                "time": "19:18",
                "userId": 4,
                "messages": [
                  {
                    "messageId": "msg_033",
                    "text": "Прослушал, интересные мысли! Давай обсудим за ужином",
                    "timestamp": "2024-01-25T19:18:30Z",
                    "status": "delivered",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "19:20",
                "userId": 1002,
                "messages": [
                  {
                    "messageId": "msg_034",
                    "text": "Иду 🚶‍♀️",
                    "timestamp": "2024-01-25T19:20:15Z",
                    "status": "sent",
                    "type": "text"
                  }
                ]
              }
            ]
          },
          {
            "date": "2024-01-26",
            "groups": [
              {
                "time": "09:05",
                "userId": 1002,
                "messages": [
                  {
                    "messageId": "msg_035",
                    "text": "Привет! Спасибо за вчерашний вечер, было супер!",
                    "timestamp": "2024-01-26T09:05:10Z",
                    "status": "delivered",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "09:07",
                "userId": 4,
                "messages": [
                  {
                    "messageId": "msg_036",
                    "text": "Привет! Мне тоже очень понравилось",
                    "timestamp": "2024-01-26T09:07:20Z",
                    "status": "delivered",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_037",
                    "text": "Надо будет повторить в эти выходные",
                    "timestamp": "2024-01-26T09:07:45Z",
                    "status": "delivered",
                    "type": "text"
                  },
                  {
                    "messageId": "msg_038",
                    "text": "Может в кино сходим?",
                    "timestamp": "2024-01-26T09:07:58Z",
                    "status": "sent",
                    "type": "text"
                  }
                ]
              },
              {
                "time": "09:08",
                "userId": 1002,
                "messages": [
                  {
                    "messageId": "msg_039",
                    "text": "Давай! Давно не были",
                    "timestamp": "2024-01-26T09:08:30Z",
                    "status": "sent",
                    "type": "text"
                  }
                ]
              }
            ]
          }
        ]
      },
      "dialogInfo": {
        "createdAt": "2024-01-15T08:00:00Z",
        "lastMessageAt": "2024-01-25T10:32:45Z",
        "pinned": false,
        "muted": false,
        "mutedUntil": null,
        "folder": "inbox",
        "color": "#4CAF50"
      }
    }
  },
  "meta": {
    "requestId": "req_789xyz",
    "timestamp": "2024-01-25T14:35:22Z",
    "responseTime": 156
  }
}
</script>
<style lang="scss">
.chat {
  height: calc(100% - 68px);
  border: 1px solid blue;
  justify-content: flex-end;
  row-gap: 20px;
}
</style>