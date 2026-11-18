# Asset Inventory

Every image currently in `public/images/`, with its source, license and usage.
Sizes are the on-disk file sizes measured in phase A05 (KB, rounded to 1 decimal).

> **Layout note:** `next/image` serves local files without remote configuration.
> No image file was added, renamed, resized or deleted in this phase.
> The "Verified by owner" column is intentionally empty — leave it blank until
> the owner has confirmed each source and license.

## Files in `public/images/`

| File | Source URL | Source site | License note | Used on | Size (KB) | Verified by owner |
|---|---|---|---|---|---|---|
| `ac-ceiling.jpg` | https://unsplash.com/photos/WwzK2S0h6zU | Unsplash | Unsplash License (free to use, no attribution required) | Service `svc_006` (AC gas refill card) | 337.7 | |
| `ac-outdoor-unit.jpg` | https://unsplash.com/photos/L5sEqpQukJI | Unsplash | Unsplash License | Service `svc_005` (split AC deep cleaning card) | 1008.3 | |
| `electrician-hardhat.jpg` | https://unsplash.com/photos/LMb98OOtoYU | Unsplash | Unsplash License | Service `svc_014` (fan & light installation card) | 1222 | |
| `electrician-panel.jpg` | https://unsplash.com/photos/PkHf7BUWbtk | Unsplash | Unsplash License | Service `svc_013` (circuit breaker card) | 903.9 | |
| `hero-smartphone-repair.jpg` | https://unsplash.com/photos/K7OUs6y_cm8 | Unsplash | Unsplash License | Home hero (priority image) | 2658 | |
| `laptop-internals.jpg` | Not recorded in A01 notes (shortlist #6/#7) | Unsplash (probable) | Not verified — confirm before launch | Service `svc_003` (laptop keyboard card) | 6723.2 | |
| `pexels-tima-miroshnichenko-6755075.jpg` | https://www.pexels.com/photo/6755075/ | Pexels | Pexels License (free to use, no attribution required) | Service `svc_002` (Android battery card) | 840.9 | |
| `refrigerator.jpg` | https://unsplash.com/photos/IjfDxaiM6bE | Unsplash | Unsplash License | Services `svc_007`, `svc_008` (refrigerator cards) | 2469.6 | |
| `samsung-memory-WyOVKWGFGII-unsplash.jpg` | https://unsplash.com/photos/WyOVKWGFGII | Unsplash | Unsplash License | Service `svc_004` (PC diagnostics card) | 14414.6 | |
| `smartphone-microscope.jpg` | https://www.pexels.com/photo/6755092/ | Pexels | Pexels License | Service `svc_001` (iPhone screen card) | 929.1 | |
| `tool-wall.jpg` | https://unsplash.com/photos/S8oAMD7boWk | Unsplash | Unsplash License | Not used yet (reserve) | 7824 | |
| `tv-wall.jpg` | https://unsplash.com/photos/AL9YkVEHc3U | Unsplash | Unsplash License | Services `svc_009`, `svc_010` (TV cards) | 701.1 | |
| `washing-machine.jpg` | Not recorded in A01 notes (shortlist #14–#16) | Unsplash or Pexels (unconfirmed) | Not verified — confirm before launch | Services `svc_011`, `svc_012` (washing machine cards) | 4081.1 | |
| `workbench-tools.jpg` | https://unsplash.com/photos/2PMdixMFvvU | Unsplash | Unsplash License | Not used yet (reserve) | 1975.3 | |

### Attribution caveats

- Unsplash IDs are taken from the phase A01 shortlist notes. Photos are free
  under the Unsplash License, but the photographer names were not recorded, so
  no credit line is rendered anywhere.
- Two files (`laptop-internals.jpg`, `washing-machine.jpg`) have descriptive
  file names rather than embedded source IDs, and their exact shortlist URLs
  were not carried into the notes. Treat them as **unverified** until checked.
- Filenames that embed an ID (`samsung-memory-WyOVKWGFGII-unsplash.jpg`,
  `pexels-tima-miroshnichenko-6755075.jpg`) are self-documenting.

## Oversized files (warn only — not modified)

These exceed 1.5 MB and should be compressed before production. `next/image`
optimises delivery, but the source payloads still affect repo size and build
copies:

| File | Size (KB) |
|---|---|
| `samsung-memory-WyOVKWGFGII-unsplash.jpg` | 14414.6 |
| `tool-wall.jpg` | 7824 |
| `laptop-internals.jpg` | 6723.2 |
| `washing-machine.jpg` | 4081.1 |
| `hero-smartphone-repair.jpg` | 2658 |
| `refrigerator.jpg` | 2469.6 |
| `workbench-tools.jpg` | 1975.3 |

## Shortlisted images NOT present in `public/images/`

The A01 shortlist contained 23 candidates; 14 files were downloaded. The
missing candidates are:

| Shortlist # | Subject | Status |
|---|---|---|
| #3 | Unsplash `bCxDnnIyaNQ` | Rejected by owner in phase A01 — do not use |
| #6 / #7 | Second laptop candidate | Not downloaded (only `laptop-internals.jpg` is present) |
| #10, #11 | Unrecorded subjects | Not downloaded; no page depends on them |
| #14–#16 | Alternates for washing machine | Not downloaded (only `washing-machine.jpg` is present) |
| #18 / #19 | Alternates for the electrical panel shot | Not downloaded (only `electrician-panel.jpg` is present) |
| #23 | Unrecorded subject | Not downloaded; no page depends on it |

No UI depends on a missing file: every `image` value in
`data/mock/services.js` and the hero source point to files that exist.
