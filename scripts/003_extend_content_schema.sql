-- Extend site_content with new sections for full CMS coverage
-- This script adds rows for navigation, poems, recordings, books, about, archive, and intervals

-- Navigation items (with enabled/order support)
INSERT INTO site_content (id, content) VALUES
  ('nav_items', '{
    "items": [
      {"id": "read", "label": "Read", "href": "/read", "enabled": true, "order": 1},
      {"id": "listen", "label": "Listen", "href": "/listen", "enabled": true, "order": 2},
      {"id": "books", "label": "Books", "href": "/books", "enabled": true, "order": 3},
      {"id": "about", "label": "About", "href": "/about", "enabled": true, "order": 4},
      {"id": "intervals", "label": "Intervals", "href": "/intervals", "enabled": true, "order": 5}
    ]
  }')
ON CONFLICT (id) DO NOTHING;

-- Poems for Read page
INSERT INTO site_content (id, content) VALUES
  ('read_page', '{
    "title": "Read",
    "intro": "A small selection of poems and fragments.",
    "footer_text": "Some pieces find their way into books.",
    "poems": [
      {
        "id": "recital",
        "title": "Recital",
        "enabled": true,
        "order": 1,
        "stanzas": [
          "I am wearing a horse''s head\nand still you do not notice me.\nThe nail varnish on my toes matches\nthe mint-cream green of your t-shirt.\nNeither of us are wearing socks.",
          "I''m part of a much larger horse,\nyou''ll see it soon;\nhandcrafted bamboo frames\nwrinkled with white tissue paper,\na chorus line of horse parts\nall singing the same horse song.",
          "I spy you in the crowd, spilling\na secret to someone who isn''t me\nas we clip-clop on stage\nfor the opening number.",
          "My horse head mouth does not move\nbut underneath it I am singing\nwith a mouth so wide and dark\nI''m afraid of what will come out of it."
        ]
      },
      {
        "id": "fox",
        "title": "Fox",
        "enabled": true,
        "order": 2,
        "stanzas": [
          "squashed meat glistens\nagainst an unbroken\nslick of tarmac\na solitary eyeball\nlying unhinged\nseeks its partner\namongst the debris",
          "the wilting tongue\na pink wing flapping\nonce lapped\nthe rippling sheet\nof water that searches\nthe far side of the woods",
          "a fly comes now\nto identify the body\nlays eggs in folds\nof soft midriff\nembossed\nwith tyre tread\ncross stitch"
        ]
      },
      {
        "id": "unwinding",
        "title": "Unwinding",
        "enabled": true,
        "order": 3,
        "stanzas": [
          "A half-drunk bottle of Hobgoblin\nsat for days afterwards, unmoving\nfrom where you left it, until\na shock of white mould\ngathered across the surface.",
          "I don''t recall who threw it away\njust that you opened it, smiling\non a Friday night after work,\nassumed you had time to finish it,\nyour fingerprints ghosting the brown glass."
        ]
      }
    ]
  }')
ON CONFLICT (id) DO NOTHING;

-- Listen page content
INSERT INTO site_content (id, content) VALUES
  ('listen_page', '{
    "title": "Listen",
    "intro": "These recordings offer a sense of how the work sounds when read aloud.",
    "description": "They are brief, unadorned readings, intended to reflect the pace and tone of the writing rather than performance.",
    "recordings": [
      {"id": "rec1", "label": "Be Attitude (for Chumbo)", "filename": "Marianne-MacRae_Be-Attitude-(for-Chumbo).m4a", "enabled": true, "order": 1},
      {"id": "rec2", "label": "Stochastic Models", "filename": "Marianne-MacRae_stoachastic-models.m4a", "enabled": true, "order": 2},
      {"id": "rec3", "label": "They Came Back As Little Snapshots", "filename": "Marianne-MacRae_They-Came-Back-As-Little-Snapshots.m4a", "enabled": true, "order": 3}
    ]
  }')
ON CONFLICT (id) DO NOTHING;

-- Books page content
INSERT INTO site_content (id, content) VALUES
  ('books_page', '{
    "title": "Books",
    "books": [
      {
        "id": "recital",
        "title": "Recital",
        "publisher": "Blue Diode Press",
        "type": "Poetry collection",
        "description": "Recital is a poetry collection concerned with grief, memory, and the quiet persistence of love. The poems move between lyric fragments and narrative moments, attending to the small, often surreal details that surface in the aftermath of loss.",
        "description2": "The collection resists resolution, allowing humour and tenderness to exist alongside absence.",
        "link_text": "Find the book",
        "link_url": "#",
        "enabled": true,
        "order": 1
      }
    ]
  }')
ON CONFLICT (id) DO NOTHING;

-- About page content
INSERT INTO site_content (id, content) VALUES
  ('about_page', '{
    "title": "About",
    "opening": [
      "Marianne MacRae is a poet and writer whose work sits in the space where grief, memory, and dark humour meet. Her writing is concerned with what remains after loss — the strange persistence of love, the quiet absurdities of survival, and the landscapes that hold our lives long after we have left them.",
      "Her poems move between the surreal and the ordinary, often rooted in lived experience and attentive to the small, unsettling details that refuse to be forgotten."
    ],
    "statement_of_practice": [
      "Marianne''s work explores grief not as a singular event, but as a long, evolving condition — one shaped by place, repetition, and memory. She is interested in how language behaves under emotional pressure, and how humour can coexist with tenderness without diminishing it.",
      "Her debut poetry collection, Recital, engages with these themes through lyric fragments and narrative moments that resist easy resolution. She is currently working on a memoir rooted in a remembered journey along the north coast of Scotland, written from the perspective of the last surviving participant."
    ],
    "selected_publications": [
      {"text": "Recital — Blue Diode Press, poetry collection", "link": null},
      {"text": "Personal Shopper — Poem of the Week, The Scotsman, September 2025", "link": "https://www.pressreader.com/uk/the-scotsman/20250906/282918096590400"},
      {"text": "Selected poems published online and in print", "link": null}
    ],
    "current_work": "Marianne is currently writing a memoir based on a formative holiday taken along the north coast of Scotland, exploring memory, survival, and the distortions of time and grief.",
    "readings_collaborations": "Marianne is available for poetry readings, panel discussions, and collaborative events. Her work is well suited to intimate venues, interdisciplinary settings, and spaces that value reflective, audience-focused engagement.",
    "bio_50": "Marianne MacRae is a poet and writer whose work explores grief, memory, and dark humour. She is the author of the poetry collection Recital and is currently working on a memoir rooted in landscape and survival.",
    "bio_100": "Marianne MacRae is a poet and writer based in Scotland. Her work explores grief, memory, and the quiet absurdities of survival, often moving between lyric intimacy and dark humour. Her debut poetry collection, Recital, was published by Blue Diode Press. She is currently writing a memoir based on a remembered journey along the north coast of Scotland."
  }')
ON CONFLICT (id) DO NOTHING;

-- Archive page content
INSERT INTO site_content (id, content) VALUES
  ('archive_page', '{
    "title": "Archive",
    "intro": "A record of published work.",
    "categories": [
      {
        "id": "poetry_journals",
        "label": "Poetry",
        "sublabel": "Journals & Magazines",
        "entries": [
          {"title": "Recital", "publication": "Blue Diode Press", "date": "2024", "url": null, "enabled": true},
          {"title": "Personal Shopper", "publication": "The Scotsman (Poem of the Week)", "date": "September 2025", "url": "https://www.pressreader.com/uk/the-scotsman/20250906/282918096590400", "enabled": true}
        ]
      },
      {
        "id": "poetry_anthologies",
        "label": "Poetry",
        "sublabel": "Anthologies",
        "entries": []
      },
      {
        "id": "poetry_pamphlets",
        "label": "Poetry",
        "sublabel": "Pamphlets",
        "entries": []
      },
      {
        "id": "nonfiction_academic",
        "label": "Non-fiction",
        "sublabel": "Academic",
        "entries": []
      },
      {
        "id": "nonfiction_creative",
        "label": "Non-fiction",
        "sublabel": "Creative",
        "entries": []
      }
    ]
  }')
ON CONFLICT (id) DO NOTHING;

-- Intervals page content
INSERT INTO site_content (id, content) VALUES
  ('intervals_page', '{
    "title": "Intervals",
    "paragraphs": [
      "Intervals is a place for occasional prose: essays, reflections, and considered pieces written between longer works.",
      "The writing here is irregular by design. It is not a record of process, nor a space for drafts, but a continuation of themes that run through the poetry and current memoir work — grief, memory, attention, and the persistence of the everyday."
    ],
    "cta_intro": "Intervals lives elsewhere.",
    "cta_text": "If you would like to read these pieces as they appear, they are published via Substack.",
    "link_text": "Read Intervals",
    "link_url": "http://mochatheweek.substack.com/"
  }')
ON CONFLICT (id) DO NOTHING;
