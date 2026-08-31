import type { ImageSourcePropType } from 'react-native';

const cappuccino = require('../../assets/products/cappuccino.png');
const matchaStrawberry = require('../../assets/products/matcha-strawberry.png');
const bumble = require('../../assets/products/bumble.png');

export const productImages: Record<string, ImageSourcePropType> = {
  cappuccino,
  latte: cappuccino,
  'flat-white': cappuccino,
  v60: cappuccino,
  cocoa: cappuccino,
  'classic-raf': cappuccino,
  bumble,
  'ice-latte': bumble,
  'espresso-tonic': bumble,
  'peach-passion': bumble,
  'barberry-pomegranate': bumble,
  'matcha-strawberry': matchaStrawberry,
  'matcha-latte': matchaStrawberry,
  'matcha-orange': matchaStrawberry,
};
