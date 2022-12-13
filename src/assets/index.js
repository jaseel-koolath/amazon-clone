import carousel1 from './carousel1.jpg';
import carousel2 from './carousel2.jpg';
import carousel3 from './carousel3.jpg';
import carousel4 from './carousel4.jpg';
import carousel5 from './carousel5.jpg';
import carousel6 from './carousel6.jpg';
import carousel7 from './carousel7.jpg';
import kindle from './kindle.jpg';
import pets from './pets.jpg';
import returns from './returns.jpg';
import fitness from './fitness.jpg';
import beauty from './beauty.jpg';

export const carouselItems = [
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
  carousel6,
  carousel7,
];
export const exploreData = [
  {
    name: 'kindle',
    title: 'Kindle E readers',
    img: { kindle },
    link: 'Shop Now',
  },
  { name: 'pets', title: 'Shop Pet supplies', img: { pets }, link: 'See More' },
  {
    name: 'returns',
    title: 'Easy returns',
    img: { returns },
    link: 'Learn More',
  },
  {
    name: 'fitness',
    title: 'Get fit at home',
    img: { fitness },
    link: 'Explore Now',
  },
  { name: 'beauty', title: 'Beauty picks', img: { beauty }, link: 'Shop Now' },
];
