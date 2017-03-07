const links = [
  { rel: 'stylesheet', href: '/iconfont/material-icons.css' },
  { rel: 'stylesheet', type: 'text/css', href: '/fonts/fonts.css' },
  { rel: 'stylesheet', type: 'text/css', href: '/rich-editor/style.css' },
  { rel: 'icon', href: '/images/logo/mipmap-hdpi/ic_launcher.png' },
];

_.forEach(links, link => DocHead.addLink(link));
