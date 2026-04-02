// What Is Love-ish starter built from your Pump Up The Jam seed
// Goal: get the right lane first, then fine-tune melody, groove, and sound design.
//
// Tinker order that usually feels good:
// 1) cpm(...)              -> overall speed / energy
// 2) bass + stab notes     -> the identity of the song
// 3) drum densities        -> how busy or clean it feels
// 4) filter / delay / gain -> polish
//
// Better muting trick: use the level vars below.
// Set any of them to 0 to mute a part while still editing its code normally.

const pickRestart = register('pickRestart', (arr, pat) => pat.pick(arr.map((x)=>x.restart(pat.collect().fmap(v=>v+1)))))
const as = register('as', (mapping, pat) => {
  mapping = Array.isArray(mapping) ? mapping : [mapping];
  return pat.fmap((v) => {
    v = Array.isArray(v) ? v : [v, 0];
    return Object.fromEntries(mapping.map((prop, i) => [prop, v[i]]));
  });
});

// Track levels: set to 0 to mute, or use smaller values to tuck things back.
let KICK = 1
let HATS = 1
let DEDO = 1
let BASS = 1
let ORGAN = 1
let VOCAL1 = 0
let VOCAL2 = 0
let VOCAL3 = 0
let AIR = 0
let SUB = 0
let CLAP = 0
let RIDE = 0
let PAD = 0

stack(

  // de do, de do
  note(`
  <
    [ as4 ~ a4 ~ as4 ~ g4 ~ as4 ~ a4 ~ as4 ~ g4 ~ ]
    [ as4 ~ a4 ~ as4 ~ f4 ~ as4 ~ a4 ~ as4 ~ f4 ~ ]
    [ a4 ~ g4 ~ a4 ~ f4 ~ a4 ~ g4 ~ a4 ~ f4 ~ ]
    [ a4 ~ g4 ~ a4 ~ f4 ~ a4 ~ g4 ~ a4 ~ f4 ~ ]
  >
  `)
    .s("gm_pad_warm")
    .gain(.7 * DEDO),

  // Main organ
  // Full organ rhythm.
  // Removed the leading silence that was shifting the whole bar late.
  // Same stab pattern, same total bar length.
  // Progression:
  // 1: Gm      = g4 bb4 d5
  // 2: Bb/D    = d4 f4 bb4
  // 3: Dm/F    = f4 a4 d5
  // 4: F/A     = a4 c5 f5
  note(`
  <
    [[g4,bb4,d5] _ ~ ~ [g4,bb4,d5] _ ~ ~ [g4,bb4,d5] _ ~ [g4,bb4,d5] _ ~ [g4,bb4,ds5] _ ]
    [[f4,bb4,d5] _ ~ ~ [f4,bb4,d5] _ ~ ~ [f4,bb4,d5] _ ~ [f4,bb4,d5] _ ~ [f4,bb4,ds5] _ ]
    [[f4,a4,d5] _ ~ ~ [f4,a4,d5] _ ~ ~ [f4,a4,d5] _ ~ [f4,a4,d5] _ ~ [f4,a4,ds5] _ ]
    [[a4,c5,f5] _ ~ ~ [a4,c5,f5] _ ~ ~ [a4,c5,f5] _ ~ [a4,c5,f5] _ ~ [a4,c5,f5] _ ]
  >
  `)
    .s("gm_rock_organ")
    .hpf(180)
    .lpf(6500)
    .lpq(3)
    .clip(0.9)
    .adsr("0.005:0.18:0.70:0.10")
    .delay(0.14)
    .dfb(0.32)
    .room(0.15)
    .gain(.99 * ORGAN)
    .off(1/64, x => x.gain(0.45 * ORGAN).hpf(400).room(0.35)),

  // Bassline
  // Broken into 16th-note bars like the organ so it's easier to edit.
  // This is the current riff, just reorganized into 4 bars.
  // Bar notes are direct note names, so no scale mapping needed here.
  note(`
  <
    [~ ~ g2 _ ~ ~ g2 _ ~ ~ g2 ~ ~ g2 ~ g2]
    [~ ~ as2 _ ~ ~ as2 _ ~ ~ as2 ~ ~ as2 ~ as2]
    [~ ~ d3 _ ~ ~ d3 _ ~ ~ d3 ~ ~ d3 ~ d3]
    [~ ~ f3 _ ~ ~ f3 _ ~ ~ f3 ~ ~ f3 ~ f3]
  >
  `)
    .s("gm_rock_organ")
    .lpf(1500)
    .lpq(4)
    .clip(0.95)
    .adsr("0.005:0.06:0.55:0.03")
    .gain(1.1 * BASS),

  
  // Closed hats on the & of each beat, plus tambourine on 8ths with 16th accents
  stack(
    // HH on the offbeats: 1& 2& 3& 4&
    s("[~ hh ~ hh ~ hh ~ hh]")
      .bank("RolandTR909")
      .gain("0 0.14 0 0.16 0 0.14 0 0.18")
      .gain(0.6 * HATS),

    s("[tambourine ~ tambourine ~ tambourine ~ tambourine tambourine tambourine ~ tambourine ~ tambourine ~ tambourine tambourine]")
      .hpf(3500)
      .hpq(5)
      .shape(0.15)
      .gain(1.2 * HATS)
  ).pan(0.58),

 // Vocal1
  // Important: plain spaces/newlines are still one sequence in one cycle.
  // Wrapping the bars in < ... > makes them concatenate one bar per cycle.
  note(`
  <
    [~@2 ~@2 ~@2 ~@2 d4 ~ f5 ~ g5@2]
    [~ ~ d4 e4 d4 f5@2]
    [d4@2 ~ ~ ~ d4 f5@2]
    [d4@2 ~ ~ ~ d4 c4@2]
    [~@7]
    [~ ~ d4 e4 d4 f5@2]
    [d4@2 ~ ~ ~ d4 f5@2]
    [d4@2 ~ ~ ~ d4 c4@2]
    [~@7]
  >
  `)
    .s("gm_oboe")
    .legato(0.9)
    .gain(0.92 * VOCAL1),

  // Air / vocal-ish bright layer on top of the stab
  // Lower this if it gets too screamy.
  "<0 1 2 1>".pickRestart([
    "[a a ~ a o o ~ o]/2",
    "[a a ~ i o o ~ i]/2",
    "[a ~ a ~ o ~ o ~]/2"
  ])
    .vowel()
    .s("z_sawtooth")
    .clip(0.7)
    .hpf(700)
    .gain(0.45 * AIR),

  // Sub weight under the bass
  // Tiny changes matter. Too much and everything turns into soup.
  "<0@32>".pickRestart([
    "[0 ~ ~ ~ 0 ~ ~ ~ -2 ~ ~ ~ 3 ~ 2 ~]/2"
  ])
    .scale("f1:minor")
    .note()
    .s("z_sine")
    .gain(0.28 * SUB),

  // Kick
  s("bd*4")
    .bank("RolandTR909")
    .lpf(170)
    .gain(.5 * KICK),

  // Clap / snare on 2 and 4
  s("[~ cp ~ cp]")
    .bank("RolandTR909")
    .gain(0.58 * CLAP),

  // Little ride / top-end sparkle for motion
  s("[~ ~ rd ~]*2")
    .bank("RolandTR909")
    .hpf(2500)
    .gain(0.12 * RIDE)
    .pan(0.72),

  // Occasional pad to glue things together
  "<0@16 1@16 2@16 1@16>".pickRestart([
    "[0@6 3@2 5@6 3@2]/2",
    "[0@6 3@2 7@6 3@2]/2"
  ])
    .scale("f4:minor")
    .note()
    .s("z_sawtooth")
    .lpf(900)
    .adsr("0.2:0.3:0.55:0.5")
    .room(0.4)
    .gain(0.18 * PAD)

)
.cpm(124/4)
.room(0.22)

// Tiny mutation ideas:
// - More 90s energy: raise cpm to 126/4 or 127/4
// - More dramatic hook: increase stab gain to 1.05
// - Cleaner mix: lower pad gain to 0.12
// - Busier club hats: change hh*8 to hh*16 and reduce gain
// - Darker tone: bass scale from f:minor to e:minor or g:minor
// - Bigger chorus feel: duplicate the stab layer and pan it slightly