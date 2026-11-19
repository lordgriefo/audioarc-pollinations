"use strict";
var AudioArcBibleEngine = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // D:/audioarc/masterProductionNotesPdf.browser.ts
  var masterProductionNotesPdf_browser_exports = {};
  __export(masterProductionNotesPdf_browser_exports, {
    buildMasterProductionNotesPDF: () => buildMasterProductionNotesPDF,
    exportMasterProductionNotesPDF: () => exportMasterProductionNotesPDF
  });

  // D:/audioarc/influences.ts
  var VISUAL_STYLES = [
    { id: "pure_influences", name: "Pure Influences", color: "from-gray-700 to-gray-900", visualDetails: "Direct translation of selected influences with no additional style filter." },
    { id: "noir", name: "Gritty Noir", color: "from-gray-900 to-black", visualDetails: "Black & White, high contrast, dramatic shadows, chiaroscuro lighting, venetian blinds, rain-slicked streets, smoke, isolation, German Expressionism influence." },
    { id: "neo_noir", name: "Neo-Noir", color: "from-cyan-900 to-slate-900", visualDetails: "High contrast color, neon lights reflecting on wet pavement, cool blues and teals, deep shadows, moral ambiguity, tech-noir aesthetic." },
    { id: "cyberpunk", name: "Cyberpunk", color: "from-purple-900 to-blue-900", visualDetails: "High-tech low-life, neon signs, rain, holograms, vibrant purple/pink/blue palette, chrome reflections, gritty urban textures, Blade Runner aesthetic." },
    { id: "wes_anderson", name: "Wes Anderson", color: "from-yellow-200 to-pink-300", visualDetails: "Symmetrical composition, pastel color palette (pinks, yellows), flat lighting, whip pans, centered subjects, quirky props, nostalgic feel." },
    { id: "cinematic", name: "Cinematic Realism", color: "from-slate-700 to-slate-900", visualDetails: "Natural lighting, shallow depth of field (bokeh), anamorphic lens flares, muted earthy tones, handheld camera, 35mm film grain, Arri Alexa look." },
    { id: "gothic_horror", name: "Gothic Horror", color: "from-red-900 to-black", visualDetails: "Deep shadows, candlelight, cool moonlight, fog, decaying architecture, cobwebs, velvet textures, desaturated colors with deep reds." },
    { id: "synthwave", name: "Synthwave", color: "from-pink-600 to-purple-800", visualDetails: "Retro-futuristic 80s aesthetic, neon grids, sunsets, palm trees, vector graphics, VHS glitch effects, vibrant magenta and cyan gradients." },
    { id: "surrealist", name: "Surrealist", color: "from-indigo-400 to-purple-500", visualDetails: "Dream-like logic, juxtaposition of unrelated objects, floating elements, distorted perspective, Man Ray influence, subconscious imagery, uncanny valley." },
    { id: "steampunk", name: "Steampunk", color: "from-amber-700 to-stone-800", visualDetails: "Brass gears, steam-powered machinery, Victorian fashion, sepia tones, industrial fog, clockwork mechanisms, copper textures, warm tungsten lighting." },
    { id: "stop_motion_studio", name: "Stop Motion Studio", color: "from-amber-700 to-orange-900", visualDetails: "Tactile textures, clay, felt, wood, visible fingerprints, shallow depth of field, stuttered animation frame rate (12fps), studio lighting, Laika style." },
    { id: "vaporwave", name: "Vaporwave", color: "from-teal-300 to-pink-300", visualDetails: "Surreal 90s internet imagery, Greek statues, glitch art, pastel gradients, low-poly 3D models, nostalgic melancholy, Windows 95 aesthetic." },
    { id: "documentary", name: "Cinema Verit\xE9", color: "from-stone-600 to-stone-800", visualDetails: "Handheld shaky cam, natural lighting, grainy 16mm stock, raw unpolished look, zoom lens snaps, realistic textures, newsreel style." },
    { id: "psychedelic", name: "Psychedelic", color: "from-indigo-500 to-purple-500", visualDetails: "Kaleidoscopic visuals, melting colors, liquid light shows, distorted lenses, vibrant saturation, dream-like transitions, 60s counter-culture style." },
    { id: "grindhouse", name: "Grindhouse / B-Movie", color: "from-yellow-700 to-red-900", visualDetails: "Film scratches, cigarette burns, saturated Technicolor, exploitation aesthetic, zoom lenses, harsh lighting, vintage 70s cinema." },
    { id: "melies_carcosa", name: "M\xE9li\xE8s Carcosa", color: "from-amber-800 to-yellow-400", visualDetails: "1902 Trip to the Moon spirit, colorized sepia tone, bright hand-painted over colors, Carcosa/King in Yellow vibe, surreal theater sets, theatrical lighting, vintage film grain, eerie, dream-like." }
  ];
  var INFLUENCE_CATEGORIES = {
    "Forces Of Nature": [
      { name: "Tornado", desc: "Vortex/Green sky. Audio: Freight Train." },
      { name: "Earthquake", desc: "Cracks/Swaying. Audio: 20Hz Rumble." },
      { name: "Tsunami", desc: "Receding ocean/Wall. Audio: White Noise Wash." },
      { name: "Volcano", desc: "Lava/Ash lightning. Audio: Explosive Thuds." },
      { name: "Blizzard", desc: "Whiteout/Blue light. Audio: Wind Howl." },
      { name: "Flash Flood", desc: "Brown surge/Trees snapping. Audio: Thumping Churn." },
      { name: "Wildfire", desc: "Fire skeletons/Smoke. Audio: Wood Pops." },
      { name: "Sandstorm", desc: "Wall of sand/Sepia. Audio: Sand Hiss." },
      { name: "Solar Flare", desc: "Purple skies/Glitches. Audio: Electrical Zaps." },
      { name: "Hurricane", desc: "Bending palms/Bullet rain. Audio: Pulsing Pressure." }
    ],
    "The Paranormal": [
      { name: "Shadow People", desc: "Humanoid voids, static edges. Audio: Low-frequency humming." },
      { name: "Archons", desc: "Geometric light beings, crystalline eyes. Audio: Shimmering glass synth." },
      { name: "Poltergeists", desc: "Objects floating, blurred motion. Audio: Random knocks and dragging." },
      { name: "EVP", desc: "Visualized sound waves, ghostly static. Audio: Distorted whispers/White noise." },
      { name: "Skinwalkers", desc: "Distorted animal shapes, uncanny eyes. Audio: Mimicked human screaming." },
      { name: "Orb Entities", desc: "Floating light spheres, dust trails. Audio: High-pitched 'pinging' pulses." },
      { name: "The Veil", desc: "Translucent layering, ripple effects. Audio: Muffled world sounds." },
      { name: "Apparitions", desc: "Semi-transparent figures, period clothing. Audio: Faint footsteps/Hissing." },
      { name: "Possession", desc: "Contorted limbs, blacked-out eyes. Audio: Multi-tonal growling." },
      { name: "Time Slips", desc: "Overlapping eras, sepia vs neon colors. Audio: Mechanical ticking/Warbling." }
    ],
    "Biblical Events": [
      { name: "The Flood", desc: "Endless dark water, a lone wooden hull, torrential rain. Audio: Deep underwater pressure, thunderous rain wash." },
      { name: "Sodom and Gamorrah", desc: "Sulfur fire falling from a purple sky, salt-pillar silhouettes. Audio: Hissing chemical fire, distant screams." },
      { name: "Eden", desc: "Oversized bioluminescent flora, mist, impossible colors. Audio: Lush forest textures, ultra-clear bird calls." },
      { name: "Exodus", desc: "High walls of frozen water, dry seabed, torches in the distance. Audio: Massive hollow wind, dripping cavernous echoes." },
      { name: "Jericho", desc: "Crumbling ancient stone, dust clouds, golden trumpets. Audio: Earth-shaking horn blast, falling masonry." },
      { name: "The Covenant", desc: "A rainbow in a storm, glowing mountain peaks. Audio: Ethereal 'choir' hum, distant wind-chimes." },
      { name: "Babel", desc: "An endless spiral tower reaching into the clouds. Audio: Multilingual chatter, wind at high altitudes." },
      { name: "The Wilderness", desc: "Harsh white sun, shimmering heat waves, infinite sand. Audio: Dry wind whistling, absolute silence." },
      { name: "The Garden (Gethsemane)", desc: "Twisted olive trees, silver moonlight, deep shadows. Audio: Night crickets, heavy breathing." },
      { name: "Apocalypse", desc: "Four horsemen silhouettes, a red moon, burning horizons. Audio: Rhythmic hoofbeats, a low cinematic drone." }
    ],
    "Comic Book Legends": [
      { name: "Vintage Archie (60s-80s)", desc: "Bright primary colors, clean 'everything is okay' line work, suburban fashion, and iconic character silhouettes." },
      { name: "Harvey: Richie Rich", desc: "Soft rounded shapes, high-society mansion aesthetic, 'money' patterns, mid-century luxury." },
      { name: "Daniel Clowes", desc: "Uncomfortable suburban realism, deadpan expressions, desaturated 90s indie film palette, awkward Americana." },
      { name: "Charles Burns", desc: "High-contrast black and white, heavy ink, 'biological horror' textures, and 70s teenage angst." },
      { name: "Hernandez Brothers", desc: "Punk rock grit mixed with 'magical realism.' Bold character designs and deep black shadows." },
      { name: "Chris Ware", desc: "Precise architectural layouts, isometric perspectives, sense of mechanical melancholy." },
      { name: "Jim Woodring", desc: "Surreal 'rubber hose' style, psychedelic wordless logic, strange geometric flora and fauna." },
      { name: "Robert Crumb", desc: "Densely hatched lines, exaggerated anatomy, 60s counter-culture sketchbook feel, urban decay." },
      { name: "Art Spiegelman", desc: "Experimental textures, avant-garde framing, intense historical weight and serious narrative tone." },
      { name: "Vaughan Bod\u0113", desc: "Psychedelic graffiti-adjacent characters, bubble lettering, and 'underground' fantasy vibes." },
      { name: "Bernie Wrightson", desc: "Master of the 'fine line' horror. Intricate textures, rotting wood, and heavy atmospheric fog." },
      { name: "EC Comics (Horror)", desc: "Vibrant unnatural 'shock' colors, dramatic framing, classic 50s morality-play aesthetic." },
      { name: "Alan Moore (Visuals)", desc: "Deeply literary and dark. Watchmen-style deconstruction, political dystopia, gritty detail." },
      { name: "Frank Miller", desc: "Heavy shadows, high contrast Noir, gritty street-level violence, Sin City aesthetic." },
      { name: "Grant Morrison (Surreal)", desc: "Mind-bending, metafictional psychedelic logic, Arkham Asylum fever dreams." },
      { name: "Garth Ennis (Grit)", desc: "Ultra-violent, dark humor, cynical tone. Think The Boys or Preacher." },
      { name: "Neil Gaiman (Dream)", desc: "Dreamlike, mythological, introspective. Sandman aesthetic of ethereal fantasy and gothic beauty." },
      { name: "Jack Kirby", desc: "The 'King.' Dynamic, explosive cosmic energy, bold lines, and 'Kirby Krackle' visual effects." },
      { name: "Stan Lee (Charm)", desc: "High-energy, character-focused, Silver Age charm, foundational foundational superhero vibe." },
      { name: "Jonathan Hickman", desc: "High-concept, data-heavy, grand world-building, complex architectural sci-fi structures." },
      { name: "Brian K. Vaughan", desc: "Character-driven scenarios (Saga/Y:TLM). Blends sci-fi with very human emotions." },
      { name: "Jeff Lemire", desc: "Melancholic, intimate, deals with isolation. Sweet Tooth indie-film feel with rough textures." },
      { name: "Mike Mignola", desc: "Heavy use of black (Chiaroscuro), angular character designs, folkloric and supernatural atmosphere." },
      { name: "Junji Ito", desc: "Visceral, grotesque, cosmic horror. Uzumaki style spiraling madness and body horror." },
      { name: "Alejandro Jodorowsky", desc: "The Incal vibes\u2014psychedelic, spiritual, and absolutely insane sci-fi imagery." }
    ],
    "The Pantheon of Cinema Classics": [
      { name: "The Godfather", desc: "Opulent mahogany darkness, window-filtered slats of light, sepia-toned power, slow-burn tension, shadows of orange peels." },
      { name: "It's a Wonderful Life", desc: "Snowy small-town charm, classic black & white glow, nostalgic 1940s Americana, high-contrast emotional peaks." },
      { name: "Citizen Kane", desc: "Deep focus cinematography, low-angle power shots, overlapping dialogue, cavernous architecture, symbolic snow-globes." },
      { name: "Casablanca", desc: "Foggy airfields, high-contrast film noir romance, stark shadows, white tuxedo elegance, atmospheric night-club lighting." },
      { name: "12 Angry Men", desc: "Extreme claustrophobia, sweat-drenched close-ups, changing camera heights to increase tension, single-room focus." },
      { name: "The Shawshank Redemption", desc: "Cold prison greys vs warm golden freedom, torrential rain baptism, sweeping crane shots of isolation." },
      { name: "Goodfellas", desc: "Kinetic steadicam tracking, vibrant red sauce lighting, freeze frames, rapid voiceover pace, intense cocaine-era jitters." },
      { name: "Forrest Gump", desc: "Americana warmth, historic grainy footage integration, pastoral southern landscapes, iconic bench-side framing." },
      { name: "Saving Private Ryan", desc: "Desaturated 'shaky cam' realism, bleached-out colors, handheld war chaos, high-speed shutter 'staccato' motion." },
      { name: "Vertigo", desc: "Spiral motifs, obsessive green lighting, dolly-zoom dizzying effects, lush Technicolor San Francisco." },
      { name: "Singin' in the Rain", desc: "Vibrant primary colors, studio backlot magic, high-key joyous lighting, fluid athletic camera movement." },
      { name: "Psycho", desc: "Harsh shower-scene editing, bird-like character framing, menacing basement shadows, sharp orchestral visual rhythm." },
      { name: "Gone with the Wind", desc: "Technicolor fire-orange horizons, silhouetted oak trees, epic scale, opulent southern decay." },
      { name: "Lawrence of Arabia", desc: "70mm desert vistas, mirage heat-haze, blinding white sun, tiny figures in massive landscapes." },
      { name: "7 Samurai", desc: "Dynamic rain-soaked battle, telephoto lens movement, deep focus group blocking, muddy grit and honor." }
    ],
    "Modern Masterpieces & Crowd-Pleasers": [
      { name: "The Matrix", desc: "Green digital tint, bullet-time slow motion, leather and latex textures, industrial cyberpunk cityscapes." },
      { name: "Inception", desc: "Gravity-defying architecture, folding cities, sterile corporate minimalism, dream-layer transitions." },
      { name: "Fight Club", desc: "Grimy urban decay, greenish basement lighting, subliminal glitch frames, consumerist satire aesthetic." },
      { name: "The Dark Knight", desc: "IMAX-scale cityscapes, clinical blue/grey palette, chaotic Joker-purple accents, high-tech surveillance feel." },
      { name: "Interstellar", desc: "Volumetric space light, massive planetary scale, dust-bowl sepia, cinematic silence." },
      { name: "Parasite", desc: "Sleek modern architecture vs grimy semi-basement textures, meticulous vertical blocking, sunlight vs flooding rain." },
      { name: "Everything Everywhere All At Once", desc: "Multiverse jump-cuts, chaotic aspect ratio shifts, vibrant maximalist color, googly-eye surrealism." },
      { name: "Gladiator", desc: "Golden wheat-field dreamscapes, desaturated roman grit, hand-held combat, epic ancient scale." },
      { name: "Titanic", desc: "Blue moonlight ocean, opulent wood-and-gold interiors, cinematic destruction, sweeping crane shots of scale." },
      { name: "Jurassic Park", desc: "Volumetric jungle lighting, rain-soaked animatronics, ripples in water, sense of primordial awe." },
      { name: "Back to the Future", desc: "Golden 1950s Americana vs neon 1980s, flux-capacitor light trails, suburban skate-park aesthetic." },
      { name: "Indiana Jones", desc: "Golden idol glow, dusty ancient ruins, silhouette whip action, map-overlay travel sequences." },
      { name: "Avatar", desc: "Bioluminescent flora, floating mountains, vibrant neon-blue skin, ultra-detailed alien ecology." },
      { name: "Star Wars", desc: "Used-universe grit, laser-bolt light, massive starships, binary sunset silhouettes." },
      { name: "The Lord of the Rings", desc: "New Zealand's epic scale, painterly fantasy lighting, gritty detailed armor, massive army vistas." },
      { name: "Harry Potter", desc: "Gothic candle-lit castles, floating candles, dark magical woods, moving portraits, emerald green magic." },
      { name: "Top Gun: Maverick", desc: "High-G aerial photography, golden hour runways, sweat-glistening skin, saturated cockpit realism." },
      { name: "Die Hard", desc: "Industrial glass and concrete, red emergency lighting, sweat and blood grit, 80s office building aesthetic." },
      { name: "Ghostbusters", desc: "Proton pack neon-lightning, slime textures, 80s NYC grit, purple-sky apocalyptic clouds." },
      { name: "E.T.", desc: "Blue-tinted suburban night, flashlight beams, silhouettes against the moon, child-eye-level camera." }
    ],
    "Genre: Epic Crime & Sagas": [
      { name: "Goodfellas", desc: "Steadicam tracking, red-sauce interiors, kinetic energy, freeze-frame narration style." },
      { name: "The Godfather", desc: "Low-key Rembrandt lighting, dark mahogany rooms, intense psychological stillness." },
      { name: "Pulp Fiction", desc: "Diner-lighting cool, dance sequence symmetry, syringe-closeups, stylized violence, 90s LA grit." },
      { name: "The Departed", desc: "Irish-Boston grit, fast-paced aggressive cutting, CCTV-style observation, blood-spattered office windows." },
      { name: "Heat", desc: "Sprawling LA neon, blue-lit highways, clinical precision heist, high-contrast concrete battles." },
      { name: "City of God", desc: "Hyper-saturated Brazil, yellow-dust sun, rapid editing, handheld chaos, coming-of-age violence." },
      { name: "Scarface", desc: "Cocaine-white sets, vibrant Miami sunsets, gold-plated decadence, chainsaw-noir shadows." },
      { name: "No Country for Old Men", desc: "Silent desert vistas, harsh sun, practical light shadows, cinematic stillness, bolt-gun tension." }
    ],
    "Animation & Visual Wonders": [
      { name: "Spirited Away", desc: "Lush hand-drawn Japanese bathhouses, ghost-entity silhouettes, vibrant traditional colors, flying dragon scale." },
      { name: "Spider-Man: Into the Spider-Verse", desc: "Ben-day dots, 3D halftone textures, chromatic aberration, split-screen comic panels, neon street art." },
      { name: "Wall-E", desc: "Rusty trash-can textures, lens flares, cosmic silence, dusty Earth sepia vs clean sterile space-ship white." },
      { name: "The Lion King", desc: "African sunrise silhouettes, grand migration scale, vibrant Pride Rock vistas, dark green elephant graveyard." },
      { name: "Toy Story", desc: "Childhood bedroom nostalgia, low-angle perspective, primary colors, plastic and fabric textures." },
      { name: "Princess Mononoke", desc: "Deep forest greens, dark biological decay, majestic animal silhouettes, hand-drawn blood and iron." }
    ],
    "50s/60s Drive-In & Delinquents": [
      { name: "The Blob", desc: "Small town panic, gelatinous monster, movie theater." },
      { name: "Creature from the Black Lagoon", desc: "Underwater photography, rubber suit, universal horror, black & white." },
      { name: "Attack of the 50 Foot Woman", desc: "Giant projection, slow movement, screaming crowds, black & white." },
      { name: "Plan 9 From Outer Space", desc: "Cardboard sets, visible strings, day-for-night, black & white." },
      { name: "The Day The Earth Stood Still", desc: "UFOs, Cold War Paranoia,\u201CKlaatu barada nikto\u201D." },
      { name: "The Wild One", desc: "Biker gangs, leather jackets, rebellion, jukeboxes, black & white." },
      { name: "Blackboard Jungle", desc: "School rebellion, rock and roll, switchblades, black & white." },
      { name: "Switchblade Sisters", desc: "Girl gangs, prison exploitation, tough attitude." }
    ],
    "Classic Television": [
      { name: "Fantasy Island", desc: "Tropical paradise, white suits, mysterious fog, wish fulfillment aesthetic." },
      { name: "BJ and the Bear", desc: "Trucker culture, 70s Americana, highways, chimpanzee sidekick." },
      { name: "ChiPs", desc: "California highways, golden sunshine, motorcycle chases, disco era uniforms." },
      { name: "The Love Boat", desc: "Cruise ship luxury, bright decks, laugh track sitcom style, 70s fashion." },
      { name: "Seinfeld", desc: "New York apartment, bass guitar transitions, observational humor, diner booths." },
      { name: "Twin Peaks", desc: "Pacific northwest, moody lodge interiors, surreal characters, cherry pie." },
      { name: "The Twilight Zone", desc: "High contrast B&W, dutch angles, surreal twist endings, Rod Serling." },
      { name: "I Love Lucy", desc: "Multi-camera sitcom, high key lighting, physical comedy, B&W." },
      { name: "The Electric Company", desc: "70s educational funk, kinetic typography, silhouettes, spider-man sketches." },
      { name: "3-2-1 Contact", desc: "80s science, synth soundtrack, documentary style, early computer graphics." },
      { name: "Adult Animation (Style)", desc: "Rotoscoping, heavy outlines, limited animation, satirical tone. (Heavy Metal)" }
    ],
    "Sid & Marty Krofft & Psychedelic TV": [
      { name: "H.R. Pufnstuf", desc: "Oversized mascot costumes, colorful sets, talking trees, low budget magic." },
      { name: "Land of the Lost", desc: "Sleestaks, dinosaurs, primitive green screen, cave sets, crystals." },
      { name: "Lidsville", desc: "Giant hats, colorful villains, theatrical staging." },
      { name: "The Bugaloos", desc: "Bug costumes, flying sequences, enchanted forest." },
      { name: "The Prisoner", desc: "Surreal village, giant white balls, pop art aesthetics." }
    ],
    "Experimental & Visual Art": [
      { name: "Maya Deren", desc: "Meshes of the Afternoon, dream logic, mirrors, clones." },
      { name: "Stan Brakhage", desc: "Painted film, abstract textures, mothlight." },
      { name: "Kenneth Anger", desc: "Occult imagery, vivid colors, leather and chrome." },
      { name: "Alejandro Jodorowsky", desc: "The Holy Mountain, religious surrealism, tarot symbolism." },
      { name: "Baraka / Samsara", desc: "70mm visual poetry, time-lapses, global scale." },
      { name: "Koyaanisqatsi", desc: "Time-lapse of cities, technology vs nature, Phillip Glass score." }
    ],
    "Visual Art & Surrealism": [
      { name: "Salvador Dali", desc: "Melting clocks, stilt-legged elephants, surreal deserts." },
      { name: "H.R. Giger", desc: "Biomechanical, monochromatic, sexualized machinery." },
      { name: "M.C. Escher", desc: "Impossible geometry, tessellations, endless staircases." },
      { name: "Hieronymus Bosch", desc: "Garden of Earthly Delights, chaotic details, hellscapes." },
      { name: "Man Ray", desc: "Rayographs, surrealist photography, solarization." },
      { name: "Marcel Duchamp", desc: "Readymades, kinetic sculpture, dadaist absurdity, conceptual focus." },
      { name: "Richard Kern", desc: "Transgressive photography, raw punk aesthetic, confronting gaze." },
      { name: "Rene Magritte", desc: "Surrealism, bowler hats, green apples, floating rocks, visual puns." }
    ],
    "Music Video Legends": [
      { name: "Spike Jonze", desc: "Practical stunts, dancing, lo-fi energy. (Weapon of Choice)" },
      { name: "Michel Gondry", desc: "In-camera effects, loop perspective, LEGO animation. (Fell in Love with a Girl)" },
      { name: "Chris Cunningham", desc: "Distorted bodies, Aphex Twin, cold blue lighting, syncing to beat." },
      { name: "Hype Williams", desc: "Fisheye lens, shiny suits, vibrant colors, futuristic sets." },
      { name: "Mark Romanek", desc: "High production value, pristine sets, dark undertones. (Closer)" },
      { name: "Floria Sigismondi", desc: "Industrial decay, jittery motion, gothic textures." }
    ],
    "Video Game Aesthetics": [
      { name: "Grand Theft Auto: Vice City", desc: "80s Miami, neon, palm trees, pastel suits, sunsets." },
      { name: "Bioshock", desc: "Art deco underwater, rusting brass, leaking water, splicers." },
      { name: "Limbo / Inside", desc: "Silhouettes, atmospheric haze, monochrome, glowing eyes." },
      { name: "Minecraft", desc: "Voxels, blocky terrain, pixellated textures." },
      { name: "Red Dead Redemption 2", desc: "Vast western landscapes, dynamic weather, volumetric lighting." },
      { name: "Elden Ring", desc: "Erdtree gold light, dark fantasy, gothic castles, massive scale." },
      { name: "Doom", desc: "Hellish landscapes, fast movement, demons, mars base, heavy metal." },
      { name: "Pac-Man", desc: "Neon maze, ghosts, pills, pixel art minimalism." },
      { name: "Donkey Kong", desc: "Construction girders, barrels, 8-bit industrial." },
      { name: "The Last of Us", desc: "Post-apocalyptic overgrown nature reclaiming cities, beautiful but dangerous, dusty interiors, spore particles in the air." },
      { name: "Cyberpunk 2077", desc: "Mega-city neon chaos, cybernetic implants, gritty street life, holographic ads, vibrant and dense." },
      { name: "Final Fantasy VII", desc: "Industrial 'Mako' reactor grunge vs. lush natural landscapes, oversized swords, magical materia glow." },
      { name: "Bloodborne", desc: "Gothic Victorian horror, Lovecraftian monsters, dark cobblestone streets, torchlight, intricate and oppressive architecture." },
      { name: "Journey", desc: "Minimalist desert landscapes, flowing cloth physics, warm glowing sand, ancient silent ruins." },
      { name: "Control", desc: "Brutalist architecture, shifting impossible geometry, red emergency lighting, floating debris, new weird aesthetic." }
    ],
    "Cinematic Lenses": [
      { name: "Anamorphic", desc: "Wide aspect ratio, oval bokeh, lens flares." },
      { name: "Fisheye", desc: "Ultra-wide 180 degree view, heavy distortion." },
      { name: "Macro", desc: "Extreme close-up, revealing microscopic textures." },
      { name: "VHS / Hi8", desc: "Magnetic tape glitches, color bleeding, scanlines." },
      { name: "Tilt-Shift", desc: "Miniature effect, selective focus planes." },
      { name: "Night Vision", desc: "Green phosphor, grainy, glowing eyes." },
      { name: "Thermal", desc: "Heat map colors, predator vision, high contrast." },
      { name: "Periscope Lens", desc: "Low-to-ground perspective, bug's eye view, skimming surfaces." }
    ],
    "Auteurs: David Lynch": [
      { name: "David Lynch", desc: "Surrealism, dream logic, industrial noise, velvet curtains, electrical humming." },
      { name: "Twin Peaks", desc: "Small town secrets, red room, zig-zag floors, coffee, logs." },
      { name: "Eraserhead", desc: "Industrial wasteland, high contrast B&W, body horror, radiator lady." },
      { name: "Blue Velvet", desc: "Suburban dark side, manicured lawns, voyeurism, gas masks." },
      { name: "Wild at Heart", desc: "Road movie chaos, Elvis-inspired energy, snakeskin jackets, surreal violence, magical realism." },
      { name: "The Elephant Man", desc: "Stark industrial black & white, Victorian London, medical curiosities, profound human empathy." },
      { name: "Inland Empire", desc: "Shot on low-resolution digital video, fragmented identity horror, non-linear nightmare logic, rabbits." },
      { name: "Mulholland Drive", desc: "Hollywood nightmare, shifting identities, blue box, nonlinear." }
    ],
    "Auteurs: Stanley Kubrick": [
      { name: "Stanley Kubrick", desc: "Symmetry, one-point perspective, detached clinical tone, slow zooms. (The Shining, 2001)" },
      { name: "The Shining", desc: "Steadicam tracking, uncanny symmetry, blood elevators, hedge maze." },
      { name: "2001: A Space Odyssey", desc: "Sterile white sets, realistic physics, star gates, slit-scan photography." },
      { name: "A Clockwork Orange", desc: "Wide angle distortion, synthesized Beethoven, violence, pop art decor." },
      { name: "Full Metal Jacket", desc: "Two-act structure, cold lighting, geometric barracks, war journalism style." },
      { name: "Eyes Wide Shut", desc: "Christmas lights, ritualistic masks, soft focus, dream-like tension." }
    ],
    "Auteurs: Alfred Hitchcock": [
      { name: "Alfred Hitchcock", desc: "Master of suspense, voyeurism, 'Vertigo' effect, icy blondes, shadow play." },
      { name: "Psycho", desc: "High contrast black and white, rapid editing cuts (shower scene), ominous shadows." },
      { name: "Vertigo", desc: "Dolly zoom, spiral motifs, haunting green fog, obsessive tracking shots." },
      { name: "Rear Window", desc: "Voyeuristic telephoto lens, confined single-room setting, courtyard framing." },
      { name: "The Birds", desc: "Natural lighting turning ominous, chaotic editing, lack of music score." },
      { name: "North by Northwest", desc: "Wide open vistas, kinetic crop duster sequences, modernist architecture." }
    ],
    "Auteurs: Quentin Tarantino": [
      { name: "Quentin Tarantino", desc: "Non-linear storytelling, pop culture dialogue, trunk shots, feet shots, violence." },
      { name: "Pulp Fiction", desc: "Saturated colors, diner lighting, nonlinear structure, casual violence." },
      { name: "Kill Bill", desc: "Yellow jumpsuit, anime sequences, high contrast gore, snap zooms, samurai aesthetic." },
      { name: "Inglourious Basterds", desc: "Tension in dialogue, red text overlays, theater lighting, mexican standoffs." },
      { name: "Django Unchained", desc: "Spaghetti western zooms, exaggerated blood squibs, vibrant plantations." },
      { name: "Reservoir Dogs", desc: "Warehouse minimalism, slow pans, matching suits, ear torture." }
    ],
    "Auteurs: Steven Spielberg": [
      { name: "Steven Spielberg", desc: "The 'Spielberg Face', shafts of light, sweeping crane shots, wonder and awe." },
      { name: "Jaws", desc: "Water level camera, mechanical tension, beach crowds, yellow barrels." },
      { name: "Jurassic Park", desc: "Rain-soaked animatronics, ripples in water cups, massive scale composition." },
      { name: "Raiders of the Lost Ark", desc: "Golden idols, dramatic shadows, practical stunts, map travel overlays." },
      { name: "E.T. the Extra-Terrestrial", desc: "Silhouettes against the moon, suburban blue nights, flashlight beams." },
      { name: "Schindler's List", desc: "High contrast black and white, red coat isolation, handheld realism." },
      { name: "Close Encounters", desc: "Blinding lights, lens flares, devils tower, communication through color." }
    ],
    "Auteurs: Coen Brothers": [
      { name: "Coen Brothers", desc: "Wide angles, pitch-black humor, bleak landscapes, eccentric characters." },
      { name: "Fargo", desc: "Stark white snow, bright red blood, static wide shots, parka textures." },
      { name: "No Country for Old Men", desc: "Desolate desert landscapes, silence, violent bursts, shadow play." },
      { name: "The Big Lebowski", desc: "Bowling alleys, dream sequences, noir pastiche, surreal carpets." },
      { name: "O Brother, Where Art Thou?", desc: "Digital sepia color grading, period costumes, southern heat." },
      { name: "Barton Fink", desc: "Claustrophobic peeling wallpaper, surreal heat, noir shadows, hotel dread." },
      { name: "Miller's Crossing (1995)", desc: "Prohibition intrigue, sharp suits, chiaroscuro shadows, cunning dialogue, tense score." }
    ],
    "Auteurs: John Ford": [
      { name: "John Ford", desc: "Monument Valley vistas, framing characters through doorways, community rituals." },
      { name: "The Searchers", desc: "Vast desert landscapes, deep focus, isolation, framing through porches." },
      { name: "Stagecoach", desc: "Deep focus cinematography, kinetic chases, wide open plains, stagecoach interiors." },
      { name: "The Grapes of Wrath", desc: "Expressionist lighting, dusty realism, faces in shadow, candlelit interiors." },
      { name: "The Man Who Shot Liberty Valance", desc: "Studio lighting, deep shadows, noir-western aesthetic." },
      { name: "How Green Was My Valley", desc: "High contrast black and white, sentimental framing, mining town grit." }
    ],
    "Auteurs: Todd Haynes": [
      { name: "Todd Haynes", desc: "Meticulous period detail, Sirkian melodrama, reflections, shifting identities, emotional restraint." },
      { name: "Carol", desc: "Shot on grainy 16mm film, muted 1950s color palette, longing gazes through rain-streaked windows, reflections." },
      { name: "Far from Heaven", desc: "Lush Technicolor pastiche, autumnal oranges and deep blues, immaculate 50s suburbia, dramatic lighting." },
      { name: "Velvet Goldmine", desc: "70s glam rock chaos, glitter and androgyny, non-linear structure, vibrant stage lighting, fluid identity." },
      { name: "I'm Not There", desc: "Fractured biopic, shifting film stocks (grainy B&W, saturated color), multiple personas, experimental form." },
      { name: "Safe", desc: "Clinical suburban horror, sterile wide shots of isolation, unsettling calm, muted pastel tones, psychological detachment." }
    ],
    "Auteurs: Modern Visionaries": [
      { name: "David Fincher", desc: "Precision, low-key lighting, green/yellow tint, fluid camera, control." },
      { name: "Denis Villeneuve", desc: "Brutalist scale, atmospheric dread, industrial soundscapes, minimalism." },
      { name: "Christopher Nolan", desc: "IMAX scale, practical effects, cross-cutting time, muted tones." },
      { name: "Greta Gerwig", desc: "Theatrical staging, warm distinct color palettes, emotional intimacy." },
      { name: "Safdie Brothers", desc: "Chaos, anxiety, neon lights, extreme close-ups, overlapping dialogue." },
      { name: "Robert Eggers", desc: "Historical accuracy, natural light/candles, square aspect ratio, folklore." },
      { name: "Jordan Peele", desc: "Social thriller, uncanny imagery, symbolism, tension in daylight." },
      { name: "Alfonso Cuar\xF3n", desc: "Long continuous takes, floating camera, deep focus, environmental storytelling." },
      { name: "Yorgos Lanthimos", desc: "Deadpan, wide angle distortion, uncomfortable framing, surrealism." },
      { name: "Gaspar No\xE9", desc: "Disorienting camera, strobe lights, neon reds, overhead spinning shots." },
      { name: "Nicolas Winding Refn", desc: "Neon-soaked noir, silence, slow pans, synth-pop aesthetic." }
    ],
    "Auteurs: Horror Masters": [
      { name: "John Carpenter", desc: "Anamorphic widescreen, deep blue lighting, minimalism, synth scores." },
      { name: "David Cronenberg", desc: "Body horror, sterile environments, flesh vs technology, clinical detachment." },
      { name: "Dario Argento", desc: "Giallo aesthetic, vibrant unnatural gel lighting, gloved killers, prog rock." },
      { name: "Wes Craven", desc: "Dream logic, suburban nightmares, meta-commentary, slasher tropes." },
      { name: "Sam Raimi", desc: "Hyper-kinetic camera, dutch angles, slapstick gore, POV rushing shots." },
      { name: "George A. Romero", desc: "Docu-style horror, social commentary, stark black and white, hordes." },
      { name: "Tobe Hooper", desc: "Gritty realism, sun-baked heat, chaotic noise, documentary feel." },
      { name: "James Wan", desc: "Creeping cameras, jump scare timing, gothic puppetry, foggy sets." },
      { name: "Guillermo del Toro", desc: "Dark fairy tales, amber lighting, clockwork mechanisms, sympathetic monsters." },
      { name: "Ari Aster", desc: "Daylight horror, pagan rituals, grief, hidden background details." }
    ],
    "Auteurs: Animation Giants": [
      { name: "Hayao Miyazaki", desc: "Lush painted backgrounds, flying sequences, reverence for nature, steam." },
      { name: "Satoshi Kon", desc: "Psychological editing, matching cuts between reality and dreams, reflections." },
      { name: "Phil Tippett", desc: "Stop-motion grotesque, gritty textures, industrial nightmare." },
      { name: "Makoto Shinkai", desc: "Hyper-realistic light, lens flares, clouds, trains, longing." },
      { name: "Ralph Bakshi", desc: "Rotoscoping, urban grit, fantasy blending with reality, psychedelic." },
      { name: "Mamoru Oshii", desc: "Stillness, philosophy, tanks, wet city streets, basset hounds." }
    ],
    "Auteurs: French New Wave": [
      { name: "Jean-Luc Godard", desc: "Jump cuts, breaking fourth wall, typography, handheld." },
      { name: "Breathless", desc: "Guerrilla filmmaking, natural light, jump cuts, Paris streets, black & white." },
      { name: "Fran\xE7ois Truffaut", desc: "Freeze frames, lyrical camera, tracking shots, humanist." },
      { name: "Agn\xE8s Varda", desc: "Documentary realism mixed with fiction, feminist perspective, vibrant." }
    ],
    "Legendary Photographers": [
      { name: "Ansel Adams", desc: "High-contrast black & white landscapes, epic scale, deep focus (f/64), majestic American West." },
      { name: "Annie Leibovitz", desc: "Dramatic, conceptual celebrity portraits, often with elaborate staging and rich color palettes." },
      { name: "Gregory Crewdson", desc: "Hyper-cinematic, large-scale suburban scenes, surreal and melancholic mood, elaborate lighting." },
      { name: "Cindy Sherman", desc: "Chameleonic self-portraits exploring identity and stereotypes, often mimicking film stills or historical paintings." },
      { name: "Henri Cartier-Bresson", desc: "The 'decisive moment', candid street photography, geometric compositions, black & white." },
      { name: "Diane Arbus", desc: "Unflinching portraits of outsiders and marginalized people, square format, confrontational and intimate." },
      { name: "Richard Avedon", desc: "Minimalist, high-contrast studio portraits against a stark white background, revealing character and emotion." },
      { name: "Sebasti\xE3o Salgado", desc: "Epic black & white photojournalism, focusing on humanity and nature with a grand, painterly quality." },
      { name: "Helmut Newton", desc: "Provocative, erotic, and statuesque fashion photography, often in black & white with a sharp, voyeuristic edge." },
      { name: "William Eggleston", desc: "Pioneer of color photography, finding beauty and strangeness in the mundane American suburban landscape." }
    ],
    "Auteurs: Masters of Cinema": [
      { name: "Stanley Kubrick", desc: "Symmetry, one-point perspective, detached clinical tone, slow zooms. (The Shining, 2001)" },
      { name: "Alfred Hitchcock", desc: "Master of suspense, voyeurism, 'Vertigo' effect, icy blondes, shadow play." },
      { name: "Quentin Tarantino", desc: "Non-linear storytelling, pop culture dialogue, trunk shots, feet shots, violence." },
      { name: "Steven Spielberg", desc: "The 'Spielberg Face', shafts of light, sweeping crane shots, wonder and awe." },
      { name: "Coen Brothers", desc: "Wide angles, pitch-black humor, bleak landscapes, eccentric characters." },
      { name: "Terrence Malick", desc: "Magic hour, floating steadicam, whispered voiceovers, nature motifs." },
      { name: "Hayao Miyazaki", desc: "Hand-drawn animation, lush landscapes, flying motifs, strong female protagonists." },
      { name: "Akira Kurosawa", desc: "Dynamic weather, telephoto lenses, masterful composition, samurai action." },
      { name: "Wong Kar-wai", desc: "Step-printing, saturated colors, neon-lit Hong Kong, themes of longing and memory." },
      { name: "Andrei Tarkovsky", desc: "Long takes, slow pacing, dream imagery, elemental motifs (water, fire, milk)." },
      { name: "Paul Thomas Anderson", desc: "Long tracking shots, ensemble casts, period detail, complex characters." },
      { name: "David Fincher", desc: "Low-key lighting, cool color palettes (greens and blues), smooth camera movement, urban decay." },
      { name: "The Wachowskis", desc: "'Bullet time' slow motion, green tint, cyberpunk aesthetic, complex action choreography." },
      { name: "Martin Scorsese", desc: "Dynamic camera movement, use of popular music, fast-paced editing, gritty realism." },
      { name: "Ridley Scott", desc: "Atmospheric lighting, smoke, shafts of light, textured sets. (Blade Runner)" },
      { name: "Bong Joon-ho", desc: "Genre-bending, precise blocking, social satire. (Parasite)" },
      { name: "Ingmar Bergman", desc: "Close-ups on faces, stark B&W, existential angst, clocks without hands." },
      { name: "Federico Fellini", desc: "Carnivalesque, surreal imagery, grotesques, breaking the fourth wall." },
      { name: "Terry Gilliam", desc: "Wide angles, clutter, bureaucratic dystopia, fantasy vs reality." },
      { name: "Tim Burton", desc: "Gothic whimsy, spirals, stripes, expressionist sets." },
      { name: "Spike Lee", desc: "Double dolly shot, vibrant colors, breaking the fourth wall, dutch angles." },
      { name: "Sergio Leone", desc: "Extreme close-ups on eyes, vast landscapes, tense standoffs." }
    ],
    "Genre: Fantasy & Folklore": [
      { name: "Lord of the Rings", desc: "Epic scale, New Zealand landscapes, forced perspective, gritty armor." },
      { name: "Pan's Labyrinth", desc: "Dark fairy tale, amber and blue contrast, practical creatures." },
      { name: "The Dark Crystal", desc: "Puppetry, alien ecology, purple suns, organic textures." },
      { name: "Labyrinth", desc: "Escher stairs, masquerade balls, glitter, practical goblins." },
      { name: "The Princess Bride", desc: "Storybook aesthetic, soft focus, fencing, pastoral landscapes." },
      { name: "The NeverEnding Story", desc: "Clouds, crumbling nothingness, practical flying creatures." },
      { name: "Wizard of Oz", desc: "Technicolor transition, painted sets, yellow brick road." },
      { name: "Excalibur", desc: "Shiny chrome armor, green light, wagnerian scale, blood and mud." }
    ],
    "Genre: Cult & Indie Favorites": [
      { name: "Donnie Darko", desc: "Suburban gloom, time travel fluid, bunny suit, 80s nostalgia." },
      { name: "Fight Club", desc: "Grimy filters, subliminal frames, sweating nitroglycerin, ikea catalogs." },
      { name: "Trainspotting", desc: "Surreal withdrawal sequences, scottish grit, freeze frames, britpop." },
      { name: "Fear and Loathing in Las Vegas", desc: "Wide angle distortion, hallucinogenic reptilians, neon glare." },
      { name: "The Big Lebowski", desc: "Bowling alleys, dream sequences, noir pastiche, surreal carpets." },
      { name: "Napoleon Dynamite", desc: "Static shots, awkward framing, beige aesthetic, awkward dancing." },
      { name: "Office Space", desc: "Fluorescent hell, printer destruction, mundane beige." },
      { name: "Eternal Sunshine", desc: "Crumbling memories, spotlight transitions, muted winter beach." },
      { name: "Am\xE9lie", desc: "Green/red palette, fast motion, whimsical narration, photobooth." },
      { name: "Dazed and Confused", desc: "Hazy 70s amber, drifting smoke, endless suburban night." },
      { name: "Drugstore Cowboy", desc: "Junkie-neon signage, lyrical downbeat pacing, Pacific Northwest rain." },
      { name: "Idiocracy", desc: "Blaring commercial dystopia, garish future-slob aesthetics, corporate wasteland." },
      { name: "Being John Malkovich (1999)", desc: "Psycho\u2011portal office, surreal humor, fractured identity, muted palette." }
    ],
    "Genre: Action & Thriller": [
      { name: "Mad Max: Fury Road", desc: "High contrast, saturated orange/teal, fast cutting, practical stunts." },
      { name: "Die Hard", desc: "Lens flares, industrial setting, sweat/grime, claustrophobia." },
      { name: "John Wick", desc: "Neon noir, clean gun-fu blocking, wide shots during action, rain." },
      { name: "Heat", desc: "Urban sprawling LA, cool blues, realistic gunfights, master shots." },
      { name: "The Raid", desc: "Gritty, handheld chaos, kinetic fighting, brutal choreography." },
      { name: "Seven", desc: "Bleach bypass, constant rain, dark interiors, flashlight beams." },
      { name: "Terminator 2", desc: "Cold blue steel, liquid metal effects, chases in canals." },
      { name: "Drive", desc: "Neon LA nights, synth-pop, slow motion, violent bursts, scorpion jacket." },
      { name: "Uncut Gems", desc: "Claustrophobic close-ups, diamond sparkle, chaotic overlapping audio." }
    ],
    "Genre: Sci-Fi & Cyberpunk": [
      { name: "Blade Runner", desc: "Neon noir, rain, smoke, crowded asian markets, massive architecture." },
      { name: "Alien", desc: "Claustrophobic industrial spaceship, Giger biomechanical horror." },
      { name: "The Matrix", desc: "Green tint, bullet time, leather trenchcoats, digital rain." },
      { name: "Brazil", desc: "Retro-futurism, ductwork everywhere, bureaucratic dystopia." },
      { name: "Fifth Element", desc: "Vibrant colors (orange/white), Gaultier costumes, flying taxis." },
      { name: "A Scanner Darkly", desc: "Rotoscoped animation, shifting reality, paranoia." },
      { name: "The Cell", desc: "Surreal mindscapes, Tarsem Singh visuals, opulent costumes." },
      { name: "Repo Man", desc: "Punk rock sci-fi, glowing trunks, generic products." },
      { name: "Dark City", desc: "German expressionist sci-fi, spiraling architecture, noir lighting." },
      { name: "Metropolis", desc: "Art deco skyscrapers, industrial machinery, robot maria, black & white silent film aesthetic." },
      { name: "Arrival", desc: "Minimalist ships, fog, muted palette, linguistic circularity." },
      { name: "Ex Machina", desc: "Glass, nature vs tech, reflections, cold precision." },
      { name: "Children of Men", desc: "Long continuous takes, gritty war zones, handheld documentary style." },
      { name: "Akira", desc: "Neo-Tokyo light trails, bike slides, massive destruction, body horror." },
      { name: "Ghost in the Shell", desc: "Urban isolation, reflections in glass, thermoptic camouflage." },
      { name: "Gattaca", desc: "Retro-modernism, amber filters, genetic perfection, clean lines." },
      { name: "Inception", desc: "Folding cities, zero gravity hallways, spinning tops." },
      { name: "Minority Report", desc: "Bleach bypass, gesture interface, grain, fluid motion." }
    ],
    "Genre: Mockumentary & Slow Cinema": [
      { name: "This Is Spinal Tap", desc: "Handheld interviews, awkward pauses, rockumentary aesthetic." },
      { name: "District 9", desc: "Found footage, shaky cam, alien integration, news reels." },
      { name: "Bela Tarr", desc: "Extremely long takes, black and white, rain, despair. (Satantango)" },
      { name: "What We Do in the Shadows", desc: "Vampire reality show, flying wire work, mundane settings." }
    ],
    "Genre: Body Horror": [
      { name: "The Fly (1986)", desc: "Gooey prosthetics, gradual transformation, tragic romance, pod design." },
      { name: "Titane", desc: "Metallic coldness, oil, fire, physical transformation, neon lights." },
      { name: "Videodrome", desc: "Biomechanical TV sets, breathing cassettes, flesh gun." },
      { name: "The Thing", desc: "Paranoia, arctic whiteout, grotesque shapeshifting." }
    ],
    "Genre: Grindhouse / B-Movie": [
      { name: "Faster, Pussycat! Kill! Kill!", desc: "Desert exploits, fast cars, tough women, dramatic angles, exploitation cool, B&W." },
      { name: "Beyond the Valley of the Dolls", desc: "Psychedelic pop art, rapid editing, party scenes, groovy fashion, vibrant color." },
      { name: "I Drink Your Blood", desc: "Rabid hippies, satanic rituals, chaotic gore, psychedelic horror." },
      { name: "Freaks (1932)", desc: "High contrast B&W, circus sideshow, raw humanity." },
      { name: "ILSA: She Wolf of the SS", desc: "Exploitation camp, harsh lighting, brutality, pulp aesthetic." },
      { name: "Cannibal Holocaust", desc: "Found footage prototype, grainy 16mm, jungle texture, extreme realism." },
      { name: "The Last House on the Left", desc: "Grainy 16mm, guerrilla filmmaking, natural light, raw." },
      { name: "Reefer Madness", desc: "Hysterical melodrama, shadowy jazz-dens, frantic zooms." },
      { name: "Dirty Mary Crazy Larry", desc: "Muscle car chases, sun-baked asphalt, wide open highways, 70s nihilism." },
      { name: "Blue Sunshine", desc: "Balding acid casualties, paranoid 70s textures, pulsing synth-score terror." },
      { name: "Super Vixens", desc: "Russ Meyer style, desert heat, rapid editing, exaggerated violence." },
      { name: "Poor Pretty Eddie", desc: "Southern gothic, dusty isolation, faded film stock, grit." },
      { name: "The Strange Vice of Mrs. Wardh", desc: "Giallo style, razor blades, stylish interiors, erotic tension, mystery." },
      { name: "Mad Doctor of Blood Island", desc: "Green blood, jungle humidity, zoom lenses, monster makeup." },
      { name: "Pets (1973)", desc: "Captivity, psychological tension, raw acting, exploitation drama." },
      { name: "Don't Go in the House", desc: "Flamethrowers, disco era interiors, burning flesh, dark shadows." },
      { name: "Absurd (1981)", desc: "Italian slasher, gut gore, biological horror, unstoppable killer." },
      { name: "Pieces", desc: "Chainsaw violence, jigsaw puzzles, college campus, bright red fake blood." },
      { name: "Rolling Thunder", desc: "PTSD revenge, hook hand, sunglasses, neo-noir western vibe." },
      { name: "Death Race 2000", desc: "Dystopian cars, matte paintings, campy costumes, vehicular manslaughter." },
      { name: "The Big Bird Cage", desc: "Women in prison, jungle heat, sweat, revolution, exploitation tropes." },
      { name: "Bloodsucking Freaks", desc: "Grand Guignol, theatrical torture, dark humor, grimy aesthetic." },
      { name: "Vampyros Lesbos", desc: "Psychedelic kitsch, red lighting, surrealism, dream logic, cabaret." },
      { name: "The Burning", desc: "Summer camp slasher, hedge clippers, raft massacre, Tom Savini effects." },
      { name: "Black Devil Doll From Hell", desc: "Shot-on-video sleaze, pulsating synth, blasphemous puppet horror.." },
      { name: "The Funhouse", desc: "Carnival lights, animatronics, stalking shadows, sleazy atmosphere." },
      { name: "Cannibal Ferox", desc: "Jungle exploitation, cruelty, primitive traps, raw documentary feel." },
      { name: "Salo, or the 120 Days of Sodom", desc: "Cold, fascist architecture, brutal detachment, symmetry." }
    ],
    "Cult: Punk & Rebellion": [
      { name: "Repo Man", desc: "Glowing trunks, generic food labels, punk attitude, LA wasteland, green sci-fi light, plate of shrimp." },
      { name: "Return of the Living Dead", desc: "Graffiti, punk fashion, chemical rain, brain-eating, slapstick horror, cemeteries." },
      { name: "Sid and Nancy", desc: "Gritty realism, garbage bags, hotel room destruction, tragic romance, grey London." },
      { name: "Liquid Sky", desc: "Neon makeup, invisible aliens, new wave fashion, rooftop synth, primitive CGI." },
      { name: "Ladies and Gentlemen, The Fabulous Stains", desc: "Skunk hair, berets, media satire, garage band aesthetic, red & black." },
      { name: "Suburbia (1983)", desc: "Abandoned housing tracts, wild dogs, mohawks, raw documentary feel." },
      { name: "Class of 1984", desc: "Dystopian high school, graffiti, leather, neon decay, Alice Cooper." }
    ],
    "Director: William Castle (The Gimmick King)": [
      { name: "House on Haunted Hill (1959)", desc: "Emergo skeleton, floating heads, noir lighting, campy atmosphere, Vincent Price." },
      { name: "The Tingler", desc: "Percepto, spine-chilling fear, breaking the fourth wall, hallucinogenic sequences, bathtub blood." },
      { name: "13 Ghosts (1960)", desc: "Illusion-O, spectral viewers, haunted house aesthetic, blue/red tint ghosts." },
      { name: "Strait-Jacket", desc: "Joan Crawford, axe murders, psychological tension, high contrast black & white, wallpapers." },
      { name: "Macabre", desc: "Clock motif, cemetery chase, gothic thriller, gimmick endings, fog." },
      { name: "Homicidal", desc: "Fright break, blonde wig, split personality, Hitchcockian pastiche, stark lighting." },
      { name: "Mr. Sardonicus", desc: "Frozen smile, gothic castle, audience vote, masks, fog machines." }
    ],
    "Moods & Atmospheres": [
      { name: "Ethereal & Dreamy", desc: "Soft focus, pastel hazes, floating particles, slow motion, angelic lighting." },
      { name: "Dark & Gritty", desc: "High contrast, dirt/grime textures, harsh shadows, desaturated, intense." },
      { name: "Melancholic", desc: "Blue/grey tones, rain, isolation, negative space, slow pacing, loneliness." },
      { name: "Euphoric", desc: "Bright warm flares, fast motion, vibrant saturation, wide angles, celebration." },
      { name: "Tense & Claustrophobic", desc: "Tight framing, dutch angles, shadows closing in, unease, sweat." },
      { name: "Nostalgic", desc: "Sepia or warm coating, film grain, soft edges, golden hour, childhood memories." },
      { name: "Chaotic", desc: "Rapid cuts, shaking camera, sensory overload, clashing colors, disorientation." },
      { name: "Romantic", desc: "Soft backlight, close-ups on eyes, shallow depth of field, warm candlelight." },
      { name: "Cold & Clinical", desc: "Fluorescent lights, symmetry, white/blue palette, detachment, sterility." },
      { name: "Mysterious", desc: "Fog/mist, silhouettes, obscuring shadows, backlighting, hidden details." }
    ],
    "Art Styles & Movements": [
      { name: "Baroque", desc: "Caravaggio lighting (chiaroscuro), dramatic intensity, ornate details, deep reds/golds." },
      { name: "Impressionism", desc: "Visible brush strokes (texture), focus on light quality, movement, Monet/Renoir." },
      { name: "Surrealism", desc: "Dali/Magritte, dream logic, melting objects, juxtaposition, uncanny valley." },
      { name: "Art Deco", desc: "Geometric shapes, gold and black, symmetry, luxury, Great Gatsby aesthetic." },
      { name: "Pop Art", desc: "Warhol/Lichtenstein, benday dots, vibrant primary colors, commercial imagery." },
      { name: "Ukiyo-e", desc: "Japanese woodblock style, flat perspective, outlines, Hokusai waves." },
      { name: "Cubism", desc: "Picasso/Braque, fragmented objects, multiple viewpoints, geometric abstraction." },
      { name: "Renaissance", desc: "Symmetry, triangular composition, heavenly lighting, soft skin tones." },
      { name: "Expressionism", desc: "Distorted shapes to express emotion, Munch/Van Gogh, swirling lines." },
      { name: "Brutalism", desc: "Concrete textures, massive scale, geometric blocky shapes, totalitarian feel." }
    ],
    "Genre: Neo-Noir": [
      { name: "Blade Runner 2049", desc: "Orange hazes, brutalist architecture, holograms, rain, isolation." },
      { name: "Nightcrawler", desc: "LA streetlights, gloss video texture, headlights, unethical detachment." },
      { name: "Sin City", desc: "High contrast digital black and white, selective color (red/yellow), comic book frames." },
      { name: "John Wick", desc: "Neon teals and purples, wet streets, tactical gun-fu, reflections." },
      { name: "Drive", desc: "Synth-pop cool, scorpion jacket, elevator lighting, slow motion violence." },
      { name: "Se7en", desc: "Bleach bypass, constant rain, flashlight beams, grime, moral decay." }
    ],
    "Aesthetic: Synthwave & Vaporwave": [
      { name: "Tron: Legacy", desc: "Glowing neon lines, glass surfaces, dark void backgrounds, daft punk aesthetic." },
      { name: "Kung Fury", desc: "VHS tracking artifacts, 80s arcade, over-the-top action, laser raptors." },
      { name: "Miami Vice", desc: "Pastel suits, speedboats, sunset gradients, ferrari testarossa." },
      { name: "San Junipero", desc: "Nostalgic 80s club lighting, rain-slicked fictional streets, neon signs." },
      { name: "Vaporwave Art", desc: "Greek busts, windows 95 UI, tropical plants, pink/teal gradients, glitch." }
    ],
    "Aesthetic: Steampunk": [
      { name: "Mortal Engines", desc: "Moving cities, industrial smoke, brass gears, leather aviator caps." },
      { name: "Wild Wild West", desc: "Mechanical spiders, western desert, steam powered tech, goggles." },
      { name: "The City of Lost Children", desc: "Greenish tint, grotesque characters, brass optical devices, wet textures." },
      { name: "Hugo", desc: "Clockwork mechanisms, train station steam, warm golden lighting, automatons." },
      { name: "Arcane", desc: "Piltover art deco gold vs Zaun neon green toxic grunge, painterly textures." }
    ],
    "Art: Abstract Expressionism": [
      { name: "Jackson Pollock", desc: "Chaotic drip painting, complex webs of color, lack of focal point, energy." },
      { name: "Mark Rothko", desc: "Large rectangular fields of color, soft edges, emotional intensity, minimalism." },
      { name: "Wassily Kandinsky", desc: "Geometric shapes, intersecting lines, synesthetic visual music." },
      { name: "Stan Brakhage", desc: "Mothlight, painted celluloid, scratches, texture over narrative." }
    ],
    "Technique: Stop Motion": [
      { name: "Coraline", desc: "Tiny knit sweaters, button eyes, glowing garden, tunnel vortex." },
      { name: "Fantastic Mr. Fox", desc: "Autumnal color palette, symmetry, fur texture, jerky movement." },
      { name: "Mad God", desc: "Gritty industrial nightmare, flesh textures, biological decay, practical effects." },
      { name: "Wallace & Gromit", desc: "Clay fingerprints, rounded shapes, cheese moon, mechanical trousers." },
      { name: "Jan \u0160vankmajer", desc: "Alice, raw meat, taxidermy, household objects coming to life, unsettling." }
    ],
    "Technique: Cinema Verit\xE9": [
      { name: "The Blair Witch Project", desc: "Shaky handheld camcorder, night vision, forest panic, stick figures." },
      { name: "Cloverfield", desc: "Found footage, chaotic movement, dust settling on lens, giant monster glimpses." },
      { name: "Tangerine", desc: "Shot on iPhone, oversaturated orange sun, LA streets, raw energy." },
      { name: "American Honey", desc: "4:3 aspect ratio, natural light, lens flares, magazine crew travel." },
      { name: "The Office (Style)", desc: "Zooms on reaction, breaking fourth wall, fluorescent lighting, awkward silence." }
    ],
    "Genre: Psychedelic": [
      { name: "Enter the Void", desc: "POV floating camera, neon Tokyo, strobe lights, fractal visuals." },
      { name: "Mandy", desc: "Deep red lighting, fog, heavy metal aesthetic, dissolving faces." },
      { name: "Fear and Loathing in Las Vegas", desc: "Wide angle distortion, hallucinogenic reptilians, desert glare." },
      { name: "Paprika", desc: "Dream parade, melting reality, exploding dolls, vibrant chaos." },
      { name: "Yellow Submarine", desc: "Pop art animation, blue meanies, sea of holes, surreal transitions." },
      { name: "The Trip", desc: "Psychedelic color collage, projector-light faces, manic pop-art." },
      { name: "Naked Lunch", desc: "Insect-typewriters, paranoid Interzone, muted grotesquerie." },
      { name: "Altered States", desc: " Primal hallucinations, biological horror, sensory-deprivation visuals." },
      { name: "Waking Life", desc: "Rotoscoped dream-drift, philosophical dialogue, liquid reality." },
      { name: "The Holy Mountain", desc: "Esoteric symbolism, tarot, surreal set pieces, vivid colors." }
    ],
    "Genre: Horror": [
      { name: "The Exorcist", desc: "Atmospheric dread, chilling cold breath, demonic possession." },
      { name: "Texas Chainsaw Massacre", desc: "Gritty 16mm, sun-baked heat, raw intensity, bone furniture." },
      { name: "Return of the Living Dead", desc: "Punk rock aesthetic, gooey practical effects, graffiti, brains." },
      { name: "Dawn of the Dead (1978)", desc: "Shopping mall consumerism, blue-skinned zombies, comic gore." },
      { name: "Creepshow", desc: "EC Comics style, vibrant comic panel lighting, bordered frames." },
      { name: "Evil Dead 2", desc: "Hyper-kinetic camera, slapstick gore, dutch angles, cabin in woods." },
      { name: "Suspiria (1977)", desc: "Technicolor nightmare, intense primary colors, art deco sets." },
      { name: "Poltergeist", desc: "Suburban normality disrupted, tv static, spectral lights." },
      { name: "I Spit on Your Grave", desc: "Raw, brutal, unpolished revenge, forest isolation." },
      { name: "Hostel", desc: "Grimy industrial textures, torture dungeon, desaturated." },
      { name: "Rosemary's Baby", desc: "Occult Horror, Paranoia, Antichrist, Pregnancy." },
      { name: "Nosferatu", desc: "Vampire, German Expressionism, Count Orloc, B&W shadows." },
      { name: "Re-Animator", desc: "Neon green reagents, medical horror, black comedy." },
      { name: "The Wicker Man", desc: "Folk horror, daylight dread, pagan masks." },
      { name: "Sinister", desc: "Super 8 snuff films, pitch-black attic, lurking shadow figure." },
      { name: "Motel Hell", desc: "Rural gothic, ironic folksiness, chainsaw dark comedy." },
      { name: "The Thing", desc: "Paranoia, snow isolation, grotesque practical effects, flame throwers." },
      { name: "Get Out", desc: "Uncomfortable close-ups, sunken place void, suburban uncanny." },
      { name: "Midsommar", desc: "Bright daylight horror, flowers, runes, disorienting drugs." },
      { name: "The Witch", desc: "Natural light, grey palette, historical purity, isolation." },
      { name: "The Lighthouse", desc: "1.19:1 aspect ratio, orthochromatic B&W, foghorns, madness." },
      { name: "Hereditary", desc: "Dollhouse aesthetic, miniatures, dark corners, grief." }
    ],
    "Auteurs: Terrence Malick": [
      { name: "Terrence Malick", desc: "Magic hour, floating steadicam, whispered voiceovers, nature motifs." },
      { name: "The Tree of Life", desc: "Cosmic scale, intimate family moments, wide angle lenses, natural light." },
      { name: "Days of Heaven", desc: "Painterly landscapes, golden hour lighting, silhouette figures." },
      { name: "The Thin Red Line", desc: "Philosophical voiceover, jungle warfare, nature's indifference." }
    ],
    "Auteurs: Wes Anderson": [
      { name: "Wes Anderson", desc: "Symmetry, pastel color palettes, flat space composition, miniatures, whip pans." },
      { name: "The Grand Budapest Hotel", desc: "Vibrant pinks and purples, meticulous set design, changing aspect ratios." },
      { name: "The Royal Tenenbaums", desc: "Nostalgic color scheme, ensemble cast, tracking shots, quirky costumes." },
      { name: "Isle of Dogs", desc: "Stop-motion animation, Japanese aesthetic, symmetrical framing." }
    ],
    "Auteurs: Hayao Miyazaki": [
      { name: "Hayao Miyazaki", desc: "Hand-drawn animation, lush landscapes, flying motifs, strong female protagonists." },
      { name: "Spirited Away", desc: "Japanese mythology, vibrant spirit world, detailed backgrounds." },
      { name: "My Neighbor Totoro", desc: "Pastoral countryside, gentle creatures, childhood wonder." },
      { name: "Princess Mononoke", desc: "Epic scale, environmental themes, detailed forest spirits." }
    ],
    "Auteurs: Akira Kurosawa": [
      { name: "Akira Kurosawa", desc: "Dynamic weather, telephoto lenses, masterful composition, samurai action." },
      { name: "Seven Samurai", desc: "Rain-soaked battles, deep focus, long takes, village defense." },
      { name: "Rashomon", desc: "Dappled sunlight through leaves, conflicting perspectives, minimalist sets." },
      { name: "Yojimbo", desc: "Wide-screen compositions, lone anti-hero, dusty town, sudden violence." }
    ],
    "Auteurs: Denis Villeneuve": [
      { name: "Denis Villeneuve", desc: "Atmospheric tension, brutalist architecture, muted color palettes, epic scale." },
      { name: "Blade Runner 2049", desc: "Orange haze, neon reflections, snow, holographic advertising." },
      { name: "Dune", desc: "Monolithic scale, desert landscapes, desaturated colors, precise compositions." },
      { name: "Arrival", desc: "Misty landscapes, minimalist alien design, soft, cool lighting." }
    ],
    "Auteurs: Wong Kar-wai": [
      { name: "Wong Kar-wai", desc: "Step-printing, saturated colors, neon-lit Hong Kong, themes of longing and memory." },
      { name: "In the Mood for Love", desc: "Rich reds and greens, tight framing, slow motion, elegant costumes." },
      { name: "Chungking Express", desc: "Handheld camera, kinetic energy, pop music, blurred motion." }
    ],
    "Auteurs: Andrei Tarkovsky": [
      { name: "Andrei Tarkovsky", desc: "Long takes, slow pacing, dream imagery, elemental motifs (water, fire, milk)." },
      { name: "Stalker", desc: "Desaturated 'real world' vs. lush 'Zone', metaphysical journey, industrial decay." },
      { name: "Solaris", desc: "Psychological sci-fi, memory, long tracking shots, water imagery." }
    ],
    "Auteurs: Paul Thomas Anderson": [
      { name: "Paul Thomas Anderson", desc: "Long tracking shots, ensemble casts, period detail, complex characters." },
      { name: "Boogie Nights", desc: "Saturated 70s colors, energetic camera movement, neon signs." },
      { name: "There Will Be Blood", desc: "Epic landscapes, stark compositions, oil derricks, intense close-ups." },
      { name: "Punch Drunk Love", desc: "vibrant colors, emotional states, social anxiety, rage, into love." },
      { name: "Magnolia", desc: "Interwoven lives, rain-soaked confession, melancholic piano, suburban yearning." }
    ],
    "Auteurs: David Fincher": [
      { name: "David Fincher", desc: "Low-key lighting, cool color palettes (greens and blues), smooth camera movement, urban decay." },
      { name: "Fight Club", desc: "Gritty, desaturated look, subliminal frames, dark, industrial locations." },
      { name: "Se7en", desc: "Bleach bypass processing, constant rain, dark interiors, high-contrast shadows." }
    ],
    "Auteurs: The Wachowskis": [
      { name: "The Wachowskis", desc: "'Bullet time' slow motion, green tint, cyberpunk aesthetic, complex action choreography." },
      { name: "The Matrix", desc: "Green and black color scheme, kung fu, reflective surfaces, dystopian future." },
      { name: "Speed Racer", desc: "Hyper-saturated colors, psychedelic race tracks, anime-style editing." }
    ],
    "Auteurs: Guillermo del Toro": [
      { name: "Guillermo del Toro", desc: "Dark fairy tales, practical creature effects, amber and blue color palette, intricate production design." },
      { name: "Pan's Labyrinth", desc: "Warm fantasy world vs. cold, blue reality, grotesque creatures, Gothic horror." },
      { name: "The Shape of Water", desc: "Lush greens and teals, romantic fantasy, period detail, underwater scenes." }
    ],
    "Auteurs: Christopher Nolan": [
      { name: "Christopher Nolan", desc: "Practical effects, non-linear narratives, IMAX scale, cool, metallic color palettes." },
      { name: "Inception", desc: "Mind-bending architecture, slow-motion water, corporate espionage." },
      { name: "The Dark Knight", desc: "Urban grit, practical explosions, surveillance themes, anamorphic widescreen." }
    ],
    "Auteurs: Martin Scorsese": [
      { name: "Martin Scorsese", desc: "Dynamic camera movement, use of popular music, fast-paced editing, gritty realism." },
      { name: "Goodfellas", desc: "Long tracking shots (Copacabana), freeze frames, voiceover narration." },
      { name: "Taxi Driver", desc: "Neon-lit, rain-slicked New York streets, slow motion, POV shots." }
    ],
    "The Silent Era": [
      { name: "The Wind (1928)", desc: "Swirling desert, dust\u2011laden vistas, expressionist shadows, isolated drifter." },
      { name: "The Kid (1921)", desc: "Tramp's compassion, child's innocence, slapstick chaos, sepia warmth." },
      { name: "Intolerance (1916)", desc: "Cross\u2011era saga, monumental sets, interwoven tragedies, sweeping tableau." },
      { name: "The Crowd (1928)", desc: "Urban anonymity, bustling streets, subtle melancholy, stark realism." },
      { name: "City Lights (1931)", desc: "Silent romance, lamp\u2011lit shadows, comedic pathos, heartfelt longing." },
      { name: "Pandora's Box (1929)", desc: "Flapper decadence, fatal allure, art\u2011deco opulence, tragic downfall." },
      { name: "The King of Kings (1927)", desc: "Biblical grandeur, radiant halos, sweeping deserts, reverent drama." },
      { name: "The Passion of Joan of Arc (1928)", desc: "Intense close\u2011ups, stark lighting, raw anguish, spiritual fervor." },
      { name: "Ben\u2011Hur: A Tale of the Christ (1925)", desc: "Chariot maelstrom, epic desert, dramatic crucifixion, expansive scale." },
      { name: "The Big Parade (1925)", desc: "Trench warfare, mud\u2011soaked realism, mournful camaraderie, sober heroism." },
      { name: "The Phantom of the Opera (1925)", desc: "Gothic masks, shadowed corridors, operatic terror, haunting melody." },
      { name: "He Who Gets Slapped (1924)", desc: "Circus melancholy, stark spotlights, emotional submission, pastel palette." },
      { name: "Sherlock Jr. (1924)", desc: "Meta\u2011cinematic romp, kinetic chase, inventive framing, playful nostalgia." },
      { name: "The General (1926)", desc: "Locomotive chase, meticulous period detail, slapstick heroics, southern charm." },
      { name: "Flesh and the Devil (1926)", desc: "Romantic tragedy, lush lighting, luxurious gowns, yearning silence." },
      { name: "Show People (1928)", desc: "Hollywood satire, bright stages, breezy humor, star\u2011studded spectacle." },
      { name: "The White Sister (1923)", desc: "Cloistered vows, soft lighting, spiritual yearning, delicate romance." },
      { name: "Diary of a Lost Girl (1929)", desc: "Moral descent, expressionist shadows, tragic innocence, somber silence." }
    ],
    "In Glorious Technicolor!": [
      { name: "The African Queen (1951)", desc: "Swampy river, grizzled romance, gritty adventure, smoky horizons." },
      { name: "All That Heaven Allows (1955)", desc: "Suburban longing, pastel gardens, quiet yearning, muted domesticity." },
      { name: "An American in Paris (1951)", desc: "Vibrant choreography, impressionist canvases, lively Parisian streets, romantic exuberance." },
      { name: "Ben\u2011Hur (1959)", desc: "Colossal chariot race, golden deserts, epic drama, sweeping orchestration." },
      { name: "Black Narcissus (1947)", desc: "Saturated reds, Himalayan mystique, stark contrasts, repressed desire." },
      { name: "The Caine Mutiny (1954)", desc: "Naval mutiny, claustrophobic decks, moral tension, stark uniforms." },
      { name: "Cat on a Hot Tin Roof (1958)", desc: "Southern heat, smoking tension, familial secrets, sultry dialogue ." },
      { name: "East of Eden (1955)", desc: "California valleys, moral conflict, generational strife, sunlit intensity." },
      { name: "The Fly (1958)", desc: "Lab chaos, grotesque transformation, cold clinical lighting, suspenseful dread." },
      { name: "Forbidden Planet (1956)", desc: "Futuristic chrome, vibrant color, cosmic dread, sleek set pieces." },
      { name: "Giant (1956)", desc: "Texan expanses, pastel sky, sprawling saga, intimate family drama." },
      { name: "Gone With the Wind (1939)", desc: "Technicolor grandeur, sweeping plantations, epic romance, turbulent war." },
      { name: "Gunfight at the O.K. Corral (1957)", desc: "Dusty street, tense standoff, sepia tones, stoic heroism." },
      { name: "Imitation of Life (1959)", desc: "Melodramatic glamour, soft focus, intertwined destinies, emotional depth." },
      { name: "Johnny Guitar (1954)", desc: "Western showdown, saturated reds, strong heroine, brooding scores." },
      { name: "The Ladykillers (1955)", desc: "British absurdity, monochrome wit, cramped flat, mischievous crooks." },
      { name: "The Life and Death of Colonel Blimp (1943)", desc: "Painterly battlefields, dignified uniforms, poignant nostalgia, sweeping panoramas." },
      { name: "The Man Who Knew Too Much (1956)", desc: "Thrilling chase, vibrant locales, tense orchestration, looming danger." },
      { name: "A Matter of Life and Death (1946)", desc: "Celestial sepia, surreal afterlife, romantic metaphysics, luminous contrasts." },
      { name: "Moby Dick (1956)", desc: "Washed\u2011out color, obsessed mariner, white whale, churning sea." },
      { name: "North by Northwest (1959)", desc: "Modernist architecture, crop duster chase, Mount Rushmore, cool blues." },
      { name: "The Quiet Man (1952)", desc: "Lush Irish greens, stone cottages, romantic comedy, vibrant community." },
      { name: "Rear Window (1954)", desc: "Voyeuristic tension, apartment courtyard, sweltering heat, single-room perspective." },
      { name: "The Red Shoes (1948)", desc: "Ballet fantasy, vibrant costumes, psychological drama, surreal performance." },
      { name: "Rebel Without a Cause (1955)", desc: "Teenage angst, saturated reds, knife fight, planetarium." },
      { name: "Rio Bravo (1959)", desc: "Western siege, dusty jail, saloon songs, camaraderie." },
      { name: "The Robe (1953)", desc: "Biblical epic, Cinemascope grandeur, Roman armor, spiritual conversion." },
      { name: "Scaramouche (1952)", desc: "Swashbuckling adventure, theatrical sets, sword fights, vibrant costumes." },
      { name: "The Searchers (1956)", desc: "Monument Valley, VistaVision landscapes, doorway framing, obsessive quest." },
      { name: "Singin' in the Rain (1952)", desc: "Joyous choreography, studio backlots, primary colors, transition to sound." },
      { name: "A Star Is Born (1954)", desc: "Hollywood melodrama, musical numbers, Cinemascope, emotional close-ups." },
      { name: "The Ten Commandments (1956)", desc: "Parting the Red Sea, epic scale, Egyptian grandeur, divine light." },
      { name: "The Thief of Bagdad (1940)", desc: "Arabian nights fantasy, magical effects, vibrant sets, flying carpet." },
      { name: "To Catch a Thief (1955)", desc: "French Riviera glamour, VistaVision, cool elegance, fireworks." },
      { name: "Vertigo (1958)", desc: "Dolly zoom, spiral motifs, haunting green, obsessive love." },
      { name: "The War of the Worlds (1953)", desc: "Tripod war machines, heat rays, mass destruction, Cold War paranoia." },
      { name: "The Wizard of Oz (1939)", desc: "B&W to color transition, yellow brick road, emerald city, fantasy sets." },
      { name: "Written on the Wind (1956)", desc: "Sirkian melodrama, lurid colors, wealthy decay, emotional turmoil." }
    ]
  };

  // D:/audioarc/masterProductionNotesPdf.browser.ts
  var jsPDF = typeof window !== "undefined" ? window.jspdf && window.jspdf.jsPDF || window.jsPDF : null;
  var sanitizeText = (input) => {
    if (!input) return "";
    return String(input).replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, "-").replace(/\u2026/g, "...").replace(/\u2022/g, "*").replace(/\u00A0/g, " ").replace(/[^\x09\x0A\x20-\x7E\xA1-\xFF]/g, "").trim();
  };
  var formatDurationMMSS = (seconds) => {
    if (!Number.isFinite(seconds) || seconds <= 0) return "00:00";
    const totalSec = Math.round(seconds);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
  var prepareImageForPdf = async (dataUrl) => {
    if (!dataUrl || typeof dataUrl !== "string" || !dataUrl.startsWith("data:image/")) {
      return null;
    }
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const w = img.naturalWidth || img.width || 640;
          const h = img.naturalHeight || img.height || 360;
          const isPng = dataUrl.startsWith("data:image/png");
          const isJpeg = dataUrl.startsWith("data:image/jpeg") || dataUrl.startsWith("data:image/jpg");
          if (isPng || isJpeg) {
            resolve({
              dataUrl,
              format: isPng ? "PNG" : "JPEG",
              width: w,
              height: h
            });
            return;
          }
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(null);
            return;
          }
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          const jpegUrl = canvas.toDataURL("image/jpeg", 0.88);
          resolve({
            dataUrl: jpegUrl,
            format: "JPEG",
            width: w,
            height: h
          });
        } catch {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = dataUrl;
    });
  };
  var resolveSelectedInfluences = (selectedNames, customInfluences) => {
    const results = [];
    const seen = /* @__PURE__ */ new Set();
    Object.entries(INFLUENCE_CATEGORIES).forEach(([category, items]) => {
      items.forEach((item) => {
        if (selectedNames.includes(item.name) && !seen.has(item.name)) {
          seen.add(item.name);
          results.push({ category, name: item.name, desc: item.desc });
        }
      });
    });
    customInfluences.forEach((item) => {
      if (selectedNames.includes(item.name) && !seen.has(item.name)) {
        seen.add(item.name);
        results.push({ category: "Custom Influence", name: item.name, desc: item.desc });
      }
    });
    selectedNames.forEach((name) => {
      if (!seen.has(name)) {
        seen.add(name);
        results.push({ category: "Reference", name, desc: "" });
      }
    });
    return results;
  };
  async function buildMasterProductionNotesPDF(payload) {
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const marginX = 16;
    const contentWidth = pageWidth - marginX * 2;
    const topMargin = 20;
    const bottomMargin = 18;
    const maxY = pageHeight - bottomMargin;
    const C = {
      ink: [17, 24, 39],
      // #111827
      inkMuted: [75, 85, 99],
      // #4B5563
      inkLight: [107, 114, 128],
      // #6B7280
      accent: [79, 70, 229],
      // #4F46E5 (Indigo)
      accentDark: [30, 27, 75],
      // #1E1B4B
      teal: [13, 148, 136],
      // #0D9488
      amber: [180, 83, 9],
      // #B45309
      surface: [248, 250, 252],
      // #F8FAFC
      surfaceAlt: [241, 245, 249],
      // #F1F5F9
      border: [203, 213, 225],
      // #CBD5E1
      borderLight: [226, 232, 240],
      // #E2E8F0
      white: [255, 255, 255]
    };
    const projectTitle = sanitizeText(payload.projectName) || "AudioArc Cinematic Production";
    const selectedStyle = VISUAL_STYLES.find((s) => s.id === payload.selectedStyleId) || VISUAL_STYLES[0];
    const resolvedInfluences = resolveSelectedInfluences(
      payload.selectedInfluences || [],
      payload.customInfluences || []
    );
    const scenes = payload.storyboard || [];
    const visualRefs = payload.visualRefs || [];
    const totalSceneDuration = scenes.reduce((acc, s) => acc + (Number(s.duration) || 0), 0);
    const effectiveDuration = totalSceneDuration > 0 ? totalSceneDuration : payload.audioDuration || 0;
    const generatedAt = (/* @__PURE__ */ new Date()).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    const refImagesMap = /* @__PURE__ */ new Map();
    const sceneImagesMap = /* @__PURE__ */ new Map();
    await Promise.all([
      ...visualRefs.map(async (ref) => {
        if (ref.image) {
          const prepared = await prepareImageForPdf(ref.image);
          if (prepared) refImagesMap.set(ref.id, prepared);
        }
      }),
      ...scenes.map(async (scene, idx) => {
        if (scene.generatedImage) {
          const prepared = await prepareImageForPdf(scene.generatedImage);
          if (prepared) sceneImagesMap.set(scene.id || String(idx), prepared);
        }
      })
    ]);
    let cursorY = topMargin;
    const startNewPage = () => {
      pdf.addPage();
      cursorY = topMargin + 2;
    };
    const ensureSpace = (neededMm) => {
      if (cursorY + neededMm > maxY) {
        startNewPage();
      }
    };
    const drawSectionHeader = (sectionNum, title, subtitle) => {
      ensureSpace(20);
      cursorY += 3;
      pdf.setFillColor(...C.accent);
      pdf.rect(marginX, cursorY, 2.5, subtitle ? 12 : 8.5, "F");
      pdf.setFillColor(...C.surfaceAlt);
      pdf.rect(marginX + 2.5, cursorY, contentWidth - 2.5, subtitle ? 12 : 8.5, "F");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.setTextColor(...C.accent);
      pdf.text(`SECTION ${sectionNum}`, marginX + 6, cursorY + 4);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(...C.ink);
      pdf.text(sanitizeText(title), marginX + 28, cursorY + 5.8);
      if (subtitle) {
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(...C.inkMuted);
        pdf.text(sanitizeText(subtitle), marginX + 6, cursorY + 9.8);
      }
      cursorY += (subtitle ? 12 : 8.5) + 5;
    };
    const drawParagraph = (text, options = {}) => {
      const clean = sanitizeText(text);
      if (!clean) return;
      const x = options.x ?? marginX;
      const width = options.width ?? contentWidth;
      const fontSize = options.fontSize ?? 9.5;
      const lineHeight = options.lineHeight ?? fontSize * 0.45;
      const fontFamily = options.fontFamily ?? "helvetica";
      const fontStyle = options.fontStyle ?? "normal";
      const color = options.color ?? C.ink;
      pdf.setFont(fontFamily, fontStyle);
      pdf.setFontSize(fontSize);
      pdf.setTextColor(...color);
      const paragraphs = clean.split("\n");
      for (const para of paragraphs) {
        if (para.trim() === "") {
          cursorY += lineHeight * 0.6;
          if (cursorY > maxY) startNewPage();
          continue;
        }
        const lines = pdf.splitTextToSize(para, width);
        for (const line of lines) {
          if (cursorY + lineHeight > maxY) {
            startNewPage();
            pdf.setFont(fontFamily, fontStyle);
            pdf.setFontSize(fontSize);
            pdf.setTextColor(...color);
          }
          pdf.text(line, x, cursorY);
          cursorY += lineHeight;
        }
      }
      cursorY += options.gapAfter ?? 2;
    };
    const bannerHeight = 46;
    pdf.setFillColor(...C.ink);
    pdf.rect(0, 0, pageWidth, bannerHeight, "F");
    pdf.setFillColor(...C.accent);
    pdf.rect(0, 0, pageWidth, 3, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8.5);
    pdf.setTextColor(165, 180, 252);
    pdf.text("AUDIOARC STUDIO  |  MASTER PRODUCTION NOTES", marginX, 13);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(...C.white);
    const titleLines = pdf.splitTextToSize(projectTitle, contentWidth);
    pdf.text(titleLines.slice(0, 2), marginX, 23);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(203, 213, 225);
    const subtitleParts = [
      `Visual Style: ${sanitizeText(selectedStyle.name)}`,
      `Scenes: ${scenes.length}`,
      `Cast/Refs: ${visualRefs.length}`,
      effectiveDuration > 0 ? `Runtime: ${formatDurationMMSS(effectiveDuration)}` : null
    ].filter(Boolean);
    pdf.text(subtitleParts.join("   |   "), marginX, 39);
    cursorY = bannerHeight + 8;
    const metaCards = [
      { label: "TOTAL SCENES", value: `${scenes.length} Shots` },
      { label: "EST. RUNTIME", value: effectiveDuration > 0 ? formatDurationMMSS(effectiveDuration) : "N/A" },
      { label: "CAST & REFERENCES", value: `${visualRefs.length} Profiles` },
      { label: "PRIMARY STYLE", value: sanitizeText(selectedStyle.name) }
    ];
    const cardGap = 3.5;
    const cardWidth = (contentWidth - cardGap * 3) / 4;
    const cardHeight = 16;
    metaCards.forEach((card, idx) => {
      const x = marginX + idx * (cardWidth + cardGap);
      pdf.setFillColor(...C.surface);
      pdf.setDrawColor(...C.borderLight);
      pdf.roundedRect(x, cursorY, cardWidth, cardHeight, 2, 2, "FD");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(6.5);
      pdf.setTextColor(...C.inkLight);
      pdf.text(card.label, x + 3, cursorY + 5.5);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9.5);
      pdf.setTextColor(...C.ink);
      const valLines = pdf.splitTextToSize(card.value, cardWidth - 6);
      pdf.text(valLines[0] || card.value, x + 3, cursorY + 12);
    });
    cursorY += cardHeight + 5;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...C.inkLight);
    const metaFooterLine = [
      `Compiled: ${generatedAt}`,
      payload.audioFileName ? `Audio Track: ${sanitizeText(payload.audioFileName)}` : null,
      `Influences Attached: ${resolvedInfluences.length}`
    ].filter(Boolean).join("   |   ");
    pdf.text(metaFooterLine, marginX, cursorY);
    cursorY += 7;
    const cleanNarrative = sanitizeText(payload.narrative);
    if (cleanNarrative) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9.5);
      const narrativeLines = pdf.splitTextToSize(cleanNarrative, contentWidth - 10);
      const boxHeight = Math.min(80, 12 + narrativeLines.length * 4.4);
      if (12 + narrativeLines.length * 4.4 <= 80) {
        ensureSpace(boxHeight + 4);
        pdf.setFillColor(...C.surface);
        pdf.setDrawColor(...C.accent);
        pdf.setLineWidth(0.35);
        pdf.roundedRect(marginX, cursorY, contentWidth, boxHeight, 2, 2, "FD");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8);
        pdf.setTextColor(...C.accent);
        pdf.text("DIRECTOR'S CONCEPT / NARRATIVE TREATMENT", marginX + 5, cursorY + 6);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9.5);
        pdf.setTextColor(...C.ink);
        pdf.text(narrativeLines, marginX + 5, cursorY + 11.5);
        cursorY += boxHeight + 6;
      } else {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8.5);
        pdf.setTextColor(...C.accent);
        pdf.text("DIRECTOR'S CONCEPT / NARRATIVE TREATMENT", marginX, cursorY);
        cursorY += 4.5;
        drawParagraph(cleanNarrative, { fontSize: 9.5, lineHeight: 4.4, gapAfter: 5 });
      }
    }
    ensureSpace(28);
    pdf.setFillColor(...C.surfaceAlt);
    pdf.setDrawColor(...C.borderLight);
    pdf.setLineWidth(0.25);
    pdf.roundedRect(marginX, cursorY, contentWidth, 23, 2, 2, "FD");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    pdf.setTextColor(...C.inkMuted);
    pdf.text("PRODUCTION BIBLE CONTENTS", marginX + 4, cursorY + 5.5);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(...C.ink);
    pdf.text("01. Visual Style & Creative Influences", marginX + 4, cursorY + 12);
    pdf.text(`02. Cast, Characters & Visual References (${visualRefs.length})`, marginX + 90, cursorY + 12);
    pdf.text("03. Complete Master Script & Lyrics", marginX + 4, cursorY + 18.5);
    pdf.text(`04. Master Scene List & Shot Breakdown (${scenes.length})`, marginX + 90, cursorY + 18.5);
    cursorY += 29;
    drawSectionHeader(
      "01",
      "Visual Style & Creative Influences",
      "Primary lookbook aesthetic, cinematography palette, and directorial reference guides"
    );
    const styleDetailsClean = sanitizeText(selectedStyle.visualDetails);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    const styleDetailLines = pdf.splitTextToSize(styleDetailsClean, contentWidth - 10);
    const styleBoxH = 14 + styleDetailLines.length * 4.2;
    ensureSpace(styleBoxH + 4);
    pdf.setFillColor(...C.surface);
    pdf.setDrawColor(...C.border);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(marginX, cursorY, contentWidth, styleBoxH, 2, 2, "FD");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    pdf.setTextColor(...C.teal);
    pdf.text("PRIMARY VISUAL STYLE", marginX + 5, cursorY + 5.5);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(...C.ink);
    pdf.text(sanitizeText(selectedStyle.name), marginX + 5, cursorY + 10.8);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(...C.inkMuted);
    pdf.text(styleDetailLines, marginX + 5, cursorY + 16);
    cursorY += styleBoxH + 6;
    ensureSpace(12);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.setTextColor(...C.ink);
    pdf.text(`Selected Visual & Directorial Influences (${resolvedInfluences.length})`, marginX, cursorY);
    cursorY += 5;
    if (resolvedInfluences.length === 0) {
      drawParagraph("No additional directorial or artistic influences selected.", {
        fontSize: 8.5,
        fontStyle: "italic",
        color: C.inkLight,
        gapAfter: 4
      });
    } else {
      for (const inf of resolvedInfluences) {
        const descClean = sanitizeText(inf.desc);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.5);
        const descLines = descClean ? pdf.splitTextToSize(descClean, contentWidth - 10) : [];
        const rowHeight = 9 + descLines.length * 3.8;
        ensureSpace(rowHeight + 2.5);
        pdf.setFillColor(...C.surface);
        pdf.setDrawColor(...C.borderLight);
        pdf.roundedRect(marginX, cursorY, contentWidth, rowHeight, 1.5, 1.5, "FD");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
        pdf.setTextColor(...C.ink);
        pdf.text(sanitizeText(inf.name), marginX + 4, cursorY + 5.2);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(7);
        pdf.setTextColor(...C.accent);
        const catText = sanitizeText(inf.category).toUpperCase();
        pdf.text(catText, marginX + contentWidth - 4, cursorY + 5.2, { align: "right" });
        if (descLines.length > 0) {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(8.5);
          pdf.setTextColor(...C.inkMuted);
          pdf.text(descLines, marginX + 4, cursorY + 9.5);
        }
        cursorY += rowHeight + 2.5;
      }
    }
    const unselectedCustom = (payload.customInfluences || []).filter(
      (ci) => !(payload.selectedInfluences || []).includes(ci.name)
    );
    if (unselectedCustom.length > 0) {
      cursorY += 2;
      ensureSpace(12);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8.5);
      pdf.setTextColor(...C.inkMuted);
      pdf.text(`Additional Custom Project Influences (${unselectedCustom.length})`, marginX, cursorY);
      cursorY += 4.5;
      for (const ci of unselectedCustom) {
        drawParagraph(`${ci.name}: ${ci.desc || "Custom style reference"}`, {
          x: marginX + 3,
          width: contentWidth - 3,
          fontSize: 8.5,
          color: C.inkMuted,
          gapAfter: 1.5
        });
      }
    }
    drawSectionHeader(
      "02",
      "Cast, Characters & Visual References",
      "Character continuity bible, visual reference sheets, and scene appearance mapping"
    );
    if (visualRefs.length === 0) {
      drawParagraph(
        "No characters or visual reference images have been added to this project yet. Add characters in the Cast & References panel to include portraits and continuity notes here.",
        { fontSize: 9, fontStyle: "italic", color: C.inkLight, gapAfter: 6 }
      );
    } else {
      for (let i = 0; i < visualRefs.length; i++) {
        const ref = visualRefs[i];
        const preparedImg = refImagesMap.get(ref.id) || null;
        const cleanName = sanitizeText(ref.name) || `Reference ${i + 1}`;
        const handle = `@${cleanName.replace(/[^a-zA-Z0-9]/g, "") || `Character${i + 1}`}`;
        const cleanDesc = sanitizeText(ref.description) || "No appearance description entered.";
        const sceneNumbers = [];
        scenes.forEach((sc, sIdx) => {
          const linked = Array.isArray(sc.linkedRefIds) && sc.linkedRefIds.includes(ref.id);
          const mentioned = cleanName.length >= 2 && `${sc.description || ""} ${sc.imagePrompt || ""} ${sc.soraPrompt || ""}`.toLowerCase().includes(cleanName.toLowerCase());
          if (linked || mentioned) {
            sceneNumbers.push(sIdx + 1);
          }
        });
        const hasThumb = Boolean(preparedImg);
        const thumbBoxSize = 30;
        const textStartX = hasThumb ? marginX + thumbBoxSize + 8 : marginX + 5;
        const textWidth = hasThumb ? contentWidth - thumbBoxSize - 12 : contentWidth - 10;
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.8);
        const descLines = pdf.splitTextToSize(cleanDesc, textWidth);
        const appearanceText = sceneNumbers.length > 0 ? `Appears in Scenes: ${sceneNumbers.map((n) => `#${n}`).join(", ")}` : "Appears in Scenes: General / Unassigned";
        const appLines = pdf.splitTextToSize(appearanceText, textWidth);
        const textHeight = 11 + descLines.length * 4 + 3 + appLines.length * 3.8 + 4;
        const cardH = Math.max(hasThumb ? thumbBoxSize + 8 : 24, textHeight);
        ensureSpace(cardH + 4);
        pdf.setFillColor(...C.surface);
        pdf.setDrawColor(...C.border);
        pdf.setLineWidth(0.3);
        pdf.roundedRect(marginX, cursorY, contentWidth, cardH, 2, 2, "FD");
        if (preparedImg) {
          try {
            const boxX = marginX + 4;
            const boxY = cursorY + 4;
            const aspect = preparedImg.width / Math.max(1, preparedImg.height);
            let drawW = thumbBoxSize;
            let drawH = thumbBoxSize / aspect;
            if (drawH > thumbBoxSize) {
              drawH = thumbBoxSize;
              drawW = thumbBoxSize * aspect;
            }
            const imgX = boxX + (thumbBoxSize - drawW) / 2;
            const imgY = boxY + (thumbBoxSize - drawH) / 2;
            pdf.setFillColor(15, 23, 42);
            pdf.roundedRect(boxX, boxY, thumbBoxSize, thumbBoxSize, 1.5, 1.5, "F");
            pdf.addImage(preparedImg.dataUrl, preparedImg.format, imgX, imgY, drawW, drawH);
          } catch {
          }
        }
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10.5);
        pdf.setTextColor(...C.ink);
        pdf.text(`${i + 1}. ${cleanName}`, textStartX, cursorY + 7);
        pdf.setFont("courier", "bold");
        pdf.setFontSize(8);
        pdf.setTextColor(...C.accent);
        pdf.text(handle, marginX + contentWidth - 4, cursorY + 7, { align: "right" });
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.8);
        pdf.setTextColor(...C.inkMuted);
        pdf.text(descLines, textStartX, cursorY + 12.5);
        const appY = cursorY + 12.5 + descLines.length * 4 + 2;
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(7.8);
        pdf.setTextColor(...C.teal);
        pdf.text(appLines, textStartX, appY);
        cursorY += cardH + 4;
      }
    }
    startNewPage();
    drawSectionHeader(
      "03",
      "Complete Master Script & Lyrics",
      "Full source lyrics/script text followed by the formatted production screenplay"
    );
    const cleanLyrics = sanitizeText(payload.lyrics);
    if (cleanLyrics) {
      ensureSpace(14);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9.5);
      pdf.setTextColor(...C.accentDark);
      pdf.text("A. FULL SOURCE LYRICS / MASTER SCRIPT", marginX, cursorY);
      cursorY += 5;
      const rawLines = cleanLyrics.split("\n");
      for (const rawLine of rawLines) {
        const trimmed = rawLine.trim();
        if (!trimmed) {
          cursorY += 2.6;
          if (cursorY > maxY) startNewPage();
          continue;
        }
        const isSectionHeading = /^\[.*\]$/.test(trimmed);
        if (isSectionHeading) {
          ensureSpace(7);
          cursorY += 1.5;
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(9);
          pdf.setTextColor(...C.accent);
          pdf.text(trimmed.toUpperCase(), marginX + 2, cursorY);
          cursorY += 4.5;
        } else {
          drawParagraph(trimmed, {
            x: marginX + 4,
            width: contentWidth - 6,
            fontSize: 9,
            lineHeight: 4.1,
            fontFamily: "courier",
            color: C.ink,
            gapAfter: 0.4
          });
        }
      }
      cursorY += 5;
    }
    if (scenes.length > 0) {
      ensureSpace(16);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9.5);
      pdf.setTextColor(...C.accentDark);
      pdf.text("B. FORMATTED PRODUCTION SCREENPLAY", marginX, cursorY);
      cursorY += 6;
      scenes.forEach((scene, idx) => {
        ensureSpace(28);
        const slugTime = scene.startTime && scene.endTime ? `${scene.startTime} - ${scene.endTime}` : `${Number(scene.duration || 4).toFixed(1)}s`;
        const slugGroup = sanitizeText(scene.groupName || "LOCATION").toUpperCase();
        pdf.setFillColor(...C.surfaceAlt);
        pdf.rect(marginX, cursorY - 3.5, contentWidth, 6.5, "F");
        pdf.setFont("courier", "bold");
        pdf.setFontSize(9);
        pdf.setTextColor(...C.ink);
        pdf.text(`SCENE ${String(idx + 1).padStart(2, "0")}  -  INT./EXT. ${slugGroup}`, marginX + 2.5, cursorY + 0.8);
        pdf.setTextColor(...C.inkMuted);
        pdf.text(`[${slugTime}]`, marginX + contentWidth - 2.5, cursorY + 0.8, { align: "right" });
        cursorY += 6.5;
        if (scene.description) {
          drawParagraph(scene.description, {
            x: marginX + 4,
            width: contentWidth - 8,
            fontSize: 9,
            lineHeight: 4.1,
            fontFamily: "courier",
            color: C.ink,
            gapAfter: 2
          });
        }
        if (scene.lyric) {
          ensureSpace(10);
          pdf.setFont("courier", "bold");
          pdf.setFontSize(8);
          pdf.setTextColor(...C.accent);
          pdf.text("VOCAL / LYRIC CUE", marginX + 26, cursorY);
          cursorY += 3.8;
          drawParagraph(`"${scene.lyric}"`, {
            x: marginX + 20,
            width: contentWidth - 40,
            fontSize: 8.8,
            lineHeight: 4,
            fontFamily: "courier",
            color: C.ink,
            gapAfter: 2
          });
        }
        if (scene.isVoiceoverEnabled && scene.voiceoverText) {
          ensureSpace(10);
          pdf.setFont("courier", "bold");
          pdf.setFontSize(8);
          pdf.setTextColor(...C.teal);
          pdf.text("NARRATOR (V.O.)", marginX + 26, cursorY);
          cursorY += 3.8;
          drawParagraph(scene.voiceoverText, {
            x: marginX + 20,
            width: contentWidth - 40,
            fontSize: 8.8,
            lineHeight: 4,
            fontFamily: "courier",
            color: C.ink,
            gapAfter: 2
          });
        }
        if (scene.isLipSyncEnabled && scene.lipSyncPrompt) {
          drawParagraph(`LIP-SYNC: ${scene.lipSyncPrompt}`, {
            x: marginX + 4,
            width: contentWidth - 8,
            fontSize: 8,
            lineHeight: 3.6,
            fontFamily: "courier",
            color: C.amber,
            gapAfter: 1.5
          });
        }
        const camLabel = scene.cameraMovement && scene.cameraMovement !== "none" ? scene.cameraMovement.toUpperCase() : "AUTO";
        const trIn = (scene.transitionIn && scene.transitionIn !== "none" ? scene.transitionIn : "CUT").toUpperCase();
        const trOut = (scene.transitionOut && scene.transitionOut !== "none" ? scene.transitionOut : "CUT").toUpperCase();
        drawParagraph(`[CAMERA: ${camLabel}]   [TRANSITION: ${trIn} IN / ${trOut} OUT]`, {
          x: marginX + 4,
          width: contentWidth - 8,
          fontSize: 7.5,
          lineHeight: 3.5,
          fontFamily: "courier",
          color: C.inkLight,
          gapAfter: 4
        });
      });
    } else if (!cleanLyrics) {
      drawParagraph(
        "No lyrics or storyboard script have been entered yet.",
        { fontSize: 9, fontStyle: "italic", color: C.inkLight, gapAfter: 6 }
      );
    }
    startNewPage();
    drawSectionHeader(
      "04",
      "Master Scene List & Shot Breakdown",
      "Complete shot schedule index and detailed visual/motion prompts for every scene"
    );
    if (scenes.length === 0) {
      drawParagraph(
        "No scenes have been generated in the storyboard yet. Generate a storyboard to populate the Master Scene List and Shot Breakdown.",
        { fontSize: 9, fontStyle: "italic", color: C.inkLight, gapAfter: 6 }
      );
    } else {
      ensureSpace(16);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(...C.accentDark);
      pdf.text("A. MASTER SHOT SCHEDULE OVERVIEW", marginX, cursorY);
      cursorY += 4.5;
      const col = {
        num: { x: marginX, w: 12 },
        time: { x: marginX + 12, w: 24 },
        group: { x: marginX + 36, w: 28 },
        cam: { x: marginX + 64, w: 28 },
        summary: { x: marginX + 92, w: contentWidth - 92 }
      };
      const drawTableHeader = () => {
        pdf.setFillColor(...C.ink);
        pdf.rect(marginX, cursorY, contentWidth, 6.5, "F");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(7);
        pdf.setTextColor(...C.white);
        pdf.text("#", col.num.x + 2, cursorY + 4.4);
        pdf.text("TIMECODE", col.time.x + 2, cursorY + 4.4);
        pdf.text("SECTION", col.group.x + 2, cursorY + 4.4);
        pdf.text("CAMERA", col.cam.x + 2, cursorY + 4.4);
        pdf.text("ACTION / LYRIC SUMMARY", col.summary.x + 2, cursorY + 4.4);
        cursorY += 6.5;
      };
      drawTableHeader();
      scenes.forEach((scene, idx) => {
        const timeStr = scene.startTime && scene.endTime ? `${scene.startTime}-${scene.endTime}` : `${Number(scene.duration || 4).toFixed(1)}s`;
        const groupStr = sanitizeText(scene.groupName || "Scene");
        const camStr = scene.cameraMovement && scene.cameraMovement !== "none" ? sanitizeText(scene.cameraMovement) : "Auto";
        const summaryStr = sanitizeText(scene.description || scene.lyric || "Untitled shot");
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(7.5);
        const summaryLines = pdf.splitTextToSize(summaryStr, col.summary.w - 4).slice(0, 2);
        const groupLines = pdf.splitTextToSize(groupStr, col.group.w - 3).slice(0, 2);
        const camLines = pdf.splitTextToSize(camStr, col.cam.w - 3).slice(0, 2);
        const maxLines = Math.max(1, summaryLines.length, groupLines.length, camLines.length);
        const rowH = Math.max(6.2, maxLines * 3.4 + 2.4);
        if (cursorY + rowH > maxY) {
          startNewPage();
          drawTableHeader();
        }
        if (idx % 2 === 1) {
          pdf.setFillColor(...C.surface);
          pdf.rect(marginX, cursorY, contentWidth, rowH, "F");
        }
        pdf.setDrawColor(...C.borderLight);
        pdf.setLineWidth(0.2);
        pdf.line(marginX, cursorY + rowH, marginX + contentWidth, cursorY + rowH);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(7.5);
        pdf.setTextColor(...C.accent);
        pdf.text(String(idx + 1).padStart(2, "0"), col.num.x + 2, cursorY + 4.2);
        pdf.setFont("courier", "normal");
        pdf.setFontSize(7.2);
        pdf.setTextColor(...C.inkMuted);
        pdf.text(timeStr, col.time.x + 2, cursorY + 4.2);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(7.2);
        pdf.setTextColor(...C.ink);
        pdf.text(groupLines, col.group.x + 2, cursorY + 4.2);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(7.2);
        pdf.setTextColor(...C.inkMuted);
        pdf.text(camLines, col.cam.x + 2, cursorY + 4.2);
        pdf.setTextColor(...C.ink);
        pdf.text(summaryLines, col.summary.x + 2, cursorY + 4.2);
        cursorY += rowH;
      });
      cursorY += 8;
      ensureSpace(16);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(...C.accentDark);
      pdf.text("B. DETAILED SCENE PRODUCTION SHEETS", marginX, cursorY);
      cursorY += 5;
      const refById = new Map(visualRefs.map((r) => [r.id, r.name]));
      for (let idx = 0; idx < scenes.length; idx++) {
        const scene = scenes[idx];
        const preparedImg = sceneImagesMap.get(scene.id || String(idx)) || null;
        const linkedNames = (scene.linkedRefIds || []).map((id) => refById.get(id)).filter((n) => Boolean(n)).map((n) => sanitizeText(n));
        ensureSpace(preparedImg ? 56 : 36);
        pdf.setFillColor(...C.ink);
        pdf.roundedRect(marginX, cursorY, contentWidth, 7.5, 1.5, 1.5, "F");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8.5);
        pdf.setTextColor(...C.white);
        const sceneLabel = `SCENE ${String(idx + 1).padStart(2, "0")}`;
        const groupBadge = scene.groupName ? `  |  ${sanitizeText(scene.groupName).toUpperCase()}` : "";
        pdf.text(`${sceneLabel}${groupBadge}`, marginX + 3.5, cursorY + 5);
        const timingBadge = scene.startTime && scene.endTime ? `${scene.startTime} - ${scene.endTime} (${Number(scene.duration || 4).toFixed(1)}s)` : `${Number(scene.duration || 4).toFixed(1)}s`;
        pdf.setFont("courier", "bold");
        pdf.setFontSize(8);
        pdf.setTextColor(199, 210, 254);
        pdf.text(timingBadge, marginX + contentWidth - 3.5, cursorY + 5, { align: "right" });
        cursorY += 10;
        const thumbW = 48;
        const thumbH = 27;
        const metaStartX = preparedImg ? marginX + thumbW + 5 : marginX + 2;
        const metaWidth = preparedImg ? contentWidth - thumbW - 7 : contentWidth - 4;
        const topBlockStartY = cursorY;
        if (preparedImg) {
          try {
            const aspect = preparedImg.width / Math.max(1, preparedImg.height);
            let drawW = thumbW;
            let drawH = thumbW / aspect;
            if (drawH > thumbH) {
              drawH = thumbH;
              drawW = thumbH * aspect;
            }
            const imgX = marginX + (thumbW - drawW) / 2;
            const imgY = topBlockStartY + (thumbH - drawH) / 2;
            pdf.setFillColor(15, 23, 42);
            pdf.roundedRect(marginX, topBlockStartY, thumbW, thumbH, 1.5, 1.5, "F");
            pdf.addImage(preparedImg.dataUrl, preparedImg.format, imgX, imgY, drawW, drawH);
          } catch {
          }
        }
        const camMove = scene.cameraMovement && scene.cameraMovement !== "none" ? sanitizeText(scene.cameraMovement) : "Auto / Unspecified";
        const transIn = scene.transitionIn && scene.transitionIn !== "none" ? scene.transitionIn : "Cut";
        const transOut = scene.transitionOut && scene.transitionOut !== "none" ? scene.transitionOut : "Cut";
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(7.5);
        pdf.setTextColor(...C.inkLight);
        pdf.text(
          `CAMERA: ${camMove.toUpperCase()}   |   TRANSITIONS: ${sanitizeText(transIn).toUpperCase()} -> ${sanitizeText(transOut).toUpperCase()}`,
          metaStartX,
          cursorY + 3.5
        );
        cursorY += 6.5;
        if (linkedNames.length > 0) {
          drawParagraph(`Cast / References: ${linkedNames.join(", ")}`, {
            x: metaStartX,
            width: metaWidth,
            fontSize: 8,
            lineHeight: 3.6,
            fontStyle: "bold",
            color: C.teal,
            gapAfter: 1.5
          });
        }
        if (scene.lyric) {
          drawParagraph(`Lyric: "${scene.lyric}"`, {
            x: metaStartX,
            width: metaWidth,
            fontSize: 8.5,
            lineHeight: 3.8,
            fontStyle: "italic",
            color: C.accentDark,
            gapAfter: 1.5
          });
        }
        if (scene.description) {
          drawParagraph(`Action: ${scene.description}`, {
            x: metaStartX,
            width: metaWidth,
            fontSize: 8.5,
            lineHeight: 3.8,
            color: C.ink,
            gapAfter: 1.5
          });
        }
        if (preparedImg) {
          cursorY = Math.max(cursorY, topBlockStartY + thumbH + 3);
        } else {
          cursorY += 1;
        }
        if (scene.isVoiceoverEnabled && scene.voiceoverText) {
          drawParagraph(`Voiceover (V.O.): ${scene.voiceoverText}`, {
            x: marginX + 2,
            width: contentWidth - 4,
            fontSize: 8.2,
            lineHeight: 3.7,
            color: C.teal,
            gapAfter: 1.5
          });
        }
        if (scene.isLipSyncEnabled && scene.lipSyncPrompt) {
          drawParagraph(`Lip-Sync Prompt: ${scene.lipSyncPrompt}`, {
            x: marginX + 2,
            width: contentWidth - 4,
            fontSize: 8.2,
            lineHeight: 3.7,
            color: C.amber,
            gapAfter: 1.5
          });
        }
        if (scene.notes) {
          drawParagraph(`Director Notes: ${scene.notes}`, {
            x: marginX + 2,
            width: contentWidth - 4,
            fontSize: 8.2,
            lineHeight: 3.7,
            fontStyle: "italic",
            color: C.inkMuted,
            gapAfter: 1.5
          });
        }
        if (scene.imagePrompt) {
          ensureSpace(10);
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(7.5);
          pdf.setTextColor(...C.accent);
          pdf.text("IMAGE PROMPT", marginX + 2, cursorY + 1);
          cursorY += 4;
          drawParagraph(scene.imagePrompt, {
            x: marginX + 2,
            width: contentWidth - 4,
            fontSize: 8.2,
            lineHeight: 3.7,
            color: C.inkMuted,
            gapAfter: 2
          });
        }
        if (scene.soraPrompt) {
          ensureSpace(10);
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(7.5);
          pdf.setTextColor(...C.amber);
          pdf.text("MASTER VIDEO / MOTION PROMPT", marginX + 2, cursorY + 1);
          cursorY += 4;
          drawParagraph(scene.soraPrompt, {
            x: marginX + 2,
            width: contentWidth - 4,
            fontSize: 8.2,
            lineHeight: 3.7,
            color: C.inkMuted,
            gapAfter: 2
          });
        } else if (Array.isArray(scene.videoPrompts) && scene.videoPrompts.some(Boolean)) {
          const labels = ["Subtle", "Dynamic", "Stylistic"];
          ensureSpace(10);
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(7.5);
          pdf.setTextColor(...C.amber);
          pdf.text("VIDEO MOTION OPTIONS", marginX + 2, cursorY + 1);
          cursorY += 4;
          scene.videoPrompts.forEach((vp, vIdx) => {
            if (!vp) return;
            drawParagraph(`${labels[vIdx] || `Option ${vIdx + 1}`}: ${vp}`, {
              x: marginX + 3,
              width: contentWidth - 5,
              fontSize: 8,
              lineHeight: 3.6,
              color: C.inkMuted,
              gapAfter: 1
            });
          });
        }
        pdf.setDrawColor(...C.border);
        pdf.setLineWidth(0.25);
        pdf.line(marginX, cursorY + 1, marginX + contentWidth, cursorY + 1);
        cursorY += 6;
      }
    }
    const totalPages = pdf.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      pdf.setPage(p);
      if (p > 1) {
        pdf.setDrawColor(...C.borderLight);
        pdf.setLineWidth(0.25);
        pdf.line(marginX, 13, pageWidth - marginX, 13);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(7.5);
        pdf.setTextColor(...C.inkMuted);
        pdf.text(projectTitle.substring(0, 65), marginX, 10.5);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(7.5);
        pdf.setTextColor(...C.inkLight);
        pdf.text("MASTER PRODUCTION NOTES", pageWidth - marginX, 10.5, { align: "right" });
      }
      pdf.setDrawColor(...C.borderLight);
      pdf.setLineWidth(0.25);
      pdf.line(marginX, pageHeight - 13, pageWidth - marginX, pageHeight - 13);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7.5);
      pdf.setTextColor(...C.inkLight);
      pdf.text(`AudioArc Production Bible  |  ${generatedAt}`, marginX, pageHeight - 8.5);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7.5);
      pdf.setTextColor(...C.inkMuted);
      pdf.text(`Page ${p} of ${totalPages}`, pageWidth - marginX, pageHeight - 8.5, {
        align: "right"
      });
    }
    return pdf;
  }
  async function exportMasterProductionNotesPDF(payload, filename = "master_production_notes.pdf") {
    const pdf = await buildMasterProductionNotesPDF(payload);
    pdf.save(filename);
  }
  return __toCommonJS(masterProductionNotesPdf_browser_exports);
})();

if (typeof window !== 'undefined') {
  window.buildMasterProductionNotesPDF = AudioArcBibleEngine.buildMasterProductionNotesPDF;
  window.exportMasterProductionNotesPDF = AudioArcBibleEngine.exportMasterProductionNotesPDF;
}
