import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';

const chatClient = StreamChat.getInstance('dz5f4d5kzrue');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidGhyb2JiaW5nLXdhdGVyZmFsbC01IiwiZXhwIjoxNjQ0OTU0MzQ2fQ.2iC9eKNdMqCz5zj4mEVSsKqD6TIu_g4ea8WeBGbZGzw';

chatClient.connectUser(
  {
    id: 'throbbing-waterfall-5',
    name: 'throbbing',
    image: 'https://getstream.io/random_png/?id=throbbing-waterfall-5&name=throbbing',
  },
  userToken,
);

const channel = chatClient.channel('messaging', 'custom_channel_id', {
  // add as many custom fields as you'd like
  image: 'https://www.drupal.org/files/project-images/react.png',
  name: 'Talk about React',
  members: ['throbbing-waterfall-5'],
});

const App = () => (
  <Chat client={chatClient} theme='messaging light'>
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default App;