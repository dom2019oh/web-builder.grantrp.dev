-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can create their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON public.projects;

-- Create project_components table
CREATE TABLE IF NOT EXISTS public.project_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  component_id TEXT NOT NULL,
  component_type TEXT NOT NULL,
  props JSONB DEFAULT '{}'::jsonb,
  position_x INTEGER DEFAULT 0,
  position_y INTEGER DEFAULT 0,
  width INTEGER DEFAULT 300,
  height INTEGER DEFAULT 200,
  z_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_components ENABLE ROW LEVEL SECURITY;

-- Projects RLS policies
CREATE POLICY "Users can view their own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = user_id);

-- Project components RLS policies
CREATE POLICY "Users can view components of their projects"
  ON public.project_components FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_components.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create components in their projects"
  ON public.project_components FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_components.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update components in their projects"
  ON public.project_components FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_components.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete components from their projects"
  ON public.project_components FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_components.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_project_components_project_id ON public.project_components(project_id);

-- Add trigger for project_components
DROP TRIGGER IF EXISTS update_project_components_updated_at ON public.project_components;
CREATE TRIGGER update_project_components_updated_at
  BEFORE UPDATE ON public.project_components
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();