
import { createClient } from '@supabase/supabase-js';

/**
 * Ersetzen Sie diese Platzhalter durch Ihre echten Daten von supabase.com
 * Settings -> API
 */
const SUPABASE_URL = 'https://ihre-projekt-id.supabase.co'; 
const SUPABASE_ANON_KEY = 'ihr-anon-key-hier';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
