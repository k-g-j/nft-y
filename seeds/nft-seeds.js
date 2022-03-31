const { NFT } = require('../models')
const nftData = [
  {
    name: 'Pancake BABY',
    unique_name: 'pancakebaby',
    image:
      'https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/71100.svg',
    description:
      "Shalom! My name's Pancake BABY. I once peed on Confucius's cat. They had it coming. My friends describe me as despicable. It's... accurate. We can be friends, but keep the ultra purrsonal stuff to yourself, please.",
    users_name: 2,
  },
  {
    name: 'Pancake',
    unique_name: null,
    image:
      'https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/170875.svg',
    description:
      "Ciao! I'm Pancake. In high school, I was voted most likely to work at NASA. I like to listen to Justin Bieber while grooming. Don't judge me. We can be friends, but keep the ultra purrsonal stuff to yourself, please.",
    users_name: 3,
  },
  {
    name: 'Oil Bored Ape #00055',
    unique_name: 'oilboredape00055',
    image:
      'https://lh3.googleusercontent.com/9yU9YLAbzMPa52IH…YlK497N5Atx6U4Ih_RK-VRJ39D3YO8U6GIIcmSfc2bTBRWy2k',
    description:
      'Oil Bored Ape is the first "unofficial Bored Ape "… curves here. Each Oil Bored Ape costs 0.025 ETH.',
    users_name: 1,
  },
  {
    name: 'Lazy Lion - Stephen Curry',
    unique_name: null,
    image:
      'https://lh3.googleusercontent.com/tNeNBrHU0cQeK8MB…SERofMFsDrxXUzVzHHRsyEW_oVlpWcCK_CWEqrT804WQy5nyE',
    description: 'Lazy Lion NFT modeled after Stephen Curry',
    users_name: 2,
  },
  {
    name: 'Axie Infinity – Collecting and raising Axies',
    unique_name: 'AxieInfinity special token',
    image: 'https://cdn.marble.cards/images/cards/0/59/59-share.png?version=1',
    description:
      'Marble Card #59 with a unique link to https://axie… linked URL, same as when shared on social media.',
    users_name: 3,
  },
]
const seedNFTs = () => NFT.bulkCreate(nftData)
module.exports = seedNFTs