
UPDATE public.products SET images = ARRAY['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop'] WHERE name = 'Classic White Cotton Kurta';
UPDATE public.products SET images = ARRAY['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop'] WHERE name = 'Royal Blue Silk Embroidered Kurta';
UPDATE public.products SET images = ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop'] WHERE name = 'Saffron Embroidered Palazzo Suit';
UPDATE public.products SET images = ARRAY['https://images.unsplash.com/photo-1583391733975-dbb1dce8cf1b?w=600&h=800&fit=crop'] WHERE name = 'Maroon Anarkali with Golden Work';
UPDATE public.products SET images = ARRAY['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop'] WHERE name = 'Golden Festive Kids Kurta Set';
UPDATE public.products SET images = ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=800&fit=crop'] WHERE name = 'Heritage Silk Collection Set';
UPDATE public.products SET images = ARRAY['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=800&fit=crop'] WHERE name ILIKE '%Sage Green%';
UPDATE public.products SET images = ARRAY['https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=800&fit=crop'] WHERE name ILIKE '%Navy%';
UPDATE public.products SET images = ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop'] WHERE name ILIKE '%Peach%';
UPDATE public.products SET images = ARRAY['https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=600&h=800&fit=crop'] WHERE name ILIKE '%Mint%';
UPDATE public.products SET images = ARRAY['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop'] WHERE images = '{}' OR images IS NULL;
