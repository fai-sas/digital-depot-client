export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Digital DIY Depot',
  description: 'Make beautiful websites regardless of your design experience.',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Posts',
      href: '/posts',
    },
    {
      label: 'Contact',
      href: '/contact',
    },

    {
      label: 'About',
      href: '/about',
    },
    // {
    //   label: 'Login',
    //   href: '/login',
    // },
    // {
    //   label: 'Register',
    //   href: '/register',
    // },
  ],
  navMenuItems: [
    {
      label: 'Dashboard',
      href: '/admin-dashboard',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    // github: 'https://github.com/nextui-org/nextui',
    // twitter: 'https://twitter.com/getnextui',
    // docs: 'https://nextui.org',
    // discord: 'https://discord.gg/9b6yyZKmH4',
    // sponsor: 'https://patreon.com/jrgarciadev',
  },
}
