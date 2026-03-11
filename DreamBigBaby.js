setcps(.22)

////////////////////////////////////////////////////
// DRUMS (very soft)
////////////////////////////////////////////////////

const hh = s("rolandjd990_hh*8")
  .lpf(2800)
  .gain(.5)

const kick = s("mpc60_bd ~ ~ ~ ~ mpc60_bd ~ ~")
  .lpf(600)
  .gain(.5)

const snare = s("~ ~ tr626_rim ~ ~ ~ tr626_rim ~")
  .lpf(900)
  .gain(.24)

////////////////////////////////////////////////////
// BASS (slow rocking root motion)
////////////////////////////////////////////////////

const bass = note(`<
  [c2@8]
  [g1@8]
  [a1@8]
  [f1@8]
>`)
  .s("gm_acoustic_bass")
  .lpf(220)
  .gain(.18)

////////////////////////////////////////////////////
// LULLABY CHORD PAD
////////////////////////////////////////////////////

const pad = note(`<
  [c4 g4 e4@8]
  [g4 d4 b3@8]
  [a4 e4 c4@8]
  [f4 c4 a3@8]
>`)
  .s("gm_pad_new_age")
  .lpf(900)
  .gain(.3)

////////////////////////////////////////////////////
// MUSIC BOX / LULLABY MELODY
////////////////////////////////////////////////////

const melody = note(`<
  [g5 ~ e5 ~ g5 ~ ~ ~]
  [~ a5 ~ g5 ~ e5 ~ ~]
  [~ g5 ~ a5 ~ c6 ~ ~]
  [~ g5 ~ e5 ~ ~ ~ ~]

  [g5 ~ e5 ~ g5 ~ ~ ~]
  [~ a5 ~ g5 ~ e5 ~ ~]
  [~ g5 ~ a5 ~ c6 ~ ~]
  [~ g5 ~ e5@2 ~ ~ ~]
>`)
  .s("gm_glockenspiel")
  .lpf(3000)
  .gain(.5)

////////////////////////////////////////////////////
// MUSIC BOX / LULLABY MELODY SOLO
////////////////////////////////////////////////////

const melodySolo = stack(
  note(`<
   [g5 ~ e5 ~ g5 ~ ~ ~]
   [~ a5 ~ g5 ~ e5 ~ ~]
   [g5 ~ a5 ~ c6 ~ ~ ~]
   [~ g5 ~ e5 ~ ~ ~ ~]

   [g5 ~ e5 ~ g5 ~ ~ ~]
   [~ a5 ~ g5 ~ e5 ~ ~]
   [g5 ~ a5 ~ c6 ~ ~ ~]
   [~ g5 ~ e5@2 ~ ~ ~]
  >`),
  chooseCycles(
    note("[~ g5 ~ a5 ~ c6 ~ ~]"),
    note("[~ g5 ~ a5 ~ g5 ~ e5]"),
    note("[~ a5 ~ g5 ~ c6 ~ a5]"),
    note("[~ g5 ~ e5 ~ g5 ~ d5]"),
    note("[~ a5 ~ c6 ~ a5 ~ g5]"),
    note("[~ g5 ~ e5@2 ~ ~ ~]"),
    note("[~ a5 ~ g5 ~ e5@2 ~ ]"),
    note("[~ c6 ~ a5 ~ g5 ~ e5]"),
    note("[~ g5 ~ a5 ~ g5 ~ e5]"),
    note("[~ d6 ~ c6 ~ a5@2 ~]")
  )
)
  .s("gm_glockenspiel")
  .lpf(3200)
  .gain(.52)

////////////////////////////////////////////////////
// SOFT BELL SPARKLE (random lullaby chime)
////////////////////////////////////////////////////

const sparkle = chooseCycles(
  note("[~ ~ ~ c6 ~ ~ ~ ~]"),
  note("[~ ~ ~ ~ ~ g5 ~ ~]"),
  note("[~ ~ ~ ~ ~ ~ ~ ~]")
)
  .s("gm_vibraphone")
  .lpf(2000)
  .gain(.08)

////////////////////////////////////////////////////
// SECTION DEFINITIONS
////////////////////////////////////////////////////

const intro = stack(
  hh.gain(.12),
  pad.gain(.12)
)

const verse = stack(
  hh,
  kick,
  snare,
  bass,
  pad
)

const full = stack(
  hh,
  kick,
  snare,
  bass,
  pad,
  melody,
  sparkle
)

const fullSolo = stack(
  hh,
  kick,
  snare,
  bass,
  pad,
  melodySolo,
  sparkle,
)

const breakdown = stack(
  hh.gain(.10),
  pad.gain(.10),
  melody.gain(.16)
)

const outro = stack(
  hh.gain(.15),
  pad.gain(15),
)

////////////////////////////////////////////////////
// PULSING BACKGROUND NOISE
////////////////////////////////////////////////////

const noise = s("pink@8 pink@8")
  .attack(0.4)
  .sustain(1)
  .release(2)
  .lpf(1400)
  .gain(perlin.range(0.1, 0.35).slow(8))

////////////////////////////////////////////////////
// ARRANGEMENT
////////////////////////////////////////////////////

$: stack(
  arrange(
    [8, intro],
    [16, verse],
    [16, full],
    [8, breakdown],
    [8, fullSolo],
    [16, full],
    [4, outro],
  ),
  noise
)