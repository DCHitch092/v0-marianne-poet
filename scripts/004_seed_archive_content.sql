-- Seed the archive page content with all entries
-- This ensures the content is stored in the database and editable via admin
-- Added external URLs to entries where provided

INSERT INTO site_content (id, content, updated_at)
VALUES (
  'archive_page',
  '{
    "title": "Archive",
    "categories": [
      {
        "id": "poetry_journals",
        "label": "Poetry",
        "sublabel": "Journals & Magazines",
        "entries": [
          { "title": "Past Walden Pond", "publication": "Acumen", "date": "September 2018", "url": "https://acumen-poetry.co.uk/product/acumen-92-september-2018/", "enabled": true },
          { "title": "Confessions Urbana", "publication": "Manchester Metropolitan University (#WWWAN)", "date": "April 2020", "url": "https://www.mmu.ac.uk/write/confessions-urbana.php", "enabled": true },
          { "title": "Unknown", "publication": "The Edinburgh Review", "date": "October 2014", "url": null, "enabled": true },
          { "title": "Watchers", "publication": "Until Only the Mountain Remains", "date": "August 2015", "url": "https://untilonlythemountainremains.wordpress.com/jump-into-a-story/watchers/", "enabled": true },
          { "title": "A Kind of Fretful Speech", "publication": "Decorating Dissidence (Issue 3)", "date": "August 2019", "url": "https://decoratingdissidence.com/2019/08/31/a-kind-of-fretful-speech/", "enabled": true },
          { "title": "The Pervert", "publication": "Popshot (Issue 13)", "date": "April 2016", "url": "https://www.popshotpopshot.com/posts/20160426-the-pervert/", "enabled": true }
        ]
      },
      {
        "id": "poetry_anthologies",
        "label": "Poetry",
        "sublabel": "Anthologies",
        "entries": [
          { "title": "Multiverse: An International Anthology of Science Fiction Poetry", "publication": "", "date": "December 2018", "url": "https://www.shorelineofinfinity.com/product/multiverse-an-international-anthology-of-science-fiction-poetry/", "enabled": true },
          { "title": "Umbrellas of Edinburgh", "publication": "", "date": "November 2016", "url": "https://umbrellasofedinburgh.wordpress.com/", "enabled": true },
          { "title": "January Diary", "publication": "From Arthur''s Seat", "date": "May 2016", "url": "https://www.ed.ac.uk/files/atoms/files/fromarthursseat_2016.pdf", "enabled": true },
          { "title": "The Book Of", "publication": "From Arthur''s Seat", "date": "May 2016", "url": "https://www.ed.ac.uk/files/atoms/files/fromarthursseat_2016.pdf", "enabled": true }
        ]
      },
      {
        "id": "poetry_pamphlets",
        "label": "Poetry",
        "sublabel": "Pamphlets",
        "entries": [
          { "title": "Joseph Lister Is My New Flatmate", "publication": "", "date": "January 2018", "url": "https://rcpsg.ac.uk/documents/publications/1294-joseph-lister-is-my-new-flatmate/file", "enabled": true }
        ]
      },
      {
        "id": "nonfiction_academic",
        "label": "Non-fiction",
        "sublabel": "Academic",
        "entries": [
          { "title": "Animals", "publication": "Elizabeth Bishop in Context", "date": "August 2021", "url": "https://www.cambridge.org/core/books/abs/elizabeth-bishop-in-context/animals/B52332653FBC37C1472862686D8D1120", "enabled": true }
        ]
      },
      {
        "id": "nonfiction_creative",
        "label": "Non-fiction",
        "sublabel": "Creative",
        "entries": [
          { "title": "My Life in Crisps", "publication": "The Skinny", "date": "April 2021", "url": "https://www.theskinny.co.uk/food-and-drink/features/my-life-crisps-marianne-macrae", "enabled": true },
          { "title": "Eight Poems… with Marianne MacRae", "publication": "poetryasfuck", "date": "April 2019", "url": "https://poetryasfuck.wordpress.com/2019/04/17/eight-poems-with-marianne-macrae/", "enabled": true },
          { "title": "Good Grief… with Marianne MacRae", "publication": "poetryasfuck", "date": "November 2018", "url": "https://poetryasf-ck.tumblr.com/post/180102035779/good-grief-8-marianne-macrae", "enabled": true }
        ]
      }
    ]
  }'::jsonb,
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  content = EXCLUDED.content,
  updated_at = NOW();
