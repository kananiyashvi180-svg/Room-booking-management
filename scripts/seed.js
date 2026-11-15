const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://yashvi279:yashvi279@cluster0.v0jpuyu.mongodb.net/equipment_booking?retryWrites=true&w=majority";

const ResourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: [String], default: [] },
    location: { type: String, required: true },
    totalQuantity: { type: Number, required: true },
    available: { type: Number, required: true },
    instructions: { type: String },
    maintenanceNotes: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Resource =
  mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);

const sampleResources = [
  // Laptops (4)
  {
    name: "MacBook Pro 16\" M3 Max",
    description: "16-core CPU, 40-core GPU, 48GB Unified Memory, 1TB SSD. Liquid Retina XDR display, loaded with Xcode, Final Cut Pro, and Docker.",
    category: "Laptops",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"],
    location: "Computer Science Building, Tech Desk 101",
    totalQuantity: 8,
    available: 8,
    instructions: "Return with 140W MagSafe charger and protective sleeve. Do not disable FileVault.",
    maintenanceNotes: "Quarterly battery diagnostic and MDM profile review.",
    isActive: true,
  },
  {
    name: "Dell XPS 15 9530 Workstation",
    description: "13th Gen Intel Core i9-13900H, 32GB DDR5 RAM, 1TB NVMe SSD, NVIDIA RTX 4070. Dual boot Windows 11 Pro and Ubuntu 24.04 LTS.",
    category: "Laptops",
    images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80"],
    location: "Engineering Library, Room 202",
    totalQuantity: 12,
    available: 12,
    instructions: "Includes 130W USB-C charger and HDMI dongle. Back up external files before return.",
    maintenanceNotes: "Thermal paste replaced and OS re-imaged biannually.",
    isActive: true,
  },
  {
    name: "Lenovo ThinkPad P16 Gen 2",
    description: "Intel Xeon processor, 64GB ECC RAM, NVIDIA RTX A3000, ISV certified for AutoCAD, SolidWorks, and MATLAB simulation modeling.",
    category: "Laptops",
    images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80"],
    location: "Mechanical Engineering Lab 305",
    totalQuantity: 6,
    available: 6,
    instructions: "Heavy duty CAD laptop. Handle with two hands and store in Pelican case.",
    maintenanceNotes: "ISV graphics driver updates installed every semester.",
    isActive: true,
  },
  {
    name: "ASUS ROG Zephyrus G16 AI Studio",
    description: "Intel Core Ultra 9, 32GB LPDDR5X, RTX 4080 with dedicated NPU for local LLM inference, PyTorch, and game engine development.",
    category: "Laptops",
    images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80"],
    location: "AI & Robotics Research Lab, Desk 4",
    totalQuantity: 5,
    available: 5,
    instructions: "Ensure air intake vents are unobstructed during high-intensity ML workflows.",
    maintenanceNotes: "Vapor chamber cooling inspected monthly.",
    isActive: true,
  },

  // Cameras (3)
  {
    name: "Sony Alpha A7 IV Mirrorless Camera Kit",
    description: "Full-frame 33MP Exmor R CMOS sensor, 4K 60p 10-bit video, paired with Sony FE 24-70mm f/2.8 GM II lens, 2x 128GB V90 SD cards.",
    category: "Cameras",
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"],
    location: "School of Communication & Media, Room 204",
    totalQuantity: 5,
    available: 5,
    instructions: "Store in padded camera bag. Always turn off camera body before swapping lenses.",
    maintenanceNotes: "Sensor cleaned with wet swab kit after every field assignment.",
    isActive: true,
  },
  {
    name: "Canon EOS R5 C Cinema Camera",
    description: "8K 60p RAW internal recording, 45MP full-frame stills, active cooling fan, RF 50mm f/1.2L lens, dual CFexpress cards, cage kit.",
    category: "Cameras",
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80"],
    location: "Film Studies Production Vault",
    totalQuantity: 3,
    available: 3,
    instructions: "Requires certified camera handling training before checkout. External battery included.",
    maintenanceNotes: "Cooling fan filter cleared and sensor verified every 60 operational hours.",
    isActive: true,
  },
  {
    name: "Blackmagic Pocket Cinema Camera 6K Pro",
    description: "Super 35 HDR sensor, built-in motorized ND filters, dual native ISO, EF lens mount, mini-XLR audio inputs, 1TB T7 Shield SSD.",
    category: "Cameras",
    images: ["https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&q=80"],
    location: "Film & Media Equipment Checkout, Level 1",
    totalQuantity: 4,
    available: 4,
    instructions: "Calibrate touchscreen touch accuracy and format SSD in-camera before shooting.",
    maintenanceNotes: "Firmware version v8.1 validated.",
    isActive: true,
  },

  // Projectors (2)
  {
    name: "Epson PowerLite L730U Laser Projector",
    description: "7,000 lumens WUXGA 1920x1200 laser display, 20,000-hour laser light source, 1.6x optical zoom, HDBaseT and dual HDMI inputs.",
    category: "Projectors",
    images: ["https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80"],
    location: "Central Campus AV Support, Facility 12",
    totalQuantity: 4,
    available: 4,
    instructions: "Allow 60 seconds auto-cool down cycle before packing into transit flight case.",
    maintenanceNotes: "Electrostatic air filter inspected monthly.",
    isActive: true,
  },
  {
    name: "BenQ TK860i 4K HDR Smart Projector",
    description: "True 4K UHD 3840x2160 resolution, 3300 ANSI lumens, HDR-PRO technology, Android TV dongle, low input lag for presentations.",
    category: "Projectors",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"],
    location: "Student Union Activity Center, Desk B",
    totalQuantity: 6,
    available: 6,
    instructions: "Use supplied HDMI 2.1 braided cable for 4K 60Hz content.",
    maintenanceNotes: "Lens element cleaned with optical microfiber cloths.",
    isActive: true,
  },

  // Laboratory Equipment (4)
  {
    name: "Keysight InfiniiVision DSOX1204G Oscilloscope",
    description: "4-channel 100 MHz digital storage oscilloscope, 2 GSa/s sampling rate, built-in 20 MHz WaveGen function generator, serial protocol analysis.",
    category: "Laboratory Equipment",
    images: ["https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80"],
    location: "Electrical Engineering Advanced Lab 412",
    totalQuantity: 8,
    available: 8,
    instructions: "Calibrate 10:1 passive probes on reference terminal before measurement.",
    maintenanceNotes: "NIST-traceable calibration certificate renewed annually.",
    isActive: true,
  },
  {
    name: "Thermo Fisher Scientific Benchtop Centrifuge",
    description: "Refrigerated microcentrifuge, max speed 15,200 RPM / 21,100 x g, 24-place aerosol-tight rotor for 1.5/2.0 mL microtubes.",
    category: "Laboratory Equipment",
    images: ["https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80"],
    location: "Biochemistry & Genetics Research Lab 208",
    totalQuantity: 4,
    available: 4,
    instructions: "ALWAYS balance opposing tubes with identical weights prior to starting rotor.",
    maintenanceNotes: "Rotor inspected for micro-stress fractures quarterly.",
    isActive: true,
  },
  {
    name: "Olympus CX23 LED Binocular Microscope",
    description: "Ergonomic educational microscope with Plan Achromat 4x, 10x, 40x, 100x oil objectives, Abbe condenser, and coaxial coarse/fine focus.",
    category: "Laboratory Equipment",
    images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"],
    location: "Cell Biology Department, Lab Suite 104",
    totalQuantity: 15,
    available: 15,
    instructions: "Clean 100x immersion oil objective with lens paper and ether-free lens cleaner immediately after session.",
    maintenanceNotes: "Stage alignment and optical prisms calibrated regularly.",
    isActive: true,
  },
  {
    name: "Rigol DSA815-TG Spectrum Analyzer",
    description: "9 kHz to 1.5 GHz frequency range, tracking generator included, -135 dBm displayed average noise level, EMI pre-compliance filter.",
    category: "Laboratory Equipment",
    images: ["https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&q=80"],
    location: "RF & Wireless Telecommunications Center",
    totalQuantity: 4,
    available: 4,
    instructions: "Do not exceed +20 dBm RF input power to prevent internal attenuator burnout.",
    maintenanceNotes: "Frequency reference crystal verified every 6 months.",
    isActive: true,
  },

  // Meeting Rooms (3)
  {
    name: "Executive Boardroom A (16 Pax)",
    description: "Executive boardroom equipped with dual 85\" 4K interactive displays, Cisco Room Kit Pro, ceiling mic arrays, and smart glass partition.",
    category: "Meeting Rooms",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"],
    location: "Administration Wing, 3rd Floor East",
    totalQuantity: 1,
    available: 1,
    instructions: "Reserved for faculty meetings, thesis defenses, and VIP institutional presentations.",
    maintenanceNotes: "AV touch control interface and acoustic panels tested weekly.",
    isActive: true,
  },
  {
    name: "Collaboration Seminar Room 102 (30 Pax)",
    description: "Modular reconfigurable tables, dual wireless presentation pods, whiteboard walls, HD PTZ auto-tracking presenter camera.",
    category: "Meeting Rooms",
    images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80"],
    location: "Academic Complex B, Ground Level",
    totalQuantity: 1,
    available: 1,
    instructions: "Return furniture to standard lecture layout before vacating. Wipe clean dry-erase walls.",
    maintenanceNotes: "Sanitized and checked by facilities daily.",
    isActive: true,
  },
  {
    name: "Innovation & Design Studio 4B (12 Pax)",
    description: "Creative brainstorming suite featuring rolling glass boards, 3D printer access bay, digital drafting tablet, and high-speed fiber.",
    category: "Meeting Rooms",
    images: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"],
    location: "Student Incubator Hub, 4th Floor",
    totalQuantity: 1,
    available: 1,
    instructions: "Clean up workshop materials and power down 3D printer ventilation hood after use.",
    maintenanceNotes: "Drafting tablets and stylus pens inventoried weekly.",
    isActive: true,
  },

  // Sports Equipment (2)
  {
    name: "Yonex Badminton Tournament Pro Kit",
    description: "Set of 6 Yonex Astrox graphite racquets, 3 tubes of Aerosensa feather shuttlecocks, tournament net, portable posts, and court boundary tape.",
    category: "Sports Equipment",
    images: ["https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80"],
    location: "Varsity Sports Pavilion, Equipment Desk",
    totalQuantity: 6,
    available: 6,
    instructions: "For indoor wooden gymnasium court use only. Inspect string tension before return.",
    maintenanceNotes: "Grip tapes replaced and restringing performed monthly.",
    isActive: true,
  },
  {
    name: "Wilson NCAA Official Basketball & Agility Kit",
    description: "8 official size 7 Wilson Evolution composite leather basketballs, 12 agility cones, tactical whiteboard, and digital pressure gauge pump.",
    category: "Sports Equipment",
    images: ["https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&q=80"],
    location: "Athletics Fieldhouse, Cage 3",
    totalQuantity: 5,
    available: 5,
    instructions: "Ensure all 8 basketballs are counted and returned in the ventilated mesh duffle bag.",
    maintenanceNotes: "Ball air pressures calibrated to 8.0 PSI.",
    isActive: true,
  },

  // Audio Equipment (2)
  {
    name: "Shure SM7B Multi-Host Podcast Studio Kit",
    description: "4x Shure SM7B dynamic vocal microphones with Cloudlifter CL-1 preamps, Rodecaster Pro II mixer, broadcast boom arms, and 4x Sony MDR-7506 headphones.",
    category: "Audio Equipment",
    images: ["https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80"],
    location: "Campus Radio & Digital Media Center, Studio B",
    totalQuantity: 3,
    available: 3,
    instructions: "Handle boom arms gently. Ensure XLR lock switches are depressed before disconnecting cables.",
    maintenanceNotes: "Microphone foam windscreens sanitized after each booking.",
    isActive: true,
  },
  {
    name: "Yamaha StagePas 600BT Portable PA System",
    description: "680W portable PA system with 10-channel powered mixer, Bluetooth audio streaming, SPX digital reverb, 2x 10\" speakers, speaker stands, and 2x wireless handheld mics.",
    category: "Audio Equipment",
    images: ["https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80"],
    location: "Student Activities Storage, Room 114",
    totalQuantity: 4,
    available: 4,
    instructions: "Do not exceed maximum gain to prevent driver clipping. Store cables coiled without kinks.",
    maintenanceNotes: "Wireless microphone batteries replaced and frequency scanner tested.",
    isActive: true,
  },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    // Clear existing resources and replace with full updated 20-item portfolio
    console.log("Refreshing resource inventory...");
    await Resource.deleteMany({});
    await Resource.insertMany(sampleResources);

    console.log(`Successfully seeded ${sampleResources.length} realistic resources across all categories!`);
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
