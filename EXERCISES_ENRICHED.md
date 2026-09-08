# Exercise DB — enrichment review

> **Generated file — do not hand-edit.** Derived from `data/exercises.js`, which is the
> source of truth. If a tag here looks wrong, fix it in the `.js` and regenerate this.
>
> Companion to [`EXERCISES.md`](EXERCISES.md), which lists the same exercises grouped by
> session and superset — *what is programmed*. This file is the taxonomy view — *what each
> exercise is*, and how the Body OS Designer selects it.

`~/Documents/Gym/data/exercises.js` · 90 exercises. Fields added 2026-09-08: `pattern`, `arm`, `track`, `feeds`, `tissue_load`. `muscles` migrated to anatomical slugs the same day.
Regenerated from the live `.js` after review round 4. The `.js` is the source of truth.

`feeds` vocabulary (`og2_ladders.json`): `planche` · `handstand` · `ring-handstand` · `shoulderstand-press` · `manna` · `muscle-up` · `back-lever` · `front-lever` · `iron-cross`

`tissue_load` = connective-tissue cost, **not** muscular difficulty. Cap: `high`+`straight`-arm limited to 3/week, 2/session, 48h between repeats, 1 new per cycle.

---

## By pattern

### `vertical_push` — 11

| id | name | arm | track | tissue | feeds | primary muscles |
|---|---|---|---|---|---|---|
| `handstand-drills` | Handstand Drills | straight | skill | low | handstand, ring-handstand | shoulders, transverse-abdominis |
| `hspu` | HSPU | bent | strength | moderate | handstand, shoulderstand-press | shoulders, front-delt, triceps |
| `straight-bar-dips` | Straight Bar Dips | bent | strength | moderate | muscle-up | chest, triceps |
| `bulgarian-dips` | Bulgarian Dips | bent | strength | **high** | muscle-up | chest, front-delt |
| `korean-dips` | Korean Dips | bent | strength | **high** | muscle-up | rear-delt, triceps |
| `ring-dip-deep` | Ring Dip — Deep Pause | bent | strength | moderate | muscle-up, planche, shoulderstand-press | chest, triceps |
| `ring-overhead-ext` | Ring Overhead Extension | bent | hypertrophy | moderate | — | triceps |
| `pike-push-up` | Pike Push Up | bent | strength | low | handstand, shoulderstand-press | shoulders, front-delt |
| `cuban-press` | Cuban Press | bent | hypertrophy | low | — | shoulders, rear-delt |
| `wall-kick-up` | Wall Kick-Up | straight | skill | low | handstand | shoulders, transverse-abdominis |
| `shoulderpress-negative` | Shoulderpress Negative | bent | skill | moderate | shoulderstand-press, handstand | shoulders, transverse-abdominis |

### `horizontal_push` — 9

| id | name | arm | track | tissue | feeds | primary muscles |
|---|---|---|---|---|---|---|
| `pseudo-planche-push-up` | Pseudo Planche Push Up | bent | strength | **high** | planche | serratus, front-delt, chest |
| `archer-push-up` | Archer Push Up | bent | strength | moderate | — | chest, triceps |
| `ring-fly` | Ring Fly | straight | strength | **high** | iron-cross, planche | chest, front-delt |
| `push-up-rto` | Push Up RTO | bent | hypertrophy | moderate | planche | chest, triceps, serratus |
| `bulgarian-push-up` | Bulgarian Push Up | bent | hypertrophy | **high** | — | chest, front-delt |
| `russian-push-up` | Russian Push Up + Lateral Raise | bent | hypertrophy | moderate | planche | lateral-delt, serratus |
| `planche-protraction` | Planche Protraction Drill | straight | skill | moderate | planche, handstand | serratus |
| `lateral-raise` | Lateral Raise | straight | hypertrophy | low | — | lateral-delt |
| `scapular-push-up-band` | Scapular Push Up (Band) | straight | skill | low | planche, handstand | serratus, shoulders |

### `vertical_pull` — 10

| id | name | arm | track | tissue | feeds | primary muscles |
|---|---|---|---|---|---|---|
| `chest-to-bar` | Chest to Bar | bent | strength | moderate | muscle-up | lats, biceps |
| `360-pull` | 360 Pull | bent | skill | **high** | muscle-up | lats, rectus-abdominis |
| `typewriter` | Typewriter | bent | strength | moderate | — | lats, biceps |
| `wide-pull-up` | Wide Pull Up | bent | strength | moderate | muscle-up, front-lever | lats |
| `archer-pull-up` | Archer Pull Up | bent | strength | moderate | muscle-up | lats, biceps |
| `commande` | Commando Pull Up | bent | strength | moderate | — | brachialis, lats |
| `ice-cream-maker` | Ice-cream Maker | bent | strength | **high** | front-lever | lats, serratus |
| `ring-mid-pull-up-hold` | Mid Pull-Up Hold (Rings) | bent | strength | moderate | muscle-up | lats, biceps |
| `muscle-up-negative` | Muscle Up Negative | bent | skill | moderate | muscle-up | lats, biceps, chest |
| `scapular-pull-up` | Straight-Arm Scapular Pull-Up | straight | strength | low | front-lever, muscle-up | traps, lats, rear-delt |

### `horizontal_pull` — 14

| id | name | arm | track | tissue | feeds | primary muscles |
|---|---|---|---|---|---|---|
| `row` | Row | bent | strength | low | muscle-up, front-lever | lats, rear-delt |
| `pelican-curl` | Pelican Curl | bent | hypertrophy | **high** | back-lever, front-lever | biceps |
| `ring-hammer-curl` | Ring Hammer Curl | bent | hypertrophy | moderate | — | brachialis, biceps |
| `one-arm-ring-curl` | One Arm Ring Curl | bent | hypertrophy | moderate | — | biceps |
| `ring-y-raise` | Ring Y-raise | straight | hypertrophy | low | — | rear-delt, lower-trap |
| `tyi-raise` | T-Y-I Raise | straight | hypertrophy | low | — | rear-delt, lower-trap |
| `face-pull` | Face Pull | bent | hypertrophy | low | — | rear-delt, lateral-delt |
| `cross-body-band-hold` | Cross Body Band Hold | straight | strength | **high** | iron-cross | lats, chest |
| `inverted-deadlift` | Inverted Deadlift | bent | strength | low | front-lever | lats, rear-delt |
| `candlestick-to-neg-fl` | Candlestick to Negative Front Lever | straight | skill | **high** | front-lever | lats, rectus-abdominis, rear-delt |
| `inv-deadlift-to-skin-the-cat` | Inverted Deadlift to Skin the Cat | straight | skill | **high** | back-lever, front-lever | lats, shoulders, rectus-abdominis |
| `iron-cross-pull` | Iron Cross Pull | straight | strength | **high** | iron-cross | lats, rear-delt |
| `false-grip-row` | False Grip Ring Row | bent | strength | moderate | muscle-up | lats, biceps, rear-delt |
| `feet-elevated-row` | Feet-Elevated Ring Row | bent | hypertrophy | low | muscle-up | lats, rear-delt, traps |

### `static` — 12

| id | name | arm | track | tissue | feeds | primary muscles |
|---|---|---|---|---|---|---|
| `pseudo-planche-lean` | Pseudo Planche Lean | straight | skill | **high** | planche | serratus, front-delt |
| `false-grip-dead-hang` | False Grip Dead Hang | straight | skill | **high** | muscle-up | forearms, lats |
| `tuck-planche` | Tuck Planche | straight | skill | **high** | planche | serratus, front-delt, rectus-abdominis |
| `planche-lean` | Planche Lean | straight | skill | **high** | planche | serratus, front-delt |
| `ring-support-shrug` | Ring Support Shrug | straight | hypertrophy | moderate | handstand, ring-handstand | traps |
| `wide-support-hold` | Wide Support Hold | straight | skill | **high** | iron-cross | lats, rear-delt, serratus |
| `rto-support-hold` | RTO Support Hold | straight | skill | moderate | muscle-up, ring-handstand | triceps, shoulders, serratus |
| `back-lever-negative` | Back Lever Negative | straight | skill | **high** | back-lever | lats, rear-delt, rectus-abdominis |
| `chest-wall-handstand` | Chest to Wall Handstand | straight | skill | low | handstand, ring-handstand | shoulders, serratus, transverse-abdominis |
| `back-wall-handstand` | Back to Wall Handstand | straight | skill | low | handstand, ring-handstand | shoulders, serratus, transverse-abdominis |
| `toe-pulls` | Toe Pulls | straight | skill | low | handstand | transverse-abdominis, shoulders |
| `front-lever-hold` | Front Lever Hold | straight | skill | **high** | front-lever | lats, rear-delt, rectus-abdominis |

### `core` — 22

| id | name | arm | track | tissue | feeds | primary muscles |
|---|---|---|---|---|---|---|
| `dragon-flag` | Dragon Flag | bent | strength | moderate | front-lever, manna | rectus-abdominis, transverse-abdominis |
| `copenhagen-plank` | Copenhagen Plank | n/a | hypertrophy | moderate | — | obliques, transverse-abdominis |
| `hollow-body-hold` | Hollow Body Hold | n/a | hypertrophy | low | front-lever, manna | rectus-abdominis, transverse-abdominis |
| `plank` | Plank | n/a | hypertrophy | low | — | transverse-abdominis, rectus-abdominis |
| `lateral-plank` | Lateral Plank | n/a | hypertrophy | low | — | obliques, transverse-abdominis |
| `side-plank-thread` | Side Plank + Thread Needle | n/a | hypertrophy | low | — | obliques, serratus |
| `windshield-wipers` | Windshield Wipers | straight | hypertrophy | moderate | front-lever, manna | obliques, rectus-abdominis |
| `l-sit` | L-sit | straight | skill | low | manna | hip-flexors, rectus-abdominis |
| `side-bend` | Loaded Side Bend | n/a | hypertrophy | low | — | obliques |
| `tuck-to-l` | Tuck to L — Dynamic | straight | skill | low | manna | hip-flexors, rectus-abdominis |
| `superman-hold` | Superman Hold | straight | hypertrophy | low | back-lever | erector-spinae, glutes |
| `dead-bug` | Dead Bug | n/a | hypertrophy | low | — | transverse-abdominis, rectus-abdominis |
| `hanging-oblique-twist` | Hanging Oblique Twist | straight | hypertrophy | low | — | obliques |
| `decline-crunch-band` | Decline Crunch (Band) | n/a | hypertrophy | low | — | rectus-abdominis |
| `windmill` | Windmill | straight | hypertrophy | low | — | obliques |
| `l-sit-pike-press` | L-sit Pike Press | straight | skill | low | manna | hip-flexors, rectus-abdominis, shoulders |
| `pallof-press` | Pallof Press | straight | hypertrophy | low | — | obliques, transverse-abdominis |
| `hanging-leg-raise` | Hanging Leg Raise | straight | hypertrophy | low | manna, front-lever | rectus-abdominis, hip-flexors |
| `v-sit-pulse` | V-sit Pulse | straight | skill | low | manna | hip-flexors, rectus-abdominis |
| `butt-lift` | Butt Lift | straight | skill | moderate | manna | hip-flexors, rectus-abdominis, triceps |
| `ab-wheel-rollout` | Ab Wheel Rollout | straight | hypertrophy | moderate | planche, front-lever | rectus-abdominis, transverse-abdominis |
| `dragon-flag-tuck` | Tucked Dragon Flag Negative | bent | hypertrophy | moderate | front-lever, manna | rectus-abdominis, transverse-abdominis |

### `hinge` — 5

| id | name | arm | track | tissue | feeds | primary muscles |
|---|---|---|---|---|---|---|
| `back-extension` | Back Extension | n/a | hypertrophy | low | — | erector-spinae |
| `jefferson-curl` | Jefferson Curl | n/a | hypertrophy | moderate | — | erector-spinae, hamstrings |
| `nordic-curl` | Nordic Curl | n/a | hypertrophy | **high** | — | hamstrings |
| `single-leg-deadlift` | Single Leg Deadlift | n/a | hypertrophy | low | — | hamstrings, glutes |
| `single-leg-glute-bridge` | Single Leg Glute Bridge | n/a | hypertrophy | low | — | glutes |

### `squat` — 4

| id | name | arm | track | tissue | feeds | primary muscles |
|---|---|---|---|---|---|---|
| `bulgarian-split-squat` | Bulgarian Split Squat | n/a | hypertrophy | low | — | quads, glutes |
| `pistol-squat` | Pistol Squat | n/a | hypertrophy | moderate | — | quads, glutes |
| `sissy-squat` | Sissy Squat | n/a | hypertrophy | **high** | — | quads |
| `single-leg-calf-raise` | Single Leg Calf Raise | n/a | hypertrophy | low | — | calves |

### `mobility` — 3

| id | name | arm | track | tissue | feeds | primary muscles |
|---|---|---|---|---|---|---|
| `wrist-extension-hold` | Wrist Extension Hold | straight | hypertrophy | moderate | manna, handstand | forearms |
| `german-hang` | German Hang | straight | skill | **high** | back-lever | shoulders, chest |
| `skin-the-cat` | Skin the Cat | straight | skill | **high** | back-lever | lats, shoulders, rectus-abdominis |

---

## By OG2 skill

### planche — 11 feeders

- **skill** (5): Pseudo Planche Lean *(straight-arm, static, high)* · Tuck Planche *(straight-arm, static, high)* · Planche Protraction Drill *(straight-arm, horizontal_push, moderate)* · Planche Lean *(straight-arm, static, high)* · Scapular Push Up (Band) *(straight-arm, horizontal_push, low)*
- **strength** (3): Pseudo Planche Push Up *(bent-arm, horizontal_push, high)* · Ring Dip — Deep Pause *(bent-arm, vertical_push, moderate)* · Ring Fly *(straight-arm, horizontal_push, high)*
- **hypertrophy** (3): Push Up RTO *(bent-arm, horizontal_push, moderate)* · Russian Push Up + Lateral Raise *(bent-arm, horizontal_push, moderate)* · Ab Wheel Rollout *(straight-arm, core, moderate)*

### handstand — 12 feeders

- **skill** (8): Handstand Drills *(straight-arm, vertical_push, low)* · Planche Protraction Drill *(straight-arm, horizontal_push, moderate)* · Scapular Push Up (Band) *(straight-arm, horizontal_push, low)* · Wall Kick-Up *(straight-arm, vertical_push, low)* · Chest to Wall Handstand *(straight-arm, static, low)* · Back to Wall Handstand *(straight-arm, static, low)* · Toe Pulls *(straight-arm, static, low)* · Shoulderpress Negative *(bent-arm, vertical_push, moderate)*
- **strength** (2): HSPU *(bent-arm, vertical_push, moderate)* · Pike Push Up *(bent-arm, vertical_push, low)*
- **hypertrophy** (2): Wrist Extension Hold *(straight-arm, mobility, moderate)* · Ring Support Shrug *(straight-arm, static, moderate)*

### ring-handstand — 5 feeders

- **skill** (4): Handstand Drills *(straight-arm, vertical_push, low)* · RTO Support Hold *(straight-arm, static, moderate)* · Chest to Wall Handstand *(straight-arm, static, low)* · Back to Wall Handstand *(straight-arm, static, low)*
- **hypertrophy** (1): Ring Support Shrug *(straight-arm, static, moderate)*

### shoulderstand-press — 4 feeders

- **skill** (1): Shoulderpress Negative *(bent-arm, vertical_push, moderate)*
- **strength** (3): HSPU *(bent-arm, vertical_push, moderate)* · Ring Dip — Deep Pause *(bent-arm, vertical_push, moderate)* · Pike Push Up *(bent-arm, vertical_push, low)*

### manna — 11 feeders

- **skill** (5): L-sit *(straight-arm, core, low)* · Tuck to L — Dynamic *(straight-arm, core, low)* · L-sit Pike Press *(straight-arm, core, low)* · V-sit Pulse *(straight-arm, core, low)* · Butt Lift *(straight-arm, core, moderate)*
- **strength** (1): Dragon Flag *(bent-arm, core, moderate)*
- **hypertrophy** (5): Hollow Body Hold *(n/a-arm, core, low)* · Windshield Wipers *(straight-arm, core, moderate)* · Wrist Extension Hold *(straight-arm, mobility, moderate)* · Hanging Leg Raise *(straight-arm, core, low)* · Tucked Dragon Flag Negative *(bent-arm, core, moderate)*

### muscle-up — 16 feeders

- **skill** (4): 360 Pull *(bent-arm, vertical_pull, high)* · False Grip Dead Hang *(straight-arm, static, high)* · Muscle Up Negative *(bent-arm, vertical_pull, moderate)* · RTO Support Hold *(straight-arm, static, moderate)*
- **strength** (11): Straight Bar Dips *(bent-arm, vertical_push, moderate)* · Bulgarian Dips *(bent-arm, vertical_push, high)* · Korean Dips *(bent-arm, vertical_push, high)* · Ring Dip — Deep Pause *(bent-arm, vertical_push, moderate)* · Chest to Bar *(bent-arm, vertical_pull, moderate)* · Wide Pull Up *(bent-arm, vertical_pull, moderate)* · Archer Pull Up *(bent-arm, vertical_pull, moderate)* · Row *(bent-arm, horizontal_pull, low)* · Mid Pull-Up Hold (Rings) *(bent-arm, vertical_pull, moderate)* · False Grip Ring Row *(bent-arm, horizontal_pull, moderate)* · Straight-Arm Scapular Pull-Up *(straight-arm, vertical_pull, low)*
- **hypertrophy** (1): Feet-Elevated Ring Row *(bent-arm, horizontal_pull, low)*

### back-lever — 6 feeders

- **skill** (4): German Hang *(straight-arm, mobility, high)* · Skin the Cat *(straight-arm, mobility, high)* · Inverted Deadlift to Skin the Cat *(straight-arm, horizontal_pull, high)* · Back Lever Negative *(straight-arm, static, high)*
- **hypertrophy** (2): Superman Hold *(straight-arm, core, low)* · Pelican Curl *(bent-arm, horizontal_pull, high)*

### front-lever — 15 feeders

- **skill** (3): Candlestick to Negative Front Lever *(straight-arm, horizontal_pull, high)* · Inverted Deadlift to Skin the Cat *(straight-arm, horizontal_pull, high)* · Front Lever Hold *(straight-arm, static, high)*
- **strength** (6): Dragon Flag *(bent-arm, core, moderate)* · Wide Pull Up *(bent-arm, vertical_pull, moderate)* · Ice-cream Maker *(bent-arm, vertical_pull, high)* · Row *(bent-arm, horizontal_pull, low)* · Inverted Deadlift *(bent-arm, horizontal_pull, low)* · Straight-Arm Scapular Pull-Up *(straight-arm, vertical_pull, low)*
- **hypertrophy** (6): Hollow Body Hold *(n/a-arm, core, low)* · Windshield Wipers *(straight-arm, core, moderate)* · Pelican Curl *(bent-arm, horizontal_pull, high)* · Hanging Leg Raise *(straight-arm, core, low)* · Ab Wheel Rollout *(straight-arm, core, moderate)* · Tucked Dragon Flag Negative *(bent-arm, core, moderate)*

### iron-cross — 4 feeders

- **skill** (1): Wide Support Hold *(straight-arm, static, high)*
- **strength** (3): Ring Fly *(straight-arm, horizontal_push, high)* · Cross Body Band Hold *(straight-arm, horizontal_pull, high)* · Iron Cross Pull *(straight-arm, horizontal_pull, high)*

---

## Muscle vocabulary (migrated 2026-09-08)

The generic `core` (56 uses) and `lower-back` (13) were split into anatomical slugs. Every slug below is mapped in `app.js` `MUSCLE_CAT` **and** `MUSCLE_LABEL` — before this migration, seven slugs were unmapped and silently counted as **push** volume.

| slug | dashboard category | primary-slot uses |
|---|---|---|
| `rectus-abdominis` | core | 21 |
| `transverse-abdominis` | core | 15 |
| `obliques` | core | 8 |
| `hip-flexors` | core | 6 |
| `erector-spinae` | core | 3 |
| `glutes` | legs | 5 |
| `hamstrings` | legs | 3 |
| `quads` | legs | 3 |
| `calves` | legs | 1 |
| `lats` | pull | 23 |
| `rear-delt` | pull | 15 |
| `biceps` | pull | 9 |
| `traps` | pull | 3 |
| `brachialis` | pull | 2 |
| `forearms` | pull | 2 |
| `lower-trap` | pull | 2 |
| `rhomboids` | pull | 0 |
| `brachioradialis` | pull | 0 |
| `shoulders` | push | 15 |
| `serratus` | push | 14 |
| `chest` | push | 11 |
| `triceps` | push | 9 |
| `front-delt` | push | 9 |
| `lateral-delt` | push | 3 |

**The five trunk slugs and what they mean here**

| slug | used for |
|---|---|
| `rectus-abdominis` | anti-extension and hollow-body rigidity — dragon flag, ab wheel, lever holds, hanging leg raise |
| `transverse-abdominis` | bracing / IAP — planks, dead bug, and the trunk cost of every handstand, pull-up and squat |
| `obliques` | lateral flexion, rotation, anti-rotation — Copenhagen, windshield wipers, Pallof, side bend |
| `hip-flexors` | active compression — L-sit, V-sit pulse, tuck-to-L, butt lift, pike press |
| `erector-spinae` | spinal extension — superman, back extension, Jefferson curl (was `lower-back`) |

> `hip-flexors` maps to **core**, not legs. In calisthenics, hip flexion is compression work; filing it under legs would inflate lower-body volume every time a compression skill is trained.

---

## Tissue load

### `high` + `straight` arm — 14 · THE CAPPED SET

| name | pattern | track | feeds |
|---|---|---|---|
| Pseudo Planche Lean | static | skill | planche |
| Ring Fly | horizontal_push | strength | iron-cross, planche |
| False Grip Dead Hang | static | skill | muscle-up |
| Tuck Planche | static | skill | planche |
| Planche Lean | static | skill | planche |
| Cross Body Band Hold | horizontal_pull | strength | iron-cross |
| German Hang | mobility | skill | back-lever |
| Skin the Cat | mobility | skill | back-lever |
| Candlestick to Negative Front Lever | horizontal_pull | skill | front-lever |
| Inverted Deadlift to Skin the Cat | horizontal_pull | skill | back-lever, front-lever |
| Wide Support Hold | static | skill | iron-cross |
| Iron Cross Pull | horizontal_pull | strength | iron-cross |
| Back Lever Negative | static | skill | back-lever |
| Front Lever Hold | static | skill | front-lever |

### `high`, not straight-arm — 9 · uncapped, never two on one joint per session

| name | pattern | why high |
|---|---|---|
| Pseudo Planche Push Up | horizontal_push | straight-arm lean held through a bent-arm press |
| Bulgarian Dips | vertical_push | extreme end-range pec / anterior shoulder stretch |
| Korean Dips | vertical_push | extreme end-range posterior shoulder |
| Bulgarian Push Up | horizontal_push | extreme end-range pec / anterior delt stretch |
| 360 Pull | vertical_pull | dynamic rotational load on shoulder + grip |
| Ice-cream Maker | vertical_pull | lever-to-pull-up arc, elbow under changing leverage |
| Pelican Curl | horizontal_pull | classic distal-biceps tendon stretch under load |
| Sissy Squat | squat | patellar tendon at extreme knee flexion |
| Nordic Curl | hinge | high-strain hamstring eccentric |

---

## Tallies

**pattern**

| value | n |
|---|---|
| `vertical_push` | 11 |
| `horizontal_push` | 9 |
| `vertical_pull` | 10 |
| `horizontal_pull` | 14 |
| `static` | 12 |
| `core` | 22 |
| `hinge` | 5 |
| `squat` | 4 |
| `mobility` | 3 |

**arm**

| value | n |
|---|---|
| `straight` | 40 |
| `bent` | 33 |
| `n/a` | 17 |

**track**

| value | n |
|---|---|
| `skill` | 27 |
| `strength` | 23 |
| `hypertrophy` | 40 |

**tissue_load**

| value | n |
|---|---|
| `high` | 23 |
| `moderate` | 30 |
| `low` | 37 |

**feeders per OG2 skill**

| skill | n |
|---|---|
| planche | 11 |
| handstand | 12 |
| ring-handstand | 5 |
| shoulderstand-press | 4 |
| manna | 11 |
| muscle-up | 16 |
| back-lever | 6 |
| front-lever | 15 |
| iron-cross | 4 |

**empty `feeds` — 31** (deliberate)

| name | pattern | track | primary |
|---|---|---|---|
| Copenhagen Plank | core | hypertrophy | obliques, transverse-abdominis |
| Archer Push Up | horizontal_push | strength | chest, triceps |
| Plank | core | hypertrophy | transverse-abdominis, rectus-abdominis |
| Lateral Plank | core | hypertrophy | obliques, transverse-abdominis |
| Side Plank + Thread Needle | core | hypertrophy | obliques, serratus |
| Bulgarian Push Up | horizontal_push | hypertrophy | chest, front-delt |
| Ring Overhead Extension | vertical_push | hypertrophy | triceps |
| Loaded Side Bend | core | hypertrophy | obliques |
| Typewriter | vertical_pull | strength | lats, biceps |
| Commando Pull Up | vertical_pull | strength | brachialis, lats |
| Dead Bug | core | hypertrophy | transverse-abdominis, rectus-abdominis |
| Hanging Oblique Twist | core | hypertrophy | obliques |
| Decline Crunch (Band) | core | hypertrophy | rectus-abdominis |
| Windmill | core | hypertrophy | obliques |
| Back Extension | hinge | hypertrophy | erector-spinae |
| Ring Hammer Curl | horizontal_pull | hypertrophy | brachialis, biceps |
| One Arm Ring Curl | horizontal_pull | hypertrophy | biceps |
| Ring Y-raise | horizontal_pull | hypertrophy | rear-delt, lower-trap |
| T-Y-I Raise | horizontal_pull | hypertrophy | rear-delt, lower-trap |
| Face Pull | horizontal_pull | hypertrophy | rear-delt, lateral-delt |
| Pallof Press | core | hypertrophy | obliques, transverse-abdominis |
| Jefferson Curl | hinge | hypertrophy | erector-spinae, hamstrings |
| Lateral Raise | horizontal_push | hypertrophy | lateral-delt |
| Cuban Press | vertical_push | hypertrophy | shoulders, rear-delt |
| Bulgarian Split Squat | squat | hypertrophy | quads, glutes |
| Pistol Squat | squat | hypertrophy | quads, glutes |
| Sissy Squat | squat | hypertrophy | quads |
| Single Leg Calf Raise | squat | hypertrophy | calves |
| Nordic Curl | hinge | hypertrophy | hamstrings |
| Single Leg Deadlift | hinge | hypertrophy | hamstrings, glutes |
| Single Leg Glute Bridge | hinge | hypertrophy | glutes |

---

## Review log

**R2 applied** — `scapular-pull-up` track→strength · `ring-overhead-ext` feeds→[] · `scapular-push-up-band` pattern→horizontal_push.
**R2 kept** — `straight-bar-dips` category stays `shoulder` (no `chest` value exists; `shoulder` IS the push bucket, drives CSS + logged history).

**R3 applied** — `ring-fly` track→strength · `ice-cream-maker` pattern→vertical_pull · `ring-dip-deep` feeds+shoulderstand-press · `dragon-flag-tuck` feeds+manna · `side-plank-thread` arm→n/a · `scapular-pull-up` lats→primary · `planche-protraction` pattern→horizontal_push · `tissue_load` added to all 90.
**R3 kept** — `cuban-press` stays `vertical_push` (pattern is a plane-of-motion vector). No `frontal` enum.

**R4 applied** — muscle vocabulary migrated to anatomical slugs across 61 exercises; `app.js` `MUSCLE_LABEL` / `MUSCLE_CAT` / `MUSCLE_STRETCHES` updated to match. Fixed the pre-existing bug where 7 slugs defaulted to the push category. Also corrected `ring-y-raise` primary `lower-back`→`lower-trap` (its own note says "lower trap"; erectors were never the target).

## Still worth a second look

- `lateral-raise`→`horizontal_push` and `cross-body-band-hold`→`horizontal_pull` are frontal-plane moves on a sagittal proxy (ruled acceptable R3).
- `single-leg-calf-raise`→`squat` is a bucket of convenience.
- The 23 `high` tissue_load calls are judgment, not a source. Most debatable: 360 Pull, Korean Dips, Sissy Squat, Nordic Curl.
- `front-delt`, `lateral-delt`, `brachialis`, `brachioradialis`, `rhomboids` have no entry in `MUSCLE_STRETCHES`, so no rest-period cue fires for them. Pre-existing, harmless, easy to fill.
- The trunk split changes historical readouts: the muscle tally recomputes from logs at read time, so past sessions now report core volume that previously landed in push.
