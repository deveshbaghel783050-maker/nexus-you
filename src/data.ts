import { MenuItem, QuizQuestion } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'edamame-avo',
    name: 'Edamame Avo Toast',
    price: 575.00,
    description: 'Thick-cut artisanal sourdough smeared with zesty edamame purée and dynamic fresh avocado fans. Styled with toasted organic pumpkin seeds, micro-greens, and a dash of lime dust.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwTwuLZdc3KmizTkGMaoaaCig0VjMBKX3QNS62j8i0bvGJxlscsLh1eCc8iPscT1HFuKK0PxOaqzzx3eimo9ZO_AWSR-CGD51rBiUXQWhdFk2bnI717P1u_sxGLQishGHGbUOIYJRAj_OEgu3WmhPMV558Qx9XduLeOPfeySaNY_p9QMRu6T-wJr9lu_QPxdVGGwGjyBWEw4hOCS_yFhQbkNHi7aoR1BdtA2kGCsIN6fCu3R6WuASKGGpdBm4jCBPVIUkmBMLIdd8',
    category: 'breakfast',
    tags: ['Vegan', 'Signature', 'House Special'],
    customizable: true,
    customizations: [
      {
        title: 'Choose Sourdough',
        required: true,
        options: [
          { name: 'Traditional Wild Sourdough', price: 0 },
          { name: 'Gluten-Free Seeded Bread', price: 40 },
          { name: 'Multigrain Rye Sourdough', price: 20 },
        ]
      },
      {
        title: 'Add-ons',
        required: false,
        options: [
          { name: 'Chili Poached Egg', price: 50 },
          { name: 'Whipped Greek Feta', price: 80 },
          { name: 'Extra Smashed Avocado', price: 100 },
        ]
      }
    ]
  },
  {
    id: 'chilli-fried-egg',
    name: 'Chilli Fried Egg Avo Toast',
    price: 550.00,
    description: 'Fanned avocado on our toasted signature sourdough, crowned with a perfectly running organic fried egg crisped in house-infused Sichuan chili crunch and raw coriander sprouts.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc_SYJUJY-8rrUgzOf2LWFy6pLy0ulbtx4wJD3JRzc5lfELI-2FeMyNK6vfjy-0EvReF7uCaNTaSSJwL89Uafq2BGfMesHRA41wSfDV5meGQYRAT9_a-JljWexsF1wLQj0EFIOCP07RzbyR16IMoHqpqo_Jgk0Q48FK5-qoPIeWCu89BgNSrje0OkkqLu8FBfBlDZk80CY55qR1DV0o3-FFs1S2tR-FXdZmpeEZT3hrX9FXLv551CDuAaoJbbIOyMxaMWP6Jw7mLc',
    category: 'breakfast',
    tags: ['House Special'],
    customizable: true,
    customizations: [
      {
        title: 'Choose Sourdough',
        required: true,
        options: [
          { name: 'Traditional Wild Sourdough', price: 0 },
          { name: 'Gluten-Free Seeded Bread', price: 40 },
        ]
      },
      {
        title: 'Egg Style',
        required: true,
        options: [
          { name: 'Runny Sunny Side Up', price: 0 },
          { name: 'Soft Medium Fried', price: 0 },
          { name: 'Double Egg Swap', price: 60 },
        ]
      }
    ]
  },
  {
    id: 'kafir-lime-avo',
    name: 'Kafir Lime Avo Toast',
    price: 525.00,
    description: 'Whipped organic goat cheese and zesty avocado laced with local Kafir lime leaf extract, finished with sun-dried Italian cherry tomatoes, cold-pressed olive oil, and mint petals.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn5igfIqtOgRtk1xzTGMClDTMF6S6CI4pWZ23Rmxcy4zAsmJKudyBpYJag1XTfFr-oJFUMAYPxIYPN9LnesncIbx7t8021PTaMuW3VpNeQo8HRrWb6NTCXm5rsNkUBkVQBcL0HUbtoz0GXE9Rn6p4ZlVeLpN09gme6fTuhZtXcvUXRez6u7TEIp7XJpKJZMP9_Y_VzLQxhZGsaIkfoVnE4f6508eOH0jXl8ls63dczE_nyulHof8ZirJjFV3D3Jm-613an0F89uMw',
    category: 'breakfast',
    tags: ['Signature'],
    customizable: true,
    customizations: [
      {
        title: 'Choose Sourdough',
        required: true,
        options: [
          { name: 'Traditional Wild Sourdough', price: 0 },
          { name: 'Gluten-Free Seeded Bread', price: 40 },
        ]
      }
    ]
  },
  {
    id: 'truffle-mushroom',
    name: 'Truffle Mushroom Toast',
    price: 625.00,
    description: 'Wild forest shiitake and oyster mushrooms caramelized with garlic and thyme on charred sourdough, glazed with top-tier Italian black truffle extract and sesame seed sprinkles.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB43qjSFmVI3p5qzfRZtzq-vmmkBj_hv7jb1fcKnuTHwOgLgzCNqoSgN-m4Dy5yg4MfFXIQNXsPq3g1_F3hiniq3HBh3VGscJLpO7n1R9S5GeFFLl45f_0rbh4YZ7oPk-xVxqzC8m1wJex8Y7qDY4XDBHZhqfmbJPf16EM8hkFKXGU24q26c4a8EnbIbgZbHWmBYqOlDYi0jsEypm_87viD652GZhhTtNnlVhY09kBQMqtsbH8ctn_981F3NCw4ECt2Xuv-ngHrGrs',
    category: 'breakfast',
    tags: ['Signature'],
    customizable: true,
    customizations: [
      {
        title: 'Choose Sourdough',
        required: true,
        options: [
          { name: 'Traditional Wild Sourdough', price: 0 },
          { name: 'Gluten-Free Seeded Bread', price: 40 },
        ]
      }
    ]
  },
  {
    id: 'turkish-eggs',
    name: 'Turkish Eggs (Cilbir)',
    price: 595.00,
    description: 'Two poached farm eggs resting on a velvety base of warm, garlic-infused Greek yogurt. Bathed in a spicy mint chili melted butter lather, served alongside artisanal crusty toast.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALR88CzdBHk0PIpiD9RM2EMTVJJFIokbmUdM09GOQnvhPtsvydKvx202iYVI3DYWzZsRD7nRjK1aEQx9i_CLRmg1feIaMyyliTH6P5nXcqAD5S4YscPXQ5vvSMNn8Zsr3FIpQVqiJi1Hg0PLQAt_q5HY3APyvOv0lu-c3OR76XAURK6BibONe3o4gu85AlCjToH-dPgAsH-Qdqsb5j06-pxz5VGYpILIjKYrhZia--bQjB0aUtbiBixuNC9N9XbGEq8-mcGQ7RANU',
    category: 'breakfast',
    tags: ['Classic', 'House Special'],
    customizable: true,
    customizations: [
      {
        title: 'Extra Dipping Bread',
        required: false,
        options: [
          { name: 'One Sourdough Slice', price: 50 },
          { name: 'Two Sourdough Slices', price: 90 },
        ]
      }
    ]
  },
  {
    id: 'chawanmushi',
    name: 'Japanese Chawanmushi',
    price: 450.00,
    description: 'Beautifully silky, steam-poached traditional dashi egg pudding of cloud-like consistency, infused with white soy sauce, loaded with delicate shimeji mushrooms and spring onion locks.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4Mo4SmwZSIIfP1L0WsJZXB-kE2mt1LIkOqCkeVnwL-Io8zUUVOitgGhph5pGIQpx2Vat8BMXwx7DcFdsEwzbO9FABdQ9rAewAnAm4xideqVVzTkAacAiyZ5HI0MgI_JOnh2EeAnXqzf67GZzQu4qfxOJaR98oc2YpW4rVsA9x3GqsN-81KOXvXJJwoE0pG2Fx-LmI27rG_EtNJvhNVTkjKVykRGYfI9U2UdhCXX-cUezs9q6t1q-RNbdSKers08eI2uEGHHgspY4',
    category: 'breakfast',
    tags: ['Classic'],
    customizable: false
  },
  {
    id: 'salmon-poke',
    name: 'Poke Bowl With Salmon',
    price: 675.00,
    description: 'Luxe cubes of premium Norwegian pink salmon layered with edamame pods, ripe avocado wedges, pickled root ginger, crisp radish wheels and toasted black nori over slow-cooked sesame brown rice.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrg1YJHzWCgqbAiK3Qjq5jD2DgYVnwIgfLK5FVFSFS5BIYQoPacDdeiLrPKQglTK6V_7yvNdut1zqr0jWgrdOXnpEWn9yJa30vtqX_uBs_p5KAPSrrumTV42JZmxHbNku8AsM4SfEUtxnjXP9uwDcMzkIW3ER8LAupiZZ2ISbzLN67czPvJ0URpO3jQQ4Pz3uPFT6zs6X08PGFfA-NBXAF66WtdBM8eoQWojAD-AsxdKZ5Zbc0WoG9kAbF_PckdK2sl8LRmhbN_PA',
    category: 'salads',
    tags: ['Signature'],
    customizable: true,
    customizations: [
      {
        title: 'Choose Protein Option',
        required: true,
        options: [
          { name: 'Norwegian Cured Salmon', price: 0 },
          { name: 'Crispy Grilled Tofu (Vegan Style)', price: -100 },
          { name: 'Double Salmon Protein (+60g)', price: 220 },
        ]
      }
    ]
  },
  {
    id: 'signature-noodles',
    name: 'YOU Signature Special',
    price: 450.00,
    description: 'Wheat noodles hand-thrown and stir-fried in cast iron with aromatic toasted sesame, Sichuan soy, seasonal crunchy greens, finished with gold garlic crispy-bits and coriander ribbons.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClp9mokXsJKFjxZUppXleCHNV-EMjGl6cmctRsgqtiv2wsz-kmv5Hi3UzcQgQ-q-U1CN6YO44vjUV_usjq12B9QwzHLb5UOhjApfbFsElkEo4Ber93ew5HlHlf2XlXANS3Yh9lQ2rIAsXsBJOwlovHXY32QM2NBr_my8gfzDLZhBqmY82Q2ZpIFzwXVe9kPxYP6e-a1YZecC7R3saHfn4VlyGHtHiJgoh3ruikW6MrqpmcelVsY02r3sEIzR5dfD8DzDQgfH6HoHc',
    category: 'salads',
    tags: ['House Special'],
    customizable: true,
    customizations: [
      {
        title: 'Spiciness',
        required: true,
        options: [
          { name: 'Curated Medium Heat', price: 0 },
          { name: 'Mild & Soft Spice', price: 0 },
          { name: 'YOU Red Fiery (Sichuan Style)', price: 0 },
        ]
      }
    ]
  },
  {
    id: 'wellness-bowl',
    name: 'KASGNJ Wellness Bowl',
    price: 380.00,
    description: 'Ancient grain quinoa, roasted butter-squash crescents, steamed broccoli tips, baby microgreens, organic pomegranate jewels, drizzled with warm, stone-ground ginger-tahini extract.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    category: 'salads',
    tags: ['Vegan', 'Gluten-Free'],
    customizable: false
  },
  {
    id: 'french-croissant',
    name: 'Classic French Croissant',
    price: 150.00,
    description: 'Golden-brown, multi-layered puff paste croissant flaky outside with warm honeycomb crumb within, made with premium fermented butter and served with local wild-berry preserves.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmpcQvvdg2UyPQQ7R5ugZD3gWUPXlf8__gfvSK3n4A0cAmsMu6fGquC8hmV804ubrwfHoXzs3GxaE2hjgD89axYJUVIulm6qWa_1EoLq9rbQVowCk5OJLsNgz2FRrxISu_89Etw3jD-XlreZkmpyoTrXvu4Khce7x55ikjdBOymIITYJ0X9hZ5gy-ocnQZGwD7Ma4T65FgKzhOk2BXk0HSfQW3Q2Fr8_DWssahPYdwyQSYDIA2pq9Uj2gGDgLRWh1XegGUhcgDbrI',
    category: 'pastries',
    tags: ['Classic'],
    customizable: true,
    customizations: [
      {
        title: 'Toast Options',
        required: false,
        options: [
          { name: 'Serve Warm (Highly Recommended)', price: 0 },
          { name: 'Room Temperature', price: 0 },
        ]
      }
    ]
  },
  {
    id: 'chocolate-cupcake',
    name: 'Double Cocoa Cupcake',
    price: 70.00,
    description: 'Moist dark cocoa flourless cake containing a hot chocolate fudge core, frosted with creamy dark chocolate silk glaze, finished with hand-shaved raw cacao fragments.',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=600',
    category: 'pastries',
    tags: ['Classic'],
    customizable: false
  },
  {
    id: 'ceremonial-matcha',
    name: 'Matcha Latte (Ceremonial)',
    price: 320.00,
    description: 'Premium, stone-ground ceremonial matcha harvested in Uji, Japan, whisked with traditional bamboo chasen at 80°C and poured over perfectly silky, steamed plant milk.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    tags: ['Matcha', 'Signature'],
    customizable: true,
    customizations: [
      {
        title: 'Milk Selection',
        required: true,
        options: [
          { name: 'Steamed Oat Milk', price: 50 },
          { name: 'Whole Cow Milk', price: 0 },
          { name: 'Organic Almond Milk', price: 60 },
          { name: 'Coconut Whipped Milk', price: 60 },
        ]
      },
      {
        title: 'Sweetness',
        required: true,
        options: [
          { name: 'Unsweetened (Authentic Matcha)', price: 0 },
          { name: 'Organic Wild Honey', price: 20 },
          { name: 'Stevia Extract', price: 0 },
        ]
      }
    ]
  },
  {
    id: 'tiramisu-latte',
    name: 'Tiramisu Iced Latte',
    price: 375.00,
    description: 'Double shot of house-roasted espresso shaken with chilled organic milk, crowned with a dollop of whipped sweet, fluffy mascarpone cheese curd and dusted with high-end Belgian cocoa.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    tags: ['Signature'],
    customizable: true,
    customizations: [
      {
        title: 'Espresso Shots',
        required: true,
        options: [
          { name: 'Double Shot (Standard)', price: 0 },
          { name: 'Triple Shot (Strong)', price: 40 },
          { name: 'Decaf Espresso', price: 20 },
        ]
      }
    ]
  },
  {
    id: 'wellness-iced-matcha',
    name: 'Sparkling Yuzu Matcha',
    price: 340.00,
    description: 'Ceremonial Japanese matcha layered over sweet sparkling tonic water, infused with cold-pressed yuzu fruit juice and fresh bruised spearmint leaves for ultimate clarity.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    tags: ['Matcha', 'Signature', 'House Special'],
    customizable: false
  }
];

export const CAFE_SECTIONS = [
  {
    id: 'atrium' as const,
    name: 'Sky-light Atrium',
    tagline: 'Sun-drenched, airy space directly under the grand skylight ceiling.',
    capacityNotes: 'Best for 2-4 guests with warm daylight rays.',
    tables: [
      { id: 'A1', label: 'Table 1', seats: 2, status: 'available' },
      { id: 'A2', label: 'Table 2', seats: 4, status: 'available' },
      { id: 'A3', label: 'Table 3', seats: 2, status: 'occupied' },
      { id: 'A4', label: 'Table 4', seats: 6, status: 'available' },
    ]
  },
  {
    id: 'cozy-corners' as const,
    name: 'The Cozy Corner Couch',
    tagline: 'Plush drapes, comfortable alcove benching, and retro wall telephones.',
    capacityNotes: 'Ideal for slow conversations, reading, or quiet coffee pairing.',
    tables: [
      { id: 'C1', label: 'Nook 1', seats: 2, status: 'available' },
      { id: 'C2', label: 'Nook 2', seats: 3, status: 'available' },
      { id: 'C3', label: 'Nook 3 (Retro Phone)', seats: 2, status: 'available' },
    ]
  },
  {
    id: 'panda-niches' as const,
    name: 'Panda Claster Niches',
    tagline: 'Facing the majestic hand-textured lime plaster wall with embedded shelves containing decorative figurines.',
    capacityNotes: 'A delightful artistic perspective.',
    tables: [
      { id: 'P1', label: 'Niche Front 1', seats: 2, status: 'occupied' },
      { id: 'P2', label: 'Niche Front 2', seats: 4, status: 'available' },
      { id: 'P3', label: 'Niche Front 3', seats: 2, status: 'available' },
    ]
  },
  {
    id: 'wellness-matcha' as const,
    name: 'Wellness Matcha Counter',
    tagline: 'Bar or table seats looking over our premium ceremonial slow-matcha whisking station.',
    capacityNotes: 'Engaging, interactive wellness journey.',
    tables: [
      { id: 'W1', label: 'Counter Spot 1', seats: 1, status: 'available' },
      { id: 'W2', label: 'Counter Spot 2', seats: 1, status: 'available' },
      { id: 'W3', label: 'Counter Spot 3', seats: 1, status: 'occupied' },
      { id: 'W4', label: 'Matcha Side Table', seats: 2, status: 'available' },
    ]
  }
];

export const TIME_SLOTS = [
  '08:00 AM - 09:30 AM',
  '09:30 AM - 11:00 AM',
  '11:00 AM - 12:30 PM',
  '12:30 PM - 02:00 PM',
  '03:30 PM - 05:00 PM',
  '05:00 PM - 06:30 PM',
  '06:30 PM - 08:00 PM',
  '08:00 PM - 09:30 PM',
  '09:30 PM - 11:00 PM',
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'energy',
    text: 'What kind of energy are you seeking layout for today?',
    options: [
      { text: 'Slow, peaceful, and grounded wellness', value: 'grounded', tagMatch: 'Ceremonial' },
      { text: 'Vibrant, zesty sparkling refresh', value: 'sparkling', tagMatch: 'Yuzu' },
      { text: 'Comforting, rich and dessert-like decadence', value: 'rich', tagMatch: 'Tiramisu' },
    ]
  },
  {
    id: 'mood',
    text: 'How is the environment of KASGNJ treating you today?',
    options: [
      { text: 'A warm sunny day, seeking something iced and chilled', value: 'iced', tagMatch: 'Iced' },
      { text: 'A slow cozy breeze, seeking warm therapeutic steam', value: 'warm', tagMatch: 'Latte' },
    ]
  },
  {
    id: 'taste',
    text: 'Which flavour profile satisfies your soul best right now?',
    options: [
      { text: 'Deep, earthy green tea notes', value: 'earthy', tagMatch: 'Matcha' },
      { text: 'Sweet chocolate and rich coffee crema blend', value: 'sweet', tagMatch: 'Tiramisu' },
      { text: 'Zesty lemon, mint sparkle citrus notes', value: 'citrus', tagMatch: 'Yuzu' },
    ]
  }
];

export const MOKAI_GALLERY_SPACES = [
  {
    id: 'space-mures',
    title: 'Experience YOU Interior',
    description: 'Warm sandy plaster walls constructed using clay mud from Maharashtra merged with gallery-style frames of local Mumbai creators.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiYLwZjPUPmfVXvZUTtZy_CwIp875H2jcYO2lSajin07MkcLyaOcb4EBSE-OFnPAfvg-GPbVMgVL9gWoQcdOTHtxCOUj-bt6T-iVc4hTRkkZQpkpRvDCvn8GJeEvGymN8eyf_KxOmFTgMPx1zii_v9trZhrOjtjRLAphfkGoXRqhxbhMOp-YGQJgtTOpLK-BkMgz49w8d35yszFYW-RTem1xEM5q60SV1eUEOnRuR_YXJI2oOi-zWnkMN5HXSlPVjXe1Dgg6kSHvs',
    spots: [
      { x: 25, y: 35, title: 'Experience YOU Wall', txt: 'Curated signage detailing Mokai’s journey from a humble local dream to a KASGNJ coffee sanctuary.' },
      { x: 50, y: 55, title: 'The Photo Frames', txt: 'Local creators showcase! Frames of the workers, the soil creators, and the local KASGNJ community neighbors.' },
      { x: 75, y: 70, title: 'Sand Textured Plaster', txt: 'Lime-wash and sea sand mixed to create the earthy texture of the building, keeping it naturally breezy and cool.' }
    ]
  },
  {
    id: 'pandas-niche',
    title: 'The Figurine Niches',
    description: 'Hand-carved curved plaster alcoves illuminated in warm hues, holding sculptural pandas and pigs that symbolize lighthearted rest.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLsW95r43eM4V7lktTodKnkeBeXrevsniFmZXm1m8GCYPaP1Rv407cSg8ZyfP9Kv6PAzByvKJVjnl4B3brCoJVKASwump5zCLuaPL_6XoOnJ58QtTXKb8iidJBhKpax1iMY-MyeBRPQJ5oc-OybB6RRno3mpfP75xr0Ae6arOrkeOaLLl-HMtB4YxIE6iRNOz7RQhz1uhagCT151Q53lGYVV2hhPSQxXlfKoL4tsqQeXDdVcomJJdctdr0Jsk_KcSRx_zSm23VdLI',
    spots: [
      { x: 30, y: 20, title: 'Artisanal Drippers', txt: 'Colored glass coffee filter cups used for pour-overs resting on warm backlit wooden display boards.' },
      { x: 35, y: 55, title: 'The Pandas', txt: 'Miniature clay sculpted panda figures resting to communicate slow, peaceful living.' },
      { x: 45, y: 80, title: 'The Piggy Banks', txt: 'Vibrant salmon-pink piggy figures nested in custom curved recessed cavities.' }
    ]
  },
  {
    id: 'our-grind-gradiant',
    title: 'The Staircase Hierarchy',
    description: 'Our core belief mural printed directly onto sand walls: Fire, Water, Sieve, Coffee, and Coffee Flow indicating the alchemy of brewing.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiYLwZjPUPmfVXvZUTtZy_CwIp875H2jcYO2lSajin07MkcLyaOcb4EBSE-OFnPAfvg-GPbVMgVL9gWoQcdOTHtxCOUj-bt6T-iVc4hTRkkZQpkpRvDCvn8GJeEvGymN8eyf_KxOmFTgMPx1zii_v9trZhrOjtjRLAphfkGoXRqhxbhMOp-YGQJgtTOpLK-BkMgz49w8d35yszFYW-RTem1xEM5q60SV1eUEOnRuR_YXJI2oOi-zWnkMN5HXSlPVjXe1Dgg6kSHvs', // Handled fallback
    spots: [
      { x: 40, y: 30, title: 'Coffee Flow', txt: 'The top layer: smooth liquid dripping into custom ceramic cups.' },
      { x: 40, y: 50, title: 'Sieve & Water', txt: 'The filtration process where temperature controls sweet acidity extraction.' },
      { x: 40, y: 75, title: 'Fire Base', txt: 'The heat driving roasting intensity and slow chemical breakdown.' }
    ]
  },
  {
    id: 'cozy-corner-phone',
    title: 'The Dining Alcove',
    description: 'A cozy daybed couch with custom typography pillows, flanked by lavish cream-colored ruffled curtains and vintage telephones.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi4gEIBebQmXqYIKGPAJ13rTZpFo3SelcHgS8aiANrfRxch5i5yNekWc93HH-aE0XL7YQuqaKI-REcpOc4eBGXzHll9W4yRH5SHTivCWwG6RZ0dfx2NPhRDZ1hMV9sPzcOHsLgBFBGoZcf0ZcRNlmPCudSPkiB-CObdqTKh-2KhS8oDu3QLFFMEZaHsLZ0w6zPwvm3R7cBpkR7tMVBGZUC4oHHw2v1lJ9MVRgC2quQyPYY6e017icPr-JoNzNIBnTp0kvms3zdNfI',
    spots: [
      { x: 79, y: 64, title: 'The Landline Phone', txt: 'An antique operational landline. Pick it up to call our baristas instantly for another pour-over request!' },
      { x: 40, y: 64, title: 'The Pillows', txt: '"I love Naps", "Hot Brew", and organic cotton pillows stuffed alongside local coconut choir.' },
      { x: 19, y: 80, title: 'Cozy Daybed', txt: 'Our signature corner! Perfect to lounge, work, or share avo toasts with a loved one.' }
    ]
  }
];
