export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  specs: { label: string; value: string }[];
  features: string[];
  relatedProducts: string[]; // slugs of related products
  industries: string[]; // industry IDs this product serves
  metaTitle: string;
  metaDescription: string;
}

export const productsData: Product[] = [
  {
    id: 'pp-corrugated-boxes',
    slug: 'pp-corrugated-boxes',
    name: 'PP Corrugated Boxes',
    category: 'Packaging',
    tagline: 'Built to outlast cardboard by 50+ cycles.',
    description: 'Custom-designed from premium PP corrugated flute board. Moisture-resistant, superior strength-to-weight ratio, and fully collapsible for return logistics.',
    longDescription: 'Polyveda PP Corrugated Boxes are engineered for high-volume, closed-loop supply chains. Unlike traditional cardboard, these reusable plastic boxes are completely impervious to moisture, resistant to chemicals, and do not generate dust — making them ideal for cleanroom environments, cold chain logistics, and heavy industrial use. Featuring sonic-welded edges and customizable inserts, these boxes reduce total packaging costs by over 60% through extended reuse cycles.',
    image: '/products/pp_boxes.png',
    metaTitle: 'PP Corrugated Boxes | Reusable Packaging India | Polyveda',
    metaDescription: 'Buy high-quality PP corrugated boxes in India. Moisture-proof, 50+ reuse cycles, fully collapsible. Custom-engineered by Polyveda for industrial and logistics use.',
    specs: [
      { label: 'Thickness Range', value: '2mm – 20mm' },
      { label: 'Reuse Cycles', value: '50+ Trips' },
      { label: 'Moisture Resistance', value: '100% Waterproof' },
      { label: 'Recyclability', value: '100% Recyclable (Category 5)' }
    ],
    features: [
      'Fully collapsible design to minimize return freight costs',
      'Custom printing available for brand visibility and barcoding',
      'Ultrasonically welded edges for superior structural integrity',
      'Optional ESD-safe (Electrostatic Discharge) coating for electronics'
    ],
    relatedProducts: ['custom-pp-trays', 'pp-trunks-crates'],
    industries: ['ecommerce', 'healthcare', 'logistics']
  },
  {
    id: 'custom-pp-trays',
    slug: 'custom-pp-trays',
    name: 'Custom PP Trays',
    category: 'Packaging',
    tagline: 'Zero movement. Zero damage.',
    description: 'Precision-engineered with CNC-cut custom cavities to cradle individual components. Available in ESD-safe conductive variants for electronics.',
    longDescription: 'Polyveda Custom PP Trays are designed to secure high-value or highly sensitive components during transit and assembly. Using advanced CNC cutting and thermoforming techniques, we create exact-fit cavities that eliminate part-to-part contact and vibration damage. These trays are stackable, nestable, and designed to integrate seamlessly with automated robotic assembly lines in electronics and pharmaceutical environments.',
    image: '/products/pp_trays.png',
    metaTitle: 'Custom PP Trays | ESD-Safe Packaging for Electronics | Polyveda',
    metaDescription: 'Custom PP trays with CNC-cut cavities for electronics, PCBs, and precision components. ESD-safe conductive variants available. Manufactured in India by Polyveda.',
    specs: [
      { label: 'Fabrication Method', value: 'CNC Cut & Thermoformed' },
      { label: 'Conductivity', value: 'Standard or ESD-Safe (10^4 - 10^9 Ω)' },
      { label: 'Stacking', value: 'Interlocking Stack & Nest' },
      { label: 'Automation', value: 'ASRS and Robotic Arm Compatible' }
    ],
    features: [
      'Exact-fit cavities prevent micro-abrasions and vibration damage',
      'Carbon-loaded ESD materials available for PCB and silicon transit',
      'Integrated hand grips for ergonomic manual handling',
      'High-visibility color coding for visual factory (5S) compliance'
    ],
    relatedProducts: ['pp-corrugated-boxes', 'pp-trunks-crates'],
    industries: ['electronics', 'healthcare', 'automotive']
  },
  {
    id: 'pp-trunks-crates',
    slug: 'pp-trunks-crates',
    name: 'PP Trunks & Crates',
    category: 'Heavy-Duty',
    tagline: 'Industrial strength. Reusable by design.',
    description: 'Collapsible heavy-duty trunks fitted with custom handles, lids, and EVA/EPE foam padding. Built for just-in-time automotive supply chains.',
    longDescription: 'When transporting heavy automotive components, metal castings, or bulk raw materials, Polyveda PP Trunks & Crates offer unparalleled strength-to-weight performance. Reinforced with metal or hard plastic corner extrusions, these returnable plastic crates withstand immense stacking pressure. The interiors can be customized with cross-link PE or EVA foam dunnage to protect class-A surfaces during every transit cycle.',
    image: '/products/pp_trunks.png',
    metaTitle: 'PP Trunks & Crates | Heavy-Duty Returnable Packaging | Polyveda',
    metaDescription: 'Heavy-duty PP corrugated crates and trunks for automotive and industrial use. Load capacity up to 500kg. Collapsible, reusable, and reinforced. Made in India.',
    specs: [
      { label: 'Load Capacity', value: 'Up to 500kg (Depending on design)' },
      { label: 'Reinforcement', value: 'Aluminum or Plastic Extrusions' },
      { label: 'Interior Dunnage', value: 'EVA, EPE, or Cross-link PE Foam' },
      { label: 'Closure Systems', value: 'Velcro, Straps, or Snap Locks' }
    ],
    features: [
      'Drop-door designs for easy access to components on the assembly line',
      'Heavy-duty stackable corners to maximize trailer cube utilization',
      'Weatherproof construction suitable for outdoor storage',
      'Fold-flat design achieves a 1:4 return ratio'
    ],
    relatedProducts: ['pp-corrugated-boxes', 'floor-protection-sheets'],
    industries: ['automotive', 'logistics', 'ecommerce']
  },
  {
    id: 'floor-protection-sheets',
    slug: 'floor-protection-sheets',
    name: 'Floor Protection Sheets',
    category: 'Construction',
    tagline: 'Protect marble, tile & granite during renovation.',
    description: 'High-quality corrugated PP sheets engineered to safeguard floors during heavy-duty construction and renovation. Impermeable to paint and adhesives.',
    longDescription: 'Polyveda PP Floor Protection Sheets are the professional standard for protecting high-value surfaces — marble, hardwood, tile, and epoxy — during construction, renovation, and fit-out phases across India. Unlike rosin paper or thin plastic films, our sheets are highly puncture-resistant, absorbing impacts from dropped tools and heavy equipment. Completely waterproof, they ensure paint, adhesive, and spills never reach the floor below.',
    image: '/products/floor_protection.png',
    metaTitle: 'PP Floor Protection Sheets | Construction & Renovation | Polyveda',
    metaDescription: 'Buy corrugated PP floor protection sheets for construction in India. Anti-slip, non-marking, waterproof. Protects marble, tile, and hardwood floors. Reusable.',
    specs: [
      { label: 'Standard Dimensions', value: '2440mm x 1220mm (8ft x 4ft)' },
      { label: 'Thickness Range', value: '2mm - 5mm' },
      { label: 'Impact Resistance', value: 'High (Tested against dropped tools)' },
      { label: 'Surface Properties', value: 'Anti-slip, Non-marking' }
    ],
    features: [
      'Lays flat quickly and is easy to cut to shape with a standard utility knife',
      '100% waterproof barrier against paint, mud, and chemical spills',
      'Reusable across multiple job sites, reducing project material costs',
      'Available with custom branding and logos for large contractors'
    ],
    relatedProducts: ['pp-corrugated-boxes', 'signage-retail-displays'],
    industries: ['construction']
  },
  {
    id: 'signage-retail-displays',
    slug: 'signage-retail-displays',
    name: 'Signage & Retail Displays',
    category: 'Display & Marketing',
    tagline: 'Printed. Weatherproof. Eye-catching.',
    description: 'Durable, weather-resistant PP corrugated signage for indoor and outdoor use. POS & POP display stands, and lightweight customizable exhibition stalls.',
    longDescription: 'Leveraging the smooth, corona-treated surface of our premium PP corrugated sheets, Polyveda manufactures vibrant, high-resolution signage and Point-of-Sale (POS) displays for retail and marketing use. Our displays are incredibly lightweight yet structurally rigid, making them perfect for trade shows, retail environments, and outdoor real estate signage across India. Impervious to rain and UV-stabilized, they will not warp or degrade in harsh outdoor conditions.',
    image: '/products/signage_displays.png',
    metaTitle: 'PP Corrugated Signage & Retail Displays | Polyveda India',
    metaDescription: 'Custom PP corrugated signage, POS displays, and exhibition stands. Weatherproof, UV-stable, lightweight. High-resolution printing available. Manufactured in India.',
    specs: [
      { label: 'Print Quality', value: 'High-Res UV Digital or Screen Print' },
      { label: 'Surface Treatment', value: 'Corona Treated for Ink Adhesion' },
      { label: 'Weatherability', value: 'UV Stabilized & 100% Waterproof' },
      { label: 'Assembly', value: 'Tool-less Tab & Slot Design' }
    ],
    features: [
      'Extremely lightweight for low-cost shipping and easy store deployment',
      'Weatherproof construction outlasts standard cardboard displays by months',
      'Precision die-cut structural designs for complex 3D stands and product bins',
      'Eco-friendly and fully recyclable after the promotional campaign ends'
    ],
    relatedProducts: ['floor-protection-sheets', 'pp-corrugated-boxes'],
    industries: ['ecommerce', 'logistics']
  }
];
