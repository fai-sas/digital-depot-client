export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Digital DIY Depot',
  description: 'Make beautiful websites regardless of your design experience.',

  // General navigation items for all users
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
  ],

  // Role-based navigation items
  navMenuItems: {
    public: [
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
    ],
    admin: [
      {
        label: 'Dashboard',
        href: '/admin-dashboard',
      },
      {
        label: 'Post Management',
        href: '/admin-dashboard/posts-management',
      },
      {
        label: 'User Management',
        href: '/admin-dashboard/user-management',
      },
      {
        label: 'Activity Log',
        href: '/admin-dashboard/activity-log',
      },
    ],
    user: [
      {
        label: 'Dashboard',
        href: '/dashboard',
      },
      {
        label: 'My Posts',
        href: '/dashboard/my-post',
      },
      {
        label: 'Follow Details',
        href: '/dashboard/follow-details',
      },
      {
        label: 'My Profile',
        href: '/dashboard/my-profile',
      },
    ],
  },

  links: {
    // github: 'https://github.com/your-repo',
    // twitter: 'https://twitter.com/your-twitter',
  },
}
