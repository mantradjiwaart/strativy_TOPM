export const designTokens = {
  theme: {
    colors: {
      light: {
        background: {
          default: '#FFFFFF', // Pure white untuk canvas utama
          surface: '#F7F7F8', // Abu-abu sangat terang untuk sidebar/card (memisahkan area tanpa border tebal)
          elevated: '#FFFFFF', // Untuk dropdown, modal, popover
        },
        text: {
          primary: '#111111', // Hampir hitam, sangat high-contrast untuk readability (Heuristik)
          secondary: '#616161', // Teks pendukung (label, deksripsi)
          muted: '#9E9E9E', // Teks disabled atau placeholder
          inverse: '#FFFFFF', // Teks putih di atas background gelap
        },
        border: {
          subtle: '#EEEEEE', // Divider tipis
          default: '#E0E0E0', // Input border normal
          strong: '#9E9E9E', // Hover state untuk input atau border penting
        },
        primary: {
          main: '#212121', // Pendekatan 'Less Colorful' menggunakan Charcoal gelap sebagai primary action
          hover: '#424242',
          active: '#000000',
          disabled: '#E0E0E0',
        },
        semantic: {
          // Heuristic: Status sistem tetap jelas, namun desaturated agar tidak terlalu vivid
          success: { bg: '#F1F8F5', text: '#206A48', border: '#B8DBCA' },
          error:   { bg: '#FDF3F4', text: '#A02029', border: '#F4C7CB' },
          warning: { bg: '#FFFAF0', text: '#9A6300', border: '#FDE4A9' },
          info:    { bg: '#F0F6FF', text: '#1D53A4', border: '#BFD4F9' },
        }
      },
      dark: {
        background: {
          default: '#121212', // Background utama gelap
          surface: '#1E1E1E', // Elevasi pertama (Card/Sidebar)
          elevated: '#2C2C2C', // Elevasi tertinggi (Modal/Dropdown)
        },
        text: {
          primary: '#F5F5F5', // Off-white untuk mengurangi eye-strain di dark mode
          secondary: '#BDBDBD', 
          muted: '#757575', 
          inverse: '#121212', 
        },
        border: {
          subtle: '#2C2C2C', 
          default: '#424242', 
          strong: '#616161', 
        },
        primary: {
          main: '#E0E0E0', // Tombol primary warna terang di dark mode
          hover: '#FFFFFF',
          active: '#9E9E9E',
          disabled: '#424242',
        },
        semantic: {
          // Warna status untuk dark mode (luminance disesuaikan agar tetap terlihat jelas)
          success: { bg: '#102B1D', text: '#5DAB84', border: '#1A4D32' },
          error:   { bg: '#3D1014', text: '#E26D75', border: '#681B22' },
          warning: { bg: '#362300', text: '#DB9E24', border: '#5C3D00' },
          info:    { bg: '#0A2145', text: '#689DF0', border: '#123977' },
        }
      }
    },
    typography: {
      fontFamily: {
        base: "'Inter', sans-serif",
        heading: "'Inter', sans-serif",
        // Monospace dihilangkan sesuai permintaan
      },
      fontSize: {
        xs: '0.75rem',    // 12px - Label kecil, tooltips
        sm: '0.875rem',   // 14px - Teks sekunder, tabel data
        base: '1rem',     // 16px - Body text utama
        lg: '1.125rem',   // 18px - Subheading kecil
        xl: '1.25rem',    // 20px - Heading card/modal
        '2xl': '1.5rem',  // 24px - H3
        '3xl': '1.875rem',// 30px - H2
        '4xl': '2.25rem', // 36px - H1
      },
      fontWeight: {
        regular: 400, // Body biasa
        medium: 500,  // Interaktif (Tombol, Tab aktif)
        semibold: 600,// Heading sekunder
        bold: 700,    // Heading utama
      },
      lineHeight: {
        tight: 1.2,   // Untuk heading besar
        normal: 1.5,  // Untuk paragraf panjang
        relaxed: 1.75,// Untuk artikel/deskripsi agar lebih lega
      }
    },
    spacing: {
      '0': '0',
      '1': '0.25rem',  // 4px
      '2': '0.5rem',   // 8px
      '3': '0.75rem',  // 12px
      '4': '1rem',     // 16px
      '5': '1.25rem',  // 20px
      '6': '1.5rem',   // 24px
      '8': '2rem',     // 32px
      '10': '2.5rem',  // 40px
      '12': '3rem',    // 48px
      '16': '4rem',    // 64px
    },
    radius: {
      none: '0',
      sm: '0.25rem',   // 4px - Checkbox, tag kecil
      md: '0.375rem',  // 6px - Input, tombol
      lg: '0.5rem',    // 8px  - Card, dropdown
      xl: '0.75rem',   // 12px - Modal
      full: '9999px',  // Avatar, badge
    },
    shadows: {
      light: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // Button hover
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Card, Dropdown
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Modal, Popover
      },
      dark: {
        // Shadow di dark mode biasanya direpresentasikan dengan border tipis (surface border) atau shadow hitam yang lebih pekat
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.7)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.9)',
      }
    }
  }
};
