// ══════ Kashi Shakti — Design Tokens ═══════
// Two directions controlled by data-direction on <html>

window.KS_TOKENS = {
  // Direction A: Ghat — warm editorial, cream base
  ghat: {
    bg:         '#F6EFE3',  // warm cream
    bgAlt:      '#FDF8EE',  // ivory panel
    surface:    '#FFFFFF',
    ink:        '#1E1410',  // near-black warm
    inkMid:     '#4A3A2E',
    inkMuted:   '#8B7461',
    inkFaint:   '#B9A996',
    border:     '#E6D6BE',
    borderSoft: '#F0E4CF',
    accent:     '#B23A1A',  // deep saffron-ember
    accentSoft: '#F0D9CC',
    maroon:     '#7A1F1A',
    gold:       '#A07510',
    goldBright: '#C89A2B',
    green:      '#436B2A',
    red:        '#B32021',
    blue:       '#2A4878',
    success:    '#E6EFD8',
    warning:    '#FCEBD5',
    danger:     '#F7DCDC',
    info:       '#E0E8F2',
    shadowSm:   '0 1px 3px rgba(60,30,10,0.06)',
    shadowMd:   '0 4px 16px rgba(60,30,10,0.08)',
    shadowLg:   '0 12px 40px rgba(60,30,10,0.12)',
    heroGrad:   'linear-gradient(135deg, #F6E8CD 0%, #EDD2AE 55%, #E0B27E 100%)',
    darkGrad:   'linear-gradient(135deg, #1E1410 0%, #3A1E0F 60%, #5A2410 100%)',
    navBg:      '#FFFFFF',
    navInk:     '#1E1410',
    logoInk:    '#7A1F1A',
  },
  // Direction B: Deep Aarti — candlelit, deep-ink base
  aarti: {
    bg:         '#14100C',
    bgAlt:      '#1C160F',
    surface:    '#231B13',
    ink:        '#F4E6D0',
    inkMid:     '#C9B696',
    inkMuted:   '#8F7A5D',
    inkFaint:   '#5E4F3C',
    border:     '#3A2E20',
    borderSoft: '#2A2016',
    accent:     '#E88A3E',   // ember
    accentSoft: '#3A2214',
    maroon:     '#9E2F2A',
    gold:       '#E0B441',
    goldBright: '#F4CD5E',
    green:      '#84A85F',
    red:        '#E5574A',
    blue:       '#7A9BD1',
    success:    '#253420',
    warning:    '#3C2A14',
    danger:     '#3A1E1E',
    info:       '#1D2638',
    shadowSm:   '0 1px 3px rgba(0,0,0,0.4)',
    shadowMd:   '0 6px 24px rgba(0,0,0,0.5)',
    shadowLg:   '0 20px 60px rgba(0,0,0,0.6)',
    heroGrad:   'linear-gradient(135deg, #2A1A10 0%, #4A2812 55%, #6E3A18 100%)',
    darkGrad:   'linear-gradient(135deg, #0A0604 0%, #1F140A 60%, #3A2210 100%)',
    navBg:      '#1C160F',
    navInk:     '#F4E6D0',
    logoInk:    '#F4CD5E',
  }
};

// Apply tokens as CSS variables
window.applyDirection = function(dir) {
  const t = window.KS_TOKENS[dir] || window.KS_TOKENS.ghat;
  const root = document.documentElement;
  Object.entries(t).forEach(([k, v]) => {
    const cssKey = '--' + k.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
    root.style.setProperty(cssKey, v);
  });
  root.setAttribute('data-direction', dir);
};
