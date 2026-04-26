export interface QA {
  id: string;
  keywords: string[];
  answer: string;
}

export const QA_DATABASE: QA[] = [
  { id: "greet-01", keywords: ["bonjour","salut","hello","hi","bonsoir","salam"], answer: "Salut ! 👋 Je suis AYO, ta mascotte des JOJ Dakar 2026 ! Pose-moi n'importe quelle question sur les sites, sports, transport, billets… Je suis là ! 🦁🇸🇳" },
  { id: "greet-02", keywords: ["ça va","comment tu vas"], answer: "Je suis en pleine forme et prêt pour les JOJ ! 🏅 Dis-moi comment je peux t'aider !" },
  { id: "info-01", keywords: ["joj","jeux olympiques","jeunesse","c'est quoi","qu'est-ce"], answer: "Les JOJ Dakar 2026 sont les premiers Jeux Olympiques de la Jeunesse organisés sur le sol africain ! 🌍🎉 Des milliers de jeunes athlètes du monde entier se retrouveront à Dakar, Diamniadio et Saly du 31 octobre au 13 novembre 2026." },
  { id: "info-02", keywords: ["date","quand","période","calendrier"], answer: "Les JOJ Dakar 2026 se déroulent du 31 octobre au 13 novembre 2026. 📅 Deux semaines de compétitions dans trois zones : Dakar, Diamniadio et Saly." },
  { id: "info-03", keywords: ["ouverture","cérémonie","inauguration","lancement"], answer: "La cérémonie d'ouverture aura lieu le 31 octobre 2026 au Stade Abdoulaye Wade à Diamniadio. 🎆 Un moment historique pour toute l'Afrique !" },
  { id: "info-04", keywords: ["clôture","fermeture","fin","conclusion"], answer: "La cérémonie de clôture se tiendra le 13 novembre 2026 au Stade Abdoulaye Wade à Diamniadio. 🏁" },
  { id: "info-05", keywords: ["pays","nations","combien","participants","athlètes"], answer: "Plus de 4 000 jeunes athlètes représentant 206 comités nationaux olympiques sont attendus à Dakar 2026. 🌐" },
  { id: "info-06", keywords: ["afrique","premier","historique","première fois"], answer: "Dakar 2026 est la première édition des JOJ sur le sol africain. 🌍 Un moment historique qui consacre le dynamisme sportif du Sénégal !" },
  { id: "ayo-01", keywords: ["ayo","mascotte","lion","qui est"], answer: "Je m'appelle AYO ! 🦁 Je suis le lion mascotte officiel des JOJ Dakar 2026. Mon nom signifie « joie » en yoruba. Je représente la fierté, la jeunesse et l'énergie de l'Afrique !" },
  { id: "ayo-02", keywords: ["ayo signifie","nom ayo","pourquoi ayo"], answer: "AYO signifie « joie » et « bonheur » en yoruba, une langue d'Afrique de l'Ouest. 😊 Choisi pour symboliser la célébration de ces Jeux pour toute l'Afrique." },
  { id: "sites-01", keywords: ["site","venue","lieu","où","liste"], answer: "3 zones principales :\n📍 Dakar — Complexe Tour de l'Œuf, Complexe Iba Mar Diop, Corniche Ouest\n📍 Diamniadio — Stade Abdoulaye Wade, Dakar Arena, Centre CICAD\n📍 Saly — Plage Ouest (sports nautiques & plage)" },
  { id: "sites-02", keywords: ["stade abdoulaye wade","grand stade","diamniadio stade"], answer: "Le Stade Abdoulaye Wade à Diamniadio est le stade principal. 🏟️ 50 000 places. Il accueille les cérémonies d'ouverture et clôture + le tir à l'arc." },
  { id: "sites-03", keywords: ["dakar arena","arena","badminton","futsal"], answer: "La Dakar Arena à Diamniadio est la plus grande salle couverte d'Afrique ! 🏸 15 000 places. Elle accueille le badminton et le futsal." },
  { id: "sites-04", keywords: ["tour de l'oeuf","corniche","natation","aquatique","piscine"], answer: "Le Complexe Tour de l'Œuf sur la Corniche de Dakar accueille la natation, basketball 3x3, breaking et skateboarding. 🏊 Face à l'Atlantique, 5 000 spectateurs." },
  { id: "sites-05", keywords: ["iba mar diop","athlétisme","boxe","rugby"], answer: "Le Complexe Iba Mar Diop accueille l'athlétisme, la boxe, le futsal et le rugby à 7. 🏃 15 000 places, stade historique de Dakar." },
  { id: "sites-06", keywords: ["cicad","judo","taekwondo","wushu","escrime","gymnastique","tennis de table"], answer: "Le Centre CICAD à Diamniadio accueille l'escrime, tennis de table, taekwondo, judo, wushu et gymnastique artistique. 🥋 8 000 places." },
  { id: "sites-07", keywords: ["saly","plage","nautique","voile","aviron","triathlon","handball plage","volley plage"], answer: "La Plage Ouest de Saly accueille le handball plage, volley plage, lutte, aviron, voile et triathlon. 🏖️ Cadre paradisiaque sur l'Atlantique à 80 km de Dakar !" },
  { id: "sites-08", keywords: ["corniche ouest","cyclisme","vélo","route"], answer: "La Corniche Ouest accueille le cyclisme sur route. 🚴 Tracé longeant l'Atlantique, entrée libre pour les spectateurs sur le parcours !" },
  { id: "sports-01", keywords: ["sport","discipline","épreuve","quels sports"], answer: "Les JOJ 2026 comprennent : athlétisme, natation, cyclisme, judo, taekwondo, boxe, rugby 7, football, basketball 3x3, breaking, skateboard, voile, triathlon, volley plage, handball plage, tennis de table, badminton, wushu, gymnastique, aviron, tir à l'arc, lutte et plus encore ! 🏅" },
  { id: "sports-02", keywords: ["breaking","break dance","hip hop","danse"], answer: "Le breaking est une des disciplines phares des JOJ ! 💃 Officiellement reconnue par le CIO, disputée au Complexe Tour de l'Œuf sur la Corniche." },
  { id: "sports-03", keywords: ["lutte","lutte sénégalaise"], answer: "La lutte est profondément ancrée dans la culture sénégalaise. 🤼 Les JOJ 2026 l'incluent dans le programme à Saly — un clin d'œil fort à la tradition du Sénégal !" },
  { id: "transport-01", keywords: ["transport","comment aller","se déplacer","accès","moyen"], answer: "Pour se déplacer pendant les JOJ 2026 :\n🚆 TER — Dakar ↔ Diamniadio en 45 min\n🚌 BRT — lignes dédiées JOJ\n🚕 Yango — partenaire officiel\n🚌 Navettes vers Saly\n\nUn pass transport spécial JOJ sera disponible avec les billets." },
  { id: "transport-02", keywords: ["ter","train","express régional"], answer: "Le TER relie Dakar à Diamniadio en ~45 minutes. 🚆 Le moyen le plus rapide pour le Stade Abdoulaye Wade et la Dakar Arena. Fréquence renforcée pendant les JOJ. Prix : ~1 500 FCFA." },
  { id: "transport-03", keywords: ["brt","bus rapid","bus"], answer: "Le BRT dessert les principaux sites en site propre. 🚌 Des lignes express JOJ seront mises en place avec des fréquences renforcées. Climatisé et confortable." },
  { id: "transport-04", keywords: ["saly","aller à saly","navette saly"], answer: "Pour Saly (80 km de Dakar), des navettes officielles JOJ partiront depuis Dakar et Diamniadio. 🚌 Durée ~1h30. Réservez à l'avance !" },
  { id: "transport-05", keywords: ["yango","taxi","vtc","voiture"], answer: "Yango est le partenaire mobilité officiel des JOJ 2026. 🚕 Tarifs préférentiels pour les détenteurs de billets via l'application Yango." },
  { id: "transport-06", keywords: ["aéroport","blaise diagne","avion","arriver"], answer: "L'aéroport Blaise Diagne (AIBD) est situé à Diamniadio, à quelques minutes des sites principaux ! ✈️ Des navettes officielles JOJ relieront l'aéroport aux venues." },
  { id: "tickets-01", keywords: ["billet","ticket","entrée","acheter","réserver","billetterie"], answer: "Les billets sont disponibles sur dakar2026.com. 🎟️ Offres spéciales familles, jeunes et groupes scolaires prévues. Réservez tôt !" },
  { id: "tickets-02", keywords: ["prix billet","combien coûte","tarif"], answer: "Tarifs : de 2 000 FCFA (sessions athlétisme) à 15 000 FCFA (finales en salle). 🎟️ Billets à 500 FCFA pour les moins de 18 ans sur certaines sessions." },
  { id: "tickets-03", keywords: ["gratuit","entrée libre","sans billet"], answer: "Certaines épreuves sont gratuites ! 🎉 Le cyclisme sur la Corniche, certaines sessions beach à Saly, et les Fan Zones sont accessibles sans billet." },
  { id: "hotel-01", keywords: ["hôtel","hébergement","loger","dormir","séjourner"], answer: "Options d'hébergement :\n🏨 Dakar centre — hôtels 3-5 étoiles, auberges\n🏨 Diamniadio — hôtels modernes près des sites\n🏨 Saly — hôtels balnéaires\n\nRéservez tôt sur dakar2026.com !" },
  { id: "hotel-02", keywords: ["village athlètes","village olympique"], answer: "Le Village des Athlètes est à Diamniadio, près du Stade Abdoulaye Wade. 🏘️ Il accueille les 4 000+ athlètes avec restauration internationale et infrastructures médicales." },
  { id: "prog-01", keywords: ["programme","horaire","planning","calendrier épreuves"], answer: "Le programme complet est sur dakar2026.com. 📅 Compétitions : matin (9h-13h) et après-midi (15h-19h). Finales et cérémonies en soirée." },
  { id: "prog-02", keywords: ["finale","finales","médaille","podium"], answer: "Les finales et remises de médailles se déroulent en soirée pour un maximum d'ambiance. 🏅 Réservez vos billets finales à l'avance sur dakar2026.com !" },
  { id: "volontaire-01", keywords: ["volontaire","bénévole","s'engager","aider"], answer: "Les JOJ 2026 recherchent des milliers de volontaires ! 🙌 Inscris-toi sur dakar2026.com/volontaires. Formation fournie, uniforme officiel, expérience inoubliable !" },
  { id: "fanzone-01", keywords: ["fan zone","espace fan","ambiance","animation"], answer: "Les Fan Zones sont des espaces festifs gratuits à Dakar, Diamniadio et Saly ! 🎉 Écrans géants, concerts, animations culturelles, food trucks, boutiques officielles." },
  { id: "fanzone-02", keywords: ["musique","concert","culturel","culture"], answer: "Programme culturel riche : concerts d'artistes sénégalais et africains, expositions, arts martiaux africains, danse traditionnelle dans les Fan Zones. 🎵" },
  { id: "food-01", keywords: ["manger","nourriture","restaurant","cuisine"], answer: "La gastronomie sénégalaise est à l'honneur ! 🍲 Thiéboudienne, yassa, mafé dans les food courts des venues. Conseil : essayez absolument le thiéboudienne !" },
  { id: "shop-01", keywords: ["boutique","souvenir","goodies","produits"], answer: "Boutique officielle sur dakar2026.com/boutique et dans les Fan Zones. 🛍️ T-shirts, casquettes, peluches AYO, pins, porte-clés. Les premiers souvenirs des JOJ africains !" },
  { id: "security-01", keywords: ["sécurité","sûr","danger","safe"], answer: "Dispositif de sécurité renforcé coordonné par les autorités sénégalaises et le CIO. 🛡️ Dakar est une ville chaleureuse. Restez vigilant dans les zones très fréquentées." },
  { id: "practical-01", keywords: ["visa","passeport","immigration"], answer: "Vérifiez les conditions de visa selon votre nationalité. 🛂 De nombreux pays africains et européens sont exemptés. Consultez dakar2026.com pour les facilités spéciales JOJ." },
  { id: "practical-02", keywords: ["monnaie","argent","fcfa","payer","carte"], answer: "Monnaie : Franc CFA (FCFA). 💵 1€ ≈ 655 FCFA. Cartes acceptées dans les venues officielles. Prévoyez du liquide pour marchés et transports." },
  { id: "practical-03", keywords: ["météo","temps","climat","température","chaud"], answer: "Octobre-novembre : fin de saison des pluies. 🌤️ 25-30°C le jour. Prévoyez eau, crème solaire et vêtements légers. Les soirées sont douces." },
  { id: "practical-04", keywords: ["santé","médical","vaccin","médecin"], answer: "Aucun vaccin obligatoire (sauf fièvre jaune selon origine). 💊 Recommandés : antipaludéen, hépatite A. Postes médicaux dans toutes les venues JOJ." },
  { id: "practical-05", keywords: ["wifi","internet","connexion","réseau"], answer: "WiFi gratuit dans toutes les venues officielles JOJ. 📶 Orange Sénégal et Free sont partenaires. SIM locale disponible à l'aéroport." },
  { id: "contact-01", keywords: ["contact","aide","info","renseignement","officiel","site web"], answer: "Infos officielles JOJ Dakar 2026 :\n🌐 dakar2026.com\n📧 info@dakar2026.com\n📱 @Dakar2026 sur tous les réseaux\n\nJe suis aussi là pour vous aider ! 😊" },
  { id: "contact-02", keywords: ["réseaux sociaux","instagram","facebook","twitter","tiktok"], answer: "Suivez les JOJ sur @Dakar2026 (Instagram, X, Facebook, TikTok). 📱 Utilisez #Dakar2026 pour partager vos expériences !" },
  { id: "fallback", keywords: [], answer: "Bonne question ! 🤔 Essaie avec des mots-clés comme : transport, billets, sports, sites, hébergement ou programme. Tu peux aussi consulter dakar2026.com pour les infos officielles ! 🦁" }
];

export function getLocalReply(userMessage: string): string {
  const msg = userMessage.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ");

  let bestMatch: QA | null = null;
  let bestScore = 0;

  for (const qa of QA_DATABASE) {
    if (qa.id === "fallback") continue;
    let score = 0;
    for (const kw of qa.keywords) {
      const kwNorm = kw.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (msg.includes(kwNorm)) score += 2;
      if (kw.length >= 4 && msg.split(" ").some(w => w.startsWith(kwNorm.slice(0, 4)))) score += 1;
    }
    if (score > bestScore) { bestScore = score; bestMatch = qa; }
  }

  if (bestScore >= 2 && bestMatch) return bestMatch.answer;
  return QA_DATABASE.find(qa => qa.id === "fallback")!.answer;
}

export const QUICK_SUGGESTIONS = [
  "📅 Quand ont lieu les JOJ ?",
  "🚆 Comment aller à Diamniadio ?",
  "🎟️ Où acheter des billets ?",
  "🏖️ Quels sports à Saly ?",
  "🦁 Qui est AYO ?",
  "🏨 Où dormir à Dakar ?",
];
