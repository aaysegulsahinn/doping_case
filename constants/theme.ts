// Fateful Moment - Style Guide'dan alınan renk paleti
export const Colors = {
  primary: "#00D3F3", // Cyan 400 - ana vurgu rengi (butonlar, aktif state)
  secondary: "#0F172A", // Slate 900 - kart arkaplanları
  accent: "#FB2C36", // Red 500 - hata, tehlike, riskli seçim
  background: "#020617", // Slate 950 - ana arkaplan
  border: "#1D293D", // Slate 800 - input/kart kenarlıkları
  text: "#F1F5F9", // Slate 100 - ana metin rengi
  textMuted: "#94A3B8", // soluk/ikincil metin (tahmini, style guide'da yoktu)
  success: "#22C55E", // yeşil (status beacon'dan)
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

// Not: Figma'da özel bir font adı bulunamadığından, benzer
// karakterde (bold, geniş, biraz futuristik) sistem fontları kullanıyoruz.
export const Typography = {
  displayLarge: {
    fontSize: 32,
    fontWeight: "800" as const,
    fontStyle: "italic" as const,
    letterSpacing: 0.5,
  },
  heading1: {
    fontSize: 24,
    fontWeight: "700" as const,
    fontStyle: "italic" as const,
  },
  hudMono: {
    fontSize: 13,
    fontWeight: "600" as const,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
  },
  body: {
    fontSize: 15,
    fontWeight: "400" as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
  },
} as const;
