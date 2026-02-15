create or replace function public.is_admin_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_owners owners
    where owners.user_id = auth.uid()
  );
$$;

grant execute on function public.is_admin_owner() to anon, authenticated;

alter table public.admin_owners enable row level security;
alter table public.roadmap_items enable row level security;
alter table public.daily_logs enable row level security;
alter table public.artifacts enable row level security;
alter table public.tags enable row level security;
alter table public.roadmap_item_tags enable row level security;

drop policy if exists "admin_owners_read_self" on public.admin_owners;
create policy "admin_owners_read_self"
  on public.admin_owners
  for select
  using (user_id = auth.uid());

drop policy if exists "roadmap_items_public_read" on public.roadmap_items;
create policy "roadmap_items_public_read"
  on public.roadmap_items
  for select
  using (is_public = true or public.is_admin_owner());

drop policy if exists "roadmap_items_owner_insert" on public.roadmap_items;
create policy "roadmap_items_owner_insert"
  on public.roadmap_items
  for insert
  with check (public.is_admin_owner() and user_id = auth.uid());

drop policy if exists "roadmap_items_owner_update" on public.roadmap_items;
create policy "roadmap_items_owner_update"
  on public.roadmap_items
  for update
  using (public.is_admin_owner() and user_id = auth.uid())
  with check (public.is_admin_owner() and user_id = auth.uid());

drop policy if exists "roadmap_items_owner_delete" on public.roadmap_items;
create policy "roadmap_items_owner_delete"
  on public.roadmap_items
  for delete
  using (public.is_admin_owner() and user_id = auth.uid());

drop policy if exists "daily_logs_public_read" on public.daily_logs;
create policy "daily_logs_public_read"
  on public.daily_logs
  for select
  using (
    (
      is_public = true
      and exists (
        select 1
        from public.roadmap_items items
        where items.id = daily_logs.roadmap_item_id
          and items.is_public = true
      )
    )
    or public.is_admin_owner()
  );

drop policy if exists "daily_logs_owner_insert" on public.daily_logs;
create policy "daily_logs_owner_insert"
  on public.daily_logs
  for insert
  with check (
    public.is_admin_owner()
    and user_id = auth.uid()
    and exists (
      select 1
      from public.roadmap_items items
      where items.id = daily_logs.roadmap_item_id
        and items.user_id = auth.uid()
    )
  );

drop policy if exists "daily_logs_owner_update" on public.daily_logs;
create policy "daily_logs_owner_update"
  on public.daily_logs
  for update
  using (public.is_admin_owner() and user_id = auth.uid())
  with check (
    public.is_admin_owner()
    and user_id = auth.uid()
    and exists (
      select 1
      from public.roadmap_items items
      where items.id = daily_logs.roadmap_item_id
        and items.user_id = auth.uid()
    )
  );

drop policy if exists "daily_logs_owner_delete" on public.daily_logs;
create policy "daily_logs_owner_delete"
  on public.daily_logs
  for delete
  using (public.is_admin_owner() and user_id = auth.uid());

drop policy if exists "artifacts_public_read" on public.artifacts;
create policy "artifacts_public_read"
  on public.artifacts
  for select
  using (
    (
      is_public = true
      and (
        exists (
          select 1
          from public.roadmap_items items
          where items.id = artifacts.roadmap_item_id
            and items.is_public = true
        )
        or exists (
          select 1
          from public.daily_logs logs
          join public.roadmap_items items on items.id = logs.roadmap_item_id
          where logs.id = artifacts.daily_log_id
            and logs.is_public = true
            and items.is_public = true
        )
      )
    )
    or public.is_admin_owner()
  );

drop policy if exists "artifacts_owner_insert" on public.artifacts;
create policy "artifacts_owner_insert"
  on public.artifacts
  for insert
  with check (
    public.is_admin_owner()
    and user_id = auth.uid()
    and (
      exists (
        select 1
        from public.roadmap_items items
        where items.id = artifacts.roadmap_item_id
          and items.user_id = auth.uid()
      )
      or exists (
        select 1
        from public.daily_logs logs
        where logs.id = artifacts.daily_log_id
          and logs.user_id = auth.uid()
      )
    )
  );

drop policy if exists "artifacts_owner_update" on public.artifacts;
create policy "artifacts_owner_update"
  on public.artifacts
  for update
  using (public.is_admin_owner() and user_id = auth.uid())
  with check (
    public.is_admin_owner()
    and user_id = auth.uid()
    and (
      exists (
        select 1
        from public.roadmap_items items
        where items.id = artifacts.roadmap_item_id
          and items.user_id = auth.uid()
      )
      or exists (
        select 1
        from public.daily_logs logs
        where logs.id = artifacts.daily_log_id
          and logs.user_id = auth.uid()
      )
    )
  );

drop policy if exists "artifacts_owner_delete" on public.artifacts;
create policy "artifacts_owner_delete"
  on public.artifacts
  for delete
  using (public.is_admin_owner() and user_id = auth.uid());

drop policy if exists "tags_owner_read" on public.tags;
create policy "tags_owner_read"
  on public.tags
  for select
  using (public.is_admin_owner() and user_id = auth.uid());

drop policy if exists "tags_owner_insert" on public.tags;
create policy "tags_owner_insert"
  on public.tags
  for insert
  with check (public.is_admin_owner() and user_id = auth.uid());

drop policy if exists "tags_owner_update" on public.tags;
create policy "tags_owner_update"
  on public.tags
  for update
  using (public.is_admin_owner() and user_id = auth.uid())
  with check (public.is_admin_owner() and user_id = auth.uid());

drop policy if exists "tags_owner_delete" on public.tags;
create policy "tags_owner_delete"
  on public.tags
  for delete
  using (public.is_admin_owner() and user_id = auth.uid());

drop policy if exists "roadmap_item_tags_read" on public.roadmap_item_tags;
create policy "roadmap_item_tags_read"
  on public.roadmap_item_tags
  for select
  using (
    exists (
      select 1
      from public.roadmap_items items
      where items.id = roadmap_item_tags.roadmap_item_id
        and (items.is_public = true or public.is_admin_owner())
    )
  );

drop policy if exists "roadmap_item_tags_owner_insert" on public.roadmap_item_tags;
create policy "roadmap_item_tags_owner_insert"
  on public.roadmap_item_tags
  for insert
  with check (
    public.is_admin_owner()
    and exists (
      select 1
      from public.roadmap_items items
      where items.id = roadmap_item_tags.roadmap_item_id
        and items.user_id = auth.uid()
    )
    and exists (
      select 1
      from public.tags tags
      where tags.id = roadmap_item_tags.tag_id
        and tags.user_id = auth.uid()
    )
  );

drop policy if exists "roadmap_item_tags_owner_delete" on public.roadmap_item_tags;
create policy "roadmap_item_tags_owner_delete"
  on public.roadmap_item_tags
  for delete
  using (
    public.is_admin_owner()
    and exists (
      select 1
      from public.roadmap_items items
      where items.id = roadmap_item_tags.roadmap_item_id
        and items.user_id = auth.uid()
    )
  );
