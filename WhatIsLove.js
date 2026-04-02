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
let VOCAL1 = 0
let VOCAL2 = 0
let VOCAL3 = 0
let LEAD = 0
let AIR = 0
let BASS = 1
let SUB = 0
let KICK = 1
let CLAP = 0
let HATS = 0
let RIDE = 0
let PAD = 0

stack(

  // Main oregon
  // Back to a more placeholder lead shape so the screenshot phrase can live in the bass instead.
  "<0@16 1@16 2@16 1@16>".pickRestart([
    "[[7 7] ~ [10 10] ~ [5 5] ~ [10 10] ~]/2",
    "[[7 7] ~ [10 10] ~ [12 12] ~ [10 10] ~]/2",
    "[[7 7] ~ [10 10] ~ [5 5] ~ [3 3] ~]/2"
  ])
    .scale("f3:minor")
    .note()
    .s("z_sawtooth")
    .clip(0.82)
    .adsr("0.01:0.12:0.45:0.08")
    .delay(0.22)
    .dfb(0.25)
    .room(0.15)
    .gain(0.95 * LEAD),

 // Vocal1
  // Important: plain spaces/newlines are still one sequence in one cycle.
  // Wrapping the bars in < ... > makes them concatenate one bar per cycle.
  note(`
  <
    [~ ~ ~ ~ d4 f5 g5@2]
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

  // Bassline
  // Screenshot phrase moved here.
  // Start here for note tinkering if this is the recognizable riff you want.
  "[g1 ~@2 g1 ~ g1 ~@2 g1 ~@2  f1 ~@2 f1 ~ f1 ~@2 c2 ~  d2 ~@2 d2 ~ d2 ~@2 d2 ~ d2 ~@2  c2 ~@2 c2 ~ c2 ~@2 d2 ~ c2 ~@2]/4"
    .scale("f2:minor")
    .note()
    .s("z_sawtooth")
    .lpf(240)
    .adsr("0.01:0.08:0.75:0.08")
    .gain(0.92 * BASS),

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
    .gain(.7 * KICK),

  // Clap / snare on 2 and 4
  s("[~ cp ~ cp]")
    .bank("RolandTR909")
    .gain(0.58 * CLAP),

  // Closed hats driving the dance pulse
  stack(
    s("hh*8").bank("RolandTR909").gain("0.10 0.14 0.10 0.16 0.10 0.14 0.10 0.18").gain(HATS),
    s("oh*4").bank("RolandTR909").gain("0 0.14 0 0.18").gain(HATS).release(0)
  ).pan(0.58),

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