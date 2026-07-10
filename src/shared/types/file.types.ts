export type File = {
  id: string;
  title: string;
  file_name: string;
  file_type: string;
  file_url: string;
  status: string;
  created_at: string;
  file_size_bytes: number | null;
  user: {
    id: string;
    name: string;
    last_name: string;
    email: string;
  }
}