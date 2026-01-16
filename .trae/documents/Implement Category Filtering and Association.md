I will implement the association between blog posts and categories by creating a shared data source and enabling dynamic filtering.

### 1. Shared Data Source
- **Create `server/utils/data.ts`**: Move the mock `posts` data here so it can be shared between the posts API and the new categories API. This ensures data consistency.

### 2. Backend Implementation
- **Create `server/api/categories.get.ts`**:
    - Import `posts` from `server/utils/data.ts`.
    - Dynamically calculate categories and their post counts based on the existing posts.
- **Update `server/api/posts.get.ts`**:
    - Import `posts` from `server/utils/data.ts`.
    - Add logic to filter posts by `category` query parameter (slug).

### 3. Composable Update (`app/composables/useBlogApi.ts`)
- Add `fetchCategories` method to retrieve the category list.
- Update `fetchPosts` to accept an optional `category` parameter and pass it to the API.

### 4. Frontend Implementation
- **Update `app/pages/categories.vue`**:
    - Fetch categories dynamically using `fetchCategories`.
    - Update links to point to `/posts?category=[slug]`.
- **Update `app/pages/posts/index.vue`**:
    - Read the `category` query parameter from the URL.
    - Pass the category to `fetchPosts` to filter the list.
    - (Optional) Display a "Viewing [Category]" header when filtered.
