import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://mnrseaapxpofdznnqrsv.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ucnNlYWFweHBvZmR6bm5xcnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MjIyNzUsImV4cCI6MjA2ODA5ODI3NX0.TgUoEQKHbasSkk9b7gDXRsQTPY5m6COOSFRlO8h-Xe0'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
