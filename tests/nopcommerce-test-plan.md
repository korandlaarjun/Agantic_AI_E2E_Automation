# nopCommerce Automation Test Plan

## Scope
Automate the core shopping experience on `https://demo.nopcommerce.com/` including browsing, search, product details, cart operations, and navigation to login/register pages.

## Goals
- Validate primary e-commerce flows for guest users
- Ensure key navigation elements are present and functional
- Confirm product discovery and cart interaction works reliably
- Provide maintainable automation artifacts for future expansion

## User Stories

### 1. Search and discover products
- As a guest shopper, I want to search for a product so I can find items quickly.
- Acceptance criteria:
  - The search box accepts input
  - The page returns results for the search term
  - Product results include the searched text

### 2. Browse categories
- As a visitor, I want to open a product category so I can see relevant items.
- Acceptance criteria:
  - Category links are visible on the homepage
  - Category navigation loads the correct category page
  - The category title appears on the page

### 3. Open product details
- As a shopper, I want to view product detail pages so I can inspect pricing and options.
- Acceptance criteria:
  - Product detail pages load from homepage or search results
  - Product name and price are shown
  - Add to cart button is visible on the product page

### 4. Add product to cart
- As a shopper, I want to add a product to the cart so I can continue to checkout.
- Acceptance criteria:
  - Add to cart works from homepage or product page
  - The shopping cart updates to show added items
  - The cart page contains the selected product

### 5. Access login/register pages
- As a visitor, I want to navigate to the login page so I can sign in or create an account.
- Acceptance criteria:
  - Login link is visible from the header
  - Login page title is displayed
  - New customer call-to-action is present

## Test Scenarios

| Scenario | Description | Priority |
|---|---|---|
| Homepage load | Verify homepage loads and featured products render | High |
| Search product | Search for a product and validate results | High |
| Category navigation | Open the Electronics category and validate the heading | Medium |
| Product add to cart | Add a featured product to cart and verify cart page | High |
| Login page navigation | Navigate to login page and validate content | Medium |
| User registration | Create a new user account and verify registration complete | High |
| User login | Log in with registered credentials and verify account access | High |
| Invalid login | Verify error messaging for invalid credentials | Medium |
| Product customization | Configure Build your own computer options and add to cart | High |
| Responsive product page | Validate Build your own computer on desktop and mobile viewport sizes | Medium |
| Cart update | Change cart quantity and validate subtotal updates | Medium |
| Guest checkout | Complete guest checkout and verify order completion | High |
| Registered checkout | Complete checkout as a logged in customer | High |
| Order history | Validate order appears correctly in account order history | High |
| Wishlist | Add a product to wishlist as a registered user | Medium |
| Compare list | Add a product to comparison and verify compare page | Medium |
| UI visibility | Ensure page elements are visible and scroll into view if needed | Medium |

## Environment
- Browser: Chromium (Playwright)
- Base URL: `https://demo.nopcommerce.com/`
- Test runner: Playwright Test
- Execution: Local or CI

## Notes
- Tests are written with maintainable page objects.
- Additional flows can be added later for registration, wishlist, product comparison, and checkout.
