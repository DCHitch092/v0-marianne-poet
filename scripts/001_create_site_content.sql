-- Create site_content table for storing editable content
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY,
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read content (public website)
CREATE POLICY "Allow public read access" ON site_content
  FOR SELECT
  USING (true);

-- Only authenticated users can update content
CREATE POLICY "Allow authenticated update" ON site_content
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Only authenticated users can insert content
CREATE POLICY "Allow authenticated insert" ON site_content
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Insert default content sections
INSERT INTO site_content (id, content) VALUES
  ('hero', '{"tagline": "Writer & Poet"}'),
  ('introduction', '{"text": "Marianne MacRae writes poetry that explores landscape, memory, and the quiet spaces between words. Based in Scotland, her work draws from the natural world and the stories held within it."}'),
  ('current_work', '{"title": "Recital", "description": "A collection of poems exploring voice, silence, and the act of speaking into being.", "link_text": "Find the book", "link_url": "#"}'),
  ('read_invitation', '{"text": "Poetry lives in the reading. Here you will find selected work—pieces that have found their way into the world through journals, anthologies, and quiet corners of the internet.", "link_text": "Read selected work", "link_url": "#"}'),
  ('newsletter', '{"heading": "Letters", "text": "Occasional correspondence on writing, reading, and the life between drafts.", "placeholder": "Your email", "button_text": "Subscribe"}')
ON CONFLICT (id) DO NOTHING;
