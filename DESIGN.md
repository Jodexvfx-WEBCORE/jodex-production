# Design Brief: Jodex Production

**Theme**: Nocturne Luminescence — luxury-minimalist dark portfolio with strategic neon accents.

## Tone & Purpose
Premium motion/animation studio showcase. Visitors arrive to be impressed and feel premium craft. Emotional intent: awe, inspiration, professionalism. Luxury-minimalist with nocturnal sophistication; deliberately restrained with high-contrast neon highlights.

## Palette (Dark Mode)

| Token            | OKLCH Value      | Purpose                              | CSS                                          |
|------------------|------------------|--------------------------------------|----------------------------------------------|
| Background       | 0.08 0 0         | Deep glossy black, dominant surface  | `oklch(0.08 0 0)` — #0F0F0F                  |
| Foreground       | 0.97 0 0         | Pristine white, primary text         | `oklch(0.97 0 0)` — #F7F7F7                  |
| Card             | 0.15 0 0         | Frosted glass layer, subtle depth    | `oklch(0.15 0 0)` — #262626                  |
| Border           | 0.22 0 0         | Soft charcoal dividers, soft clarity | `oklch(0.22 0 0)` — #383838                  |
| Primary (Cyan)   | 0.65 0.22 200    | Neon accent, energy, tech premium    | `oklch(0.65 0.22 200)` — #00D9FF (cyan)      |
| Secondary (Magenta) | 0.58 0.21 310   | CTA highlight, secondary action      | `oklch(0.58 0.21 310)` — #FF00FF (magenta)   |
| Muted            | 0.22 0 0         | Secondary text, tertiary elements    | `oklch(0.22 0 0)` — #383838                  |

## Typography
- **Display**: Space Grotesk — geometric, tech-forward, confident
- **Body**: DM Sans — neutral, precise, readable, premium tech aesthetic
- **Mono**: JetBrains Mono — code accent, technical credibility

## Elevation & Depth

| Surface           | Treatment                                            |
|-------------------|------------------------------------------------------|
| Header            | Frosted glass: `glass-effect` class, backdrop blur  |
| Hero              | Deep background, centered typography, white + cyan accent |
| Cards/Sections    | Glassmorphism layer: transparent with blur border   |
| Buttons (Primary) | Cyan neon glow, scale hover, smooth transition      |
| Buttons (Secondary) | Magenta glow, scale hover, smooth transition        |
| 3D Decoration     | Neon cyan polyhedron, float animation, parallax     |
| Footer            | Minimal, semi-transparent glass, border-top         |

## Structural Zones

| Zone                | Background              | Border              | Typography         |
|---------------------|-------------------------|---------------------|--------------------|
| Header (Fixed)      | `glass-effect`          | `border-border/20`  | `text-foreground`  |
| Hero Section        | `bg-background`         | None                | White + Cyan glow  |
| 3D Decoration       | N/A (floating element)  | Cyan neon outline   | N/A                |
| Card Components     | `bg-card` + glass       | `neon-border-cyan`  | `text-foreground`  |
| CTA Buttons         | Primary/Secondary OKLCH | Cyan/Magenta glow   | White              |
| Footer              | `glass-effect`          | `border-t border-border/30` | `text-muted-foreground` |

## Shape Language
- **Border Radius**: 8px (md), 16px (lg), 0px (sharp edges on technical elements)
- **Spacing Density**: Generous padding (1.5rem–2rem) for premium air
- **Shadows**: Glass effect + glow shadows on interactive elements only

## Component Patterns
- **Glass Cards**: Frosted background with subtle border and backdrop blur
- **Glow Buttons**: Neon accent with hover glow scale (1.05)
- **Text Glow**: White text with subtle cyan shadow for hero titles
- **Hover States**: All interactive elements scale + intensify glow

## Motion Choreography
- **Scroll Transitions**: `transition-smooth` on all hover states (0.3s cubic-bezier)
- **3D Float**: Continuous bobbing + rotation animation (6s loop)
- **Glow Pulse**: Secondary layer animation (2s cycle) on decoration
- **Fade-In**: Page entrance at 0.5s ease-out

## Constraints
- **Max Colors**: 7 (bg, fg, card, border, cyan, magenta, muted) — strict palette
- **No Gradients**: Only solid OKLCH colors with glow effects
- **No Bouncy Animations**: Smooth easing, no elastic bounce
- **Minimal Decoration**: Only the 3D shape and glow effects, no scattered elements
- **High Contrast**: L-difference ≥ 0.75 for accessibility

## Signature Detail
Glassmorphism done right — frosted glass cards with backdrop blur + ultra-subtle borders, paired with strategic neon cyan accents that glow on hover. The 3D floating polyhedron provides cinematic depth without becoming a distraction. Premium, technical, chill.

## Anti-Patterns Avoided
- No purple gradients, no safe blue defaults
- No uniform rounded corners
- No scattered animations
- No generic dark theme (carefully tuned OKLCH values)
- No full-page blurs (only card-level glassmorphism)
