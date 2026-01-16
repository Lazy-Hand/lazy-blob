I will enhance the posts page to display a category filter tab/list, allowing users to easily switch between "All" and specific categories.

### 1. Fetch Categories in Posts Page
- **File**: `app/pages/posts/index.vue`
- **Action**: Use `fetchCategories` from `useBlogApi` to get the list of available categories.

### 2. Add Category Filter UI
- **File**: `app/pages/posts/index.vue`
- **Action**:
    - Add a horizontal scrollable list or a flex wrap container below the header title.
    - **"All" Item**: Always present. Active if `!route.query.category`. Links to `/posts`.
    - **Category Items**: Iterate through fetched categories. Active if `route.query.category === category.slug`. Links to `/posts?category=[slug]`.
    - Use visual styling (e.g., `Button` with variant `default` vs `outline` or `ghost`) to indicate the active state.
    - Remove the previous "Badge" implementation since the new tab list will serve the same purpose but better.

### 3. Verification
- Verify that clicking "All" shows all posts.
- Verify that clicking a category filters the posts.
- Verify that the active state updates correctly.
