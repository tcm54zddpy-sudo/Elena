/* ──────────────────────────────────────────────────────────────────────────
 *  list-page.js — shared renderer for all Mindbloom list pages
 *  Each list-*.html sets window.LIST_ID before including this.
 * ────────────────────────────────────────────────────────────────────────── */

(function () {

// ── 1. CSS ──────────────────────────────────────────────────────────────────

function injectCSS() {
  if (document.getElementById('mb-listpage-css')) return;
  const s = document.createElement('style');
  s.id = 'mb-listpage-css';
  s.textContent = `
:root {
  --bg:        #F8F7F4;
  --white:     #FFFFFF;
  --border:    rgba(0,0,0,0.08);
  --border-m:  rgba(0,0,0,0.13);
  --text:      #1A1A1A;
  --muted:     #6B6B6B;
  --faint:     #ABABAB;
  --serif:     'EB Garamond', Georgia, serif;
  --serif-body:'EB Garamond', Georgia, serif;
  --sans:      'Inter', sans-serif;
  --r: 16px; --r-sm: 10px;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-weight: 300;
  font-size: 15px;
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
}
a { text-decoration: none; color: inherit; }

.list-wrapper {
  max-width: 680px;
  margin: 0 auto;
  padding: 2.5rem 2.8rem 6rem;
}
.list-back {
  display: flex; width: fit-content;
  align-items: center; gap: 6px;
  font-size: 12.5px; color: var(--faint); font-weight: 400;
  margin-bottom: 2rem;
  transition: color .18s;
}
.list-back:hover { color: var(--muted); }
.list-badge {
  display: inline-block;
  font-size: 10.5px; font-weight: 500;
  letter-spacing: .1em; text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 100px;
  margin-bottom: 1.2rem;
}
.list-wrapper h1 {
  font-family: var(--serif);
  font-size: clamp(22px, 3.5vw, 34px);
  font-weight: 400;
  line-height: 1.3;
  margin-bottom: 6px;
}
.list-divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 1.8rem 0;
}
.list-intro {
  font-family: var(--serif-body);
  font-style: italic;
  font-size: 15px;
  color: var(--muted);
  line-height: 1.85;
}
.list-section-label {
  font-size: 10.5px; font-weight: 600;
  letter-spacing: .12em; text-transform: uppercase;
  color: var(--faint);
  margin: 2rem 0 1rem;
}
.list-items {
  list-style: none;
  padding: 0;
  margin: 0 0 .5rem;
  display: flex;
  flex-direction: column;
  gap: .8rem;
}
.list-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}
.li-num {
  font-family: var(--serif);
  font-size: 1.35rem;
  font-weight: 400;
  color: rgba(0,0,0,.18);
  line-height: 1.2;
  min-width: 2.1rem;
  padding-top: 3px;
  flex-shrink: 0;
}
.li-bullet {
  font-size: 1.1rem;
  color: var(--faint);
  line-height: 1.75;
  min-width: 1.2rem;
  flex-shrink: 0;
}
.li-body { flex: 1; }
.li-title {
  display: block;
  font-family: var(--sans);
  font-size: 14px; font-weight: 500;
  color: var(--text);
  margin-bottom: .25rem;
}
.li-text {
  font-family: var(--serif-body);
  font-size: 14.5px;
  color: #3A3A3A;
  line-height: 1.8;
  margin: 0;
}
.list-closing {
  font-family: var(--serif-body);
  font-style: italic;
  font-size: 14.5px;
  color: var(--muted);
  line-height: 1.85;
}
.list-footer-nav {
  margin-top: 3.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}
.list-footer-back {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12.5px; color: var(--faint);
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 100px;
  transition: all .18s;
}
.list-footer-back:hover { border-color: var(--border-m); color: var(--muted); }
`;
  document.head.appendChild(s);
}


// ── 2. List data ────────────────────────────────────────────────────────────

const LISTS = {

  'achtsamkeit': {
    title: 'Achtsamkeitsübungen, die keine Meditation sind',
    badge: { label: 'Mindfulness', bg: 'rgba(122,157,181,.15)', color: '#4A7A99' },
    backUrl: 'topic-anxiety.html',
    backLabel: 'Anxiety & Overthinking',
    intro: 'Achtsamkeit bedeutet nicht, im Schneidersitz zu sitzen und an nichts zu denken. Diese drei Übungen funktionieren überall – ohne Vorkenntnisse, ohne besondere Umgebung.',
    closing: 'Diese Übungen wirken am besten, wenn du sie übst, bevor du sie brauchst.',
    sections: [
      {
        label: null, type: 'numbered', startAt: 1,
        items: [
          { title: 'Die Erdungsübung', text: 'Visualisiere ein Erdungskabel – Baumwurzeln, einen Schiffsanker – das von deinem Steißbein bis in den Erdmittelpunkt reicht. Du bist geerdet. Du bist hier.' },
          { title: 'Die Licht-Reinigung', text: 'Stell dir vor, wie ein weißes Licht langsam von deinem Kopf bis ins Becken wandert und dabei alle blockierende, angstbesetzte Energie mit sich trägt.' },
          { title: 'Die 4-4-8-Atmung', text: '4 Sekunden einatmen – 4 Sekunden halten – 8 Sekunden ausatmen. Das stimuliert den Vagusnerv und beruhigt das Nervensystem innerhalb weniger Minuten.' }
        ]
      }
    ]
  },

  'einsamkeit-anzeichen': {
    title: '7 Anzeichen für tiefe Einsamkeit',
    badge: { label: 'Loneliness', bg: 'rgba(138,144,160,.12)', color: '#5A6070' },
    backUrl: 'topic-loneliness.html',
    backLabel: 'Loneliness & Connection',
    intro: 'Einsamkeit ist nicht immer laut. Manchmal zeigt sie sich in Verhaltensmustern, die man erst im Nachhinein erkennt.',
    closing: 'Tiefe Einsamkeit ist eine emotionale Erfahrung – kein Persönlichkeitsmerkmal.',
    sections: [
      {
        label: null, type: 'numbered', startAt: 1,
        items: [
          { title: null, text: 'Du teilst mehr als nötig, sobald jemand wirklich zuhört – Oversharing als Ventil für alles Aufgestaute.' },
          { title: null, text: 'Du fühlst dich wie die ersetzbare Person in einer Gruppe – dabei, aber nicht wirklich dazugehörend.' },
          { title: null, text: 'Du stellst die Bedürfnisse anderer konsequent über deine eigenen.' },
          { title: null, text: 'Du hast das Gefühl, übertrieben nett und hilfsbereit sein zu müssen, um gemocht zu werden.' },
          { title: null, text: 'Du fühlst dich isoliert und unsichtbar – auch unter Menschen.' },
          { title: null, text: 'Du fühlst dich nirgendwo wirklich zugehörig.' },
          { title: null, text: 'Du denkst intensiv und wiederholt über einzelne Freundschaften nach.' }
        ]
      }
    ]
  },

  'einsamkeit-tipps': {
    title: '13 Therapeuten-Tipps gegen akute Einsamkeit',
    badge: { label: 'Loneliness', bg: 'rgba(138,144,160,.12)', color: '#5A6070' },
    backUrl: 'topic-loneliness.html',
    backLabel: 'Loneliness & Connection',
    intro: 'Einsamkeit bedeutet nicht immer, dass niemand da ist – oft ist es das Gefühl, von niemandem wirklich verstanden zu werden. Diese dreizehn Schritte holen dich aus der Isolation.',
    closing: null,
    sections: [
      {
        label: 'Den Blick nach innen richten', type: 'numbered', startAt: 1,
        items: [
          { title: 'Zeichne deine Einsamkeit', text: 'Gib ihr eine Form, eine Farbe, einen Ort im Körper. Das nimmt ihr die überwältigende Macht.' },
          { title: 'Erinnere dich, was an dir gut ist', text: 'Mach eine konkrete Liste – gerade dann, wenn du besonders hart zu dir selbst bist.' },
          { title: 'Feiere deine Alleinzeit', text: 'Koche etwas Leckeres, geh ins Kino, behandle dich so, wie du behandelt werden möchtest.' },
          { title: 'Hinterfrage die Angst vor Ablehnung', text: 'Erinnerst du dich an Situationen, in denen Fremde auf dich zugegangen sind? Hast du sie komisch gefunden – oder die Verbindung genossen?' },
          { title: 'Mach Pause von Social Media', text: 'Das Scrollen durch die Highlights anderer verstärkt das Gefühl des Verpassens, statt es zu lindern.' }
        ]
      },
      {
        label: 'Kleine Schritte der Verbindung', type: 'numbered', startAt: 6,
        items: [
          { title: 'Entscheide bewusst, wie du sozialisierst', text: 'Ein kurzes Meme per Nachricht, ein Telefonat, ein Treffen – was brauchst du gerade wirklich?' },
          { title: 'Scrolle durch deine Kontakte', text: 'Allein das erinnert dich daran, dass du Menschen in deinem Leben hast, an die du dich wenden könntest.' },
          { title: 'Tu etwas Produktives', text: 'Eine erledigte Kleinigkeit bringt dich in einen Flow-Zustand und lässt die Alleinzeit weniger leer enden.' }
        ]
      },
      {
        label: 'Raus in die Welt', type: 'numbered', startAt: 9,
        items: [
          { title: 'Warte nicht auf ein Plus-Eins', text: 'Du brauchst keine Begleitung, um das neue Restaurant oder die Ausstellung auszuprobieren. Alleinsein ist ein Skill.' },
          { title: 'Misch dich unter Menschen', text: 'Arbeite im Café, geh spazieren. Physische Präsenz unter Menschen lindert Isolation – auch ohne Gespräche.' },
          { title: 'Tritt einer Gruppe bei, die deine Interessen teilt', text: 'Buchtisch, Sportverein, Kochkurs – hier triffst du Menschen, mit denen du bereits etwas gemein hast.' },
          { title: 'Engagiere dich ehrenamtlich', text: 'Anderen zu helfen gibt das Gefühl, gebraucht zu werden – und schafft echte Verbundenheit.' },
          { title: 'Zeige dir aktive Selbstfürsorge', text: 'Tu genau das, was dir Trost gibt, ohne dich dafür zu verurteilen.' }
        ]
      }
    ]
  },

  'energy-takers-givers': {
    title: 'Energy Takers vs. Energy Givers',
    badge: { label: 'Energie', bg: 'rgba(188,168,112,.15)', color: '#907840' },
    backUrl: 'topic-stress.html',
    backLabel: 'Stress & Burnout',
    intro: 'Wir vergessen im Alltag oft die absoluten Basics. Dein Körper und dein Geist sind wie eine Batterie – achte darauf, was sie entlädt und was sie auflädt.',
    closing: 'Kleine Anpassungen in einer Kategorie haben direkte Wirkung auf die andere.',
    sections: [
      {
        label: 'Energy Takers – was dich leer macht', type: 'bullets', startAt: 1,
        items: [
          { title: null, text: 'Dehydration' },
          { title: null, text: 'Zucker und Junk Food' },
          { title: null, text: 'Angst, Zweifel und Overthinking' },
          { title: null, text: 'Sich Sorgen machen und nachhalten' },
          { title: null, text: 'Unordnung in der Umgebung' },
          { title: null, text: 'Gossip und Lästern' },
          { title: null, text: 'People Pleasing' },
          { title: null, text: 'Den ganzen Tag sitzen' }
        ]
      },
      {
        label: 'Energy Givers – was dich auflädt', type: 'bullets', startAt: 1,
        items: [
          { title: null, text: 'Sonnenlicht und frische Luft' },
          { title: null, text: 'Bewegung – auch nur 10 Minuten' },
          { title: null, text: 'Musik und bewusstes Atmen' },
          { title: null, text: 'Ausreichend Wasser und gesundes Essen' },
          { title: null, text: 'Echte Verbindungen mit Menschen, bei denen du du selbst sein kannst' },
          { title: null, text: 'Positiver Selbsttalk' },
          { title: null, text: 'Im Moment leben' },
          { title: null, text: 'Akzeptanz – von dem, was sich nicht verändern lässt' }
        ]
      }
    ]
  },

  'essverhalten': {
    title: '5 Warnsignale für ein gestörtes Essverhalten',
    badge: { label: 'Body Image', bg: 'rgba(191,150,144,.15)', color: '#9A6060' },
    backUrl: 'topic-self-worth.html',
    backLabel: 'Self-Worth & Identity',
    intro: 'Nicht jede schwierige Beziehung zum Essen ist sofort eine Essstörung. Aber manche Muster verdienen Aufmerksamkeit.',
    closing: 'Wenn du dich in diesen Punkten wiedererkennst, ist professionelle Unterstützung kein Zeichen von Schwäche – sondern ein konkreter nächster Schritt.',
    sections: [
      {
        label: null, type: 'numbered', startAt: 1,
        items: [
          { title: null, text: 'Deine Gedanken kreisen ständig um Essen, Kalorien und Gewichtsreduktion.' },
          { title: null, text: 'Essen stellt eine zunehmende Überforderung dar und wird angstbesetzt.' },
          { title: null, text: 'Du ignorierst innere Körpersignale wie Hunger und Sättigung.' },
          { title: null, text: 'Das Körpergewicht dominiert vollständig dein Essverhalten und deine Tagesstruktur.' },
          { title: null, text: 'Eine geringe Gewichtszunahme löst sofort Angst, Panik oder Gegenmaßnahmen aus.' }
        ]
      }
    ]
  },

  'gewohnheiten': {
    title: 'Die 10 Gewohnheiten positiver Menschen',
    badge: { label: 'Habits', bg: 'rgba(184,160,80,.15)', color: '#8A7030' },
    backUrl: 'topic-habits.html',
    backLabel: 'Habits & Growth',
    intro: 'Positiv sein bedeutet nicht, dass alles gut ist. Es ist eine Entscheidung darüber, wie man mit dem umgeht, was nicht gut ist.',
    closing: null,
    sections: [
      {
        label: null, type: 'numbered', startAt: 1,
        items: [
          { title: null, text: 'Sie akzeptieren Dinge ohne Groll – und vergeben, auch wenn sie nicht vergessen.' },
          { title: null, text: 'Sie nutzen Tagträume zur Visualisierung, statt sich dafür zu schämen.' },
          { title: null, text: 'Sie bestrafen sich nicht selbst für Fehler.' },
          { title: null, text: 'Sie lehnen die Opfermentalität ab und übernehmen Verantwortung für das, was sie kontrollieren können.' },
          { title: null, text: 'Sie sind proaktiv und warten nicht darauf, dass Glück zu ihnen kommt.' },
          { title: null, text: 'Sie spüren tiefe Dankbarkeit – und sprechen sie auch aus.' },
          { title: null, text: 'Sie wissen, wann es Zeit ist loszulassen.' },
          { title: null, text: 'Sie lassen ihre Lebensentscheidungen nicht von Angst diktieren.' },
          { title: null, text: 'Sie vergleichen sich nicht mit anderen.' },
          { title: null, text: 'Sie feiern bewusst auch die ganz kleinen Erfolge.' }
        ]
      }
    ]
  },

  'keine-rechtfertigung': {
    title: 'Dinge, für die du dich niemals rechtfertigen musst',
    badge: { label: 'Boundaries', bg: 'rgba(138,132,184,.15)', color: '#6A64A0' },
    backUrl: 'topic-self-worth.html',
    backLabel: 'Self-Worth & Identity',
    intro: 'Grenzen brauchen keine Begründung. Hier sind die Dinge, für die du niemandem eine Erklärung schuldest.',
    closing: 'Ein „Nein" ist eine vollständige Antwort.',
    sections: [
      {
        label: null, type: 'bullets', startAt: 1,
        items: [
          { title: null, text: 'Warum du jemanden verlässt, der dir nicht mehr guttut.' },
          { title: null, text: 'Wenn du eine toxische Freundschaft oder Beziehung beendest.' },
          { title: null, text: 'Wann oder wie oft du Pausen machst.' },
          { title: null, text: 'Wenn du deine Karriere oder Lebensrichtung änderst.' },
          { title: null, text: 'Wen du liebst oder warum du diese Person liebst.' },
          { title: null, text: 'Wie du deine Freizeit verbringst.' },
          { title: null, text: 'Warum du noch verletzt bist von etwas, das dich verletzt hat.' }
        ]
      }
    ]
  },

  'komplimente': {
    title: 'Komplimente, die wirklich ankommen',
    badge: { label: 'Connection', bg: 'rgba(184,144,165,.15)', color: '#9A6888' },
    backUrl: 'topic-relationships.html',
    backLabel: 'Relationships',
    intro: '„Du siehst gut aus" ist einfach. Wer jemandem wirklich den Tag verschönern will, lobt Charakter, Haltung und Fähigkeiten – nicht das Äußere.',
    closing: null,
    sections: [
      {
        label: 'Komplimente, die nichts mit dem Aussehen zu tun haben', type: 'bullets', startAt: 1,
        items: [
          { title: null, text: '„Du bist wirklich gut darin, komplexe Ideen einfach zu erklären."' },
          { title: null, text: '„Die Art, wie du anderen zuhörst und ihre Perspektiven respektierst, ist bewundernswert."' },
          { title: null, text: '„Deine Energie steckt an – du machst jeden Raum angenehmer."' },
          { title: null, text: '„Du hast sehr hart gearbeitet, um dort zu sein, wo du bist. Ich hoffe, du weißt das."' },
          { title: null, text: '„Du inspirierst mich, eine bessere Person zu werden."' },
          { title: null, text: '„Deine Anwesenheit macht in meinem Leben einen echten Unterschied."' }
        ]
      },
      {
        label: 'Und so nimmst du ein Kompliment an – ohne es sofort abzuwehren', type: 'bullets', startAt: 1,
        items: [
          { title: null, text: '„Danke." (einfach und vollständig)' }
        ]
      }
    ]
  },

  'prokrastination': {
    title: '15 effektive Wege gegen Prokrastination',
    badge: { label: 'Habits', bg: 'rgba(184,160,80,.15)', color: '#8A7030' },
    backUrl: 'topic-habits.html',
    backLabel: 'Habits & Growth',
    intro: 'Aufschieben ist selten ein Disziplinproblem. Fast immer steckt etwas anderes dahinter – Versagensangst, fehlende Struktur, Perfektionismus. Diese 15 Ansätze helfen, die eigentlichen Blockaden zu überwinden.',
    closing: null,
    sections: [
      {
        label: null, type: 'numbered', startAt: 1,
        items: [
          { title: 'Priorisieren', text: 'Was muss heute wirklich fertig sein – und was nicht?' },
          { title: 'Aufgaben konkret planen', text: 'Nicht „Sport machen", sondern „Dienstag, 18 Uhr, 30 Minuten laufen".' },
          { title: 'Das eigene Arbeitstempo kennen', text: 'Wann bist du fokussiert – und wann ist Energie verschwendet?' },
          { title: 'Störungen aktiv vermeiden', text: 'Telefon weg, Benachrichtigungen aus, Umgebung vorbereiten.' },
          { title: 'Große Aufgaben zerlegen', text: 'Nicht „Buch schreiben", sondern „heute eine Seite".' },
          { title: 'Die 50-Prozent-Regel', text: 'Nimm dir nur die Hälfte vor. Du wirst fast immer weitermachen.' },
          { title: 'Die Arbeitszeitreduktion', text: 'Weniger Zeit für eine Aufgabe einplanen erzeugt fokussierten Druck.' },
          { title: 'Das eigene Aufschieben aktiv hinterfragen', text: 'Wovor weiche ich eigentlich aus?' },
          { title: 'Die Ritual-Technik', text: 'Ein kurzes festes Ritual vor der Arbeit signalisiert dem Gehirn: Jetzt beginnt es.' },
          { title: 'Auf die Minute genau anfangen', text: 'Nicht „gleich", sondern „jetzt, 14:32 Uhr".' },
          { title: 'Den persönlichen Leistungsrhythmus kennen', text: 'Wann bist du am schärfsten – morgens, nachmittags, abends?' },
          { title: 'Arbeit und Freizeit klar trennen', text: 'Feste Endzeiten schützen vor dauerhaftem Aufschub.' },
          { title: 'Dich selbst belohnen', text: 'Kleine Erfolge verdienen echte Anerkennung.' },
          { title: 'Pläne aussprechen', text: 'Jemandem von einem Vorhaben erzählen erhöht die Verbindlichkeit.' },
          { title: 'Professionelle Unterstützung holen', text: 'Wenn Prokrastination mit Angst oder Depression zusammenhängt.' }
        ]
      }
    ]
  },

  'red-flags': {
    title: '7 Red Flags bei dir selbst',
    badge: { label: 'Self-Reflection', bg: 'rgba(138,132,184,.15)', color: '#6A64A0' },
    backUrl: 'topic-self-worth.html',
    backLabel: 'Self-Worth & Identity',
    intro: 'Wir erkennen toxische Muster oft zuerst in anderen. Manchmal lohnt es sich, den Blick nach innen zu richten.',
    closing: 'Red Flags sind keine Urteile. Sie sind Einladungen, genauer hinzusehen.',
    sections: [
      {
        label: null, type: 'numbered', startAt: 1,
        items: [
          { title: null, text: 'Du bist dir selbst gegenüber abwertend und machst dich regelmäßig runter.' },
          { title: null, text: 'Dein Selbstwertgefühl hängt fast vollständig von der Einschätzung anderer ab.' },
          { title: null, text: 'Du ghostest lieber oder sabotierst dich selbst, anstatt Konflikte direkt anzusprechen.' },
          { title: null, text: 'Deine Erwartungen an dich selbst sind so hoch, dass Scheitern keine Option ist – und du dich bestrafst, wenn du sie nicht erfüllst.' },
          { title: null, text: 'Du versuchst, das Verhalten anderer zu kontrollieren.' },
          { title: null, text: 'Du verbringst unverhältnismäßig viel Zeit auf Social Media.' },
          { title: null, text: 'Du steckst in einseitigen Beziehungen fest und gibst konsequent mehr, als du zurückbekommst.' }
        ]
      }
    ]
  },

  'schwierige-gespraeche': {
    title: '6 Wege, schwierige Gespräche sicher zu beginnen',
    badge: { label: 'Communication', bg: 'rgba(184,144,165,.15)', color: '#9A6888' },
    backUrl: 'topic-relationships.html',
    backLabel: 'Relationships',
    intro: 'Die größte Hürde bei heiklen Gesprächen ist oft nicht das Gespräch selbst, sondern der Einstieg. Diese sechs Formulierungen helfen, einen sicheren Rahmen zu schaffen.',
    closing: 'Das Ziel ist kein perfektes Gespräch – sondern eines, das überhaupt stattfindet.',
    sections: [
      {
        label: null, type: 'numbered', startAt: 1,
        items: [
          { title: null, text: '„Ich weiß, es ist schwer, über [Thema] zu sprechen. Unsere Beziehung ist mir wichtig – bist du gerade offen für ein Gespräch?"' },
          { title: null, text: '„Ich möchte den Elefanten im Raum ansprechen. Hast du gerade einen Moment?"' },
          { title: null, text: '„Ich würde gerne mit dir darüber reden, damit wir beide besser verstehen, was passiert ist."' },
          { title: null, text: '„Ich habe gemerkt, dass du frustriert warst. Kannst du mir mehr davon erzählen?"' },
          { title: null, text: '„Ich brauche deine Hilfe, um zu verstehen, was gerade zwischen uns steht. Hast du ein paar Minuten?"' },
          { title: null, text: '„Ich will nicht streiten. Können wir uns setzen und offen darüber sprechen?"' }
        ]
      }
    ]
  },

  'shadow-work': {
    title: 'Tagebuch-Prompts zum Loslassen',
    badge: { label: 'Shadow Work', bg: 'rgba(143,175,136,.15)', color: '#5A8050' },
    backUrl: 'topic-emotions.html',
    backLabel: 'Emotions & Resilience',
    intro: 'Shadow Work beginnt mit einer ehrlichen Frage. Diese fünf Prompts helfen, festgehaltene Muster, Überzeugungen und Beziehungen zu identifizieren – und loszulassen.',
    closing: 'Diese Fragen sind kein Test. Es gibt keine richtigen Antworten – nur ehrliche.',
    sections: [
      {
        label: null, type: 'numbered', startAt: 1,
        items: [
          { title: null, text: 'Welche Glaubenssätze halten mich zurück – und woher kommen sie?' },
          { title: null, text: 'Welche Emotionen verdränge ich gerade, die ich loslassen müsste, um freier zu sein?' },
          { title: null, text: 'Welche Beziehungen belasten mich – und was hält mich davon ab, sie zu verändern oder zu beenden?' },
          { title: null, text: 'Welche Muster wiederhole ich immer wieder – und was würde ich gewinnen, wenn ich sie aufgäbe?' },
          { title: null, text: 'Welche Erwartungen an mich selbst machen mich kleiner statt größer?' }
        ]
      }
    ]
  },

  'therapie-aha': {
    title: 'Wertvolle AHA-Momente aus der Therapie',
    badge: { label: 'Mental Health', bg: 'rgba(143,175,136,.15)', color: '#5A8050' },
    backUrl: 'topic-emotions.html',
    backLabel: 'Emotions & Resilience',
    intro: 'Manchmal braucht es Jahre für eine Erkenntnis, die in einem Satz passt. Hier sind die wichtigsten.',
    closing: null,
    sections: [
      {
        label: null, type: 'numbered', startAt: 1,
        items: [
          { title: 'Kontrolle', text: 'Du kannst andere Menschen nicht kontrollieren – nur, wie du mit ihnen umgehst.' },
          { title: 'Emotionen vs. Fakten', text: 'Gefühle sind die am wenigsten zuverlässigen Beweise. Hinterfrage sie regelmäßig.' },
          { title: 'Heilung ist nicht linear', text: 'Sie neigt zu Ebbe und Flut – und das ist völlig normal.' },
          { title: 'Der Knick im Schlauch', text: 'Wer sich der Trauer verschließt, verschließt sich gleichzeitig der Freude.' },
          { title: 'Selbstmitgefühl', text: 'Behandle dich selbst mit derselben Freundlichkeit, die du einem guten Freund entgegenbringen würdest.' },
          { title: 'Gefühle brauchen Raum', text: 'Erlaube deinen Emotionen, so groß zu sein, wie sie sind.' },
          { title: '„Und was dann?"', text: 'Spiele Worst-Case-Szenarien durch – und frage dich jeweils: Und was dann? Das nimmt der Angst ihre Macht.' },
          { title: 'Kleine Gewinne zählen', text: 'Wenn du dich nicht gut fühlst, passe deine Erwartungen an. Der Weg ins Fitnessstudio ist bereits ein Erfolg.' },
          { title: 'Perfektion ist willkürlich', text: 'Sie existiert nicht. Und alles, was du daran misst, auch nicht.' }
        ]
      }
    ]
  },

  'therapie-hacks': {
    title: '10 Therapie-Hacks gegen das Gedankenkarussell',
    badge: { label: 'Overthinking', bg: 'rgba(122,157,181,.15)', color: '#4A7A99' },
    backUrl: 'topic-anxiety.html',
    backLabel: 'Anxiety & Overthinking',
    intro: 'Negative Gedanken lassen sich nicht abstellen – aber man muss sie nicht unkommentiert ertragen. Diese zehn Techniken aus der kognitiven Verhaltenstherapie helfen, dem inneren Kritiker den Wind aus den Segeln zu nehmen.',
    closing: 'Kognitive Defusion und Grounding gehören zu den wirksamsten Techniken der Verhaltenstherapie – sie funktionieren am besten in Kombination.',
    sections: [
      {
        label: null, type: 'numbered', startAt: 1,
        items: [
          { title: 'Sprich mit dir wie mit einem Freund', text: 'Nach einem Fehler nicht: „Ich bin so dumm" – sondern: „Die Situation war schwer. Beim nächsten Mal bin ich besser vorbereitet."' },
          { title: 'Der Kinderfoto-Trick', text: 'Stell ein Bild von dir als Kind in die Nähe. Wenn der innere Kritiker losschreit, schau das Foto an. Es weckt Sanftmut.' },
          { title: 'Stoppe das „Shoulding"', text: 'Verbanne die schambehafteten „Ich sollte..."-Gedanken. Sie sind fast immer Perfektionismus in Verkleidung.' },
          { title: 'Zeichne einen Sorgenkreis', text: 'Schreib innen, was du beeinflussen kannst – außen, was nicht. Dann lass das Äußere los.' },
          { title: 'Plane feste „Sorgenzeiten"', text: '15 bis 30 Minuten täglich für Ängste und Grübeleien. Außerhalb dieser Zeit: verschieben.' },
          { title: 'Catch, Check, Change', text: 'Einen negativen Gedanken einfangen, seinen Wahrheitsgehalt prüfen, in etwas Realistisches umwandeln.' },
          { title: 'Verschiebe Gedanken auf den Morgen', text: 'Schreib nächtliche Grübeleien auf. Das Signal ans Gehirn: „Gehört – aber nicht jetzt."' },
          { title: 'Grüble über Positives', text: 'Zwinge dich zur Abwechslung, intensiv über schöne Erinnerungen oder Erfolge nachzudenken.' },
          { title: 'Der 5-4-3-2-1-Trick', text: '5 Dinge sehen, 4 fühlen, 3 hören, 2 riechen, 1 schmecken. Raus aus dem Kopf, rein in die Sinne.' },
          { title: 'Singe deine aufdringlichen Gedanken', text: 'Zur Melodie eines beliebigen Songs. Das nimmt jedem Gedanken sofort seine Schwere.' }
        ]
      }
    ]
  }

};


// ── 3. Render ───────────────────────────────────────────────────────────────

const ARROW_LEFT = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>';

function pad(n) { return n < 10 ? '0' + n : '' + n; }

function escAttr(s) {
  return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function renderSection(section, sIdx) {
  let counter = section.startAt || 1;
  const isNum = section.type === 'numbered';
  const itemsHtml = section.items.map(function(item, iIdx) {
    const id        = 'list-' + window.LIST_ID + '-' + sIdx + '-' + iIdx;
    const titleStr  = item.title || '';
    const textStr   = item.text  || '';
    const saveTitle = escAttr(titleStr ? titleStr : textStr.slice(0, 80));
    const saveText  = escAttr((titleStr ? titleStr + ' — ' : '') + textStr);

    const indicator = isNum
      ? '<span class="li-num">' + pad(counter++) + '</span>'
      : '<span class="li-bullet">–</span>';
    const body =
      (titleStr ? '<strong class="li-title">' + titleStr + '</strong>' : '') +
      (textStr  ? '<p class="li-text">' + textStr + '</p>' : '') +
      '<div class="mb-save-wrap" data-lib-id="' + id + '" data-lib-title="' + saveTitle + '" data-lib-text="' + saveText + '"></div>';
    return '<li class="list-item">' + indicator + '<div class="li-body">' + body + '</div></li>';
  }).join('');
  return '<ul class="list-items">' + itemsHtml + '</ul>';
}

function render() {
  const data = LISTS[window.LIST_ID];
  if (!data) return;

  document.title = 'Mindbloom — ' + data.title;

  const body = document.getElementById('list-body');
  if (!body) return;

  let html = '';

  html += '<a class="list-back" href="' + data.backUrl + '">' + ARROW_LEFT + ' ' + data.backLabel + '</a>';
  html += '<div class="list-badge" style="background:' + data.badge.bg + ';color:' + data.badge.color + ';">' + data.badge.label + '</div>';
  html += '<h1>' + data.title + '</h1>';
  html += '<hr class="list-divider">';

  if (data.intro) {
    html += '<p class="list-intro">' + data.intro + '</p>';
    html += '<hr class="list-divider">';
  }

  data.sections.forEach(function(section, sIdx) {
    if (section.label) {
      html += '<div class="list-section-label">' + section.label + '</div>';
    }
    html += renderSection(section, sIdx);
  });

  if (data.closing) {
    html += '<hr class="list-divider">';
    html += '<p class="list-closing">' + data.closing + '</p>';
  }

  body.innerHTML = html;

  // Inject Save Insight buttons if MBLibrary is available
  if (window.MBLibrary) {
    var sourceUrl = window.location.pathname.split('/').pop();
    body.querySelectorAll('.mb-save-wrap[data-lib-id]').forEach(function(wrap) {
      var btn = MBLibrary.createButton({
        id:        wrap.dataset.libId,
        type:      'insight',
        title:     wrap.dataset.libTitle,
        text:      wrap.dataset.libText,
        source:    data.title,
        sourceUrl: sourceUrl
      });
      wrap.appendChild(btn);
    });
  }

  const footer = document.getElementById('list-footer');
  if (footer) {
    footer.innerHTML = '<a class="list-footer-back" href="' + data.backUrl + '">' + ARROW_LEFT + ' ' + data.backLabel + '</a>';
  }
}


// ── 4. Init ─────────────────────────────────────────────────────────────────

injectCSS();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render);
} else {
  render();
}

})();
