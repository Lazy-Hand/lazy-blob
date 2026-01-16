I will resolve the import error and implement the request encapsulation tool as requested.

### 1. Fix Import Error
- **File**: `app/pages/photography.vue`
- **Issue**: The `~` alias (pointing to `app/` in Nuxt 4 compatibility mode) cannot resolve the `types` directory located at the project root.
- **Fix**: Change imports to use relative paths (`../../types`) or the root alias `@` (if correctly mapped), ensuring stable resolution.

### 2. Configure Environment
- **File**: `nuxt.config.ts`
- **Action**: Add `runtimeConfig.public.apiBase` to store the external API base URL (`http://localhost:8080`).

### 3. Encapsulate Request Tool
- **New File**: `app/composables/useHttp.ts`
- **Implementation**:
    - Create a wrapper around Nuxt's `useFetch`.
    - Automatically apply the `baseURL` from `runtimeConfig`.
    - Add interceptors for:
        - **Request**: Allow adding headers (e.g., tokens) in the future.
        - **Response**: Standardize error handling (e.g., if `code !== 200` or HTTP errors).
    - Type-safe response handling matching the `ApiResponse` interface.

### 4. Verification
- Verify `app/pages/photography.vue` no longer has import errors.
- Ensure the application builds/starts without configuration errors.
