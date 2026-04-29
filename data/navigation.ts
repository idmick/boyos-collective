/**
 * @typedef {Object} NavigationItem
 * @property {string} label
 * @property {string} href
 */

export const homeNavigation = [
  { label: 'Soundsystem', href: '/soundsystem' },
  { label: 'Wonderland', href: '/wonderland' },
  { label: 'Contact', href: 'mailto:info@boyoscollective.nl' },
]

export const innerNavigation = [
  { label: 'Soundsystem', href: '/soundsystem' },
  { label: 'Wonderland', href: '/wonderland' },
  { label: 'Contact', href: 'mailto:info@boyoscollective.nl' },
]

export const footerNavigation = [
  { label: 'Soundsystem', href: '/soundsystem' },
  { label: 'Wonderland', href: '/wonderland' },
  { label: 'Instagram', href: 'https://www.instagram.com/boyos.soundsystem/' },
  { label: 'Soundcloud', href: 'https://soundcloud.com/boyos_soundsystem' },
  { label: 'RA', href: 'https://ra.co/dj/boyossoundsystem' },
  { label: 'Contact', href: 'mailto:info@boyoscollective.nl' },
]

export const getNavigationForPath = (path = '/') =>
  path === '/' ? homeNavigation : innerNavigation
