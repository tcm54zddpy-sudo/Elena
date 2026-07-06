# Mindbloom — Design System
**Version 2.0 · Juli 2026 · "Liquid Glass" Update**
*Einzige Quelle für alle Designentscheidungen. Gilt für jede neue Seite, jede Komponente, jeden Claude-Design-Prompt.*

**Was ist neu in v2.0:** Glassmorphismus ist nicht mehr auf den Hero beschränkt, sondern das durchgängige Materialsystem der gesamten Plattform — inspiriert von Apples "Liquid Glass"-Designsprache, aber nicht kopiert. Cards, Panels, Modals, Navigation, Sidebars und Floating-Elemente bestehen jetzt aus halbtransparentem, geblurrtem Glas mit weichen Rundungen, dünnen hellen Rändern und dezenten Glow-Schatten. Ruhe und Vertrauen bleiben oberste Priorität — Glas wird gedämpft und lesbar eingesetzt, nie als lautes Effekt-Feuerwerk.

---

## Inhaltsverzeichnis

1. [Brand & Vision](#1-brand--vision)
2. [Visual Language](#2-visual-language)
3. [Layout System](#3-layout-system)
4. [Components](#4-components)
5. [Motion System](#5-motion-system)
6. [Content Style](#6-content-style)
7. [Accessibility](#7-accessibility)
8. [Design Rules](#8-design-rules)
9. [Do's & Don'ts](#9-dos--donts)
10. [Claude Design Master-Prompt](#10-claude-design-master-prompt)

---

## 1. Brand & Vision

### Markenpersönlichkeit

Mindbloom ist kein Tool, keine App, kein Therapie-Ersatz. Mindbloom ist ein **Raum** — ruhig, einladend, nie überwältigend. Die Marke spricht wie ein kluger, ruhiger Freund: informiert, aber nie belehrend. Empathisch, aber nicht kitschig. Klar, aber nicht klinisch.

**Fünf Persönlichkeitsdimensionen:**

| Dimension | Mindbloom ist… | Mindbloom ist nicht… |
|---|---|---|
| Ton | Warm, klar, aufrichtig | Überschwänglich, werbend |
| Autorität | Informiert, vertrauenswürdig | Belehrend, akademisch |
| Nähe | Einladend, zugänglich | Aufdringlich, vertraulich |
| Tempo | Ruhig, bedacht | Gehetzt, laut |
| Mut | Direkt, ehrlich | Anbiedernd, vorsichtig |

### Zielgruppe

Deutschsprachige Erwachsene (primär 22–45 Jahre), die aktiv mit sich auseinandersetzen. Sie sind keine Patienten, aber auch nicht unberührt. Sie suchen Orientierung bei:

- Angst & Grübeln
- Burnout & Erschöpfung
- Trennungen & Beziehungsfragen
- Selbstwert & Identität
- Einsamkeit & Verbindung
- Persönlichem Wachstum & Sinnsuche

**Gemeinsamkeit:** Sie möchten sich nicht »behandeln« lassen — sie möchten **verstehen** und **handeln**.

### Emotionen

Das Design erzeugt folgende Emotionen — in dieser Reihenfolge der Priorität:

1. **Sicherheit** — Hier bin ich richtig. Das fühlt sich seriös an.
2. **Ruhe** — Ich muss mich nicht anstrengen, um es zu verstehen.
3. **Klarheit** — Ich weiß, wo ich bin und was mich erwartet.
4. **Ermutigung** — Ich schaffe das. Es gibt Wege.
5. **Vertrauen** — Diese Plattform meint es gut mit mir.

Das Design erzeugt **nicht**: Alarm, Dringlichkeit, Mitleid, Besorgnis, Überwältigung.

### Designprinzipien

**1. Stille als Gestaltungsmittel**
Weißraum, niedrige Sättigung, langsame Übergänge — Ruhe ist nicht Abwesenheit, sondern aktive Entscheidung.

**2. Atmosphärisch statt dekorativ**
Gradienten simulieren Lichtstimmung (Himmel, Ozean, Morgendämmerung), keine UI-Kit-Muster.

**3. iOS-Qualität in jedem Detail**
Kein Element entschuldigt sich für seine Existenz. Jede Transition, jeder Schatten, jede Rundung sitzt.

**4. Hierarchie durch Gewicht, nicht Größe**
EB Garamond 300–400 statt bold. Größe differenziert, Fettdruck nicht.

**5. Vertrauen durch Konsistenz**
Dieselben Radien, Abstände, Farben auf jeder Seite. Keine Überraschungen.

**6. Inhalt vor Chrome**
Kein dekoratives Element verdrängt Inhalt. Orbs, Gradienten und Glaseffekte sind Hintergrund — nie Hauptact.

### Keywords

`Atmosphäre · Stille · Klarheit · Wärme · Tiefe · Vertrauen · iOS-Qualität · Glassmorphismus · Serif · Gradient · Raum`

---

## 2. Visual Language

### Farbpalette

#### 2.1 Grundfarben (Seiten-Basis)

| Token | Hex | Verwendung |
|---|---|---|
| `--bg` | `#F8F7F4` | Seitenhintergrund (warm-weiß, nie reines Weiß) |
| `--white` | `#FFFFFF` | Karten, Panels, Nav-Hintergrund |
| `--dark` | `#161614` | Nur für `.alone`-Überschriften (veraltet, durch ocean ersetzt) |
| `--text` | `#1A1A1A` | Primärer Text |
| `--muted` | `#6B6B6B` | Sekundärer Text, Beschreibungen |
| `--faint` | `#ABABAB` | Eyebrows, Labels, Pfeile |
| `--border` | `rgba(0,0,0,0.08)` | Standard-Rahmen |
| `--border-m` | `rgba(0,0,0,0.13)` | Rahmen bei Hover |

#### 2.2 Akzentfarben

| Token | Hex | Bedeutung | Verwendung |
|---|---|---|---|
| `--sage` | `#5A8050` | Natur, Wachstum, Gesundheit | Primär-CTA, Links, Fortschrittsbalken |
| `--dusk` | `#6A64A0` | Intuition, Introspection, Tiefe | Check-in-Selektion, Tip-Boxen |
| `--amber` | `#B07D3A` | Wärme, Erfahrung, Reife | Akzent für Inhalte zu Gewohnheiten/Wachstum |
| `--blush` | `#A05060` | Verletzlichkeit, Beziehungen | Akzent für emotionale Inhalte |

**Regel:** Maximal zwei Akzentfarben auf einer Seite gleichzeitig aktiv.

#### 2.3 Atmosphärische Tokens (neue Designsprache)

| Token | Hex | Charakter |
|---|---|---|
| `--sky` | `#8FADC2` | Himmelblau — Klarheit |
| `--horizon` | `#689FBF` | Tieferes Blau — Weite |
| `--sunkissed` | `#D1A791` | Pfirsich — Wärme |
| `--midnight` | `#1A2D40` | Ozeanblau — Tiefe, Stille |

#### 2.4 Gradientpalette

**Atmosphärisch (Hintergründe):**

| Token | Verlauf | Kontext |
|---|---|---|
| `--g-atm-hero` | `160deg, #7A9CB8 → #B0C4D4 → #D4C0BC` | Hero-Hintergrund (Startseite) |
| `--g-ocean` | `160deg, #1A2D40 → #0E1E2C` | Dunkle Sektionen, Footer |
| `--g-dawn` | `160deg, #EEF2F8 → #F5EFF8 → #F8F0EC` | Quote-Banner, Final-CTA |

**Kategorie-Orbs (Card-Akzente):**

| Token | Verlauf | Kategorie |
|---|---|---|
| `--g-sage` | `135deg, #C8D8C0 → #8FAF88` | Wachstum, Gewohnheiten |
| `--g-dusk` | `135deg, #C4C0DC → #8A84B8` | Angst, Tiefe |
| `--g-blush` | `135deg, #DEC9C4 → #BF9690` | Beziehungen, Gefühle |
| `--g-slate` | `135deg, #B8CCDA → #7A9DB5` | Hilfe, Klarheit |
| `--g-amber` | `135deg, #DDD0B0 → #BCA870` | Routinen, Wachstum |
| `--g-rose` | `135deg, #D8BFCA → #B890A5` | Selbstwert, Identität |
| `--g-moss` | `135deg, #C0CEB8 → #7A9870` | Einsamkeit, Verbindung |
| `--g-clay` | `135deg, #D4C4B0 → #A08060` | Übergänge |

**Section-Tints (sanfte Hintergrundtönungen):**

| Klasse | Verlauf |
|---|---|
| `.section--tint-sage` | `160deg, #EFF4ED → #E8EFF6` |
| `.section--tint-dusk` | `160deg, #EDECF6 → #E8EBF7` |
| `.section--tint-amber` | `160deg, #F5F0E6 → #F0EBE0` |
| `.section--tint-blush` | `160deg, #F6F0EE → #F0EBE9` |

#### 2.5 Farbverwendungsregeln

- **Hintergrund immer `--bg`** (`#F8F7F4`), nie reines Weiß als Seiten-BG
- **Dunkel-Sektionen immer `--g-ocean`**, nie flat `#1A1A1A`
- **Kein reines Schwarz** für Text — immer `#1A1A1A` oder `#2A2A2A`
- **Gradienten-Winkel konsistent**: atmosphärische immer `160deg`, Orb-Gradienten `135deg`
- **Keine kontrastreichen Brand-Farben** auf Hintergründen — Saturation immer gedämpft

---

### Typografie

#### 2.6 Schriftfamilien

**EB Garamond** (Serif) — Persönlichkeit, Tiefe, Wärme
- Headlines, Zitate, Kapitelüberschriften
- Artikel-Fließtext (mit `font-style: italic` für Zwischentexte)
- Logo-Schrift
- Lädt über Google Fonts

**Inter** (Sans-Serif) — Klarheit, Präzision, Lesbarkeit
- Navigation, Labels, Eyebrows
- Buttons, Beschriftungen
- Body-Text (kurze UI-Texte)
- Lädt über Google Fonts

**Regel:** Nie mehr als diese zwei Schriften auf der gesamten Plattform.

#### 2.7 Typografische Skala

| Rolle | Font | Größe | Gewicht | Sonstiges |
|---|---|---|---|---|
| **Hero Headline** | EB Garamond | `clamp(42px, 6.5vw, 80px)` | 300 | `letter-spacing: -.025em` |
| **Section Title** | EB Garamond | `clamp(28px, 4vw, 46px)` | 400 | `line-height: 1.15` |
| **Article H1** | EB Garamond | `clamp(22px, 3.5vw, 32px)` | 400 | `line-height: 1.3` |
| **Article H2** | EB Garamond | `1.15rem` | 400 | `margin-top: 2.2rem` |
| **Quote** | EB Garamond | `clamp(20px, 2.6vw, 30px)` | 300 | `font-style: italic` |
| **Mission Statement** | EB Garamond | `clamp(18px, 2.5vw, 26px)` | 400 | — |
| **Card Title** | EB Garamond | `1.05rem` | 400 | `line-height: 1.35` |
| **Body (Artikel)** | EB Garamond | `15px` | 400 | `line-height: 1.85` |
| **Body (UI)** | Inter | `15px` | 300 | `line-height: 1.75` |
| **Nav Link** | Inter | `13.5px` | 400 | `letter-spacing: .01em` |
| **Button** | Inter | `13px` | 500 | `letter-spacing: .04em` |
| **Card Desc** | Inter | `12–12.5px` | 300 | `line-height: 1.55` |
| **Eyebrow / Label** | Inter | `10–11px` | 500–600 | `uppercase, letter-spacing: .12–.18em` |
| **Small Meta** | Inter | `11–12px` | 400 | `color: --faint` |

#### 2.8 Texthierarchie auf Gradient (Hero)

```
.hero__eyebrow  → rgba(255,255,255,.52)   — Inter 11px 500 uppercase
.hero__headline → rgba(255,255,255,.94)   — EB Garamond, groß, 300
.hero__sub      → rgba(255,255,255,.68)   — EB Garamond italic
```

---

### Icon-Stil

- **Quelle:** Inline SVG, kein Icon-Font
- **Stroke-Stil:** `stroke-width: 1.5`, `stroke-linecap: round`, `stroke-linejoin: round`
- **Farbe:** immer `currentColor` (erbt automatisch von Elternelement)
- **Größen:** 11px, 12px, 13px, 14px, 15px — niemals größer als Text-Kontext
- **Kein Fill:** Icons bleiben immer Line-only
- **Verwendung:** Nur für Navigation, Pfeile, kleine UI-Hinweise — nie als dekoratives Element

---

### Bildsprache

Mindbloom verwendet derzeit **keine Fotos**. Stattdessen:

- **Gradient-Orbs** als visuelle Akzente (Kreise mit Kategorie-Gradient)
- **Atmosphärische Hintergründe** als emotionale Träger
- Falls Bilder integriert werden: ruhige, desaturierte Fotografien ohne Menschen im Mittelpunkt. Naturszenen, Innenräume, Texturen — niemals Stockfoto-Ästhetik.

---

### Formen & Rundungen

```css
--r:    20px   /* Standard: Karten, Panels, Container */
--r-sm: 12px   /* Klein: Inputs, Pills, Tool-Items */
--r-lg: 28px   /* Groß: Ergebnis-Container, Modal */
100px          /* Vollrund: Buttons, Situation-Pills, Tags */
50%            /* Kreis: Orbs, Avatare, Dots */
```

**Prinzip:** Alle Rundungen aus dieser Skala. Nie zwischen diesen Werten interpolieren.

---

### Schatten

Alle Schatten haben einen **blau-violetten Farbton** — nie neutral grau:

```css
/* Standard — subtil, für ruhende Karten */
--shadow:    0 2px 8px rgba(100,110,160,.10), 0 1px 2px rgba(0,0,0,.04)

/* Medium — für Hover-Zustände und erhobene Panels */
--shadow-md: 0 8px 32px rgba(100,110,160,.16), 0 2px 8px rgba(0,0,0,.06)

/* Karten Hover (inline) */
             0 8px 32px rgba(0,0,0,.09)

/* Hero-Glaskarten */
             0 4px 20px rgba(0,0,0,.08)
/* Hero-Glaskarten Hover */
             0 12px 44px rgba(0,0,0,.13)
```

**Regel:** Kein harter Box-Shadow. Immer weich, mehrschichtig.

---

### Transparenzen & Glassmorphismus ("Liquid Glass")

Glassmorphismus ist seit v2.0 das **durchgängige Materialsystem** der Plattform — nicht mehr auf den Hero beschränkt. Jede Card, jedes Panel, jedes Modal, die Navigation, Sidebars und Floating-Elemente bestehen aus demselben Glas-Material. Ziel bleibt Ruhe: Glas wird gedämpft, nie grell eingesetzt, und Lesbarkeit hat immer Vorrang vor Transparenz.

```css
/* Standard-Glas (Cards, Panels, Boxen) */
background:        rgba(255,255,255,.50)
backdrop-filter:   blur(22px) saturate(180%)
border:            1px solid rgba(255,255,255,.55)
box-shadow:        0 8px 30px rgba(31,38,80,.10), 0 2px 8px rgba(31,38,80,.05),
                    inset 0 1px 0 rgba(255,255,255,.55)

/* Hover-Zustand */
background:        rgba(255,255,255,.68)
border-color:      rgba(255,255,255,.75)
box-shadow:        0 18px 48px rgba(31,38,80,.16), 0 4px 14px rgba(31,38,80,.08),
                    inset 0 1px 0 rgba(255,255,255,.65)
transform:         translateY(-4px)

/* Hero-Glaskarten (auf Gradient-Hintergrund, stärkerer Blur) */
background:        rgba(255,255,255,.20)
backdrop-filter:   blur(22px) saturate(180%)
border:            1px solid rgba(255,255,255,.34)

/* Nav — immer Glas, vertieft sich leicht beim Scrollen */
background:        rgba(255,255,255,.50) → rgba(255,255,255,.72) (.site-nav--scrolled)
backdrop-filter:   blur(22px) saturate(180%)
border-bottom:     1px solid rgba(255,255,255,.6)

/* Atmosphärische Nav (über Hero) */
background:        rgba(20,45,70,.30)
backdrop-filter:   blur(22px) saturate(180%)
border-bottom:     rgba(255,255,255,.14)

/* Dunkles Glas (Cookie-Banner, Overlays auf dunklem Grund) */
background:        rgba(20,25,35,.62)
backdrop-filter:   blur(24px) saturate(180%)
border:            1px solid rgba(255,255,255,.12)
```

**Prinzipien für Liquid Glass:**
- Immer `backdrop-filter` **mit** `saturate()` kombinieren — reines Blur wirkt stumpf, Saturation gibt dem Glas Lebendigkeit.
- Immer ein heller, dünner Rand (`rgba(255,255,255,.5–.75)`) — er definiert die Kante des Glases.
- Immer ein `inset 0 1px 0 rgba(255,255,255,...)` als oberer Highlight — simuliert Lichtreflexion auf der Glasoberfläche.
- Schatten bleiben weich, mehrschichtig, blau-violett getönt (s. Schatten-Sektion) — nie hart.
- Kategorie-Farbcodierung (Tags/Badges) bleibt erhalten — sie bekommen einen dezenten Glas-Rand, aber keine volle Transparenz, damit die Farbidentität nicht verloren geht.
- Hintergrund der Seite bekommt weiche, großflächige Radial-Gradients (fixed), damit das Glas etwas zum Blurren hat — dezent, nie ein auffälliges Muster.
- `prefers-reduced-transparency` und `prefers-reduced-motion` werden immer respektiert (Fallback: solide Flächen, keine Transitions).

**Transparenz-Hierarchie auf dunklem Grund:**

| Ebene | Wert | Verwendung |
|---|---|---|
| Primär | `.90–.94` | Headline, Logo |
| Sekundär | `.76–.82` | Nav-Links, Fließtext |
| Tertiär | `.65–.68` | Sub-Headline, Beschreibungen |
| Gedämpft | `.50–.52` | Eyebrows, Pfeile |
| Sehr gedämpft | `.20–.38` | Footer-Links |
| Trennlinien | `.07–.14` | Borders auf dunkel |

---

### Texturen

Mindbloom verwendet **keine Texturen**. Tiefe entsteht ausschließlich durch:
- Farbige Gradienten
- Transparenz und Blur
- Licht-Orbs (Pseudoelemente)
- Typografische Kontraste

---

## 3. Layout System

### Grid & Container

```css
/* Maximale Breite — konsistent durch alle Ebenen */
Nav / Seiten-Container:  max-width: 1200px
Content / Entry-Grid:    max-width: 1060px
Artikel:                 max-width: 700px
Quote / Check-in:        max-width: 600–760px
CTA-Text:                max-width: 520–540px
```

**Entry-Grid-Spalten:**

```css
/* Desktop */    grid-template-columns: repeat(4, 1fr)
/* Tablet */     grid-template-columns: repeat(2, 1fr)   /* ≤960px */
/* Mobile */     grid-template-columns: 1fr               /* ≤420px */
```

**Tools-Grid:**

```css
/* Desktop */    grid-template-columns: repeat(3, 1fr)
/* Tablet */     grid-template-columns: repeat(2, 1fr)   /* ≤960px */
/* Mobile */     grid-template-columns: 1fr               /* ≤420px */
```

### Breakpoints

| Breakpoint | Pixel | Anpassungen |
|---|---|---|
| Desktop | > 960px | Volle Grid-Layouts |
| Tablet | ≤ 960px | 2-spaltige Grids |
| Mobile L | ≤ 768px | Nav → Hamburger, Logo inline |
| Mobile M | ≤ 680px | Padding reduziert, Grids 1-spaltig |
| Mobile S | ≤ 600px | Footer 1-spaltig |
| Mobile XS | ≤ 420px | Entry-Grid 1-spaltig |

### Spacing-System

Alle Abstände aus dieser Skala. Nie frei erfundene Werte:

```
4px   8px   10px   12px   14px   16px   18px   20px   22px
24px  28px  32px   36px   40px   44px   48px   52px   56px
60px  64px  72px   80px   88px
```

### Section-Padding

```css
/* Standard Section */   padding: 80px 2.8rem
/* Hero */               padding: 64px 2.8rem 56px
/* Daily Quote */        padding: 72px 2.8rem 68px
/* Final CTA */          padding: 88px 2.8rem
/* Footer */             padding: 48px 2.8rem 32px
/* Mobile Section */     padding: 56px 1.6rem
```

### Weißraum-Philosophie

Mindbloom lässt Inhalte **atmen**. Abstände werden nicht als Verschwendung behandelt, sondern als Gestaltungsmittel. Wenn eine Sektion „zu viel Platz" hat, ist das meistens richtig.

**Faustregel:** Bei Zweifel — mehr Abstand, nicht weniger.

### Seitenhierarchie

Jede Seite folgt dieser Hierarchie:

```
1. Nav (fixed, 60px)
2. Hero / Page-Hero
3. Primäre Inhaltssektion (wichtigster Inhalt)
4. Sekundäre Sektion (vertiefend)
5. Tertäre Sektion (entdecken, verwandt)
6. CTA-Sektion (Weiterführung)
7. Footer
```

**Kontrast-Rhythmus:** Hell → Tint → Dunkel → Hell → Dunkel wechseln, um Sektionen voneinander abzutrennen ohne Trennlinien.

---

## 4. Components

### 4.1 Navigation

**Zweck:** Globale Orientierung, immer sichtbar.

**Aufbau:**
- Links: Nav-Links (Start, Lernen, Themen, Tools, Community, Über uns)
- Mitte: Logo »Mindbloom« (absolut zentriert)
- Rechts: Soforthilfe-Button, Bibliothek-Icon, Profil-Icon, Hamburger (mobil)

**Zustände:**

| Zustand | Beschreibung |
|---|---|
| **Standard** | `background: rgba(248,247,244,0.94)`, `backdrop-filter: blur(14px)` |
| **Atmosphärisch** | Über Hero (`.site-nav--atm`): `background: rgba(20,45,70,.28)`, weiße Links |
| **Hover (Link)** | `background: rgba(0,0,0,.045)`, etwas dunkler |
| **Aktiv** | `color: --text`, kein Underline |
| **Dropdown offen** | Chevron rotiert 180°, Link-Hintergrund aktiv |

**Mega-Menu (Themen):**
- Zweispaltig: Kategorie-Liste links (256px), Unterthemen rechts
- Erscheint bei Hover, 200ms Fade + Slide-up (6px)
- Backdrop schließt beim Klick

**Mini-Menus (Tools, Community):**
- 3-spaltig (Tools), 1-spaltig (Community)
- Gleiche Transitions wie Mega-Menu

**Mobile Drawer:**
- `position: fixed`, von oben, volle Höhe
- `backdrop-filter: blur(20px)`, leicht getönt
- Links als vollbreite Reihen mit Chevron rechts

**Abstände:**
- Nav-Höhe: `60px`
- Horizontaler Innenabstand: `32px` (Desktop), `20px` (Mobil)
- Link-Padding: `6px 11px`

---

### 4.2 Hero

**Zweck:** Emotionaler Einstieg, sofortige Orientierung, Einladung zur Exploration.

**Aufbau:**

```
[Eyebrow — klein, uppercase]
[Headline — groß, leicht]
[Subline — kursiv, gedämpft]
[Entry-Grid — 4 Glasskarten]
```

**Hintergrund:** `--g-atm-hero` (atmosphärischer Himmelsgradient)

**Dekorative Orbs (Pseudoelemente):**
- `::before` — Pfirsich, top-right, `620px × 620px`
- `::after` — Blau, bottom-left, `520px × 520px`
- `radial-gradient` zu `transparent`, `pointer-events: none`, `z-index: 0`

**Entry-Cards im Hero:**
- Glassmorphismus (s. 2. Visual Language)
- `entry-card__bg` (farbiger Hintergrundkreis) ausgeblendet (`opacity: 0`)
- `entry-card__orb` (kleiner Kreis oben) bleibt als Farbpunkt

**Padding:** `64px 2.8rem 56px`

---

### 4.3 Entry Cards

**Zweck:** Navigationskacheln zu Hauptbereichen.

**Aufbau:**

```
[Orb — 44×44px, rund, Kategorie-Gradient]
[Label — 10px, uppercase, gedämpft]
[Title — EB Garamond, 1.05rem]
[Desc — 12.5px, muted]
[Arrow — → mit Hover-Shift]
```

**Standard (auf hellem Hintergrund):**
```css
background:    var(--bg)
border:        1px solid var(--border)
border-radius: 20px
padding:       28px 24px 24px
min-height:    200px
```

**Hover:**
```css
border-color:  var(--border-m)
box-shadow:    0 8px 32px rgba(0,0,0,.09)
transform:     translateY(-3px)
transition:    .2s
```

**Hero-Variante:** Glassmorphismus (s. oben)

**Arrow Hover:** `transform: translateX(4px)`, `color: --muted`

---

### 4.4 Tool Cards

**Zweck:** Kurzvorstellung von interaktiven Tools.

**Aufbau:**

```
[Orb — 40×40px, rund]
[Name — EB Garamond .9rem]
[Desc — 11.5px, muted]
[CTA-Link — 12px, sage-farbig, Pfeil]
```

**Spezifika:**
```css
background:    var(--white)
border:        1px solid var(--border)
border-radius: 20px
padding:       22px 18px 18px
```

**CTA-Link Hover:** `gap` wächst von `6px → 10px` (visuelle Bewegung)

---

### 4.5 Buttons

**Typen:**

| Klasse | Beschreibung | Verwendung |
|---|---|---|
| `.btn--dark` | `bg: --text`, weiße Schrift | Primäre Aktion |
| `.btn--outline` | Transparent, dunkler Rahmen | Sekundäre Aktion |
| `.btn--outline-light` | Transparent, weißer Rahmen | Auf dunklem Hintergrund |

**Größen:**
```css
Standard: padding: 12px 26px, font-size: 13px
.btn--lg: padding: 15px 34px, font-size: 14px
```

**Border-Radius:** immer `100px` (vollrund)

**Hover:**
- Dark: `background: #333`
- Outline: `border-color: --text`
- Outline-Light: `border-color: rgba(255,255,255,.7)`, `color: #fff`

**Focus:** `outline: 2px solid #5A8050`, `outline-offset: 3px`

**Transition:** `all .2s`

---

### 4.6 Situation Pills

**Zweck:** Schnelle Themenwahl, emotionale Selbsteinschätzung.

**Aufbau:** Emoji + Text in vollrundem Container.

```css
background:    var(--white)
border:        1px solid var(--border)
border-radius: 100px
padding:       12px 20px
font-size:     14px
gap:           10px
```

**Hover:**
```css
background:   rgba(138,132,184,.08)
border-color: rgba(138,132,184,.30)
color:        #6A64A0
box-shadow:   0 4px 16px rgba(138,132,184,.15)
transform:    translateY(-1px)
```

---

### 4.7 Check-in Pills (ci-pill)

**Zweck:** Stimmungs-Check-in, mehrfache Auswahl möglich.

**Standard:**
```css
background:    var(--white)
border:        1px solid var(--border)
border-radius: 100px
padding:       9px 18px
font-size:     13.5px
```

**Hover:**
```css
border-color: var(--border-m)
box-shadow:   0 2px 12px rgba(0,0,0,.06)
transform:    translateY(-1px)
```

**Selected:**
```css
background:   rgba(106,100,160,.10)
border-color: rgba(106,100,160,.30)
color:        #6A64A0
```

**Soft-Variante:** `border-style: dashed`, wird bei Auswahl zu solid.

**Stagger-Animation:** nth-child(1–11), je 40ms Verzögerung, `pillFadeIn` (translateY 8px → 0)

---

### 4.8 Sections

**Typen:**

| Klasse | Hintergrund | Verwendung |
|---|---|---|
| Standard | `--bg` (#F8F7F4) | Default |
| `.section--white` | `#FFFFFF` | Aufhellend |
| `.section--tint-sage` | `160deg, #EFF4ED → #E8EFF6` | Sage-Tint |
| `.section--tint-dusk` | `160deg, #EDECF6 → #E8EBF7` | Lila-Tint |
| `.section--tint-amber` | `160deg, #F5F0E6 → #F0EBE0` | Amber-Tint |
| `.section--tint-blush` | `160deg, #F6F0EE → #F0EBE9` | Blush-Tint |
| `.section--dark` / `.alone` | `--g-ocean` | Dunkle Mission-Sektion |
| `.daily-quote` | `--g-dawn` | Zitat-Banner |
| `.final-cta` | `--g-dawn` | Abschluss-CTA |

**Dark Sections — Orb-Dekoration:**
```css
::before: radial-gradient(rgba(100,150,200,.14)), top-right, 520×520px
```

**Padding:** `80px 2.8rem` (Standard), reduziert auf Mobile

---

### 4.9 Daily Quote Banner

**Aufbau:**

```
[Label mit Linien links/rechts — uppercase, 10px]
[Quote — EB Garamond, italic, groß, fade-in]
```

**Quote-Animation:**
```css
opacity: 0 → 1 (1.1s ease)
transform: translateY(12px) → (0) (1.1s ease)
```

Wird getriggert wenn Element in Viewport scrollt (IntersectionObserver).

---

### 4.10 Formulare & Inputs

Derzeit keine vollständigen Formulare auf der Plattform. Für künftige Inputs:

**Standard Input:**
```css
background:    var(--white)
border:        1px solid var(--border)
border-radius: var(--r-sm)   /* 12px */
padding:       12px 16px
font-family:   Inter
font-size:     14px
font-weight:   300
```

**Focus:**
```css
border-color: var(--sage)
box-shadow:   0 0 0 3px rgba(90,128,80,.12)
outline:      none
```

**Error:**
```css
border-color: var(--blush)
```

---

### 4.11 Content Boxes (Artikel)

Drei Typen für eingebetteten redaktionellen Inhalt:

**Script-Box** (neutrale Information):
```css
background:    #F5F4F0
border:        1px solid var(--border-m)
border-radius: var(--r-sm)
```
Label-Farbe: `--faint`

**Journal-Box** (Reflexionsfragen):
```css
background:    #F0F4EE
border:        1px solid rgba(90,128,80,.18)
border-radius: var(--r-sm)
```
Label-Farbe: `--sage`, Text: `#3A5030`

**Tip-Box** (Hinweise, Merksätze):
```css
background:    #EEEDF6
border:        1px solid rgba(106,100,160,.18)
border-radius: var(--r-sm)
```
Text: `--dusk`, kursiv

---

### 4.12 Footer

**Hintergrund:** `--g-ocean` (160deg, #1A2D40 → #0E1E2C)

**Aufbau:**
```
[Logo links — EB Garamond, rgba(255,255,255,.8)]
[Links rechts — 12px, rgba(255,255,255,.38)]
[Trennlinie — rgba(255,255,255,.07)]
[Copyright-Zeile — 11.5px, rgba(255,255,255,.2)]
```

**Padding:** `48px 2.8rem 32px`

---

### 4.13 Reading Progress Bar (Artikel)

```css
position: fixed
top: var(--nav-h)   /* 60px */
left: 0; right: 0
height: 2px
background: linear-gradient(90deg, #C8D8C0, #5A8050)
transition: width .12s linear
```

Setzt den Fortschritt per `scrollTop / (scrollHeight - clientHeight)`.

---

### 4.14 Nav Mega-Menu

**Themen-Mega-Menu:**
```css
position: fixed
top: var(--nav-h)
background: var(--white)
box-shadow: 0 18px 44px rgba(0,0,0,.06), 0 4px 12px rgba(0,0,0,.04)
opacity: 0 → 1 (0.2s ease)
transform: translateY(-6px) → (0) (0.22s ease)
```

**Innenlayout:** 2-spaltig (`256px auto`), `gap: 48px`

---

### 4.15 Artikel-Seite

**Layout:**
```css
max-width: 700px
margin: 0 auto
padding: 2.5rem 2.8rem 6rem
```

**Back-Link:** oben, `12.5px`, `--faint`, Hover → `--muted`

**Category Label:** Vollrund-Pill, farbig getönter Hintergrund pro Kategorie

**Artikel-Typografie:**
- `h1` — EB Garamond, clamp(22–32px), 400
- `h2` — EB Garamond, 1.15rem, 400, `margin-top: 2.2rem`
- `p` — EB Garamond, 15px, 400, `line-height: 1.85`, `color: #2A2A2A`
- `blockquote` — `border-left: 2px solid rgba(90,128,80,.35)`, italic, `padding-left: 1.4rem`

---

## 5. Motion System

### 5.1 Dauer-Skala

| Kategorie | Dauer | Easing |
|---|---|---|
| Micro (Hover-Feedback) | `0.14s – 0.18s` | `ease` |
| Standard (Hover-State) | `0.20s – 0.22s` | `ease` |
| Panel-Öffnen (Dropdown) | `0.20s – 0.22s` | `ease` |
| Expand (Check-in, Accordion) | `0.55s – 0.70s` | `cubic-bezier(.4,0,.2,1)` |
| Page-Element (Fade-up) | `0.60s` | `ease forwards` |
| Zitat-Einblenden | `1.1s` | `ease` |
| Progress Bar | `0.12s` | `linear` |

### 5.2 Easing-Regeln

- **Standard-Interaktionen:** `ease` (beginnt schnell, bremst ab — natürlich)
- **Öffnende Panels:** `cubic-bezier(.4,0,.2,1)` (Material-Easing — weich, elegant)
- **Fortschrittselemente:** `linear` (kein Easing — gleichmäßig)
- **Kein `ease-in`** für User-sichtbare Animationen (fühlt sich träge an)
- **Kein `bounce`** — nie übersteuert, nie verspielt

### 5.3 Scroll-Animationen

**Fade-up (Entry-Cards):**
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up.visible { animation: fadeUp .6s ease forwards; }
/* Stagger: nth-child(2) +.08s, (3) +.16s, (4) +.24s */
```

**Quote-Reveal:**
```css
opacity: 0 → 1, transform: translateY(12px) → 0
Dauer: 1.1s ease
```

**Trigger:** `IntersectionObserver` mit kleinem `rootMargin`, nur einmal abspielen.

### 5.4 Hover-Effekte

| Element | Hover-Transformation |
|---|---|
| Entry-Card | `translateY(-3px)` |
| Hero Entry-Card | `translateY(-4px)` |
| Tool-Card | `translateY(-2px)` |
| Situation-Pill | `translateY(-1px)` |
| Check-in-Pill | `translateY(-1px)` |
| Trigger-Button | `translateY(-1px)` |
| Arrow/Pfeil | `translateX(4px)` |
| Tool-Card CTA Gap | `gap: 6px → 10px` |
| Nav-Chevron | `rotate(180deg)` bei Dropdown-Öffnen |

### 5.5 Bewusst vermiedene Animationen

- **Kein Parallax** — lenkt ab, verursacht Motion-Sickness
- **Kein Autoplay** — keine automatisch wechselnden Inhalte
- **Keine Pulse-Animationen** — nie Aufmerksamkeit erzwingen
- **Kein Bounce/Overshoot** — nie übersteuert
- **Keine langen Transitions** — alles unter 1.2s für interaktive Elemente
- **Kein Scale-Hover** (außer in Spezialfällen) — fühlt sich unnatürlich an
- **Keine komplexen Pfad-Animationen** — schlicht, direkt

### 5.6 Microinteractions

- **Pill-Stagger:** Check-in-Pills erscheinen mit 40ms Verzögerung je Element
- **Arrow-Drift:** Pfeile verschieben sich horizontal bei Hover (4px)
- **Button-Arrow:** expandiert Gap auf Hover
- **Nav-Klassen-Toggle:** `requestAnimationFrame` + passive Scroll-Listener
- **Mega-Menu Kategorie-Switch:** sanftes `subFadeIn` beim Panel-Wechsel (0.18s)

---

## 6. Content Style

### 6.1 Tonalität

**Stil:** Direkt, warmherzig, klar. Nie therapeutisch-distanziert, nie werbend-enthusiastisch.

**Stimme:** Eine kluge Person, die selbst durch schwierige Phasen gegangen ist und gelernt hat, darüber klar zu sprechen.

**Person:** Du (informell, direkt). Nie »man«, nie »Nutzer:in«.

**Tempo:** Kurze Sätze, kurze Absätze. Raum zum Atmen.

### 6.2 Überschriften

- EB Garamond, Gewicht 300–400
- Nie Satzzeichen außer Fragezeichen (die Frage ist das Einladende)
- Kurz und direkt: »Was brauchst du gerade?«, nicht »Willkommen bei Mindbloom«
- Keine Ausrufezeichen

### 6.3 Fließtext

- EB Garamond, 15px, 400, line-height 1.85 (Artikel)
- Inter, 15px, 300, line-height 1.75 (UI-Text)
- Sätze: nie länger als 3 Zeilen ohne Absatz
- Absätze: 2–4 Sätze

### 6.4 Eyebrows / Labels

- Inter, 10–11px, uppercase, letter-spacing 0.12–0.18em
- Farbe: `--faint` oder gedämpfte Akzentfarbe
- Inhalt: keine vollständigen Sätze — Kategorien, Status, kurze Orientierung

### 6.5 CTA-Texte

| Kontext | Beispiel |
|---|---|
| Hero-Button | »Jetzt Hilfe finden«, »Tools entdecken« |
| Artikel-CTA | »Mehr zu diesem Thema«, »Weitere Lektüre« |
| Nav-Link | »Soforthilfe« (aktiv, klar) |
| Footer-Link | »Über uns«, »Impressum & Datenschutz« |

CTA-Texte sind **aktiv** (Verb zuerst), **spezifisch** (nicht »Klicke hier«), **ruhig** (keine Dringlichkeit).

### 6.6 Artikel-Struktur

```
Kategorie-Label (Pill)
H1 — Titel
Subtitle — kursiv, EB Garamond
Read-Time
HR
Einleitung (1 Absatz, Kernbotschaft)
HR
Quote (optional)
HR
H2 — Abschnitt
[Paragraphen]
[Content-Box: Script / Journal / Tip]
[H2 — Abschnitt]
...
Footer-Back-Link
```

### 6.7 Lesbarkeit

- Maximale Zeilenbreite im Artikel: `700px`
- Kein Blocksatz — linksbündig
- Immer ausreichend Kontrast (s. Accessibility)
- Niemals Text auf hellem Gradient ohne ausreichenden Kontrast prüfen

---

## 7. Accessibility

### 7.1 Kontrastwerte (WCAG AA)

| Kombination | Verhältnis | Status |
|---|---|---|
| `#1A1A1A` auf `#F8F7F4` | ~16:1 | ✓ AAA |
| `#6B6B6B` auf `#F8F7F4` | ~5.7:1 | ✓ AA |
| `rgba(255,255,255,.94)` auf Gradient-Top | prüfen per Tool | Empfehlung: ≥4.5:1 |
| `#5A8050` auf `#F8F7F4` | ~4.8:1 | ✓ AA |
| `#6A64A0` auf `#F8F7F4` | ~5.2:1 | ✓ AA |

### 7.2 Fokuszustände

```css
:focus-visible {
  outline:        2px solid #5A8050
  outline-offset: 3px
  border-radius:  4px
}
```

Gilt für alle interaktiven Elemente. Nie `outline: none` ohne Alternativ-Fokusindikator.

### 7.3 Tastaturbedienung

- Alle Links, Buttons, Pills mit `Tab` erreichbar
- Mega-Menu: schließt bei `Escape`
- Mobile Drawer: schließt bei `Escape`
- `aria-label` für Icon-Buttons (Bibliothek, Profil, Burger)
- `aria-expanded` auf Trigger-Elementen
- `aria-hidden` auf geschlossenem Drawer

### 7.4 Semantisches HTML

- Korrektes `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`
- `<h1>` nur einmal pro Seite
- Heading-Hierarchie einhalten (h1 → h2 → h3, keine Lücken)
- `lang="de"` im `<html>`-Tag
- `role="dialog"` für Mega-Menu und Cookie-Banner

### 7.5 Responsive Regeln

- Keine Inhalte die nur per Hover erreichbar sind (alle kritischen Infos auch ohne Hover)
- Touch-Targets: mindestens `44×44px`
- Schriftgröße nie unter `12px` für lesbare Texte
- Kein horizontales Scrollen auf Mobile
- Burger-Menü ab `768px`

---

## 8. Design Rules

Diese Regeln gelten **immer** und **ohne Ausnahmen**:

1. **Hintergrundfarbe ist immer `#F8F7F4`** — nie reines Weiß als Seitenhintergrund
2. **Dunkle Sektionen immer `--g-ocean`** — nie flat `#000` oder `#1A1A1A`
3. **Zwei Schriften — keine dritte** — EB Garamond + Inter, fertig
4. **Maximal zwei Akzentfarben gleichzeitig** auf einer Seite
5. **Alle Rundungen aus der Skala** — `12px`, `20px`, `28px`, `100px`, `50%`
6. **Schatten immer blau-violett getönt** — nie neutral grau
7. **Eyebrows immer uppercase mit Letter-Spacing** — nie kapitäle Schrift ohne Abstand
8. **Kein Fettdruck für Emotionen** — Gewicht ≤ 500, außer Interface-Labels
9. **Animationen ≤ 0.22s für Hover, ≤ 1.2s für Seitenelemente**
10. **Kein Bounce, kein Pulse, kein Autoplay** — immer subtil und ruhig
11. **Glassmorphismus ist das durchgängige Materialsystem** — Cards, Panels, Modals, Nav, Sidebars und Floating-Elemente nutzen alle dieselbe Glas-Sprache; Konsistenz statt Einzelfall
12. **Orb-Dekorationen immer als Pseudoelemente** — nie als DOM-Elemente
13. **Arrow-Icons immer `currentColor` in `1.5 stroke`** — niemals fill
14. **CTA-Texte immer mit Verb zuerst** — aktiv, spezifisch, ruhig
15. **Artikel max. `700px` Breite** — niemals breiter
16. **Nav-Höhe immer `60px`** — body hat immer `padding-top: var(--nav-h)`
17. **Gradient-Winkel konsistent**: `160deg` (atmosphärisch), `135deg` (Orbs)
18. **Footer immer `--g-ocean`** — konsistent mit dunklen Sektionen
19. **Kein Text auf Foto-Hintergrund** — nur auf Gradienten oder Vollfarben
20. **Situation/CI-Pills: selected state immer lila (`--dusk`-Familie)** — nie grün
21. **Reading Progress Bar nur auf Artikelseiten** — nicht auf Übersichtsseiten
22. **Section-Padding immer aus der Skala** — nie `50px` oder andere Zwischenwerte
23. **`border: none` niemals auf Karten** — immer ein heller, halbtransparenter Glas-Rand (`rgba(255,255,255,.5–.75)`), auch über dunklem Hintergrund
24. **Schrift auf Gradient immer `rgba(255,255,255,...)` — niemals `#fff`** (für Kontrolle der Opazität)
25. **Jede neue Komponente braucht einen Hover-Zustand** — auch wenn minimal
26. **`nav.js?v=N` hochzählen** wenn nav.js geändert wird — alle HTML-Dateien aktualisieren
27. **`shared.css` immer nach dem `<style>`-Block laden** — nicht davor
28. **Keine Foto-Illustrationen** — nur Gradienten-Orbs und typografische Hierarchie
29. **Weißraum ist nie Verschwendung** — im Zweifel mehr Abstand wählen
30. **Kontrast vor Ästhetik** — wenn es nicht lesbar ist, ist es nicht fertig

---

## 9. Do's & Don'ts

### Do's ✓

- **Atmosphärische Gradienten** für Backgrounds — sie erzeugen Tiefe ohne Lautstärke
- **Großzügiger Weißraum** — atmen lassen, nicht füllen
- **EB Garamond für Emotionen** — headlines, Zitate, Artikel
- **Inter für Orientierung** — Nav, Labels, Buttons
- **Subtile Hover-Verschiebungen** — `translateY(-3px)` statt grosser Transformationen
- **Konsistente Rundungen** aus der Skala
- **Orb-Gradients als Kategorie-Identifikatoren** — ein visuelles System
- **Negative Überschriften** — »Was brauchst du?«, »Wann wird es besser?« — Fragen, die echte Lebenssituationen benennen
- **Glassmorphismus** als durchgängiges Materialsystem — Cards, Nav, Modals, Sidebars — konsistent, nie grell
- **Reading Progress Bars** auf Artikeln — klares nützliches Feedback
- **Staggered Animationen** für Listen-Elemente

### Don'ts ✗

- **Kein reines Schwarz** (`#000`) als Text oder Hintergrund
- **Keine knalligen Farben** — alles ist gedämpft, atmospheric
- **Keine Stockfoto-Ästhetik** — keine glücklichen Menschen vor weißem Hintergrund
- **Keine Dringlichkeitssprache** — kein »Jetzt!«, »Sofort!«, »Nicht verpassen!«
- **Keine Ausrufezeichen** in Headlines
- **Kein reines, unblurred Weiß auf Karten** — jede Fläche ist Glas: Blur + Transparenz + heller Rand, nie eine flache Farbfüllung
- **Keine Decorative Borders** zwischen Sektionen — Kontrast durch Farb-Rhythmus
- **Kein Gradient auf Gradient** — Sektionswechsel über Flatcolour oder Tint
- **Keine dritten Schriftfamilien** — auch keine System-Fonts für »Abwechslung«
- **Kein Bounce/Übersteuerte Animationen**
- **Kein Text über 1200px Breite** — immer containert
- **Keine Modalfenster für nicht-kritische Inhalte** — lieber Expand/Accordion
- **Keine langen Lade-Spinners** — UX-Lösungen vermeiden Ladezeiten-Sichtbarkeit
- **Kein Neuerfinden** von bestehenden Komponenten — das System ist konsistent, nicht kreativ-variabel

---

## 10. Claude Design Master-Prompt

Verwende diesen Prompt am Beginn jedes Claude-Design-Prompts:

---

```
Du gestaltest eine Seite oder Komponente für Mindbloom — eine deutschsprachige Mental-Health-Plattform.

IDENTITY: Mindbloom ist kein Tool, keine App — es ist ein Raum. Ruhig, klar, vertrauenswürdig. Kein soziales Netzwerk. Eine kuratierte Ressource mit iOS-Charakter.

DESIGNSPRACHE:
- Atmosphärisch statt dekorativ. Gradienten simulieren Lichtstimmung (Himmel, Ozean, Morgendämmerung).
- iOS-Qualität: Kein Element entschuldigt sich für seine Existenz.
- Hierarchie durch Gewicht, nicht Größe.

FARBEN:
- Hintergrund: #F8F7F4 (nie reines Weiß)
- Text: #1A1A1A | Gedämpft: #6B6B6B | Sehr gedämpft: #ABABAB
- Border: rgba(0,0,0,0.08) | Hover-Border: rgba(0,0,0,0.13)
- Sage (primär Akzent): #5A8050
- Dusk (sekundär Akzent): #6A64A0
- Amber: #B07D3A | Blush: #A05060
- Atmosphärisch: Sky #8FADC2 | Horizon #689FBF | Sunkissed #D1A791 | Midnight #1A2D40
- Hero-Gradient: linear-gradient(160deg, #7A9CB8 0%, #B0C4D4 45%, #D4C0BC 100%)
- Ocean (dunkel): linear-gradient(160deg, #1A2D40 0%, #0E1E2C 100%)
- Dawn (hell): linear-gradient(160deg, #EEF2F8 0%, #F5EFF8 45%, #F8F0EC 100%)

TYPOGRAFIE:
- Headlines, Zitate, Artikel: EB Garamond (300–400 Gewicht, nie bold)
- UI, Labels, Buttons, Body: Inter (300–500)
- Eyebrows: 10–11px, uppercase, letter-spacing 0.12–0.18em, Farbe --faint
- Kein dritter Font.

RUNDUNGEN: 12px (klein) | 20px (Standard) | 28px (groß) | 100px (Pills/Buttons) | 50% (Orbs)

SCHATTEN: Immer blau-violett getönt:
- Standard: 0 2px 8px rgba(100,110,160,.10), 0 1px 2px rgba(0,0,0,.04)
- Hover: 0 8px 32px rgba(100,110,160,.16), 0 2px 8px rgba(0,0,0,.06)

GLASSMORPHISMUS (durchgängiges Materialsystem — Cards, Nav, Modals, Sidebars):
- Standard: background: rgba(255,255,255,.50) | backdrop-filter: blur(22px) saturate(180%) | border: rgba(255,255,255,.55)
- Hover: background: rgba(255,255,255,.68) | border: rgba(255,255,255,.75)
- Hero (auf Gradient): background: rgba(255,255,255,.20) | backdrop-filter: blur(22px) saturate(180%) | border: rgba(255,255,255,.34)
- Immer inset-Highlight oben (rgba(255,255,255,...)) für Lichtreflexion, immer saturate() mitführen

MOTION:
- Hover: 0.18–0.22s ease
- Cards: translateY(-3px) auf Hover
- Arrows: translateX(4px) auf Hover
- Kein Bounce, kein Pulse, kein Autoplay.

LAYOUT:
- Container max: 1200px | Content max: 1060px | Artikel max: 700px
- Section-Padding: 80px 2.8rem | Mobile: 56px 1.6rem

KOMPONENTEN-REGELN:
- Alle Buttons: border-radius 100px, Inter 500, padding 12–15px 26–34px
- Cards: border-radius 20px, border rgba(0,0,0,0.08), Hover translateY(-3px) + Schatten
- Pills: border-radius 100px, fully rounded
- Nav: fixed 60px, backdrop-filter blur(14px)
- Dark sections: immer --g-ocean, nie flat schwarz
- Orb-Dekorationen als ::before/::after Pseudoelemente, radial-gradient

SPRACHE: Deutsch, direkt, warm. »Du« statt »man«. Keine Ausrufezeichen. Keine Dringlichkeit.

NICHT ERLAUBT: Dritter Font | Kontrastreiche Farben | Bounce-Animationen | Glas ohne Blur/Rand (flache Transparenz) | Text auf Foto | Reines Schwarz | Stockfoto-Stil

Halte dich exakt an dieses System. Jede neue Seite soll sich anfühlen wie ein natürlicher Teil von Mindbloom.
```

---

*Design System Version 2.0 · Mindbloom · Juli 2026 · "Liquid Glass" Update*
*Erstellt auf Basis der bestehenden Website, aller Designentscheidungen und der iOS/Glassmorphismus-Designinspiration. Glassmorphismus ist ab v2.0 das durchgängige Materialsystem statt eines auf den Hero begrenzten Effekts.*
