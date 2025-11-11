<!--
Sync Impact Report:
- Version Change: INITIAL → 1.0.0
- New Constitution: Initial ratification for Brian's Personal Homepage Project
- Principles Defined:
  1. Single HTML File Only
  2. Complete HTML Structure
  3. SEO & Accessibility Standards
  4. Responsive Design Requirements
  5. Resource Organization
- Templates Status: N/A (initial project, no templates to sync)
- Follow-up TODOs: None
-->

# Brian's Personal Homepage Constitution

## Core Principles

### I. Single HTML File Only
All HTML content MUST be contained within `index.html` at the project root. No additional HTML files shall be created.

**Rationale**: Maintains simplicity and ensures automated quality checks focus on a single source of truth.

### II. Complete HTML Structure
The HTML document MUST contain:
- Valid `<html>`, `<head>`, and `<body>` structure
- `<html lang="...">` attribute is REQUIRED (must not be empty)
- `<meta charset="UTF-8">` is REQUIRED
- `<title>` element is REQUIRED and MUST NOT be empty

**Rationale**: Ensures valid HTML5 document structure and proper browser rendering.

### III. SEO & Accessibility Standards
The following elements are REQUIRED for search engine optimization and accessibility:
- `<meta name="description">` with content length between 50-160 characters
- Exactly ONE `<h1>` element (no more, no less)
- All `<img>` elements MUST have non-empty `alt` attributes
- All `<a>` elements MUST have valid `href` attributes (not empty, not just "#")

**Rationale**: Improves discoverability, accessibility for users with disabilities, and ensures semantic HTML best practices.

### IV. Responsive Design Requirements
The webpage MUST NOT produce horizontal scrolling at the following viewport widths:
- Mobile: 320px
- Tablet: 768px
- Desktop: 1440px

**Rationale**: Ensures optimal user experience across all device types and screen sizes.

### V. Resource Organization
- CSS files MUST be placed in `./css` directory
- JavaScript files MUST be placed in `./js` directory
- Images MUST use existing files from `./img` directory
- Minimize external dependencies; prefer vanilla/native implementations

**Rationale**: Maintains clean project structure, reduces external dependencies, and improves performance.

## Quality Standards

### Automated Quality Checks
All submissions MUST pass automated quality checks defined in `scripts/check-all.mjs`:
- 8 HTML/SEO checks (structure, meta tags, semantic elements)
- 3 Responsive design checks (viewport testing)
- Minimum passing score: 100/100 (all checks must pass)

### Modern & Tech-Focused Design
The design SHOULD incorporate:
- Modern visual aesthetics with technological feel
- CSS animations, gradients, or dynamic backgrounds
- Contemporary color schemes and typography
- Professional presentation suitable for a software developer portfolio

## Development Constraints

### Technology Stack
- HTML5 (single file: `index.html`)
- CSS3 (organized in `./css`)
- Vanilla JavaScript (organized in `./js`, minimal or no external libraries)
- No testing frameworks required (static portfolio site)

### Content Guidelines
The homepage content is based on Brian Lee (李威德)'s professional profile:
- Senior .NET developer with 20+ years of experience
- AI implementation specialist (GitHub Copilot, OpenAI, Dify, n8n)
- Experience at SGS, Fujian University Hospital, Chinese Yellow Pages, Yam.com
- Skills in .NET, C#, JavaScript, Git, Docker, Azure, and various development tools
- Microsoft certifications (MCSD, MCSA, MCP)
- Education: Bachelor's in Medical Engineering from Chung Yuan Christian University

## Governance

### Constitution Authority
This constitution defines the non-negotiable standards for the Brian's Personal Homepage project. All development work MUST comply with these principles.

### Automated Enforcement
Compliance is enforced through:
- GitHub Actions workflow (`.github/workflows/website-check.yml`)
- Automated checks on `main` and `develop` branch commits
- CI pipeline MUST pass all checks before merge approval

### Amendment Process
Amendments to this constitution require:
1. Documentation of rationale for change
2. Update to this document with version bump
3. Validation that changes do not violate external requirements (automated checks)

### Version Control
Version bumping follows semantic versioning:
- MAJOR: Fundamental principle changes (e.g., allowing multiple HTML files)
- MINOR: New principles added or existing ones significantly expanded
- PATCH: Clarifications, wording improvements, or minor corrections

**Version**: 1.0.0 | **Ratified**: 2025-11-11 | **Last Amended**: 2025-11-11
