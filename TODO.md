# Implementation TODO

## Plan: Add comprehensive VRServices section with all requested features

### Steps:

- [x] 1. Update `src/App.tsx` - Add `<VRServices />` component import and placement
- [x] 2. Create `src/components/VRServices.tsx` - Comprehensive component with:
  - Experience Rating (statistical)
  - Event Rating
  - Live Streaming sources
  - 3D Athlete Visualization description
  - Culture & Education activities
  - Ticketing with Orange Money
  - Transportation (TER, BRT, Yango)
  - Hackathon Orange Sonatel with sentiment
  - Survey/Poll
- [x] 3. Update `src/i18n/translations.ts` - Add missing translations for es, pt, ar, wo, zh
- [x] 4. Update `src/components/Nav.tsx` - Ensure nav link works for vr-services section
- [x] 5. Test with `npm run dev` — TypeScript typecheck passed successfully
- [x] 6. Add Street View integration (`@react-google-maps/api`) with interactive Google Street View for venues
- [x] 7. Fix Street View URLs for all 8 venues with correct Google Maps links
- [x] 8. Add detailed Culture & Education content (Dakar, Diamniadio, Saly zones) in VRServices
- [ ] 9. Add Portuguese (pt) culture translations
- [ ] 10. Add Arabic (ar) culture translations
- [ ] 11. Add Wolof (wo) culture translations
- [ ] 12. Add Chinese (zh) culture translations
- [x] 13. Build passes successfully

### Post-creation fixes applied to `src/components/VRServices.tsx`:

- [x] Removed Hackathon tab entirely (tab union type, tabs array, JSX block)
- [x] Redesigned Culture tab to showcase Dakar, Diamniadio, Saly host zones + Corniche Ouest "Espace Let's Move"
- [x] Fixed corrupted `eventName` function
- [x] Cleaned up unused imports (Heart, Coffee, Smile, Frown, Meh, Bus, Car, GraduationCap, Calendar, Users)
