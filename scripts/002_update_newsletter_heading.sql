-- Update newsletter heading from Letters to Intervals
UPDATE site_content 
SET content = jsonb_set(content, '{heading}', '"Intervals"')
WHERE id = 'newsletter';
