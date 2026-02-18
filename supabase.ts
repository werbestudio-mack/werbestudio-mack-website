
import { createClient } from '@supabase/supabase-js';

/**
 * WICHTIG: Diese Datei muss im Hauptverzeichnis Ihres Projekts liegen.
 * 
 * So finden Sie die Daten:
 * 1. Loggen Sie sich bei supabase.com ein.
 * 2. Gehen Sie zu Ihrem Projekt.
 * 3. Klicken Sie links unten auf das Zahnrad (Settings).
 * 4. Wählen Sie den Menüpunkt 'API'.
 * 5. Kopieren Sie die 'Project URL' und den 'anon' public Key.
 */

const SUPABASE_URL = 'https://ihre-projekt-id.supabase.co'; 
const SUPABASE_ANON_KEY = 'ihr-anon-public-key-hier-eintragen';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
