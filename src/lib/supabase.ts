import { createClient } from '@supabase/supabase-js'

const SB_URL = 'https://yydexbzvucnnzirmdxws.supabase.co'
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZGV4Ynp2dWNubnppcm1keHdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNDcwNjgsImV4cCI6MjA5NjYyMzA2OH0.3qike6Pn-dz1lyAYbqkGDULR9rykAbLkf4C2vZ3gs98'

export const supabase = createClient(SB_URL, SB_KEY)
