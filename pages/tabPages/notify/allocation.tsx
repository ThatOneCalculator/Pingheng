const allocation = props => {
  const data = props.data.item;
  const name = getName(data);
  const ifrenote = ifRenote(props);
  const text = getText(props, ifrenote);
  const actionring = switchActionRing(props);
  const res = {
    name: name,
    text: text,
    avatar: data.user.avatarUrl,
    actionring: actionring,
    userId: data.user.id,
  };
  return res;
};

const getName = (data: any) => {
  if (data.user.name != null) {
    return data.user.name;
  } else if (data.user.username && data.user.name == null) {
    return '@' + data.user.username;
  }
};

const ifRenote = (props: any) => {
  /*if (
    props.data.item.type === 'follow' ||
    props.data.item.type === 'followRequestAccepted' ||
    props.data.item.type === 'receiveFollowRequest' ||
    props.data.item.note.renoteId == null ||
    props.data.item.note.renoteId === void 0
  ) {
    return false;
  } else if (props.data.item.note.renoteId != null) {
    return true;
  } else {
    console.log('renote?');
    return true;
    //   return <Text style={{color: 'red'}}>???</Text>;
  }*/
  if (
    props.data.item.type === 'follow' ||
    props.data.item.type === 'followRequestAccepted' ||
    props.data.item.type === 'receiveFollowRequest'
  ) {
    return false;
  }
  if (
    props.data.item.note.renoteId === null ||
    props.data.item.note.renoteId === void 0
  ) {
    return false;
  } else if (props.data.item.note.renoteId != null) {
    return true;
  } else {
    return true;
  }
};

const getText = (props: any, renote: boolean) => {
  //return 'nihao';
  /*if (renote) {
    return 'renotetext';
  }*/
  switch (props.data.item.type) {
    case 'renote':
      // json位置の参考用　消さない
      //   console.log("333---");
      //   console.log(props["data"]["item"]["note"]["renote"]["text"]);
      //未実装: pollvote
      if (renote) {
        return 'リノートされました: ' + props.data.item.note.renote.text;
      } else {
        return props.data.item.note.text;
      }
    case 'follow':
      return 'フォローされました';
    case 'reply':
      return props.data.item.note.text;
    case 'reaction':
      /*   console.log("--");
              console.log(props["data"]["item"]["reaction"]);
              console.log(props["data"]["item"]["note"]["emojis"]);
              console.log("--");*/
      if (renote) {
        return props.data.item.note.renote.text;
      } else {
        return props.data.item.note.text;
      }

    case 'followRequestAccepted':
      return 'フォローリクエストが承認されました';
    case 'receiveFollowRequest':
      return 'フォローリクエストが来ています';
    case 'quote':
      //console.log("333---");
      //これは元ツイートの文章
      //console.log(props["data"]["item"]["note"]["renote"]["text"]);
      //  鍵アカウントのときはNullになるぽい？
      // いや　鍵外してもnullか ["note"]にそもそもないぽい　["data"]["item"]でもなし？　全部でもIDもtextもない　意味わからん　諦め
      //  console.log(props);
      return '引用リノートされました';
    case 'mention':
      return 'メンションされました';
    default:
      return '不明な通知';
  }
};

const switchActionRing = (props: any) => {
  switch (props.data.item.type) {
    case 'renote':
      // json位置の参考用　消さない
      //   console.log("333---");
      //   console.log(props["data"]["item"]["note"]["renote"]["text"]);
      //未実装: pollvote
      return {
        background: '#3eb585',
        icon: 'refresh-ccw',
      };
    case 'follow':
      return {
        background: '#296bd6',
        icon: 'user-plus',
      };
    case 'reply':
      return {
        background: '#2fcccc',
        icon: 'message-circle',
      };
    case 'reaction':
      return {
        background: '#eb9534',
        emojis: props.data.item.note.emojis,
        reaction: props.data.item.reaction,
      };

    case 'followRequestAccepted':
      return {
        background: '#293ad6',
        icon: 'user-check',
      };
    case 'receiveFollowRequest':
      return {
        background: '#563eb5',
        icon: 'users',
      };
    case 'quote':
      //console.log("333---");
      //これは元ツイートの文章
      //console.log(props["data"]["item"]["note"]["renote"]["text"]);
      //  鍵アカウントのときはNullになるぽい？
      // いや　鍵外してもnullか ["note"]にそもそもないぽい　["data"]["item"]でもなし？　全部でもIDもtextもない　意味わからん　諦め
      //  console.log(props);
      return {
        background: '#3ea9b5',
        icon: 'git-branch',
      };
    case 'mention':
      return {
        background: '#72b811',
        icon: 'at-sign',
      };
    default:
      return {
        background: '#d62951',
        icon: 'help-circle',
      };
  }
};

export default allocation;
