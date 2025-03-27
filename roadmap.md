**PROMPT FOR CURSOR: GENERATE LUXURY MOBILE-FIRST COD LANDING PAGE (EGYPT)**

**Primary Task:** Generate the complete HTML, CSS, and necessary JavaScript for an **exquisite**, **highly persuasive**, and **mobile-first** landing page. The sole purpose is to sell the "SOLY HUX Men's Waffle Knit Polo & Shorts Set" directly to consumers in **Egypt** via a **Cash on Delivery (COD)** model. The design must scream luxury and make the purchase decision irresistible and seamless, especially on mobile devices.

**Core Objectives:**
*   **Mobile-First Excellence:** Design prioritized for flawless vertical viewing and interaction on smartphones. Large touch targets, fast loading, intuitive flow.
*   **Luxury Aesthetics:** Create a premium, high-end visual experience using sophisticated design elements. *Exaggerate the visual appeal*.
*   **Conversion-Focused:** Every element should guide the user towards completing the order form.
*   **COD Optimized:** The entire flow is built around collecting order/shipping information for COD. No cart/checkout pages needed.

**Target Audience:** Young, style-conscious men in Egypt.

**Product Highlights (Reference):**
*   **Name:** SOLY HUX Men's 2 Piece Waffle Knit Polo & Shorts Set.
*   **Key Selling Point:** **Premium Waffle Knit Texture Fabric** (Emphasize heavily: visual texture, breathability, softness, luxury feel).
*   **Benefits:** Ultimate Summer Comfort, Casual Elegance, Versatility (Beach, Vacation, Casual Daily), Smart Design (Loose fit, Polo collar, Elastic waist shorts with pockets).
*   **Available Colors:** Black, White, Silver/Light Grey (Use these in the page palette).
*   **Available Sizes:** Small, Medium, Large, X-Large, XX-Large (Use the provided detailed product measurements for the size chart).

**Mandatory Design & UX Requirements:**

1.  **Mobile-First Layout:** Vertical flow is paramount. Ensure comfortable single-hand navigation and readability on narrow screens. Desktop view should adapt gracefully but mobile is the priority.
2.  **Visual Luxury:**
    *   **Color Palette:** Utilize Black, White, Grey/Silver as base colors, plus a single, elegant accent color (e.g., subtle gold, deep teal) for CTAs and highlights. Use generous white/dark space.
    *   **Typography:** Select modern, premium, highly readable fonts appropriate for luxury branding.
    *   **Imagery:** Assume high-resolution images are in `public/images`. Use a *stunning* hero image/video. Include close-ups *showcasing the waffle knit texture* beautifully. Lifestyle shots showing versatility.
    *   **Icons:** Use custom SVG icons or premium icon sets that match the luxury feel (e.g., for features like breathability, texture, pockets).
3.  **Persuasive Copywriting Tone:** Use language that is aspirational, benefit-driven, emphasizing exclusivity, comfort, style, and the *feeling* of wearing the set.
4.  **Performance:** Optimize all assets and code for blazing-fast loading speeds, crucial for mobile users.

**Page Structure & Key Sections:**

1.  **Hero Section (Above the Fold on Mobile):**
    *   **Compelling Headline:** Immediately communicate value and luxury (e.g., "Experience Unrivaled Summer Style: The Luxe Waffle Knit Set").
    *   **Sub-headline:** Elaborate on the key benefit (e.g., "Crafted for Supreme Comfort & Effortless Elegance").
    *   **Primary Visual:** Stunning photo/video of the set.
    *   **Initial CTA:** Clear button guiding downwards or directly to the form (e.g., "Discover Your Style Below" or "Order Yours Now"). Mention COD early ("Order Now & Pay on Delivery").
2.  **Why This Set? (Benefit-Driven Section):**
    *   **Focus on Waffle Knit:** Dedicate a subsection with close-up visuals and text explaining *why* this texture is superior (Breathability, Unique Look, Softness).
    *   Highlight Comfort, Style Versatility using icons and concise, persuasive text.
3.  **Product Showcase / Color Options:**
    *   Visually display the available colors (Black, White, Grey) using high-quality images of the set in each color. Allow easy visual comparison.
4.  **THE ORDER FORM (Central Conversion Point - ***MAKE THIS SECTION EXCEPTIONAL***):**
    *   **Aesthetics:** Visually stunning, integrated seamlessly, clean layout, premium feel. Perhaps a contained section with a subtle background differentiating it. Use the luxury color palette.
    *   **Functionality (Mobile-Friendly Inputs):**
        *   **Color Selection:** Large, clickable swatches/buttons showing the colors. Clear visual indication of the selected color.
        *   **Size Selection:** Large, clickable buttons for S, M, L, XL, XXL. Obvious visual feedback on selection. **Crucially:** A clear, easily tappable link *right next to the size buttons* to open a **modal/popup** displaying the detailed Size Chart (use the provided measurements, clarify they are *garment* measurements).
        *   **Quantity & Dynamic Pricing/Discount:**
            *   Use clear `+` / `-` buttons (large enough for touch) for quantity adjustment (default to 1).
            *   **Display Pricing Clearly:** Show price per set.
            *   **Show Discount Logic:** Clearly state discount tiers (e.g., "Buy 2 Save 10%", "Buy 3 Save 15%").
            *   ***DYNAMIC TOTAL:** Display the **Total Price** prominently. This total **MUST update automatically and instantly** via JavaScript whenever the quantity changes, reflecting the applied discount. Make this update visually obvious.*
        *   **COD Information Fields:**
            *   **Full Name:** (Text Input, Required)
            *   **Mobile Number:** (Tel Input, Required, maybe basic Egypt format hint). Add a note: "Required for order confirmation & delivery".
            *   **Governorate/City:** (Dropdown Select, Required - Populate with major Egyptian governorates/cities).
            *   **Detailed Address:** (Textarea, Required - include placeholder like "Street name, Building number, Floor, Apt, Landmark").
    *   **Form Submission CTA:** Large, unmissable button using the accent color. Text: **"Confirm Order (Pay on Delivery)"** or similar clear COD confirmation. Add subtle loading/success feedback on submission.
5.  **Trust Signals & Reinforcement:**
    *   Reiterate "Cash on Delivery Available Nationwide".
    *   Optional: Include icons for "Quality Guaranteed", "Easy Returns (if applicable)", "Secure Ordering".
    *   Optional: Short customer testimonials if available.
6.  **Footer:** Minimalist. Copyright, maybe a simple contact link/number.

**Technical Specifications:**
*   **Code:** HTML5, CSS3 (potentially Flexbox/Grid for layout), modern JavaScript (for form interactions, dynamic pricing, modal).
*   **Responsiveness:** Flawless on mobile, functional and presentable on tablet/desktop.
*   **Code Quality:** Clean, semantic, well-commented, organized CSS.

**Final Goal:** Generate a landing page that instantly impresses with its luxury design, clearly communicates the product's value, makes ordering via the beautiful COD form incredibly easy (especially on mobile), and ultimately drives a high conversion rate in the Egyptian market.