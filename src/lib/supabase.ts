import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://gjrvjuygqmglalggtcvd.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBkNjIzODZkLWI0YTItNGQ3OC04NzU3LWMyYTBhZThjODQxMSJ9.eyJwcm9qZWN0SWQiOiJnanJ2anV5Z3FtZ2xhbGdndGN2ZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY2NzYyMzg4LCJleHAiOjIwODIxMjIzODgsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.ZhCcm6s7AfkHcUgYdw0RKkxJnxbLvqbTnZckx2e87TY';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };