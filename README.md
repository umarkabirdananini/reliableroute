# Reliable Routes Logistics Limited

A responsive, self-contained static website, ready for GitHub Pages. No build tools, server, API keys or package installation are needed.

## Publish on GitHub Pages

1. Extract this ZIP. Upload **the contents** of the extracted folder into your GitHub repository. `index.html`, `assets/` and `.nojekyll` should be at the repository root.
2. In your repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**. Select your `main` branch and **/ (root)**, then save.
4. Open the published URL shown in Pages once deployment completes.

All asset paths are relative, so the website also works at a project address such as `https://yourusername.github.io/repository-name/`.

GitHub's instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

To use `reliableroutes.com.ng`, configure that custom domain in GitHub Pages and update your domain's DNS following GitHub's custom-domain documentation. A CNAME is deliberately not preconfigured because the destination repository is not yet known. After choosing the permanent URL, set an absolute `og:image` URL in `index.html` for consistent social sharing previews and add a canonical URL if required.

## Preview locally

Open `index.html` in a modern browser. Or, for a local web server, run `python -m http.server 8000` inside this folder and visit `http://localhost:8000`.

## Included features

- Original emerald and ivory design, a fresh typographic brand mark, and two cinematic port images.
- Responsive layouts, mobile navigation, scroll reveals, and reduced-motion support.
- All eight original services, with individual detail dialogs.
- Six interactive port profiles and an illustrative map of Nigeria.
- Full company information, both Apapa offices, three telephone numbers, and email.
- Quote enquiries with service and port selection and a message preview.
- WhatsApp and email handoff, with a copy-message fallback.
- FAQs, accessible native dialogs, keyboard controls, local fonts, and SEO metadata.

## How enquiries work

This is a static website. The form prepares a message in the visitor's browser. It does **not** send automatically, store data, calculate prices, or imply that a booking has been confirmed.

The visitor reviews their message, chooses WhatsApp or email, and sends it from that application. The main WhatsApp destination is **+234 803 056 6130**. The email destination is **reliableroutes@gmail.com**. Visitors can also copy the prepared message if their device cannot open the application or if a very long email URL is not supported by their mail client.

There is no backend or third-party form service to configure. If direct inbox submissions are desired later, a form endpoint must be integrated and the privacy text updated to reflect its actual behavior.

## Edit the website

- `index.html`: Visible content, contact information, structured metadata, port list, quote form, and embedded `site-data` JSON used by the interactions. Update both visible content and JSON when changing service or port information.
- `assets/styles.css`: Colors, typography, spacing, animations and responsive layouts.
- `assets/app.js`: Navigation, service dialogs, port selection, enquiry composition and application handoff. Update the email/WhatsApp destinations here as well as in the HTML if contacts change.
- `assets/images/`: Optimized WebP images, served locally.
- `assets/fonts/`: Locally hosted Manrope and DM Sans, with their SIL Open Font Licenses.
- `assets/favicon.svg`: Vector brand icon.

No external scripts, analytics, cookies, CDN fonts, image hotlinks, API tokens or credentials are required. The website does not retain form input in localStorage. Contact links open the appropriate external service only when selected.

## Content and artwork

Company facts were extracted from the supplied `reliable_routes_logistics_website_final_pre_hosting_updated.html`. Nationwide coverage and the six port locations were supplied in the request. The live `https://reliableroutes.com.ng/` address could not be retrieved during the build. Marketing headings, service explanations and FAQs were written around those supplied facts; no customer names, shipment volumes, certifications or success rates were invented.

Port artwork was generated using the built-in ImageGen tool for this website. These are illustrative images, not photographs of the company's fleet or of an identified Nigerian port. The final assets are `assets/images/port-hero.webp` and `assets/images/port-operations.webp`.

Hero prompt: “Cinematic aerial editorial photograph of a container vessel approaching a modern coastal cargo port at early morning. Ship, containers and gantry cranes on the right; calm emerald water on the left for text. Warm sunrise, ivory cranes, muted earth tones, detailed photographic texture. Wide landscape. No recognizable specific port, logos, branding, typography or watermarks.”

Supporting prompt: “Premium editorial photograph along a container quay, an unbranded truck carrying a deep green intermodal container, rust and ivory stacks, gantry cranes and a partly visible cargo vessel. Afternoon sunlight, refined forest and terracotta palette, photographic texture. No recognizable port, logos or text.”

Nigeria's country outline is adapted from the `johan/world.geo.json` Nigeria GeoJSON (Natural Earth-based geographic data): https://github.com/johan/world.geo.json/blob/master/countries/NGA.geo.json . Map points are approximate, and the decorative connecting lines indicate nationwide coverage rather than specific transport routes.

The source attachment's embedded brand image was a full promotional composition. This redesign uses a clean vector mark and wordmark created for the new layout; the company name is preserved.

The preview and local checks do not publish the website. Uploading the files to the chosen GitHub repository and enabling Pages is the remaining hosting step.

## Validation

Checked in Chromium at 320, 375, 390, 768, 1024 and 1440 pixel viewport widths, with no horizontal overflow. All eight service dialogs, six port selectors, required form fields, service/port prefills, WhatsApp and email message links, mobile navigation, keyboard dismissal and focus return were checked. No browser script errors or missing image assets were found. The final mobile headline was also visually checked at 320 and 390 pixels. Actual outbound messages and phone calls were not initiated.
