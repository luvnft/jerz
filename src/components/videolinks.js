const videolinks = [
  {
    id: 1,
    src: "https://ipfs.io/ipfs/bafybeib7evphrjx42ehg3yv4tycwmpgklrkobnsd4xqua7hx4ijzbl5uwm",
    fallbackSrc: "https://gateway.pinata.cloud/ipfs/bafybeib7evphrjx42ehg3yv4tycwmpgklrkobnsd4xqua7hx4ijzbl5uwm",
    address: "9402 Ventnor Avenue, Margate City, NJ 08402",
    what3wordsAddress: "///drew.axed.shelf",
    cryptoAddress: "0xAb...",
    tags: ["Commercial", "For Sale", "Prime Location"],
    description: `🏢 Prime Restaurant Commercial Space
📍 What3Words Address: ///drew.axed.shelf
💰 Accepting Crypto Payments
👍 Accepts Bitcoin $RNT
🔑 Wallet Address: 0xAbC...
🚇 Steps from subway station
🅿️ Ample parking available
📏 2,800 sq ft available`,
    externalLink: "https://www.bergerrealty.com/sale/593639.html?agent=tfb&limit=21&type=condo",
    price: {
      btc: 13,
      sats: 1380000000,
      usd: 1299000,
      display: "₿13.8 (1,380,000,000 sats ≈ $1,299,000)"
    }
  },
  {
    id: 2,
    src: "https://gateway.pinata.cloud/ipfs/bafybeibud7utlh4xmkdgxjbzdpccgzfnnqtbhukhdnt6omiwkf5quphvqi",
    address: "3101 Boardwalk #34012, Atlantic City, NJ 08401",
    what3wordsAddress: "///lace.light.scenes",
    cryptoAddress: "0xAb...",
    tags: ["Residental", "For Sale", "Prime Location"],
    description: `🏢 Prime Restaurant Commercial Space
📍 What3Words Address: ///lace.light.scenes
💰 Accepting Crypto Payments
👍 Accepts Bitcoin $RNT
🔑 Wallet Address: 0xAbC...
🚇 Steps from Atlantic City Boardwalk
🅿️ Ample parking available
📏 3,333 sq ft available`,
    externalLink: "https://www.zillow.com/homedetails/3101-Boardwalk-34012-Atlantic-City-NJ-08401/2066449456_zpid/",
    price: {
      btc: 63.17, // Rounded to 2 decimals
      sats: 6316666667,
      usd: 1895000,
      display: "₿63.17 (6,316,666,667 sats ≈ $1,895,000)"
    }
  },
  {
    id: 3,
    src: "https://gateway.pinata.cloud/ipfs/bafybeihkw4ojmy5tiajcrp55vclpyjhykm7pnpeyjv5nzqbdn766rhdgqa",
    address: "399 East Broad Street, Bridgeton, NJ ",
    what3wordsAddress: "///teeth.humid.feast",
    cryptoAddress: "1X2y3Z4W5V6U7T8J9K0L",
    tags: ["Retail", "Crypto", "For Rent"],
    description: `🏬 8.47% cap rate, Premier Retail Investment Opportunity 
📍 What3Words Address: ///teeth.humid.feast
💰 Pay with Bitcoin, 🪙 or any crypto!
👍 Accepts Bitcoin $RNT
🔑 Send payments to: 1X2y3Z4W5V6U7T8J9K0L
🌱 Energy-efficient building
✨ Newly Available for Lease!`,
    externalLink: "https://wolfcre.com/listing/399-east-broad-street-bridgeton-nj/",
    price: {
      btc: 0,
      sats: 0,
      usd: 0,
      display: "₿0.08 (8,000,000 sats ≈ $4,000/month)"
    }
  },
  {
    id: 4,
    src: "https://gateway.pinata.cloud/ipfs/bafybeihfqhninmzmnuduywxqcfk4hyny54ltwubtwulbpptnqulg3vfc4u",
    address: "1067 Totem Road, Bensalem, PA ",
    what3wordsAddress: "///nerve.open.boats",
    cryptoAddress: "bnb1q2w3e4r5t6y7u8i9o0p",
    tags: ["Luxury", "Restaurant", "Water View"],
    description: `Premier Bensalem Investment Opportunity
📍 What3Words Address: ///nerve.open.boats
💎 Accepts Binance Coin (BNB)
👍 Accepts Bitcoin $RNT
🔑 Wallet: bnb1q2w3e4r5t6y7u8i9o0p
🛁 3 Bedrooms, 3.5 Baths
🏊 Rooftop infinity pool
🌇 Panoramic city views`,
    externalLink: "https://wolfcre.com/listing/dockside-restaurant-1067-totem-road-bensalem-pa/",
    price: {
      btc: 8.75,
      sats: 875000000,
      usd: 350000,
      display: "₿8.75 (875,000,000 sats ≈ $350,000)"
    }
  },
  {
    id: 5,
    src: "https://gateway.pinata.cloud/bafybeiaflmuvctrgiqtuxmlme63fm675wxbf7dpsn54t7gsehvafbv5jc4",
    address: "2315-2319 North Broad Street
Philadelphia, PA 19132",
    what3wordsAddress: "///seated.prone.overnight",
    cryptoAddress: "0xTechPark789",
    tags: ["Office", "Co-Working", "Flexible"],
    description: `💻 5 Story building 12,789 SF SF on .33 acres
📍 What3Words Address: ///seated.prone.overnight
🪙 Pay with ETH or stablecoins
👍 Accepts Bitcoin $RNT
🔑 Wallet: 0xTechPark789
🚀 Ideal for startups
☕ On-site cafe & amenities
🔄 Month-to-month leases`,
    externalLink: "https://wolfcre.com/listing/2315-n-broad-street-philadelphia-pa/",
    price: {
      btc: 0.04,
      sats: 4000000,
      usd: 1600,
      display: "₿0.04 (4,000,000 sats ≈ $1,600/month)"
    }
  },
    {
    id: 6,
    src: "https://gateway.pinata.cloud/ipfs/bafybeiclyfsjebhtej5x2kywr2er2v2xrdwzb2gvktlqpoamcag4mkcala",
    address: "9-11 Black Horse Pike, Blackwood, NJ",
    what3wordsAddress: "///disown.bandstand.detection",
    cryptoAddress: "DAGHistoricPropertyXYZ",
    tags: ["Renovated", "Character", "Mixed-Use"],
    description: `🏛️ Historic Building - Mixed Use
📍 What3Words Address: ///disown.bandstand.detection
💰 Accepts 20+ cryptocurrencies
👍 Accepts Bitcoin $RNT
🔑 Wallet: DAGHistoricPropertyXYZ
🔄 Ground floor retail + upstairs offices
⚡ Fully renovated interiors
📜 Landmark designation`,
    externalLink: "https://wolfcre.com/listing/9-11-black-horse-pike-blackwood-nj/",
    price: {
      btc: 15,
      sats: 1500000000,
      usd: 600000,
      display: "₿15 (1,500,000,000 sats ≈ $600,000)"
    }
  }
];

export default videolinks;
