setcps(.25)

// ---------- core parts ----------

const hh = stack(
  s("korgminipops_hh*8"),
  chooseCycles(
    s("~ minipops_hh ~ minipops_hh ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~"),
    s("~ ~ ~ ~ ~ minipops_hh ~ minipops_hh ~ ~ ~ ~ ~ ~ ~ ~"),
    s("~ ~ ~ ~ ~ ~ ~ ~ ~ minipops_hh ~ minipops_hh ~ ~ ~ ~"),
    s("~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ minipops_hh ~ minipops_hh")
  )
)
  .lpf(3500)
  .gain(.25)

const kick = stack(
  s("bossdr55_bd ~ ~ ~ ~ bossdr55_bd ~ ~"),
  chooseCycles(
    s("~ ~ ~ bossdr55_bd ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~"),
    s("~ ~ ~ ~ ~ ~ ~ ~ ~ bossdr55_bd ~ ~ ~ ~ ~ ~"),
    s("~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ bossdr55_bd")
  )
)
  .lpf(600)
  .gain(0.3)

const clap = s("~ ~ rolandd70_cp ~ ~ ~ rolandd70_cp ~")
  .lpf(1000)
  .gain(.25)

const bass = note(`<
  [c2@8]
  [~]
  [d2@8]
  [~]

  [c2@8]
  [~]
  [g1@8]
  [~]
>`)
  .s("gm_fretless_bass")
  .lpf(250)
  .gain(.12)

const viola = note(`<
  [c4@2 eb4 ~ g4 g4 ~ ~]
  [~ g4 eb4 c4]
  [c4 d4 eb4 g4]
  [~ ~ ~ ~ g4 c4 g4 ~ eb4@3 ~ c4@3 ~]

  [c4@2 eb4 ~ ~ g4 ~ g4]
  [~ g4 eb4 d4]
  [c4 d4 eb4 g4]
  [~ ~ ~ c4 eb4 c4 ~ ~ g4 c4@3 ~ ~ ~ ~]
>`)
  .s("gm_viola")
  .lpf(500)
  .gain(.3)

const kalimba = stack(
  note(`<
    [~ ~ g5 ~ ~ eb5 ~ ~]
    [~ c5 ~ ~ g5 ~ ~ ~]
    [~ ~ d5 ~ eb5 ~ g5 ~]
    [~ ~ ~ g5 ~ eb5@2 ~]

    [~ g5 ~ ~ eb5 ~ g5 ~]
    [~ c5 ~ g5 ~ ~ eb5 ~]
    [~ ~ d5 ~ eb5 g5 ~ ~]
    [~ ~ c5 ~ g5 ~ eb5 ~]
  >`),
  chooseCycles(
    note("[~ ~ ~ g5 ~ eb5@2 ~]"),
    note("[~ ~ ~ g5 ~ d5 eb5 ~]"),
    note("[~ ~ c5 ~ g5 ~ eb5@2]"),
    note("[~ g5 ~ ~ eb5 ~ c5 ~]")
  )
)
  .s("gm_kalimba")
  .lpf(900)
  .gain(.32)
  .sometimesBy(.2, x => x.gain(.28))

// ---------- section versions ----------

const intro = stack(
  hh.gain(.16).lpf(2800),
  kick.gain(.18),
  clap.gain(.10)
)

const verseA = stack(
  hh,
  kick,
  clap,
  bass
)

const verseB = stack(
  hh,
  kick,
  clap,
  bass,
  viola
)

const full = stack(
  hh,
  kick,
  clap,
  bass,
  viola,
  kalimba
)

const breakdown = stack(
  hh.gain(.14).lpf(2200),
  clap.gain(.12),
  bass.gain(.10),
  kalimba.gain(.22).lpf(700)
)

const lift = stack(
  hh.gain(.22),
  kick.gain(.26),
  clap.gain(.18),
  bass,
  viola.gain(.24),
  kalimba.gain(.28)
)

// ---------- arrangement ----------

$: arrange(
  [8, intro],
  [8, verseA],
  [8, verseB],
  [16, full],
  [8, breakdown],
  [8, verseB],
  [16, full],
  [8, lift]
)._scope()